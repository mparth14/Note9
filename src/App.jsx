import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import { Amplify } from 'aws-amplify';
import 'aws-amplify/auth/enable-oauth-listener';
import NewNote from './components/NewNote/NewNote';
import Navbar from './components/NavBar/NavBar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import NoteList from './components/NoteList/NoteList';
import NoteDetailsPage from './components/NoteDetail/NoteDetailsPage';
import EditNote from './components/EditNote/EditNote';
import NotFound from './components/NotFound/NotFound';

Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator variation='modal' socialProviders={['google']}>
      {({ signOut, user }) => (
        <Router>
          <div className='App'>
            <Navbar
              username={user.signInDetails?.loginId || user.username}
              onSignOut={signOut}
            />
            <Routes>
              <Route exact path='/' element={<NoteList />} />
              <Route exact path='/newnote' element={<NewNote />} />
              <Route path='/notedetail' element={<NoteDetailsPage />} />
              <Route path='/editnote' element={<EditNote />} />
              <Route path='/notfound' element={<NotFound />} />
              <Route
                path='*'
                element={<Navigate replace={true} to='/notfound' />}
              />
            </Routes>
          </div>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;
