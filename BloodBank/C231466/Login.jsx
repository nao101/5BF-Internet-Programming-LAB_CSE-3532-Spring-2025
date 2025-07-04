import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../Firebase/Firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast("You are successfully logged in");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);

    signInUser(email, password)
      .then(result => {
        console.log(result.user);
        const user = {
          email,
          lastLoggedAt: result.user?.metadata?.lastSignInTime
        };

        // send to the backend
        return fetch('http://localhost:5000/user', {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        });
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // Handle response data if needed
      })
      .catch(error => {
        console.log(error);
        toast(error.message);
      })
      .finally(() => {
        e.target.reset();
        navigate(location?.state ? location.state : "/");
      });
  };

  return (
    <div>
      <Helmet>
        <title>DonateBlood| Login</title>
      </Helmet>

      <div className="hero ">
        <div className="hero-content ">
          <div className="card lg:w-[300px] shadow-2xl bg-base-100">
            <h1 className="text-center text-3xl font-bold mt-3">
              Please Login
            </h1>
            <form method="post" onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="bg-gradient-to-r from-cyan-800  to-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-800 text-xl  px-4 py-2 rounded-md text-white">
                  Login
                </button>
              </div>
            </form>
            <p className="text-center text-sm mb-4">
              Do not have an account?{" "}
              <Link to="/signUp" className="text-cyan-800 font-bold">
                Sign Up
              </Link>{" "}
              here
            </p>

            <div className="divider">OR</div>
            <p className="text-center ">sign in with</p>
            <button
              onClick={handleGoogleSignIn}
              className=" font-bold mb-2 btn bg-cyan-800 hover:bg-cyan-600 text-white w-[35%] mx-auto  "
            >
              Google
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
