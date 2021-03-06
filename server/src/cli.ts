// Copyright 2019 Authors of Hubble
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import * as grpc from "grpc";
import { ObserverClient } from "./hubble_proto/observer/observer_grpc_pb";
import {
  GetFlowsRequest,
  GetFlowsResponse
} from "./hubble_proto/observer/observer_pb";

require("dotenv").config({ path: ".env.development" });

const hubbleService = process.env.HUBBLE_SERVICE;
const hubblePort = process.env.HUBBLE_PORT;
const client = new ObserverClient(
  `${hubbleService}:${hubblePort}`,
  grpc.credentials.createInsecure()
);

const req: GetFlowsRequest = new GetFlowsRequest();
req.setFollow(true);
const flowsStream = client.getFlows(req);
flowsStream.on("data", (res: GetFlowsResponse) => {
  if (res.hasFlow()) {
    console.log(JSON.stringify(res.getFlow()!.toObject()));
  }
});
flowsStream.on("end", () => {
  console.log("It's not supposed to end");
  process.exit(1);
});
flowsStream.on("error", err => {
  console.log(`Received an error: ${err}`);
  process.exit(1);
});
