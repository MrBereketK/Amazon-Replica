import React, { useState, useEffect, useContext } from "react";
import "./Auth.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import logo from "../../assets/amazonSignin-page.png";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    state: { user },
  } = useContext(DataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect authenticated users away from the auth page
  useEffect(() => {
    if (user) {
      navigate(location.state?.redirect || "/", { replace: true });
    }
  }, [user, navigate, location.state]);

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/user-not-found":
        return "No account found with this email.";

      case "auth/wrong-password":
        return "Incorrect password.";

      case "auth/email-already-in-use":
        return "An account already exists with this email.";

      case "auth/weak-password":
        return "Password must contain at least 6 characters.";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";

      case "auth/network-request-failed":
        return "Please check your internet connection.";

      case "auth/invalid-credential":
        return "Incorrect email or password.";

      default:
        return code || "Something went wrong.";
    }
  };

  const signIn = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      return setError("Email is required.");
    }

    if (!password) {
      return setError("Password is required.");
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate(location.state?.redirect || "/");
    } catch (err) {
      console.error("Sign-in error:", err);
      setError(getErrorMessage(err.code) === "Something went wrong." ? err.message : getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const register = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      return setError("Email is required.");
    }

    if (password.length < 6) {
      return setError("Password must contain at least 6 characters.");
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);

      navigate(location.state?.redirect || "/");
    } catch (err) {
      console.error("Register error:", err);
      setError(getErrorMessage(err.code) === "Something went wrong." ? err.message : getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={logo} alt="Amazon Logo" />
      </Link>

      <div className="login__container">
        <h1>Sign-In</h1>
        
        {location.state?.msg && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>
            {location.state.msg}
          </p>
        )}

        <form>
          <h5>E-mail</h5>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login__error">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            onClick={signIn}
            className="login__signInButton"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p>
          By signing in you agree to the AMAZON Clone Conditions of Use & Sale.
        </p>

        <button
          disabled={loading}
          onClick={register}
          className="login__registerButton"
        >
          {loading ? "Creating Account..." : "Create your Amazon Account"}
        </button>
      </div>
    </div>
  );
};

export default Auth;

/*
import { useEffect } from "react";
import keycloak from "../../Utility/keycloak";

const Auth = () => {
  useEffect(() => {
    keycloak.login();
  }, []);

  return null;
};

export default Auth;
*/