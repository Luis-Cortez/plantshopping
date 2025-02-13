
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // changes cost ( a string) to type number for math calculations

  function costToNumber(cost){
    let c = 0;

    for( let i = 1; i < cost.length; i++){
        c += cost[i];
    }

    return Number(c)
  }
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
      let cart_amount = 0;

      cart.forEach( plant => {
          const cost =  costToNumber(plant.cost);
          // sum the cost
          cart_amount +=  plant.quantity * cost;
          
      })
      
      return cart_amount.toLocaleString();
  };

  const handleIncrement = (item) => {
      dispatch( updateQuantity( {name: item.name, quantity: item.quantity + 1} ) )
  };

  const handleDecrement = (item) => {
    if( item.quantity <= 1){
      return dispatch( removeItem(item.name) );
      
    }
    dispatch( updateQuantity( {name: item.name, quantity: item.quantity - 1} ) )

  };

  const handleRemove = (item) => {
    dispatch( removeItem( item.name ))
  };

  window.onkeydown = ()=>{
    console.log("gay")
  }

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
      return (item.quantity * costToNumber(item.cost) ).toLocaleString();
  };


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}> Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={ ()=> handleDecrement(item) }>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={ ()=> handleIncrement(item) } >+</button>
              </div>
              <div className="cart-item-total">Total: ${ calculateTotalCost(item) } </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={ onContinueShopping } > Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


