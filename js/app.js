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

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("js-product-card");

  if (produk.unggulan) {
    const badgeFeatured = document.createElement("span");
    badgeFeatured.classList.add("badge-featured");
    badgeFeatured.textContent = "⭐ Unggulan";
    card.append(badgeFeatured);
  }

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-text");
  category.textContent = `Kategori: ${produk.kategori}`;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  const cardActions = document.createElement("div");
  cardActions.classList.add("card-actions");

  const linkTanya = document.createElement("a");
  linkTanya.classList.add("button");
  linkTanya.href = "kontak.html";
  linkTanya.textContent = "Tanya produk";
  cardActions.append(linkTanya);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("ghost-button");
  removeButton.addEventListener("click", () => {
    card.remove();
    console.log(`Elemen kartu ${produk.nama} disembunyikan dari DOM.`);
  });
  cardActions.append(removeButton);

  card.append(title, category, price, stock, cardActions);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori "${kategori}".`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {

  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan untuk kategori "${kategoriAktif}".`;
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderProduk("Semua");
});