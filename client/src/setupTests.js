import '@testing-library/jest-dom';

if (!global.crypto) {
  const { randomFillSync } = require("crypto");
  global.crypto = {
    getRandomValues: (buffer) => {
      if (!(buffer instanceof Uint8Array)) {
        throw new TypeError("Expected Uint8Array");
      }
      if (buffer.length > 65536) {
        throw new Error("QuotaExceededError");
      }
      return randomFillSync(buffer);
    },
  };
}