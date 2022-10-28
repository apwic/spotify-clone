-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2022 at 07:05 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sepotipayi`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `album_id` int(11) NOT NULL,
  `judul` char(64) NOT NULL,
  `penyanyi` char(128) NOT NULL,
  `total_duration` int(11) NOT NULL,
  `image_path` char(255) NOT NULL,
  `tanggal_terbit` date NOT NULL,
  `genre` char(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`album_id`, `judul`, `penyanyi`, `total_duration`, `image_path`, `tanggal_terbit`, `genre`) VALUES
(1, 'LEGEND', 'JANNABI', 5149, './assets/cover/album/aira_poker_face.png', '2022-10-24', 'RnB');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` char(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exp` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `user_id`, `exp`) VALUES
('0a4e661529e7be339c42356dbc223ce8889baf8440e4a1e16f9d26e60b8cc41f', 1, '2022-10-26 16:15:38'),
('0adad1157d2b2f006e6997686f786dae7a95606b0ad2a7fae978ea5a3ce2c10f', 1, '2022-10-26 16:12:42'),
('1919947221d72847374df1c24720c93c14d3532ef33b32906815e3a8dff9e4c2', 1, '2022-10-27 12:30:36'),
('197a0435fdbfe9d7d799812ed6014dd216dece75c7886f751318edce54e7f55c', 1, '2022-10-27 13:18:12'),
('2f85886fec245eb36419323dd1ac9ec0cbf3139f9782eff23b994ac56c79e737', 1, '2022-10-27 12:25:59'),
('3e7930402fca431fa6c3f1eba9395907169913b033cff382911b7b1f24935d36', 1, '2022-10-27 10:34:32'),
('44554254dbe99becfedf17facf6c74ce8a33984e71945e105047ae352cc7861c', 1, '2022-10-27 14:15:45'),
('464fe2e4f795f42d9c1c0cbb86215b1ce7a82c58f3c0f363630f73caf377b739', 1, '2022-10-27 14:17:22'),
('5306a34cf4cb42f89d9c93ddaeb323633a228de5f8e1cde5a498bc54a688f341', 1, '2022-10-27 15:31:56'),
('53b3d396fe718afc4e4d6d97d2fea36b666bc428cb4abf3b7c9429e2aa37edff', 1, '2022-10-27 15:21:02'),
('5bb521a68e350e4fa4179a744a59874a3f22f9332d74ad84d3d0604f61ae6f67', 1, '2022-10-27 15:55:34'),
('614eeae2d93663ff70fa8a4997023d03f4a003db6c9878f1f29f94aa7e2ce562', 1, '2022-10-27 14:11:48'),
('6a51ac64d2fb43dabc5696cc91653775ce104110dbd0ad000568599295d22a42', 1, '2022-10-27 14:48:28'),
('7d0323edd50f268c9044f432e6da867e37ca67f141dd80c9aebbed6fe3b3fd60', 1, '2022-10-26 16:10:07'),
('81b821b680fb4badc82a11b4869b1dae87cbd991a4a1d6c018b436f1d87339da', 1, '2022-10-26 15:58:01'),
('83c6785cc992872e2adf73406bd014b1b4a0d07292dcd87d40cbc61cff71c9d0', 1, '2022-10-27 10:53:16'),
('918c00dacac213d8bc32470ba064dbdeab9c1d3b8c8f4c1c44a8edeb9f48a670', 1, '2022-10-26 15:58:42'),
('99b87a3ddf82aae75bfe8173caa26f253d09189b1becf483574241585cb63fc4', 1, '2022-10-27 17:03:45'),
('aa9644262be3b9264791adc5f88737ee30e5431cf56d922b0f0fc49d3505ae3e', 1, '2022-10-27 15:08:40'),
('ac04b07a18ad54996e338e0ee479e133840f0b8f09fe29a979175a79f0a8ef62', 1, '2022-10-27 16:31:27'),
('cbf541842886afb00fa4c4b8ce79a9052827197e184a947862489fed59d910bd', 1, '2022-10-27 16:28:54'),
('d3046b3d6d118168b11a865f35e014e6311cbe886d1ba6d217b2dd23544f3af5', 1, '2022-10-27 08:12:59'),
('e6836d8285f5c956ece6c7fc8a278ad8271c1d003ff48a7ba27381c2fe0d623e', 1, '2022-10-27 16:39:40'),
('f603324edbde7bc35605fbc58eef560deba97deb4fd2484f156afef9ff4a498b', 1, '2022-10-27 12:32:10');

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `song_id` int(11) NOT NULL,
  `judul` char(64) NOT NULL,
  `penyanyi` char(128) DEFAULT NULL,
  `tanggal_terbit` date NOT NULL,
  `duration` int(11) NOT NULL,
  `audio_path` char(255) NOT NULL,
  `image_path` char(255) DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL,
  `genre` char(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`song_id`, `judul`, `penyanyi`, `tanggal_terbit`, `duration`, `audio_path`, `image_path`, `album_id`, `genre`) VALUES
(1, 'for lovers who hesistate', 'JANNABI', '2022-10-24', 15, './assets/music/dasfasfdas.mp3', './assets/cover/song/dhikageming (3).jpg', 1, 'RnB'),
(2, 'TOGETHER!', 'JANNABI', '2022-10-24', 186, './assets/music/jannabi.mp3', './assets/cover/song/legend.jpg', 1, 'RnB'),
(3, 'Good Good Night (Intro)', 'JANNABI', '2022-10-24', 216, './assets/music/jannabi.mp3', './assets/cover/song/legend.jpg', 1, 'RnB'),
(4, 'joyful joyful', 'JANNABI', '2022-10-24', 243, './assets/music/jannabi.mp3', './assets/cover/song/legend.jpg', 1, 'RnB'),
(5, 'mirror', 'JANNABI', '2022-10-24', 15, './assets/music/lagu dijeh.mp3', './assets/cover/song/dika.png', 1, 'RnB'),
(7, 'DOLMARO', 'JANNABI', '2022-10-24', 236, './assets/music/jannabi.mp3', './assets/cover/song/legend.jpg', 1, 'RnB'),
(8, 'geum ui hwan hyang', 'JANNABI', '2022-10-24', 212, './assets/music/jannabi.mp3', './assets/cover/song/legend.jpg', 1, 'RnB'),
(9, 'bad broski', 'JANNABI', '2022-10-24', 292, './assets/music/jannabi.mp3', './assets/cover/song/legend.jpg', 1, 'RnB'),
(10, 'land of night', 'JANNABI', '2022-10-24', 246, './assets/music/jannabi.mp3', './assets/cover/song/legend.jpg', 1, 'RnB'),
(11, 'dreams, books, power and walls', 'JANNABI', '2022-10-24', 297, './assets/music/jannabi.mp3', './assets/cover/song/legend.jpg', 1, 'RnB');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  `username` char(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `username`, `isAdmin`) VALUES
(1, 'admin@gmail.com', '$2y$10$NybHFwaq63zOLqFqXrBuwuxfjG/rjQWnew/6tJXh14CN6ZlIKbMme', 'admin', 1);

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
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `song_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `fk_usersess` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `fk_songalbum` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`),
  ADD CONSTRAINT `song_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
