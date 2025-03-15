import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store'
import { setSortType } from '../redux/slices/filterSlice'


export default function Sort() {

   const dispatch = useDispatch();
   const sort = useSelector((state: RootState) => state.filter.sortType)
   const sortRef = useRef<HTMLDivElement>(null)
   const [open, setOpen] = useState(false);


   function applySelect(obj: ListItem) {
      dispatch(setSortType(obj));
      setOpen(false)
   }

   type ListItem = {
      name: string,
      sortProperty: string,
      order: string,
   }

   const list: ListItem[] =
      [{ name: 'Популярности(ASC)', sortProperty: 'rating', order: 'asc' }, { name: 'Популярности(DESC)', sortProperty: 'rating', order: 'desc' },
      { name: 'Цене(ASC)', sortProperty: 'price', order: 'asc' }, { name: 'Цене(DESC)', sortProperty: 'price', order: 'desc' },
      { name: 'Алфавиту(ASC)', sortProperty: 'title', order: 'asc' }, { name: 'Алфавиту(DESC)', sortProperty: 'title', order: 'desc' }];

   function setActive() {
      setOpen((prev) => !prev)
   }
   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
            setOpen(false)
         }
      }
      document.body.addEventListener('click', handleOutsideClick)
      return () => {
         document.body.removeEventListener('click', handleOutsideClick)
      }
   }, [])

   return (
      <div ref={sortRef} className="sort">
         <div className="sort__label">
            <svg
               width="10"
               height="6"
               viewBox="0 0 10 6"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
               />
            </svg>
            <b>Сортировка по:</b>
            <span onClick={setActive}>{sort.name}</span>
         </div>
         {open && (
            <div className="sort__popup">
               <ul>
                  {list.map((obj, i) => (
                     <li
                        key={i}
                        className={sort.name === obj.name ? 'active' : ''}
                        onClick={() => applySelect(obj)}
                     >{obj.name}</li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   )
}
