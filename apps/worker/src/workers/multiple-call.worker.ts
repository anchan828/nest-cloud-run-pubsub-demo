import { CloudRunPubSubWorker, CloudRunPubSubWorkerProcess } from "@anchan828/nest-cloud-run-pubsub-worker";
import { Logger } from "@nestjs/common";
import { MULTIPLE_CALL } from "../../../constants";

@CloudRunPubSubWorker(MULTIPLE_CALL)
export class MultipuleCallWorker {
  @CloudRunPubSubWorkerProcess()
  public process(message: string): void {
    Logger.log(`Index: ${message}`, "MultipuleCallWorker");
  }
}
