const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const allWatches = await prisma.watch.findMany();
    res.send(allWatches);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const watch = await prisma.watch.findUnique({
      where: { id: parseInt(id) },
    });

    if (!watch) {
      return res.status(404).json({ message: "Watch not found" });
    }

    res.json(watch);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, image2, image3, image4 } =
      req.body;

    const updatedWatch = await prisma.watch.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        image,
        image2,
        image3,
        image4,
      },
    });

    res.json(updatedWatch);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.watch.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Watch deleted succesfully" });
  } catch (err) {
    next(err);
  }
});

router.get("/byTag/:tagName", async (req, res, next) => {
  try {
    const { tagName } = req.params;
    const watches = await prisma.watch.findMany({
      where: {
        tags: {
          some: {
            name: tagName,
          },
        },
      },
    });

    res.json(watches);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
