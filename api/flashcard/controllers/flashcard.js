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
      entity = await strapi.services.flashcard.create(data, { files });
    } else {
      ctx.request.body.author = ctx.state.user.id;
      entity = await strapi.services.flashcard.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.flashcard });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [flashcard] = await strapi.services.flashcard.find({
      id: ctx.params.id,
      'author.id': ctx.state.user.id,
    });

    if (!flashcard) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.flashcard.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.flashcard.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.flashcard });
  },
};
