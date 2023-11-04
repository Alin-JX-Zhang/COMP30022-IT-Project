import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function BooksList({ tableName, items, name, nameRow }) {
  tableName = tableName.replace(tableName[0], tableName[0].toUpperCase());
  return (
    <Box sx={{ border: 1, borderRadius: 3, borderColor: '#D8D9DA' }}>
      <Typography
        variant='h5'
        style={{
          marginBottom: 10,
          marginTop: 10,
          marginLeft: 15,
          fontWeight: 'bold',
        }}
      >
        {tableName}
      </Typography>
      <Divider />
      {items.length > 0 ? (
        <List sx={{ maxHeight: 260, overflow: 'auto' }}>
          {items.map((item) => (
            <ListItem disablePadding>
              <ListItemButton
                component='a'
                href={`#/admin/${name}/${item.id}/show`}
              >
                <ListItemText primary={item[nameRow]} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography style={{ marginBottom: 10, marginTop: 10, marginLeft: 15 }}>
          Empty
        </Typography>
      )}
    </Box>
  );
}
