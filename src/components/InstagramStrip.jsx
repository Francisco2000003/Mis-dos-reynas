import { useEffect, useMemo, useRef, useState } from "react";

function formatK(n) {
  if (n == null) return "";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  return String(n);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const onChange = () => setReduced(!!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function ReelCard({ item }) {
  const prefersReduced = usePrefersReducedMotion();
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  const canAutoPlay = !prefersReduced;

  const handleEnter = async () => {
    if (!canAutoPlay) return;
    if (!item.video) return;
    if (!videoRef.current) return;

    try {
      // iOS exige muted para autoplay; por eso iniciamos muted
      await videoRef.current.play();
    } catch {
      // Si el navegador bloquea, no pasa nada
    }
  };

  const handleLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMuted((m) => !m);
  };

  return (
    <a
      href={item.href || "#"}
      target={item.href ? "_blank" : undefined}
      rel={item.href ? "noreferrer" : undefined}
      className="group relative block overflow-hidden rounded-3xl bg-gray-100 shadow-sm ring-1 ring-black/5"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Media */}
      <div className="relative aspect-[4/5] w-full">
        {/* Fallback image */}
        <img
          src={item.poster}
          alt={item.alt || "Instagram"}
          className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${
            useFallback ? "opacity-100" : "opacity-100 group-hover:opacity-0"
          }`}
          loading="lazy"
        />

        {/* Video (si existe) */}
        {item.video ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${
              useFallback ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            }`}
            src={item.video}
            muted={muted}
            playsInline
            loop
            preload="metadata"
            onError={() => setUseFallback(true)}
          />
        ) : null}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80" />

        {/* Top controls */}
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
          {/* Badge */}
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-black shadow">
            REEL
          </span>

          {/* Mute button (solo si hay video) */}
          {item.video ? (
            <button
              onClick={toggleMute}
              className="rounded-full bg-white/90 p-2 text-xs font-semibold text-black shadow hover:bg-white"
              title={muted ? "Activar sonido" : "Silenciar"}
              aria-label={muted ? "Activar sonido" : "Silenciar"}
            >
              {muted ? "🔇" : "🔊"}
            </button>
          ) : (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black shadow">
              POST
            </span>
          )}
        </div>

        {/* Center play icon */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-black shadow transition group-hover:scale-105">
            ▶
          </div>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {item.title || "Nuevo drop"}
            </p>
            <p className="truncate text-xs text-white/85">
              {item.subtitle || "Ver en Instagram"}
            </p>
          </div>

          {/* Stats (opcional) */}
          <div className="flex shrink-0 items-center gap-2 text-xs text-white/90">
            {item.views != null ? (
              <span className="rounded-full bg-black/30 px-2 py-1">
                👁 {formatK(item.views)}
              </span>
            ) : null}
            {item.likes != null ? (
              <span className="rounded-full bg-black/30 px-2 py-1">
                ❤ {formatK(item.likes)}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function InstagramStrip() {
  // 🔁 Cambia estos assets a los tuyos (mp4 + poster)
  const items = useMemo(
    () => [
      {
        poster: "https://picsum.photos/seed/ig1/900/1200",
        video:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        title: "Nuevo set",
        subtitle: "@misdosreynas",
        views: 12400,
        likes: 820,
        href: "https://www.instagram.com/",
      },
      {
        poster: "https://picsum.photos/seed/ig2/900/1200",
        video:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        title: "Outfit del día",
        subtitle: "En tendencia",
        views: 9800,
        likes: 540,
        href: "https://www.instagram.com/",
      },
      {
        poster: "https://picsum.photos/seed/ig3/900/1200",
        // sin video -> se ve como post
        title: "Detalles",
        subtitle: "Nuevo drop",
        likes: 310,
        href: "https://www.instagram.com/",
      },
      {
        poster: "https://picsum.photos/seed/ig4/900/1200",
        video:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        title: "Vestido rojo",
        subtitle: "Disponible ya",
        views: 20100,
        likes: 1330,
        href: "https://www.instagram.com/",
      },
    ],
    []
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold">@misdosreynas</h3>
        <p className="text-sm text-gray-600">
          Inspírate con nuestros reels y looks. Toca una tarjeta para abrir Instagram.
        </p>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          Ver perfil →
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((it, i) => (
          <ReelCard key={i} item={it} />
        ))}
      </div>
    </section>
  );
}
