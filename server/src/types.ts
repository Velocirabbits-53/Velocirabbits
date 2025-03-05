import { Request, Response, NextFunction } from "express";


export interface AuthReq {
  username: string;
  password: string;
}

export interface AuthRes {
  [key: string]: string;
}

export interface PollReq {
  code: string;
  pollName: string;
  pollTopics: string[];
  createdBy: string;
}

export interface PollRes {
  
}


export interface PollParam {
  username: string;
  code: string ;
}

// export interface Controller<Req, Res, NextFunction> {
//   [key: string]: (req: Request<{ username: string }, {}, Req, {}>, res: Response<Res>, next: NextFunction) => Promise<any>;
// }
// TODO ^ this is what we had before and typescript didn't yell at us for randomly having "Req" within "req: Request" and "res" within "res: Response"- why was it fine and is our fix okay or is it just working cuz of something we aren't understanding

// export interface Controller<Req extends AuthReq | PollReq, Res extends AuthRes | PollRes, NextFunction> {
 // login: (req: Request<{},{},AuthReqBody>, res: Response<{},AuthResBody>, next : NextFunction) => Promise<any>;
  // register:(req: Request<{},{},AuthReqBody>, res: Response<{},AuthResBody>, next : NextFunction) => Promise<any>;
//   [key: string]: (req: Request<{ username: string, code: string }, {}, Req, {}>, res: Response<Res>, next: NextFunction) => Promise<any>;
// }
// ? 

export interface AuthController {
  [key: string]:  (
    req: Request<{}, {}, AuthReq>,
    res: Response<AuthRes>, 
    next: NextFunction
  ) => Promise<any>;
}

export interface PollController {
  [key: string]: (
    req: Request<PollParam, {}, PollReq>,
    res: Response<PollRes>, 
    next: NextFunction
  ) => Promise<any>;
}

export interface genController<P = {}, ReqBody = {}, ResBody = {}> {
  [key: string]: (req: Request<P, {}, ReqBody>, res: Response<ResBody>, next: NextFunction) => Promise<any>;
}

// import { Request, Response, NextFunction } from "express";
type Controller = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;


// /**
//  * Generic Controller Interface
//  * @template P - Route parameters (`req.params`)
//  * @template ReqBody - Request body (`req.body`)
//  * @template ResBody - Response body (`res.json()`)
//  */
// export interface Controller<P = {}, ReqBody = {}, ResBody = {}> {
//   [key: string]: (
//     req: Request<P, {}, ReqBody>,  // Route params, request body
//     res: Response<ResBody>,        // Response body
//     next: NextFunction             // Express next() function
//   ) => Promise<any>;
// }

