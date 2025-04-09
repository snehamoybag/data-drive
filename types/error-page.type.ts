export default interface ErrorPageData {
  name: string;
  message: string;
  statusCode: number;
  redirect: {
    path: string;
    text: string;
  };
}
