import { Router } from "express";

export default () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({
      links: []
    });
  });

  return router;
};
