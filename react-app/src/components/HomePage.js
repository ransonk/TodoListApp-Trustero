import React, {useState, useEffect, useContext} from 'react';
import {fetchComments, fetchLists, fetchTasks, fetchSingleTask, deleteComment, deleteList} from '../services/api'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {Delete, MenuBook} from '@material-ui/icons/';
import {Comment, AddCircleOutline, FlipCameraAndroid, Edit} from '@material-ui/icons/';
import { blue } from '@material-ui/core/colors';
import { Divider } from '@material-ui/core';
import { ThemeContext } from '../ThemeContext';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  addCommentButton: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});


function HomePage(props) {
  const {value, setValue} = useContext(ThemeContext)
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [lists, setLists] = useState("")
  const [tasks, setTasks] = useState("")
  const [comments, setComments] = useState("")
  const [targetTask, setTargetTask] = useState({})
  const [edit, setEdit] = useState(false)
  const [description, setDescription] = useState("")
  const [inProgress] = useState({color: 'red'})
  const [done] = useState({color: 'green'})

    const handleClickOpen = async (task) => {
      setOpen(true);
      let inform = await fetchSingleTask(task)
      setTargetTask(inform)
      localStorage.setItem('CURRENT_TASK', JSON.stringify(inform.id))
        console.log('inform', inform)
        let {comments: fetchedComments} = inform
        let nestedCommentArr = Object.values(fetchedComments)
        console.log('nestedComments', nestedCommentArr)
        setComments(nestedCommentArr)

      };

      console.log('comments????', comments)
      let commentArr = [[1, 2]]
      console.log('object.values?', commentArr)

      const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
      };


      useEffect(() => {
        (async () => {
          let tempList = await fetchLists();
          let tempTasks = await fetchTasks();
          let tempComments = await fetchComments();
          setLists(tempList)
          setTasks(tempTasks)
        })()
      }, [])

      let separatedLists = Object.values(lists)
      let separatedTasks = Object.values(tasks)
      console.log('separatedTasks', separatedTasks)

      let list1_arr = []
      let list2_arr = []
      let list3_arr = []


      separatedTasks.map(task => {
        if (task.list_id === 1) {
          list1_arr.push({name: task.name, status: task.status})
        } else if (task.list_id === 2) {
          list2_arr.push({name: task.name, status: task.status})
        } else if (task.list_id === 3) {
          list3_arr.push({name: task.name, status: task.status})
        }

      })

      console.log(list1_arr)
      console.log(list2_arr)
      console.log(list3_arr)

      function SimpleDialog(props) {
        const classes = useStyles();
        const { onClose, selectedValue, open } = props;

        const handleClose = () => {
          onClose(selectedValue);
        };

        const handleListItemClick = (value) => {
          onClose(value);
        };

        const addComment = () => {
          window.location.href='/create-comment'
        };

        const handleDeleteComment = async (id) => {
          const deleted = await deleteComment(id)
      };

      const handleEdit = async (id) => {
        localStorage.setItem('CURRENT_COMMENT', JSON.stringify(id))
        window.location.href='/update-comment'
      };



      const toggleStatus = async (name) => {
        const response = await fetch(`/api/tasks/toggle-status/${name}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        })
        window.location.reload();
      }






        return (

          <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{targetTask.name}
            <span><p style={targetTask.status ? done : inProgress}>{targetTask.status ? 'Done' : 'In Progress'}</p>
            <Button onClick={() => toggleStatus(targetTask.name)}>
              <FlipCameraAndroid />
              </Button>
            </span>
            </DialogTitle>
            <List>

                <ListItem button onClick={() => handleListItemClick()}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <MenuBook />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={targetTask.description} />
                </ListItem>
                <Divider/>
                <ListItem>
                <Button onClick={addComment}>Add Comment
                <AddCircleOutline fontSize='large'/>
                </Button>
                </ListItem>


              { comments ?
                comments.map(comment => {
                  return (
                    <ListItem autoFocus button >
                <ListItemText primary={comment.description}/>
                <ListItemAvatar>
                  <Avatar>
                    <Comment fontSize='small' onClick={() => handleEdit(comment.id)}/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemAvatar>
                  <Avatar>
                    <Delete fontSize='small' onClick={() => handleDeleteComment(comment.id)}/>
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
                    )
          })
          : null
          }
            </List>
          </Dialog>

        );
      }

      SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
      };


      const handleEditTitle = async (id) => {
        localStorage.setItem('CURRENT_LIST', JSON.stringify(id))
        window.location.href='/edit-list'
      };

      const handleDeleteTitle = async (id) => {
        await deleteList(id)
      };

              return (
                <div>

            {separatedLists.map(({id, name}) => {
              return (
                <ol>{name} <span><Button><Edit onClick={() => handleEditTitle(id)}/></Button></span>
                <span><Button><Delete onClick={() => handleDeleteTitle(id)}/></Button></span>
                        {
                          id === 1 ?
                          list1_arr.map(({name, status}) => {
                            return (
                              <li onClick={() => handleClickOpen(name)}>{name}<span style={status ? done : inProgress}>{status ? 'Done' : 'In Progress'}</span></li>
                              )
                            }) : id === 2 ?

                            list2_arr.map(({name, status}) => {
                              return (
                                <li onClick={() => handleClickOpen(name)}>{name}<span style={status ? done : inProgress}>{status ? 'Done' : 'In Progress'}</span></li>
                                )
                              }) : id === 3 ?

                              list3_arr.map(({name, status}) => {
                                return (
                                <li onClick={() => handleClickOpen(name)}>{name}<span style={status ? done : inProgress}>{status ? 'Done' : 'In Progress'}</span></li>
                                  )
                                }) : null
                              }

                    </ol>
                )
              })}

            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />

        </div>
    );
  }

  export default HomePage;
