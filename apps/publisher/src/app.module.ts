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
  imports: [
    CloudRunPubSubPublisherModule.register({
      clientConfig: { projectId: "test" },
      topic: "nest-cloud-run-pubsub-demo",
    }),
  ],
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

    if (!(await topic.exists())[0]) {
      await topic.create();
    }

    const pushSubscription = topic.subscription("push-subscription");

    if (!(await pushSubscription.exists())[0]) {
      await pushSubscription.create({ pushEndpoint: process.env.PUSH_ENDPOINT });
    }

    const pullSubscription = topic.subscription("pull-subscription");

    if (!(await pullSubscription.exists())[0]) {
      await pullSubscription.create();
    }
  }
}
