import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token') ?? '';

  console.log(token);
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(request);
}