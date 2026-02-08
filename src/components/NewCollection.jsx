// src/components/NewCollection.jsx
import { useState } from "react";
import { products } from "../data/products";
import ProductGrid from "./ProductGrid";
import ProductModal from "./ProductModal";

export default function NewCollection({ onAddToCart }) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (product) => {
    setSelected(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelected(null), 200);
  };

  return (
    <>
      <ProductGrid items={products} onOpen={handleOpen} />

      {selected ? (
        <ProductModal
          product={selected}
          open={open}
          onClose={handleClose}
          onAddToCart={onAddToCart}
        />
      ) : null}
    </>
  );
}
