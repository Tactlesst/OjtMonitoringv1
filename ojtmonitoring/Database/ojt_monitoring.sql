-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2025 at 07:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ojt_monitoring`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `details` text DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `archives`
--

CREATE TABLE `archives` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `dateArchived` date NOT NULL,
  `archivedBy` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `archives`
--

INSERT INTO `archives` (`id`, `title`, `category`, `year`, `dateArchived`, `archivedBy`) VALUES
(2, 'BSc Criminal Justice Research Paper', 'Criminal Justice', 2022, '2022-06-15', 'Jane Smith'),
(3, 'BSc Criminal Justice Internship Report', 'Criminal Justice', 2021, '2021-07-20', 'Michael Johnson'),
(11, 'Year 2024 - 2026', 'CRIminal Justice', 2025, '2025-05-03', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `checkin_morning` time DEFAULT NULL,
  `checkout_morning` time DEFAULT NULL,
  `checkin_afternoon` time DEFAULT NULL,
  `checkout_afternoon` time DEFAULT NULL,
  `status_morning` enum('present','absent','late') DEFAULT 'present',
  `status_afternoon` enum('present','absent','late') DEFAULT 'present',
  `date` date DEFAULT curdate(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_id`, `checkin_morning`, `checkout_morning`, `checkin_afternoon`, `checkout_afternoon`, `status_morning`, `status_afternoon`, `date`, `created_at`, `updated_at`) VALUES
(9, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-27', '2025-04-27 05:37:31', '2025-04-27 05:37:31'),
(10, 3, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-27', '2025-04-27 05:37:31', '2025-04-27 05:37:31'),
(11, 4, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-27', '2025-04-27 05:37:31', '2025-04-27 05:37:31'),
(17, 6, NULL, NULL, '15:07:49', '16:15:52', NULL, 'late', '2025-04-27', '2025-04-27 07:07:49', '2025-04-27 08:15:52'),
(18, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-28', '2025-04-27 17:22:00', '2025-04-27 17:22:00'),
(19, 4, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-28', '2025-04-27 17:22:00', '2025-04-27 17:22:00'),
(20, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-28', '2025-04-27 17:22:00', '2025-04-27 17:22:00'),
(21, 3, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-28', '2025-04-27 17:22:00', '2025-04-27 17:22:00'),
(22, 2, NULL, NULL, NULL, '23:08:00', NULL, 'present', '2025-05-02', '2025-05-02 02:46:35', '2025-05-02 15:08:00'),
(23, 3, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-02', '2025-05-02 02:46:35', '2025-05-02 02:46:35'),
(24, 4, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-02', '2025-05-02 02:46:35', '2025-05-02 02:46:35'),
(26, 6, NULL, '11:53:26', NULL, '16:35:33', 'present', 'present', '2025-05-02', '2025-05-02 03:39:39', '2025-05-02 08:35:33'),
(27, 7, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-02', '2025-05-02 14:48:02', '2025-05-02 14:48:02'),
(28, 9, NULL, NULL, NULL, '22:48:08', NULL, 'present', '2025-05-02', '2025-05-02 14:48:02', '2025-05-02 14:48:08'),
(29, 8, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-02', '2025-05-02 14:48:02', '2025-05-02 14:48:02'),
(30, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-03', '2025-05-03 00:38:08', '2025-05-03 00:38:08'),
(31, 7, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-03', '2025-05-03 00:38:08', '2025-05-03 00:38:08'),
(32, 3, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-03', '2025-05-03 00:38:08', '2025-05-03 00:38:08'),
(33, 4, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-03', '2025-05-03 00:38:08', '2025-05-03 00:38:08'),
(35, 8, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-03', '2025-05-03 00:38:08', '2025-05-03 00:38:08'),
(36, 9, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-03', '2025-05-03 00:38:08', '2025-05-03 00:38:08'),
(44, 6, '09:06:38', NULL, NULL, NULL, 'present', NULL, '2025-05-03', '2025-05-03 01:06:33', '2025-05-03 01:06:38'),
(45, 11, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-03', '2025-05-03 05:10:51', '2025-05-03 05:10:51'),
(46, 10, NULL, NULL, '13:11:01', NULL, NULL, 'present', '2025-05-03', '2025-05-03 05:10:51', '2025-05-03 05:11:01');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `contact_number` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `daily_logs`
--

CREATE TABLE `daily_logs` (
  `id` int(11) NOT NULL,
  `assignment_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time_in` time DEFAULT NULL,
  `time_out` time DEFAULT NULL,
  `tasks` text DEFAULT NULL,
  `remarks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `evaluations`
--

CREATE TABLE `evaluations` (
  `id` int(11) NOT NULL,
  `assignment_id` int(11) DEFAULT NULL,
  `evaluator` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `date_evaluated` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

CREATE TABLE `login_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_logs`
--

INSERT INTO `login_logs` (`id`, `user_id`, `login_time`) VALUES
(1, 6, '2025-05-02 04:51:34'),
(2, 6, '2025-05-02 05:01:22'),
(3, 6, '2025-05-02 08:35:00'),
(4, 3, '2025-05-02 09:16:10'),
(5, 3, '2025-05-02 09:29:38'),
(6, 3, '2025-05-02 09:43:06'),
(7, 3, '2025-05-02 09:44:49'),
(8, 3, '2025-05-02 09:55:33'),
(9, 3, '2025-05-02 10:22:30'),
(10, 3, '2025-05-02 12:41:40'),
(11, 3, '2025-05-02 12:52:56'),
(12, 4, '2025-05-02 13:09:26'),
(13, 3, '2025-05-02 13:09:39'),
(14, 3, '2025-05-02 13:21:16'),
(15, 3, '2025-05-02 13:35:43'),
(16, 3, '2025-05-02 13:43:02'),
(17, 3, '2025-05-02 13:46:26'),
(18, 3, '2025-05-02 13:47:43'),
(19, 3, '2025-05-02 13:49:31'),
(20, 3, '2025-05-02 14:01:04'),
(21, 3, '2025-05-02 14:06:13'),
(22, 3, '2025-05-02 14:11:18'),
(23, 8, '2025-05-02 14:11:43'),
(24, 3, '2025-05-02 14:14:27'),
(25, 3, '2025-05-02 14:26:00'),
(26, 3, '2025-05-02 14:40:25'),
(27, 9, '2025-05-02 14:47:43'),
(28, 3, '2025-05-02 14:51:24'),
(29, 3, '2025-05-02 14:52:02'),
(30, 3, '2025-05-02 14:52:47'),
(31, 2, '2025-05-02 15:05:25'),
(32, 3, '2025-05-02 15:46:43'),
(33, 3, '2025-05-02 15:56:20'),
(34, 3, '2025-05-02 15:57:01'),
(35, 3, '2025-05-02 15:59:51'),
(36, 6, '2025-05-03 00:38:22'),
(37, 6, '2025-05-03 00:44:35'),
(38, 6, '2025-05-03 00:55:16'),
(39, 6, '2025-05-03 01:07:11'),
(40, 3, '2025-05-03 01:08:11'),
(41, 3, '2025-05-03 01:11:15'),
(42, 3, '2025-05-03 01:42:36'),
(43, 3, '2025-05-03 01:55:23'),
(44, 3, '2025-05-03 02:05:40'),
(45, 3, '2025-05-03 02:15:49'),
(46, 3, '2025-05-03 02:26:21'),
(47, 3, '2025-05-03 02:37:14'),
(48, 3, '2025-05-03 02:47:38'),
(49, 3, '2025-05-03 02:58:22'),
(50, 3, '2025-05-03 03:09:31'),
(51, 3, '2025-05-03 03:22:56'),
(52, 3, '2025-05-03 03:35:25'),
(53, 3, '2025-05-03 03:47:37'),
(54, 4, '2025-05-03 03:56:30'),
(55, 3, '2025-05-03 04:53:34'),
(56, 3, '2025-05-03 05:04:12'),
(57, 10, '2025-05-03 05:08:31'),
(58, 3, '2025-05-03 05:12:05');

-- --------------------------------------------------------

--
-- Table structure for table `ojt_assignments`
--

CREATE TABLE `ojt_assignments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `hours_required` int(11) DEFAULT NULL,
  `status` enum('pending','ongoing','completed') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `address`, `contact_email`, `contact_phone`, `created_at`) VALUES
(1, 'National Police Headquarters', '123 Law Enforcement Ave, Capital City', 'contact@nph.gov', '09171234567', '2025-05-03 01:55:12'),
(2, 'Forensic Science Division', '45 Evidence Blvd, Metro Town', 'lab@fsd.gov.ph', '09281234567', '2025-05-03 01:55:12'),
(3, 'Criminal Investigation Bureau', '78 Detectives St, Crime City', 'info@cib.gov.ph', '09391234567', '2025-05-03 01:55:12'),
(4, 'Victim Support Center', '9 Harmony Lane, Safe City', 'support@vsc.ph', '09491234567', '2025-05-03 01:55:12'),
(5, 'Cybercrime Division', '101 Cyber Ave, Techno City', 'cyber@ccd.ph', '09591234567', '2025-05-03 01:55:12'),
(6, 'Anti-Narcotics Task Force', '33 Clean Streets, Metro Zone', 'tips@antf.gov.ph', '09691234567', '2025-05-03 01:55:12');

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `hours_completed` decimal(5,2) DEFAULT 0.00,
  `task_completed` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_organization_assignments`
--

CREATE TABLE `student_organization_assignments` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_organization_assignments`
--

INSERT INTO `student_organization_assignments` (`id`, `student_id`, `organization_id`, `assigned_at`) VALUES
(9, 2, 1, '2025-05-03 02:49:51'),
(11, 2, 1, '2025-05-03 02:50:02'),
(12, 6, 2, '2025-05-03 03:02:25'),
(13, 6, 3, '2025-05-03 03:02:31'),
(14, 9, 6, '2025-05-03 03:43:10'),
(15, 10, 1, '2025-05-03 03:43:15');

-- --------------------------------------------------------

--
-- Table structure for table `student_progress`
--

CREATE TABLE `student_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `completed_hours` int(11) DEFAULT 0,
  `total_hours` int(11) DEFAULT 600,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `student_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','admin','coordinator') DEFAULT 'student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `student_id`, `email`, `password`, `role`, `created_at`, `first_name`, `last_name`, `disabled`) VALUES
(2, 'c11', 'user@gmail.com', '$2b$10$1hYEbCvFtT8OL8zj1SNUa.SF0zPmmybFHEPn59maqm5U2/CilB7ZG', 'student', '2025-04-08 10:54:53', 'user', 'user', 0),
(3, '', 'Admin@gmail.com', '$2b$10$.1x8Ub9ZA86R27rpC5kzIuCW9hKzGc/2cho66z75yW8MYsDiSSsq6', 'admin', '2025-04-09 08:33:18', 'School', 'Admin', 0),
(4, '', 'Coordinator@gmail.com', '$2b$10$hnsOtgi86XHMob8a6GI/DuebXdiasYWaH48XSSv3mpG4zAXCJ/b2O', 'coordinator', '2025-04-09 10:03:14', 'Coordinator', 'Coordinator', 0),
(6, 'c21', 'nasefaquiatan@gmail.com', '$2b$10$LpXqtcQVLK5Y.kSBQZcej.xoDT5xHMCKbhfnnDWSM4doyF3nPaZR6', 'student', '2025-04-24 09:30:20', 'nazef hawk', 'Lague', 0),
(7, '', 'boncas@gmail.com', '$2b$10$9dVNpdaOEMeU/k8A7/2vSOvlJdVm8NNLA4pzJm5QOPPjozUhhrESy', 'coordinator', '2025-05-02 13:22:22', 'boncas', 'boncas', 0),
(8, '', 'Coordinator@yahoo.com', '$2b$10$sJUvDndf3J7YgmVBIrmaIu7Vbgb5I0PSzSRcECo7Nif/wQmzsVO62', 'coordinator', '2025-05-02 13:49:48', 'Coordinator', 'Coordinator', 0),
(9, 'c211', 'Milourence@gmail.com', '$2b$10$UHtoXmZQ3Ci4KK718YJkoeZafyUzdeRSiXn2adC9wGXhEv0zGxpMu', 'student', '2025-05-02 14:46:58', 'Milourence', 'Galendez', 0),
(10, 'c121', 'Randez@gmail.com', '$2b$10$fGxeBSP7vDnWklcgWak1GeCJcCOs8cq//1xupuUbwDnG6AfK0QIlO', 'student', '2025-05-03 03:42:53', 'Juvy', 'Randez', 0),
(11, '', 'Teacher1@gmail.com', '$2b$10$Xrwc7L.vaZ1TvesnzdO3FudxyXh6Zkp67/JrlVWEF4xl/mqaIb3rq', 'coordinator', '2025-05-03 04:54:11', 'Teacher1', 'TeacherLast Name', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `archives`
--
ALTER TABLE `archives`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daily_logs`
--
ALTER TABLE `daily_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignment_id` (`assignment_id`);

--
-- Indexes for table `evaluations`
--
ALTER TABLE `evaluations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignment_id` (`assignment_id`);

--
-- Indexes for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ojt_assignments`
--
ALTER TABLE `ojt_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_organization_assignments`
--
ALTER TABLE `student_organization_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `organization_id` (`organization_id`);

--
-- Indexes for table `student_progress`
--
ALTER TABLE `student_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `organization_id` (`organization_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `archives`
--
ALTER TABLE `archives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `daily_logs`
--
ALTER TABLE `daily_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `evaluations`
--
ALTER TABLE `evaluations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `ojt_assignments`
--
ALTER TABLE `ojt_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_organization_assignments`
--
ALTER TABLE `student_organization_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `student_progress`
--
ALTER TABLE `student_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `daily_logs`
--
ALTER TABLE `daily_logs`
  ADD CONSTRAINT `daily_logs_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `ojt_assignments` (`id`);

--
-- Constraints for table `evaluations`
--
ALTER TABLE `evaluations`
  ADD CONSTRAINT `evaluations_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `ojt_assignments` (`id`);

--
-- Constraints for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD CONSTRAINT `login_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `ojt_assignments`
--
ALTER TABLE `ojt_assignments`
  ADD CONSTRAINT `ojt_assignments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ojt_assignments_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `student_organization_assignments`
--
ALTER TABLE `student_organization_assignments`
  ADD CONSTRAINT `student_organization_assignments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `student_organization_assignments_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`);

--
-- Constraints for table `student_progress`
--
ALTER TABLE `student_progress`
  ADD CONSTRAINT `student_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_progress_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
