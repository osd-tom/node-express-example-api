import * as jwt from "jsonwebtoken"
import * as fs from 'fs';
import * as path from 'path';

/**
 * Token variables
 */
const ALOGRITHM = 'RS256'
const PRIVATE_KEY_PATH = './../../../private.key'

/**
 * Generate token
 * 
 * @param payload 
 * @returns 
 */
const generateToken = (payload: any) => {
  const privateKey = fs.readFileSync(path.join(__dirname, PRIVATE_KEY_PATH))
  const signInOptions: jwt.SignOptions = {
    algorithm: ALOGRITHM
  }

  return jwt.sign(
    payload, 
    { key: privateKey, passphrase: <string>process.env.JWT_PASSPHRASE }, 
    signInOptions
  )
}

export { generateToken }