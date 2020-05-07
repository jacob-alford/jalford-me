import { forkJoin, ObservableInput } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { tap, mapTo, mergeMap, map } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { INITIAL_LOAD, UPDATE_POSTS } from '../state-model/_actors';
import { blogPost } from '../state-model/_types';
import { getRandomUID } from 'functions';

const fetchGitHubObject = (path: string) =>
  ajax(`https://api.github.com/repos/jacob-alford/authorship/contents/${path}`);

const fetchCategoryPaths = (domain: string) =>
  mergeMap(
    () => fetchGitHubObject(domain),
    (
      passthrough: {
        pathList: string[];
        partialPosts: Partial<blogPost>[];
      },
      ajax: { response: { path: string }[] }
    ) => ({
      partialPosts: passthrough.partialPosts,
      pathList: ajax.response.map((post: { path: string }) => post.path)
    })
  );

const fetchPathContent = (category: string) =>
  mergeMap(
    ({ pathList }) => forkJoin(pathList.map((path: string) => fetchGitHubObject(path))),
    (
      passthrough: {
        pathList: string[];
        partialPosts: Partial<blogPost>[];
      },
      responses: { response: { content: string; name: string } }[]
    ): { partialPosts: Partial<blogPost>[]; pathList: string[] } => ({
      partialPosts: [
        ...passthrough.partialPosts,
        ...responses.map(ajax => ({
          body: atob(ajax.response.content),
          id: ajax.response.name.split('.md')[0],
          category
        }))
      ],
      pathList: []
    })
  );

/*
 * Fetches blog posts after initial render
 * in: INITIAL_LOAD()
 * out: UPDATE_POSTS(post[])
 */
export const fetchBlogPosts: Epic = action$ =>
  action$.pipe(
    ofType(INITIAL_LOAD),
    mapTo<
      { type: [string, string] },
      { pathList: string[]; partialPosts: Partial<blogPost>[] }
    >({
      pathList: [],
      partialPosts: []
    }),
    /* Fetch list of posts */
    fetchCategoryPaths('philosophy'),
    fetchPathContent('philosophy'),
    fetchCategoryPaths('the-duncan-strauss-mysteries'),
    fetchPathContent('the-duncan-strauss-mysteries'),
    tap(val => console.info(val)),
    mapTo({
      type: UPDATE_POSTS,
      payload: []
    })
  );
