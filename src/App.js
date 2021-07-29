import './App.css';
import './styles/style.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import useAuth from './authentication/useAuth'
import firebase, { FirebaseContext } from './firebase'
import Login from './authentication/Login'
import ForgotPassword from './authentication/ForgotPassword'
import Home from './components/Home'

function App() {

  const user = useAuth()

  return (
    <BrowserRouter>
    <FirebaseContext.Provider value={{user, firebase}}>
      <div className="app-container">
        <div className="route-container">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/home' />} />
            <Route path='/login'component={Login} />
            <Route path='/forgot' component={ForgotPassword} />
            <Route path='/home' component={Home} />
          </Switch>
        </div>
      </div>
    </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
