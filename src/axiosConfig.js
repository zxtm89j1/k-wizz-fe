// axiosConfig.js

import axios from "axios";

// Set the default CSRF token for all Axios requests
axios.defaults.headers.common["X-CSRF-TOKEN"] = document.head.querySelector(
  'meta[name="csrf-token"]'
).content;

export default axios;
