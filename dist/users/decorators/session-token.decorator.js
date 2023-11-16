"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionToken = void 0;
const decorators_1 = require("@nestjs/common/decorators");
exports.SessionToken = (0, decorators_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.session.refresh_token;
});
//# sourceMappingURL=session-token.decorator.js.map