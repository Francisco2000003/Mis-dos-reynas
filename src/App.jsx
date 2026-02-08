// src/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/cart";
import PageShell from "./pages/PageShell";

// Home sections (deja SOLO las que sí existen)
import Hero from "./components/Hero";
import NewCollection from "./components/NewCollection";
import CategoryStrip from "./components/CategoryStrip";
import Reviews from "./components/Reviews";
import InstagramStrip from "./components/InstagramStrip";
import Stores from "./components/Stores";

// Pages
import AboutPage from "./pages/about/AboutPage";
import ShowroomPage from "./pages/about/ShowroomPage";
import BlogPage from "./pages/about/BlogPage";

import HelpReturns from "./pages/help/HelpReturns";
import HelpShipping from "./pages/help/HelpShipping";
import HelpTrack from "./pages/help/HelpTrack";
import HelpFAQ from "./pages/help/HelpFAQ";
import HelpBilling from "./pages/help/HelpBilling";
import HelpContact from "./pages/help/HelpContact";

// ✅ Checkout pages (ajusta el path si los tienes en otra carpeta)
import CheckoutPage from "./pages/checkout/CheckoutPage";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import CheckoutPending from "./pages/checkout/CheckoutPending";
import CheckoutFailure from "./pages/checkout/CheckoutFailure";

import NotFound from "./pages/NotFound";

// Home “page” (solo contenido, sin Header/Footer)
function HomePage({ onAddToCart }) {
  return (
    <main>
      <Hero />
      <NewCollection onAddToCart={onAddToCart} />
      <CategoryStrip />

      {/* ❌ Eliminados: HowItWorks y Favorites */}

      <Reviews />
      <InstagramStrip />
      <Stores />
    </main>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Routes>
        <Route
          element={
            <PageShell
              cartOpen={cartOpen}
              onOpenCart={() => setCartOpen(true)}
              onCloseCart={() => setCartOpen(false)}
            />
          }
        >
          {/* HOME */}
          <Route index element={<HomePage onAddToCart={() => setCartOpen(true)} />} />

          {/* ABOUT */}
          <Route path="about" element={<AboutPage />} />
          <Route path="about/showroom" element={<ShowroomPage />} />
          <Route path="about/blog" element={<BlogPage />} />

          {/* HELP */}
          <Route path="help/returns" element={<HelpReturns />} />
          <Route path="help/shipping" element={<HelpShipping />} />
          <Route path="help/tracking" element={<HelpTrack />} />
          <Route path="help/faq" element={<HelpFAQ />} />
          <Route path="help/billing" element={<HelpBilling />} />
          <Route path="help/contact" element={<HelpContact />} />

          {/* ✅ CHECKOUT */}
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
          <Route path="checkout/pending" element={<CheckoutPending />} />
          <Route path="checkout/failure" element={<CheckoutFailure />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
