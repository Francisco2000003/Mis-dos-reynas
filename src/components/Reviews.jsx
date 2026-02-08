import { reviews } from "../data/reviews";

function Stars({ n }) {
  return <div className="text-sm">{"★".repeat(n)}{"☆".repeat(5 - n)}</div>;
}

export default function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold">Lo que dicen nuestras clientas</h2>
      <div className="mt-4 flex items-center gap-3">
        <Stars n={5} />
        <span className="text-sm font-semibold">1196 reseñas</span>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{r.name}</div>
              <span className="text-green-600 text-sm">✓</span>
            </div>
            <Stars n={r.stars} />
            <p className="mt-3 text-sm text-gray-700">{r.text}</p>
            <div className="mt-6 text-xs text-gray-500 border-t pt-4">{r.product}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
