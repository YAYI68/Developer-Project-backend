import { UsersService } from '../users.service';

import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
}  from '@nestjs/common';
import { Observable } from 'rxjs';
import { Injectable } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';

 @Injectable()
 export class CurrentUserInterceptor implements NestInterceptor {
    constructor( ){}

   async intercept(context: ExecutionContext, next: CallHandler<any>) {
        // Run before any route handlers
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.replace('Bearer ','').trim();
        if(token){
            request.token = token
        }
       
        return next.handle()
    }
}
