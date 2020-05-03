import { tap } from 'rxjs/operators';

export const devLog = (cb: (val: any) => void) => {
  if (process.env.NODE_ENV === 'development') return tap(cb);
  else return tap(() => {});
};
