import { useNavigate } from "react-router-dom";

export default function CheckoutFailure() {
  const nav = useNavigate();

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold">Pago rechazado ❌</h1>
      <p className="mt-3 text-gray-600">
        No se pudo completar el pago. (Simulación) Intenta de nuevo.
      </p>

      <div className="mt-8 rounded-3xl border p-6 flex flex-col sm:flex-row gap-3">
        <button
          className="h-11 px-5 rounded-full bg-black text-white hover:bg-black/90"
          onClick={() => nav("/checkout")}
        >
          Reintentar
        </button>

        <button
          className="h-11 px-5 rounded-full border hover:bg-gray-50"
          onClick={() => nav("/")}
        >
          Volver al inicio
        </button>
      </div>
    </main>
  );
}
