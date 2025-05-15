import React, { useContext, useState } from 'react';
import img from "../../../public/3094352.jpg";
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'learner',
    image: null, // New: image file
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Step 1: Upload image to imgbb
    let imageUrl = '';
    if (formData.image) {
      const imageData = new FormData();
      imageData.append('image', formData.image);

      const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: imageData,
      });
      const uploadData = await uploadRes.json();

      if (uploadData.success) {
        imageUrl = uploadData.data.url;
      } else {
        console.error('Image upload failed');
        return;
      }
    }

    // Step 2: Create user with email and password
    createUser(formData.email, formData.password)
      .then(async result => {
        const loggedUser = result.user;
        console.log('User created:', loggedUser);

        const newUser = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          image: imageUrl,
        };

        // Optional: save to your own backend
        const res = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        const data = await res.json();
        alert(data.message);
      })
      .catch(error => {
        console.error('Registration error:', error.message);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="hidden w-1/2 md:block">
          <img src={img} alt="Register Visual" className="h-full w-full object-cover" />
        </div>
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
                className="w-full rounded-lg border border-gray-300 text-black px-4 py-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 text-black px-4 py-2"
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
                className="w-full rounded-lg border border-gray-300 text-black px-4 py-2"
              />
            </div>
            <div>
              <label htmlFor="role" className="block mb-1">Role</label>
              <select
                id="role"
                name="role"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 text-black px-4 py-2"
              >
                <option value="learner">Learner</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>
            <div>
              <label htmlFor="image" className="block mb-1">Profile Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
