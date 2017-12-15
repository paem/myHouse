export interface Roles{
  user: boolean;
  superUser?:boolean;
}

export class User {
  email:    string;
  name: string;
  roles:    Roles;
  constructor(authData) {
    this.email    = authData.email
    this.name = authData.name
    this.roles    = { user: true }
  }
}
