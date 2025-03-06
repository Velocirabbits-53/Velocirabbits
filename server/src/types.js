"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
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
