import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User, Auth } from '../models';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto, TokenDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ description: 'Sign up a new user' })
  @ApiOkResponse({
    type: User,
  })
  async signUp(@Body() dto: SignUpDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  @ApiOperation({ description: 'Sign in an existing user' })
  @ApiOkResponse({
    type: Auth,
  })
  async signIn(@Body() dto: SignInDto): Promise<Auth> {
    return this.authService.signIn(dto);
  }

  // @Post('/validate')
  // @ApiOperation({ description: 'validates the user token' })
  // @ApiOkResponse({ type: User })
  // async validate(@Body() dto: TokenDto) {
  //   return this.authService.validate(dto);
  // }
}
