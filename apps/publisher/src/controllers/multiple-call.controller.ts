import { CloudRunPubSubService } from "@anchan828/nest-cloud-run-pubsub-publisher";
import { Controller, Get } from "@nestjs/common";
import { MULTIPLE_CALL } from "../../../constants";

@Controller()
export class MultipuleCallController {
  constructor(private readonly service: CloudRunPubSubService) {}

  @Get("multiple")
  public async list(): Promise<{ MessageIDs: string[] }> {
    const messageIds = [];

    for (let i = 1; i <= 10; i++) {
      const messageId = await this.service.publish({ data: `${i}`, name: MULTIPLE_CALL });
      messageIds.push(messageId);
    }
    return { MessageIDs: messageIds };
  }
}
