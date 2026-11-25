-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2026 at 03:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parkir_pk`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_area`
--

CREATE TABLE `tb_area` (
  `id_area` int(11) NOT NULL,
  `nama_area` varchar(255) NOT NULL,
  `kapasitas` int(11) NOT NULL,
  `terisi` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_area`
--

INSERT INTO `tb_area` (`id_area`, `nama_area`, `kapasitas`, `terisi`, `status`) VALUES
(1, 'A1', 10, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_kendaraan`
--

CREATE TABLE `tb_kendaraan` (
  `id_kendaraan` int(11) NOT NULL,
  `nomor_polisi` varchar(255) NOT NULL,
  `jenis_kendaraan` enum('mobil','motor','lainnya') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_kendaraan`
--

INSERT INTO `tb_kendaraan` (`id_kendaraan`, `nomor_polisi`, `jenis_kendaraan`) VALUES
(1, 'B3818EUV', 'motor'),
(2, 'B1415EEL', 'motor');

-- --------------------------------------------------------

--
-- Table structure for table `tb_log_aktivitas`
--

CREATE TABLE `tb_log_aktivitas` (
  `id_log` int(11) NOT NULL,
  `id_pengguna` int(11) NOT NULL,
  `aktivitas` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_pengguna`
--

CREATE TABLE `tb_pengguna` (
  `id_pengguna` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `nama_pengguna` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','petugas','owner') DEFAULT 'petugas',
  `status_aktif` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_pengguna`
--

INSERT INTO `tb_pengguna` (`id_pengguna`, `nama_lengkap`, `nama_pengguna`, `password`, `role`, `status_aktif`) VALUES
(5, 'Fairuz Kayyasah', 'admin1', '$2b$10$o5m5pz4xzcQer3ytnI2NE.MB3HuCiFdnOM2T8XtEJMEty1eRUbxV.', 'admin', 0),
(6, 'Keyla Azhari Permata Putri', 'admin2', '$2b$10$GZgHXxTzkw2cOomWl8X.reFi39eZOzQa5wtvELfCRAnYDF6g.K6zK', 'admin', 0),
(8, 'dummy', 'dumpetugas', '$2b$10$ek3PgjAKhmAGp/ZdnBFLCejGDwD6oW23seM5CFGLx3GCcuLtYxJKC', 'petugas', 1),
(9, 'Pemilik Parkir', 'owner123', '$2b$10$hp4dI1VYTC2bpcLPXpvD9.A/ZBJ6Xm5cWt08Vc.IVkSzzehRSRupu', 'owner', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_tarif`
--

CREATE TABLE `tb_tarif` (
  `id_tarif` int(11) NOT NULL,
  `jenis_kendaraan` enum('mobil','motor','lainnya') NOT NULL,
  `biaya_tarif` decimal(10,2) NOT NULL,
  `tarif_maksimal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_tarif`
--

INSERT INTO `tb_tarif` (`id_tarif`, `jenis_kendaraan`, `biaya_tarif`, `tarif_maksimal`) VALUES
(1, 'motor', 3000.00, 15000.00),
(2, 'mobil', 5000.00, 25000.00),
(3, 'lainnya', 7000.00, 30000.00);

-- --------------------------------------------------------

--
-- Table structure for table `tb_transaksi`
--

CREATE TABLE `tb_transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_kendaraan` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `waktu_masuk` datetime NOT NULL,
  `waktu_keluar` datetime DEFAULT NULL,
  `id_tarif` int(11) NOT NULL,
  `durasi` int(11) DEFAULT NULL,
  `tarif_total` decimal(10,2) DEFAULT NULL,
  `status_transaksi` enum('masuk','selesai') NOT NULL DEFAULT 'masuk',
  `tanggal` date NOT NULL,
  `metode_pembayaran` enum('QRIS','Debit') DEFAULT NULL,
  `id_petugas_masuk` int(11) NOT NULL,
  `id_petugas_keluar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_transaksi`
--

INSERT INTO `tb_transaksi` (`id_transaksi`, `id_kendaraan`, `id_area`, `waktu_masuk`, `waktu_keluar`, `id_tarif`, `durasi`, `tarif_total`, `status_transaksi`, `tanggal`, `metode_pembayaran`, `id_petugas_masuk`, `id_petugas_keluar`) VALUES
(1, 2, 1, '2026-11-25 10:18:44', '2026-11-25 13:41:39', 1, 203, 12000.00, 'selesai', '2026-11-25', 'QRIS', 8, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_area`
--
ALTER TABLE `tb_area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indexes for table `tb_kendaraan`
--
ALTER TABLE `tb_kendaraan`
  ADD PRIMARY KEY (`id_kendaraan`);

--
-- Indexes for table `tb_log_aktivitas`
--
ALTER TABLE `tb_log_aktivitas`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `id_pengguna` (`id_pengguna`);

--
-- Indexes for table `tb_pengguna`
--
ALTER TABLE `tb_pengguna`
  ADD PRIMARY KEY (`id_pengguna`),
  ADD UNIQUE KEY `nama_pengguna` (`nama_pengguna`);

--
-- Indexes for table `tb_tarif`
--
ALTER TABLE `tb_tarif`
  ADD PRIMARY KEY (`id_tarif`);

--
-- Indexes for table `tb_transaksi`
--
ALTER TABLE `tb_transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_kendaraan` (`id_kendaraan`),
  ADD KEY `id_area` (`id_area`),
  ADD KEY `id_tarif` (`id_tarif`),
  ADD KEY `fk_petugas_masuk` (`id_petugas_masuk`),
  ADD KEY `fk_petugas_keluar` (`id_petugas_keluar`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_area`
--
ALTER TABLE `tb_area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_kendaraan`
--
ALTER TABLE `tb_kendaraan`
  MODIFY `id_kendaraan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_log_aktivitas`
--
ALTER TABLE `tb_log_aktivitas`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_pengguna`
--
ALTER TABLE `tb_pengguna`
  MODIFY `id_pengguna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tb_tarif`
--
ALTER TABLE `tb_tarif`
  MODIFY `id_tarif` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_transaksi`
--
ALTER TABLE `tb_transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_log_aktivitas`
--
ALTER TABLE `tb_log_aktivitas`
  ADD CONSTRAINT `tb_log_aktivitas_ibfk_1` FOREIGN KEY (`id_pengguna`) REFERENCES `tb_pengguna` (`id_pengguna`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tb_transaksi`
--
ALTER TABLE `tb_transaksi`
  ADD CONSTRAINT `fk_petugas_keluar` FOREIGN KEY (`id_petugas_keluar`) REFERENCES `tb_pengguna` (`id_pengguna`),
  ADD CONSTRAINT `fk_petugas_masuk` FOREIGN KEY (`id_petugas_masuk`) REFERENCES `tb_pengguna` (`id_pengguna`),
  ADD CONSTRAINT `tb_transaksi_ibfk_2` FOREIGN KEY (`id_kendaraan`) REFERENCES `tb_kendaraan` (`id_kendaraan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_transaksi_ibfk_3` FOREIGN KEY (`id_area`) REFERENCES `tb_area` (`id_area`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_transaksi_ibfk_4` FOREIGN KEY (`id_tarif`) REFERENCES `tb_tarif` (`id_tarif`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
