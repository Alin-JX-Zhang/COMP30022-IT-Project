const tasksFields = {
  id: { type: 'id', label: 'ID' },

  status: {
    type: 'enum',
    label: 'Status',

    options: [
      { value: 'TODO', label: 'TODO' },

      { value: 'IN PROGRESS', label: 'IN PROGRESS' },

      { value: 'COMPLETED', label: 'COMPLETED' },
    ],
  },
};

export default tasksFields;
