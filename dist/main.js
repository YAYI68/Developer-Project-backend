"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('/api/v1');
    app.use(session({
        secret: process.env.jwtsecret,
        resave: false,
        saveUninitialized: false,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map