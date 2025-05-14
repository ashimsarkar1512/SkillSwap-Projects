import React, { useContext, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const links = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-blue-600">MySite</a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              {link.name}
            </a>
          ))}
          
          {/* Conditional Button */}
          {user ? (
            <button
              onClick={handleLogOut}
              className="ml-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-gray-700 hover:text-blue-600 border-b"
            >
              {link.name}
            </a>
          ))}

          {/* Conditional Button for Mobile */}
          {user ? (
            <button
              onClick={handleLogOut}
              className="w-full text-left py-2 text-red-500 hover:text-red-600 border-b"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block py-2 text-blue-500 hover:text-blue-600 border-b"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
