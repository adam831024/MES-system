-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-04-18 04:11:04
-- 伺服器版本： 10.4.18-MariaDB
-- PHP 版本： 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `mes_database`
--

-- --------------------------------------------------------

--
-- 資料表結構 `material`
--

CREATE TABLE `material` (
  `ingredient_A` int(11) DEFAULT NULL,
  `ingredient_B` int(11) DEFAULT NULL,
  `ingredient_C` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `material`
--

INSERT INTO `material` (`ingredient_A`, `ingredient_B`, `ingredient_C`) VALUES
(4000, 2000, 3000);

-- --------------------------------------------------------

--
-- 資料表結構 `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `project` text NOT NULL,
  `upload_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `project`
--

INSERT INTO `project` (`id`, `project`, `upload_time`) VALUES
(3, 'project_A', '2021-04-17 18:27:45');

-- --------------------------------------------------------

--
-- 資料表結構 `project_cost`
--

CREATE TABLE `project_cost` (
  `project` text NOT NULL,
  `ingredient_A` int(11) DEFAULT NULL,
  `ingredient_B` int(11) DEFAULT NULL,
  `ingredient_C` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `project_cost`
--

INSERT INTO `project_cost` (`project`, `ingredient_A`, `ingredient_B`, `ingredient_C`) VALUES
('project_A', 5, 0, 1),
('project_B', 5, 2, 3),
('project_C', 1, 3, 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
