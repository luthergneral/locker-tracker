import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebaseConfig";
import { ProtectedRoute } from "./components/protectedRoute";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Form from "./components/Form";
import Directory from "./components/Directory";
import LockerGrid from "./components/LockerGrid";
import Navigation from "./components/navigation";
import "./css/App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Welcome user={user} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Navigation />
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/directory"
          element={
            <ProtectedRoute user={user}>
              <Navigation />
              <Directory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locker"
          element={
            <ProtectedRoute user={user}>
              <Navigation />
              <LockerGrid />
              <Form />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
