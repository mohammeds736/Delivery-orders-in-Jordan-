(function () {
  Storage.initIfEmpty();

  const els = {
    restName: document.getElementById("restName"),
    restSub: document.getElementById("restSub"),
    openBadge: document.getElementById("openBadge"),
    deliveryFee: document.getElementById("deliveryFee"),
    minOrder: document.getElementById("minOrder"),
    workingHours: document.getElementById("workingHours"),

    catChips: document.getElementById("catChips"),
    menuGrid: document.getElementById("menuGrid"),
    menuSearch: document.getElementById("menuSearch"),

    btnOpenCart: document.getElementById("btnOpenCart"),
    btnCloseCart: document.getElementById("btnCloseCart"),
    cartDrawer: document.getElementById("cartDrawer"),
    cartOverlay: document.getElementById("cartOverlay"),
    cartList: document.getElementById("cartList"),
    cartCount: document.getElementById("cartCount"),
    cartSub: document.getElementById("cartSub"),
    btnClearCart: document.getElementById("btnClearCart"),
    btnGoCheckout: document.getElementById("btnGoCheckout"),

    custName: document.getElementById("custName"),
    custPhone: document.getElementById("custPhone"),
    custAddress: document.getElementById("custAddress"),
    custNotes: document.getElementById("custNotes"),
    btnPlaceOrder: document.getElementById("btnPlaceOrder"),

    sumSub: document.getElementById("sumSub"),
    sumDel: document.getElementById("sumDel"),
    sumTotal: document.getElementById("sumTotal"),
    checkoutHint: document.getElementById("checkoutHint"),

    btnGeo: document.getElementById("btnGeo"),
    locText: document.getElementById("locText"),
    lastOrderBox: document.getElementById("lastOrderBox"),

    toast: document.getElementById("toast")
  };

  let activeCat = "ALL";
  let map, marker;
  let pickedLatLng = { lat: 31.9539, lng: 35.9106 }; // عمّان

  // =========================
  // ✅ صور آمنة (Fix Unsplash Redirect Failures)
  // =========================
  const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80";

  function resolveImageUrl(url) {
    if (!url || typeof url !== "string") return FALLBACK_IMG;
    const u = url.trim();
    if (!u.startsWith("http")) return FALLBACK_IMG;
    return u;
  }

  function attachSafeImage(imgEl) {
    if (!imgEl) return;

    // أفضل ممارسات للهاتف/الأداء
    imgEl.loading = "lazy";
    imgEl.referrerPolicy = "no-referrer";

    // لو حدث فشل تحميل لأي سبب (CSP/Redirect/Slow net)
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = FALLBACK_IMG;
    };
  }

  function toast(msg) {
    if (!els.toast) return;
    els.toast.textContent = msg;
    els.toast.classList.remove("hidden");
    setTimeout(() => els.toast.classList.add("hidden"), 2600);
  }

  function renderHeader() {
    const st = Storage.getState();
    els.restName.textContent = st.settings.restaurantName || "لقمان أبو صليح";
    els.restSub.textContent = `${st.settings.countryLabel || "الأردن"} • ${st.settings.cityLabel || "عمّان"}`;

    els.deliveryFee.textContent = Storage.formatJOD(st.settings.deliveryFeeJOD);
    els.minOrder.textContent = Storage.formatJOD(st.settings.minOrderJOD);
    els.workingHours.textContent = st.settings.workingHoursText || "—";

    const open = !!st.settings.isOpenNow;
    els.openBadge.textContent = open ? "مفتوح الآن" : "مغلق الآن";
    els.openBadge.style.borderColor = open ? "rgba(33,199,126,.45)" : "rgba(255,77,77,.45)";
    els.openBadge.style.background = open ? "rgba(33,199,126,.12)" : "rgba(255,77,77,.12)";
  }

  function renderChips() {
    const st = Storage.getState();
    const cats = (st.categories || []).filter(c => c.isActive).sort((a, b) => (a.sort || 0) - (b.sort || 0));

    els.catChips.innerHTML = "";
    const all = document.createElement("button");
    all.className = "chip" + (activeCat === "ALL" ? " active" : "");
    all.textContent = "الكل";
    all.type = "button";
    all.onclick = () => { activeCat = "ALL"; renderMenu(); };
    els.catChips.appendChild(all);

    for (const c of cats) {
      const b = document.createElement("button");
      b.className = "chip" + (activeCat === c.id ? " active" : "");
      b.textContent = c.name;
      b.type = "button";
      b.onclick = () => { activeCat = c.id; renderMenu(); };
      els.catChips.appendChild(b);
    }
  }

  function menuFiltered() {
    const st = Storage.getState();
    const q = (els.menuSearch.value || "").trim().toLowerCase();

    let items = (st.items || []).filter(it => it.isAvailable !== false);

    if (activeCat !== "ALL") items = items.filter(it => it.categoryId === activeCat);
    if (q) items = items.filter(it =>
      (it.name || "").toLowerCase().includes(q) ||
      (it.desc || "").toLowerCase().includes(q)
    );

    return items;
  }

  function renderMenu() {
    const items = menuFiltered();
    els.menuGrid.innerHTML = "";

    if (!items.length) {
      els.menuGrid.innerHTML = `<div class="muted">لا توجد نتائج.</div>`;
      return;
    }

    for (const it of items) {
      const card = document.createElement("div");
      card.className = "item";

      const imgSrc = resolveImageUrl(it.imageUrl);

      card.innerHTML = `
        <img class="item-img" src="${imgSrc}" alt="${it.name || ""}" loading="lazy" referrerpolicy="no-referrer">
        <div class="pad">
          <div class="name">${it.name || "—"}</div>
          <div class="desc">${it.desc || "—"}</div>
          <div class="row">
            <div class="price">${Storage.formatJOD(it.priceJOD)}</div>
            <button class="btn btn-primary" type="button">
              <i class="fa-solid fa-plus"></i>
              إضافة
            </button>
          </div>
        </div>
      `;

      // ✅ منع فشل الصور (خصوصًا source.unsplash.com)
      const img = card.querySelector("img.item-img");
      attachSafeImage(img);

      card.querySelector("button").onclick = () => {
        Storage.upsertCart(it.id, 1);
        renderCartBadge();
        renderCartDrawer();
        renderSummary();
        toast("تمت الإضافة إلى السلة");
      };

      els.menuGrid.appendChild(card);
    }
  }

  function renderCartBadge() {
    els.cartCount.textContent = String(Storage.cartCount());
  }

  function openDrawer() {
    els.cartDrawer.classList.add("show");
    els.cartDrawer.setAttribute("aria-hidden", "false");
  }
  function closeDrawer() {
    els.cartDrawer.classList.remove("show");
    els.cartDrawer.setAttribute("aria-hidden", "true");
  }

  function renderCartDrawer() {
    const st = Storage.getState();
    const cart = st.cart || [];

    els.cartList.innerHTML = "";
    if (!cart.length) {
      els.cartList.innerHTML = `<div class="muted">سلتك فارغة.</div>`;
      els.cartSub.textContent = Storage.formatJOD(0);
      return;
    }

    for (const ci of cart) {
      const it = Storage.getItemById(ci.itemId);
      if (!it) continue;

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="row">
          <strong>${it.name}</strong>
          <span>${Storage.formatJOD(it.priceJOD)}</span>
        </div>
        <div class="row" style="margin-top:8px;">
          <div class="qty">
            <button class="btn btn-secondary" type="button">-</button>
            <strong>${ci.qty}</strong>
            <button class="btn btn-secondary" type="button">+</button>
          </div>
          <button class="btn btn-ghost" type="button">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;

      row.querySelectorAll(".qty button")[0].onclick = () => { Storage.upsertCart(it.id, -1); syncAll(); };
      row.querySelectorAll(".qty button")[1].onclick = () => { Storage.upsertCart(it.id, +1); syncAll(); };
      row.querySelector(".btn-ghost").onclick = () => { Storage.upsertCart(it.id, -999); syncAll(); };

      els.cartList.appendChild(row);
    }

    els.cartSub.textContent = Storage.formatJOD(Storage.cartSubtotal());
  }

  function renderSummary() {
    const st = Storage.getState();
    const sub = Storage.cartSubtotal();
    const del = Number(st.settings.deliveryFeeJOD || 0);
    const total = sub + del;

    els.sumSub.textContent = Storage.formatJOD(sub);
    els.sumDel.textContent = Storage.formatJOD(del);
    els.sumTotal.textContent = Storage.formatJOD(total);

    const minOrder = Number(st.settings.minOrderJOD || 0);
    if (sub < minOrder) {
      els.checkoutHint.textContent = `الحد الأدنى للطلب هو ${Storage.formatJOD(minOrder)}.`;
    } else {
      els.checkoutHint.textContent = "";
    }
  }

  function renderLastOrder() {
    const o = Storage.getLastOrder();
    if (!o) {
      els.lastOrderBox.innerHTML = `<div class="muted">لا يوجد طلبات حتى الآن.</div>`;
      return;
    }

    const label = statusLabel(o.status);
    els.lastOrderBox.innerHTML = `
      <div><strong>${o.orderNumber}</strong> — الحالة: <strong>${label}</strong></div>
      <div class="muted small">الإجمالي: ${Storage.formatJOD(o.totalJOD)} • ${new Date(o.createdAt).toLocaleString("ar-JO")}</div>
      <div style="margin-top:8px;">
        ${(o.items || []).map(i => `• ${i.nameSnapshot} × ${i.qty}`).join("<br/>")}
      </div>
    `;
  }

  function statusLabel(s) {
    switch (s) {
      case "RECEIVED": return "تم الاستلام";
      case "PREPARING": return "قيد التحضير";
      case "ON_THE_WAY": return "بالطريق";
      case "DELIVERED": return "تم التسليم";
      case "CANCELED": return "ملغي";
      default: return s;
    }
  }

  function initMap() {
    map = L.map("map", { zoomControl: true }).setView([pickedLatLng.lat, pickedLatLng.lng], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    marker = L.marker([pickedLatLng.lat, pickedLatLng.lng], { draggable: true }).addTo(map);

    function setLoc(lat, lng) {
      pickedLatLng = { lat, lng };
      marker.setLatLng([lat, lng]);
      els.locText.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }

    map.on("click", (e) => setLoc(e.latlng.lat, e.latlng.lng));
    marker.on("dragend", () => {
      const p = marker.getLatLng();
      setLoc(p.lat, p.lng);
    });

    els.locText.textContent = `${pickedLatLng.lat.toFixed(5)}, ${pickedLatLng.lng.toFixed(5)}`;

    els.btnGeo.onclick = () => {
      if (!navigator.geolocation) {
        toast("المتصفح لا يدعم تحديد الموقع.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          map.setView([lat, lng], 15);
          setLoc(lat, lng);
          toast("تم تحديد موقعك.");
        },
        () => toast("تعذر تحديد الموقع. فعّل GPS أو الصلاحيات.")
      );
    };

    // Fix Leaflet rendering after layout
    setTimeout(() => map.invalidateSize(), 300);
  }

  function validateCheckout() {
    const st = Storage.getState();

    if (!st.settings.isOpenNow) return { ok: false, msg: "المطعم مغلق الآن." };
    if (Storage.cartCount() <= 0) return { ok: false, msg: "السلة فارغة." };

    const phone = (els.custPhone.value || "").trim();
    if (!phone) return { ok: false, msg: "أدخل رقم الهاتف." };

    const minOrder = Number(st.settings.minOrderJOD || 0);
    if (Storage.cartSubtotal() < minOrder) return { ok: false, msg: `الحد الأدنى للطلب هو ${Storage.formatJOD(minOrder)}.` };

    if (!Number.isFinite(pickedLatLng.lat) || !Number.isFinite(pickedLatLng.lng)) {
      return { ok: false, msg: "حدد موقعك على الخريطة." };
    }

    return { ok: true };
  }

  function placeOrder() {
    const check = validateCheckout();
    if (!check.ok) {
      toast(check.msg);
      return;
    }

    const pay = document.querySelector('input[name="pay"]:checked')?.value || "CASH";

    const order = Storage.createOrder({
      customerName: (els.custName.value || "").trim(),
      customerPhone: (els.custPhone.value || "").trim(),
      addressText: (els.custAddress.value || "").trim(),
      notes: (els.custNotes.value || "").trim(),
      payMethod: pay,
      lat: pickedLatLng.lat,
      lng: pickedLatLng.lng
    });

    toast(`تم إرسال الطلب ${order.orderNumber}`);
    syncAll();
    closeDrawer();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  function syncAll() {
    renderHeader();
    renderChips();
    renderMenu();
    renderCartBadge();
    renderCartDrawer();
    renderSummary();
    renderLastOrder();
  }

  // Drawer events
  els.btnOpenCart.onclick = () => { openDrawer(); renderCartDrawer(); };
  els.btnCloseCart.onclick = closeDrawer;
  els.cartOverlay.onclick = closeDrawer;

  els.btnClearCart.onclick = () => {
    Storage.clearCart();
    toast("تم تفريغ السلة.");
    syncAll();
  };

  els.btnGoCheckout.onclick = () => {
    closeDrawer();
    window.scrollTo({ top: document.body.scrollHeight * 0.55, behavior: "smooth" });
  };

  els.menuSearch.addEventListener("input", renderMenu);
  els.btnPlaceOrder.onclick = placeOrder;

  // Boot
  renderHeader();
  renderChips();
  renderMenu();
  renderCartBadge();
  renderCartDrawer();
  renderSummary();
  renderLastOrder();
  initMap();
})();
