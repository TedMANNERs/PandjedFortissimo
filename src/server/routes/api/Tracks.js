import { Router } from "express";
import TrackRepository from "../../repositories/TrackRepository.js";

export default () => {
  const router = Router();
  const repository = new TrackRepository();

  router.get("/", (req, res) => {
    repository.getAll((tracks) => {
      const links = [];
      if (tracks) {
        for (let i = 0; i < tracks.length; i++) {
          links.push({ rel: "track", href: `/api/v1.0/tracks/${tracks[i].id}` });
        }
      }

      res.json({
        links
      });
    });
  });

  router.get("/:id", (req, res) => {
    repository.getById(req.params.id, (tracks) => {
      res.json({
        tracks
      });
    });
  });

  return router;
};
