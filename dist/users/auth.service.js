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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const jwt_constant_1 = require("./contants/jwt-constant");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const existUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (existUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashpassword = await this.hashData(createUserDto.password);
        const user = this.userRepository.create(Object.assign(Object.assign({}, createUserDto), { password: hashpassword }));
        const currentUser = await this.userRepository.save(user);
        const payload = { userId: currentUser.id, role: currentUser.role };
        const token = await this.getTokens(payload);
        return token;
    }
    async hashData(data) {
        const salt = await bcrypt.genSalt();
        const hashData = await bcrypt.hash(data, salt);
        return hashData;
    }
    async verifyHash(data, hashData) {
        const isValid = await bcrypt.compare(data, hashData);
        return isValid;
    }
    async signin(loginUser) {
        const { email, password } = loginUser;
        const user = await this.userRepository.findOne({ where: { email },
            select: {
                id: true,
                password: true,
                role: true
            }
        });
        if (!user) {
            throw new common_1.BadRequestException('invalid email/password');
        }
        const isValid = await this.verifyHash(password, user.password);
        if (user && isValid) {
            const { id, role } = user;
            const payload = { userId: id, role };
            const token = await this.getTokens(payload);
            return { token, user };
        }
        throw new common_1.BadRequestException('invalid email/password');
    }
    async ChangePassword(userId, password) {
        try {
            const hashpassword = await this.hashData(password);
            await this.userRepository.update({ id: userId }, { password: hashpassword });
            return { message: 'Password updated successfully' };
        }
        catch (err) {
            throw new common_1.BadRequestException();
        }
    }
    async refreshToken(userId, refresh) {
        if (userId && refresh) {
            const user = await this.userRepository.findOne({ where: { id: userId },
                select: {
                    id: true,
                    role: true,
                    password: true,
                }
            });
            const { id, role } = user;
            const payload = { userId: id, role };
            const token = await this.getTokens(payload);
            return token;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async getTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: jwt_constant_1.jwtConstants.secret,
                expiresIn: '5m'
            }),
            this.jwtService.signAsync(payload, {
                secret: jwt_constant_1.jwtConstants.secret,
                expiresIn: '7d'
            })
        ]);
        return { accessToken, refreshToken };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map