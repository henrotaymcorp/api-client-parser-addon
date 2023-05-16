import RequestRelatedException from "@henrotaym/api-client/dist/exceptions/RequestRelatedException";
import { Schema, ZodError, z } from "zod";
import { ResponseStatus } from "../enums";

export type ApiErrorResponse<TSchema extends Schema = Schema> = {
  success: false;
  status: ResponseStatus.API_ERROR;
  data: RequestRelatedException<z.infer<TSchema>>;
};

export type ZodErrorResponse<TSchema extends Schema = Schema> = {
  success: false;
  status: ResponseStatus.ZOD_ERROR;
  data: ZodError<z.infer<TSchema>>;
};

export type ErrorResponse<TSchema extends Schema = Schema> =
  | ZodErrorResponse<TSchema>
  | ApiErrorResponse<TSchema>;

export type SuccessResponse<TSchema extends Schema = Schema> = {
  success: true;
  status: ResponseStatus.OK;
  data: z.infer<TSchema>;
};

export type PotentialResponse<TSchema extends Schema = Schema> =
  | SuccessResponse<TSchema>
  | ErrorResponse<TSchema>;
