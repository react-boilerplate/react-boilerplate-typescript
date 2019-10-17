import {
  ReposListForksResponseItem,
  SearchReposResponseItemsItemOwner,
} from '@octokit/rest';

interface Owner extends SearchReposResponseItemsItemOwner {
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  site_admin: boolean;
}

export interface Repo extends Partial<ReposListForksResponseItem> {
  owner: Owner;
  forks: number;
  open_issues: number;
  watchers: number;
}
