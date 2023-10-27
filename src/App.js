
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Header from './components/Header';
import SignUpPage from './pages/SignUpPage';
import Profile from './pages/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import PrivateRoutes from './components/common/PrivateRoutes';
import CreateAPodcastPage from './pages/CreateAPodcast';
import { auth, db } from './firebase';
import PodcastsPage from './pages/Podcasts';
import PodcastDetailsPage from './pages/PodcastDetails';
import CreateAnEpisodePage from './pages/CreateAnEpisode';
function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
      const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{

            if(user){
              const unsubscribeSnapshot = onSnapshot(doc(db,"users",user.uid),
                (userDoc)=>{
                  if(userDoc.exists()){
                    const userData = userDoc.data();
                    dispatch(
                      setUser({
                        name:userData.name,
                        email:userData.email,
                        uid:user.uid
                      })

                    );
                  }
                },
                (error)=>{
                  console.error("Error fetching user data:",error)
                }
              );
              return()=>{
                unsubscribeSnapshot();
              };
            }

          });
          return()=>{
            unsubscribeAuth();
          };
  },[])



  return (
    <div className="App">
      {/* <Header/> */}
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<SignUpPage/>}/>
        <Route element={<PrivateRoutes/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/create-a-podcast' element={<CreateAPodcastPage/>}/>
            <Route path='/podcasts' element={<PodcastsPage/>}/>
            <Route path='/podcast/:id' element={<PodcastDetailsPage/>}/>
            <Route path='/podcast/:id/create-episode' element={<CreateAnEpisodePage/>}/>
        </Route>
        
      </Routes>
       </div>
  );
}

export default App;
