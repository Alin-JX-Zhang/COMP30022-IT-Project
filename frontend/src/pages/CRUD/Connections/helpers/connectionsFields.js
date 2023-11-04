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
      { value: 'Connected', label: 'Connected' },

      { value: 'Disconnected', label: 'Disconnected' },
    ],
  },

  gender: {
    type: 'enum',
    label: 'Gender',

    options: [
      { value: 'Male', label: 'Male' },

      { value: 'Female', label: 'Female' },

      { value: 'Other', label: 'Other' },
    ],
  },

  birthday: {
    type: 'date',
    label: 'Birthday',

    options: [{ value: 'value', label: 'value' }],
  },

  headline: {
    type: 'string',
    label: 'Headline',

    options: [{ value: 'value', label: 'value' }],
  },

  registered: {
    type: 'boolean',
    label: 'Registered',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default connectionsFields;
