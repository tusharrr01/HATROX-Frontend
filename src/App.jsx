import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import OwnerLogin from "./pages/OwnerLogin";
import Admin from "./pages/Admin";
import CreateProducts from "./pages/CreateProducts";
import TopMarquee from "./components/TopMarquee";
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* <TopMarquee/> */}
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/owner-login" element={<OwnerLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create-products" element={<CreateProducts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
