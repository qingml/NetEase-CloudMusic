import { isProd } from "./../utils/index";
let baseURL: string;

const devURL = "http://localhost:3000";

const proURL = "";

if (!isProd) {
  baseURL = devURL;
} else {
  baseURL = proURL;
}

export { baseURL };
