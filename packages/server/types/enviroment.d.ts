declare namespace NodeJS {
  interface ProcessEnv {
    GEO_KEY: string;
    EMAIL: string;
    EMAIL_PASSWORD: string;
    NODE_ENV: 'development' | 'production' | 'testing';
    JWT_SECRET: string;
    SERVER_URL: string;
    CLIENT_URL: string;
    PORT: number;
    ALLOW_IMAGES: string;
  }
}
