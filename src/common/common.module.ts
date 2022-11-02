import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CatchAllFilter } from './filters/catch-all.filter';
import { UnauthorizedFilter } from './filters/unauthorized.filter';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './middleware/logging.interceptor';
import { CRUDService } from './services/crud.service';
import { JWTService } from './services/jwt.service';

@Global()
@Module({
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: UnauthorizedFilter },
    { provide: APP_FILTER, useClass: CatchAllFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    CRUDService,
    JWTService,
  ],
})
export class CommonModule {}
