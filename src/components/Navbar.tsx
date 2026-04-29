import { Link } from 'react-router-dom';
import logo from '../assets/vite.svg';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <img src={logo} alt="Company Logo" width="50" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;