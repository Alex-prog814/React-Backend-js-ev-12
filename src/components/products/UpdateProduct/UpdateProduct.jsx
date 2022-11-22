import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsContext } from '../../../contexts/productContext';

const UpdateProduct = () => {
  const { oneProduct, getOneProduct, updateProduct, getCategories, categories } = useContext(productsContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    getOneProduct(id);
    getCategories();
  }, []);

  useEffect(() => {
    if(oneProduct){
      setTitle(oneProduct.title);
      setDescription(oneProduct.description);
      setPrice(oneProduct.price);
      setCategory(oneProduct.category.id);
    };
  }, [oneProduct]);

  function saveChanges() {
    let editedProduct = new FormData();
    editedProduct.append('title', title);
    editedProduct.append('description', description);
    editedProduct.append('price', price);
    editedProduct.append('category', category);
    if(image){
      editedProduct.append('image', image);
    };
    updateProduct(id, editedProduct, navigate);
  };

  return (
    <div>
      <h2>Update Product</h2>

      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br />
      <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} /><br />

      <h3>CATEGORY BEFORE: {oneProduct?.category.title}</h3>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>Choose category...</option>
        {categories?.map(item => (
          <option key={item.id} value={item.id}>{item.title}</option>
        ))}
      </select><br />


      {oneProduct ? (
        <img src={oneProduct.image} alt="" width="250" height="250" />
      ) : (
        <h4>No file</h4>
      )}
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} /><br />

      <button onClick={saveChanges}>Save Changes</button>
    </div>
  )
}

export default UpdateProduct