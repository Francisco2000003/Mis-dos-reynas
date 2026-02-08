import { useNavigate } from "react-router-dom";
import { clearCheckout, loadCheckout } from "../../utils/checkoutStorage";

export default function CheckoutSuccess() {
  const nav = useNavigate();
  const order = loadCheckout();

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold">Pago aprobado ✅</h1>
      <p className="mt-3 text-gray-600">
        Gracias por tu compra. (Simulación)
      </p>

      <div className="mt-8 rounded-3xl border p-6">
        <div className="text-sm text-gray-600">Cliente</div>
        <div className="font-semibold">{order?.buyer?.fullName ?? "—"}</div>

        <div className="mt-6 flex gap-3">
          <button
            className="h-11 px-5 rounded-full bg-black text-white hover:bg-black/90"
            onClick={() => {
              clearCheckout();
              nav("/");
            }}
          >
            Volver al inicio
          </button>

          <button
            className="h-11 px-5 rounded-full border hover:bg-gray-50"
            onClick={() => nav("/checkout")}
          >
            Ir al checkout
          </button>
        </div>
      </div>
    </main>
  );
}
