import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {createComment} from '../../services/api'

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },

}});

const CreateClientForm = ({ authenticated, setAuthenticated, props }) => {
  const classes = useStyles();

  const [description, setDescription] = useState("");

  const task_id = JSON.parse(localStorage.getItem('CURRENT_TASK'))



  const onPostComment = async (e) => {
    e.preventDefault();
      const comment = await createComment(
        description,
        task_id);
        localStorage.clear();
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

    <form onSubmit={onPostComment}>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          onChange={updateDescription}
          value={description}

          ></input>
        </div>
      <button type="submit" className={'post-button'}>Submit</button>
    </form>
          </div>
    </div>
    </>
  );
};

export default CreateClientForm;
