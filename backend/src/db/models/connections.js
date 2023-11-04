const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const connections = sequelize.define(
    'connections',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['Connected', 'Disconnected'],
      },

      gender: {
        type: DataTypes.ENUM,

        values: ['Male', 'Female', 'Other'],
      },

      birthday: {
        type: DataTypes.DATEONLY,

        get: function () {
          return this.getDataValue('birthday')
            ? moment.utc(this.getDataValue('birthday')).format('YYYY-MM-DD')
            : null;
        },
      },

      headline: {
        type: DataTypes.TEXT,
      },

      registered: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  connections.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.connections.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.connections.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return connections;
};
