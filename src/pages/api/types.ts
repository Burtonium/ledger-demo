import type { NextApiRequest, NextApiResponse } from 'next';

export type Req = NextApiRequest;
export type Res<T = any> = NextApiResponse<T>;
export type Handler<ResType = any> = (req: Req, res: Res<ResType>) => Promise<void> | void;

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT'
}

type EnumMap<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export type HandlerMap = Partial<EnumMap<Method, Handler<unknown>>>;

