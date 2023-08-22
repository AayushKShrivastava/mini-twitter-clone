import React, {useState, useEffect} from 'react'; 
import './App.css'
import Login from './components/Login';
import Navbar from './components/Navbar';
import PostsContainer from './components/PostsContainer';
import Signup from './components/Signup';
import{ BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import API from './api/api';
import { constants } from './constants/constants';

function App() {
  const [showPeople, setShowPeople] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [current_user, setCurrentUser] = useState(null)
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    async function get_user_info() {
      var response = await API.get(constants.GET_USER_INFO_URL)
      if (response.status === 'SUCCESS')
        setCurrentUser(response.data)
      else
        setCurrentUser(null)
    }
    get_user_info();
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login key={1}/>} />
          <Route path='/signup' element={<Signup key={2}/>} />
          <Route path='/profile' element={current_user ? [
            <Navbar 
              showPeople={()=> setShowPeople(true)} 
              showProfile={()=> setShowProfile(true)} 
              searchQuery={(query) => setSearch(query)} 
              current_user={current_user}
              updateCurrentUser={() => setCurrentUser()}
              key={3}
            />, 
            <PostsContainer 
              showPeople={(val)=> setShowPeople(val)} 
              people={showPeople} profile={true} 
              searchQuery={search} key={4}
              current_user={current_user}
            />
          ] : <Login key={5}/>} />
          <Route path='/' element={current_user ? [
            <Navbar 
              showPeople={()=> setShowPeople(true)} 
              showProfile={()=> setShowProfile(true) } 
              searchQuery={(query) => setSearch(query)} 
              current_user={current_user}
              updateCurrentUser={() => setCurrentUser(null)}
              key={6}
            />, 
            <PostsContainer 
              people={showPeople} 
              profile={showProfile} 
              searchQuery={search} 
              key={7}
            />
          ] : <Login key={8}/> } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
