import { Router } from "express";
import TracksRoute from "./TracksRoute.js";
import TagsRoute from "./TagsRoute.js";

export default () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({
      links: [
        {
          rel: "version",
          href: "/api/v1.0"
        }
      ]
    });
  });

  router.get("/v1.0", (req, res) => {
    res.json({
      links: [
        {
          rel: "track",
          href: "/api/v1.0/tracks"
        },
        {
          rel: "tags",
          href: "/api/v1.0/tags"
        }
      ]
    });
  });

  router.use("/v1.0/tracks", TracksRoute());
  router.use("/v1.0/tags", TagsRoute());

  return router;
};
