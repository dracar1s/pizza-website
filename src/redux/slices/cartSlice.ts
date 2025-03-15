import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export type CartItem = {
   id: string; title: string; price: number; imageUrl: string; size: number; type: string; count: number;
}

interface ICartSliceState {
   totalPrice: number;
   items: CartItem[];
}

const initialState: ICartSliceState = {
   totalPrice: 0,
   items: [],
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<CartItem>) {
         const findItem = state.items.find(obj => obj.id === action.payload.id)
         if (findItem) {
            findItem.count++
         } else {
            state.items.push({
               ...action.payload,
               count: 1
            })
         }
         state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
      },
      removeItem(state, action: PayloadAction<string>) {
         if (window.confirm('Действительно ли вы желаете удалить пиццу?')) {
            state.items = state.items.filter(obj => obj.id != action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
         }
      },
      clearItems(state) {
         if (window.confirm('Действительно ли вы желаете очистить корзину?')) {
            state.items = [];
            state.totalPrice = 0;
         }
      },
      onClickMinus(state, action: PayloadAction<string>) {
         const item = state.items.find(pizza => pizza.id === action.payload);
         if (item && item.count > 0) {
            item.count--;
            state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
         }
      }
   }
})

export const { addItem, removeItem, clearItems, onClickMinus } = cartSlice.actions;

export default cartSlice.reducer;