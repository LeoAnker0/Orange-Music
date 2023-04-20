-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 21, 2023 at 02:05 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

CREATE DATABASE music_streaming;
USE music_streaming;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music_streaming`
--

-- --------------------------------------------------------

--
-- Table structure for table `albumEPsong_table`
--

CREATE TABLE `albumEPsong_table` (
  `albumName` varchar(255) NOT NULL,
  `albumEPsingleID` varchar(255) NOT NULL,
  `artistName` varchar(255) NOT NULL,
  `artistID` varchar(255) NOT NULL,
  `albumImageLocation` varchar(255) NOT NULL,
  `dateCreated` varchar(255) NOT NULL,
  `songsJson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `albumEPsong_description` text DEFAULT NULL,
  `libraryIndex` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `albumEPsong_table`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--


-- --------------------------------------------------------

--
-- Table structure for table `Library`
--

CREATE TABLE `Library` (
  `albumEPsongID` varchar(255) NOT NULL,
  `user_added` varchar(255) NOT NULL,
  `date_added` varchar(255) NOT NULL,
  `libraryIndex` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Library`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `unique_user_id` varchar(255) NOT NULL,
  `user_username` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_picture_location` varchar(255) NOT NULL DEFAULT './pictures/def.jpg',
  `user_email` varchar(255) NOT NULL,
  `user_description` text NOT NULL,
  `date_joined` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_table`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albumEPsong_table`
--
ALTER TABLE `albumEPsong_table`
  ADD PRIMARY KEY (`libraryIndex`),
  ADD UNIQUE KEY `albumEPsingleID` (`albumEPsingleID`);

--
-- Indexes for table `Library`
--
ALTER TABLE `Library`
  ADD PRIMARY KEY (`libraryIndex`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD UNIQUE KEY `unique_user_id` (`unique_user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albumEPsong_table`
--
ALTER TABLE `albumEPsong_table`
  MODIFY `libraryIndex` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `Library`
--
ALTER TABLE `Library`
  MODIFY `libraryIndex` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1376;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
