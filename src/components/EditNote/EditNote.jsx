import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../../graphql/mutations';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { uploadData } from 'aws-amplify/storage';

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

function EditNote() {
  const location = useLocation();
  const { note } = location.state ?? {};
  const navigate = useNavigate();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteTags, setNoteTags] = useState('');
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const client = generateClient();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file);
    setNoteImage(file.name);
  };

  const handleClearFile = () => {
    setFileName(null);
    note.noteImage = '';
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

  const handleUpdateNote = async () => {
    try {
      let updatedNoteDetails = {
        id: note.id,
        noteTitle: noteTitle,
        noteDescription: noteText,
        tag: noteTags,
      };

      // Check if a file is selected
      if (fileName) {
        const image = await handleImageUpload(fileName);
        updatedNoteDetails = {
          ...updatedNoteDetails,
          noteImage: image,
        };
      } else if (note.noteImage === '' && fileName === null) {
        updatedNoteDetails = {
          ...updatedNoteDetails,
          noteImage: '',
        };
      }

      await client.graphql({
        query: mutations.updateNote,
        variables: {
          input: updatedNoteDetails,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
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

  useEffect(() => {
    if (note) {
      setNoteTitle(note.noteTitle);
      setNoteText(note.noteDescription);
      setNoteTags(note.tag);
    }
  }, [note]);

  return (
    <div className='NotesPage' style={{ overflow: 'auto' }}>
      <Typography align='center' variant='h3' gutterBottom>
        Edit Note
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
        {((fileName && fileName.name) || note.noteImage) && ( // Display the newly uploaded file name
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '10px',
            }}
          >
            <Typography variant='body2'>{fileName.name}</Typography>
            <IconButton aria-label='clear' onClick={handleClearFile}>
              <CloseIcon />
            </IconButton>
          </div>
        )}
        {!fileName &&
          note.noteImage && ( // Display the existing noteImage if no new file is selected
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '10px',
              }}
            >
              <Typography variant='body2'>{note.noteImage}</Typography>
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
          onClick={handleUpdateNote}
          style={{ marginRight: '10px' }}
        >
          Update Note
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
  );
}

export default EditNote;
