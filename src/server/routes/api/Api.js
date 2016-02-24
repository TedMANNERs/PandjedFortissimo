import { Router } from "express";
import Tracks from "./Tracks.js";
import Tags from "./Tags.js";

export default () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({
      links: [
        {
          rel: "version",
          href: "/api/1.0"
        }
      ]
    });
  });

  router.get("/1.0", (req, res) => {
    res.json({
      links: [
        {
          rel: "track",
          href: "/api/1.0/tracks"
        },
        {
          rel: "tags",
          href: "/api/1.0/tags"
        }
      ]
    });
  });

  router.use("/1.0/tracks", Tracks());
  router.use("/1.0/tags", Tags());

  return router;
};
