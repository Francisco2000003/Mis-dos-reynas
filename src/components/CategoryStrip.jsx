const cats = [
  { title: "Tops", image: "https://picsum.photos/seed/c1/1200/900" },
  { title: "Bottoms", image: "https://picsum.photos/seed/c2/1200/900" },
  { title: "Sets", image: "https://picsum.photos/seed/c3/1200/900" },
  { title: "Vestidos", image: "https://picsum.photos/seed/c4/1200/900" },
];

export default function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl md:text-5xl font-extrabold">Compra por categoría</h2>
        <div className="flex items-center gap-2 text-xl select-none">
          <button className="w-10 h-10 rounded-full border hover:bg-gray-50">←</button>
          <button className="w-10 h-10 rounded-full border hover:bg-gray-50">→</button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {cats.map((c) => (
          <div key={c.title} className="relative overflow-hidden rounded-2xl h-[280px]">
            <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 left-6 text-white text-4xl font-extrabold">
              {c.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
