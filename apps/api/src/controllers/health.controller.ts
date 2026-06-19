import { Request, Response } from 'express';
import { successResponse } from '@express-api-template/util';

export function getHealth(req: Request, res: Response): void {
  res.json(
    successResponse({
      status: 'ok',
      uptime: process.uptime(),
      version: process.env.npm_package_version ?? '0.0.0',
    })
  );
}
