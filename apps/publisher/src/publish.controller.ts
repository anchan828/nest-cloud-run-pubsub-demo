import { CloudRunPubSubService } from "@anchan828/nest-cloud-run-pubsub-publisher";
import { Controller, Get } from "@nestjs/common";
import { HELLO_WORLD, MULTIPLE_CALL } from "../../constants";

@Controller()
export class PublishController {
  constructor(private readonly service: CloudRunPubSubService) {}

  @Get()
  public async helloWorld(): Promise<string> {
    const messageId = await this.service.publish({ data: "Hello world!", name: HELLO_WORLD });
    return `Message ID: ${messageId}`;
  }

  @Get("multiple")
  public async list(): Promise<string[]> {
    const messageIds = [];

    for (let i = 1; i <= 10; i++) {
      messageIds.push(await this.service.publish({ data: `${i}`, name: MULTIPLE_CALL }, {}, { messageOrdering: true }));
    }
    return messageIds;
  }
}
