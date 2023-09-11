import { rule, shield, not, and, or } from 'graphql-shield';
import { GraphQLContext } from './common';

const isAuthenticated = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphQLContext,
  info
) => {
  return ctx.token !== null;
});

const asActor = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphQLContext,
  info
) => {
  return ctx.actor === 'admin'; // or staff, member, guest
});

// Permissions
export const permissions = shield({
  Query: {
    getUsers: and(isAuthenticated, or(asActor))
  }
});
