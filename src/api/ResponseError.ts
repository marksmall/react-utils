/**
 * A class to represent errors received from the API.
 */
export class ResponseError extends Error {
  status: number;
  response: Response;

  constructor(response: Response) {
    super(response.statusText);

    this.status = response.status;
    this.response = response;
  }

  /**
   * Extract API errors from the response, into an array of strings.
   *
   * @returns The errors as a Promise.
   */
  async getErrors(): Promise<string[] | undefined> {
    const body = await this.response.json();
    // console.log('BODY: ', body);

    if (!body.errors && !body.non_field_errors) {
      return;
    }

    let errorMessages: string[] = [];
    if (body.non_field_errors) {
      // console.log('NON FIELD ERRORS: ', body.non_field_errors);
      errorMessages = [...errorMessages, ...body.non_field_errors];
    }

    if (body.errors) {
      Object.keys(body.errors).forEach(key => {
        // console.log('BODY ERRORS: ', body.errors);
        errorMessages = [...errorMessages, ...body.errors[key]];
      });
    }
    // console.log('ERROR MESSAGES');

    return errorMessages;
  }
}
