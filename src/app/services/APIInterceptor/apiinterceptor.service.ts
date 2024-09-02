import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function APIInterceptorService(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const baseUrl: string = 'https://fakestoreapi.com';

  // Clone the request to add the new URL
  const clonedRequest = req.clone({
    url: `${baseUrl}${req.url}`,
  });

  // Pass the cloned request to the next handler
  return next(clonedRequest);
}
