import { CREATE_WHITELIST_ITEM } from "./mutations/createWhitelistItem";
import { DELETE_WHITELIST_ITEM } from "./mutations/deleteWhitelistItem";
import { UPDATE_DEVICE_POLICY } from "./mutations/updateDevicePolicy";
import {
  UPDATE_FIREWALL,
  UPDATE_FIREWALL_APP,
} from "./mutations/updateFirewall";
import {
  UPDATE_PATCH_RULES,
  UPDATE_PATCH_RULE_APP,
} from "./mutations/updatePatchRules";
import { UPDATE_WHITELIST_ITEM } from "./mutations/updateWhitelistItem";
import { GET_DEVICE } from "./queries/getDevice";
import { GET_FIREWALL } from "./queries/getFirewall";
import { GET_PATCH_RULES } from "./queries/getPatchSettings";
import { GET_USER_DATA } from "./queries/getUserData";
import { GET_WHITELIST } from "./queries/getWhitelist";

export const handlers = [
  CREATE_WHITELIST_ITEM,
  DELETE_WHITELIST_ITEM,
  GET_DEVICE,
  GET_FIREWALL,
  GET_PATCH_RULES,
  GET_USER_DATA,
  GET_WHITELIST,
  UPDATE_DEVICE_POLICY,
  UPDATE_FIREWALL,
  UPDATE_FIREWALL_APP,
  UPDATE_PATCH_RULES,
  UPDATE_PATCH_RULE_APP,
  UPDATE_WHITELIST_ITEM,
];
