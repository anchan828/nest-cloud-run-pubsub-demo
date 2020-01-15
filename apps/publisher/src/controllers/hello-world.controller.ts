import { CloudRunPubSubService } from "@anchan828/nest-cloud-run-pubsub-publisher";
import { Controller, Get } from "@nestjs/common";
import { HELLO_WORLD } from "../../../constants";

@Controller()
export class HelloWorldController {
  constructor(private readonly service: CloudRunPubSubService) {}

  @Get()
  public async helloWorld(): Promise<string> {
    const messageId = await this.service.publish({ data: "Hello world!", name: HELLO_WORLD });
    return `Message ID: ${messageId}`;
  }
}
