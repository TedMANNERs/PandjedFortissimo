import { Router } from "express";
import TrackRepository from "../../repositories/TrackRepository.js";
import TrackTagRepository from "../../repositories/TrackTagRepository.js";

export default () => {
  const router = Router();
  const trackRepository = new TrackRepository();
  const trackTagRepository = new TrackTagRepository();

  router.get("/", (req, res) => {
    trackRepository.getAll((tracks) => {
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
    trackRepository.getById(req.params.id, (track) => {
      track.tags = { rel: "tags", href: `/api/v1.0/tracks/${track.id}/tags` };
      res.json({
        track
      });
    });
  });

  router.get("/:id/tags", (req, res) => {
    trackRepository.getById(req.params.id, (tag) => {
      trackTagRepository.getTagIdsByTrackId(tag.id, (tagIds) => {
        const links = [];
        if (tagIds) {
          for (let i = 0; i < tagIds.length; i++) {
            links.push({ rel: "tag", href: `/api/v1.0/tags/${tagIds[i].tag_id}` });
          }
        }

        res.json({
          links
        });
      });
    });
  });

  return router;
};
