import { useNavigate } from "react-router-dom";
import { loadCheckout } from "../../utils/checkoutStorage";

export default function CheckoutPending() {
  const nav = useNavigate();
  const order = loadCheckout();

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold">Pago pendiente</h1>
      <p className="mt-3 text-gray-600">
        Esta pantalla es simulada. Aquí normalmente esperarías confirmación de Mercado Pago.
      </p>

      <div className="mt-8 rounded-3xl border p-6">
        <div className="text-sm text-gray-600">Total</div>
        <div className="text-2xl font-extrabold">
          ${order?.totals?.grandTotal ?? 0}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            className="h-11 rounded-full bg-black text-white hover:bg-black/90"
            onClick={() => nav("/checkout/success")}
          >
            Simular aprobado
          </button>

          <button
            className="h-11 rounded-full border hover:bg-gray-50"
            onClick={() => nav("/checkout/failure")}
          >
            Simular rechazado
          </button>

          <button
            className="h-11 rounded-full border hover:bg-gray-50"
            onClick={() => nav("/")}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </main>
  );
}
