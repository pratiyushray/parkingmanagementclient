import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Body from './Components/Body';
import Wallet from './Components/Wallet';
import Login from './Components/Login';
import Signup from './Components/Signup';
import MyBooking from './Components/MyBooking';
import PrivateRoute from './Components/PrivateRoute'; 
import BodyPage from './Components/BodyPage';
import Booking from './Components/UserBooking';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/home" element={<BodyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>}>
        </Route>


        <Route
          path="/wallet"
          element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MyBooking />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
