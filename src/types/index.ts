export interface CommonSliceState {
  loading: boolean;
}

export interface AuthSliceState {
  accessToken?: string;
  refreshToken?: string;
}

export interface UseInfoType {
  name: string;
  userid: string;
  email: string;
  signature: string;
  introduction: string;
  title: string;
  token: string;
  rule: 'test' | 'admin';
}
