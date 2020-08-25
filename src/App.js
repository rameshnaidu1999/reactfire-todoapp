import React,{useState, useEffect} from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  //when the app loads, we need to listrn database and fetch databse adde/removed
  useEffect(() => {
    //this code here...
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      //console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id,todo:doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([...todos, input])
    setInput('')
  }
  return (
    <div className="App">
      <h2>Hola , Here is todoapp</h2>
      <form>
      <FormControl>
        <InputLabel>Write a Todo</InputLabel>
        <Input value={input} 
        onChange={event => setInput(event.target.value)} />
      </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add todo
        </Button>
        {/* <button type="submit" onClick={addTodo}>Add todo</button> */}
      </form>
      <ul>
      {todos.map(todo => (
        <Todo todo={todo}  />
        
      ))}
      </ul>
    </div>
  );
}

export default App;
