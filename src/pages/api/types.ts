import type { NextApiRequest, NextApiResponse } from 'next';

export type Req = NextApiRequest;
export type Res<T = any> = NextApiResponse<T>;
export type Handler<ResType = any> = (req: Req, res: Res<ResType>) => Promise<void> | void;

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT'
}

export type HandlerMap = Partial<Record<Method, Handler<unknown>>>;

