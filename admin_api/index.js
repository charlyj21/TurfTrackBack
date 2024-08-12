const express = require("express")
const uri = 'mongodb+srv://marcelo:marcelo@cluster0.8ad62kg.mongodb.net/usuarios_api?retryWrites=true&w=majority&appName=Cluster0';

const mongoose = require('mongoose');
// Conectar a MongoDB
mongoose.connect(uri).then(() => {
  console.log('Conexión a MongoDB establecida correctamente');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});
const app = express()
app.use( express.json() )
const port = 8080
const { adminModel } = require('./models');
app.get('/', (req, res) => { res.send("Admin"); })

app.get('/admin', async(req, res)=>{
  try {
    const admins = await adminModel.find({});
    res.json( admins );
  }	catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
