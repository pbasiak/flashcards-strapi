'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.author = ctx.state.user.id;
      console.log(data);
      entity = await strapi.services.decks.create(data, { files });
    } else {
      ctx.request.body.author = ctx.state.user.id;
      console.log(ctx.request.body);
      entity = await strapi.services.decks.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.decks });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [decks] = await strapi.services.decks.find({
      id: ctx.params.id,
      'author.id': ctx.state.user.id,
    });

    if (!decks) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.decks.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.decks.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.decks });
  },
};
