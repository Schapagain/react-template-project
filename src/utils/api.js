import Axios from "axios";
import { initializeAxiosMockAdapter } from "../../mock.config";
initializeAxiosMockAdapter(Axios);

const api = Axios.create({
  timeout: 2500,
  headers: { Accept: "application/json" },
});
export default api;
