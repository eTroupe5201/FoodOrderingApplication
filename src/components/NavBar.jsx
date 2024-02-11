// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Button, Image } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useDataProvider } from "../components/dataProvider"
import logoImage from '../assets/FO_logo.png';



export function NavBar() {

    const { lines } = useDataProvider();
    const hasCartItems = lines.length > 0;

    return (
        <nav className="nav">      

            <Image boxSize='60px' mr='50px' src={logoImage} alt='draft_logo' />

            <ul>
                <li><Link to="/"> Home </Link></li>
                {/* <li><Link to="/item"> Menu </Link></li> */}
                <li><Link to="/contact"> Contact Us </Link></li>
                <li><Link to="/menu"> Order </Link></li>
                <li>
                    {hasCartItems ? (
                        <Link to="/cart"> Cart </Link>
                    ) : (
                        <Button isDisabled={true} variant="ghost">
                            Cart
                        </Button>
                    )}
                </li>
                <li><Link to="/info"> OurInfo </Link></li>
            </ul>
        </nav>
    );
}
