import jwt from 'jsonwebtoken'
import userRoles from '@utils/user-roles'
import {
  MissingTokenError,
  PermissionDeniedError,
  UnauthorizedError,
} from '@errors/auth.errors'
import userService from '@services/user.service'
import asyncHandler from '@utils/async-handler'
import CONFIG from '../../config.js'

const { verify } = jwt

export const isAuthenticated = asyncHandler(async function (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer <token>

  if (!token) throw new MissingTokenError()

  const decoded = verify(token, CONFIG.jwt_secret)

  const authenticatedUser = await userService.getUserById(decoded.id)

  if (authenticatedUser) {
    req.user = authenticatedUser
    return next()
  }
  throw new MissingTokenError()
})

export const authorize =
  (...allowedRoles) =>
  async (req, res, next) => {
    const role = req.user.user_type
    if (!role) {
      throw new UnauthorizedError()
    }

    if (allowedRoles.includes(role)) {
      return next()
    } else {
      throw new PermissionDeniedError()
    }
  }

export const isManagerOrAdmin = asyncHandler(
  authorize(userRoles.admin.type, userRoles.manager.type)
)

export const isSuperAdmin = asyncHandler(authorize(userRoles.admin.type))
