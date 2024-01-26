import {NavBar} from './components/NavBar';
import { Banner } from './components/Banner';
import { Footer } from './components/Footer';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <><div className='App'> 

    <NavBar/>     
    <Banner/>
    <Footer/>

    </div></>
   
    // <BrowserRouter>
    //   <Routes>
    //         <Route index element={<Home />} />
    //         <Route path="login" element={<Login />} />
    //         <Route path="cart" element={<Cart />} />
    //   </Routes>
    // </BrowserRouter>

  )
}

export default App
