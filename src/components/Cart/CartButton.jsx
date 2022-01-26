import classes from './CartButton.module.css';
import { useSelector , useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart';


const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  const cartHandler = () => {
    dispatch(cartActions.toggleCart());
  };
  
  return (
    <button className={classes.button} onClick = {cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
