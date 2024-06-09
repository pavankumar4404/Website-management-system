CREATE DATABASE  IF NOT EXISTS `wms22` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `wms22`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: wms22
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category_list`
--

DROP TABLE IF EXISTS `category_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_list` (
  `category_id` int NOT NULL,
  `category_name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_list`
--

LOCK TABLES `category_list` WRITE;
/*!40000 ALTER TABLE `category_list` DISABLE KEYS */;
INSERT INTO `category_list` VALUES (1,'OS'),(2,'Server Type'),(3,'Front End'),(4,'Back End'),(5,'Web Server'),(6,'Database'),(7,'Location'),(8,'Employee Role'),(9,'Employee workin status'),(10,'Website Status'),(11,'Employee designation'),(12,'Employee Type'),(13,'Certificate Status'),(14,'Website Type'),(15,'HOG/HOD/Division/Team'),(16,'Email Type'),(17,'Gender'),(18,'Project  Document'),(19,'PAC Category'),(20,'Vulnerability Reported Source'),(21,'Vulnerability Status');
/*!40000 ALTER TABLE `category_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_list`
--

DROP TABLE IF EXISTS `common_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common_list` (
  `category_id` int DEFAULT NULL,
  `category_name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `common_id` int NOT NULL,
  `common_name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ordering` int DEFAULT NULL,
  `document_path` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`common_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_list`
--

LOCK TABLES `common_list` WRITE;
/*!40000 ALTER TABLE `common_list` DISABLE KEYS */;
INSERT INTO `common_list` VALUES (1,'OS',1,'Windows',1,''),(1,'OS',2,'Linux',2,''),(2,'ServerType',3,'Application Server',1,''),(2,'ServerType',4,'Database',2,''),(2,'ServerType',5,'API Server',3,''),(2,'ServerType',6,'Container',4,''),(3,'FrontEnd',7,'Angular',1,''),(3,'Front End',8,'ReactJS',2,''),(3,'Front End',9,'NodeJS',3,''),(5,'Web Server',10,'IIS',1,''),(5,'Web Server',11,'Tomcat',2,''),(5,'Web Server',12,'Apache',3,''),(4,'Back End',13,'Dot net',1,''),(4,'Back End',14,'Asp.net',2,''),(4,'Back End',15,'Java',3,''),(4,'Back End',16,'PHP',4,''),(4,'Back End',17,'NodeJS',5,''),(6,'Database',18,'MSSQL',1,''),(6,'Database',19,'MySQL',2,''),(6,'Database',20,'MariaDB',3,''),(6,'Database',21,'Postgres',4,''),(6,'Database',22,'MongoDB',5,''),(7,'Location',23,'State Centre',1,''),(7,'Location',24,'District Centre',2,''),(7,'Location',25,'NDC Delhi',3,''),(7,'Location',26,'NDC Pune',4,''),(7,'Location',27,'NDC Bhubneshwar',5,''),(7,'Location',28,'NDC Hyderabad',6,''),(7,'Location',29,'Railtel Delhi',7,''),(7,'Location',30,'Amazon India',8,''),(7,'Location',31,'Google India',9,''),(2,'ServerType',32,'Application+API server',5,''),(2,'ServerType',33,'Application + Webserver',6,''),(8,'Employee Role',34,'HOG',1,''),(8,'Employee Role',35,'HOD',2,''),(8,'Employee Role',36,'Project Leader ',3,''),(8,'Employee Role',37,'Project Manager',4,''),(8,'Employee Role',38,'Web admin',5,''),(8,'Employee Role',39,'Security Admin',6,''),(10,'Website status',40,'Under development',1,''),(10,'Website status',41,'Staging or testing',2,''),(10,'Website status',42,'Live on Production',3,''),(10,'Website status',43,'Temporarily Closed',4,''),(10,'Website status',44,'Closed',5,''),(9,'Employee Working status',45,'Working',1,''),(9,'Employee Working status',46,'Transferred',2,''),(9,'Employee Working status',47,'Retired',3,''),(11,'Employee designation',48,'DDG',1,''),(11,'Employee designation',49,'Senior Director (IT) / Scientist-F',2,''),(11,'Employee designation',50,' Director (IT) / Scientist-E',3,''),(11,'Employee designation',51,' Joint Director (IT) / Scientist-D',4,''),(11,'Employee designation',52,' Dy.  Director (IT) / Scientist-C',5,''),(11,'Employee designation',53,'Assistant Director (IT) /Scientist-B',6,''),(11,'Employee designation',54,'DIO / Scientist F',7,''),(11,'Employee designation',55,'DIO / Scientist E',8,''),(11,'Employee designation',56,'DIO / Scientist D',9,''),(11,'Employee designation',57,'DIO / Scientist C',10,''),(11,'Employee designation',58,'DIO / Scientist B',11,''),(11,'Employee designation',59,'Scientific Officer SB',12,''),(11,'Employee designation',60,'STA -B',13,''),(11,'Employee designation',61,'STA-A',14,''),(12,'Employee Type',62,'Permanent',1,''),(12,'Employee Type',63,'Out source',2,''),(13,'Certificate Status',64,'Yes',1,''),(13,'Certificate Status',65,'No ',2,''),(13,'Certificate Status',66,'Under Process',3,''),(14,'Website Type',67,'Static',1,''),(14,'Website Type',68,'Dynamic',2,''),(15,'HOG/HOD/Division/Team',69,'Shri Harish R Iyer, Scientist-F (ASIO State) & HOD',1,''),(15,'HOG/HOD/Division/Team',70,'Shri P. Rama Rao, Scientist-F (ASIO District) & HOD',2,''),(15,'HOG/HOD/Division/Team',71,'Shri Ashok Kumar Banjare, Scientist-F (ASIO District)/HOD Infrastructure',3,''),(15,'HOG/HOD/Division/Team',72,'Shri Y.V.S. Rao, Scientist-F & HOD',4,''),(15,'HOG/HOD/Division/Team',73,'Shri Ashok Maurya, Scientist-F & HOD',5,''),(15,'HOG/HOD/Division/Team',74,'Shri Pradeep Kumar Mishra, Scientist-F & HOD',6,''),(15,'HOG/HOD/Division/Team',75,'Shri Shishir Raizada, Scientist-F & HOD',7,''),(15,'HOG/HOD/Division/Team',76,'Shri Surendra Agrawal, Scientist-E & HOD',8,''),(15,'HOG/HOD/Division/Team',77,'Shri Manish Kochar, Scientist-E & HOD',9,''),(15,'HOG/HOD/Division/Team',78,'Shri Satyesh Kumar Sharma, Scientist-E & HOD',10,''),(16,'E-mail Type',79,'Personal email id',1,''),(16,'E-mail Type',80,'Designation based email id',2,''),(17,'Gender',81,'Male',1,''),(17,'Gender',82,'Female',2,''),(17,'Gender',83,'Transgender',3,''),(18,'Project Document',84,'Project Proposal',1,'E:\\WMS\\ProjectProposal\\'),(18,'Project Document',85,'SSL Certificate',2,'E:\\WMS\\SSL\\'),(18,'Project Document',86,'Security Audit Certificate',3,'E:\\WMS\\Audit\\'),(18,'Project Document',87,'PAC Documents',4,'E:\\WMS\\PAC\\'),(18,'Project Document',88,'Awards',5,'E:\\WMSAwards\\'),(19,'PAC Category',89,'Central PAC',1,''),(19,'PAC Category',90,'State PAC',2,''),(20,'Vulnerability Reported Source',91,'CERT-In',1,''),(20,'Vulnerability Reported Source',92,'NIC-Cert',2,''),(20,'Vulnerability Reported Source',93,'NIC-CSD',3,''),(20,'Vulnerability Reported Source',94,'State IT',4,''),(21,'Vulnerability Status',95,'Open',1,''),(21,'Vulnerability Status',96,'Closed',2,'');
/*!40000 ALTER TABLE `common_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dept_id` int NOT NULL,
  `dept_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dept_name_local` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'General Administration','सामान्य प्रशासन'),(2,'Home department','गृह विभाग'),(3,'Prison department','जेल विभाग'),(4,'Finance department','वित्त विभाग'),(5,'Commercial Tax Department','वाणिज्यिक कर विभाग'),(6,'Religious Trust and Endowment Department','धार्मिक न्यास और धर्मस्व विभाग'),(7,'Revenue and Disaster Management Department','राजस्व एवं आपदा प्रबंधन विभाग'),(8,'Transport Department','परिवहन विभाग'),(9,'Sports and Youth Welfare Department','खेल और युवक कल्याण विभाग'),(10,'Forest and Climate Change Department','वन एवं जलवायु परिवर्तन विभाग'),(11,'Commerce and industries department','वाणिज्य और उद्योग विभाग'),(12,'Mineral Resources Department','खनिज साधन विभाग'),(13,'Energy department','ऊर्जा विभाग'),(14,'Agriculture Department','कृषि विभाग'),(15,'Cooperative Department','सहकारिता विभाग'),(16,'Labour Department','श्रम विभाग'),(17,'Department of Public Health, Family Welfare and Medical Education','लोक स्वास्थ्य, परिवार कल्याण एवं चिकित्सा शिक्षा विभाग'),(18,'Urban Administration and Development Department','नगरीय प्रशासन एवं विकास विभाग'),(19,'Public Works Department','लोक निर्माण विभाग'),(20,'School Education Department','स्कूल शिक्षा विभाग'),(21,'Law and Legislative Affairs Department','विधि और विधायी कार्य विभाग'),(22,'Panchayat and Rural Development Department','पंचायत एवं ग्रामीण विकास विभाग'),(23,'Planning, Economics and Statistics department','योजना, आर्थिक और सांख्यिकी विभाग'),(24,'Public relations Department','जनसंपर्क विभाग'),(25,'Tribal and Scheduled Caste, Backward Class and Minority Development Department','आदिमजाति तथा अनुसूचित जाती, पिछड़ा वर्ग एवं अल्पसंख्यक विकास विभाग'),(26,'Social Welfare Department','समाज कल्याण विभाग '),(27,'Rehabilitation department','पुनर्वास विभाग '),(28,'Food Civil Supplies and Consumer Protection Department','खाद्य नागरिक आपूर्ति एवं उपभोक्ता संरक्षण विभाग'),(29,'Culture Department','संस्कृति विभाग'),(30,'Water Resources department','जल संसाधन विभाग'),(31,'Housing and Environment','आवास एवं पर्यावरण विभाग'),(32,'Tourism department','पर्यटन विभाग'),(33,'Public Health Engineering Department','लोक स्वास्थ्य यांत्रिकी विभाग'),(34,'Animal Husbandry Department','पशुपालन विभाग'),(35,'Fisheries Department','मछ्ली पालन विभाग'),(36,'Higher  education department','उच्च शिक्षा विभाग'),(37,'Science and Technology department','विज्ञान और प्रोद्योगिकी विभाग'),(38,'Skill Development, Technical Education and Employment Department','कौशल विकास, तकनीकी शिक्षा एवं रोजगार विभाग'),(39,'Twenty Point Implementation Department','बीस सूत्रीय कार्यान्वयन विभाग'),(40,'Public Enterprises department','सार्वजनिक उपक्रम विभाग'),(41,'Aviation department','विमानन विभाग'),(42,'Parliamentary Affairs Department','संसदीय कार्य विभाग'),(43,'Women and Child Development Department','महिला एवं बाल विकास विभाग'),(44,'Rural Industries Department','ग्रामोद्योग विभाग'),(45,'Public Grievance Redressal Department','जन शिकायत निवारण विभाग'),(46,'Chief Minister\'s Secretariat','मुख्यमंत्री सचिवालय'),(47,'Horticulture Department','उद्यानिकी विभाग'),(55,'Information Technology','सूचना प्रोद्दौगिकी मंत्रालय'),(56,'MP office','सांसद कार्यालय'),(58,'Import department','आयाकट विभाग');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `district` (
  `state_id` int NOT NULL,
  `district_id` int NOT NULL,
  `district_name` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `district_name_local` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`state_id`,`district_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES (22,374,'Bastar','बस्तर'),(22,375,'Bilaspur','बिलासपुर'),(22,376,'Dakshin Bastar Dantewada','दक्षिण बस्तर दंतेवाड़ा'),(22,377,'Dhamtari','धमतरी'),(22,378,'Durg','दुर्ग'),(22,379,'Janjgir-Champa','जांजगीर - चाम्पा'),(22,380,'Jashpur','जशपुर'),(22,381,'Uttar Bastar Kanker','उत्तर बस्तर कांकेर'),(22,382,'Kabeerdham','कबीरधाम'),(22,383,'Korba','कोरबा'),(22,384,'Korea','कोरिया'),(22,385,'Mahasamund','महासमुंद'),(22,386,'Raigarh','रायगढ़'),(22,387,'Raipur','रायपुर'),(22,388,'Rajnandgaon','राजनंदगांव'),(22,389,'Surguja','सरगुजा'),(22,636,'Bijapur','बीजापुर'),(22,637,'Narayanpur','नारायणपुर'),(22,642,'Sukma','सुकमा'),(22,643,'Kondagaon','कोंडागांव'),(22,644,'Balodabazar-Bhatapara','बलौदाबाजार-भाटापारा'),(22,645,'Gariyaband','गरियाबंद'),(22,646,'Balod','बालोद'),(22,647,'Mungeli','मुंगेली'),(22,648,'Surajpur','सूरजपुर'),(22,649,'Balrampur Ramanujganj','बलरामपुर रामानुजगंज'),(22,650,'Bemetara','बेमेतरा'),(22,734,'Gaurela Pendra Marwahi','गौरेला पेंड्रा मरवाही'),(22,759,'Khairagarh Chhuikhadan Gandai','खैरागढ़ छुईखदान गंडई'),(22,760,'Manendragarh Chirmiri Bharatpur Mcb','मनेन्द्रगढ़ चिरमिरी भरतपुर ऍम.सी.बी.'),(22,761,'Mohla Manpur Ambagarh Chouki','मोहला मानपुर अम्बागढ़ चौकी'),(22,762,'Sakti','सक्ती'),(22,763,'Sarangarh Bilaigarh','सारंगढ़ बिलाईगढ़');
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_master`
--

DROP TABLE IF EXISTS `email_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_master` (
  `emp_id` int NOT NULL,
  `email_id` varchar(80) NOT NULL,
  `email_type` int DEFAULT NULL COMMENT '79-Personal Email, 80- Designation Based Email',
  `email_detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_master`
--

LOCK TABLES `email_master` WRITE;
/*!40000 ALTER TABLE `email_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `emp_id` int NOT NULL,
  `emp_name` varchar(50) DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  `name_based_email_id` varchar(80) DEFAULT NULL,
  `mobile_no` char(10) DEFAULT NULL,
  `posting_location_id` int DEFAULT NULL,
  `ip_phone` char(10) DEFAULT NULL,
  `emergency_contact_no` char(10) DEFAULT NULL,
  `state_id` tinyint DEFAULT NULL,
  `district_id` smallint DEFAULT NULL,
  `emp_type` int DEFAULT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `state_id` int NOT NULL,
  `state_name_local` varchar(70) NOT NULL DEFAULT '',
  `state_name` varchar(50) NOT NULL DEFAULT '',
  `st_ut` char(1) DEFAULT NULL,
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Jammu And Kashmir','Jammu And Kashmir','U'),(2,'Himachal Pradesh','Himachal Pradesh','S'),(3,'Punjab','Punjab','S'),(4,'Chandigarh','Chandigarh','U'),(5,'Uttarakhand','Uttarakhand','S'),(6,'Haryana','Haryana','S'),(7,'Delhi','Delhi','U'),(8,'Rajasthan','Rajasthan','S'),(9,'Uttar Pradesh','Uttar Pradesh','S'),(10,'Bihar','Bihar','S'),(11,'Sikkim','Sikkim','S'),(12,'Arunachal Pradesh','Arunachal Pradesh','S'),(13,'Nagaland','Nagaland','S'),(14,'Manipur','Manipur','S'),(15,'Mizoram','Mizoram','S'),(16,'Tripura','Tripura','S'),(17,'Meghalaya','Meghalaya','S'),(18,'Assam','Assam','S'),(19,'West Bengal','West Bengal','S'),(20,'Jharkhand','Jharkhand','S'),(21,'Odisha','Odisha','S'),(22,'Chhattisgarh','Chhattisgarh','S'),(23,'Madhya Pradesh','Madhya Pradesh','S'),(24,'Gujarat','Gujarat','S'),(27,'Maharashtra','Maharashtra','S'),(28,'Andhra Pradesh','Andhra Pradesh','S'),(29,'Karnataka','Karnataka','S'),(30,'Goa','Goa','S'),(31,'Lakshadweep','Lakshadweep','U'),(32,'Kerala','Kerala','S'),(33,'Tamil Nadu','Tamil Nadu','S'),(34,'Puducherry','Puducherry','U'),(35,'Andaman And Nicobar Islands','Andaman And Nicobar Islands','U'),(36,'Telangana','Telangana','S'),(37,'Ladakh','Ladakh','U'),(38,'The Dadra And Nagar Haveli And Daman And Diu','The Dadra And Nagar Haveli And Daman And Diu','U');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_id` int NOT NULL,
  `emp_id` int NOT NULL,
  PRIMARY KEY (`team_id`,`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','password1'),(2,'user2','password2'),(3,'admin','admin123');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vulnerability_action`
--

DROP TABLE IF EXISTS `vulnerability_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vulnerability_action` (
  `website_id` int DEFAULT NULL,
  `vulnerability_id` char(15) NOT NULL COMMENT 'VUL+DDMMYYYY+SSSS',
  `action_id` char(15) NOT NULL COMMENT 'RPL+DDMMYYYY+SSSS',
  `action_detail` varchar(300) DEFAULT NULL,
  `action_date` date DEFAULT NULL,
  `vulnerability_status` int DEFAULT NULL COMMENT 'common_list',
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vulnerability_action`
--

LOCK TABLES `vulnerability_action` WRITE;
/*!40000 ALTER TABLE `vulnerability_action` DISABLE KEYS */;
INSERT INTO `vulnerability_action` VALUES (0,'VUL0206202433','RPL0206202408','done','2024-05-30',96),(1,'VUL0206202422','RPL0206202440','done','2024-06-06',96);
/*!40000 ALTER TABLE `vulnerability_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vulnerability_detail`
--

DROP TABLE IF EXISTS `vulnerability_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vulnerability_detail` (
  `website_id` int DEFAULT NULL,
  `vulnerability_id` varchar(15) NOT NULL,
  `vulnerability_source` int DEFAULT NULL,
  `vulnerability_subject` varchar(200) DEFAULT NULL,
  `reported_date` date DEFAULT NULL,
  `document_path` varchar(100) DEFAULT NULL COMMENT 'common_list+',
  `reference_link` varchar(100) DEFAULT NULL,
  `status` int DEFAULT NULL COMMENT 'common_list',
  PRIMARY KEY (`vulnerability_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vulnerability_detail`
--

LOCK TABLES `vulnerability_detail` WRITE;
/*!40000 ALTER TABLE `vulnerability_detail` DISABLE KEYS */;
INSERT INTO `vulnerability_detail` VALUES (1,'VUL0206202422',93,'gset','2024-06-02','abc','add sql',96),(1,'VUL0206202425',93,'gsetwdj','2024-06-02','aaaas','dfwe',95),(0,'VUL0206202433',92,'ewhf','2024-06-03','wffsd','dfhgr',96),(2,'VUL0206202444',94,'sps','2024-05-29','acd','afs',95),(1,'VUL0306202444',92,'idhefw','2024-06-05','kjdguew','dwsbkb',95);
/*!40000 ALTER TABLE `vulnerability_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_document`
--

DROP TABLE IF EXISTS `website_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_document` (
  `website_id` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `common_id` int DEFAULT NULL,
  `document_name` varchar(50) DEFAULT NULL,
  `vendor_name` varchar(50) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `validity_date` date DEFAULT NULL,
  `pac_no` varchar(50) DEFAULT NULL,
  `pac_category` int DEFAULT NULL,
  `document_id` int NOT NULL COMMENT 'serial number under website_id',
  `document_path` varchar(100) DEFAULT NULL COMMENT 'document_path+/website_id/document_id+FileExtension',
  PRIMARY KEY (`website_id`,`document_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_document`
--

LOCK TABLES `website_document` WRITE;
/*!40000 ALTER TABLE `website_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `website_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_master`
--

DROP TABLE IF EXISTS `website_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_master` (
  `website_id` int NOT NULL,
  `website_url` varchar(100) NOT NULL DEFAULT '',
  `website_name` varchar(100) DEFAULT '',
  `website_description` varchar(300) DEFAULT '',
  `dept_id` int DEFAULT '0',
  `last_audit_status` int DEFAULT '0',
  `last_audit_date` date DEFAULT NULL,
  `last_audit_validity_date` date DEFAULT NULL,
  `last_ssl_status` int DEFAULT NULL,
  `last_ssl_date` date DEFAULT NULL,
  `last_ssl_validity_date` date DEFAULT NULL,
  `last_pac_category` int DEFAULT '0',
  `last_pac_no` varchar(50) DEFAULT NULL,
  `last_pac_date` date DEFAULT NULL,
  `last_pac_status` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `website_status_id` int DEFAULT '0',
  PRIMARY KEY (`website_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_master`
--

LOCK TABLES `website_master` WRITE;
/*!40000 ALTER TABLE `website_master` DISABLE KEYS */;
INSERT INTO `website_master` VALUES (1,'abc.com','abd','fsdgf',2,3,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0),(2,'bcd.com','bcd','',0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0),(3,'vfhf.com','efgf','',0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0),(5,'2ee.comsa','sgrwrrrrrrrrrrrrrrrrrr','fds',8,65,'2024-06-06','2024-06-14',65,'2024-06-14','2024-06-05',90,'122','2024-06-12',65,'sdcwee',41);
/*!40000 ALTER TABLE `website_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_team`
--

DROP TABLE IF EXISTS `website_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_team` (
  `website_id` int NOT NULL,
  `emp_id` int DEFAULT NULL,
  `emp_role` int DEFAULT NULL,
  `email_id` varchar(80) NOT NULL,
  `transfer_date` datetime DEFAULT NULL,
  `transfer_to_emp_email_id` varchar(80) DEFAULT NULL,
  `transfer_to_emp_id` int DEFAULT NULL,
  `transfer_to_emp_role` int DEFAULT NULL,
  `status` char(1) NOT NULL DEFAULT 'A' COMMENT 'A-Active, I-Inactive',
  PRIMARY KEY (`website_id`,`email_id`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_team`
--

LOCK TABLES `website_team` WRITE;
/*!40000 ALTER TABLE `website_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `website_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_technical_detail`
--

DROP TABLE IF EXISTS `website_technical_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_technical_detail` (
  `website_id` int NOT NULL,
  `category_id` int NOT NULL,
  `common_id` int NOT NULL,
  PRIMARY KEY (`website_id`,`category_id`,`common_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_technical_detail`
--

LOCK TABLES `website_technical_detail` WRITE;
/*!40000 ALTER TABLE `website_technical_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `website_technical_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-09 11:55:41
