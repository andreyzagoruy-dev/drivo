export interface User {
  id: string,
  email: string,
  token?: string,
}

export interface NewUser {
  email: string,
  password: string,
}
