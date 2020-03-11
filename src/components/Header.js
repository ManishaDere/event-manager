import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">Event Manager App</Navbar.Brand>
    </Navbar>
  );
};
export default Header;