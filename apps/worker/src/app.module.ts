import { CloudRunPubSubWorkerModule } from "@anchan828/nest-cloud-run-pubsub-worker";
import { Module } from "@nestjs/common";
import { PullSubscriptionDemoModule } from "./publl-subscription.module";
import { HelloWorldWorker } from "./workers/hello-world.worker";
import { MultipuleCallWorker } from "./workers/multiple-call.worker";
@Module({
  imports: [CloudRunPubSubWorkerModule.register(), PullSubscriptionDemoModule],
  providers: [HelloWorldWorker, MultipuleCallWorker],
})
export class WorkerAppModule {}
