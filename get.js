const axios = require("axios");
const crypto = require("crypto");
const qs = require("qs");

const API_URL = "https://vip-reseller.co.id/api/prepaid";
const API_ID = "iRlsuIo7";
const API_KEY = "Xnu8VfaSOOjhpbPrniks6SkNWFST4mXxsgabGK4ttnHBBqvx8MXToc0gTGGkxxug";

function makeSign() {
  return crypto
    .createHash("md5")
    .update(API_ID + API_KEY)
    .digest("hex");
}

async function getBrands() {
  try {
    const payload = qs.stringify({
      key: API_KEY,
      sign: makeSign(),
      type: "services"
    });

    const res = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const services = res.data?.data || [];

    // 🔥 ambil brand unik & bersih
    const brands = [
      ...new Set(
        services
          .map(s => s.brand)
          .filter(b => b && b.trim() !== "")
      )
    ];

    console.log("BRANDS:", brands);
    return brands;

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    return [];
  }
}

getBrands();
