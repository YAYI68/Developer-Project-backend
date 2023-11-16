"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const decorators_1 = require("@nestjs/common/decorators");
exports.RefreshToken = (0, decorators_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.token;
});
//# sourceMappingURL=refresh-token.decorator.js.map