export interface ITokenPayload {
  exp: number,
  accessTypes: string[],
  name: string,
  userId: number
}