import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { IRefreshTokenResponse, IloginUserResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { refreshToken, ...others } = result;
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'prouction',
    httpOnly: true,
  };
  res.cookie('refreshToken', result.refreshToken, cookieOptions);

  // delete result.refreshToken

  sendResponse<IloginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Loggedin successfully',
    data: others,
  });

  // console.log(req.body);
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'prouction',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' 1111',
    data: result,
  });

  // console.log(req.body);
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(user);

  const { ...passwordData } = req.body;

  const result = await AuthService.passwordChange(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change successfully',
    data: result,
  });

  // console.log(req.body);
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
