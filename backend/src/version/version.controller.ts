import { Controller, Get } from '@nestjs/common';

@Controller('version')
export class VersionController {
  @Get()
  get() {
    return {
      name: process.env.APP_NAME ?? 'oryza-backend',
      version: process.env.APP_VERSION ?? '0.1.0',
      node: process.version,
      env: process.env.NODE_ENV ?? 'development',
      time: new Date().toISOString(),
    };
  }
}
