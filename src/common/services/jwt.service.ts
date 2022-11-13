import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ERROR_CODES, UserProfile } from 'src/utils/constants';
import { assert } from 'src/utils/error.utils';
import { promisify } from 'util';

/* eslint-disable @typescript-eslint/no-var-requires */
const jwt = require('jsonwebtoken');
const signTokenAsync = promisify(jwt.sign);
const verifyTokenAsync = promisify(jwt.verify);

@Injectable()
export class JWTService {
  constructor(private configService: ConfigService) {}

  async generateToken(userProfile: UserProfile): Promise<string> {
    assert(
      userProfile,
      'NO USER PROFILE DETECTED',
      ERROR_CODES.INVALID_REQUEST,
    );
    let token: string;
    try {
      token = await signTokenAsync(
        userProfile,
        this.configService.get('SECRET'),
        { expiresIn: 60 * 60 },
      );
    } catch (err) {
      console.log(err);
    }
    return token;
  }

  async verifyToken(token: string): Promise<UserProfile> {
    assert(token, 'NO TOKEN DETECTED', ERROR_CODES.UNAUTHENTICATED);
    let userProfile: UserProfile;
    try {
      const decodedToken = await verifyTokenAsync(
        token,
        this.configService.get('SECRET'),
      );
      userProfile = Object.assign(
        { _id: '', email: '', role: [''] },
        {
          _id: decodedToken._id,
          email: decodedToken.email,
          role: decodedToken.role,
        },
      );
    } catch (error) {
      throw new HttpException(`Error verifying token: ${error}`, 404);
    }
    return userProfile;
  }
}
