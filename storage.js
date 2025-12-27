const Storage = (function () {
  const KEY = "LQS_JO_V1";

  function deepClone(x) {
    return JSON.parse(JSON.stringify(x));
  }

  function initIfEmpty() {
    const raw = localStorage.getItem(KEY);
    if (raw) return;

    const seed = deepClone(DEMO_SEED);
    seed.cart = [];
    seed.orders = [];
    localStorage.setItem(KEY, JSON.stringify(seed));
  }

  function getState() {
    initIfEmpty();
    return JSON.parse(localStorage.getItem(KEY));
  }

  function setState(mutator) {
    const s = getState();
    const next = mutator(deepClone(s)) || s;
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function formatJOD(n) {
    const x = Number(n || 0);
    return `${x.toFixed(2)} د.أ`;
  }

  function getItemById(id) {
    const s = getState();
    return (s.items || []).find(x => x.id === id) || null;
  }

  function cartSubtotal() {
    const s = getState();
    let sum = 0;
    for (const ci of (s.cart || [])) {
      const it = getItemById(ci.itemId);
      if (!it) continue;
      sum += Number(it.priceJOD || 0) * Number(ci.qty || 0);
    }
    return sum;
  }

  function cartCount() {
    const s = getState();
    return (s.cart || []).reduce((a, b) => a + Number(b.qty || 0), 0);
  }

  function upsertCart(itemId, deltaQty) {
    setState(st => {
      st.cart = st.cart || [];
      const found = st.cart.find(x => x.itemId === itemId);
      if (!found) {
        if (deltaQty > 0) st.cart.push({ itemId, qty: deltaQty });
      } else {
        found.qty = Number(found.qty || 0) + deltaQty;
        if (found.qty <= 0) st.cart = st.cart.filter(x => x.itemId !== itemId);
      }
      return st;
    });
  }

  function clearCart() {
    setState(st => {
      st.cart = [];
      return st;
    });
  }

  function createOrder(payload) {
    const now = new Date().toISOString();
    const orderId = "ord_" + crypto.randomUUID().slice(0, 8);
    const orderNumber = "#" + String(Math.floor(100000 + Math.random() * 900000));

    const st = getState();
    const items = (st.cart || []).map(ci => {
      const it = getItemById(ci.itemId);
      return {
        itemId: ci.itemId,
        qty: ci.qty,
        nameSnapshot: it ? it.name : "صنف",
        priceSnapshotJOD: it ? Number(it.priceJOD || 0) : 0
      };
    });

    const sub = cartSubtotal();
    const delivery = Number(st.settings.deliveryFeeJOD || 0);
    const total = sub + delivery;

    const order = {
      id: orderId,
      orderNumber,
      createdAt: now,
      status: "RECEIVED",
      history: [{ at: now, status: "RECEIVED" }],
      items,
      subtotalJOD: sub,
      deliveryJOD: delivery,
      totalJOD: total,
      customerName: payload.customerName || "",
      customerPhone: payload.customerPhone || "",
      addressText: payload.addressText || "",
      notes: payload.notes || "",
      payMethod: payload.payMethod || "CASH",
      lat: payload.lat,
      lng: payload.lng
    };

    setState(s2 => {
      s2.orders = s2.orders || [];
      s2.orders.unshift(order);
      s2.cart = [];
      return s2;
    });

    return order;
  }

  function getLastOrder() {
    const s = getState();
    return (s.orders || [])[0] || null;
  }

  return {
    KEY,
    initIfEmpty,
    getState,
    setState,
    formatJOD,
    getItemById,
    cartSubtotal,
    cartCount,
    upsertCart,
    clearCart,
    createOrder,
    getLastOrder
  };
})();
