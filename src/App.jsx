import { Fragment  , useEffect} from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector , useDispatch} from "react-redux";
import { cartActions } from "./store/cart";
import Notification from "./components/UI/Notification";
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.cart.showCart);
  const cartItems = useSelector((state) =>  state.cart.items);
  const cartQuantity = useSelector((state)=> state.cart.totalQuantity);
  const notification = useSelector((state) => state.cart.notification);

 

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        cartActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://sg-project-trial-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({cartItems , cartQuantity}),
        }
      );

      if (!response.ok) {
        throw new Error("Sending Cart Data Failed");
      }

      dispatch(
        cartActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );

      // const responseData = await response.json();
    };
    if(isInitial)
    {
      isInitial = false;
      return;
    }
    
    sendCartData().catch((error) => {
      dispatch(
        cartActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data!",
        })
      );
    });
  }, [cartItems , cartQuantity, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
