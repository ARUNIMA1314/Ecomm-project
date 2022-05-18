import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    CardActionArea,
    Button,
  } from "@material-ui/core";
  import { ShoppingCart } from "@material-ui/icons";
  import "./styles.css";

  const Product = ({
    basket,
    product,
    addProduct,
    updateProduct,
    RemoveItemFromBasket,
  }) => {
    if (!product) return null;
    return (
      <Card className="custom-card">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Sample Title"
            className="card-image"
            image={product.image.url}
            title="Sample Title"
          />
          <CardContent className="content">
            <Typography
              className="title"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {product.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        {basket && (
          <CardActions>
            <Typography
              className="basket-item-price"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {product.price.formatted_with_symbol}
            </Typography>
          </CardActions>
        )}
        <CardActions className="actions-content">
          {!basket && (
            <>
              <Typography
                className="price"
                gutterBottom
                variant="h5"
                component="h2"
              >
                {product.price.formatted_with_symbol}
              </Typography>
              <Button
                size="large"
                className="custom-button"
                onClick={() => {
                  addProduct(product.id, 1);
                }}
              >
                <ShoppingCart /> Add to cart
              </Button>
            </>
    )}
        </CardActions>
    </Card>
);
};



export default Product;