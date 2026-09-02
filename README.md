# Moment & Co. — Website

Website statis (HTML/CSS/JS murni, tanpa framework/dependency) untuk layanan **sewa** papan ucapan akrilik custom (bukan jual-beli — papan diantar untuk acara, lalu diambil kembali setelah selesai).

## Struktur file
```
index.html         → Homepage (info toko di paling atas, lalu hero & daftar desain)
board.html          → Halaman kustomisasi & pengajuan sewa (satu halaman, scroll ke bawah)
css/style.css       → Semua styling
js/data.js          → Data 15 desain (nama, kategori, harga sewa, path gambar)
js/nav.js           → Toggle menu mobile
js/main.js          → Logic homepage (render kartu desain, pencarian)
js/board.js         → Logic halaman custom (preview live, validasi, pesan WhatsApp)
images/             → Taruh foto asli tiap desain di sini
```

## Navigasi
Tidak ada lagi tab klik-untuk-pindah section. Berpindah section/halaman cukup lewat menu utama (main-nav) di header, dan tiap halaman adalah satu halaman panjang yang di-scroll:
- `index.html`: Tentang Kami (info toko) → Hero → Pilih Desain.
- `board.html`: Kustomisasi → Info Pengantaran (termasuk tanggal acara) → Pembayaran → Ringkasan Sewa, semua berurutan dalam satu form.

## Cara menambahkan foto desain
Di `js/data.js`, tiap desain punya properti `img`, contoh:
```js
{ id: 1, name: "Blooming Congratulations", occasion: "Wisuda", price: 185000, img: "images/design-01.jpg" }
```
Tinggal taruh file foto dengan nama yang sama persis di folder `images/` (misalnya `images/design-01.jpg`). Selama foto belum ada, kartu akan otomatis menampilkan placeholder ikon sesuai kategori acara — jadi tidak akan tampil rusak/broken image. `price` adalah harga sewa per acara, bukan harga jual.

## Cara mengganti nomor WhatsApp
Buka `js/board.js`, baris paling atas:
```js
const WHATSAPP_NUMBER = "6281234567890"; // ganti dengan nomor asli, format 62xxxxxxxxxx tanpa +/spasi/strip
```
Nomor yang sama juga dipakai di link WhatsApp pada footer kedua halaman (`index.html` dan `board.html`) — cari `wa.me/6281234567890` dan ganti juga di sana.

## Mengubah harga sewa, nama desain, atau daftar acara
Semua ada di `js/data.js` (daftar desain) dan di `board.html` bagian `<select id="fOccasion">` (daftar dropdown acara).

## Menjalankan secara lokal
Karena murni file statis, cukup buka `index.html` langsung di browser, atau jalankan local server sederhana:
```
python3 -m http.server 8000
```
lalu buka `http://localhost:8000`.
