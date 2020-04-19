interface UnauthorizedUser {
  email: string;
  password?: string;
}

interface User extends UnauthorizedUser {
  id: string;
  fullname: string;
  homeLatitude: string;
  homeLongitude: string;
  workLatitude: string;
  workLongitude: string;
}

export { UnauthorizedUser, User }
