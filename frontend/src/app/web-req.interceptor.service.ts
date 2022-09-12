import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, Subject, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  refreshingAccessToken: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 401) {

          return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                request = this.addAuthHeader(request);
                return next.handle(request);
              }),
              catchError((err: any) => {
                console.log(err);
                this.authService.logout();
                return EMPTY;
              })
            )
        }

        return throwError(() => new Error('test')); 
      })
    )
  }

  refreshAccessToken() {

    if(this.refreshingAccessToken){
        return new Observable(observer => {
            this.accessTokenRefreshed.subscribe(() => {
                observer.next();
                observer.complete(); 
            })
        })
    }
    else{
        this.refreshingAccessToken = true;
        return this.authService.getNewAccessToken().pipe(
            tap(() => {
                this.refreshingAccessToken = false;
                this.accessTokenRefreshed.next("");
                console.log("refreshed");
            })
        )
    }

  }

  addAuthHeader(request: HttpRequest<any>) {
    // get the access token
    const token = this.authService.getAccessToken();

    if (token) {
      // append the access token to the request header
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }

}
