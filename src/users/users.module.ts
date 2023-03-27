import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserProfile, UserSkill } from './entities/user-profile';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants/jwt-constant';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RolesGuard } from './guard/user-roles.guard';



@Module({
  imports:[TypeOrmModule.forFeature([User,UserProfile,UserSkill]),
  // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // useFactory: () => ({
      //   secret: jwtConstants.secret,
      //   signOptions: {
      //     expiresIn: '7d',
      //   },
      // }),
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService,
               JwtStrategy,
               JwtRefreshStrategy,
    {
      provide:APP_INTERCEPTOR,
      useClass:CurrentUserInterceptor
    },
    {
      provide:APP_GUARD,
      useClass:RolesGuard
    }
  ]
})
export class UsersModule {}
