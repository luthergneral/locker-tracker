import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import '../css/navigation.css';
import LogoutImg from '../assets/user-logout.png';

function Navigation() {
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/home" style={{fontWeight: 'bold', fontSize: '24px'}}>Locker Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <div className='linkText'>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/usertable">Directory</Nav.Link>
              <Nav.Link href="/locker">Locker</Nav.Link>
            </div>
          </Nav>  
          <div className='logout'>
            <Nav.Link onClick={handleSignOut}>Logout<img src={LogoutImg}></img></Nav.Link>
          </div>
        </Container>
      </Navbar>
      
    </>
  );
}

export default Navigation;