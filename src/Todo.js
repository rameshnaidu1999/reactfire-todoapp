import React, { useState } from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Button, Modal } from '@material-ui/core'
import './Todo.css'
import db from './firebase'
import {DeleteForever} from '@material-ui/icons' 
import {makeStyles} from '@material-ui/core/styles'
 
const useStyles = makeStyles((theme)=> ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadow[5],
        padding: theme.spaacing(2,4,3),

    },
}))

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div>
        <Modal
            open={open}
            onClose={e => setOpen(false)}>
            <div>
                <h1>I am modal</h1>
                <button onClick={e => setOpen(false)}></button>
            </div>
        </Modal>
           <List className="todo_list">
               <ListItem>
                    <ListItemAvatar>

                    </ListItemAvatar>
                   <ListItemText primary={props.todo.todo} secondary="Dummy dead line" />
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
