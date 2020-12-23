import { useCallback } from 'react';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import { pipe, identity } from 'fp-ts/lib/function';
import * as RD from '@devexperts/remote-data-ts';
import { useQuery, QueryKey, QueryObserverResult, RefetchOptions } from 'react-query';

const TEToThrow = <A, E>(
  f: TE.TaskEither<E, A>,
  toError: (e: E) => string = String
) => async (): Promise<A> => {
  const result = await f();
  return pipe(
    result,
    E.fold(err => {
      throw new Error(toError(err));
    }, identity)
  );
};

const rq2rd = <A, E>({
  status,
  error,
  data
}: QueryObserverResult<A, E>): RD.RemoteData<E, A> => {
  if (status === 'loading') return RD.pending;
  if (status === 'error') {
    /* Here status === 'error' indicates a non-null error,
     * but react-query seems to be poorly typed */
    return RD.failure(error as E);
  }
  if (status === 'success') {
    /* Same here */
    return RD.success(data as A);
  }
  return RD.initial;
};

const liftRefetch = <A, E>(
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<A, E>>
) => async (options?: RefetchOptions): Promise<RD.RemoteData<E, A>> =>
  pipe(await refetch(options), rq2rd);

const useRemoteData = <A, E>(
  queryKey: QueryKey,
  f: TE.TaskEither<E, A>,
  immediate: boolean = false,
  toError?: (e: E) => string
): [RD.RemoteData<E, A>, () => void, QueryObserverResult<A, E>] => {
  const remoteData = useQuery<A, E, A>(queryKey, TEToThrow(f, toError), {
    enabled: immediate
  });
  return [rq2rd(remoteData), liftRefetch(remoteData.refetch), remoteData];
};

export default useRemoteData;
