# 🚗 Rental Mobil Iqra

Selamat datang di **Rental Mobil Iqra** – Solusi cerdas, cepat, dan terpercaya untuk kebutuhan transportasi Anda!  
Website ini hadir untuk memudahkan Anda dalam melakukan reservasi mobil secara online, tanpa ribet dan kapan saja.

---

## 🌟 Tentang Proyek Ini

**Rental Mobil Iqra** adalah platform digital yang dibangun dengan semangat pelayanan, keandalan, dan teknologi modern.  
Kami percaya, setiap perjalanan punya cerita — dan kami ingin menjadi bagian dari cerita terbaik Anda.

> *"Karena setiap perjalanan dimulai dari satu langkah — dan kami hadir untuk mempermudah langkah itu."*

---

## 💻 Teknologi yang Digunakan

Proyek ini dikembangkan menggunakan teknologi modern agar pengalaman pengguna terasa cepat dan menyenangkan:

- ⚛️ **React.js**  
- 💡 **JavaScript**  
- 🎨 **React Bootstrap**  

---

## ✨ Fitur Utama

✅ Lihat daftar mobil yang tersedia secara real-time  
✅ Detail mobil lengkap: harga, spesifikasi, dan gambar  
✅ Form pemesanan simpel & efisien  
✅ Desain responsif   

---

## 📌 Status Pengembangan

Proyek ini **masih dalam tahap pengembangan aktif**.  
Kami terbuka terhadap saran, kritik, dan kontribusi untuk membuat Rental Mobil Iqra lebih baik dari hari ke hari 🚀

---

## 📖 Kata-Kata Hari Ini
"Seperti mobil yang siap melaju di jalan, hidup juga menunggu kamu untuk menyalakan mesin dan bergerak maju. Gas terus!"

---

## 📫 Kontak
📧 Email: iqra.rental@gmail.com
📱 WhatsApp: 08xx-xxxx-xxxx

---

## 🛠️ Cara Menjalankan Proyek
Sebelum meng-clone dipastikan sudah memiliki composer.
Clone project dan jalankan secara lokal dengan perintah berikut:

```bash
1. git clone https://github.com/LavinaCaco/rentaliqra.git
2. masuk ke rentaliqra-backend menggunakan cd rentaliqra-backend kemudian copy code dibawah
- composer install
- php artisan key:generate
- php artisan storage:link
3. masuk ke rentaliqra-frontend menggunakan cd rentaliqra-frontend kemudian copy code dibawah
- npm install
4. buat tabel baru pada localhost/phpmyadmin dan dinamai rental
5. kemudian buat file baru bernapa .env pada rentaliqra-backend dan diisi dengan code yang berada didalam .env.example,
   setelah itu ganti pada DB_DATABASE menjadi rental
6. jalankan migration untuk membuat tabel tabel pada database menggunakan
- php artisan migrate
7. masuk ke rentaliqra-backend menggunakan code dibawah dan jalankan
- cd rentaliqra-backend
- php artisan serve
8. langkah terakhir masuk ke rentaliqra-frontend menggunakan code dibawah dan jalankan
- cd rentaliqra-frontend
- npm start

Selamat Anda Berhasil Untuk Menjalankan RentalIqra
