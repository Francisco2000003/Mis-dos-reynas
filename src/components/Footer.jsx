// src/components/Footer.jsx
import { Link } from "react-router-dom";
import FooterWatermark from "./FooterWatermark"; // ajusta la ruta según tu estructura

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* CONTENIDO */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 pt-12 md:pt-16 pb-12 sm:pb-44 relative z-10">
        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* COMPRA */}
          <div>
            <div className="font-extrabold tracking-wide mb-4 text-sm md:text-base">COMPRA</div>
            <ul className="space-y-2 text-xs md:text-sm text-gray-300">
              <li><a className="hover:text-white" href="#">New</a></li>
              <li><a className="hover:text-white" href="#">Tops</a></li>
              <li><a className="hover:text-white" href="#">Bottoms</a></li>
              <li><a className="hover:text-white" href="#">Sets</a></li>
              <li><a className="hover:text-white" href="#">Vestidos</a></li>
            </ul>
          </div>

          {/* AYUDA */}
          <div>
            <div className="font-extrabold tracking-wide mb-4 text-sm md:text-base">AYUDA</div>
            <ul className="space-y-2 text-xs md:text-sm text-gray-300">
              <li>
                <Link className="hover:text-white" to="/help/returns">
                  Cambios y devoluciones
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/help/shipping">
                  Costos y tiempos de envío
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/help/tracking">
                  Rastrea tu pedido
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/help/faq">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/help/billing">
                  Facturación
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/help/contact">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* SOBRE NOSOTROS */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-extrabold tracking-wide mb-4 text-sm md:text-base">SOBRE NOSOTROS</div>
            <ul className="space-y-2 text-xs md:text-sm text-gray-300">
              <li>
                <Link className="hover:text-white" to="/about">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/about/showroom">
                  Showroom
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/about/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* SUSCRÍBETE */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-extrabold tracking-wide mb-4 text-sm md:text-base">
              SUSCRÍBETE A NUESTRA COMUNIDAD
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition"
                aria-label="Instagram"
              >
                ⓘ
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-gray-400">
          <div>© {new Date().getFullYear()} Mis Dos Reynas</div>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span className="text-gray-600">•</span>
          </div>
        </div>
      </div>

      {/* TEXTO GIGANTE (RESPONSIVE POR BREAKPOINT + MÁS ARRIBA) */}
      <div className="absolute inset-x-0 bottom-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="px-4 sm:px-6 pb-2">
          <div
            className="
              text-white leading-none whitespace-nowrap blur-[0.6px]
              flex items-end justify-center sm:justify-start
              tracking-[0.08em] sm:tracking-[0.16em] md:tracking-[0.18em]
            "
            style={{
              transform: "translateY(18%)",
              fontSize: "clamp(40px, 11vw, 240px)",
            }}
          >
            <span className="font-extralight">&nbsp;</span>
            <span className="font-extrabold ml-4 sm:ml-6"></span>
          </div>
        </div>
      </div>

      <FooterWatermark />
    </footer>
  );
}
