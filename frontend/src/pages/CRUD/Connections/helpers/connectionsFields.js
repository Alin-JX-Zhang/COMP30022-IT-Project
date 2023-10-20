const connectionsFields = {
  id: { type: 'id', label: 'ID' },

  name: {
    type: 'string',
    label: 'Name',

    options: [{ value: 'value', label: 'value' }],
  },

  email: {
    type: 'string',
    label: 'Email',

    options: [{ value: 'value', label: 'value' }],
  },

  status: {
    type: 'enum',
    label: 'Status',

    options: [
      { value: 'Online', label: 'Online' },

      { value: 'Offline', label: 'Offline' },
    ],
  },
};

export default connectionsFields;
