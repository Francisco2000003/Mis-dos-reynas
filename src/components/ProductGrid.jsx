// src/components/ProductGrid.jsx
import { useEffect, useMemo, useRef, useState } from "react";

export default function ProductGrid({ items = [], onOpen }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;

    const left = el.scrollLeft;
    const maxLeft = el.scrollWidth - el.clientWidth;

    // tolerancia para evitar “parpadeo” por decimales
    setCanLeft(left > 2);
    setCanRight(left < maxLeft - 2);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });

    // también cuando cambie el tamaño de la ventana (responsive)
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [safeItems.length]);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;

    // “un salto” = casi el ancho visible del carrusel (se siente natural)
    const jump = Math.floor(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * jump, behavior: "smooth" });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-end gap-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            • Nueva colección
          </h2>

          <button
            type="button"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-300 hover:text-gray-400 transition"
          >
            En tendencia
          </button>
        </div>

        <button
          type="button"
          className="px-5 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm sm:text-base"
        >
          VER TODO
        </button>
      </div>

      {/* Carrusel */}
      <div className="relative mt-8">
        {/* Flecha izquierda */}
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Anterior"
          disabled={!canLeft}
          className={[
            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
            "h-12 w-12 rounded-full border bg-white/90 backdrop-blur shadow-sm",
            "grid place-items-center transition",
            canLeft ? "opacity-100 hover:bg-white" : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          <span className="text-xl leading-none">‹</span>
        </button>

        {/* Flecha derecha */}
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Siguiente"
          disabled={!canRight}
          className={[
            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
            "h-12 w-12 rounded-full border bg-white/90 backdrop-blur shadow-sm",
            "grid place-items-center transition",
            canRight ? "opacity-100 hover:bg-white" : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          <span className="text-xl leading-none">›</span>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className={[
            "flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory",
            "pb-2",
            // ocultar scrollbar (sin plugins)
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          ].join(" ")}
        >
          {safeItems.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onOpen?.(p)}
              className={[
                "snap-start text-left group shrink-0",
                // ✅ aquí está la magia del “4 en pantalla” (responsive)
                // mobile: 1 grande; sm: 2; md: 3; lg+: 4 aprox
                "basis-[82%] sm:basis-[48%] md:basis-[31%] lg:basis-[23%] xl:basis-[22%]",
              ].join(" ")}
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/5]">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {p.badge ? (
                  <span className="absolute bottom-3 right-3 text-xs font-bold bg-black text-white px-3 py-1 rounded-full">
                    {p.badge}
                  </span>
                ) : null}
              </div>

              <div className="mt-3 text-sm sm:text-base">{p.name}</div>
              <div className="mt-1 font-black text-base sm:text-lg">
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                }).format(p.price)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
