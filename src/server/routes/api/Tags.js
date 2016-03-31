import { Router } from "express";
import TagRepository from "../../repositories/TagRepository.js";

export default () => {
  const router = Router();
  const repository = new TagRepository();

  router.get("/", (req, res) => {
    repository.getAll((tags) => {
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

  router.get("/:id", (req, res) => {
    repository.getById(req.params.id, (tags) => {
      res.json({
        tags
      });
    });
  });

  return router;
};
