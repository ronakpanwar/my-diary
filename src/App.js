
import './App.css';
import Home from './component/Home';
import Navbar from "./component/Navbar";
import AddNote from './component/addNote';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import Profile from './component/profile';
import {
    BrowserRouter as Main,
  Routes,
  Route,

} from "react-router-dom"
import NoteState from './context/noteState';



function App() {
  return (
   <Main>
   <>
   <NoteState>
<Navbar/>
<Routes>
  <Route path='/*' element={<Home/>}/>
  <Route path='/add-note' element={<AddNote/>}/>
  <Route path='/sign-in' element={<SignIn/>}/>
  <Route path='/sign-up' element={<SignUp/>}/>
  <Route path='/profile' element={<Profile/>}/>
</Routes>
    </NoteState>
   </>
   </Main>
  );
}

export default App;
