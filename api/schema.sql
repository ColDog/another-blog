create table posts (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` TEXT,
  `post` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)
