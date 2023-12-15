import { getItem } from "@utils/crypto";

const state = {
  user: getItem("user") || {}, // { token: { type: "Bearer", value: "1|123" }, data: {} }
};

export default state;
