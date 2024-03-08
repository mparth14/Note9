import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate, useLocation } from 'react-router-dom';

const NoteDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const note = location.state.note;

  const handleBack = () => {
    navigate('/'); // Navigate back to the home page or any desired page
  };

  const handleEdit = (note) => {
    navigate('/editnote', { state: { note } });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        marginTop: '20px', // Adding margin on top of the whole card
      }}
    >
      {note ? (
        <Card sx={{ maxWidth: 600, textAlign: 'center' }}>
          {note.noteImage && (
            <CardMedia
              component='img'
              image={`https://notes200134-dev.s3.amazonaws.com/public/${note.noteImage}`}
              alt='Note Image'
              sx={{ margin: 'auto', maxWidth: 300, maxHeight: 300 }} // Center the image and set max dimensions
            />
          )}
          <CardContent>
            <Typography variant='h4' fontWeight={'medium'} gutterBottom>
              {note.noteTitle}
            </Typography>
            {note.tag && (
              <Box
                sx={{
                  border: '2px solid black',
                  borderRadius: '5px',
                  padding: '2px 8px',
                }}
              >
                {note.tag}
              </Box>
            )}
            <Typography align='left' variant='body1' gutterBottom>
              {note.noteDescription}
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Button
                onClick={() => handleEdit(note)}
                variant='contained'
                style={{ marginRight: '10px' }}
              >
                Edit Note
              </Button>
              <Button
                onClick={handleBack}
                variant='contained'
                style={{ backgroundColor: 'red' }}
              >
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Typography variant='body1'>Note data is not available.</Typography>
      )}
    </Box>
  );
};

export default NoteDetailsPage;
