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
-- Database: `sos_emergency`
--

-- --------------------------------------------------------

--
-- Table structure for table `emergency_contacts`
--

CREATE TABLE `emergency_contacts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `relation` varchar(100) DEFAULT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emergency_contacts`
--

INSERT INTO `emergency_contacts` (`id`, `user_id`, `name`, `relation`, `phone`) VALUES
(1, 1, 'Maria Dela Cruz', 'Mother', '09181234567');

-- --------------------------------------------------------

--
-- Table structure for table `emergency_locations`
--

CREATE TABLE `emergency_locations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `emergency_number` varchar(20) DEFAULT NULL,
  `category` enum('Hospital','Police','Fire','Evacuation') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emergency_locations`
--

INSERT INTO `emergency_locations` (`id`, `name`, `latitude`, `longitude`, `emergency_number`, `category`) VALUES
(1, 'Balingasag District Hospital', 8.74420000, 124.78830000, '123', 'Hospital'),
(2, 'Balingasag Police Station', 8.74200000, 124.78750000, '911', 'Police');

-- --------------------------------------------------------

--
-- Table structure for table `sos_events`
--

CREATE TABLE `sos_events` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `triggered_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `status` enum('Active','Resolved') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sos_events`
--

INSERT INTO `sos_events` (`id`, `user_id`, `triggered_at`, `latitude`, `longitude`, `status`) VALUES
(1, 1, '2025-04-14 23:01:56', 8.74350000, 124.78900000, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `sos_logs`
--

CREATE TABLE `sos_logs` (
  `id` int(11) NOT NULL,
  `sos_event_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sos_logs`
--

INSERT INTO `sos_logs` (`id`, `sos_event_id`, `message`, `created_at`) VALUES
(1, 1, 'User triggered emergency alert via app.', '2025-04-14 23:01:56');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `phone`, `password`, `dob`, `profile_image`, `created_at`) VALUES
(1, 'Juan Dela Cruz', '09171234567', 'hashed_password_here', '2000-01-01', NULL, '2025-04-14 23:01:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emergency_contacts`
--
ALTER TABLE `emergency_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `emergency_locations`
--
ALTER TABLE `emergency_locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sos_events`
--
ALTER TABLE `sos_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sos_logs`
--
ALTER TABLE `sos_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sos_event_id` (`sos_event_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emergency_contacts`
--
ALTER TABLE `emergency_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `emergency_locations`
--
ALTER TABLE `emergency_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sos_events`
--
ALTER TABLE `sos_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sos_logs`
--
ALTER TABLE `sos_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emergency_contacts`
--
ALTER TABLE `emergency_contacts`
  ADD CONSTRAINT `emergency_contacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sos_events`
--
ALTER TABLE `sos_events`
  ADD CONSTRAINT `sos_events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sos_logs`
--
ALTER TABLE `sos_logs`
  ADD CONSTRAINT `sos_logs_ibfk_1` FOREIGN KEY (`sos_event_id`) REFERENCES `sos_events` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
