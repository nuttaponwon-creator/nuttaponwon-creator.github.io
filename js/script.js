// ====================================
//  GLOBAL CART LOGIC
// ====================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// แก้ไข 1: อัปเดต UI ตะกร้าให้แสดงไซส์
function updateCartUI() {
  localStorage.setItem("cart", JSON.stringify(cart));
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartTotalEl = document.getElementById("cart-total");

  if (!cartItemsEl || !cartCountEl || !cartTotalEl) return;

  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    const li = document.createElement("li");
    li.className = "cart-empty";
    li.textContent = "ยังไม่มีสินค้าในตะกร้า";
    cartItemsEl.appendChild(li);
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "cart-item-row";

      // ปรับ HTML ในตะกร้าให้แสดงชื่อและไซส์สวยงาม
      li.innerHTML = `
        <div style="display: flex; flex-direction: column; flex: 1;">
          <span style="font-weight: 600;">${item.name}</span>
          <span style="font-size: 0.85rem; color: #666;">ไซส์: ${item.size || '-'}</span>
        </div>
        <span style="margin-right: 10px;">฿${item.price.toLocaleString("th-TH", { maximumFractionDigits: 0 })}</span>
        <button class="cart-remove-btn" data-index="${index}">✕</button>
      `;

      cartItemsEl.appendChild(li);
    });
  }

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalEl.textContent = "฿" + total.toLocaleString("th-TH", {
    maximumFractionDigits: 0
  });

  cartCountEl.textContent = String(cart.length);
}

// แก้ไข 2: รับค่า size เข้ามาบันทึกด้วย (ค่า default เป็น '-')
function addToCart(name, price, size = '-') {
  cart.push({
    name,
    price: Number(price),
    size
  });
  updateCartUI();

  // เปิดตะกร้าอัตโนมัติเมื่อกดเพิ่มสินค้า
  const cartPanel = document.getElementById("cart-panel");
  const cartOverlay = document.getElementById("cart-overlay");
  if (cartPanel && cartOverlay) {
    cartPanel.classList.add("is-open");
    cartOverlay.classList.add("is-active");
  }
}

function removeItemFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// ====================================
//  MAIN EVENT BINDINGS
// ====================================
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  // ---------------- Navbar Mobile ----------------
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("is-open");
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
      });
    });
  }

  // ---------------- Cart Panel ----------------
  const cartToggle = document.getElementById("cart-toggle");
  const cartPanel = document.getElementById("cart-panel");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartClose = document.getElementById("cart-close");

  function openCart() {
    cartPanel.classList.add("is-open");
    cartOverlay.classList.add("is-active");
  }

  function closeCart() {
    cartPanel.classList.remove("is-open");
    cartOverlay.classList.remove("is-active");
  }

  if (cartToggle) cartToggle.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  document.getElementById("cart-items").addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-remove-btn")) {
      const index = e.target.dataset.index;
      removeItemFromCart(Number(index));
    }
  });

  // ---------------- Add to Cart (จาก Card หน้าแรก - ไม่ผ่าน Modal) ----------------
  document.body.addEventListener("click", (e) => {
    const target = e.target;
    // ถ้ากดปุ่มเพิ่มลงตะกร้าโดยตรง (ถ้ามี) ให้ใส่ไซส์ default
    if (target.classList.contains("add-to-cart") && target.id !== "modal-addcart") {
      // เพื่อความชัวร์ ให้เปิด Modal แทนการใส่ตะกร้าเลย จะได้เลือกไซส์ได้
      // แต่ถ้าต้องการใส่เลย ก็ใช้โค้ดเดิม:
      // const name = target.dataset.name;
      // const price = target.dataset.price;
      // addToCart(name, price);
      // openCart();
    }
  });

  // ---------------- Search & Filters ----------------
  const searchInput = document.getElementById("search-input");
  let activeCategory = "all"; // เก็บค่าหมวดหมู่ปัจจุบัน
  let activeGender = "all"; // เก็บค่าเพศปัจจุบัน

  function applyFilters() {
    const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const productCards = document.querySelectorAll("#product-list .product-card");

    productCards.forEach((card) => {
      const cardCategory = (card.dataset.category || "").toLowerCase();
      const cardGenderRaw = (card.dataset.gender || "").toLowerCase();
      // แปลง gender เป็น array เพื่อรองรับสินค้าที่มีหลายเพศ เช่น ["man","woman"]
      const cardGenders = cardGenderRaw.includes(",") ? cardGenderRaw.split(",") : [cardGenderRaw];
      const titleText = (card.dataset.name || "").toLowerCase();

      // Logic การตรวจสอบ
      const matchCategory = activeCategory === "all" || cardCategory === activeCategory;
      const matchGender = activeGender === "all" || cardGenders.includes(activeGender);
      const matchSearch = !searchValue || titleText.includes(searchValue);

      if (matchCategory && matchGender && matchSearch) {
        card.style.display = ""; // แสดง
        card.classList.add("fade-in");
      } else {
        card.style.display = "none"; // ซ่อน
        card.classList.remove("fade-in");
      }
    });
  }

  // Event Listener สำหรับ Dropdown หมวดหมู่ (Bootstrap)
  const categoryLinks = document.querySelectorAll(".dropdown-item[data-category]");
  const categoryButtonLabel = document.getElementById("filterCategory"); // ปุ่ม Dropdown

  categoryLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // 1. อัปเดตตัวแปร
      activeCategory = link.dataset.category;

      // 2. เปลี่ยนข้อความบนปุ่ม
      if (categoryButtonLabel) {
        categoryButtonLabel.textContent = `หมวดหมู่: ${link.textContent}`;
      }

      // 3. เรียกฟังก์ชันกรอง
      applyFilters();
    });
  });

  // Event Listener สำหรับ Gender Chips
  const genderChips = document.querySelectorAll(".chip");
  genderChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      // ปรับ UI ปุ่ม
      genderChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      // อัปเดตตัวแปรและกรอง
      activeGender = chip.dataset.gender || "all";
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
}); // <--- ปิดวงเล็บ DOMContentLoaded ที่เคยหายไป

// ====================================
//  PRODUCT MODAL
// ====================================
// แก้ไข 3: รับค่า sizes มาสร้างตัวเลือก Dropdown
function openProductModal(card) {
  document.getElementById("productModal").style.display = "flex";

  const name = card.dataset.name;
  const price = card.dataset.price;
  const category = card.dataset.category;
  const description = card.dataset.description;
  const img = card.dataset.img;
  // ดึงข้อมูลไซส์ที่ส่งมาจาก HTML (ที่แก้ใน renderProducts.js)
  const sizesRaw = card.dataset.sizes || "";
  const sizes = sizesRaw ? sizesRaw.split(",") : [];

  document.getElementById("modal-title").innerText = name;
  document.getElementById("modal-description").innerText = description;
  document.getElementById("modal-category").innerText = category;
  document.getElementById("modal-price").innerText = "฿" + Number(price).toLocaleString();
  document.getElementById("modal-img").src = img;
  document.getElementById("qty-input").value = 1;

  // สร้างตัวเลือกไซส์ใน Dropdown
  const sizeSelect = document.getElementById("modal-size-select");
  if (sizeSelect) {
    sizeSelect.innerHTML = ""; // ล้างค่าเก่า
    if (sizes.length > 0 && sizes[0] !== "") {
      sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.text = size;
        sizeSelect.appendChild(option);
      });
    } else {
      // กรณีไม่มีไซส์
      const option = document.createElement("option");
      option.value = "Free Size";
      option.text = "Free Size";
      sizeSelect.appendChild(option);
    }
  }

  const addBtn = document.getElementById("modal-addcart");
  addBtn.dataset.name = name;
  addBtn.dataset.price = price;
}

document.getElementById("modal-close").onclick = function() {
  document.getElementById("productModal").style.display = "none";
};

window.onclick = function(event) {
  if (event.target.id === "productModal") {
    document.getElementById("productModal").style.display = "none";
  }
};

// ====================================
//  QTY BUTTONS
// ====================================
document.getElementById("qty-increase").onclick = () => {
  const qty = document.getElementById("qty-input");
  qty.value = Number(qty.value) + 1;
};

document.getElementById("qty-decrease").onclick = () => {
  const qty = document.getElementById("qty-input");
  if (qty.value > 1) qty.value = Number(qty.value) - 1;
};

// ====================================
//  ADD CART FROM MODAL (เวอร์ชันแก้)
// ====================================
document.getElementById("modal-addcart").onclick = function() {
  const name = this.dataset.name;
  const price = this.dataset.price;
  const qty = Number(document.getElementById("qty-input").value);

  // ดึงค่าไซส์ที่ลูกค้าเลือก
  const sizeSelect = document.getElementById("modal-size-select");
  const selectedSize = sizeSelect ? sizeSelect.value : "Free Size";

  for (let i = 0; i < qty; i++) {
    addToCart(name, price, selectedSize); // ส่งไซส์ไปด้วย
  }

  document.getElementById("productModal").style.display = "none";
};

// เมื่อเลื่อนหน้า
window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
// back-to-top
const btn = document.getElementById("btn-back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });