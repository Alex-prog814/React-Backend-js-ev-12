import React, { useContext } from 'react';
import { productsContext } from '../../../contexts/productContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  const { deleteProduct, toggleLike } = useContext(productsContext);

  return (
    <div>
      Title: {item.title}
      Price: {item.price}
      Category: {item.category.title}
      Reviews: {item.reviews.length}
      Likes: {item.likes}
      <button onClick={() => navigate(`/products/${item.id}`)}>Details</button>
      <button onClick={() => toggleLike(item.id)}>Like</button>
      {item.is_author ? (
        <>
          <button onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
          <button onClick={() => deleteProduct(item.id)}>Delete</button>
        </>
      ) : (
        null
      )}
    </div>
  )
}

export default ProductCard