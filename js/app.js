"use strict";

const produkUmkm = [
  { nama: "Arabika Gayo Signature", kategori: "Kopi", harga: 85000, stok: 12, unggulan: true },
  { nama: "Robusta Temanggung", kategori: "Kopi", harga: 65000, stok: 4, unggulan: false },
  { nama: "Paket Seduh Rumahan", kategori: "Bundling", harga: 125000, stok: 0, unggulan: false },
  { nama: "Cold Brew Aren", kategori: "Kopi", harga: 22000, stok: 18, unggulan: false }
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(nilai);
}

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "empty" };
  }
  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "success" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const kategori = labelKategori(produk.kategori);
  const badgeFeatured = produk.unggulan ? `<span class="badge-featured">⭐ Unggulan</span>` : "";

  return `
    <article class="js-product-card">
      ${badgeFeatured}
      <h3>${produk.nama}</h3>
      <p class="category-text">${kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
      
      <div class="card-actions">
        <a class="button" href="kontak.html">Tanya produk</a>
      </div>
    </article>
  `;
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap di halaman ini.");
    return;
  }

  produkUmkm.forEach((produk) => {
    console.log("Debug item:", produk.nama, "| Stok:", produk.stok);
  });

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} dari ${produkUmkm.length} produk tersedia.`;
  unggulan.textContent = produkUnggulan
    ? `Produk Unggulan Hari Ini: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);