const axios = require("axios");
const crypto = require("crypto");
const qs = require("qs");

const API_URL = "https://vip-reseller.co.id/api/prepaid";
const API_ID = "iRlsuIo7";
const API_KEY = "Xnu8VfaSOOjhpbPrniks6SkNWFST4mXxsgabGK4ttnHBBqvx8MXToc0gTGGkxxug";

// md5(API_ID + API_KEY)
function makeSign() {
  return crypto
    .createHash("md5")
    .update(API_ID + API_KEY)
    .digest("hex");
}

async function getServices() {
  try {
    const payload = qs.stringify({
      key: API_KEY,
      sign: makeSign(),
      type: "services",

      // optional (hapus kalau ga dipakai)
      filter_type: "brand",
      //filter_value: "telkomsel"
    });

    const res = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    console.log("RESULT:", res.data);
  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
  }
}

getServices();
