import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from 'cors';
import { User } from './userSchema.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MONGODB_URI ist nicht definiert');
  process.exit(1);
}

mongoose.connect(mongoUri)
 
app.post('/api/signup', async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('Benutzer erfolgreich registriert');
  } catch (error) {
    console.error('Registrierungsfehler:', error);
    res.status(500).send('Fehler bei der Registrierung');
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send('Ungültige Anmeldedaten');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Ungültige Anmeldedaten');
    }

    res.status(200).send('Anmeldung erfolgreich');
  } catch (error) {
    console.error('Login-Fehler:', error);
    res.status(500).send('Fehler bei der Anmeldung');
  }
});

app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});
