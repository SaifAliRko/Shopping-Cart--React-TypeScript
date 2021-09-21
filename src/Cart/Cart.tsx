import { ICartItem } from "../App"
import { CartItem } from "../CartItem/CartItem"
import { Wrapper } from "./Cart.styles"

interface Props {
    addToCart:(clickedItem: ICartItem) => void
    removeFromCart:(id:number) => void;
    cartItems: ICartItem[]
}





export const Cart:React.FC<Props>=({addToCart,removeFromCart,cartItems})=> {
    const calculateTotal =(items:ICartItem[])=>(items.reduce((acc,item)=>acc+item.amount*item.price,0))
    
    return (
        <Wrapper>
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? <p>No items in cart.</p> : null}
        {cartItems.map(item=>(
            <CartItem addToCart={addToCart} removeFromCart={removeFromCart} item={item}/>
        ))}
         <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
    )
}
