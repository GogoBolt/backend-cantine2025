declare module '@nhost/nhost-js' {
  export interface NhostSession {
    accessToken: string;
    refreshToken: string;
    user: NhostUser;
  }

  export interface NhostUser {
    id: string;
    email: string;
    displayName?: string;
    metadata?: Record<string, any>;
    roles?: string[];
  }

  export interface AuthResponse {
    session: NhostSession | null;
    error: Error | null;
  }

  export interface GraphQLResponse<T = any> {
    data: T;
    error?: {
      message: string;
      extensions?: Record<string, any>;
    };
  }

  export interface SignUpParams {
    email: string;
    password: string;
    options?: {
      defaultRole?: string;
      allowedRoles?: string[];
      displayName?: string;
      metadata?: Record<string, any>;
      locale?: string;
    };
  }

  export interface SignInParams {
    email: string;
    password: string;
  }

  export interface NhostAuthClient {
    signIn(params: SignInParams): Promise<AuthResponse>;
    signUp(params: SignUpParams): Promise<AuthResponse>;
    signOut(): Promise<{ error: Error | null }>;
    isAuthenticated(): boolean;
    getSession(): NhostSession | null;
  }

  export interface NhostGraphQLClient {
    request: <T = any>(query: string, variables?: Record<string, any>) => Promise<GraphQLResponse<T>>;
  }

  export interface NhostClient {
    auth: NhostAuthClient;
    graphql: NhostGraphQLClient;
    storage: {
      upload: (file: File, path?: string) => Promise<{ fileMetadata: any; error: Error | null }>;
      getPublicUrl: (fileId: string) => string;
    };
  }

  export interface NhostClientConstructorParams {
    subdomain?: string;
    region?: string;
    backendUrl?: string;
  }

  export class NhostClient {
    constructor(params: NhostClientConstructorParams);
    auth: NhostAuthClient;
  }
}
