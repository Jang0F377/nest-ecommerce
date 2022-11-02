import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CRUDService } from 'src/common/services/crud.service';
import { UserDto } from 'src/models/dto/user.dto';
import { UserWithPassword } from 'src/models/user-with-password.model';
import { User } from 'src/models/user.model';
import { ERROR_CODES, ROLES, UserProfile } from 'src/utils/constants';
import { assert } from 'src/utils/error.utils';
import { genSalt, hash } from 'bcryptjs';
import { compare } from 'bcryptjs';
import { UserWithPasswordDto } from 'src/models/dto/user-with-password.dto';
import { ConfigService } from '@nestjs/config';
import { JWTService } from 'src/common/services/jwt.service';
import { PartialUser } from 'src/models/dto/partialTypes';
import { Credentials } from 'src/models/dto/credentials.dto';

@Injectable()
export class UserManagementService {
  constructor(
    private crudService: CRUDService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserWithPassword.name)
    private userWithPasswordModel: Model<UserWithPassword>,
    private jwtService: JWTService,
  ) {}

  async returnAllUsers(): Promise<UserDto[]> {
    const allUsers = await this.crudService.findMany(this.userModel);
    return allUsers;
  }

  async getUserById(id: string): Promise<UserDto> {
    const userExists = await this.crudService.findOne(
      { _id: id },
      this.userModel,
    );

    assert(userExists, 'USER NOT FOUND', ERROR_CODES.NOT_FOUND);
    return userExists;
  }

  // Helper func for creating JWT
  convertToUserProfile(user: UserDto): UserProfile {
    return {
      _id: `${user._id}`,
      email: user.email,
      role: user.role,
    };
  }

  async createNewUser(credentials: Credentials): Promise<UserDto> {
    const doesUserExist = await this.crudService.findOne(
      { email: credentials.email },
      this.userModel,
    );
    assert(!doesUserExist, 'USER EXISTS', ERROR_CODES.CONFLICT);
    const useMe: UserWithPasswordDto = {
      email: credentials.email,
      password: credentials.password,
      role: ROLES.CUSTOMER,
    };
    const salt = await genSalt(12);
    const passHash = await hash(credentials.password, salt);
    useMe.password = passHash;
    const privUser = await this.crudService.create(
      useMe,
      this.userWithPasswordModel,
    );
    const { password, ...rest } = useMe;
    rest._id = privUser._id;
    return await this.crudService.create(rest, this.userModel);
  }

  async verifyCredentials(credentials: Credentials): Promise<UserDto> {
    assert(credentials, 'NO CREDS DETECTED', ERROR_CODES.INVALID_REQUEST);

    const findUser = await this.crudService.findOne(
      { email: credentials.email },
      this.userModel,
    );
    assert(findUser, 'USER NOT FOUND', ERROR_CODES.NOT_FOUND);
    //User Exists now find PW
    const { password } = await this.crudService.findOne(
      { email: credentials.email },
      this.userWithPasswordModel,
    );
    assert(password, 'USER NOT FOUND PW', ERROR_CODES.NOT_FOUND);

    // PW found now validate
    const passwordsMatched = await compare(credentials.password, password);
    if (!passwordsMatched) {
      throw new HttpException(
        'EMAIL OR PASSWORD INCORRECT',
        HttpStatus.BAD_REQUEST,
      );
    }
    return findUser;
  }

  async login(credentials: Credentials): Promise<Record<string, any>> {
    const user = await this.verifyCredentials(credentials);
    const userProfile = this.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return { token };
  }

  async updateUserById(
    id: string,
    updatedUser: PartialUser,
  ): Promise<PartialUser> {
    const findUser = await this.crudService.updateOne(
      { _id: id },
      { $set: updatedUser },
      this.userModel,
    );
    if (!findUser) {
      throw new NotFoundException();
    }
    return findUser;
  }

  async clearUserDB(): Promise<void> {
    const userDB = Promise.resolve(this.crudService.deleteMany(this.userModel));
    const userWPasswordDB = Promise.resolve(
      this.crudService.deleteMany(this.userWithPasswordModel),
    );

    await Promise.all([userDB, userWPasswordDB]).then(x => {
      return x;
    });
  }

  async returnCurrentUser(token: string): Promise<UserDto> {
    const user = await this.jwtService.verifyToken(token);
    return user;
  }
}
