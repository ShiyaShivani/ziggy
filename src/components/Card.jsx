import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();

  // Handle clicking when user is not logged in
  const handleClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  };

  // Handle quantity selection
  const handleQty = (e) => {
    setQty(e.target.value);
  };

  // Handle size selection
  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  // Handle adding item to cart
  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === foodItem._id);

    if (food && food.size === size) {
      // Update quantity if the item already exists with the same size
      await dispatch({ type: 'UPDATE', id: foodItem._id, price: finalPrice, qty: qty });
    } else {
      // Add a new item to the cart
      await dispatch({
        type: 'ADD',
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.ImgSrc,
      });
    }
  };

  // Set the initial size value
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  // Calculate the final price based on quantity and selected size
  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'fill' }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100 p-0" style={{ height: '38px' }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <div className="d-inline ms-2 h-100 w-20 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
