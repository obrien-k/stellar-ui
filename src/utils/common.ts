export interface GraphQLContext {
  token: string;

  /* Guest context */
  /*
  Guest {
  
  }
  *
  /* Member context */
  /*
  Member {

  }
  */
  /* Staff context */
  /*
  Staff { 
  
  }
  */
  /* Admin context */
  /*
  Admin {

  }
  */
}

/// fake auth check

export function validateToken(token: string): boolean {
  return token === 'testToken';
}
