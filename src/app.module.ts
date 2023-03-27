
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User,UserSkill } from './users/entities/user.entity';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    database:'developer',
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "103288",
    entities:[User,UserSkill],
    synchronize:true,
  }),
  UsersModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
