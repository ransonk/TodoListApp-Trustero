import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {updateComment} from '../../services/api'

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  input: {
    backgroundColor: 'blue',
    color: 'blue'
  },
}});

const UpdateClientForm = ({ authenticated, setAuthenticated, props }) => {
  const classes = useStyles();

  const [description, setDescription] = useState("");

  const comment_id = JSON.parse(localStorage.getItem('CURRENT_COMMENT'))


  const editComment = async (e) => {
    e.preventDefault();

    const comment = await updateComment(
      comment_id, description);
      window.location.href = "/";
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };


  if (authenticated) {
    return <Redirect to="/" />;
  }


  return (
    <>
    <div className={'container'}>
      <div className={'submission-form'}>

    <form onSubmit={editComment}>
      <div>
        <label>Edit Comment</label>
        <input
          type="text"
          name="description"
          onChange={updateDescription}
          value={description}
          className={'input'}

          ></input>
        </div>
      <button type="submit" className={'post-button'}>Submit</button>
    </form>
          </div>
    </div>
    </>
  );
};

export default UpdateClientForm;
