import React from 'react';
import { Grid, Container } from "@material-ui/core";
import Product from "../Product";
import "./styles.css";


const Products = ({products}) => {
    return (
      <div className='product-list'>
          <Container id="products">
              <Grid container spacing={4}>
                  {products.map(product => {
                      return( 
                      <Grid key={product.id} item xs={12} sm={6} md={3}>
                          <Product product={product} /> 
                      </Grid>
                      );
                  })} 
              </Grid>
          </Container>
          
      </div>
    )
  }
  
  export default Products;