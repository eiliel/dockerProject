const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Le dossier de destination pour les fichiers uploadés
  },
  filename: function (req, file, cb) {
    const originalname = `${req.body.title}_${req.body.artistId}.mp3`;
    const sanitizedFilename = originalname.replace(/ /g, '_');
    cb(null, sanitizedFilename);
  }
});

const upload = multer({ storage: storage });

const app = express()
app.use(cors())
app.use(express.json());

const dbConfig = {
  host: 'mysql_database',
  user: 'root',
  password: 'rootpassword',
  database: 'music_library'
};

app.get('/', (req, res)=> {
  return res.json("From api music");
})

app.get('/songs', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute(`
      SELECT Songs.*, Artists.name AS artist_name 
      FROM Songs
      LEFT JOIN Artists ON Songs.artist_id = Artists.id
    `);
    connection.end();
    return res.json(rows);
  } catch (error) {
    return res.json(error);
  }
});

app.get('/artists', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute(`
      SELECT * 
      FROM Artists
    `);
    connection.end();
    return res.json(rows);
  } catch (error) {
    return res.json(error);
  }
});

app.post('/audios', upload.single('audioFile'), async (req, res) => {
  try {
    const { artistId, title, audioUrl } = req.body;

    const connection = await mysql.createConnection(dbConfig);

    // Vérifie si la chanson existe déjà dans la bdd
    const [existingSongs] = await connection.execute(
      'SELECT id FROM Songs WHERE artist_id = ? AND title = ?',
      [artistId, title]
    );

    if (existingSongs.length > 0) {
      connection.end();
      return res.status(409).json({ error: 'La chanson existe déjà pour cet artiste' });
    }

    const [result] = await connection.execute(
      'INSERT INTO Songs (artist_id, title, audio_url) VALUES (?, ?, ?)',
      [artistId, title, audioUrl]
    );
    connection.end();
    return res.json({ message: 'Chanson ajoutée' });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de l\'ajout de la chanson, seuls des fichiers mp3' });
  }
});

app.post('/artists', async (req, res) => {
  try {
    const { name } = req.body;

    const connection = await mysql.createConnection(dbConfig);

    // Vérifie si l'artiste existe déjà dans la bdd
    const [existingArtists] = await connection.execute(
      'SELECT id FROM Artists WHERE name = ?',
      [name]
    );

    if (existingArtists.length > 0) {
      connection.end();
      return res.status(409).json({ error: 'L\'artiste existe déjà' });
    }

    const [result] = await connection.execute(
      'INSERT INTO Artists (name) VALUES (?)',
      [name]
    );
    connection.end();

    const artistId = result.insertId;

    const artist = {
      id: artistId,
      name: name,
    };

    connection.end();

    return res.status(201).json(artist);
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'artiste' });
  }
});

app.use('/uploads', express.static('uploads'));

app.listen(3001, () =>{
  console.log("Listening");
})