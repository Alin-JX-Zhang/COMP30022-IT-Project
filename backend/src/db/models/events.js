const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const events = sequelize.define(
    'events',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      note: {
        type: DataTypes.TEXT,
      },

      startTime: {
        type: DataTypes.DATE,
      },

      endTime: {
        type: DataTypes.DATE,
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

  events.associate = (db) => {
    db.events.belongsToMany(db.connections, {
      as: 'involved',
      foreignKey: {
        name: 'events_involvedId',
      },
      constraints: false,
      through: 'eventsInvolvedConnections',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.events.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.events.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return events;
};
