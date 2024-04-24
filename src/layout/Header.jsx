import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import './Moto.css'; // Import CSS file



const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },
  // { to: '/motorcycle', text: 'Motorcycle' },
  // { to: '/MotorcycleUser', text: 'MotorcycleUser' }, // Corrected link to Motorcycle
  { to: '/aboutus', text: 'Aboutus' }, // Corrected lowercase link to Aboutus
  { to: '/contactus', text: 'ContactUsUser' },
   // Corrected lowercase link to ContactUsUser
];

const userNav = [
  { to: '/', text: 'Home' },
  // { to: '/motorcycles', text: 'Motorcycle' },
  // { to: '/MotorcycleUser', text: 'MotorcycleUser' }, // Corrected link to Motorcycle
  { to: '/aboutus', text: 'About us' }, // Corrected lowercase link to Aboutus
  { to: '/contactus', text: 'Contact Us' }, // Corrected lowercase link to ContactUs
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user?.id ? userNav : guestNav;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8999/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      const userResponse = await axios.get('http://localhost:8999/auth/me', {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });
      useAuth.setUser(userResponse.data);
      navigate(user?.id ? '/' : '/MotorcycleUser'); // ถ้าผู้ใช้ล็อกอินแล้วให้เปลี่ยนไปยังหน้า Home ถ้ายังไม่ได้ล็อกอินให้ไปที่หน้า MotorcycleUser
    } catch (err) {
      console.log(err.message);
    }
  };
  


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Hello, {user?.id ? user.firstName : 'Guest'}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map((el) => (
            <li key={el.to}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
       {user?.id ? (
  <>
    <li>
      <Link to="/Motorcycle">Motorcycle</Link>
    </li>
    <li>
      <Link to="#" onClick={handleLogout}>Logout</Link>
    </li>
  </>
) : (
  <>
    <li>
      <Link to="/login">Login</Link>
    </li>
    <li>
      <Link to="/MotorcycleUser">MotorcycleUser</Link>
    </li>
  </>
)}
        </ul>
      </div>
    </div>
  );
}
