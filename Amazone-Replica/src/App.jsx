import { useContext, useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import "./App.css";
import Routing from "./Router";
import { auth } from "./Utility/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { type } from "./Utility/actionType";

function App() {
  const { dispatch } = useContext(DataContext);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: type.SET_USER,
          payload: user,
        });
      } else {
        dispatch({
          type: type.SET_USER,
          payload: null,
        });
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!isAuthReady) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  return <Routing />;
}

export default App;

/*
import { useContext, useEffect, useRef } from "react";

import "./App.css";
import Routing from "./Router";

import keycloak from "./Utility/keycloak";

import { DataContext } from "./Components/DataProvider/DataProvider";
import { type } from "./Utility/actionType";

function App() {
  const { dispatch } = useContext(DataContext);

  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        checkLoginIframe: false,
        redirectUri: window.location.origin,
      })
      .then((authenticated) => {
        if (authenticated) {
          dispatch({
            type: type.SET_USER,
            payload: { ...keycloak.tokenParsed, uid: keycloak.tokenParsed.sub },
          });

          dispatch({
            type: type.SET_TOKEN,
            payload: keycloak.token,
          });
        } else {
          dispatch({
            type: type.SET_USER,
            payload: null,
          });

          dispatch({
            type: type.SET_TOKEN,
            payload: null,
          });
        }
      })
      .catch((err) => {
        console.error("Keycloak initialization failed:", err);
      });
  }, [dispatch]);
  
  return <Routing />;
}

export default App;
*/