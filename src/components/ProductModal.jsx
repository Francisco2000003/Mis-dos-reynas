import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../context/cart";


export default function ProductModal({ open, product, onClose, onAddToCart  }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);

  const startX = useRef(null);

  const images = useMemo(() => product?.images ?? [], [product]);

  const { addItem } = useCart();


  useEffect(() => {
    if (!open) return;

    // Resets cada vez que abres
    setImgIndex(0);
    setZoom(false);
    setQty(1);
    setSelectedColor(product?.colors?.[0]?.name ?? null);
    setSelectedSize(product?.sizes?.[0] ?? null);
  }, [open, product]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, imgIndex, images.length]);

  if (!open || !product) return null;

  const next = () => {
    if (!images.length) return;
    setZoom(false);
    setImgIndex((i) => (i + 1) % images.length);
  };

  const prev = () => {
    if (!images.length) return;
    setZoom(false);
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches?.[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches?.[0]?.clientX ?? null;
    if (startX.current == null || endX == null) return;

    const delta = endX - startX.current;
    // umbral para no disparar por roces
    if (Math.abs(delta) < 40) return;

    if (delta < 0) next();
    else prev();
  };

  const fmt = (n) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
      n
    );

  const currentImage = images[imgIndex];

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Cerrar"
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-5">
        <div
          className="
            w-[min(1100px,96vw)]
            max-h-[92vh]
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-2xl
          "
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b">
            <h3 className="text-base sm:text-lg font-semibold">{product.name}</h3>

            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition"
              aria-label="Cerrar"
              title="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* Body: en pantallas chicas es columna, en grandes 2 columnas */}
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              h-[calc(92vh-64px)]
            "
          >
            {/* LEFT: galería */}
            <div className="p-4 sm:p-5 border-b lg:border-b-0 lg:border-r overflow-y-auto">
              {/* Contenedor imagen principal */}
              <div
                className="
                  relative
                  rounded-2xl
                  overflow-hidden
                  bg-gray-100
                  border
                "
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Alto responsive:
                    - en pantallas bajas (laptop 14) no se desborda
                    - en desktop grande puede crecer
                */}
                <div className="h-[38vh] sm:h-[46vh] md:h-[54vh] lg:h-[62vh]">
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={product.name}
                      className={[
                        "w-full h-full",
                        // IMPORTANTE: contain = no recorta
                        "object-contain",
                        "select-none",
                        "transition-transform duration-200",
                        zoom ? "scale-110 cursor-zoom-out" : "cursor-zoom-in",
                      ].join(" ")}
                      draggable={false}
                      onClick={() => setZoom((z) => !z)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Sin imagen
                    </div>
                  )}
                </div>

                {/* Flechas */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center"
                      aria-label="Anterior"
                      title="Anterior"
                    >
                      ‹
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center"
                      aria-label="Siguiente"
                      title="Siguiente"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Counter + tip */}
                {images.length > 0 && (
                  <>
                    <div className="absolute left-3 top-3 text-xs text-gray-700 bg-white/90 px-3 py-1 rounded-full">
                      {imgIndex + 1} / {images.length}
                    </div>

                    <div className="absolute left-3 bottom-3 text-xs text-white bg-black/70 px-3 py-1 rounded-full">
                      Swipe o flechas
                    </div>
                  </>
                )}

                {/* Botón zoom (extra visual) */}
                <button
                  onClick={() => setZoom((z) => !z)}
                  className="absolute right-3 top-3 text-xs bg-white/90 hover:bg-white px-3 py-1 rounded-full shadow"
                  aria-label="Zoom"
                  title="Zoom"
                >
                  {zoom ? "Salir zoom" : "Zoom"}
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {images.map((src, idx) => (
                    <button
                      key={src + idx}
                      onClick={() => {
                        setZoom(false);
                        setImgIndex(idx);
                      }}
                      className={[
                        "shrink-0 rounded-xl overflow-hidden border",
                        idx === imgIndex ? "border-black" : "border-transparent",
                      ].join(" ")}
                      title={`Ver imagen ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${product.name} ${idx + 1}`}
                        className="h-16 w-16 object-cover"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: info compra */}
            <div className="p-4 sm:p-6 overflow-y-auto">
              <div className="flex items-center gap-3">
                {product.badge ? (
                  <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                    {product.badge}
                  </span>
                ) : null}

                <div className="text-2xl font-extrabold">{fmt(product.price)}</div>
              </div>

              <p className="mt-2 text-gray-600">{product.description}</p>

              {/* Color */}
              <div className="mt-6">
                <div className="text-sm font-semibold">Color</div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {(product.colors ?? []).map((c) => {
                    const active = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={[
                          "flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
                          active ? "border-black" : "border-gray-200",
                        ].join(" ")}
                      >
                        <span
                          className="h-4 w-4 rounded-full border"
                          style={{ background: c.hex }}
                        />
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Talla */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Talla</div>
                  <button className="text-sm underline text-gray-600 hover:text-black">
                    Guía de tallas
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {(product.sizes ?? []).map((s) => {
                    const active = selectedSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={[
                          "h-11 w-14 rounded-full border text-sm font-semibold",
                          active ? "bg-black text-white border-black" : "bg-white border-gray-200",
                        ].join(" ")}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cantidad + CTA */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center rounded-full border border-gray-200 overflow-hidden w-fit">
                  <button
                    className="h-11 w-12 hover:bg-gray-50"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Disminuir"
                  >
                    –
                  </button>
                  <div className="h-11 w-14 flex items-center justify-center font-semibold">
                    {qty}
                  </div>
                  <button
                    className="h-11 w-12 hover:bg-gray-50"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Aumentar"
                  >
                    +
                  </button>
                </div>

                <button
                  className="
                    flex-1
                    h-12
                    rounded-full
                    bg-black
                    text-white
                    font-bold
                    shadow-lg
                    hover:opacity-90
                    transition
                  "
                  onClick={() => {
  const colorObj =
    (product.colors ?? []).find((c) => c.name === selectedColor) ??
    (product.colors?.[0] ?? null);

  addItem({
    product,
    qty,
    color: colorObj,
    size: selectedSize,
  });

  // opcional: abrir drawer
  onAddToCart?.();

  // opcional: cerrar modal al agregar
  onClose?.();
}}

                >
                  AGREGAR A CARRITO
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Envío y cambios se agregan después (paso a paso).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
