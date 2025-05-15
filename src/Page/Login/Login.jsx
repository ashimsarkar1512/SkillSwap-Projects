import React, { useContext } from 'react';
import img from "../../../public/3094352.jpg";
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        // SweetAlert success message
        Swal.fire({
          title: 'Login Successful!',
          text: 'Welcome back!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true,
          position: 'center',
        });

        // Optional: redirect after login
       navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);

        // Show error alert
        Swal.fire({
          title: 'Login Failed',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Try Again',
          position: 'center',
        });
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Image Section */}
        <div className="hidden w-1/2 md:block">
          <img
            src={img}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full p-8 md:w-1/2">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 ">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
