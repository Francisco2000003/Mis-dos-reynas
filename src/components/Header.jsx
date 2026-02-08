// src/components/Header.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_mis_dos_reynas.png";
import { useCart } from "../context/cart";

export default function Header({ onCartClick }) {
  // ✅ SOLO visibles en PC (como tu screenshot)
  const topLinks = [
    { label: "NEW ARRIVALS", href: "#" },
    { label: "REBAJAS", href: "#" },
  ];

  // ✅ Catálogo (SIN Palazzos y SIN Bolsos y Accesorios)
  const catalogItems = [
    { label: "Conjuntos / Sets", href: "#" },
    { label: "Suéteres y Chamarras", href: "#" },
    { label: "Vestidos", href: "#" },
    { label: "Blusas", href: "#" },
    { label: "Chalecos", href: "#" },
    { label: "Sacos", href: "#" },
    { label: "Faldas", href: "#" },
    { label: "Pantalones", href: "#" },
    { label: "Shorts", href: "#" },
  ];

  const { count } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpenMobile, setCatalogOpenMobile] = useState(false);

  const [catalogOpenDesktop, setCatalogOpenDesktop] = useState(false);
  const desktopCatalogRef = useRef(null);

  // Cerrar con ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setCatalogOpenMobile(false);
        setCatalogOpenDesktop(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Evitar scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Cerrar dropdown desktop si das click fuera
  useEffect(() => {
    if (!catalogOpenDesktop) return;

    const onDown = (e) => {
      if (!desktopCatalogRef.current) return;
      if (!desktopCatalogRef.current.contains(e.target)) {
        setCatalogOpenDesktop(false);
      }
    };

    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [catalogOpenDesktop]);

  // Helpers para móvil (orden específico)
  const newArrivals = topLinks.find((x) => x.label === "NEW ARRIVALS");
  const rebajas = topLinks.find((x) => x.label === "REBAJAS");

  return (
    <header className="sticky top-0 z-50 bg-white border-b overflow-x-clip">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 overflow-x-clip">
        {/* ===================== */}
        {/* MOBILE HEADER (<= lg) */}
        {/* ===================== */}
        <div className="lg:hidden">
          {/* Subimos altura para que el logo se vea grande y respirado */}
          <div className="h-24 sm:h-24 grid grid-cols-[auto,1fr,auto] items-center gap-2">
            {/* IZQUIERDA: ☰ + lupa */}
            <div className="flex items-center gap-2 justify-self-start">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="shrink-0 w-10 h-10 rounded-full border hover:bg-gray-50 transition flex items-center justify-center"
                aria-label="Abrir menú"
                title="Menú"
              >
                <span className="text-lg leading-none">☰</span>
              </button>

              <button
                type="button"
                className="shrink-0 w-10 h-10 rounded-full border hover:bg-gray-50 transition flex items-center justify-center"
                title="Buscar"
                aria-label="Buscar"
              >
                ⌕
              </button>
            </div>

            {/* LOGO CENTRADO (más grande y responsivo) */}
            <Link
              to="/"
              className="min-w-0 justify-self-center flex items-center justify-center"
              aria-label="Ir al inicio"
              title="Inicio"
            >
              <img
                  src={logo}
                           alt="Logo Boutique"
                        className="h-[100px] sm:h-[110px] w-auto object-contain max-w-[min(78vw,500px)] scale-[1.06] origin-center"
                         draggable="false"
                            />


            </Link>

            {/* DERECHA: cuenta + carrito */}
            <div className="flex items-center gap-2 justify-self-end">
              <button
                type="button"
                className="shrink-0 w-10 h-10 rounded-full border hover:bg-gray-50 transition flex items-center justify-center"
                title="Cuenta"
                aria-label="Cuenta"
              >
                👤
              </button>

              <button
                type="button"
                onClick={onCartClick}
                className="shrink-0 relative w-10 h-10 rounded-full border hover:bg-gray-50 transition flex items-center justify-center"
                title="Carrito"
                aria-label="Abrir carrito"
              >
                🛍
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-[11px] leading-[18px] text-center">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ===================== */}
        {/* DESKTOP HEADER (lg+)  */}
        {/* ===================== */}
        <div className="hidden lg:flex h-32 xl:h-36 2xl:h-40 items-center justify-between gap-4">
          {/* LOGO (izquierda) - más grande */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Logo Boutique"
              className="
                w-auto object-contain
                h-[180px] xl:h-[190px] 2xl:h-[210px]
                max-w-[420px] xl:max-w-[560px] 2xl:max-w-[640px]
              "
            />
          </Link>

          {/* NAV (centro) */}
          <nav className="flex-1 flex justify-center items-center gap-6 text-sm font-semibold">
            {/* CATALOGO dropdown */}
            <div className="relative" ref={desktopCatalogRef}>
              <button
                type="button"
                onClick={() => setCatalogOpenDesktop((v) => !v)}
                className="inline-flex items-center gap-2 hover:opacity-70 transition"
                aria-expanded={catalogOpenDesktop}
                aria-haspopup="menu"
              >
                CATALOGO
                <span className="text-xs">{catalogOpenDesktop ? "▲" : "▼"}</span>
              </button>

              {catalogOpenDesktop && (
                <div
                  className="
                    absolute left-1/2 -translate-x-1/2 mt-4
                    w-[min(760px,92vw)]
                    bg-white border rounded-3xl shadow-2xl p-5
                  "
                  role="menu"
                >
                  <div className="text-xs font-bold text-gray-500 mb-3">
                    CATEGORÍAS
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {catalogItems.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        onClick={() => setCatalogOpenDesktop(false)}
                        className="rounded-2xl px-4 py-3 border hover:bg-gray-50 transition font-medium"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCatalogOpenDesktop(false)}
                      className="text-sm underline hover:opacity-70"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SOLO los links que quieres en PC */}
            {topLinks.map((t) => (
              <a key={t.label} href={t.href} className="hover:opacity-70">
                {t.label}
              </a>
            ))}
          </nav>

          {/* ICONOS (derecha) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="w-10 h-10 rounded-full border hover:bg-gray-50 transition flex items-center justify-center"
              title="Buscar"
              aria-label="Buscar"
            >
              ⌕
            </button>

            <button
              type="button"
              className="w-10 h-10 rounded-full border hover:bg-gray-50 transition flex items-center justify-center"
              title="Cuenta"
              aria-label="Cuenta"
            >
              👤
            </button>

            <button
              type="button"
              onClick={onCartClick}
              className="relative w-10 h-10 rounded-full border hover:bg-gray-50 transition flex items-center justify-center"
              title="Carrito"
              aria-label="Abrir carrito"
            >
              🛍
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-[11px] leading-[18px] text-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* BARRA DE TEXTO (igual para todos) */}
        <div className="py-2 text-center text-xs font-semibold underline">
          ¿CÓMO NAVEGAR EN EL NUEVO SITIO?
        </div>
      </div>

      {/* ===================== */}
      {/* MOBILE MENU DRAWER    */}
      {/* ===================== */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          />

          {/* panel */}
          <aside className="absolute left-0 top-0 h-full w-[86vw] max-w-[360px] bg-white shadow-2xl border-r overflow-y-auto">
            <div className="h-16 px-4 flex items-center justify-between border-b">
              <div className="font-extrabold tracking-wide">MENÚ</div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-full border hover:bg-gray-50 transition flex items-center justify-center"
                aria-label="Cerrar menú"
                title="Cerrar"
              >
                ✕
              </button>
            </div>

            <nav className="p-4">
              {/* ✅ ORDEN MÓVIL: NEW ARRIVALS ARRIBA */}
              {newArrivals && (
                <a
                  href={newArrivals.href}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-2xl px-4 py-3 border hover:bg-gray-50 transition text-sm font-semibold"
                >
                  {newArrivals.label}
                </a>
              )}

              {/* ✅ CATALOGO EN MEDIO */}
              <button
                type="button"
                onClick={() => setCatalogOpenMobile((v) => !v)}
                className="mt-3 w-full flex items-center justify-between rounded-2xl px-4 py-3 border hover:bg-gray-50 transition font-semibold"
                aria-expanded={catalogOpenMobile}
              >
                <span>CATALOGO</span>
                <span className="text-sm">{catalogOpenMobile ? "▲" : "▼"}</span>
              </button>

              {catalogOpenMobile && (
                <ul className="mt-3 space-y-2">
                  {catalogItems.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        onClick={() => {
                          setCatalogOpenMobile(false);
                          setMenuOpen(false);
                        }}
                        className="block rounded-2xl px-4 py-3 border hover:bg-gray-50 transition text-sm font-medium"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* ✅ REBAJAS ABAJO */}
              {rebajas && (
                <a
                  href={rebajas.href}
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 block w-full rounded-2xl px-4 py-3 border hover:bg-gray-50 transition text-sm font-semibold"
                >
                  {rebajas.label}
                </a>
              )}

              <div className="mt-6 text-xs font-semibold text-gray-500 mb-3">
                ACCESOS
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="rounded-2xl px-3 py-3 border hover:bg-gray-50 transition text-sm"
                  onClick={() => {
                    setMenuOpen(false);
                    onCartClick?.();
                  }}
                >
                  Ver carrito
                </button>

                <a
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-3 border hover:bg-gray-50 transition text-sm text-center"
                >
                  Contacto
                </a>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
