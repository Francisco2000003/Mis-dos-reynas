import HelpPage from "./HelpPage";
import BackButton from "../../components/BackButton";

export default function HelpTrack() {
  return (
    <HelpPage
      title="Rastrea tu pedido"
      lead="Consulta el estatus de tu pedido con tu número de orden y/o guía."
    >
      <section>
        <BackButton className="mb-6 text-sm underline hover:opacity-70" />
        <h2 className="text-2xl md:text-3xl font-extrabold">¿Dónde encuentro mi guía?</h2>
        <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
          <li>Te la enviamos por WhatsApp o correo cuando tu pedido sale de tienda.</li>
          <li>Si no la encuentras, revisa spam/promociones.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-extrabold">Qué enviarnos si necesitas ayuda</h2>
        <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
          <li>Número de pedido</li>
          <li>Nombre completo</li>
          <li>Teléfono</li>
        </ul>
      </section>
    </HelpPage>
  );
}
