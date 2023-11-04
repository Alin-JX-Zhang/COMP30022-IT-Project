const eventsFields = {
  id: { type: 'id', label: 'ID' },

  name: {
    type: 'string',
    label: 'Name',

    options: [{ value: 'value', label: 'value' }],
  },

  note: {
    type: 'string',
    label: 'Note',

    options: [{ value: 'value', label: 'value' }],
  },

  involved: {
    type: 'relation_many',
    label: 'Involved',

    options: [{ value: 'value', label: 'value' }],
  },

  startTime: {
    type: 'datetime',
    label: 'Start Time',

    options: [{ value: 'value', label: 'value' }],
  },

  endTime: {
    type: 'datetime',
    label: 'End Time',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default eventsFields;
