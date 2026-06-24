import { api } from '../api';
import type { paths } from '../../types/api';

// POST /log-check — score a pasted EAC/XLD rip log. Stateless on the server, so no
// cache tags: nothing to provide or invalidate.
type LogCheckBody = NonNullable<
  paths['/log-check']['post']['requestBody']
>['content']['application/json'];
export type LogCheckResult =
  paths['/log-check']['post']['responses'][200]['content']['application/json'];

export const logApi = api.injectEndpoints({
  endpoints: (build) => ({
    checkLog: build.mutation<LogCheckResult, LogCheckBody>({
      query: (body) => ({ url: '/log-check', method: 'POST', body })
    })
  })
});

export const { useCheckLogMutation } = logApi;
