import {
  CloudRunPubSubPublisherModule,
  CloudRunPubSubPublisherModuleOptions,
  CLOUD_RUN_PUBSUB,
  CLOUD_RUN_PUBSUB_PUBLISHER_MODULE_OPTIONS,
} from "@anchan828/nest-cloud-run-pubsub-publisher";
import { PubSub } from "@google-cloud/pubsub";
import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { HelloWorldController } from "./controllers/hello-world.controller";
import { MultipuleCallController } from "./controllers/multiple-call.controller";
@Module({
  controllers: [HelloWorldController, MultipuleCallController],
  imports: [CloudRunPubSubPublisherModule.register({ projectId: "test", topic: "nest-cloud-run-pubsub-demo" })],
})
export class PublisherAppModule implements OnModuleInit {
  constructor(
    @Inject(CLOUD_RUN_PUBSUB_PUBLISHER_MODULE_OPTIONS) private readonly options: CloudRunPubSubPublisherModuleOptions,
    @Inject(CLOUD_RUN_PUBSUB) private readonly pubsub: PubSub,
  ) {}

  public async onModuleInit(): Promise<void> {
    if (!this.options.topic) {
      return;
    }
    const topic = this.pubsub.topic(this.options.topic);
    const subscription = topic.subscription("subscription");

    if (!(await topic.exists())[0]) {
      await topic.create();
    }

    if (!(await subscription.exists())[0]) {
      await subscription.create({ pushEndpoint: process.env.PUSH_ENDPOINT });
    }
  }
}
