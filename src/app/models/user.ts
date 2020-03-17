export interface User {
  id: string,
  email: string,
  token?: string,
}

export interface UserSingUp {
  email: string,
  password: string,
}
