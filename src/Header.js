import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { auth } from './firebase';

function Header() {
  const [{basket, user}, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
      if(user) {
          auth.signOut();
      }
  }

  return (
    <div className='header'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary fs-2 text">
                <Link to="/" className='link'>
                    <img className='header__logo' src="https://assets-global.website-files.com/5e3177cecf36f6591e4e38cb/5ea2a86505e63bdd814cf868_Logo.png" />
                </Link>
                <div className='header__search'>
                    <input className='header__searchInput' type="text"/>
                    <SearchIcon className='header__searchIcon' />
                </div>
                <div className='header__nav'>
                    <Link to={!user && "/login"} className='link'>
                        <div onClick={handleAuthenticaton} className='header__option'>
                            <span className='header__optionLineOne'>Hello {!user ? 'Guest' : user.email}</span>
                            <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                        </div>
                    </Link>
                    <Link to="/" className='link'>
                        <div className='header__option'>
                            <span className='header__optionLineOne'>Returns</span>
                            <span className='header__optionLineTwo'>& Orders</span>
                        </div>
                    </Link>
                    <div className='header__optionBasket'>
                        <Link to="/checkout" className='link'>
                            <ShoppingCartIcon />
                            <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
                        </Link>               
                    </div>                    
                </div>
            </nav>
           
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-2">
                    <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            All
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Bestsellers</a></li>
                            <li><a class="dropdown-item" href="#">New Releases</a></li>
                            <li><a class="dropdown-item" href="#">Your Orders</a></li>
                            <li><a class="dropdown-item" href="#">Your Account</a></li>
                            <li><a class="dropdown-item" href="#">Customer Service</a></li>
                            <li><a class="dropdown-item" href="#"></a></li>
                        </ul>
                        </li>
                        <li class="nav-item">
                        <a id="electronic" class="nav-link" href="/electronics">Electronics</a>
                        </li>
                        <li class="nav-item">
                        <a id="fashion" class="nav-link" href="/fashion">Fashion</a>
                        </li>
                        <li class="nav-item">
                        <a id="household" class="nav-link" href="/household">Household</a>
                        </li>
                        <li class="nav-item">
                        <a id="bookgame" class="nav-link" href="/booksgames">Books & Games</a>
                        </li>
                        <li class="nav-item">
                        <a id="infant" class="nav-link" href="/infants">Infant Store</a>
                        </li>
                        <li class="nav-item">
                        <a id="giftcard" class="nav-link" href="/giftcards">Gift Cards</a>
                        </li>
                        <li class="nav-item">
                            <a id="sale" class="nav-link" href="/product">SALE</a>
                        </li>
                        <li class="nav-item">
                        <a id="contact" class="nav-link" href="/contact">Contact Us</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default Header;