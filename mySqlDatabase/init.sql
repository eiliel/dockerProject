CREATE DATABASE IF NOT EXISTS music_library;

USE music_library;

CREATE TABLE IF NOT EXISTS Artists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS Songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist_id INT NOT NULL,
  audio_url VARCHAR(255),
  FOREIGN KEY (artist_id) REFERENCES Artists(id)
);

INSERT INTO Artists (name) VALUES
  ('Taylor Swift'),
  ('Coldplay'),
  ('IVE'),
  ('Winner'),
  ('Imagine Dragons');

INSERT INTO Songs (title, artist_id, audio_url) VALUES
  ('Lavender Haze', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Lavender_Haze_1.mp3'),
  ('Maroon', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Maroon_1.mp3'),
  ('Anti-Hero', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Anti-Hero_1.mp3'),
  ('Snow On The Beach', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Snow_On_The_Beach_1.mp3'),
  ("You're On Your Own, Kid", (SELECT id FROM Artists WHERE name = 'Taylor Swift'), "http://localhost:3001/uploads/Youre_On_Your_Own_Kid_1.mp3"),
  ('Midnight Rain', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Midnight_Rain_1.mp3'),
  ('Question...?', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Question_1.mp3'),
  ('Vigilante Shit', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Vigilante_Shit_1.mp3'),
  ('Bejeweled', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Bejeweled_1.mp3'),
  ('Labyrinth', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Labyrinth_1.mp3'),
  ('Karma', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Karma_1.mp3'),
  ('Sweet Nothing', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Sweet_Nothing_1.mp3'),
  ('Mastermind', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Mastermind_1.mp3'),
  ('After Like', (SELECT id FROM Artists WHERE name = 'IVE'), 'http://localhost:3001/uploads/After_LIKE_3.mp3'),
  ('My Universe', (SELECT id FROM Artists WHERE name = 'Coldplay'), 'http://localhost:3001/uploads/My_Universe_2.mp3'),
  ('Really Really', (SELECT id FROM Artists WHERE name = 'Winner'), 'http://localhost:3001/uploads/Really_Really_4.mp3'),
  ('Fool', (SELECT id FROM Artists WHERE name = 'Winner'), 'http://localhost:3001/uploads/Fool_4.mp3'),
  ('Millions', (SELECT id FROM Artists WHERE name = 'Winner'), 'http://localhost:3001/uploads/Millions_4.mp3'),
  ('Believer', (SELECT id FROM Artists WHERE name = 'Imagine Dragons'), 'http://localhost:3001/uploads/Believer_5.mp3');
