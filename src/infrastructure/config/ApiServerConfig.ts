import { get } from 'env-var'

export class ApiServerConfig {
  
  public static readonly HOST: string = get('API_HOST').required().asString();
  
  public static readonly PORT: number = get('API_PORT').required().asPortNumber();
  
  public static readonly ACCESS_TOKEN_SECRET: string = get('API_ACCESS_TOKEN_SECRET').required().asString();
  
  public static readonly ACCESS_TOKEN_TTL_IN_MINUTES: number = get('API_ACCESS_TOKEN_TTL_IN_MINUTES').required().asInt();
  
  public static readonly ACCESS_TOKEN_HEADER: string = get('API_ACCESS_TOKEN_HEADER').required().asString();
  
  public static readonly LOGIN_USERNAME_FIELD: string = get('API_LOGIN_USERNAME_FIELD').required().asString();
  
  public static readonly LOGIN_PASSWORD_FIELD: string = get('API_LOGIN_PASSWORD_FIELD').required().asString();
  
  public static readonly LOG_ENABLE: boolean = get('API_LOG_ENABLE').required().asBool();

  public static readonly KAKAO_API_KEY: string = get('KAKAO_REST_API_KEY').required().asString();

  public static readonly KAKAO_REDIRECT_URL: string = get('KAKAO_REDIRECT_URL').required().asString();

  public static readonly APPLE_CLIENTID: string = get('APPLE_CLIENTID').required().asString();

  public static readonly APPLE_TEAMID: string = get('APPLE_TEAMID').required().asString();

  public static readonly APPLE_KEYID: string = get('APPLE_KEYID').required().asString();

  public static readonly APPLE_REDIRECT_URL: string = get('APPLE_REDIRECT_URL').required().asString();

  public static readonly APPLE_PRIVATE_KEY: string = get('APPLE_PRIVATE_KEY').required().asString();
  
}
