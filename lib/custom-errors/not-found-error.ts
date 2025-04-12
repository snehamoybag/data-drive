class ErrorNotFound extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.name = "ErrorNotFound";
    this.status = 404;
  }
}

export default ErrorNotFound;
