import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

type FetchPizzasArgs = {
   currentPage: number;
   categoryId: number;
   sortProperty: string;
   order: string;

}

type Pizza = {
   id: string;
   imageUrl: string;
   title: string;
   price: number;
   category: number;
   sizes: number[],
   types: number[]
   rating: number;
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
   'pizza/fetchPizzasStatus',
   async (params) => {
      const { currentPage, categoryId, sortProperty, order } = params;
      const { data } = await axios.get<Pizza[]>(
         `https://678d5804f067bf9e24ea0f3c.mockapi.io/items?page=${currentPage}&limit=8&${categoryId ? `category=${categoryId}` : ''}&sortBy=${sortProperty}&order=${order}`
      );
      return data
   },
)

export enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error'
}

interface PizzaSliceState {
   items: Pizza[];
   status: Status;
}

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING,
}

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<Pizza[]>) {
         state.items = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
         })
   }
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;