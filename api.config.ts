import * as dotenv from 'dotenv';

export const loadDotEnv = (): string => {
  let envFilePath = '';

  switch (process.env.NODE_ENV) {
    case 'production':
      envFilePath = '.env';
      break;
    case 'staging':
      envFilePath = '.env.staging';
      break;
    case 'testing':
      envFilePath = '.env.testing';
      break;
    case 'development':
      envFilePath = '.env.development';
      break;
    default:
      envFilePath = '.env';
  }

  try {
    const key = dotenv.config({ path: `./${envFilePath}` });
    console.log(key, 'dotenv loaded');
  } catch (error) {
    console.log(error, 'error loading dotenv');
  }

  return envFilePath;
};

loadDotEnv();

interface IAuth {
  jwtSecret: string;
  hashingSecret: string;
}
export const auth = (): IAuth => ({
  jwtSecret: process.env.JWT_SECRET,
  hashingSecret: process.env.HASHINGSECRET,
});


interface IApp {
  port: number;
}
export const app = (): IApp => ({
  port: Number(process.env.PORT),
});


interface IClient {
  url: string;
}
export const client = (): IClient => ({
  url: process.env.CLIENT_URL,
});

export enum ApplicationConfig {
  Name = 'io.warehouse.kpilens.com',
  MessagePattern = 'rpc',
  WorkspaceHeader = 'x-wsp-id'
}