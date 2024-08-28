import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {
  DefaultResponse,
  ExecuteGetParameters,
  ExecuteParameters,
  ExecutePatchPostPutParameters
} from "./execude-parameters";
import {filter, map, Observable} from "rxjs";
import {HttpRequestType} from "./http.types";
import {EnvironmentService} from "../../shared/services/envirment.service";
import {GetCookie} from "../functions/coockie.function";
import {SessionTokenKey} from "../../shared/constants/odd-session.constant";
import {AppConfig} from "../configs/app.config";

@Injectable()
export class HttpService {
  private readonly environmentService = inject(EnvironmentService);
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  public delete$<ResponseT, RequestT>(
    params: ExecutePatchPostPutParameters<RequestT>
  ): Observable<DefaultResponse<ResponseT>> {
    return this.execute$<ResponseT, RequestT>({
      ...params,
      method: HttpRequestType.DELETE,
    }).pipe(
      map((res) => {
        return {
          isError: false,
          isLoading: false,
          isSuccess: true,
          data: res,
        };
      })
    );
  }

  public get$<ResponseT>(
    params: ExecuteGetParameters
  ): Observable<DefaultResponse<ResponseT>> {
    return this.execute$<ResponseT, void>({
      ...params,
      method: HttpRequestType.GET,
    }).pipe(
      map((res) => {
        return {
          isError: false,
          isLoading: false,
          isSuccess: true,
          data: res,
        };
      })
    );
  }

  public post$<ResponseT, RequestT>(
    params: ExecutePatchPostPutParameters<RequestT>
  ): Observable<DefaultResponse<ResponseT>> {
    return this.execute$<ResponseT, RequestT>({
      ...params,
      method: HttpRequestType.POST,
    }).pipe(
      map((res) => {
        return {
          isError: false,
          isLoading: false,
          isSuccess: true,
          data: res,
        };
      })
    );
  }

  public put$<ResponseT, RequestT>(
    params: ExecutePatchPostPutParameters<RequestT>
  ): Observable<DefaultResponse<ResponseT>> {
    return this.execute$<ResponseT, RequestT>({
      ...params,
      method: HttpRequestType.POST,
    }).pipe(
      map((res) => {
        return {
          isError: false,
          isLoading: false,
          isSuccess: true,
          data: res,
        };
      })
    );
  }

  private execute$<ResponseT, RequestT>({
                                          body,
                                          method,
                                          path,
                                          customBaseUrl,
                                        }: ExecuteParameters<RequestT>): Observable<ResponseT> {
    let customUrl;

    let headers = new HttpHeaders();

    if (customBaseUrl) {
      customUrl = customBaseUrl + path;
    }

    const requestOptions = {
      headers,
      withCredentials: true,
    };

    const url = customUrl || this.environmentService.config.baseUrl + path;
    const request = new HttpRequest<RequestT>(
      method as string,
      url,
      body ?? null,
      requestOptions
    );
    console.log(request)
    return this.http.request<ResponseT>(request).pipe(
      filter(({ type }) => type === HttpEventType.Response),
      map((response) => {
        return (response as HttpResponse<ResponseT>).body as {
          data: unknown;
        }
      })
    ) as Observable<ResponseT>;
  }
}
