import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase/Firebase.config";

const SignUp = () => {
  const { createUserWithEmailAndPassword } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    createUserWithEmailAndPassword(app.auth(), email, password)
      .then((result) => {
        console.log(result.user);
        // new user has been created
        const createdAt = result.user.metadata.creationTime;
        const lastLoginAt = result.user.metadata.lastLoginAt;

        const user = { email, createdAt, lastLoginAt };
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              alert("data added successfully");
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Helmet>
        <title>DonateBlood | SignUp</title>
      </Helmet>
      <div className="hero">
        <div className="hero-content">
          <div className="card lg:w-[300px] shadow-2xl bg-base-100">
            <h1 className="text-center text-3xl font-bold mt-3">Please Register</h1>
            <form onSubmit={handleSignUp} className="card-body">
              {/* Form fields */}
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit" className="btn bg-cyan-800 hover:bg-cyan-600 text-white w-full mt-4">
                Sign Up
              </button>
            </form>
            <p className="text-center text-sm mb-4">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-800 font-bold">
                Login
              </Link>{" "}
              here
            </p>
            <div className="divider">OR</div>
            <p className="text-center ">sign in with</p>
            {/* Assuming you have a function handleGoogleSignIn */}
            {/* <button
              onClick={handleGoogleSignIn}
              className="font-bold mb-2 btn bg-cyan-800 hover:bg-cyan-600 text-white w-[35%] mx-auto"
            >
              Google
            </button> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
