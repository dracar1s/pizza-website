import React, { useState, useEffect, useContext } from 'react'
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice.js';
import { fetchPizzas } from '../redux/slices/pizzasSlice.js';
import { RootState, useAppDispatch } from '../redux/store'

const Home: React.FC = () => {

   const dispatch = useAppDispatch();

   const { sortProperty, order } = useSelector((state: RootState) => state.filter.sortType)
   const { categoryId, sortType, currentPage, searchValue } = useSelector((state: RootState) => state.filter)
   const { items, status } = useSelector((state: RootState) => state.pizza)


   function onChangeCategory(i: number) {
      dispatch(setCategoryId(i))
   }

   const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page))
   }

   useEffect(() => {
      dispatch(fetchPizzas({ currentPage, categoryId, sortProperty, order }));

   }, [categoryId, sortType, currentPage]);


   return (
      <div className='container'>
         <div className="content__top">
            <Categories value={categoryId} onClickCategory={(i) => onChangeCategory(i)} />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {
               status === 'loading' ? [...new Array(6)].map((_, i) => <Skeleton key={i} />) :
                  items.filter((pizza) => pizza.title.toLowerCase().includes(searchValue.toLowerCase())).map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            }
         </div>
         <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
   )
}

export default Home;