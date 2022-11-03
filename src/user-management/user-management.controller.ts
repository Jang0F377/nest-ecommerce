import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { Credentials } from 'src/models/dto/credentials.dto';
import { PartialUser } from 'src/models/dto/partialTypes';
import { UserWithPasswordDto } from 'src/models/dto/user-with-password.dto';
import { UserDto } from 'src/models/dto/user.dto';
import { ROLES } from 'src/utils/constants';
import { UserManagementService } from './user-management.service';

@Controller('users')
export class UserManagementController {
  constructor(private userManagementService: UserManagementService) {}

  @Role(ROLES.ADMIN, ROLES.CUSTOMER)
  @Get('me')
  returnCurrentUser(@Headers('token') token: string): Promise<UserDto> {
    return this.userManagementService.returnCurrentUser(token);
  }

  @Public()
  @Role(ROLES.ADMIN, ROLES.CUSTOMER)
  @Get()
  returnAllUsers(): Promise<UserDto[]> {
    return this.userManagementService.returnAllUsers();
  }

  @Role(ROLES.ADMIN, ROLES.CUSTOMER)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<any> {
    return this.userManagementService.getUserById(id);
  }

  @Public()
  @Post()
  createNewUser(@Body() credentials: UserWithPasswordDto): Promise<UserDto> {
    return this.userManagementService.createNewUser(credentials);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  login(@Body() credentials: Credentials): Promise<Record<string, any>> {
    return this.userManagementService.login(credentials);
  }

  @Role(ROLES.CUSTOMER, ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @Patch(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updatedUser: PartialUser,
  ): Promise<PartialUser> {
    return this.userManagementService.updateUserById(id, updatedUser);
  }

  @Public()
  @Role(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @Delete()
  clearUserDB(): Promise<void> {
    return this.userManagementService.clearUserDB();
  }
}
