
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const carRoutes = require('./routes/car'); 

const cors = require('cors');

const app = express();
app.use(cors()); 
const port = process.env.PORT || 9000;

app.use(express.json());
app.use('/api', carRoutes); 

app.use(express.static('frontend'));
// rutas
app.get('/', (req, res) => {
    res.send('Hola mundo');
});
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Servidor escuchando en el puerto', port));