# api-client-parser-addon
api-client-parser-addon

## Installation
```shell
yarn add @henrotaymcorp/api-client-parser-addon
```

## Usage
```typescript
import { ResponseStatus, useResponseParser } from "./lib";
import { z } from "zod";
import { Client, Request } from "@henrotaym/api-client";

// Defining response schema.
const responseSchema = z.object({
  document: z.object({
    name: z.string(),
    uuid: z.string(),
  }),
});

// Defining endpoint.
const fetchDocument = async () =>
  useResponseParser({
    response: await new Client().try(new Request()),
    schema: responseSchema,
  });

// Using endpoint response.
const { data, status } = await fetchDocument();
if (status === ResponseStatus.API_ERROR) return; // RequestRelatedException<{ document: { name: string; uuid: string; }; } }
if (status === ResponseStatus.ZOD_ERROR) return; // ZodError<{ document: { name: string; uuid: string; } }
new Model(data); // SUCCESS => { document: {  name: string; uuid: string; };
```

## Development
```shell
./cli bootstrap #bootstrap project
./cli yarn install #install dependencies
./cli start #start project
./cli stop #stop project
./cli restart  #restart project
```