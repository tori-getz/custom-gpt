import { ConfigService } from "@app/shared";
import { HttpModuleOptions } from "@nestjs/axios";

export const getOpenAiApiConfig = async (configService: ConfigService): Promise<HttpModuleOptions> => {
  const config = configService.getConfig();

  return {
    baseURL: config.openai.apiUrl,
    headers: {
      'Authorization': `Bearer ${config.openai.accessToken}`,
    },
  };
};
