import { useState } from 'react'
import { addItem, signIn, signUp } from './utils/firebase'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';

const AuthForm = ({ onSubmitSuccess }) => {
  const [submitType, setSubmitType] = useState('signin') // signin, signup
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if(submitType === 'signin') {
      const user = await signIn(email, password)
      debugger
      onSubmitSuccess(user)
    }
    if(submitType === 'signup') { 
      const user = await signUp(email, password)
      debugger
      onSubmitSuccess(user)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormControl>
          <TextField
            id="email"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            id="password"
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <RadioGroup
            aria-labelledby="submit-type"
            value={submitType}
            onChange={(e) => setSubmitType(e.target.value)}
          >
            <FormControlLabel value="signin" control={<Radio />} label="signin" />
            <FormControlLabel value="signup" control={<Radio />} label="signup" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <Button variant="contained" type="submit">{submitType}</Button>
        </FormControl>
      </Stack>
    </form>
  )
}

const NoteForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    await addItem(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormControl>
          <TextField
            id="title"
            label="title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            label="description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" type="submit">Add</Button>
        </FormControl>
      </Stack>
    </form>
  );
}

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1>Todo app</h1>
        {!user ? (
          <AuthForm onSubmitSuccess={setUser} />
        ) : <>
          <NoteForm />
          <pre>{JSON.stringify({uid: user.uid, email: user.email }, null, 2)}</pre>
        </>}
      </Container>
    </div>
  );
}

export default App;
