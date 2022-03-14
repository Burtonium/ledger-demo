import { Handler, HandlerMap, Method, Req, Res } from './types';

const allowedMethods = Object.values(Method).filter((k) => typeof k === 'string');

const notAllowed: Handler<{ message: string }> = (_req, res) => {
  res.setHeader('Allow', allowedMethods);
  res.status(405).json({ message: 'Method not allowed' });
}

export const handle = (map: HandlerMap) => (req: Req, res: Res<unknown>) => {
  const method = req.method as Method;
  const handler = (method && map[method]) || notAllowed;
  return handler(req, res);
}