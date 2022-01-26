import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const DUMMY_PRODUCTS = [
    {
      id:'p1' , title:'first book' , description:'my first book' , price:5
    },
    {
      id:'p2' , title:'second book' , description:'my second book' , price : 6
    }
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => (
          <ProductItem
          key = {product.id}
          id  = {product.id} 
          title={product.title}
          price={product.price}
          description={product.description}
        />
        ))} 
      </ul>
    </section>
  );
};

export default Products;
