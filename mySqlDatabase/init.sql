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
  ('Imagine Dragons'),
  ('Seventeen'),
  ('NCT 127'),
  ('D.O');

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
  ('Welcome To New York', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Welcome_To_New_York_1.mp3'),
  ('Blank Space', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Blank_Space_1.mp3'),
  ('Style', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Style_1.mp3'),
  ('Out Of The Woods', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Out_Of_The_Woods_1.mp3'),
  ('All You Had To Do Was Stay', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/All_You_Had_To_Do_Was_Stay_1.mp3'),
  ('Shake It Off', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Shake_It_Off_1.mp3'),
  ('I Wish You Would', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/I_Wish_You_Would_1.mp3'),
  ('Bad Blood', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Bad_Blood_1.mp3'),
  ('Wildest Dreams', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Wildest_Dreams_1.mp3'),
  ('How You Get The Girl', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/How_You_Get_The_Girl_1.mp3'),
  ('This Love', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/This_Love_1.mp3'),
  ('I Know Places', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/I_Know_Places_1.mp3'),
  ('Clean', (SELECT id FROM Artists WHERE name = 'Taylor Swift'), 'http://localhost:3001/uploads/Clean_1.mp3'),
  ('After Like', (SELECT id FROM Artists WHERE name = 'IVE'), 'http://localhost:3001/uploads/After_LIKE_3.mp3'),
  ('My Universe', (SELECT id FROM Artists WHERE name = 'Coldplay'), 'http://localhost:3001/uploads/My_Universe_2.mp3'),
  ('Really Really', (SELECT id FROM Artists WHERE name = 'Winner'), 'http://localhost:3001/uploads/Really_Really_4.mp3'),
  ('Fool', (SELECT id FROM Artists WHERE name = 'Winner'), 'http://localhost:3001/uploads/Fool_4.mp3'),
  ('Millions', (SELECT id FROM Artists WHERE name = 'Winner'), 'http://localhost:3001/uploads/Millions_4.mp3'),
  ('Believer', (SELECT id FROM Artists WHERE name = 'Imagine Dragons'), 'http://localhost:3001/uploads/Believer_5.mp3'),
  ('Demons', (SELECT id FROM Artists WHERE name = 'Imagine Dragons'), 'http://localhost:3001/uploads/Demons_5.mp3'),
  ("It's Time", (SELECT id FROM Artists WHERE name = 'Imagine Dragons'), 'http://localhost:3001/uploads/Its_Time_5.mp3'),
  ('To You', (SELECT id FROM Artists WHERE name = 'Seventeen'), 'http://localhost:3001/uploads/To_You_6.mp3'),
  ('Rock With You', (SELECT id FROM Artists WHERE name = 'Seventeen'), 'http://localhost:3001/uploads/Rock_With_You_6.mp3'),
  ('Crush', (SELECT id FROM Artists WHERE name = 'Seventeen'), 'http://localhost:3001/uploads/Crush_6.mp3'),
  ('Pang!', (SELECT id FROM Artists WHERE name = 'Seventeen'), 'http://localhost:3001/uploads/Pang_6.mp3'),
  ('Imperfect Love', (SELECT id FROM Artists WHERE name = 'Seventeen'), 'http://localhost:3001/uploads/Imperfect_Love_6.mp3'),
  ("I Can't Runaway", (SELECT id FROM Artists WHERE name = 'Seventeen'), 'http://localhost:3001/uploads/I_Cant_Runaway_6.mp3'),
  ("Kick It", (SELECT id FROM Artists WHERE name = 'NCT 127'), 'http://localhost:3001/uploads/Kick_It_7.mp3'),
  ("Rose", (SELECT id FROM Artists WHERE name = 'D.O'), 'http://localhost:3001/uploads/Rose_8.mp3'),
  ("I'm Gonna Love You", (SELECT id FROM Artists WHERE name = 'D.O'), 'http://localhost:3001/uploads/Im_Gonna_Love_You_8.mp3'),
  ("My Love", (SELECT id FROM Artists WHERE name = 'D.O'), 'http://localhost:3001/uploads/My_Love_8.mp3'),
  ("It's Love", (SELECT id FROM Artists WHERE name = 'D.O'), 'http://localhost:3001/uploads/Its_Love_8.mp3'),
  ("Dad", (SELECT id FROM Artists WHERE name = 'D.O'), 'http://localhost:3001/uploads/Dad_8.mp3'),
  ("I'm Fine", (SELECT id FROM Artists WHERE name = 'D.O'), 'http://localhost:3001/uploads/Im_Fine_8.mp3'),
  ("Rose [English Version]", (SELECT id FROM Artists WHERE name = 'D.O'), 'http://localhost:3001/uploads/Rose_English_Version_8.mp3'),
  ("Si Fueras Mia", (SELECT id FROM Artists WHERE name = 'D.O'), 'http://localhost:3001/uploads/Si_Fueras_Mia_8.mp3');
