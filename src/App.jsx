import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { useEffect } from "react";

import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductGrid from "./components/ProductGrid";
import Recipes from "./components/Recipes";
import Reviews from "./components/Reviews";
import Newsletter from "./components/Newsletter";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

import ProductDetails from "./ProductDetails";
import RecipeDetails from "./RecipeDetails";

import Cart from "./Cart";
import Checkout from "./Checkout";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";

import Admin from "./Admin";
import TrackOrder from "./TrackOrder";
import PaymentUpload from "./PaymentUpload";

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    const params =
      new URLSearchParams(location.search);

    const section =
      params.get("section");

    if (section) {
      setTimeout(() => {
        const element =
          document.getElementById(section);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth"
          });
        }
      }, 300);
    }
  }, [location]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <ProductGrid />
      <Recipes />
      <Reviews />
      <Newsletter />
      <ContactCTA />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      <ScrollHandler />

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/recipe/:id"
          element={<RecipeDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/track-order"
          element={<TrackOrder />}
        />

        <Route
          path="/payment-upload"
          element={<PaymentUpload />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;