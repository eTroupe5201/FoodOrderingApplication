// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Button, Image } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useDataProvider } from "../components/dataProvider"

import { TiShoppingCart } from "react-icons/ti";


export function NavBar() {

    const { lines } = useDataProvider();
    const hasCartItems = lines.length > 0;

    return (
        <nav className="nav">      

<Image className="photo"  src='src\assets\divine-delicacies2.png' alt='logo' />

            <ul>
                <li><Link to="/"> Home </Link></li>
                {/* <li><Link to="/item"> Menu </Link></li> */}
                <li><Link to="/contact"> Contact Us </Link></li>
                <li><Link to="/menu"> Order </Link></li>
                <li><Link to="/login"> Login </Link></li>
                <li>
                    {hasCartItems ? (
                        <Link to="/cart"> <TiShoppingCart /> </Link>
                    ) : (
                        <TiShoppingCart style={{ opacity: 0.5, cursor: "not-allowed" }} />
                    )}
                </li>
                
                {/* <li><Link to="/info"> OurInfo </Link></li> */}
            </ul> 
            
        </nav>
         
    );
}

//redo this
//can add modal directly to this page, if we want to remove the login page
