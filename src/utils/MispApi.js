import axios from "axios";
export const get = (type, name, password, payloadObj) => {
  const payload = JSON.stringify(payloadObj);
  return axios.get(
    "https://script.google.com/macros/s/AKfycbxjCFLM2IR3gra0dhH_DTsDobZz4CeX5eZHZuDxHtCrs6wLQDbLceum/exec",
    { params: { type, name, password, payload } }
  );
};
