import { createParamDecorator } from "@nestjs/common/decorators";
import {  ExecutionContext }  from '@nestjs/common';

export const  CurrentUser = createParamDecorator(
    (data:never,context:ExecutionContext)=>{
        const request = context.switchToHttp().getRequest()
        return request.user
    }
)