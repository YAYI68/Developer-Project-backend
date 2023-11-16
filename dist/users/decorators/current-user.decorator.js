"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const decorators_1 = require("@nestjs/common/decorators");
exports.CurrentUser = (0, decorators_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=current-user.decorator.js.map