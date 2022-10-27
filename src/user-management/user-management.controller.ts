import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { PartialUser } from 'src/models/dto/partialTypes';
import { UserWithPasswordDto } from 'src/models/dto/user-with-password.dto';
import { UserDto } from 'src/models/dto/user.dto';
import { Credentials, ROLES } from 'src/utils/constants';
import { UserManagementService } from './user-management.service';

@Controller('users')
export class UserManagementController {
  constructor(private userManagementService: UserManagementService) {}

  @Role(ROLES.ADMIN, ROLES.CUSTOMER)
  @Get('me')
  returnCurrentUser() {}

  @Role(ROLES.ADMIN, ROLES.CUSTOMER)
  @Get()
  returnAllUsers(): Promise<UserDto[]> {
    return this.userManagementService.returnAllUsers();
  }

  @Role(ROLES.ADMIN)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<any> {
    return this.userManagementService.getUserById(id);
  }

  @Public()
  @Post()
  createNewUser(@Body() credentials: Credentials): Promise<UserDto> {
    return this.userManagementService.createNewUser(credentials);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  login(@Body() credentials: Credentials): Promise<Record<string, any>> {
    return this.userManagementService.login(credentials);
  }

  @Patch(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updatedUser: PartialUser,
  ): Promise<PartialUser> {
    return this.userManagementService.updateUserById(id, updatedUser);
  }
}
