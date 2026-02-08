// src/components/Hero.jsx
import heroImg from "../assets/products/hero.png";

export default function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* Altura controlada para que se vea bien en laptop, móvil y ultrawide */}
      <div className="relative h-[420px] sm:h-[480px] md:h-[560px] xl:h-[620px] 2xl:h-[680px]">
        {/* Imagen de fondo */}
        <img
          src={heroImg}
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />

        {/* Overlay para contraste (legibilidad) */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/10" />

        {/* Contenido centrado y con max-width para ultrawide */}
        <div className="relative z-10 h-full">
          <div className="mx-auto flex h-full max-w-7xl px-4">
            <div className="flex w-full flex-col items-center justify-center text-center">
              {/* Título */}
              <h1 className="font-extrabold tracking-tight leading-[0.95]">
                <span className="block text-white text-[clamp(38px,6vw,86px)]">
                  Coming{" "}
                </span>

                {/* “impress” con fondo blanco como tu estilo */}
                <span className="inline-block mt-2 bg-white text-black px-3 py-1 rounded-md shadow-sm text-[clamp(42px,7vw,96px)]">
                  Soon
                </span>
              </h1>

              {/* Subtítulo */}
              <p className="mt-4 max-w-2xl text-white/90 text-sm sm:text-base md:text-lg">
                Welcome Your Favorite Place!
              </p>

              {/* Botones */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#new-collection"
                  className="rounded-full border border-white/40 bg-white/10 px-6 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition"
                >
                  VER TODO
                </a>

                <a
                  href="#how-it-works"
                  className="rounded-full border border-white/30 bg-transparent px-6 py-2 text-sm font-semibold text-white/90 hover:text-white hover:border-white/50 transition"
                >
                  ¿Cómo funciona?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
