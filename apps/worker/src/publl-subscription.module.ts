import { CloudRunPubSubWorkerService } from "@anchan828/nest-cloud-run-pubsub-worker";
import { Message, PubSub } from "@google-cloud/pubsub";
import { Logger, Module, OnModuleInit } from "@nestjs/common";

@Module({})
export class PullSubscriptionDemoModule implements OnModuleInit {
  constructor(private readonly service: CloudRunPubSubWorkerService) {}

  async onModuleInit(): Promise<void> {
    const pubSubClient = new PubSub({ projectId: "test" });

    const subscription = pubSubClient.topic("nest-cloud-run-pubsub-demo").subscription("pull-subscription");

    subscription.on("message", async (message: Message) => {
      await this.service.execute(message);
      message.ack();
      Logger.log(`MessageID: ${message.id}`, "Pull Subscription");
    });
  }
}
