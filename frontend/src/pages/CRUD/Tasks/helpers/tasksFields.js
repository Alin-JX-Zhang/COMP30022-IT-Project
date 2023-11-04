const tasksFields = {
  id: { type: 'id', label: 'ID' },

  task: {
    type: 'string',
    label: 'Task',

    options: [{ value: 'value', label: 'value' }],
  },

  dueTime: {
    type: 'datetime',
    label: 'Due Time',

    options: [{ value: 'value', label: 'value' }],
  },

  details: {
    type: 'string',
    label: 'Details',

    options: [{ value: 'value', label: 'value' }],
  },

  taskStatus: {
    type: 'enum',
    label: 'Task Status',

    options: [
      { value: 'To-Do', label: 'To-Do' },

      { value: 'In-Progress', label: 'In-Progress' },

      { value: 'Finished', label: 'Finished' },
    ],
  },
};

export default tasksFields;
