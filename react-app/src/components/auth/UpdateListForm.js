import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {updateList} from '../../services/api'

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  input: {
    backgroundColor: 'blue',
    color: 'blue'
  }
});

const UpdateClientForm = ({ authenticated }) => {
  const classes = useStyles();

  const [name, setName] = useState("");

  const list_id = JSON.parse(localStorage.getItem('CURRENT_LIST'))


  const editList = async (e) => {
    e.preventDefault();

    const list = await updateList(
      list_id, name);
      window.location.href = "/";
  };

  const updateName = (e) => {
    setName(e.target.value);
  };


  if (authenticated) {
    return <Redirect to="/" />;
  }


  return (
    <>
    <div className={'container'}>
      <div className={'submission-form'}>


    <form onSubmit={editList}>
      <div>
        <label>Edit List Name</label>
        <input
          type="text"
          name="description"
          onChange={updateName}
          value={name}
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
