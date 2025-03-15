import React, { useState } from 'react';

type CategoriesProps = {
   value: number;
   onClickCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
   const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
   ];



   return (
      <div className='categories'>
         <ul>
            {categories.map((category, index) => (
               <li
                  key={index}
                  className={value === index ? 'active' : ''}
                  onClick={() => onClickCategory(index)}
               >{category}</li>
            ))}
         </ul>
      </div>
   )

}
export default Categories;