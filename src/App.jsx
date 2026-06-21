import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;
