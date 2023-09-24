-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FolkusDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema FolkusDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `FolkusDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci ;
USE `FolkusDB` ;

-- -----------------------------------------------------
-- Table `FolkusDB`.`Profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FolkusDB`.`Profile` (
  `ProfileID` INT NOT NULL AUTO_INCREMENT COMMENT '简介ID',
  `Email` VARCHAR(20) NULL DEFAULT NULL COMMENT '邮件',
  `Phone` VARCHAR(20) NULL DEFAULT NULL COMMENT '手机',
  `SecureLevel` INT NOT NULL COMMENT '安全级别',
  `BrithDate` DATETIME NULL DEFAULT NULL COMMENT '生日',
  PRIMARY KEY (`ProfileID`),
  UNIQUE INDEX `ProfileID_UNIQUE` (`ProfileID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf32
COMMENT = '简介表';


-- -----------------------------------------------------
-- Table `FolkusDB`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FolkusDB`.`Account` (
  `AccountID` INT NOT NULL AUTO_INCREMENT COMMENT '账户ID',
  `PassWord` VARCHAR(20) NOT NULL COMMENT '密码',
  `UserName` VARCHAR(20) NOT NULL COMMENT '用户名',
  `Authority` INT NOT NULL COMMENT '权限',
  `ProfileID` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`AccountID`),
  UNIQUE INDEX `AcountID_UNIQUE` (`AccountID` ASC) VISIBLE,
  INDEX `fk_Acount_Profile1_idx` (`ProfileID` ASC) VISIBLE,
  UNIQUE INDEX `UserName_UNIQUE` (`UserName` ASC) VISIBLE,
  CONSTRAINT `fk_Acount_Profile1`
    FOREIGN KEY (`ProfileID`)
    REFERENCES `FolkusDB`.`Profile` (`ProfileID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci
COMMENT = '账户表';


-- -----------------------------------------------------
-- Table `FolkusDB`.`Chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FolkusDB`.`Chat` (
  `ChatID` VARCHAR(20) NOT NULL COMMENT '对话ID',
  `Participants` VARCHAR(20) NULL COMMENT '参与者',
  `AccountID` VARCHAR(20) NULL COMMENT '账户ID',
  PRIMARY KEY (`ChatID`),
  INDEX `AcountID` (`AccountID` ASC) VISIBLE,
  CONSTRAINT `chat_ibfk_1`
    FOREIGN KEY (`AccountID`)
    REFERENCES `FolkusDB`.`Account` (`AccountID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci
COMMENT = '对话表';


-- -----------------------------------------------------
-- Table `FolkusDB`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FolkusDB`.`Message` (
  `MessageID` VARCHAR(20) NOT NULL COMMENT '信息ID',
  `Message` VARCHAR(20) NULL DEFAULT NULL COMMENT '消息内容',
  `AccountID` VARCHAR(20) NOT NULL,
  `ChatID` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`MessageID`, `AccountID`),
  INDEX `fk_Message_Acount1_idx` (`AccountID` ASC) VISIBLE,
  INDEX `fk_Message_Chat1_idx` (`ChatID` ASC) VISIBLE,
  CONSTRAINT `fk_Message_Acount1`
    FOREIGN KEY (`AccountID`)
    REFERENCES `FolkusDB`.`Account` (`AccountID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Message_Chat1`
    FOREIGN KEY (`ChatID`)
    REFERENCES `FolkusDB`.`Chat` (`ChatID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci
COMMENT = '信息表';


-- -----------------------------------------------------
-- Table `FolkusDB`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FolkusDB`.`Address` (
  `Country` VARCHAR(20) NOT NULL COMMENT '安全问题',
  `State` VARCHAR(20) NOT NULL COMMENT '邦',
  `City` VARCHAR(20) NOT NULL COMMENT '城市',
  `Street` VARCHAR(20) NOT NULL COMMENT '街道',
  `ProfileID` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`ProfileID`),
  CONSTRAINT `fk_Address_Profile1`
    FOREIGN KEY (`ProfileID`)
    REFERENCES `FolkusDB`.`Profile` (`ProfileID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FolkusDB`.`Name`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FolkusDB`.`Name` (
  `FirstName` VARCHAR(20) NOT NULL,
  `LastName` VARCHAR(20) NOT NULL,
  `Midname` VARCHAR(20) NULL,
  `ProfileID` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`ProfileID`),
  CONSTRAINT `fk_Name_Profile1`
    FOREIGN KEY (`ProfileID`)
    REFERENCES `FolkusDB`.`Profile` (`ProfileID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FolkusDB`.`Verification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FolkusDB`.`Verification` (
  `Email` VARCHAR(50) NOT NULL COMMENT '邮件',
  `Phone` VARCHAR(20) NOT NULL COMMENT '手机',
  `SecurityQuestion` VARCHAR(100) NULL DEFAULT NULL COMMENT '安全问题',
  `SecurityAnswer` VARCHAR(45) NULL,
  `AccountID` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`AccountID`),
  CONSTRAINT `fk_Verification_Acount1`
    FOREIGN KEY (`AccountID`)
    REFERENCES `FolkusDB`.`Account` (`AccountID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
