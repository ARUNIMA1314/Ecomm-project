import React, {useState, useEffect} from 'react';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import {Link, useNavigate} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from "./reducer";
import {useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from './axios';
import {db} from "./firebase";
import { flexbox, padding } from '@mui/system';

function Payment() {

    const [{basket, user}, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled ] = useState(true);
    const [clientSecret, setClientSecret ] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log("THE SECRET IS >>> ", clientSecret);

    const handleSubmit = async(event) => {
        //stripe functions
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = payment confirmation

            db
            .collection('users')
            .doc(user?.id)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders', { replace: true });
        })
    }

    const handleChange = event => {
        //Listen for changes in the CardElement
        //Display any errors as the cutonmer fills in their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message:"");
    }

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>Checkout (
                <Link to="/checkout">{basket?.length} items</Link>
                )
                </h1>
            {/* Payment Section - Delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email} <br />
                    123, Sample Street <br />
                    Kolkata, India  - 700001</p>
                </div>
            </div>
            {/* Payment Section - Delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                    <div className='payment__items'>
                        {/* Shows all the products to checkout */}
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
            </div>
            {/* Payment Section - Delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                   <h3>Payment Method</h3>
                </div>    
                <div className='payment__details'>

                    {/* Stripe Payment Functionality */}
                    <form onSubmit={handleSubmit}>
                         <div className='cardElementContainer'>
                        <CardElement onChange={handleChange} />
                        </div>
                        

                        <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"₹"}
                                    />
                                    <button className='buy__button' disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}

                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment