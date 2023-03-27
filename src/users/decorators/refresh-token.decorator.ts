import { createParamDecorator } from "@nestjs/common/decorators";
import {  ExecutionContext }  from '@nestjs/common';

export const  RefreshToken = createParamDecorator(
    (data:never,context:ExecutionContext)=>{
        const request = context.switchToHttp().getRequest()
        return request.token
    }
)