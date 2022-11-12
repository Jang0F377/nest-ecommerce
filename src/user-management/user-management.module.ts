import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.model';
import {
  UserWithPassword,
  UserWithPasswordSchema,
} from 'src/models/user-with-password.model';
import { CRUDService } from 'src/common/services/crud.service';
import { JWTService } from 'src/common/services/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserWithPassword.name,
        schema: UserWithPasswordSchema,
      },
    ]),
  ],
  exports: [UserManagementService],
  providers: [UserManagementService, CRUDService, JWTService],
  controllers: [UserManagementController],
})
export class UserManagementModule {}
