import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShareIcon from '@mui/icons-material/Share';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DeleteConfirmationModal from '../../components/DeleteModal/DeleteConfirmationModal';
import { Chip, Tooltip } from '@mui/material';
import ShareNoteModal from '../ShareNoteModal/ShareNoteModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [noteToShare, setNoteToShare] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalNotes, setOriginalNotes] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const client = generateClient();
  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const getNoteList = async () => {
    try {
      const noteList = await client.graphql({
        query: queries.listNotes,
      });

      const result = noteList.data;
      console.log('GET call succeeded: ', result);
      // Sort notes by updatedAt in descending order
      const sortedNotes = result.listNotes.items.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      setNotes(sortedNotes);
      setOriginalNotes(sortedNotes); // Store the original list of notes
      setLoading(false);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  };

  const handleDelete = (id) => {
    setNoteToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleExpand = (index) => {
    const newNotes = [...notes];
    newNotes[index].expanded = !newNotes[index].expanded;
    setNotes(newNotes);
  };

  const confirmDeleteNote = async () => {
    try {
      await client.graphql({
        query: mutations.deleteNote,
        variables: { input: { id: noteToDelete } },
      });

      setSnackbarMessage('Note successfully deleted!');
      setSnackbarOpen(true);
      await getNoteList();
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setNoteToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const handleNoteClick = (note) => {
    navigate('/notedetail', { state: { note } });
  };

  const handleEdit = (note) => {
    navigate('/editnote', { state: { note } });
  };

  const getTimeDifference = (updatedAt) => {
    const updatedTime = new Date(updatedAt);
    const currentTime = new Date();

    const differenceInSeconds = Math.floor((currentTime - updatedTime) / 1000);

    if (differenceInSeconds === 0) {
      return `just now`;
    } else if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds > 60 && differenceInSeconds < 120) {
      return `${Math.floor(differenceInSeconds / 60)} minute ago`;
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
    } else if (differenceInSeconds > 3600 && differenceInSeconds < 7200) {
      return `${Math.floor(differenceInSeconds / 3600)} hour ago`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    } else if (differenceInSeconds > 86400 && differenceInSeconds < 172800) {
      return `${Math.floor(differenceInSeconds / 86400)} day ago`;
    } else if (differenceInSeconds < 604800) {
      return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    } else {
      return 'long time ago';
    }
  };

  const handleShare = (email) => {
    console.log(`Sharing note with email: ${email}`);
    setShareModalOpen(false);
  };

  const handleShareClick = (note) => {
    setNoteToShare(note);
    setShareModalOpen(true);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredNotes = originalNotes.filter((note) =>
      note.noteTitle.toLowerCase().includes(query.toLowerCase()),
    );

    setNotes(filteredNotes);
  };
  useEffect(() => {
    getNoteList();
  }, []);

  return (
    <Box sx={{ height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          py: 4,
        }}
      >
        <Typography variant='h2' gutterBottom>
          My Notes
        </Typography>

        <Box
          sx={{
            width: '100%',
            maxWidth: '850px',
            mx: 'auto',
            bgcolor: 'background.paper',
            p: 2,
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
          >
            <TextField
              placeholder='Search note title'
              id='search'
              label='Search Notes'
              variant='outlined'
              fullWidth
              size='small'
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
          </Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {notes.length === 0 && !searchQuery ? (
                <Typography variant='h6' align='center' mt={2}>
                  No notes added. Get started now!
                </Typography>
              ) : (
                <>
                  {notes.length === 0 && searchQuery ? (
                    <Typography variant='h6' align='center' mt={2}>
                      No notes found. Add one now.
                    </Typography>
                  ) : (
                    <List>
                      {notes.map((note, index) => (
                        <React.Fragment key={note.noteID}>
                          <ListItem
                            alignItems='flex-start'
                            sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt='Note Avatar'
                                src={`https://notes200134-dev.s3.amazonaws.com/public/${note.noteImage}`}
                              />
                            </ListItemAvatar>

                            <Box sx={{ flex: 1 }}>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    fontSize='20px'
                                    component='div'
                                    onClick={() => handleNoteClick(note)}
                                  >
                                    <span style={{ cursor: 'pointer' }}>
                                      {note.noteTitle}
                                    </span>
                                  </Typography>
                                }
                                secondary={
                                  <>
                                    {note.expanded ||
                                    note.noteDescription.length <= 150 ? (
                                      <>
                                        {note.noteDescription}
                                        {note.noteDescription.length > 150 && (
                                          <span
                                            style={{
                                              cursor: 'pointer',
                                              color: 'blue',
                                            }}
                                            onClick={() => handleExpand(index)}
                                          >
                                            {' '}
                                            See less
                                          </span>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {note.noteDescription.slice(0, 150)}{' '}
                                        <span
                                          style={{
                                            cursor: 'pointer',
                                            color: 'blue',
                                          }}
                                          onClick={() => handleExpand(index)}
                                        >
                                          ... See more
                                        </span>
                                      </>
                                    )}
                                  </>
                                }
                              />
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginTop: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    border: '2px solid black',
                                    borderRadius: '5px',
                                    padding: '2px 8px',
                                  }}
                                >
                                  {note.tag}
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginTop: 1,
                                }}
                              >
                                <Chip
                                  label={`Last updated ${getTimeDifference(
                                    note.updatedAt,
                                  )} `}
                                  size='small'
                                />
                                <Box>
                                  <Tooltip title='Share'>
                                    <IconButton
                                      aria-label='share'
                                      onClick={() => handleShareClick(note)}
                                    >
                                      <ShareIcon style={{ color: 'green' }} />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title='Edit'>
                                    <IconButton
                                      aria-label='edit'
                                      onClick={() => handleEdit(note)}
                                    >
                                      <EditIcon style={{ color: 'darkblue' }} />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title='Delete'>
                                    <IconButton
                                      aria-label='delete'
                                      onClick={() => handleDelete(note.id)}
                                    >
                                      <DeleteIcon
                                        style={{ color: 'crimson' }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>
                            </Box>
                          </ListItem>
                          {index !== notes.length - 1 && (
                            <Divider variant='inset' component='li' />
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  )}
                </>
              )}
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant='contained'
              startIcon={<AddCircleIcon />}
              color='primary'
              onClick={() => {
                navigate('/newnote');
              }}
            >
              Add Note
            </Button>
          </Box>
        </Box>
      </Box>
      {noteToDelete && (
        <DeleteConfirmationModal
          key={noteToDelete}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={confirmDeleteNote}
          noteTitle={notes.find((note) => note.id === noteToDelete)?.noteTitle}
        />
      )}

      <ShareNoteModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        onShare={handleShare}
        note={noteToShare}
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}
      />
      <ShareNoteModal
        open={modalOpen}
        onClose={handleModalClose}
        onShare={handleShare}
        note={selectedNote}
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={handleSnackbarClose}
          severity='success'
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
