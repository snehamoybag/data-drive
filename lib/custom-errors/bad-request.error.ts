class ErrorBadRequest extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.name = "ErrorBadRequest";
    this.status = 400;
  }
}

export default ErrorBadRequest;
