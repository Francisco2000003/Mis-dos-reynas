// src/pages/checkout/CheckoutPage.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";

const money = (n) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

export default function CheckoutPage() {
  const nav = useNavigate();
  const { items, total, count } = useCart();

  // UI state (front-only)
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateMx, setStateMx] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");

  const [shippingMethod, setShippingMethod] = useState("standard"); // standard | express
  const shippingCost = useMemo(() => {
    if (count === 0) return 0;
    return shippingMethod === "express" ? 149 : 99;
  }, [shippingMethod, count]);

  const grandTotal = total + shippingCost;

  const canSubmit = useMemo(() => {
    if (items.length === 0) return false;
    if (!email.trim() || !fullName.trim() || !address.trim() || !city.trim() || !stateMx.trim() || !zip.trim())
      return false;
    // validación básica email
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return false;
    return true;
  }, [items.length, email, fullName, address, city, stateMx, zip]);

  const handlePay = () => {
  if (!canSubmit) return;

  // ✅ FRONT-ONLY (sin backend):
  // Simulamos que Django nos regresó un init_point de MercadoPago
  const FAKE_MP_CHECKOUT_URL = "/checkout/success?mp=fake";

  // En real será algo como: window.location.href = init_point;
  window.location.href = FAKE_MP_CHECKOUT_URL;
};

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold">Checkout</h1>
        <p className="mt-3 text-gray-600">Tu carrito está vacío. Agrega productos para continuar.</p>
        <button
          onClick={() => nav("/")}
          className="mt-6 h-11 px-6 rounded-full bg-black text-white hover:bg-black/90"
        >
          Volver a la tienda
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      {/* Header checkout */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => nav("/")}
            className="text-sm text-gray-600 hover:text-black underline underline-offset-4"
          >
            ← Seguir comprando
          </button>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Checkout</h1>
          <p className="mt-2 text-gray-600">
            Revisa tus datos de envío y confirma tu compra.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left - Forms */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact */}
          <Card title="Contacto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nombre completo" required>
                <input
                  className="input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Ana Pérez"
                />
              </Field>

              <Field label="Correo" required>
                <input
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                />
              </Field>

              <Field label="Teléfono (opcional)">
                <input
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. 2721234567"
                />
              </Field>
            </div>
          </Card>

          {/* Shipping address */}
          <Card title="Dirección de envío">
            <div className="grid grid-cols-1 gap-4">
              <Field label="Dirección" required>
                <input
                  className="input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, número, colonia"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Ciudad" required>
                  <input
                    className="input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. Orizaba"
                  />
                </Field>

                <Field label="Estado" required>
                  <input
                    className="input"
                    value={stateMx}
                    onChange={(e) => setStateMx(e.target.value)}
                    placeholder="Ej. Veracruz"
                  />
                </Field>

                <Field label="C.P." required>
                  <input
                    className="input"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Ej. 94300"
                  />
                </Field>
              </div>

              <Field label="Indicaciones (opcional)">
                <textarea
                  className="input min-h-[96px] resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Entre calles, referencias, horario, etc."
                />
              </Field>
            </div>
          </Card>

          {/* Shipping method */}
          <Card title="Método de envío">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioCard
                active={shippingMethod === "standard"}
                onClick={() => setShippingMethod("standard")}
                title="Envío estándar"
                subtitle="2–5 días hábiles"
                right={money(99)}
              />
              <RadioCard
                active={shippingMethod === "express"}
                onClick={() => setShippingMethod("express")}
                title="Envío express"
                subtitle="1–2 días hábiles"
                right={money(149)}
              />
            </div>
          </Card>

          {/* Payment placeholder */}
          <Card title="Pago">
            <div className="text-sm text-gray-600 leading-relaxed">
              Aquí integraremos Mercado Pago.
              <div className="mt-2">
                <span className="font-medium text-black">Opción A:</span> Checkout Pro (redirige a MP).
              </div>
              <div>
                <span className="font-medium text-black">Opción B:</span> Payment Brick (pago embebido en esta página).
              </div>
            </div>
          </Card>
        </div>

        {/* Right - Summary */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl border bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Resumen</div>
                <div className="text-sm text-gray-600">{count} artículo(s)</div>
              </div>

              <div className="mt-4 space-y-3">
                {items.map((it) => (
                  <div key={it.key} className="flex gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                      {it.image ? (
                        <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium leading-tight">{it.name}</div>
                      <div className="mt-1 text-xs text-gray-600">
                        {it.colorName} • Talla {it.size} • x{it.qty}
                      </div>
                    </div>
                    <div className="text-sm font-semibold">{money(it.price * it.qty)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t pt-4 space-y-2 text-sm">
                <Row label="Subtotal" value={money(total)} />
                <Row label="Envío" value={money(shippingCost)} />
                <div className="border-t pt-3 flex items-center justify-between">
                  <div className="font-semibold">Total</div>
                  <div className="text-lg font-extrabold">{money(grandTotal)}</div>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={!canSubmit}
                className="mt-5 h-12 w-full rounded-full bg-black text-white hover:bg-black/90 disabled:opacity-50"
              >
                Pagar
              </button>

              {!canSubmit ? (
                <p className="mt-3 text-xs text-gray-500">
                  Completa tus datos obligatorios para habilitar el pago.
                </p>
              ) : null}
            </div>

            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              * En producción, el total final lo valida el backend antes de generar el pago con Mercado Pago.
            </p>
          </div>
        </div>
      </div>

      {/* Simple Tailwind helpers */}
      <style>{`
        .input{
          width:100%;
          border:1px solid rgba(0,0,0,.12);
          border-radius:16px;
          padding:12px 14px;
          outline:none;
        }
        .input:focus{
          border-color: rgba(0,0,0,.35);
          box-shadow: 0 0 0 3px rgba(0,0,0,.06);
        }
      `}</style>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-3xl border bg-white p-5 md:p-6">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <div className="text-sm font-medium">
        {label} {required ? <span className="text-gray-400">*</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-gray-700">
      <span>{label}</span>
      <span className="font-medium text-black">{value}</span>
    </div>
  );
}

function RadioCard({ active, onClick, title, subtitle, right }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "text-left w-full rounded-2xl border p-4 transition",
        active ? "border-black" : "border-black/10 hover:border-black/30",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-xs text-gray-600">{subtitle}</div>
        </div>
        <div className="text-sm font-semibold">{right}</div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
        <span
          className={[
            "h-4 w-4 rounded-full border grid place-items-center",
            active ? "border-black" : "border-black/20",
          ].join(" ")}
        >
          {active ? <span className="h-2 w-2 rounded-full bg-black" /> : null}
        </span>
        <span>{active ? "Seleccionado" : "Seleccionar"}</span>
      </div>
    </button>
  );
}
