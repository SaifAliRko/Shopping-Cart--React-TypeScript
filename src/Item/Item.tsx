import { Button } from '@mui/material'
import { ICartItem } from '../App'
import { Wrapper } from './Item.styles'

type Props={
    item:ICartItem
    handleAddToCart:(item: ICartItem) => void
}

export default function Item({item,handleAddToCart}:Props) {
    return (
        <Wrapper>
            <img src={item.image} alt={item.title}/>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={()=>handleAddToCart(item)}>Add</Button>
        </Wrapper>
    )
}
