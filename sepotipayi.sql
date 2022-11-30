-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 30, 2022 at 09:42 AM
-- Server version: 8.0.31-0ubuntu0.20.04.1
-- PHP Version: 8.0.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sepotipayi`
--
CREATE DATABASE IF NOT EXISTS `sepotipayi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `sepotipayi`;

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `album_id` int NOT NULL,
  `judul` char(64) NOT NULL,
  `penyanyi` char(128) NOT NULL,
  `total_duration` int NOT NULL,
  `image_path` char(255) NOT NULL,
  `tanggal_terbit` date NOT NULL,
  `genre` char(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`album_id`, `judul`, `penyanyi`, `total_duration`, `image_path`, `tanggal_terbit`, `genre`) VALUES
(1, 'LEGEND', 'JANNABI', 6589, './assets/cover/album/legend.jpg', '2022-10-24', 'RnB'),
(2, 'Dunia Batas', 'Payung Teduh', 2097, './assets/cover/album/dunia batas.jpg', '2010-10-10', 'Pop'),
(4, 'Anything You Want', 'Reality Club', 236, './assets/cover/album/anything u want.jpg', '2022-07-24', 'Pop'),
(5, 'Being Funny in a Foreign Language', 'The 1975', 262, './assets/cover/album/1975.jpg', '2021-11-23', 'Pop'),
(6, 'Palette', 'IU', 217, './assets/cover/album/palette iu.jpg', '2018-05-07', 'Kpop'),
(7, 'Bandaids', 'Keshi', 212, './assets/cover/album/bandaids.jpg', '2019-06-15', 'Pop'),
(8, 'Ballads 1', 'Joji', 233, './assets/cover/album/ballads 1.jpg', '2020-03-06', 'Pop'),
(9, 'Between 1&2', 'TWICE', 177, './assets/cover/album/between 1&2.jpg', '2021-12-17', 'Kpop'),
(10, 'NewJeans 1st EP \'NewJeans\'', 'NewJeans', 179, './assets/cover/album/new jeans.jpg', '2022-02-02', 'Kpop');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` char(255) NOT NULL,
  `user_id` int NOT NULL,
  `exp` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `user_id`, `exp`) VALUES
('01dc3016f7298c784bb5b3410f56b28ae60bdcde98dbede598135f3c56f77047', 4, '2022-10-28 07:00:09'),
('0a4e661529e7be339c42356dbc223ce8889baf8440e4a1e16f9d26e60b8cc41f', 1, '2022-10-26 16:15:38'),
('0adad1157d2b2f006e6997686f786dae7a95606b0ad2a7fae978ea5a3ce2c10f', 1, '2022-10-26 16:12:42'),
('1919947221d72847374df1c24720c93c14d3532ef33b32906815e3a8dff9e4c2', 1, '2022-10-27 12:30:36'),
('197a0435fdbfe9d7d799812ed6014dd216dece75c7886f751318edce54e7f55c', 1, '2022-10-27 13:18:12'),
('1ce5169d11456849cc40b610c2ec68678267e5de7b6b053d30c7fef1c0eaba44', 1, '2022-10-28 07:33:23'),
('20ea76be0e00be1d60d6fee1d914aabb8175df5ee8b1b96c46054cbc9a05a6e7', 1, '2022-10-28 01:00:50'),
('25c0773120383ca8f542ef0e336005db9a38a87c04992a77872db3a29d9103b3', 1, '2022-10-28 01:07:24'),
('2f85886fec245eb36419323dd1ac9ec0cbf3139f9782eff23b994ac56c79e737', 1, '2022-10-27 12:25:59'),
('3e7930402fca431fa6c3f1eba9395907169913b033cff382911b7b1f24935d36', 1, '2022-10-27 10:34:32'),
('44554254dbe99becfedf17facf6c74ce8a33984e71945e105047ae352cc7861c', 1, '2022-10-27 14:15:45'),
('464fe2e4f795f42d9c1c0cbb86215b1ce7a82c58f3c0f363630f73caf377b739', 1, '2022-10-27 14:17:22'),
('4b82956e47b24be5677179840aeab052ba6a2fb6cacd47ea51ebe225a1a7021e', 5, '2022-10-28 07:00:26'),
('5306a34cf4cb42f89d9c93ddaeb323633a228de5f8e1cde5a498bc54a688f341', 1, '2022-10-27 15:31:56'),
('53b3d396fe718afc4e4d6d97d2fea36b666bc428cb4abf3b7c9429e2aa37edff', 1, '2022-10-27 15:21:02'),
('5bb521a68e350e4fa4179a744a59874a3f22f9332d74ad84d3d0604f61ae6f67', 1, '2022-10-27 15:55:34'),
('614eeae2d93663ff70fa8a4997023d03f4a003db6c9878f1f29f94aa7e2ce562', 1, '2022-10-27 14:11:48'),
('6a51ac64d2fb43dabc5696cc91653775ce104110dbd0ad000568599295d22a42', 1, '2022-10-27 14:48:28'),
('70b5947e876e2821117bcf73cb1f3ffa143924f82915c27f97a6e4e88b92d241', 1, '2022-10-28 01:20:16'),
('7d0323edd50f268c9044f432e6da867e37ca67f141dd80c9aebbed6fe3b3fd60', 1, '2022-10-26 16:10:07'),
('81b821b680fb4badc82a11b4869b1dae87cbd991a4a1d6c018b436f1d87339da', 1, '2022-10-26 15:58:01'),
('83c6785cc992872e2adf73406bd014b1b4a0d07292dcd87d40cbc61cff71c9d0', 1, '2022-10-27 10:53:16'),
('918c00dacac213d8bc32470ba064dbdeab9c1d3b8c8f4c1c44a8edeb9f48a670', 1, '2022-10-26 15:58:42'),
('99b87a3ddf82aae75bfe8173caa26f253d09189b1becf483574241585cb63fc4', 1, '2022-10-27 17:03:45'),
('9c3543d948b5e53608327a39da7e1e9220017ebe1dffd4b712b27e56e62008ef', 1, '2022-10-28 01:42:05'),
('a4fd1fab02d26adf8d9c7c31a1329fc5db0989303247757283648ff8e10cfe84', 2, '2022-10-28 06:59:31'),
('aa9644262be3b9264791adc5f88737ee30e5431cf56d922b0f0fc49d3505ae3e', 1, '2022-10-27 15:08:40'),
('ac04b07a18ad54996e338e0ee479e133840f0b8f09fe29a979175a79f0a8ef62', 1, '2022-10-27 16:31:27'),
('c4a0f204318efc08d36bf3142878749026d370a29c65e85cb985598b8f149862', 1, '2022-10-28 02:13:19'),
('cbf541842886afb00fa4c4b8ce79a9052827197e184a947862489fed59d910bd', 1, '2022-10-27 16:28:54'),
('d3046b3d6d118168b11a865f35e014e6311cbe886d1ba6d217b2dd23544f3af5', 1, '2022-10-27 08:12:59'),
('dee53fa3129aa6b10782138ffec381516888fa79c52e1c3532373f34f8592762', 1, '2022-10-28 07:00:34'),
('e6836d8285f5c956ece6c7fc8a278ad8271c1d003ff48a7ba27381c2fe0d623e', 1, '2022-10-27 16:39:40'),
('f603324edbde7bc35605fbc58eef560deba97deb4fd2484f156afef9ff4a498b', 1, '2022-10-27 12:32:10'),
('fbbd524b2baa29de43ebc2e0e2160b0c166128e6ebc47eec3f83d5d712f6578f', 3, '2022-10-28 06:59:45');

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `song_id` int NOT NULL,
  `judul` char(64) NOT NULL,
  `penyanyi` char(128) DEFAULT NULL,
  `tanggal_terbit` date NOT NULL,
  `duration` int NOT NULL,
  `audio_path` char(255) NOT NULL,
  `image_path` char(255) DEFAULT NULL,
  `album_id` int DEFAULT NULL,
  `genre` char(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`song_id`, `judul`, `penyanyi`, `tanggal_terbit`, `duration`, `audio_path`, `image_path`, `album_id`, `genre`) VALUES
(1, 'for lovers who hesistate', 'JANNABI', '2022-10-24', 15, './assets/music/jannabi.mp3', './assets/cover/song/legend.jpg', 1, 'RnB'),
(14, 'Berdua Saja', 'Payung Teduh', '2010-10-11', 269, './assets/music/LAGUF1.MOBI -Berdua Saja.mp3', './assets/cover/song/dunia batas.jpg', 2, 'Pop'),
(15, 'Menuju Senja', 'Payung Teduh', '2010-10-12', 308, './assets/music/Payung Teduh - Menuju Senja_O3_p9XYcLS0.mp3', './assets/cover/song/dunia batas.jpg', 2, 'Pop'),
(16, 'Untuk Perempuan Yang Sedang Di Pelukan', 'Payung Teduh', '2010-10-13', 344, './assets/music/LAGUF1.MOBI -Untuk Perempuan Yang Sedang Di Pelukan.mp3', './assets/cover/song/dunia batas.jpg', 2, 'Pop'),
(17, 'Rahasia', 'Payung Teduh', '2010-11-14', 379, './assets/music/Payung Teduh - Rahasia (Live Session)_zouhG8qcC40.mp3', './assets/cover/song/dunia batas.jpg', 2, 'Pop'),
(18, 'Angin Pujaan Hujan', 'Payung Teduh', '2010-10-15', 212, './assets/music/LAGUF1.MOBI -Payung Teduh - Angin Pujaan Hujan.mp3', './assets/cover/song/dunia batas.jpg', 2, 'Pop'),
(19, 'Resah', 'Payung Teduh', '2010-10-17', 243, './assets/music/LAGUF1.MOBI -Resah.mp3', './assets/cover/song/dunia batas.jpg', 2, 'Pop'),
(20, 'Biarkan', 'Payung Teduh', '2010-10-18', 342, './assets/music/Payung Teduh - Biarkan.mp3', './assets/cover/song/dunia batas.jpg', 2, 'Pop'),
(21, 'Anything You Want', 'Reality Club', '2022-07-24', 236, './assets/music/Reality Club - Anything You Want (Official Lyric Video).mp3', './assets/cover/song/anything u want.jpg', 4, 'Pop'),
(22, 'I\'m In Love With You', 'The 1975', '2021-12-16', 262, './assets/music/The_1975_-_I_m_In_Love_With_You-CONNECTLOADED.COM.mp3', './assets/cover/song/1975.jpg', 5, 'Pop'),
(23, 'Palette', 'IU', '2015-05-10', 217, './assets/music/IU - 팔레트 (Palette) (Feat. G-DRAGON) [129 kbps].mp3', './assets/cover/song/palette iu.jpg', 6, 'Kpop'),
(24, 'Bandaids', 'Keshi', '2019-06-17', 212, './assets/music/(live) keshi - bandaids_dlhJIlfyA2A.mp3', './assets/cover/song/bandaids.jpg', 7, 'Pop'),
(25, 'Glimpse of Us', 'Joji', '2022-05-05', 233, './assets/music/Joji -  Glimpse of Us_FvOpPeKSf_4.mp3', './assets/cover/song/ballads 1.jpg', 8, 'Pop'),
(26, 'Talk that Talk', 'TWICE', '2022-01-01', 177, './assets/music/TWICE - Talk that Talk [128 kbps].mp3', './assets/cover/song/between 1&2.jpg', 9, 'Kpop'),
(27, 'Hype Boy', 'NewJeans', '2022-02-03', 179, './assets/music/NewJeans - Hype Boy [128 kbps].mp3', './assets/cover/song/new jeans.jpg', 10, 'Kpop');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `creator_id` int NOT NULL,
  `subscriber_id` int NOT NULL,
  `creator_name` char(255) NOT NULL,
  `subscriber_name` char(255) NOT NULL,
  `status` char(255) NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`creator_id`, `subscriber_id`, `creator_name`, `subscriber_name`, `status`) VALUES
(0, 0, 'default', 'default', 'PENDING');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `email` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  `username` char(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `username`, `isAdmin`) VALUES
(1, 'admin@gmail.com', '$2y$10$NybHFwaq63zOLqFqXrBuwuxfjG/rjQWnew/6tJXh14CN6ZlIKbMme', 'admin', 1),
(2, 'user@gmail.com', '$2y$10$xMUqNdFyDk50Fvj0jr96NOxcm6/S6FmWw3I9ZZ9Bi3VnLFioI1Mlq', 'user', 0),
(3, 'anca@gmail.com', '$2y$10$BTzcH/q2eql2bXQS1L8UQuOtnMwWdNGl6L6U9O8FWqnqpv05yd8.y', 'anca', 0),
(4, 'azka_cwok@gmail.com', '$2y$10$9E8AFStYwhJlf4WRETlarOCR4GnYoOYWc1jWf3gUZMyxFccq0/H4G', 'azka_cwok', 0),
(5, 'azka_cwek@gmail.com', '$2y$10$no.HTv34kotj305viqn56.nT.TvD06qzUOdPtVlXjBF5OSz.yImWW', 'azka_cwek', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`album_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `fk_usersess` (`user_id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`song_id`),
  ADD KEY `fk_songalbum` (`album_id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`creator_id`,`subscriber_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `album_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `song_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `fk_usersess` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
