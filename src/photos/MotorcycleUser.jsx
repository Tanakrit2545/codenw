import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Moto.css'; // Assuming Moto.css is directly inside the layout directory
import styled from 'styled-components';


export default function MotorcyclesUser() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [crustType, setCrustType] = useState('');
  const [size, setSize] = useState('');
  const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [cart, setCart] = useState([]); // 1. Cart state
  const [notification, setNotification] = useState(''); // Define notification state
  const itemsPerPage = 10; // Number of items per page

  // Rest of the code remains unchanged...


  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/motorcycles');
        setMotorcycles(response.data);
      } catch (error) {
        console.error('Error fetching motorcycles:', error);
      }
    };

    fetchMotorcycles();
  }, []);

  useEffect(() => {
    // Filter motorcycles based on search query, crust type, and size
    const filtered = motorcycles.filter(motorcycle =>
      motorcycle.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (crustType === '' || motorcycle.crustType === crustType) &&
      (size === '' || motorcycle.size === size)
    );
    setFilteredMotorcycles(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // Calculate totalPages and set the state variable
  }, [searchQuery, crustType, size, motorcycles]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredMotorcycles.length);
  const currentMotorcycles = filteredMotorcycles.slice(startIndex, endIndex);

  // Random set of motorcycle data
  const sampleMotorcycles = [
    { id: 1, name: 'Yamaha R1', crustType: 'Sportbike', size: '1000cc', price: '1200 THB/D', status:'ว่าง' , image: 'r1.jpg' },
    { id: 2, name: 'Honda CBR1000RR', crustType: 'Sportbike', size: '1000cc', price: '1200 THB/D', status:'ว่าง' ,image: 'cbr1000.jpg' },
    { id: 3, name: 'Kawasaki Ninja ZX-10R', crustType: 'Sportbike', size: '1000cc', price: '1200 THB/D', status:'ว่าง' , image: 'zx10.jpg' },
    { id: 4, name: 'Ducati Panigale V4', crustType: 'Sportbike', size: '1000cc', price: '1200 THB/D', status:'ว่าง' , image: 'v4.jpg' },
    { id: 5, name: 'BMW S1000RR', crustType: 'Sportbike', size: '1000cc', price: '1200 THB/D', status:'ไม่ว่าง' , image: 'bmw2.png' },
    { id: 6, name: 'Suzuki GSX-R1000', crustType: 'Sportbike', size: '1000cc', price: '1200 THB/D', status:'ไม่ว่าง' , image: 'gsx1000.png' },
    // Add data for the second page
    { id: 7, name: 'Harley-Davidson Iron 883', crustType: 'Cruiser', size: '883cc', price: '1000 THB/D', status:'ว่าง' , image: 'iron883.jpg' },
    { id: 8, name: 'Indian Scout Sixty', crustType: 'Cruiser', size: '1000cc', price: '1100 THB/D', status:'ว่าง' , image: 'scoutsixty.jpg' },
    { id: 9, name: 'Yamaha V Star 250', crustType: 'Cruiser', size: '250cc', price: '800 THB/D', status:'ไม่ว่าง' , image: 'vstar250.jpg' },
    { id: 10, name: 'Honda Rebel 300', crustType: 'Cruiser', size: '300cc', price: '900 THB/D', status:'ว่าง' , image: 'rebel300.jpg' },
    { id: 11, name: 'Kawasaki Vulcan S', crustType: 'Cruiser', size: '650cc', price: '950 THB/D', status:'ไม่ว่าง' , image: 'vulcans.jpg' },
    { id: 12, name: 'Suzuki Boulevard M50', crustType: 'Cruiser', size: '800cc', price: '1050 THB/D', status:'ว่าง' , image: 'm50.jpg' }
  ];

  // Set motorcycle data to the randomized data
  useEffect(() => {
    setMotorcycles(sampleMotorcycles);
    setFilteredMotorcycles(sampleMotorcycles);
    setTotalPages(Math.ceil(sampleMotorcycles.length / itemsPerPage));
  }, []);
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCrustChange = (e) => {
    setCrustType(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const addToCart = (motorcycle) => {
    // Check if the motorcycle is available (status is 'ว่าง') before adding to cart
    if (motorcycle.status === 'ว่าง') {
      const existingItem = cart.find(item => item.id === motorcycle.id);
      if (existingItem) {
        const updatedCart = cart.map(item => {
          if (item.id === motorcycle.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...motorcycle, quantity: 1 }]);
      }
      // Set notification message to display
      const notificationMessage = 'เพิ่มเข้าไปยังตระกร้าสำเร็จ';
      // Display notification message
      setNotification(notificationMessage);
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification('');
      }, 3000);
    } else {
      // Set notification message to display
      const notificationMessage = 'รถไม่ว่างในขณะนี้ ขออภัยในความไม่สะดวก';
      // Display notification message
      setNotification(notificationMessage);
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification('');
      }, 3000);
    }
  };
  
  
  
  const incrementQuantity = (item) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  // Click handler to decrement item quantity in cart
  const decrementQuantity = (item) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    }).filter(cartItem => cartItem.quantity > 0);
    setCart(updatedCart);
  };

  // Click handler to remove item from cart
  const removeFromCart = (item) => {
    const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
    setCart(updatedCart);
  };
  
  const refreshCart = () => {
    setCart([]);
  };

  // Moved the styled component definition outside of the component function
  const Status = styled.span`
    color: ${(props) => (props.status === 'ว่าง' ? 'green' : 'red')}; // Set color to green if status is 'ว่าง', red otherwise
  `;

  return (
    <div className="container">
      <h2>Motorcycles</h2>
      <div className="filters">
        <input type="text" className="filter-input" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
        <select className="filter-select" value={crustType} onChange={handleCrustChange}>
          <option value="">All Crust Types</option>
          <option value="Sportbike">Sportbike</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Touring">Touring</option>
          <option value="Naked">Naked</option>
        </select>
        <select className="filter-select" value={size} onChange={handleSizeChange}>
          <option value="">All Sizes</option>
          <option value="1000cc">1000cc</option>
          <option value="800cc">800cc</option>
          <option value="600cc">600cc</option>
        </select>
      </div>
      <div className="motorcycles">
        {currentMotorcycles.map(motorcycle => (
          <div key={motorcycle.id} className="motorcycle" onClick={() => addToCart(motorcycle)}>
            <img src={motorcycle.image} alt={motorcycle.name} />
            <h3>{motorcycle.name}</h3>
            <p><strong>Crust Type:</strong> {motorcycle.crustType}</p>
            <p><strong>Size:</strong> {motorcycle.size}</p>
            <p><strong>Price:</strong> {motorcycle.price}</p>
            <p><strong>Status:</strong> <Status status={motorcycle.status}>{motorcycle.status}</Status></p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button prev-button">Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-button next-button">Next</button>
      </div>
      <div className="cart">
        <h3>Cart</h3>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <div className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total Price: {item.quantity * parseInt(item.price)}</p>
                  <div className="cart-item-buttons">
                    <button onClick={() => incrementQuantity(item)} className="increment-button">+</button>
                    <button onClick={() => decrementQuantity(item)} className="decrement-button">-</button>
                    <button onClick={() => removeFromCart(item)} className="remove-button">Remove</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={refreshCart} className="refresh-button">Refresh Cart</button>
      </div>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded" >
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">Aboutus</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Motoecycle</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-6">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
      {notification && (
        <div className="notification">{notification}</div>
      )}
    </div>
  );
}
