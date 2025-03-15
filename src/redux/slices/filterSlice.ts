import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Sort = {
   name: string;
   sortProperty: 'rating' | 'price' | 'title';
   order: 'asc' | 'desc';
}

interface filterSliceState {
   searchValue: string;
   currentPage: number;
   categoryId: number;
   sortType: Sort;
}

const initialState: filterSliceState = {
   searchValue: '',
   currentPage: 1,
   categoryId: 0,
   sortType: { name: 'Популярности', sortProperty: 'rating', order: 'asc' }
}


const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setCategoryId(state, action: PayloadAction<number>) {
         state.categoryId = action.payload
      },
      setSortType(state, action: PayloadAction<Sort>) {
         state.sortType = action.payload;
      },
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      }
   }
})

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;