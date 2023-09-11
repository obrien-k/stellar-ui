export interface GraphQLContext {
  token: string;
  actor: string;
}

/// fake auth check

export function validateToken(token: string): boolean {
  return token === 'testToken';
}

// fake access check

export function validateAccess(access: string): boolean {
  return access === 'admin'; // or staff, member, guest
}
