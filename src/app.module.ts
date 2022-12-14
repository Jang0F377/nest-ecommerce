import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserManagementModule } from './user-management/user-management.module';
import { ProductModule } from './product/product.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

// let uri: string =
//   process.env.NODE_ENV === 'development'
//     ? 'mongodb://localhost:27017/nest-mongodb'
//     : 'mongodb://root:pass1234@nest-mongodb:27017';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot('mongodb://root:pass1234@nest-mongodb:27017'),
    CommonModule,
    UserManagementModule,
    ProductModule,
    ShoppingCartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
