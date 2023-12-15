import CryptoJS from "crypto-js";

export function getItem(key) {
  const secretKey = import.meta.env.VITE_LS_SECRET_KEY;

  let value = localStorage.getItem("__" + key);

  if (value === null || typeof value === "undefined") {
    return null;
  }

  value = CryptoJS.AES.decrypt(value, secretKey).toString(CryptoJS.enc.Utf8);
  value = JSON.parse(value);

  return value.value || null;
}

export function setItem(key, value) {
  const secretKey = import.meta.env.VITE_LS_SECRET_KEY;

  value = CryptoJS.AES.encrypt(JSON.stringify({ value }), secretKey).toString();

  localStorage.setItem("__" + key, value);
}
