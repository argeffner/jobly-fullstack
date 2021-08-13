import React, {useState, useEffect} from "react";
import  { BrowserRouter } from "react-router-dom";
import NavBar from "./routes/NavBar";
import Routes from "./routes/Routes";
import JoblyApi from "./api";
import Loading from "./multiUse/Loading";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";


// storing token in localStorage for re-login
export const TOKEN_STORAGE_ID = "jobly-token";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));


  useEffect(() => {
    console.debug("LoadUserInfo", "token=", token);

    async function getCurrentUser() {
      if(token) {
        try {
          let {username} = jwt.decode(token);
          // set token to api
          JoblyApi.token =token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser)
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("problem with loading", err);
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true);
    }
    // if there is no token then info is not loaded
    // so until the info loads it will remain false
    setInfoLoaded(false);
    getCurrentUser()
  },[token])

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return {success: true};
    } catch (err) {
      console.error('login failed', err);
      return {success: false, err}
    }
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return {success: true};
    } catch (err) {
      console.error('signup failed', err);
      return {success: false, err}
    }
  }

  // need to make a function that passes id for applied jobs
  function alreadyAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    // returns without applying if alreadyapplied
    if (alreadyAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <Loading/>;
  // Context.Provider allow you to pass value props (which includes useState props)
  // This way data can be passed without a need to pass children through each route
  return (
    <BrowserRouter>
     <UserContext.Provider value={{currentUser, setCurrentUser, alreadyAppliedToJob, applyToJob}}>
      <div className="App">
        <NavBar logout={logout}/>
        <Routes login={login} signup={signup} />
      </div>
     </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;
