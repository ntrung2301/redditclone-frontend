import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoginResponsePayload } from './auth/login/login.response.payload';
import { AuthService } from './auth/shared/auth.service';

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {
    
    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) {}

    /**
     * Intercept each HTTP request before sent to the Backend 
     * Check whether the JWT token is expired and generate a new one
     * Handle any authentication error
     * @param req 
     * @param next 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /* If the request includes either 'refresh' or 'login', then forward it to the backend (these requests does not need jwt)*/
        if(req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        const jwtToken = this.authService.getJwtToken();
        if(jwtToken) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 403) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
                }
            }));
        }
        return next.handle(req);    
        }

    /**
     * Call the refreshToken() method to generate a new token
     * 
     * @param req 
     * @param next 
     */
    handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);
            
            return this.authService.refreshToken().pipe(switchMap((refreshTokenResponse: LoginResponsePayload) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken))
                })
            )
        } else {
            this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap(rs => {
                    return next.handle(this.addToken(req, this.authService.getJwtToken()));
                })
            );
        }
    }

    /**
     * Clone the request and add Authorization header to the request
     * @param req
     * @param jwtToken 
     */
    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
        });
    }
}
