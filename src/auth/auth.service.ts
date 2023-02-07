import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, User } from '../models';
import { SignInDto, SignUpDto, JwtPayloadDto, TokenDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Checks if user already exists with same email
   * @param dto dto with new user information
   * @returns created user
   */
  async signUp(dto: SignUpDto): Promise<User> {
    const user = await this.getUser(dto.username);

    if (user) {
      throw new ConflictException(`User with ${dto.username} is already taken`);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    dto.password = hashedPassword;

    const createdUser: User = await this.userModel.create(dto);
    delete createdUser.password;

    return createdUser;
  }

  /**
   * Check if user exists and signs jwt with user info if exists
   * @param dto dto with user credentials
   * @returns
   */
  async signIn(dto: SignInDto): Promise<Auth> {
    const user = await this.getUser(dto.username);
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      const { _id, username, firstName, lastName } = user;
      const payload: JwtPayloadDto = {
        _id,
        username,
        firstName,
        lastName,
      };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken, ...payload };
    } else {
      throw new ForbiddenException('Credentials incorrect');
    }
  }

  async validate(dto: TokenDto): Promise<User> {
    const user = this.jwtService.verify(dto.token, {
      secret: process.env.JWT_SECRET,
    });

    return user;
  }

  /**
   * Looks for an user in the db
   * @param username username from user you're looking for
   * @returns user if found
   */
  private async getUser(username: string): Promise<User> {
    const user: User = await this.userModel.findOne({ username });
    return user;
  }
}
