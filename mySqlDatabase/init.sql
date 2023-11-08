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
  ('Image Dragons');

INSERT INTO Songs (title, artist_id, audio_url) VALUES
  ('Lavender Haze', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Lavender Haze 1.mp3'),
  ('After Like', (SELECT id FROM Artists WHERE name = 'IVE'), 'http://localhost:3001/uploads/After LIKE 3.mp3'),
  ('My Universe', (SELECT id FROM Artists WHERE name = 'Coldplay'), 'http://localhost:3001/uploads/My Universe 2.mp3'),
  ('Really Really', (SELECT id FROM Artists WHERE name = 'Winner'), 'http://localhost:3001/uploads/Really Really 4.mp3'),
  ('Believer', (SELECT id FROM Artists WHERE name = 'Image Dragons'), 'http://localhost:3001/uploads/Believer 5.mp3');
