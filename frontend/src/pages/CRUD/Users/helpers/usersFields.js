const usersFields = {
  id: { type: 'id', label: 'ID' },

  firstName: { type: 'string', label: 'First Name' },

  lastName: { type: 'string', label: 'Last Name' },

  phoneNumber: { type: 'string', label: 'Phone Number' },

  email: { type: 'string', label: 'E-Mail' },

  disabled: { type: 'boolean', label: 'Disabled' },

  avatar: { type: 'images', label: 'Avatar' },

  password: { type: 'string', label: 'Password' },

  emailVerified: { type: 'boolean', label: 'Email Verified' },

  emailVerificationToken: { type: 'string', label: 'Email Verification Token' },

  emailVerificationTokenExpiresAt: {
    type: 'datetime',
    label: 'Email Verification Token Expires At',
  },

  passwordResetToken: { type: 'string', label: 'Password Reset Token' },

  passwordResetTokenExpiresAt: {
    type: 'datetime',
    label: 'Password Reset Token Expires At',
  },

  provider: { type: 'string', label: 'Provider' },

  role: {
    type: 'enum',
    label: '',

    options: [
      { value: 'admin', label: 'admin' },

      { value: 'user', label: 'user' },
    ],
  },

  Gender: {
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

  preferredName: {
    type: 'string',
    label: 'Preferred Name',

    options: [{ value: 'value', label: 'value' }],
  },

  headline: {
    type: 'string',
    label: 'Headline',

    options: [{ value: 'value', label: 'value' }],
  },

  password: { type: 'string', label: 'Password' },
};

export default usersFields;
