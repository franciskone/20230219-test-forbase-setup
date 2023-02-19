import { useState } from 'react'
import { addItem } from './utils/firebase'

import './App.css';

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onSaveClick = async () => {
    await addItem(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <div className="App">
      <h1>Todo app</h1>
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title"/>
      </div>
      <div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
      </div>
      <button onClick={onSaveClick}>clicca</button>
    </div>
  );
}

export default App;
