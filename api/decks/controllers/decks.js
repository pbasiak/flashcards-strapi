'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async updateLike(ctx) {
        const { id } = ctx.params;
        const currentDeck = await strapi.services.decks.find({id: id});
        const deckUsers = currentDeck[0].users;
        const isUserLike = deckUsers.find(item => item.id === ctx.state.user.id);

        console.log(deckUsers);

        if (isUserLike) {
            ctx.send('304'); // TODO: return 304
        }

        const entity = await strapi.services.decks.update({ id }, {users: [ ...deckUsers, ctx.state.user]}); // TODO: DOESNT DO LIKE WHEN OBJECT CONTAINS ANOTHER USER

        return sanitizeEntity(entity, { model: strapi.models.decks});
    },

    async updateUnlike(ctx) {
        const { id } = ctx.params;
        const currentDeck = await strapi.services.decks.findOne({id: id});
        const isUserLike = currentDeck.users.find(item => item.id === ctx.state.user.id);

        if (!isUserLike) {
            ctx.send('304'); // TODO: return 304
        }

        const users = currentDeck.users.map(item => item.id === ctx.state.user.id ? null : item).filter(item => item !== null);
        const entity = await strapi.services.decks.update({ id }, {users: users});

        return sanitizeEntity(entity, { model: strapi.models.decks});
    },
};
