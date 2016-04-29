import { Router } from "express";
import TagRepository from "../../repositories/TagRepository.js";
import TrackTagRepository from "../../repositories/TrackTagRepository.js";

export default () => {
  const router = Router();
  const tagRepository = new TagRepository();
  const trackTagRepository = new TrackTagRepository();

  router.get("/", (req, res) => {
    tagRepository.getAll((tags) => {
      const links = [];
      if (tags) {
        for (let i = 0; i < tags.length; i++) {
          links.push({ rel: "tag", href: `/api/v1.0/tags/${tags[i].id}` });
        }
      }

      res.json({
        links
      });
    });
  });

  router.post("/", (req, res) => {
    try {
      tagRepository.insert(req.body.tag, (tagId) => {
        res.status(201).location(`/api/v1.0/tags/${tagId}`).send("Created");
      });
    }
    catch (err) {
      res.status(400).send("Bad Request");
    }
  });

  router.get("/:id", (req, res) => {
    tagRepository.getById(req.params.id, (tag) => {
      tag.tracks = { rel: "tracks", href: `/api/v1.0/tags/${tag.id}/tracks` };
      res.json({
        tag
      });
    });
  });

  router.delete("/:id", (req, res) => {
    tagRepository.delete(req.params.id, (tagId) => {
      if (!tagId) {
        return res.status(404).send("Not Found");
      }

      return res.status(204).location(`/api/v1.0/tags/${tagId}`).send("No Content");
    });
  });

  router.put("/:id", (req, res) => {
    try {
      tagRepository.update(req.body.tag, req.params.id, (tagId) => {
        if (!tagId) {
          return res.status(404).send("Not Found");
        }
        return res.status(204).location(`/api/v1.0/tags/${tagId}`).send("No Content");
      });
    }
    catch (err) {
      res.status(400).send("Bad Request");
    }
  });

  router.get("/:id/tracks", (req, res) => {
    tagRepository.getById(req.params.id, (tag) => {
      trackTagRepository.getTrackIdsByTagId(tag.id, (trackIds) => {
        const links = [];
        if (trackIds) {
          for (let i = 0; i < trackIds.length; i++) {
            links.push({ rel: "track", href: `/api/v1.0/tracks/${trackIds[i].track_id}` });
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
