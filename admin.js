(function () {
  Storage.initIfEmpty();

  const GATE_SESSION_KEY = "LQS_ADMIN_AUTH";
  const ADMIN_PASSWORD = "Kaleem7364";

  const gate = document.getElementById("adminGate");
  const passInput = document.getElementById("adminPinInput");
  const btnLogin = document.getElementById("btnAdminLogin");
  const gateMsg = document.getElementById("adminGateMsg");
  const toastEl = document.getElementById("toast");

  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.remove("hidden");
    setTimeout(() => toastEl.classList.add("hidden"), 2600);
  }

  function isAuthed() {
    return sessionStorage.getItem(GATE_SESSION_KEY) === "1";
  }
  function showGate(msg) {
    gate.classList.add("show");
    gateMsg.textContent = msg || "";
    setTimeout(() => passInput.focus(), 60);
  }
  function hideGate() {
    gate.classList.remove("show");
    gateMsg.textContent = "";
  }

  function handleLogin() {
    const p = (passInput.value || "").trim();
    if (!p) return showGate("أدخل كلمة المرور.");
    if (p !== ADMIN_PASSWORD) return showGate("كلمة المرور غير صحيحة.");
    sessionStorage.setItem(GATE_SESSION_KEY, "1");
    hideGate();
    toast("تم تسجيل الدخول.");
    boot();
  }

  if (!isAuthed()) {
    showGate("");
    btnLogin.addEventListener("click", handleLogin);
    passInput.addEventListener("keydown", (e) => { if (e.key === "Enter") handleLogin(); });
    return;
  }

  boot();

  function boot() {
    const elOpenBadge = document.getElementById("openBadgeAdmin");
    const elDelivery = document.getElementById("deliveryFeeInput");
    const elMinOrder = document.getElementById("minOrderInput");
    const elHours = document.getElementById("hoursInput");
    const elSave = document.getElementById("btnSaveSettings");
    const elReset = document.getElementById("btnResetDemo");

    const elOrders = document.getElementById("ordersList");
    const elFilter = document.getElementById("orderFilter");
    const elSearch = document.getElementById("orderSearch");

    const elMenuAdmin = document.getElementById("menuAdmin");
    const elMenuSearchAdmin = document.getElementById("menuSearchAdmin");
    const btnOpenAddItem = document.getElementById("btnOpenAddItem");

    const itemModal = document.getElementById("itemModal");
    const itemModalTitle = document.getElementById("itemModalTitle");
    const itemModalMsg = document.getElementById("itemModalMsg");
    const btnCloseItemModal = document.getElementById("btnCloseItemModal");
    const btnSaveItem = document.getElementById("btnSaveItem");

    const fCat = document.getElementById("itemCat");
    const fName = document.getElementById("itemName");
    const fDesc = document.getElementById("itemDesc");
    const fPrice = document.getElementById("itemPrice");
    const fImg = document.getElementById("itemImg");
    const fAvail = document.getElementById("itemAvailable");

    let editingItemId = null;

    function renderOpenBadge() {
      const st = Storage.getState();
      const isOpen = !!st.settings.isOpenNow;
      elOpenBadge.textContent = isOpen ? `مفتوح • ${st.settings.workingHoursText}` : `مغلق • ${st.settings.workingHoursText}`;
      elOpenBadge.style.borderColor = isOpen ? "rgba(33,199,126,.45)" : "rgba(255,77,77,.45)";
      elOpenBadge.style.background = isOpen ? "rgba(33,199,126,.12)" : "rgba(255,77,77,.12)";
    }

    function loadSettingsUI() {
      const st = Storage.getState();
      elDelivery.value = Number(st.settings.deliveryFeeJOD || 0);
      elMinOrder.value = Number(st.settings.minOrderJOD || 0);
      elHours.value = st.settings.workingHoursText || "";

      const radios = document.querySelectorAll('input[name="isOpen"]');
      radios.forEach(r => r.checked = String(st.settings.isOpenNow) === r.value);
      renderOpenBadge();
    }

    function saveSettings() {
      const radio = document.querySelector('input[name="isOpen"]:checked');
      const isOpen = radio ? radio.value === "true" : true;

      const delivery = Math.max(0, Number(elDelivery.value || 0));
      const minOrder = Math.max(0, Number(elMinOrder.value || 0));
      const hours = (elHours.value || "").trim();

      Storage.setState(s => {
        s.settings.isOpenNow = isOpen;
        s.settings.deliveryFeeJOD = delivery;
        s.settings.minOrderJOD = minOrder;
        if (hours) s.settings.workingHoursText = hours;
        return s;
      });

      renderOpenBadge();
      toast("تم حفظ الإعدادات.");
    }

    function resetDemo() {
      localStorage.removeItem(Storage.KEY);
      Storage.initIfEmpty();
      loadSettingsUI();
      renderOrders();
      renderMenuAdmin();
      toast("تمت إعادة ضبط بيانات العرض.");
    }

    elSave.addEventListener("click", saveSettings);
    elReset.addEventListener("click", resetDemo);

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

    function getOrdersFiltered() {
      const st = Storage.getState();
      const filter = elFilter.value || "ALL";
      const q = (elSearch.value || "").trim().toLowerCase();

      return (st.orders || [])
        .filter(o => (filter === "ALL" ? true : o.status === filter))
        .filter(o => {
          if (!q) return true;
          return (o.orderNumber || "").toLowerCase().includes(q) || (o.customerPhone || "").toLowerCase().includes(q);
        });
    }

    function updateOrderStatus(orderId, newStatus) {
      Storage.setState(s => {
        const o = (s.orders || []).find(x => x.id === orderId);
        if (!o) return s;
        o.status = newStatus;
        o.history = o.history || [];
        o.history.push({ at: new Date().toISOString(), status: newStatus });
        return s;
      });
      renderOrders();
      toast(`تم تحديث الحالة: ${statusLabel(newStatus)}`);
    }

    function renderOrders() {
      const orders = getOrdersFiltered();
      elOrders.innerHTML = "";

      if (!orders.length) {
        elOrders.innerHTML = `<div class="muted">لا توجد طلبات حالياً.</div>`;
        return;
      }

      for (const o of orders) {
        const box = document.createElement("div");
        box.className = "order";

        box.innerHTML = `
          <h3>${o.orderNumber} — ${statusLabel(o.status)}</h3>
          <div class="muted small">
            هاتف: <strong>${o.customerPhone || "-"}</strong>
            ${o.customerName ? ` • الاسم: <strong>${o.customerName}</strong>` : ""}
            <br/>الوقت: ${o.createdAt ? new Date(o.createdAt).toLocaleString("ar-JO") : "-"}
            <br/>الإجمالي: <strong>${Storage.formatJOD(o.totalJOD || 0)}</strong>
          </div>
          <div style="margin-top:8px; line-height:1.9;">
            ${(o.items || []).map(i => `• ${i.nameSnapshot} × ${i.qty}`).join("<br/>")}
          </div>
          <div class="muted small" style="margin-top:8px;">
            الموقع: <strong>${Number(o.lat||0).toFixed(5)}, ${Number(o.lng||0).toFixed(5)}</strong>
            ${o.addressText ? `<br/>العنوان: <strong>${o.addressText}</strong>` : ""}
            ${o.notes ? `<br/>ملاحظات: <strong>${o.notes}</strong>` : ""}
          </div>
        `;

        const controls = document.createElement("div");
        controls.className = "controls";

        function mk(text, st) {
          const b = document.createElement("button");
          b.className = "btn btn-secondary";
          b.type = "button";
          b.textContent = text;
          b.onclick = () => updateOrderStatus(o.id, st);
          return b;
        }

        const b1 = mk("تم الاستلام", "RECEIVED");
        const b2 = mk("قيد التحضير", "PREPARING");
        const b3 = mk("بالطريق", "ON_THE_WAY");

        const b4 = document.createElement("button");
        b4.className = "btn btn-primary";
        b4.type = "button";
        b4.textContent = "تم التسليم";
        b4.onclick = () => updateOrderStatus(o.id, "DELIVERED");

        const b5 = document.createElement("button");
        b5.className = "btn btn-secondary";
        b5.type = "button";
        b5.textContent = "إلغاء";
        b5.onclick = () => updateOrderStatus(o.id, "CANCELED");

        controls.append(b1, b2, b3, b4, b5);
        box.appendChild(controls);

        elOrders.appendChild(box);
      }
    }

    elFilter.addEventListener("change", renderOrders);
    elSearch.addEventListener("input", renderOrders);

    function fillCategoryDropdown(selectedId) {
      const st = Storage.getState();
      const cats = (st.categories || []).filter(c => c.isActive).sort((a,b)=>(a.sort||0)-(b.sort||0));
      fCat.innerHTML = "";
      for (const c of cats) {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        fCat.appendChild(opt);
      }
      if (selectedId) fCat.value = selectedId;
    }

    function openItemModal(mode, item) {
      editingItemId = mode === "edit" ? item.id : null;
      itemModalTitle.textContent = mode === "edit" ? "تعديل صنف" : "إضافة صنف";
      itemModalMsg.textContent = "";

      fillCategoryDropdown(item?.categoryId);

      fName.value = item?.name || "";
      fDesc.value = item?.desc || "";
      fPrice.value = String(item?.priceJOD ?? "");
      fImg.value = item?.imageUrl || "";
      fAvail.checked = item?.isAvailable ?? true;

      itemModal.classList.add("show");
      setTimeout(() => fName.focus(), 60);
    }

    function closeItemModal() {
      itemModal.classList.remove("show");
      editingItemId = null;
    }

    btnCloseItemModal.addEventListener("click", closeItemModal);
    itemModal.addEventListener("click", (e) => { if (e.target === itemModal) closeItemModal(); });

    btnOpenAddItem.addEventListener("click", () => openItemModal("add", null));

    function validateItemForm() {
      const name = (fName.value || "").trim();
      const cat = fCat.value;
      const price = Number(fPrice.value);

      if (!cat) return { ok:false, msg:"اختر القسم." };
      if (!name) return { ok:false, msg:"أدخل اسم الصنف." };
      if (!Number.isFinite(price) || price < 0) return { ok:false, msg:"أدخل سعر صحيح." };

      const img = (fImg.value || "").trim();
      if (img && !/^https?:\/\//i.test(img)) return { ok:false, msg:"رابط الصورة يجب أن يبدأ بـ http أو https." };

      return { ok:true };
    }

    function saveItemFromModal() {
      const check = validateItemForm();
      if (!check.ok) {
        itemModalMsg.textContent = check.msg;
        return;
      }

      const payload = {
        categoryId: fCat.value,
        name: (fName.value || "").trim(),
        desc: (fDesc.value || "").trim(),
        priceJOD: Math.max(0, Number(fPrice.value || 0)),
        imageUrl: (fImg.value || "").trim() || "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1400&q=80",
        isAvailable: !!fAvail.checked
      };

      if (editingItemId) {
        Storage.setState(s => {
          const x = (s.items || []).find(z => z.id === editingItemId);
          if (x) Object.assign(x, payload);
          return s;
        });
        toast("تم تعديل الصنف.");
      } else {
        Storage.setState(s => {
          s.items = s.items || [];
          s.items.unshift({ id: "it_" + crypto.randomUUID().slice(0, 8), ...payload });
          return s;
        });
        toast("تمت إضافة صنف جديد.");
      }

      closeItemModal();
      renderMenuAdmin();
    }

    btnSaveItem.addEventListener("click", saveItemFromModal);

    function deleteItem(itemId) {
      if (!confirm("هل تريد حذف الصنف؟")) return;
      Storage.setState(s => {
        s.items = (s.items || []).filter(x => x.id !== itemId);
        s.cart = (s.cart || []).filter(ci => ci.itemId !== itemId);
        return s;
      });
      toast("تم حذف الصنف.");
      renderMenuAdmin();
    }

    function toggleAvailability(itemId) {
      Storage.setState(s => {
        const x = (s.items || []).find(z => z.id === itemId);
        if (x) x.isAvailable = !x.isAvailable;
        return s;
      });
      toast("تم تحديث التوفر.");
      renderMenuAdmin();
    }

    function getAdminMenuFiltered() {
      const st = Storage.getState();
      const q = (elMenuSearchAdmin.value || "").trim().toLowerCase();
      let items = (st.items || []).slice();
      if (q) items = items.filter(it =>
        (it.name||"").toLowerCase().includes(q) ||
        (it.desc||"").toLowerCase().includes(q)
      );
      items.sort((a,b) => (a.name||"").localeCompare(b.name||"", "ar"));
      return items;
    }

    function renderMenuAdmin() {
      const st = Storage.getState();
      const catsById = Object.fromEntries((st.categories || []).map(c => [c.id, c.name]));
      const items = getAdminMenuFiltered();

      elMenuAdmin.innerHTML = "";

      for (const it of items) {
        const c = document.createElement("div");
        c.className = "item";

        c.innerHTML = `
          <img src="${it.imageUrl}" alt="${it.name}">
          <div class="pad">
            <div class="row">
              <div>
                <div class="name">${it.name}</div>
                <div class="muted small">${catsById[it.categoryId] || "—"}</div>
              </div>
              <span class="badge" style="background:${it.isAvailable ? "rgba(33,199,126,.12)" : "rgba(255,77,77,.12)"}">
                ${it.isAvailable ? "متاح" : "موقوف"}
              </span>
            </div>

            <div class="desc">${it.desc || "—"}</div>

            <label class="label">السعر (د.أ)</label>
            <input class="input priceInput" type="number" step="0.05" min="0" value="${Number(it.priceJOD || 0)}" />

            <div class="controls">
              <button class="btn btn-primary" type="button" data-act="savePrice"><i class="fa-solid fa-floppy-disk"></i> حفظ السعر</button>
              <button class="btn btn-secondary" type="button" data-act="edit"><i class="fa-solid fa-pen"></i> تعديل</button>
              <button class="btn btn-secondary" type="button" data-act="toggle"><i class="fa-solid fa-power-off"></i> تشغيل/إيقاف</button>
              <button class="btn btn-secondary" type="button" data-act="delete"><i class="fa-solid fa-trash"></i> حذف</button>
            </div>
          </div>
        `;

        const priceInput = c.querySelector(".priceInput");
        c.querySelector('[data-act="savePrice"]').onclick = () => {
          const newPrice = Math.max(0, Number(priceInput.value || 0));
          Storage.setState(s => {
            const x = (s.items || []).find(z => z.id === it.id);
            if (x) x.priceJOD = newPrice;
            return s;
          });
          toast("تم حفظ السعر.");
        };

        c.querySelector('[data-act="edit"]').onclick = () => openItemModal("edit", it);
        c.querySelector('[data-act="toggle"]').onclick = () => toggleAvailability(it.id);
        c.querySelector('[data-act="delete"]').onclick = () => deleteItem(it.id);

        elMenuAdmin.appendChild(c);
      }

      if (!items.length) {
        elMenuAdmin.innerHTML = `<div class="muted">لا توجد أصناف.</div>`;
      }
    }

    elMenuSearchAdmin.addEventListener("input", renderMenuAdmin);

    loadSettingsUI();
    renderOpenBadge();
    renderOrders();
    renderMenuAdmin();

    setInterval(renderOrders, 2000);
  }
})();
