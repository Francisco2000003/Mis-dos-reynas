// src/context/cart.jsx
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

// ---- Config ----
const STORAGE_KEY = "mdr_cart_v2";
const STORAGE_VERSION = 2;

// ---- Utils ----
const clampInt = (n, min, max) => {
  const x = Number(n);
  if (!Number.isFinite(x)) return min;
  return Math.max(min, Math.min(max, Math.trunc(x)));
};

const money2 = (n) => {
  // evita cosas como 0.30000000000004
  return Math.round((Number(n) || 0) * 100) / 100;
};

function buildKey(productId, colorName, size) {
  return `${productId}|${String(colorName)}|${String(size)}`;
}

function normalizeIncomingState(raw) {
  // Soporta:
  // 1) {version, state}
  // 2) state directo (legacy)
  if (!raw) return null;

  // formato nuevo
  if (raw.version && raw.state) {
    if (raw.version === STORAGE_VERSION) return raw.state;
    // migraciones futuras aquí
    return raw.state;
  }

  // formato legacy (tu v1 guardaba state directo)
  if (raw.items && Array.isArray(raw.items)) {
    const items = raw.items.map((it) => ({
      key: it.key,
      productId: it.productId,
      name: it.name,
      price: money2(it.price),
      image: it.image ?? null,
      colorName: it.colorName ?? "N/A",
      colorHex: it.colorHex ?? "#000000",
      size: it.size ?? "UNI",
      qty: clampInt(it.qty, 1, 99),
    }));

    return calcDerived({ items });
  }

  return null;
}

function calcTotals(items) {
  const count = items.reduce((acc, it) => acc + it.qty, 0);
  const subtotal = money2(items.reduce((acc, it) => acc + it.price * it.qty, 0));
  return { count, subtotal };
}

function calcDerived(base) {
  const items = base.items ?? [];
  const { count, subtotal } = calcTotals(items);

  // Si luego quieres reglas:
  // - envío gratis arriba de X
  // - cupones/descuentos
  // aquí ya queda listo.
  const shipping = count > 0 ? 0 : 0;
  const discount = 0;

  const total = money2(subtotal + shipping - discount);

  return {
    items,
    count,
    subtotal,
    shipping,
    discount,
    total,
    updatedAt: Date.now(),
  };
}

/**
 * Item shape (igual al tuyo):
 * {
 *  key: string (productId|color|size),
 *  productId, name, price, image,
 *  colorName, colorHex,
 *  size,
 *  qty
 * }
 */

function cartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      // payload ya viene normalizado
      return action.payload ?? state;
    }

    case "ADD_ITEM": {
      const item = action.payload;

      const existing = state.items.find((x) => x.key === item.key);

      let nextItems;
      if (existing) {
        nextItems = state.items.map((x) =>
          x.key === item.key
            ? { ...x, qty: clampInt(x.qty + item.qty, 1, 99) }
            : x
        );
      } else {
        nextItems = [item, ...state.items];
      }

      return calcDerived({ ...state, items: nextItems });
    }

    case "REMOVE_ITEM": {
      const key = action.payload;
      const nextItems = state.items.filter((x) => x.key !== key);
      return calcDerived({ ...state, items: nextItems });
    }

    case "SET_QTY": {
      const { key, qty } = action.payload;
      const q = clampInt(qty, 0, 99);

      const nextItems = state.items
        .map((x) => (x.key === key ? { ...x, qty: q } : x))
        .filter((x) => x.qty > 0);

      return calcDerived({ ...state, items: nextItems });
    }

    case "INC": {
      const key = action.payload;
      const nextItems = state.items.map((x) =>
        x.key === key ? { ...x, qty: clampInt(x.qty + 1, 1, 99) } : x
      );
      return calcDerived({ ...state, items: nextItems });
    }

    case "DEC": {
      const key = action.payload;
      const nextItems = state.items
        .map((x) => (x.key === key ? { ...x, qty: clampInt(x.qty - 1, 0, 99) } : x))
        .filter((x) => x.qty > 0);
      return calcDerived({ ...state, items: nextItems });
    }

    case "CLEAR": {
      return calcDerived({ items: [] });
    }

    default:
      return state;
  }
}

const initialState = calcDerived({ items: [] });

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // cargar de localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      const normalized = normalizeIncomingState(parsed);
      if (normalized) dispatch({ type: "HYDRATE", payload: normalized });
    } catch {
      // ignore
    }
  }, []);

  // guardar en localStorage (con version)
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, state })
      );
    } catch {
      // ignore
    }
  }, [state]);

  const api = useMemo(() => {
    // Map para lookups rápidos (útil en UI)
    const byKey = new Map(state.items.map((it) => [it.key, it]));

    return {
      // state base
      items: state.items,
      count: state.count,
      subtotal: state.subtotal,
      shipping: state.shipping,
      discount: state.discount,
      total: state.total,
      updatedAt: state.updatedAt,

      // selectors
      getItem: (key) => byKey.get(key) ?? null,
      hasItem: (key) => byKey.has(key),

      // actions
      addItem: ({ product, qty = 1, color, size }) => {
        if (!product?.id) return;

        const colorName = color?.name ?? "N/A";
        const colorHex = color?.hex ?? "#000000";
        const safeSize = size ?? "UNI";

        const key = buildKey(product.id, colorName, safeSize);

        dispatch({
          type: "ADD_ITEM",
          payload: {
            key,
            productId: product.id,
            name: product.name,
            price: money2(product.price),
            image: product.images?.[0] ?? product.image ?? null,
            colorName,
            colorHex,
            size: safeSize,
            qty: clampInt(qty, 1, 99),
          },
        });
      },

      removeItem: (key) => dispatch({ type: "REMOVE_ITEM", payload: key }),
      setQty: (key, qty) => dispatch({ type: "SET_QTY", payload: { key, qty } }),
      inc: (key) => dispatch({ type: "INC", payload: key }),
      dec: (key) => dispatch({ type: "DEC", payload: key }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart() debe usarse dentro de <CartProvider />");
  return ctx;
}
