import { NextFunction as ExpressNext, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import {
    Request,
    Response,
    Next,
    Err,
    Middleware
} from '@tsed/common';

@Middleware()
export default class GlobalErrorHandlerMiddleware {
    use(@Err() error: any,
        @Request() request: ExpressRequest,
        @Response() response: ExpressResponse,
        @Next() next: ExpressNext
    ): any {
        console.log(error);
    
        let errorObject = {
            statusCode: 500,
            message: 'Internal Server Error',
            errorCode: 'internalServerError'
        };

        if (error.message) {
            errorObject.message = error.message;
        }

        if (error.status) {
            errorObject.statusCode = error.status;
            response.statusCode = error.status;
        }

        if (error.errorCode) {
            errorObject.errorCode = error.errorCode;
        }

        response.json(errorObject);
    }
}
