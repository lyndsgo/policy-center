import { UPDATE_DEVICE_POLICY } from "./mutations/updateDevicePolicy";
import {
  TOGGLE_GLOBAL_FIREWALL,
  UPDATE_FIREWALL_APP,
} from "./mutations/updateFirewall";
import {
  TOGGLE_GLOBAL_PATCH_RULES,
  UPDATE_PATCH_RULE,
} from "./mutations/updatePatchRules";
import { GET_DEVICE } from "./queries/getDevice";
import { GET_FIREWALL } from "./queries/getFirewall";
import { GET_PATCH_RULES } from "./queries/getPatchSettings";
import { GET_USER_DATA } from "./queries/getUserData";

export const handlers = [
  GET_DEVICE,
  GET_FIREWALL,
  GET_PATCH_RULES,
  GET_USER_DATA,
  UPDATE_DEVICE_POLICY,
  TOGGLE_GLOBAL_FIREWALL,
  TOGGLE_GLOBAL_PATCH_RULES,
  UPDATE_FIREWALL_APP,
  UPDATE_PATCH_RULE,
];
