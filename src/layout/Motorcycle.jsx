// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';

// export default function MotorcyclesUser() {
//   const [motorcycles, setMotorcycles] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [crustType, setCrustType] = useState('');
//   const [size, setSize] = useState('');
//   const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     const fetchMotorcycles = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/motorcycles');
//         setMotorcycles(response.data);
//       } catch (error) {
//         console.error('Error fetching motorcycles:', error);
//       }
//     };

//     fetchMotorcycles();
//   }, []);

//   useEffect(() => {
//     // Filter motorcycles based on search query, crust type, and size
//     const filtered = motorcycles.filter(motorcycle =>
//       motorcycle.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (crustType === '' || motorcycle.crustType === crustType) &&
//       (size === '' || motorcycle.size === size)
//     );
//     setFilteredMotorcycles(filtered);
//     setTotalPages(Math.ceil(filtered.length / 6)); // Calculate totalPages and set the state variable
//   }, [searchQuery, crustType, size, motorcycles]);

//   // Check condition in nextPage() to prevent navigating to the next page when there's no content on the next page
//   const nextPage = () => {
//     const totalPages = Math.ceil(filteredMotorcycles.length / 6); // Assuming there are 6 items per page
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const startIndex = (currentPage - 1) * 6;
//   const endIndex = startIndex + 6;
//   const currentMotorcycles = filteredMotorcycles.slice(startIndex, endIndex);


//   const sampleMotorcycles = [
//     { id: 1, name: 'Yamaha R1', crustType: 'Sportbike', size: '1000cc', image: 'https://example.com/yamaha_r1.jpg' },
//     { id: 2, name: 'Honda CBR1000RR', crustType: 'Sportbike', size: '1000cc', image: 'https://example.com/honda_cbr1000rr.jpg' },
//     { id: 3, name: 'Kawasaki Ninja ZX-10R', crustType: 'Sportbike', size: '1000cc', image: 'https://example.com/kawasaki_ninja_zx10r.jpg' },
//     { id: 4, name: 'Ducati Panigale V4', crustType: 'Sportbike', size: '1000cc', image: 'https://example.com/ducati_panigale_v4.jpg' },
//     { id: 5, name: 'BMW S1000RR', crustType: 'Sportbike', size: '1000cc', image: 'https://example.com/bmw_s1000rr.jpg' },
//     { id: 6, name: 'Suzuki GSX-R1000', crustType: 'Sportbike', size: '1000cc', image: 'https://example.com/suzuki_gsxr1000.jpg' }
//   ];
// ห
//   useEffect(() => {
//     setMotorcycles(sampleMotorcycles);
//     setFilteredMotorcycles(sampleMotorcycles);
//     setTotalPages(Math.ceil(sampleMotorcycles.length / 6));
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCrustChange = (e) => {
//     setCrustType(e.target.value);
//   };

//   const handleSizeChange = (e) => {
//     setSize(e.target.value);
//   };

//   return (
//    // Inside the return statement
// <div className="navbar-container">
//   <div className="navbar bg-gradient-to-r from-orange-200 via-red-300 to-red-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
//     <div className="flex-1">
//       <NavLink to="/" className="mx-16" activeClassName="text-red-600">
//         <div className="logoG" />
//       </NavLink>
//       <NavLink exact to="/header" className="mx-6 font-semibold">หน้าหลัก</NavLink>
//       <NavLink to="/about" className="mx-6 font-semibold" activeClassName="text-red-600 ">เกี่ยวกับเรา</NavLink>
//       <NavLink to="/motorcycle" className="mx-6 font-semibold" activeClassName="text-red-600 " style={{ color: '#dc2626' }}>รถจักรยานยนต์</NavLink>

//       <NavLink to="/contact" className="mx-6 font-semibold" activeClassName="text-red-600 ">ติดต่อเรา</NavLink>
//     </div>
//   </div>
//   <div className="container">
//     <h2>Motorcycles</h2>
//     <div className="filters">
//       <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
//       <select value={crustType} onChange={handleCrustChange}>
//         <option value="">All Crust Types</option>
//         <option value="Sportbike">Sportbike</option>
//         <option value="Cruiser">Cruiser</option>
//         <option value="Touring">Touring</option>
//         <option value="Naked">Naked</option>
//       </select>
//       <select value={size} onChange={handleSizeChange}>
//         <option value="">All Sizes</option>
//         <option value="1000cc">1000cc</option>
//         <option value="800cc">800cc</option>
//         <option value="600cc">600cc</option>
//       </select>
//     </div>
//     <div className="motorcycles">
//       {currentMotorcycles.map(motorcycle => (
//         <div key={motorcycle.id} className="motorcycle">
//           <img src={motorcycle.image} alt={motorcycle.name} />
//           <h3>{motorcycle.name}</h3>
//           <p><strong>Crust Type:</strong> {motorcycle.crustType}</p>
//           <p><strong>Size:</strong> {motorcycle.size}</p>
//         </div>
//       ))}
//     </div>
//     <div className="pagination">
//       <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
//       <span>Page {currentPage} of {totalPages}</span>
//       <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
//     </div>
//   </div>
//   <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded" >
//         <nav className="grid grid-flow-col gap-4">
//           <a className="link link-hover">Aboutus</a>
//           <a className="link link-hover">Contact</a>
//           <a className="link link-hover">Motoecycle</a>
          
//         </nav>
//         <nav>
//           <div className="grid grid-flow-col gap-6">
//             <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
//             <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
//             <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
//           </div>
//         </nav>
//         <aside>
//           <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
//         </aside>
//       </footer>
// </div>
//   );
// }
