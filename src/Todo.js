import React, { useState } from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Button, 
    Modal, FormControl, InputLabel, Input, Backdrop, Fade } from '@material-ui/core'
import './Todo.css'
import db from './firebase'
import {DeleteForever} from '@material-ui/icons' 
import {makeStyles} from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState()


    const updateTodo = (event) => {
        event.preventDefault();
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false)
    }
    return ( 
        <div >
            <div >
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                    onClose={e => setOpen(false)}>
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <form>
                                <h1>Update your Todo</h1>
                                <FormControl>
                                    <InputLabel>Write a Todo</InputLabel>
                                    <Input value={input} placeholder={props.todo.todo}
                                    onChange={event => setInput(event.target.value)} />
                                </FormControl>
                                <Button disabled={!input} type="submit" onClick={updateTodo} variant="contained" color="primary">Update</Button>
                            </form>
                            </div>
                        </Fade>
                </Modal>
            </div>
           <List className="todo_list">
               <ListItem>
                    <ListItemAvatar>

                    </ListItemAvatar>
                   <ListItemText primary={props.todo.todo}  />
               </ListItem>
               <Button onClick={e => setOpen(true)} >
               Edit
               </Button>
               <DeleteForever 
                onClick={ event => {
                   db.collection('todos').doc(props.todo.id).delete()
               }} />
           </List> 
        </div>
    )
}

export default Todo
