import fetch from 'cross-fetch';

import { ResponseError } from './ResponseError';

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const JSON_POST_OPTIONS = {
  method: 'POST',
  headers: JSON_HEADERS,
};
const JSON_PUT_OPTIONS = {
  method: 'PUT',
  headers: JSON_HEADERS,
};

/**
 * A re-usable client to make API requests.
 */
export class ApiClient {
  private _apiHost: string;
  private _userKey: string;
  private _endpoint: string;
  // private _fieldMapping: { [key: string]: T };
  private _fieldMapping: Record<string, Record<string, string>>;

  constructor(endpoint = '') {
    this._apiHost = '';
    this._userKey = '';
    this._endpoint = endpoint;
    this._fieldMapping = {};
  }

  /**
   * Extract errors from response.
   *
   * @param response Response to extract errors from.
   *
   * @returns The response, if there are no errors.
   */
  static handleErrors(response: Response): Response {
    if (!response.ok) {
      throw new ResponseError(response);
    }

    return response;
  }

  /**
   * Map parameters passed to function, to those accepted by the API.
   *
   * @param params Params to map to API payload.
   * @param key The mapping key.
   */
  public mapParamsToApi(params: Record<string, unknown>, key: string): Record<string, unknown> {
    const mapping = this.fieldMapping[key];

    return Object.entries(params).reduce(
      (prev, [key, value]) => ({
        ...prev,
        [mapping[key] || key]: value,
      }),
      {},
    );
  }

  /**
   * Make an HTTP API Request.
   *
   * @param url Relative URL for the request.
   * @param options Fetch options e.g. headers, method etc.
   *
   * @returns A Response object wrapped in a Promise.
   */
  async makeRequest(url: RequestInfo = '', options?: any): Promise<Response> {
    const response = await fetch(`${this.apiHost}/api${this.endpoint}${url}`, {
      credentials: 'include',
      ...options,
      headers: {
        Accept: 'application/json',
        ...options?.headers,
      },
    });

    ApiClient.handleErrors(response);

    return response;
  }

  /**
   * Make an HTTP POST API Request.
   *
   * @param url Relative URL for the request.
   * @param body Parameters to send as request body.
   *
   * @returns A Response object wrapped in a Promise.
   */
  async makePostRequest(url = '', body = {}): Promise<any> {
    const response = await this.makeRequest(url, {
      ...JSON_POST_OPTIONS,
      body: JSON.stringify(body),
    });

    return response.json();
  }

  /**
   * Make an authenticated HTTP API Request.
   *
   * @param url Relative URL for the request.
   * @param options Fetch options e.g. headers, method etc.
   *
   * @returns A Response object wrapped in a Promise.
   */
  async makeAuthenticatedRequest(url: RequestInfo = '', options: any): Promise<any> {
    return this.makeRequest(url, {
      ...options,
      headers: {
        Authorization: `Token ${this.userKey}`,
        ...options.headers,
      },
    });
  }

  /**
   * Make an authenticated HTTP POST API Request.
   *
   * @param url Relative URL for the request.
   * @param body Parameters to send as request body.
   *
   * @returns A Response object wrapped in a Promise.
   */
  async makeAuthenticatedPostRequest(url = '', body = {}): Promise<unknown> {
    const response = await this.makeAuthenticatedRequest(url, {
      ...JSON_POST_OPTIONS,
      body: JSON.stringify(body),
    });

    return response.json();
  }

  /**
   * Make an authenticated HTTP PUT API Request.
   *
   * @param url Relative URL for the request.
   * @param body Parameters to send as request body.
   *
   * @returns A Response object wrapped in a Promise.
   */
  async makeAuthenticatedPutRequest(url: RequestInfo = '', body = {}): Promise<unknown> {
    const response = await this.makeAuthenticatedRequest(url, {
      ...JSON_PUT_OPTIONS,
      body: JSON.stringify(body),
    });

    return response.json();
  }

  public get apiHost(): string {
    return this._apiHost;
  }

  public set apiHost(apiHost: string) {
    this._apiHost = apiHost;
  }

  public get userKey(): string {
    return this._userKey;
  }

  public set userKey(userKey: string) {
    this._userKey = userKey;
  }

  public get endpoint(): string {
    return this._endpoint;
  }

  public set endpoint(endpoint: string) {
    this._endpoint = endpoint;
  }

  public get fieldMapping(): Record<string, Record<string, string>> {
    return this._fieldMapping;
  }

  public set fieldMapping(fieldMapping: Record<string, Record<string, string>>) {
    this._fieldMapping = fieldMapping;
  }
}
