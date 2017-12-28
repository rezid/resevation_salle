import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs/Subject';

// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';

@Injectable()
export class HttpService extends Http {
  public loading = new Subject<{
    loading: boolean,
    hasError: boolean,
    hasMsg: string
  }>();

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
  ) {
    super(backend, defaultOptions);
  }


  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }


  get(url: string, options?: RequestOptionsArgs): Observable<any> {

    console.log(this.getFullUrl(url));
    console.log(this.requestOptions(options));

    this.requestInterceptor();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  getLocal(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {

    console.log(this.getFullUrl(url));
    console.log(body);
    console.log(this.requestOptions(options));


    this.requestInterceptor();
    return super.post(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {

    console.log(this.getFullUrl(url));
    console.log(body);
    console.log(this.requestOptions(options));

    this.requestInterceptor();
    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {

    console.log(this.getFullUrl(url));
    console.log(this.requestOptions(options));

    this.requestInterceptor();
    return super.delete(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }


  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      const uid: string = localStorage.getItem('uid') !== 'undefined' ? localStorage.getItem('uid') : undefined;
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'uid': uid
      });
    }
    return options;
  }


  private getFullUrl(url: string): string {
    return environment.API_ENDPOINT + url;
  }


  private requestInterceptor(): void {
    console.log('Sending Request');
    // this.loaderService.showPreloader();
    this.loading.next({
      loading: true, hasError: false, hasMsg: ''
    });
  }


  private responseInterceptor(): void {
    console.log('Request Complete');
    // this.loaderService.hidePreloader();
  }


  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    console.log('Something went terrible wrong and error is', error);
    // this.loaderService.popError();
    return Observable.of(error);
  }


  private onSubscribeSuccess(res: Response): void {
    this.loading.next({
      loading: false, hasError: false, hasMsg: ''
    });
  }


  private onSubscribeError(error: any): void {
    console.log('Something Went wrong while subscribing', error);
    // this.loaderService.popError();
    this.loading.next({
      loading: false, hasError: true, hasMsg: 'Something went wrong'
    });
  }


  private onFinally(): void {
    this.responseInterceptor();
  }
}
