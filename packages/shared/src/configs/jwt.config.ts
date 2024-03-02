import { JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "../config";

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  const config = configService.getConfig();

  return {
    secret: config.jwt.secret,
  };
};
