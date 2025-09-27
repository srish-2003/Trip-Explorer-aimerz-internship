import React, { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user"); // redirect to user landing page
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(("http://localhost:5000/api/auth/login"),
        {
          method: 'POST',
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ username: data.username, email: data.email }));
        navigate('/user')
      }
      else {
        alert(data.message || "Failed to Login");
      }
    }
    catch (err) {
      alert("Error logging in : ", err)
    }
  };

  return (
    <div className="bg-green-900 min-h-screen flex items-center justify-center">
      <div className="formcontainer bg-white rounded-lg shadow-lg flex overflow-hidden w-[900px]">
        {/* Image section */}
        <div className="form-image w-1/2 hidden md:block">
          <img
            src={assets.login_image}
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form section */}
        <div className="form-data w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="form-inputs space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded transition"
            >
              Login
            </button>
          </form>

          {/* Link to signup */}
          <div className="linkto text-center mt-4">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-green-700 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


/** <div className="bg-green-900">
 *    <div className="formcontainer">
 *      <div className="form-image">
 *        img src=assets.login
 *      </div>
 *      <div className="form-data">
 *        <div className="form-inputs">
 *          abel:for email
 *         imput type:email
 *          label for password
 *          imput type:password
 *          submit button link to UserLandingPage 
 *        </div>
 *          <div className="linkto">
 *            dont have a account? link to signin
 *          </div>
 *      </div>
 *      
 * </div>
 * </div> */
