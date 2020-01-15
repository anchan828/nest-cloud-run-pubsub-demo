import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { PublisherAppModule } from "./app.module";
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(PublisherAppModule, {
    bodyParser: true,
  });
  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log(`Listening to http://localhost:${port}`);
}

bootstrap();
