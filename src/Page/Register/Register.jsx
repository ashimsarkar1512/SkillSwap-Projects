import React, { useContext, useState } from 'react';
import img from "../../../public/3094352.jpg"; // Reusing the same image as Login
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'learner'
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Proceed with user creation (no email or name validation)
    createUser(formData.email, formData.password)
      .then(result => {
        const loggedUser = result.user;
        console.log('Logged user:', loggedUser); // Logging the logged-in user
        // You can also handle other tasks after successful registration
      })
      .catch(error => {
        console.error('Error during registration:', error.message); // Error handling
      });

    console.log(formData); // Log the form data to the console when the form is submitted

    // Uncomment this part later for the POST request
    // const res = await fetch('http://localhost:5000/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });

    // const data = await res.json();
    // alert(data.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        
        {/* Image Section */}
        <div className="hidden w-1/2 md:block">
          <img
            src={img}
            alt="Register Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full p-8 md:w-1/2">
          <h2 className="mb-6 text-3xl font-bold text-center text-black">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 text-black px-4 py-2 focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 text-black px-4 py-2 focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 text-black px-4 py-2 focus:outline-none focus:ring-2"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block mb-1">Role</label>
              <select
                id="role"
                name="role"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 text-black px-4 py-2 focus:outline-none focus:ring-2"
              >
                <option value="learner">Learner</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account? <Link to="/login">login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
