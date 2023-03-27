import { createParamDecorator } from "@nestjs/common/decorators";
import {  ExecutionContext }  from '@nestjs/common';

export const  SessionToken = createParamDecorator(
    (data:never,context:ExecutionContext)=>{
        const request = context.switchToHttp().getRequest()
        return request.session.refresh_token
    }
)