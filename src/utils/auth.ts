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

const isAdmin = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphQLContext,
  info
) => {
  return ctx.token === 'admin';
});

const isStaff = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphQLContext,
  info
) => {
  return ctx.token === 'staff';
});

const isMember = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphQLContext,
  info
) => {
  return ctx.token === 'member';
});

const isGuest = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphQLContext,
  info
) => {
  return ctx.token === 'guest';
});

// Permissions
export const permissions = shield({
  Query: {
    getUsers: and(isAuthenticated, or(isAdmin, isStaff, isMember, isGuest))
  }
});
