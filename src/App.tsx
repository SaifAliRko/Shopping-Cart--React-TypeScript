import axios from "axios";
import { Badge, LinearProgress } from "@mui/material";
import { useQuery } from "react-query";
import "./App.css";
import { StyledButton, Wrapper } from "./App.styles";
import Item from "./Item/Item";
import { Grid } from "@material-ui/core";
import { Drawer } from "@mui/material";
import { useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Cart } from "./Cart/Cart";
export interface ICartItem {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  amount:number;
}

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const getProducts = async (): Promise<ICartItem[]> => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
  };

  const { isLoading, error, data } = useQuery<ICartItem[]>(
    "products",
    getProducts
  );
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;
  console.log("data", data);

  const getTotalItems = (items: ICartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  const handleAddToCart = (clickedItem: ICartItem) =>(
    setCartItems(prev=>{
      const isIteminCart = prev.find(item=>item.id===clickedItem.id)
      if(isIteminCart){
        return prev.map(item=>
          item.id===clickedItem.id ? {...item,amount: item.amount+1} : item
          )
      }
      return [...prev,{...clickedItem ,amount:1}]
    })
  );
  const handleRemoveFromCart = (id:number) => (
    setCartItems(prev=>prev.reduce((acc, item) => {
      if (item.id === id) {
        if (item.amount === 1) {
          return acc;
        }
        return [...acc, { ...item, amount: item.amount - 1 }];
      }
      else {
        return [...acc, item];
      }
    }, [] as ICartItem[]))
  );

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart addToCart={handleAddToCart} cartItems={cartItems} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={()=>setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
        <AddShoppingCartIcon/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
