import { Button } from "@mui/material";
import { ICartItem } from "../App";
import { Wrapper } from "./CarItem.styles";

interface Props {
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: number) => void;
  item: ICartItem;
}
export const CartItem: React.FC<Props> = ({
  addToCart,
  removeFromCart,
  item,
}) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price} </p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title}/>
    </Wrapper>
  );
};
