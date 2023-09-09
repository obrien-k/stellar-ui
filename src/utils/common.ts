export interface GraphQLContext {
  token: string;

  /* Site context */
  /*
  Site {
  
  }
/*
  /* User context */
  /*
  User {

  }
  */
  /* Community context */
  /*
  Community { 
  
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
