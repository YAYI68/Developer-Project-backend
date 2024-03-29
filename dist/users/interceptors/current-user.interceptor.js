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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserInterceptor = void 0;
const decorators_1 = require("@nestjs/common/decorators");
let CurrentUserInterceptor = class CurrentUserInterceptor {
    constructor() { }
    async intercept(context, next) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '').trim();
        if (token) {
            request.token = token;
        }
        return next.handle();
    }
};
CurrentUserInterceptor = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CurrentUserInterceptor);
exports.CurrentUserInterceptor = CurrentUserInterceptor;
//# sourceMappingURL=current-user.interceptor.js.map