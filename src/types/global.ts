export enum ERoute {
  ROOT = '/',
  HOME = '/home',
  SETTINGS_ACCOUNT = '/settings-account',
  SETTINGS_DETAILS = '/settings-details',
}

export type TRoute = {
  path: ERoute;
  Icon?: React.FC | React.JSX.Element;
  Component: React.FC; // React components have to be written in Capitalized!
};

export type PathParams = { [i: string]: string };

export enum ActionResultStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type ActionSuccess<T> = {
  status: ActionResultStatus.SUCCESS;
  result: T;
};
export type ActionError = {
  status: ActionResultStatus.ERROR;
  error: any;
  knownErrors: { [key: string]: string };
};
