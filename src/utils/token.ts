import * as jwt from "jsonwebtoken"
import * as fs from 'fs';
import * as path from 'path';

/**
 * Token variables
 */
const ALOGRITHM = 'RS256'
const PRIVATE_KEY_PATH = './../../../private.key'
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, PRIVATE_KEY_PATH))

/**
 * Generate token
 * 
 * @param payload 
 * @returns 
 */
const generateToken = (payload: any) => {
  const signInOptions: jwt.SignOptions = {
    algorithm: ALOGRITHM
  }

  return jwt.sign(
    payload, 
    { key: PRIVATE_KEY, passphrase: <string>process.env.JWT_PASSPHRASE }, 
    signInOptions
  )
}

/**
 * Verfify user's token
 * 
 * @param token 
 */
const verifyToken = (token: string) => {
  try {
    // [TODO_2022/04/07]
  } catch (error) {
    throw new Error("");
  }
}

export { 
  generateToken,
  verifyToken
}