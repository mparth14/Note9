import { Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <img
        src='https://blog.thomasnet.com/hubfs/shutterstock_774749455.jpg' // Replace with your actual image URL
        alt='Not Found Illustration'
        style={{ maxWidth: '500px', marginBottom: '20px' }}
      />

      <Typography variant='h6' gutterBottom>
        Whoopsie-doodle! The page you're looking for seems to be taking a nap in
        cyberspace.
      </Typography>
      <Typography variant='h7'>
        Let's steer back to reality. Click{' '}
        <Link component='button' onClick={handleClick}>
          here
        </Link>{' '}
        to go home.
      </Typography>
    </div>
  );
};

export default NotFound;
