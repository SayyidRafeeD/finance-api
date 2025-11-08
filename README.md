# Personal Finance API

API untuk aplikasi keuangan pribadi yang memungkinkan pengguna untuk mencatat dan mengelola transaksi keuangan pribadi mereka. API ini dibangun dengan **Express** dan **MongoDB**, serta menggunakan **JWT** untuk autentikasi dan keamanan.

## Fitur

- **Autentikasi Pengguna**: Pengguna dapat melakukan registrasi dan login menggunakan JWT (JSON Web Token).
- **Manajemen Transaksi**: Pengguna dapat menambahkan, melihat, dan menghapus transaksi keuangan pribadi mereka.
- **Keamanan**: API dilindungi menggunakan autentikasi berbasis JWT.

## Teknologi yang Digunakan

- **Node.js** (runtime JavaScript)
- **Express.js** (framework backend)
- **MongoDB** (database NoSQL)
- **Mongoose** (ODM untuk MongoDB)
- **JWT** (untuk autentikasi)
- **bcryptjs** (untuk hashing password)
- **dotenv** (untuk mengelola variabel lingkungan)
- **CORS** (untuk menangani permintaan lintas domain)
- **Postman** (untuk menguji API)

---

## Persyaratan

- **Node.js** versi 14.x atau lebih baru
- **MongoDB** (baik lokal atau menggunakan MongoDB Atlas)

---

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/personal-finance-api.git
cd personal-finance-api
```

### 2. Instal Dependensi

``` bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env`:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

### 4. Jalankan Server

``` bash
npm run dev
```

Server berjalan di `http://localhost:5000`.

------------------------------------------------------------------------

## Struktur Endpoint

### Auth

-   **POST /api/auth/register**
-   **POST /api/auth/login**

### Transaksi

-   **POST /api/transactions**
-   **GET /api/transactions**
-   **DELETE /api/transactions/:id**