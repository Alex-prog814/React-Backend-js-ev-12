import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productsContext } from '../../../contexts/productContext';
import Loader from '../../Loader/Loader';

const Details = () => {
  const { getOneProduct, oneProduct, createComment, deleteComment } = useContext(productsContext);
  const { id } = useParams();

  const [showReviewBlock, setShowReviewBlock] = useState(false);
  const [review, setReview] = useState('');

  useEffect(() => {
    getOneProduct(id);
  }, []);

  function saveComment(){
    let newComment = new FormData();
    newComment.append('text', review);
    newComment.append('product', id);
    createComment(id, newComment);
  };

  return oneProduct ? (
    <>
      <h3>{oneProduct.title}</h3>
      <h3>{oneProduct.description}</h3>
      <h3>{oneProduct.price}</h3>
      <h3>{oneProduct.category.title}</h3>
      {oneProduct.image ? (
        <img src={oneProduct.image} alt="error:(" width="200" height="200" />
      ) : (
        <h6>No images here</h6>
      )}
      <br/>

      <h5>Reviews:</h5>
      {oneProduct.reviews.map(item => (
        <div key={item.id}>
          <span><b>{item.author}</b></span>
          <span>{item.text}</span>
          {item.is_author ? (
            <button onClick={() => deleteComment(id, item.id)}>Delete</button>
          ) : (
            null
          )}
          <br/>
        </div>
      ))}

      <button onClick={() => setShowReviewBlock(!showReviewBlock)}>Add Comment</button>
      {showReviewBlock ? (
        <>
          <h6>Create Comment</h6>
          <input type="text" placeholder="Enter your comment" onChange={e => setReview(e.target.value)} />
          <button onClick={() => {
            saveComment();
            setShowReviewBlock(false);
          }}>Create</button>
        </>
      ) : (
        null
      )}
    </>
  ) : (
    <Loader />
  )
}

export default Details