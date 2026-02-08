// src/pages/PageShell.jsx
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export default function PageShell({ cartOpen, onOpenCart, onCloseCart }) {
  // Scroll arriba al cambiar ruta (evita que “caigas” en el footer y se vea raro)
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-black">
      <Header onCartClick={onOpenCart} />

      <Outlet />

      <Footer />

      {/* Drawer arriba de todo (si tu header tapa el drawer, aquí lo controlas) */}
      <CartDrawer open={cartOpen} onClose={onCloseCart} />
    </div>
  );
}
