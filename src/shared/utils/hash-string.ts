import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

export const verifyHashPassword = (password: string, hashPassword: string) =>
  bcrypt.compareSync(password, hashPassword);
