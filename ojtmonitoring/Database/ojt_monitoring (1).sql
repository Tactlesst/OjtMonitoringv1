-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2025 at 06:51 PM
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
(45, 3, '2025-04-09 15:12:18');

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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
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

INSERT INTO `users` (`id`, `email`, `password`, `role`, `created_at`, `first_name`, `last_name`, `disabled`) VALUES
(2, 'user@gmail.com', '$2b$10$1hYEbCvFtT8OL8zj1SNUa.SF0zPmmybFHEPn59maqm5U2/CilB7ZG', 'student', '2025-04-08 10:54:53', 'user', 'user', 0),
(3, 'Admin@gmail.com', '$2b$10$.1x8Ub9ZA86R27rpC5kzIuCW9hKzGc/2cho66z75yW8MYsDiSSsq6', 'admin', '2025-04-09 08:33:18', 'Admin', 'Admin', 0),
(4, 'Coordinator@gmail.com', '$2b$10$hnsOtgi86XHMob8a6GI/DuebXdiasYWaH48XSSv3mpG4zAXCJ/b2O', 'coordinator', '2025-04-09 10:03:14', 'Coordinator', 'Coordinator', 0);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `daily_logs`
--
ALTER TABLE `daily_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `evaluations`
--
ALTER TABLE `evaluations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `ojt_assignments`
--
ALTER TABLE `ojt_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
