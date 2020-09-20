-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Sep 2020 pada 08.55
-- Versi server: 10.1.36-MariaDB
-- Versi PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `technoker`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `experience`
--

CREATE TABLE `experience` (
  `experience_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `experience_position` varchar(50) DEFAULT NULL,
  `experience_company` varchar(100) DEFAULT NULL,
  `experience_date_in` varchar(100) DEFAULT NULL,
  `experience_date_out` varchar(100) DEFAULT NULL,
  `experience_desc` text,
  `experience_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `experience_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `experience`
--

INSERT INTO `experience` (`experience_id`, `user_id`, `experience_position`, `experience_company`, `experience_date_in`, `experience_date_out`, `experience_desc`, `experience_created_at`, `experience_updated_at`) VALUES
(1, 1, 'Fullstack Engineer', 'PT Sejahtera', 'Maret 2015', 'Januari 2019', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', '2020-09-17 15:04:27', '2020-09-19 03:11:05'),
(2, 3, 'Backend Developer', 'PT Nusa Bangsa', 'January 2010', 'December 2020', NULL, '2020-09-19 03:09:18', '2020-09-19 03:09:18'),
(3, 6, 'Backend Developer', 'Google Inc', 'January 2010', 'December 2020', NULL, '2020-09-19 03:09:53', '2020-09-19 03:09:53'),
(4, 2, 'Backend Developer', 'Tokopedia', 'January 2010', 'December 2020', NULL, '2020-09-19 03:10:06', '2020-09-19 03:10:06'),
(5, 5, 'Backend Developer', 'Tokopedia', 'January 2010', 'December 2020', NULL, '2020-09-19 03:12:48', '2020-09-19 03:12:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `message`
--

CREATE TABLE `message` (
  `message_id` int(11) NOT NULL,
  `room_id` varchar(100) NOT NULL,
  `role` int(1) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `message_text` text NOT NULL,
  `message_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `message`
--

INSERT INTO `message` (`message_id`, `room_id`, `role`, `sender_id`, `message_text`, `message_created_at`) VALUES
(1, '1600517829387', 2, 2, 'Barcelona 2-8', '2020-09-19 12:15:29'),
(2, '1600517840703', 2, 2, 'Cie dibantai', '2020-09-19 12:16:25'),
(3, '1600517840703', 2, 2, 'hahaha', '2020-09-19 12:16:36'),
(4, '1600519057490', 1, 4, 'hahaha', '2020-09-19 12:37:14'),
(5, '1600519057490', 2, 2, 'hahaha', '2020-09-19 12:59:30'),
(6, '1600520786511', 1, 4, 'hahaha', '2020-09-19 13:05:30'),
(7, '1600520786511', 1, 4, 'hahaha', '2020-09-19 13:05:35'),
(8, '1600526490630', 1, 4, 'hahaha', '2020-09-19 14:41:01'),
(9, '1600526490630', 2, 5, 'haloo', '2020-09-19 14:44:21'),
(10, '1600526490630', 2, 5, 'haloo', '2020-09-20 03:06:03'),
(11, '1600571662758', 1, 4, 'haloo', '2020-09-20 03:13:29'),
(12, '1600571662758', 1, 4, 'haloo', '2020-09-20 05:11:32'),
(13, '1600571662758', 1, 4, 'haloo', '2020-09-20 05:15:50'),
(14, '1600579488910', 1, 1, 'haloo', '2020-09-20 05:23:21'),
(15, '1600579488910', 1, 1, 'haloo', '2020-09-20 05:26:02'),
(16, '1600579488910', 1, 7, 'haloo', '2020-09-20 05:40:06'),
(17, '1600579488910', 1, 7, 'haloo', '2020-09-20 05:45:10'),
(18, '1600579488910', 1, 7, 'haloo', '2020-09-20 06:01:09'),
(19, '1600579488910', 1, 7, 'haloo', '2020-09-20 06:01:11'),
(20, '1600579488910', 1, 7, 'haloo', '2020-09-20 06:01:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notification`
--

CREATE TABLE `notification` (
  `notif_id` int(11) NOT NULL,
  `notif_subject` varchar(200) NOT NULL,
  `role` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notif_status` enum('1','2') NOT NULL DEFAULT '2' COMMENT '1 = read, 2 = unread',
  `notif_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `notification`
--

INSERT INTO `notification` (`notif_id`, `notif_subject`, `role`, `user_id`, `notif_status`, `notif_created_at`) VALUES
(6, 'You got some message', 2, 7, '1', '2020-09-20 05:40:06'),
(7, 'You got some message', 2, 7, '1', '2020-09-20 05:45:10'),
(8, 'You got some message', 2, 7, '1', '2020-09-20 06:01:09'),
(9, 'You got some message', 2, 7, '1', '2020-09-20 06:01:11'),
(10, 'You got some message', 2, 7, '1', '2020-09-20 06:01:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `portofolio`
--

CREATE TABLE `portofolio` (
  `portofolio_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `portofolio_image` varchar(50) NOT NULL,
  `portofolio_name` varchar(50) NOT NULL,
  `portofolio_type` int(1) NOT NULL COMMENT '1 = Mobile, 2 = Web',
  `portofolio_repository` varchar(200) NOT NULL,
  `portofolio_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `portofolio_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `portofolio`
--

INSERT INTO `portofolio` (`portofolio_id`, `user_id`, `portofolio_image`, `portofolio_name`, `portofolio_type`, `portofolio_repository`, `portofolio_created_at`, `portofolio_updated_at`) VALUES
(3, 1, '2020-09-17T08-39-10.061Z-362-3623383_why-small-bus', 'Arztwo', 0, '', '2020-09-17 08:39:10', '2020-09-17 08:39:10'),
(4, 2, '2020-09-17T08-54-57.077Z-362-3623383_why-small-bus', 'Arztwo', 0, '', '2020-09-17 08:54:57', '2020-09-17 08:54:57'),
(5, 2, '2020-09-17T09-27-20.452Z-362-3623383_why-small-bus', 'Arztwo', 2, 'https://github.com/arizal/arztwo', '2020-09-17 09:27:20', '2020-09-17 09:27:20'),
(6, 9, '2020-09-18T12-00-55.815Z-Screenshot (152).png', 'Evday POS', 2, 'https://github.com/nhidayat/evday-pos-vue', '2020-09-18 12:00:56', '2020-09-18 12:00:56'),
(8, 3, '2020-09-18T16-38-16.953Z-02.jpg', 'Portone', 2, 'https://github.com/nhidayat/evday-pos-vue', '2020-09-18 16:38:16', '2020-09-18 16:38:16'),
(9, 4, '2020-09-18T16-38-37.766Z-02.jpg', 'Portone', 1, 'https://github.com/nhidayat/evday-pos-vue', '2020-09-18 16:38:37', '2020-09-18 16:38:37'),
(10, 4, '2020-09-18T16-38-58.596Z-Presentation-800-x-600-02', 'PortoneV', 1, 'https://github.com/nhidayat/evday-pos-vue', '2020-09-18 16:38:58', '2020-09-18 16:38:58'),
(11, 5, '2020-09-18T16-39-30.749Z-preview.jpg', 'Analyc', 1, 'https://github.com/nhidayat/evday-pos-vue', '2020-09-18 16:39:30', '2020-09-18 16:39:30'),
(12, 1, '2020-09-20T06-04-41.878Z-preview.jpg', 'Analyc', 1, 'https://github.com/abc/analyc', '2020-09-20 06:04:42', '2020-09-20 06:04:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `recruiter`
--

CREATE TABLE `recruiter` (
  `recruiter_id` int(11) NOT NULL,
  `recruiter_name` varchar(200) NOT NULL,
  `recruiter_email` varchar(200) NOT NULL,
  `recruiter_company` varchar(200) NOT NULL,
  `recruiter_field` varchar(150) DEFAULT NULL,
  `recruiter_position` varchar(100) NOT NULL,
  `recruiter_phone` varchar(15) NOT NULL,
  `recruiter_password` varchar(200) NOT NULL,
  `recruiter_profile_image` varchar(200) DEFAULT NULL,
  `recruiter_background_image` varchar(200) DEFAULT NULL,
  `recruiter_location` varchar(100) DEFAULT NULL,
  `recruiter_about` text,
  `recruiter_instagram` varchar(100) DEFAULT NULL,
  `recruiter_linkedin` varchar(150) DEFAULT NULL,
  `role` int(11) NOT NULL DEFAULT '1',
  `recruiter_key` varchar(15) DEFAULT NULL,
  `recruiter_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recruiter_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `recruiter`
--

INSERT INTO `recruiter` (`recruiter_id`, `recruiter_name`, `recruiter_email`, `recruiter_company`, `recruiter_field`, `recruiter_position`, `recruiter_phone`, `recruiter_password`, `recruiter_profile_image`, `recruiter_background_image`, `recruiter_location`, `recruiter_about`, `recruiter_instagram`, `recruiter_linkedin`, `role`, `recruiter_key`, `recruiter_created_at`, `recruiter_updated_at`) VALUES
(1, 'John Doe', 'official@sejahtera.com', 'PT Sejahtera', 'Finance', 'Talent Hiring', '081231231321', '$2b$10$4tEPAzYga/iGgI6FoYIdnu/./Na6swV1QVNOo17EzPx4hGVIbyeyK', '2020-09-18T03-47-57.595Z-web-service-1.jpg', NULL, 'Bandung, Jawa Barat', 'Lorem, ipsum dolor sit amet consectetur adipisicing, elit. Molestiae laudantium culpa quo consequuntur debitis vitae facilis nisi saepe in minima voluptate cumque id quod eaque, accusamus minus maiores? Sit, doloremque!', '@official_sejahtera', 'linkedin.com/sejahtera', 1, NULL, '2020-09-18 04:38:03', '2020-09-18 04:38:03'),
(3, 'Jenny', 'official@sejahtera2.com', 'PT Sejahtera2', 'Finance', 'HRD', '081231278218', '$2b$10$Byx6pvjqWLnDPCmra5z8lOePvT.xb1/SPy80Xk4fJwFs2A5Oyfu62', '2020-09-18T04-33-09.381Z-362-3623383_why-small-businesses-need-to-switch-to-responsive.png', NULL, 'Bandung, Jawa Barat', 'Lorem, ipsum dolor sit amet consectetur adipisicing, elit. Molestiae laudantium culpa quo consequuntur debitis vitae facilis nisi saepe in minima voluptate cumque id quod eaque, accusamus minus maiores? Sit, doloremque!', '@official_sejahtera', 'linkedin.com/sejahtera', 1, NULL, '2020-09-18 04:38:03', '2020-09-19 12:23:01'),
(4, 'Nur Hidayat', 'official@micrososft.com', 'Microsoft Inc', 'Software House', 'HRD', '081231278218', '$2b$10$ZkmpPbgrlwHRXsDj42kY4OxTE/qmYsnAWxPUaRwmqOn3TbcTsVqHi', '2020-09-18T05-04-01.198Z-362-3623383_why-small-businesses-need-to-switch-to-responsive.png', NULL, 'California, US', 'Lorem, ipsum dolor sit amet consectetur adipisicing, elit. Molestiae laudantium culpa quo consequuntur debitis vitae facilis nisi saepe in minima voluptate cumque id quod eaque, accusamus minus maiores? Sit, doloremque!', '@microsoft.net', 'linkedin.com/microsoft', 1, NULL, '2020-09-18 04:40:22', '2020-09-18 05:04:01'),
(5, 'Jenny Doe', 'dayaters22@gmail.com', 'Microsoft inc', NULL, 'HRD', '081356713178', '$2b$10$XnI0zZOprlkad5ydpz5t8uwHSwBUC2yH/Yaw0JJd.thI4KnLTqBDm', NULL, NULL, NULL, NULL, NULL, NULL, 1, '40050', '2020-09-19 05:13:52', '2020-09-19 18:15:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roomchat`
--

CREATE TABLE `roomchat` (
  `id` int(11) NOT NULL,
  `room_id` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recruiter_id` int(11) NOT NULL,
  `room_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `roomchat`
--

INSERT INTO `roomchat` (`id`, `room_id`, `user_id`, `recruiter_id`, `room_created_at`) VALUES
(1, '1600517829387', 2, 5, '2020-09-19 12:15:29'),
(2, '1600517840703', 2, 3, '2020-09-19 12:16:25'),
(3, '1600519057490', 2, 4, '2020-09-19 12:37:14'),
(4, '1600520786511', 9, 4, '2020-09-19 13:05:30'),
(5, '1600526490630', 5, 4, '2020-09-19 14:40:59'),
(6, '1600571662758', 7, 4, '2020-09-20 03:13:29'),
(7, '1600579488910', 7, 1, '2020-09-20 05:23:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `skill`
--

CREATE TABLE `skill` (
  `skill_id` int(11) NOT NULL,
  `skill_name` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `skill_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `skill_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `skill`
--

INSERT INTO `skill` (`skill_id`, `skill_name`, `user_id`, `skill_created_at`, `skill_updated_at`) VALUES
(1, 'HTML', 1, '2020-09-17 07:03:34', '2020-09-17 07:03:34'),
(2, 'Vue JS', 1, '2020-09-17 07:03:34', '2020-09-17 07:03:34'),
(3, 'Vue JS', 9, '2020-09-18 14:45:40', '2020-09-18 14:45:40'),
(5, 'Express JS', 9, '2020-09-18 14:53:21', '2020-09-18 14:53:21'),
(6, 'React JS', 9, '2020-09-18 14:53:34', '2020-09-18 14:53:34'),
(7, 'React JS', 2, '2020-09-18 14:53:48', '2020-09-18 14:53:48'),
(8, 'Angular', 2, '2020-09-18 14:55:34', '2020-09-18 14:55:34'),
(9, 'React Native', 2, '2020-09-18 14:55:44', '2020-09-18 14:55:44'),
(10, 'React Native', 3, '2020-09-18 14:55:49', '2020-09-18 14:55:49'),
(11, 'Phyton', 3, '2020-09-18 14:55:55', '2020-09-18 14:55:55'),
(12, 'Phyton', 4, '2020-09-18 14:56:33', '2020-09-18 14:56:33'),
(13, 'PHP', 4, '2020-09-18 14:56:50', '2020-09-18 14:56:50'),
(14, 'CodeIgniter', 4, '2020-09-18 14:56:58', '2020-09-18 14:56:58'),
(15, 'JQuery', 4, '2020-09-18 14:57:13', '2020-09-18 14:57:13'),
(16, 'JQuery', 5, '2020-09-18 14:57:17', '2020-09-18 14:57:17'),
(17, 'React JS', 5, '2020-09-18 14:57:26', '2020-09-18 14:57:26'),
(18, 'Express JS', 5, '2020-09-18 14:57:31', '2020-09-18 14:57:31'),
(19, 'Express JS', 6, '2020-09-18 14:57:35', '2020-09-18 14:57:35'),
(20, 'Phyton', 6, '2020-09-18 14:57:42', '2020-09-18 14:57:42'),
(21, 'Vue JS', 6, '2020-09-18 14:57:52', '2020-09-18 14:57:52'),
(22, 'Laravel', 6, '2020-09-18 14:58:26', '2020-09-18 14:58:26'),
(24, 'Git', 6, '2020-09-18 14:58:51', '2020-09-18 14:58:51'),
(25, 'Git', 7, '2020-09-18 14:58:55', '2020-09-18 14:58:55'),
(26, 'Laravel', 7, '2020-09-18 14:58:59', '2020-09-18 14:58:59'),
(27, 'PHP', 7, '2020-09-18 14:59:15', '2020-09-18 14:59:15'),
(28, 'PHP', 8, '2020-09-18 14:59:22', '2020-09-18 14:59:22'),
(29, 'Angular', 8, '2020-09-18 14:59:29', '2020-09-18 14:59:29'),
(30, 'HTML5', 8, '2020-09-18 14:59:34', '2020-09-18 14:59:34'),
(31, 'CSS', 8, '2020-09-18 14:59:38', '2020-09-18 14:59:38'),
(32, 'CSS', 10, '2020-09-18 14:59:42', '2020-09-18 14:59:42'),
(33, 'Bootstrap', 10, '2020-09-18 14:59:57', '2020-09-18 14:59:57'),
(34, 'React JS', 10, '2020-09-18 15:00:04', '2020-09-18 15:00:04'),
(36, 'Premiere Pro', 10, '2020-09-18 15:11:40', '2020-09-18 15:11:40'),
(38, 'After Effect', 10, '2020-09-18 15:14:10', '2020-09-18 15:14:10'),
(40, 'Phyton', 10, '2020-09-18 15:24:08', '2020-09-18 15:24:08'),
(41, 'HTML5', 10, '2020-09-18 15:31:37', '2020-09-18 15:31:37'),
(42, 'HTML5', 1, '2020-09-18 15:31:57', '2020-09-18 15:31:57'),
(43, 'Vue JSv2', 1, '2020-09-18 15:32:41', '2020-09-18 15:32:41'),
(44, 'Ruby', 1, '2020-09-18 15:39:10', '2020-09-18 15:39:10'),
(45, 'After Effect', 1, '2020-09-19 08:25:14', '2020-09-19 08:25:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tes`
--

CREATE TABLE `tes` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '2',
  `user_skill` varchar(100) DEFAULT NULL,
  `user_phone` varchar(15) DEFAULT NULL,
  `user_job_desk` varchar(50) DEFAULT NULL,
  `user_job_type` enum('freelance','fulltime') NOT NULL DEFAULT 'freelance',
  `user_location` varchar(255) DEFAULT NULL,
  `user_workplace` varchar(200) NOT NULL,
  `user_image` varchar(100) DEFAULT NULL,
  `user_key` varchar(15) DEFAULT NULL,
  `user_instagram` varchar(100) DEFAULT NULL,
  `user_github` varchar(100) DEFAULT NULL,
  `user_about` text,
  `user_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `role`, `user_skill`, `user_phone`, `user_job_desk`, `user_job_type`, `user_location`, `user_workplace`, `user_image`, `user_key`, `user_instagram`, `user_github`, `user_about`, `user_created_at`, `user_updated_at`) VALUES
(1, 'arizalinside@gmail.com', '$2b$10$8Ei9ZMPuo14pncRRiV45yOxjhrNwSICFZk2d306LDg6b7IX2rwfxq', 'Arizal', 2, '', '91281981', 'Devops Engineer', 'fulltime', 'Surabaya, Indonesia', '-', '2020-09-20T06-52-22.268Z-John.jpg', '', '@Arizal', 'github.com/Arizall', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-15 12:57:19', '2020-09-20 06:52:22'),
(2, 'worker@gmail.com', '$2b$10$drS6jmzMOYqKN19cIIgk8u8pvte1G.w.DwLWQJkj3enRwiVMUofPW', 'Bil Gates', 2, '', '012345678', 'Software Enginer', 'freelance', 'California, US', '-', '2020-09-20T06-41-23.508Z-Bill-Gates.jpeg', '', '@BilGates', 'github.com/BilGates', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-15 13:06:06', '2020-09-20 06:41:23'),
(3, 'workerers@gmail.com', '$2b$10$O9xDNVrhuxpWmAgAaFmlw.6RoGeluV.Yu/m0S2Ur3OMywA76ixOLm', 'Beet Cook', 2, '', '012345678', 'Software Enginer', 'freelance', 'Tokyo, Japan', '-', '2020-09-20T06-42-53.149Z-Brett Cook.jpg', '', '@BeetCook', 'github.com/Beet Cook', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-16 07:59:32', '2020-09-20 06:42:53'),
(4, 'rizale@gmail.com', '$2b$10$VmEOLOuOtEEPBJmG6UNHa.Cn5RX7rU/GPjzZt3AoWtJvmiiF6kpgq', 'Belval', 2, '', '012345678', 'Software Enginer', 'freelance', 'California, US', '-', '2020-09-20T06-43-34.131Z-Belval.png', '', '@Belval', 'github.com/Belval', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-16 08:00:21', '2020-09-20 06:43:34'),
(5, 'abc@gmail.com', '$2b$10$v7osdvkJK7sJvE0wXWTk.uMwa06VSJq3l9MdRHxX3hYiIhCTrvS8q', 'Caroline Braga', 2, '', '91281981', 'Software Engineer', 'freelance', 'Ottawa, Canada', '-', '2020-09-20T06-44-38.607Z-Caroline Braga.jpg', '', '@Caroline_Braga', 'github.com/CarolineBraga', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-16 08:01:35', '2020-09-20 06:44:38'),
(6, 'arizalinc@gmail.com', '$2b$10$f6mCW3XhgfSOOrt0pW7FtekaFUG.ab8Al2tznUZspnEnDoIRqML2S', 'Cornor McGregor', 2, '', '91281981', 'Backend Developer', 'freelance', 'Madrid, Spain', '-', '2020-09-20T06-46-20.920Z-Conor McGrogor.jpg', '', '@McGregor', 'github.com/McGregor', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-16 13:28:38', '2020-09-20 06:46:20'),
(7, 'arizalaja@gmail.com', '$2b$10$Tx5g9rl8CEAmC8RJ4lIEbuve32ORLZC4vqHORBfJ6cktVsqKp3Cx2', 'Jennifer Bourne', 2, NULL, '91281981', 'Fontend Developer', 'freelance', 'London, England', '-', '2020-09-20T06-47-37.199Z-Jennifer Bourne.jpg', NULL, '@JenniferBourne', 'github.com/JenniferBourne', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-16 15:17:53', '2020-09-20 06:47:37'),
(8, 'arizalaje@gmail.com', '$2b$10$lw4.ktJm42olnJnbNox22ewE7SyTw8sTSBnHt6rht3kIienamLaIa', 'Tony West', 2, NULL, '91281981', 'Fontend Developer', 'freelance', 'London, England', '-', '2020-09-20T06-49-04.269Z-Tony West.jpg', NULL, '@Tony_West', 'github.com/Tony-West', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-16 15:22:32', '2020-09-20 06:49:04'),
(9, 'dayaters22@gmail.com', '$2b$10$uS0AAPTK4W5w.oRgZ5W2M.F1xcEIcsIdC3Llt7V0zzOifXpRtDhGG', 'Nur Hidayat', 2, NULL, '081356713178', 'Fullstack Web Developer', 'fulltime', 'Makassar, Sulawesi Selatan', '', '2020-09-18T15-03-35.189Z-pas.jpg', NULL, '@m_nurhiday', 'github.com/NHidayat', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-18 10:41:18', '2020-09-19 18:28:02'),
(10, 'jenifer@gmail.com', '$2b$10$tf5ocQaxr4RfQ5YItOqrh.lw3UGD6vxT52ltAjrzAJKsvBXbuOOkm', 'Selena Gomez', 2, NULL, '91281981', 'Devops Engineer', 'freelance', 'Jakarta, Indonesia', '-', '2020-09-20T06-50-44.547Z-selena gomes.jpg', NULL, '@Selena-Gomez', 'github.com/Selena-Gomez', 'Lorem, ipsum dolor sit amet consectetur adipisicin...', '2020-09-18 12:43:03', '2020-09-20 06:50:44');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`experience_id`);

--
-- Indeks untuk tabel `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`);

--
-- Indeks untuk tabel `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notif_id`);

--
-- Indeks untuk tabel `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`portofolio_id`);

--
-- Indeks untuk tabel `recruiter`
--
ALTER TABLE `recruiter`
  ADD PRIMARY KEY (`recruiter_id`);

--
-- Indeks untuk tabel `roomchat`
--
ALTER TABLE `roomchat`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`skill_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `experience`
--
ALTER TABLE `experience`
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `notification`
--
ALTER TABLE `notification`
  MODIFY `notif_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `portofolio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `recruiter`
--
ALTER TABLE `recruiter`
  MODIFY `recruiter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `roomchat`
--
ALTER TABLE `roomchat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `skill`
--
ALTER TABLE `skill`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
