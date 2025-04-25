-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2025 at 03:22 AM
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
(1, 2, '08:00:00', '12:00:00', '13:00:00', '17:00:00', 'present', 'late', '2025-04-23', '2025-04-23 07:28:27', '2025-04-24 09:24:14'),
(2, 3, '09:00:00', '12:00:00', '13:00:00', '17:00:00', 'late', 'present', '2025-04-24', '2025-04-23 07:28:27', '2025-04-24 08:08:56'),
(3, 2, '08:30:00', '12:00:00', '13:00:00', '17:00:00', 'present', 'late', '2025-04-24', '2025-04-24 09:16:36', '2025-04-24 09:23:43');

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
(1, 2, '2025-04-08 11:29:39'),
(15, 2, '2025-04-08 14:50:28'),
(16, 2, '2025-04-08 15:00:27'),
(17, 2, '2025-04-09 04:57:18'),
(18, 2, '2025-04-09 06:46:09'),
(19, 2, '2025-04-09 06:49:48'),
(20, 2, '2025-04-09 07:02:23'),
(21, 2, '2025-04-09 07:14:52'),
(22, 2, '2025-04-09 07:22:11'),
(23, 2, '2025-04-09 07:23:21'),
(24, 2, '2025-04-09 07:37:41'),
(25, 2, '2025-04-09 07:49:16'),
(26, 2, '2025-04-09 08:00:12'),
(27, 2, '2025-04-09 08:06:00'),
(28, 2, '2025-04-09 08:16:56'),
(29, 2, '2025-04-09 08:19:03'),
(30, 2, '2025-04-09 08:29:27'),
(31, 3, '2025-04-09 08:37:11'),
(32, 3, '2025-04-09 09:32:55'),
(33, 3, '2025-04-09 09:43:45'),
(34, 4, '2025-04-09 10:19:25'),
(35, 4, '2025-04-09 10:36:46'),
(36, 4, '2025-04-09 10:38:28'),
(37, 4, '2025-04-09 10:38:43'),
(38, 2, '2025-04-09 11:32:22'),
(39, 3, '2025-04-09 11:32:52'),
(40, 4, '2025-04-09 11:37:20'),
(41, 4, '2025-04-09 11:54:00'),
(42, 2, '2025-04-09 12:08:14'),
(43, 3, '2025-04-09 12:10:22'),
(44, 4, '2025-04-09 12:11:24'),
(45, 3, '2025-04-09 15:12:18'),
(46, 2, '2025-04-21 17:53:30'),
(47, 2, '2025-04-21 17:54:26'),
(48, 3, '2025-04-21 17:54:55'),
(49, 4, '2025-04-21 17:57:04'),
(50, 2, '2025-04-24 06:16:38'),
(51, 2, '2025-04-24 06:32:35'),
(52, 2, '2025-04-24 06:37:08'),
(53, 2, '2025-04-24 06:50:48'),
(54, 2, '2025-04-24 07:02:19'),
(55, 2, '2025-04-24 07:12:43'),
(56, 2, '2025-04-24 07:26:10'),
(57, 2, '2025-04-24 07:38:20'),
(58, 2, '2025-04-24 07:49:57'),
(59, 2, '2025-04-24 08:07:47'),
(60, 2, '2025-04-24 08:24:26'),
(61, 2, '2025-04-24 08:34:47'),
(62, 2, '2025-04-24 08:46:25'),
(63, 2, '2025-04-24 08:59:18'),
(64, 2, '2025-04-24 09:09:35'),
(65, 2, '2025-04-24 09:23:59'),
(67, 6, '2025-04-24 09:30:33'),
(68, 2, '2025-04-24 09:40:57'),
(69, 6, '2025-04-24 09:41:10'),
(70, 6, '2025-04-24 09:57:38'),
(71, 6, '2025-04-24 10:13:04'),
(72, 6, '2025-04-24 10:32:22'),
(73, 6, '2025-04-24 11:10:58'),
(74, 2, '2025-04-24 11:16:32'),
(75, 6, '2025-04-24 13:22:49'),
(76, 2, '2025-04-24 13:31:20'),
(77, 2, '2025-04-24 15:27:21');

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
(3, '', 'Admin@gmail.com', '$2b$10$.1x8Ub9ZA86R27rpC5kzIuCW9hKzGc/2cho66z75yW8MYsDiSSsq6', 'admin', '2025-04-09 08:33:18', 'Admin', 'Admin', 0),
(4, '', 'Coordinator@gmail.com', '$2b$10$hnsOtgi86XHMob8a6GI/DuebXdiasYWaH48XSSv3mpG4zAXCJ/b2O', 'coordinator', '2025-04-09 10:03:14', 'Coordinator', 'Coordinator', 0),
(6, 'c21', 'nasefaquiatan@gmail.com', '$2b$10$LpXqtcQVLK5Y.kSBQZcej.xoDT5xHMCKbhfnnDWSM4doyF3nPaZR6', 'student', '2025-04-24 09:30:20', 'nazef hawk', 'Lague', 0);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

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
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `ojt_assignments`
--
ALTER TABLE `ojt_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `login_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ojt_assignments`
--
ALTER TABLE `ojt_assignments`
  ADD CONSTRAINT `ojt_assignments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ojt_assignments_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
