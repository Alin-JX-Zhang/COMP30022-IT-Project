import { GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MenuItem, Select } from '@mui/material';

const DataGridSinglSelect = (props) => {
  const { id, value, field, entityName, nameRow } = props;
  const apiRef = useGridApiContext();
  const [options, setOptions] = useState([]);

  async function callApi(entityName) {
    const data = await axios(`/${entityName}/autocomplete?limit=100`);
    return data.data;
  }

  useEffect(() => {
    callApi(entityName).then((data) => {
      setOptions(data);
    });
  }, []);

  const handleChange = (event) => {
    const eventValue = event.target.value; // The new value entered by the user

    const newValue = typeof eventValue === 'string' ? '' : eventValue;

    let res = {
      id: eventValue,
      [nameRow]: options.find((x) => x.id === eventValue)?.label ?? '',
    };

    apiRef.current.setEditCellValue({
      id,
      field,
      value: res,
    });
  };

  return (
    <Select
      value={value.id ?? []}
      onChange={handleChange}
      sx={{ width: '100%' }}
      defaultValue=''
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DataGridSinglSelect;
