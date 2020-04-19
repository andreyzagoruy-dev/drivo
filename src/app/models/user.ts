interface UnauthorizedUser {
  email: string;
  password?: string;
}

interface User extends UnauthorizedUser {
  id: number;
  fullname: string;
  homeLatitude: number;
  homeLongitude: number;
  workLatitude: number;
  workLongitude: number;
}

export { UnauthorizedUser, User }
