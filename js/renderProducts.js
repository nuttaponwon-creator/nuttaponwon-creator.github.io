// js/renderProducts.js

// ฟังก์ชันสำหรับสร้าง HTML ของการ์ดสินค้า
function createProductCard(product) {
  // แปลง Array sizes เป็น string คั่นด้วยเครื่องหมายคอมม่า (เช่น "S,M,L")
  const sizesString = product.sizes.join(','); 

  return `
    <article class="product-card fade-in" onclick="openProductModal(this)" 
      data-name="${product.name}" 
      data-price="${product.price}"
      data-img="${product.img}" 
      data-description="${product.description}" 
      data-category="${product.category}" 
      data-sizes="${sizesString}" 
      data-gender="${Array.isArray(product.gender) ? product.gender.join(',') : product.gender}">
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="badge-tag" data-tag="${product.badge}">${product.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-category" data-category="${product.category}">${product.category}</p>
        <p class="product-price">฿${product.price.toLocaleString()}</p>
        <button class="btn-primary w-100 mt-2" onclick="event.stopPropagation(); openProductModal(this.closest('.product-card'))">
          เพิ่มลงตะกร้า
        </button>
      </div>
    </article>
  `;
}

// ฟังก์ชันหลักในการ Render
function renderProducts(items) {
  const productList = document.getElementById("product-list");
  if (!productList) return; // ถ้าไม่อยู่หน้า product.html ให้ข้าม

  if (!items || items.length === 0) {
    productList.innerHTML = `<div class="col-12 text-center mt-5"><p>ไม่พบสินค้าที่คุณค้นหา</p></div>`;
    return;
  }

  productList.innerHTML = items.map(product => createProductCard(product)).join("");
}

// ฟังก์ชัน Render สินค้าแนะนำ (สำหรับหน้า Index)
function renderRecommended() {
  const recommendList = document.getElementById("product-recommend");
  if (!recommendList || typeof products === 'undefined') return;

  const targetIds = [2, 1, 3]; // ไอดีสินค้าแนะนำ
  const filteredProducts = products.filter(p => targetIds.includes(p.id));

  recommendList.innerHTML = filteredProducts.map(product => createProductCard(product)).join("");
}

// เริ่มการทำงานเมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", () => {
  // 1. Render สินค้าแนะนำทันที (ถ้ามี)
  renderRecommended();

  // 2. จัดการหน้า Product List พร้อม Effect Skeleton
  const productList = document.getElementById("product-list");
  if (productList && typeof products !== 'undefined') {
    // แสดง Skeleton ก่อน
    productList.innerHTML = Array(8).fill('').map(() => `
      <div class="product-card skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div class="product-body">
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text" style="width: 60%"></div>
          <div class="skeleton skeleton-price"></div>
        </div>
      </div>
    `).join('');

    // หน่วงเวลา 0.8 วินาที เพื่อความสวยงาม แล้วค่อยแสดงสินค้าจริง
    setTimeout(() => {
      renderProducts(products);
      // เรียกใช้ฟังก์ชัน Apply Filter จาก script.js (ถ้ามี) เพื่อให้การค้นหายังคงอยู่
      if (typeof applyFilters === 'function') applyFilters();
    }, 800);
  }
});