CREATE DATABASE IF NOT EXISTS cinder;
USE cinder;

CREATE TABLE IF NOT EXISTS `prefectures`
(
 `id`               INT(20) AUTO_INCREMENT,
 `name`             VARCHAR(50) NOT NULL,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL, 
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users`
(
 `id`               INT(20) AUTO_INCREMENT,
 `name`             VARCHAR(50) NOT NULL,
 `nickname`         VARCHAR(50) NOT NULL,
 `image`            VARCHAR(100),
 `introduction`     VARCHAR(1000),
 `mail`             VARCHAR(50) NOT NULL UNIQUE,
 `password`         VARCHAR(50) NOT NULL,
 `sex`              TINYINT NOT NULL,
 `birthplace_id`    INT,
 `residence_id`     INT,
 `age`              TINYINT NOT NULL,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL,
 `deleted_at`       Datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`birthplace_id`) 
        REFERENCES prefectures(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`residence_id`) 
        REFERENCES prefectures(`id`)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `admins`
(
 `id`               INT(20) AUTO_INCREMENT,
 `name`             VARCHAR(50) NOT NULL,
 `mail`             VARCHAR(50) NOT NULL UNIQUE,
 `password`         VARCHAR(50) NOT NULL,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL, 
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `rooms`
(
 `id`               INT(20) AUTO_INCREMENT,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL, 
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `messages`
(
 `id`               INT(20) AUTO_INCREMENT,
 `user_id`          INT,
 `room_id`          INT,
 `body`             VARCHAR(1000) NOT NULL,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) 
        REFERENCES users(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`room_id`) 
        REFERENCES rooms(`id`)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_room`
(
 `id`               INT(20) AUTO_INCREMENT,
 `user_id`          INT,
 `room_id`          INT,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL, 
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) 
        REFERENCES users(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`room_id`) 
        REFERENCES rooms(`id`)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `goods`
(
 `id`               INT(20) AUTO_INCREMENT,
 `to_user_id`       INT,
 `from_user_id`     INT,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL, 
    PRIMARY KEY (`id`),
    FOREIGN KEY (`to_user_id`) 
        REFERENCES users(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`from_user_id`) 
        REFERENCES users(`id`)
        ON DELETE CASCADE
);

-- ????????????????????????????????????
CREATE TABLE IF NOT EXISTS `reed_message`
(
 `id`               INT(20) AUTO_INCREMENT,
 `user_id`          INT,
 `message_id`       INT,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL, 
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) 
        REFERENCES users(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`message_id`) 
        REFERENCES messages(`id`)
        ON DELETE CASCADE
);

INSERT INTO prefectures
  (name)
VALUES 
  ('?????????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('?????????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('?????????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('??????'),
  ('?????????'),
  ('??????');
INSERT INTO users (name, nickname, mail, password, sex, age, birthplace_id, residence_id) VALUES ("??????", "tarou", "test@test.com", "Password", 0, 29, 1 ,1);
INSERT INTO admins (name, mail, password) VALUES ("admin1", "admin@admin.com", "Password");
INSERT INTO rooms () VALUES ();
INSERT INTO messages (user_id, room_id, body) VALUES (1, 1, "body");
INSERT INTO user_room (user_id, room_id) VALUES (1, 1);
INSERT INTO goods (to_user_id, from_user_id) VALUES (1, 1);
