import { ReturnUserDto } from 'src/user/dtos/returnUserDto';

export interface ReturnLogin {
  user: ReturnUserDto;
  accessToken: string;
}
