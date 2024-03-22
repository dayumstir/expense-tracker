/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // disable: process.env.NODE_ENV === "development",
  disable: false,
});

/** @type {import("next").NextConfig} */
const config = {};

export default withPWA(config);
