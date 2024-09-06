const express = require('express');
const cors = require('cors');
const { connectMongoDb } = require('./connection');
const User = require('./models/user');
const userSchema = require('./routes/user');
const noteSchema = require('./routes/note');

const PORT = 4000;
const URL = 'mongodb+srv://vilanrn:zEUwF5JQV87lkhcf@my-diary.75arg.mongodb.net/';




const app = express();
app.use(cors());
app.use(express.json());

connectMongoDb(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log('mongoBb Connected')).catch((err)=> console.log("error",err));

app.use('/api/user', userSchema);
app.use('/api/notes', noteSchema);



app.listen(PORT , ()=> console.log(`Server start on port ${PORT}`));