// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Image } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

export function NavBar() {
    return (
        <nav className="nav">      

            <Image className="photo"  src='src\assets\divine-delicacies2.png' alt='logo' />

            <ul>
                <li><Link to="/"> Home </Link></li>
                {/* <li><Link to="/item"> Menu </Link></li> */}
                <li><Link to="/contact"> Contact Us </Link></li>
                <li><Link to="/login"> Order </Link></li>
                <li><Link to="/cart"> <TiShoppingCart /> </Link></li>
            </ul>
        </nav>
    );
}
