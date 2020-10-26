import React from 'react'
import './App.css'
import AuthState from './context/authContext/AuthState'
import 'semantic-ui-css/semantic.min.css'
import Home from './components/pages/Home'
import { BrowserRouter as Router } from 'react-router-dom'
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AuthRoute from './routes/AuthRoute'
import GuestRoute from './routes/GuestRoute'
import { Container } from 'semantic-ui-react'

function App() {
  
  return (
    <AuthState>
        <Router>
            <Container>
              <AuthRoute exact path='/' component={Home} />
              <GuestRoute exact path='/login' component={Login} />
              <GuestRoute exact path='/register' component={Register} />
            </Container>
        </Router>
    </AuthState>
  );
}

export default App;
