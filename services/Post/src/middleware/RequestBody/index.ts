import { Response, Request, NextFunction } from '../../custom_typings/express'

export default function (req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === 'production') return
  // console.log({ body: req.body })
  // eslint-disable-next-line consistent-return
  return next()
}
