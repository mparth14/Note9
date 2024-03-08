import './NavBar.css';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function Navbar({ username, onSignOut }) {
  const navigate = useNavigate();
  const goToHomepage = () => {
    navigate('/');
  };

  const addNewNote = () => {
    navigate('newnote');
  };

  return (
    <div className='NavbarContainer'>
      <div className='Navbar'>
        <div className='Logo' onClick={goToHomepage}>
          <img src={logo} alt='Logo' />
        </div>

        <div className='UserSection'>
          <div className='Links'>
            <Typography
              style={{ cursor: 'pointer', marginRight: '20px' }}
              align='center'
              variant='body1'
              onClick={goToHomepage}
            >
              My Notes
            </Typography>
            <Typography
              style={{ cursor: 'pointer' }}
              align='center'
              variant='body1'
              onClick={addNewNote}
            >
              New Note
            </Typography>
          </div>
          <div className='Username'>
            <Typography align='center' variant='body1'>
              {username}
            </Typography>
          </div>
          <Button
            variant='contained'
            className='SignOutButton'
            onClick={onSignOut}
          >
            <Typography align='center' variant='body1'>
              Sign Out
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
