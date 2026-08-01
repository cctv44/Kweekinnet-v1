// Vercel Serverless Function entrypoint.
//
// This mirrors server/_core/index.ts, but WITHOUT `server.listen(...)`.
// Vercel's Node.js runtime imports the default export (an Express app is a
// valid `(req, res) => void` request handler) and invokes it per-request —
// it must never call `.listen()` itself.
//
// Any request path this function should handle must be routed here via
// `rewrites` in vercel.json (see /api/*, /manus-storage/* there).

import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { registerStorageProxy } from "../server/_core/storageProxy";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const app = express();

// Same body-size limits as the original server (file uploads, etc).
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

registerStorageProxy(app); // handles /manus-storage/*
registerOAuthRoutes(app); // handles /api/oauth/callback

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// NOTE: static file serving / SPA fallback is intentionally NOT handled
// here. On Vercel, the built frontend (dist/public) is served directly by
// Vercel's static hosting (see "outputDirectory" in vercel.json) — that is
// faster and cheaper than round-tripping static files through a function.

export default app;
