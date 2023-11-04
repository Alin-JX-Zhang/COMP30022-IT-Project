const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ConnectionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connections = await db.connections.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        email: data.email || null,
        status: data.status || null,
        gender: data.gender || null,
        birthday: data.birthday || null,
        headline: data.headline || null,
        registered: data.registered || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return connections;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const connectionsData = data.map((item) => ({
      id: item.id || undefined,

      name: item.name || null,
      email: item.email || null,
      status: item.status || null,
      gender: item.gender || null,
      birthday: item.birthday || null,
      headline: item.headline || null,
      registered: item.registered || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const connections = await db.connections.bulkCreate(connectionsData, {
      transaction,
    });

    // For each item created, replace relation files

    return connections;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connections = await db.connections.findByPk(id, {
      transaction,
    });

    await connections.update(
      {
        name: data.name || null,
        email: data.email || null,
        status: data.status || null,
        gender: data.gender || null,
        birthday: data.birthday || null,
        headline: data.headline || null,
        registered: data.registered || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    return connections;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connections = await db.connections.findByPk(id, options);

    await connections.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await connections.destroy({
      transaction,
    });

    return connections;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const connections = await db.connections.findOne(
      { where },
      { transaction },
    );

    if (!connections) {
      return connections;
    }

    const output = connections.get({ plain: true });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('connections', 'name', filter.name),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('connections', 'email', filter.email),
        };
      }

      if (filter.headline) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('connections', 'headline', filter.headline),
        };
      }

      if (filter.birthdayRange) {
        const [start, end] = filter.birthdayRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            birthday: {
              ...where.birthday,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            birthday: {
              ...where.birthday,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.gender) {
        where = {
          ...where,
          gender: filter.gender,
        };
      }

      if (filter.registered) {
        where = {
          ...where,
          registered: filter.registered,
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.connections.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.connections.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('connections', 'name', query),
        ],
      };
    }

    const records = await db.connections.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
