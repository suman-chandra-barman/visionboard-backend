import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires: process.env.JWT_ACCESS_EXPIRES,
  jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES,
  saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KAY,
  api_secret: process.env.API_SECRET,
};
