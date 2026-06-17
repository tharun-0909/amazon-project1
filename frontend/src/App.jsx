import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import OrderPlaced from "./pages/OrderPlaced";
import OrdersPage from "./pages/OrdersPage";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/orderplaced" element={<OrderPlaced />} />
                <Route path="/admin" element={<AdminDashboard/>}/>
                <Route path="/orders" element={<OrdersPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;