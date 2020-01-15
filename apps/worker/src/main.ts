import { NestFactory } from "@nestjs/core";
import { WorkerAppModule } from "./app.module";
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(WorkerAppModule, {
    bodyParser: true,
  });
  await app.listen(process.env.PORT || 4367);
}

bootstrap();
