import { config } from 'dotenv';
import CryptoJS = require('crypto-js');

config();

// export const encryptWithAES = (
//   text: string,
//   key: string = process.env.CRYPTO_SECRET_KEY,
// ) => {
//   console.log('check key: ', key);
//   console.log('check buffer: ', Buffer.from(key, 'hex'));
//   const cipher = createCipheriv('aes-256-ecb', Buffer.from(key, 'hex'), null);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return encrypted.toString('hex');
// };

// export const decryptWithAES = (
//   encryptedText: string,
//   key: string = process.env.CRYPTO_SECRET_KEY,
// ) => {
//   const encrypted = Buffer.from(encryptedText, 'hex');
//   const decipher = createDecipheriv('aes-256-ecb', Buffer.from(key), null);
//   let decrypted = decipher.update(encrypted);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// };

export const encryptWithAES = (
  text: string,
  key: string = process.env.CRYPTO_SECRET_KEY,
) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decryptWithAES = (
  text: string,
  key: string = process.env.CRYPTO_SECRET_KEY,
) => {
  const bytes = CryptoJS.AES.decrypt(text, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
