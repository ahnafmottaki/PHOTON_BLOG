import { Response } from "express";

class ApiResponse {
  public success = true;
  constructor(
    public statusCode: number,
    public message: string,
    public data: any = null
  ) {}
  sendResponse(res: Response) {
    res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      ...(this.data ? { data: this.data } : {}),
    });
  }
}
export default ApiResponse;
