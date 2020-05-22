import { LatLng } from '@models/map';

interface UnauthorizedUser {
  email: string;
  password?: string;
}

interface User extends UnauthorizedUser {
  id: number;
  token?: string;
  fullname: string;
  homeLocation: LatLng;
  homeAddress: string;
  workLocation: LatLng;
  workAddress: string;
}

export { UnauthorizedUser, User };
