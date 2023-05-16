import { TryGettingApiResponse } from "@henrotaym/api-client/dist/responses";
import { Schema, z } from "zod";
import { PotentialResponse } from "../types";
import { ResponseStatus } from "../enums";

const useResponseParser = <TSchema extends Schema = Schema>({
  response,
  schema,
}: {
  response: TryGettingApiResponse<z.infer<TSchema>>;
  schema: TSchema;
}): PotentialResponse<TSchema> => {
  if (response.failed())
    return {
      success: false,
      status: ResponseStatus.API_ERROR,
      data: response.exception,
    };

  const parsed = schema.safeParse(response.get());

  if (!parsed.success)
    return {
      success: false,
      status: ResponseStatus.ZOD_ERROR,
      data: parsed.error,
    };

  return {
    success: true,
    status: ResponseStatus.OK,
    data: parsed.data,
  };
};

export default useResponseParser;
