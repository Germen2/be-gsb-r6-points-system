import { ApiProperty } from '@nestjs/swagger';
import { User } from '.';

export class Auth extends User {
  @ApiProperty()
  accessToken: string;
}
