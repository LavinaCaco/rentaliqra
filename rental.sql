-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Jun 2025 pada 16.06
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rental`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 6, 'auth_token', '1d864206157908aab691aac98aae93060811c753f85c7aada93f26668124a06a', '[\"*\"]', NULL, NULL, '2025-06-20 06:43:21', '2025-06-20 06:43:21'),
(2, 'App\\Models\\User', 7, 'auth_token', '87574ec74763f98b363f00490425dc7e6c856712861b76faa2584721fb40498c', '[\"*\"]', NULL, NULL, '2025-06-20 06:47:20', '2025-06-20 06:47:20'),
(3, 'App\\Models\\User', 6, 'auth_token', 'b1c8733cd2dab10e410ad3e93d4c0db26a4997b05dae7438ef3ae69ce2707920', '[\"*\"]', NULL, NULL, '2025-06-20 06:49:21', '2025-06-20 06:49:21'),
(4, 'App\\Models\\User', 7, 'auth_token', '3ce26cce4738b20c15731f727b89a1db8ca23a57bfbb0585a0fa33cc5e50c0af', '[\"*\"]', NULL, NULL, '2025-06-20 06:54:31', '2025-06-20 06:54:31'),
(5, 'App\\Models\\User', 6, 'auth_token', '1b1b50d5a3a6924863fc80194c6833ae814f3e52df35053acbfcddabcfd4073a', '[\"*\"]', NULL, NULL, '2025-06-20 06:55:34', '2025-06-20 06:55:34'),
(6, 'App\\Models\\User', 6, 'auth_token', '5f04100c4c8a67e1ed49b8c8cbcaee4ebcbecd398fbec5415d799c2a25a155d3', '[\"*\"]', NULL, NULL, '2025-06-20 06:57:29', '2025-06-20 06:57:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `phone`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Abi Yan', 'abi@gmail.com', NULL, '08111111111', '$2y$10$q0zSlN81uhJwjblT5OI9PO3aaYTvWDYrx/oVIWKYMeo6TLBxrN8MC', NULL, '2025-06-20 03:17:05', '2025-06-20 03:17:05'),
(2, 'Abyan Hisyam', 'abi2@gmail.com', NULL, '09866556223', '$2y$10$/aVecBrjzbWB8tFMPi14TuK7F8fPDIsvVlwo1Ip4Q5ecqyd0b7uHe', NULL, '2025-06-20 03:18:09', '2025-06-20 03:18:09'),
(3, 'Abi Yan', 'abi32@gmail.com', NULL, '08111111111', '$2y$10$dHlZSE63zuBowl8iMO0bXuRMbXfZx/B8tXdLybcea7nx1oBlYZNJK', NULL, '2025-06-20 04:24:24', '2025-06-20 04:24:24'),
(4, 'ahahdaojsdad lkanflkalenflaef', 'knaklefnlanfa@gmail.com', NULL, '0987876553232', '$2y$10$FfB70N3CcR7fQ941LdSFPO6Sq5PwMcw.t.V229I3D5wAWQheHVy3a', NULL, '2025-06-20 04:29:30', '2025-06-20 04:29:30'),
(5, 'amsd askdo', 'aosdko@gmail.com', NULL, '2384', '$2y$10$Zu/1iLG4HM80bnpp83A7WuRMrIZTrLOxDvBdm.n9XDpGXjQRx2D/m', NULL, '2025-06-20 06:15:26', '2025-06-20 06:15:26'),
(6, 'caco o', 'caco@gmail.com', NULL, '1231', '$2y$10$VYYhgu2YB55hdXWUyvfMWe8zCr1zE/7.Bx09fYj6xwKynFgu3MGdC', NULL, '2025-06-20 06:43:06', '2025-06-20 06:43:06'),
(7, 'amar yoni', 'amar@gmail.com', NULL, '123121', '$2y$10$I28CNlzFHaAZxbEzJSr9H.eEXU0/ajiuC3T8xtMa.SNrMkNBGFSZ.', NULL, '2025-06-20 06:47:08', '2025-06-20 06:47:08');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
