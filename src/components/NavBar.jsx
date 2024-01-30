import React from 'react';
import { Image } from '@chakra-ui/react';
import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav className="nav">      

            <Image boxSize='60px' mr='50px' src='src\assets\FO_logo.png' alt='draft_logo' />

            <ul>
                <li><Link to="/"> Home </Link></li>
                {/* <li><Link to="/item"> Menu </Link></li> */}
                <li><Link to="/contact"> Contact Us </Link></li>
                <li><Link to="/login"> Order </Link></li>
            </ul>
        </nav>
    );
}
