const mongoose = require('mongoose');


const NoteSchema = new mongoose.Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users'
    },
     title:{
        type:String,
        required : true
     },
     content:{
        type : String,
        required : true,
       
     },
     tag:{
        type:String,
        default:'Genral'
     },
     date:{
        type:Date,
        default:Date.now
     },

  },{timestamps:true});

  module.exports = mongoose.model('note',NoteSchema); 