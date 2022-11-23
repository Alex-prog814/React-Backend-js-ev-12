import React, { useState, useContext, useEffect } from 'react';
import { productsContext } from '../../../contexts/productContext';

const AddCategory = () => {
    const { getCategories, categories, createCategory } = useContext(productsContext);
    const [category, setCategory] = useState('');

    useEffect(() => {
        getCategories();
    }, []);

    function saveCategory(){
        let newCategory = new FormData();
        newCategory.append('title', category);
        createCategory(newCategory);
    };

  return (
    <div>
        <h5>Categories List:</h5>
        {categories?.map(item => (
            <p key={item.id}>{item.title}</p>
        ))}
        <br/>

        <h5>Create Category</h5>
        <input type="text" placeholder="Enter category title" onChange={e => setCategory(e.target.value)}/>
        <button onClick={saveCategory}>Save</button>
    </div>
  )
}

export default AddCategory