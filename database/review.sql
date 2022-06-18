grant all privileges on  *.* to 'root'@'%' identified by 'mysql1234';
delete from mysql.user where host="localhost" and user="root";
flush privileges;
select host,user,plugin,authentication_string from mysql.user;

DROP DATABASE IF EXISTS `reviewdb` ;

CREATE DATABASE IF NOT EXISTS `reviewdb` 
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;
  
  USE `reviewdb` ;
  
CREATE TABLE `user` (
  `id` VARCHAR(20) NOT NULL,
  `pw` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;
  
CREATE TABLE `review` (
  `r_number` INT NOT NULL AUTO_INCREMENT,
  `r_uid` VARCHAR(20) NOT NULL,
  `r_content` VARCHAR(1500) NOT NULL,
  `r_title` VARCHAR(50) NOT NULL,
  `r_genre` VARCHAR(20) NOT NULL,
  `r_score` INT NOT NULL,
  PRIMARY KEY (`r_number`),
  FOREIGN KEY (`r_uid`) REFERENCES `user` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;
  
CREATE TABLE `comment` (
  `c_number` INT NOT NULL AUTO_INCREMENT,
  `c_rnumber` INT NOT NULL,
  `c_uid` VARCHAR(20) NOT NULL,
  `c_content` VARCHAR(500) NOT NULL,
  PRIMARY KEY(`c_number`),
  FOREIGN KEY (`c_rnumber`) REFERENCES `review` (`r_number`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`c_uid`) REFERENCES `user` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;