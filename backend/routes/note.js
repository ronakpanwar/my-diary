const express = require('express');
const router = express.Router();
const fetchuser = require('../midlewers/fetchuser'); 
const Note = require('../models/note');
const { body, validationResult } = require('express-validator');

//ROUTE 1-: get all the notes using:GET  "/api/notes/fetchallnotes = login require"
router.get('/fetch-all-notes',fetchuser,async (req , res)=>{
try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes);
} catch (error) {
    console.error(error.message);
   res.status(500).send("some error occured");
}

   
})


//ROUTE 2-: save all the notes using:POST  "/api/notes/addnote = login require"
router.post('/add-note',fetchuser,[
    body('title', 'Enter the valid title').isLength({min:3}),
    body('content','enter the min  5 charector ').isLength({min:5}),
], async (req , res)=>{
  try {
    const {title , content ,tag } = req.body;
     
    // if the errors  comes return bad requests and errors
   const result = validationResult(req);
   if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const note = await Note.create ({
      title,content,tag,user:req.user.id 
    })
 
   
    
    
    res.json(note);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }

})


  //ROUTE 3-: update the avalable notes using:PUT "/api/notes/updatenote = login require"
  router.put('/update-note/:id',fetchuser,async (req , res)=>{
     const {title, content,tag} = req.body;
    //create newNote object
try {
  

    const newNote = {};
    if(title){newNote.title = title};
    if(content){newNote.content = content};
    if(tag){newNote.tag = tag};

    // find the note to upadeted to update it

    let note =await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }

   note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});

   res.json({note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }

})

 //ROUTE 4-: delete the avalable notes using:PUT "/api/notes/updatenote = login require"
 router.put('/delete-note/:id',fetchuser,async (req , res)=>{

try {

 // find the note to deleteed to delete it

 let note =await Note.findById(req.params.id);
 if(!note){return res.status(404).send("Not Found")}
  
 // allow deletion if user owns this notes

 if(note.user.toString() !== req.user.id){
   return res.status(401).send("Not Allowed")
 }

note = await Note.findByIdAndDelete(req.params.id);

res.json({"Sucsess":"Note has been deleted"});
} catch (error) {
  console.error(error.message);
    res.status(500).send("some error occured");
}

})


module.exports = router