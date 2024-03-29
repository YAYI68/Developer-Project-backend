import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import {
  Controller,
  Post,
  Body,
  Patch,
  Session,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshToken } from './decorators/refresh-token.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh.guard';
import { SessionToken } from './decorators/session-token.decorator';
import { ChangePasswordDto } from './dto/user-password.dto';
import { CurrentUserInterface } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const token = await this.authService.create(createUserDto);
    session.refresh_token = token.refreshToken;
    return { accessToken: token.accessToken };
  }

  @Post('signin')
  async signin(@Body() loginUserDto: LoginUserDto, @Session() session: any) {
    const { token, user } = await this.authService.signin(loginUserDto);
    session.refresh_token = token.refreshToken;
    return { ...token, userId: user.id };
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh_token')
  async refreshToken(
    @CurrentUser() user: any,
    @RefreshToken() refresh_token: string,
    @SessionToken() session_token: string,
    @Session() session: any,
  ) {
    if (refresh_token !== session_token) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.refreshToken(
      user.userId,
      refresh_token,
    );
    session.refresh_token = token.refreshToken;
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/change_password')
  change_password(
    @CurrentUser() user: CurrentUserInterface,
    @Body() changepassword: ChangePasswordDto,
  ) {
    const { password } = changepassword;
    const { userId } = user;

    return this.authService.ChangePassword(userId, password);
  }
}
