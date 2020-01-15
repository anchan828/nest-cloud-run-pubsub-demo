import { CloudRunPubSubWorker, CloudRunPubSubWorkerProcess } from "@anchan828/nest-cloud-run-pubsub-worker";
import { Logger } from "@nestjs/common";
import { HELLO_WORLD } from "../../../constants";

@CloudRunPubSubWorker(HELLO_WORLD)
export class HelloWorldWorker {
  @CloudRunPubSubWorkerProcess()
  public process(message: string): void {
    Logger.log(message, "HelloWorldWorker");
  }
}
