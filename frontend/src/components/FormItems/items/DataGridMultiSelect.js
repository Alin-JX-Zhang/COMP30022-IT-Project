import { GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MenuItem, Select } from '@mui/material';

const DataGridMultiSelect = (props) => {
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
    const newValue =
      typeof eventValue === 'string' ? value.split(',') : eventValue;

    let res = newValue.map((id) => ({
      id: id,
      [nameRow]: options.find((x) => x.id === id)?.label ?? '',
    }));

    apiRef.current.setEditCellValue({
      id,
      field,
      value: res,
    });
  };

  return (
    <Select
      multiple
      value={value ?? []}
      onChange={handleChange}
      sx={{ width: '100%' }}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DataGridMultiSelect;
