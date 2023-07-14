import { NextFunction, Request, Response } from 'express';

import responses from '../utils/responses';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
require('dotenv').config();

interface Role {
  name: string;
  // Other properties of the Role interface, if any
}

const accessPermissions: { [key: string]: string[] } = {
  '/list': ['user','admin'],
  '/user/profile': ['admin', 'writer'],
  '/test/test': ['admin', 'writer'],
  '/create':['admin', 'writer'],
};

export const isUserAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: any = req.headers.token;

    if (!token) {
      return responses.unauthorizedResponse(res, 'Unauthorized');
    }

    const decoded = jwt.verify(token, `${process.env.CLIENT_SECRET}`);
    console.log('decoded', decoded);

    const id = (<any>decoded).id;
    const role_list: Role[] = (<any>decoded).role_list;
    const roleNames = role_list.map((role) => role.name);

    // ['reader], ['admin', 'reader']

    // Get requested route
    const requestedRoute = req.path;
    console.log('requestedRoute', requestedRoute, roleNames, accessPermissions[requestedRoute]);

    if (
      !accessPermissions[requestedRoute] ||
      accessPermissions[requestedRoute].filter((r) => roleNames.includes(r))
        .length === 0
    ) {
      console.log("Forbidden");
      
      return responses.unauthorizedResponse(res, null, 'Forbidden')
    }

    User.findById(id, (err: any, user: Express.User | undefined) => {
      if (err) {
        return responses.serverErrorResponse(res, 'Server Error');
      }
      if (!user) {
        return responses.unauthorizedResponse(res, 'Unauthorized');
      }
      req.user = user;
    });
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  } catch (error) {
    console.log(error);

    return responses.serverErrorResponse(res, 'Server Error');
  }
};
