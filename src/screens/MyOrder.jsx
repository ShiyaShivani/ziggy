import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      // Handle the case where userEmail is not available
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail
        })
      });

      if (!response.ok) {
        // Handle the case where the response is not okay (e.g., server error)
        return;
      }

      const data = await response.json();
      setOrderData(data.orderData || []);
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className='container'>
        <div className='row'>
          {orderData && orderData.length > 0 ? (
            orderData.map((data) => {
              return data.order_data ? (
                data.order_data.map((item) => {
                  return item.map((arrayData, index) => (
                    <div key={index} className='col-12 col-md-6 col-lg-3'>
                      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                        <div className="card-body">
                          <h5 className="card-title">{arrayData.name}</h5>
                          <div className='container w-100 p-0' style={{ height: "38px" }}>
                            <span className='m-1'>{arrayData.qty}</span>
                            <span className='m-1'>{arrayData.size}</span>
                            <span className='m-1'>{arrayData[0]}</span>
                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                              ₹{arrayData.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })
              ) : null;
            })
          ) : (
            <div>No order data available.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
