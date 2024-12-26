import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="flex gap-10">
    <Link to="/">Home</Link>
    <Link to="/summer">Summer</Link>
    <Link to="/winter">Winter</Link>
    <Link to="/rain">Rain</Link>
    <Link to="/chatbot">Chatbot</Link>
    <Link to="/dashbord">Dashbord</Link>
  </div>
);

export default Navbar;
