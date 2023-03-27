
import { 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
}  from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer'

 class SerializerInterceptor implements NestInterceptor {
    constructor(private dto:any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run before any route handlers
       
        return next.handle().pipe(
            map((data: any)=>{
                
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues: true,
                })
            })
        )
    }
}

interface ClassContructor {
    new (...args: any[]):{}
}
export function Serialize(dto:ClassContructor){
    return UseInterceptors(new SerializerInterceptor(dto))
}