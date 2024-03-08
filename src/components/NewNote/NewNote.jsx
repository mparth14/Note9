import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../../graphql/mutations';
import './NotesPage.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { uploadData } from 'aws-amplify/storage';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function NewNote() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [noteTags, setNoteTags] = useState('');
  const [noteImage, setNoteImage] = useState('');
  const [fileName, setFileName] = useState('');

  const client = generateClient();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file);
  };

  const handleClearFile = () => {
    setFileName(null);
  };

  const handleTagsChange = (event) => {
    setNoteTags(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleImageUpload = async (file) => {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const result = await uploadData({
        key: fileName,
        data: file,
      }).result;
      console.log('Succeeded: ', result);
      return result.key;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleSaveNote = async () => {
    try {
      if (!noteTitle.trim() || !noteText.trim()) {
        setErrorMessage('Note title and note text cannot be empty!');
        return;
      }

      let image = null;
      if (fileName) {
        image = await handleImageUpload(fileName);
      }

      const noteDetails = {
        noteTitle: noteTitle,
        noteDescription: noteText,
        tag: noteTags,
        noteImage: image,
      };

      setNoteTitle('');
      setNoteText('');
      setNoteTags('');
      setFileName(''); // Clear file name
      setErrorMessage('');

      const newNote = await client.graphql({
        query: mutations.createNote,
        variables: {
          input: noteDetails,
        },
      });

      const result = newNote.data;
      console.log('POST call succeeded: ', result);
    } catch (error) {
      console.log('POST call failed: ', error);
    }
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <div className='NotesPage' style={{ overflow: 'auto' }}>
        <Typography align='center' variant='h3' gutterBottom>
          Enter a new note
        </Typography>
        <div className='InputContainer'>
          <h4 htmlFor='noteTitle'>Note Title:</h4>
          <TextField
            required
            id='standard-basic'
            label='Note Title'
            variant='standard'
            className='TitleInput'
            value={noteTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div style={{ marginBottom: '20px' }} className='InputContainer'>
          <h4 htmlFor='noteText'>Note Text:</h4>
          <TextField
            label='Enter your note here'
            multiline
            rows={4}
            id='noteText'
            value={noteText}
            onChange={handleNoteChange}
            className='NoteInput'
            required
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h4 htmlFor='noteTags' style={{ marginRight: '10px' }}>
            Add Note Tag:
          </h4>
          <TextField
            label='Enter note tag'
            id='noteTags'
            value={noteTags}
            onChange={handleTagsChange}
            className='TagInput'
            variant='outlined'
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h4 htmlFor='noteImage'>Upload an Image:</h4>
          <label htmlFor='noteImage'>
            <Button
              component='span'
              variant='outlined'
              startIcon={<CloudUploadIcon />}
              style={{ marginLeft: '10px' }}
            >
              Upload
            </Button>
            <VisuallyHiddenInput
              id='noteImage'
              type='file'
              accept='image/*'
              onChange={handleFileChange}
            />
          </label>
          {fileName && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '10px',
              }}
            >
              <Typography variant='body2'>{String(fileName.name)}</Typography>
              <IconButton aria-label='clear' onClick={handleClearFile}>
                <CloseIcon />
              </IconButton>
            </div>
          )}
        </div>
        {errorMessage && (
          <div className='ErrorMessageContainer'>
            <WarningAmberIcon style={{ marginRight: '5px', color: 'red' }} />
            <p className='ErrorMessage' style={{ color: 'red' }}>
              {errorMessage}
            </p>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            variant='contained'
            onClick={handleSaveNote}
            style={{ marginRight: '10px' }}
          >
            Add Note
          </Button>
          <Button
            variant='contained'
            onClick={handleCancel}
            style={{ backgroundColor: 'red' }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

export default NewNote;
