import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class CurrentUserInterceptor implements NestInterceptor {
    constructor();
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}
