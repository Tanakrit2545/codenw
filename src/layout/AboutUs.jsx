import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Moto.css'; // Import CSS file

// Import images
import bmw2 from '../photos/bmw2.png';
import v4 from '../photos/v4.jpg';
import R1M from '../photos/zx10.jpg';
import zx10 from '../photos/gs.png';
import cbr1000 from '../photos/cbr1000.jpg';
import ninja400 from '../photos/R1M.png';
import gsx1000 from '../photos/tm.jpg';

function About() {
  // ข้อมูลรถตัวอย่างพร้อมราคา/วัน
  const cars = [
    { name: 'รถเช่า Yamaha Mio', price: '500 บาท/วัน', image: bmw2 },
    { name: 'รถเช่า Honda Click', price: '600 บาท/วัน', image: v4 },
    { name: 'รถเช่า Kawasaki Ninja', price: '1000 บาท/วัน', image: R1M },
    { name: 'รถเช่า Honda CBR1000RR', price: '1200 บาท/วัน', image: cbr1000 },
    { name: 'รถเช่า Kawasaki Ninja 400', price: '800 บาท/วัน', image: ninja400 },
    { name: 'รถเช่า Suzuki GSX-S1000', price: '1100 บาท/วัน', image: gsx1000 },
    { name: 'รถเช่า Kawasaki ZX-10R', price: '1500 บาท/วัน', image: zx10 }
    // เพิ่มข้อมูลรถตัวอย่างเพิ่มเติมตามต้องการ
  ];

  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentCarIndex(currentIndex => (currentIndex + 1) % cars.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentCarIndex]);

  return (
    <div className="navbar-container">
      {/* Navbar ส่วนอื่น ๆ */}
      {/* ... */}

      {/* เนื้อหา About */}
      <div className="background-containerA relative flex flex-col justify-center h-screen">
        {/* เนื้อหาเกี่ยวกับร้าน */}
        <div className="text-animation-container">
          <p className="text-white text-6xl font-semibold ml-20 mb-6 text-animation" style={{ color: '#dc2626', marginTop: '40px' }}>เกี่ยวกับร้านเช่ารถจักรยานยนต์</p>
          <p className="text-white text-1xl font-semibold ml-20 mb-3 text-animation">
            เรามีความเชี่ยวชาญในการให้บริการเช่ารถจักรยานยนต์ เพื่อให้คุณเพลิดเพลินกับการขับรถเพื่อการท่องเที่ยว
          </p>
        </div>

        {/* แสดงรูปภาพรถตัวอย่างพร้อมป้ายราคา/วัน */}
        <div className="custom-image-container">
          <div className="car-container">
            {cars.slice(currentCarIndex, currentCarIndex + 1).map((car, index) => (
              <div key={index} className="car-card">
                <div className="car-item">
                  <img src={car.image} alt={car.name} className="custom-image" />
                </div>
                <div className="price-tag">{car.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* แสดงข้อมูลรถที่แสดงอยู่ข้างขวา */}
        <div className="car-info">
          <h2>{cars[currentCarIndex].name}</h2>
          <p>{cars[currentCarIndex].price}</p>
        </div>
      </div>
    </div>
  );
}

export default About;
