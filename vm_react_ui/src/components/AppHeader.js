import {React, Text} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import '../Pages/Home/HomeStyles.css';

const AppHeader = () => {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">
        <img className="logo"
          src="https://img.icons8.com/color/50/000000/vending-machine.png/"
         
          className="d-inline-block align-top"
          alt=""
        />
      
      </NavbarBrand>
    </Navbar>
  );
};

export default AppHeader;
