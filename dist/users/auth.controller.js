"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const create_user_dto_1 = require("./dto/create-user.dto");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./guard/jwt-auth.guard");
const refresh_token_decorator_1 = require("./decorators/refresh-token.decorator");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const jwt_refresh_guard_1 = require("./guard/jwt-refresh.guard");
const session_token_decorator_1 = require("./decorators/session-token.decorator");
const user_password_dto_1 = require("./dto/user-password.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signup(createUserDto, session) {
        const token = await this.authService.create(createUserDto);
        session.refresh_token = token.refreshToken;
        return { accessToken: token.accessToken };
    }
    async signin(loginUserDto, session) {
        const { token, user } = await this.authService.signin(loginUserDto);
        session.refresh_token = token.refreshToken;
        return Object.assign(Object.assign({}, token), { userId: user.id });
    }
    async refreshToken(user, refresh_token, session_token, session) {
        if (refresh_token !== session_token) {
            throw new common_1.UnauthorizedException();
        }
        const token = await this.authService.refreshToken(user.userId, refresh_token);
        session.refresh_token = token.refreshToken;
        return token;
    }
    change_password(user, changepassword) {
        const { password } = changepassword;
        const { userId } = user;
        return this.authService.ChangePassword(userId, password);
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshAuthGuard),
    (0, common_1.Post)('refresh_token'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, refresh_token_decorator_1.RefreshToken)()),
    __param(2, (0, session_token_decorator_1.SessionToken)()),
    __param(3, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/change_password'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "change_password", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map