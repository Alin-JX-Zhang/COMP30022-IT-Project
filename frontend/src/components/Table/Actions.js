import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Actions = ({ classes, id, openModal, entity }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id={id} key={id}>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={classes}
      >
        <MenuItem
          classes={classes}
          onClick={() => {
            history.push(`/admin/${entity}/${id}/show`);
            handleClose();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize='small' />
          </ListItemIcon>
          Show
        </MenuItem>
        <MenuItem
          classes={classes}
          onClick={() => {
            history.push(`/admin/${entity}/${id}/edit`);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          classes={classes}
          onClick={(event) => {
            openModal(event, id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Actions;
