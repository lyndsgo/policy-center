import { UPDATE_DEVICE_POLICY } from "./mutations/updateDevicePolicy";
import {
  UPDATE_FIREWALL_ALL,
  UPDATE_FIREWALL_APP,
} from "./mutations/updateFirewall";
import { GET_DEVICE } from "./queries/getDevice";
import { GET_SECURITY_SETTINGS } from "./queries/getSecuritySettings";
import { GET_USER_DATA } from "./queries/getUserData";

export const handlers = [
  GET_DEVICE,
  GET_SECURITY_SETTINGS,
  GET_USER_DATA,
  UPDATE_DEVICE_POLICY,
  UPDATE_FIREWALL_ALL,
  UPDATE_FIREWALL_APP,
];
