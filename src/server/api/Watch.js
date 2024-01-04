const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET route for getting all watches
router.get('/', async (req, res) => {
  try {
    const allWatches = await prisma.watch.findMany();
    res.status(200).json(allWatches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for getting a watch by ID
router.get('/:id', async (req, res) => {
  const watchId = parseInt(req.params.id, 10);

  try {
    const watchById = await prisma.watch.findUnique({
      where: {
        id: watchId,
      },
    });

    if (!watchById) {
      return res.status(404).json({ error: 'Watch not found' });
    }

    res.status(200).json(watchById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for getting watches by tag
router.get('/tag/:tagName', async (req, res) => {
  const tagName = req.params.tagName;

  try {
    const watchesByTag = await prisma.watch.findMany({
      where: {
        tags: {
          some: {
            name: tagName,
          },
        },
      },
    });

    res.status(200).json(watchesByTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// POST route for creating a new watch
router.post('/', async (req, res) => {
  try {
    const { name, description, details, image, image2, image3, image4, image5, price, tags } = req.body;

    // Use upsert to create or update tags
    const upsertedTags = await Promise.all(
      tags.map(async (tagName) => {
        return await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
      })
    );

    // Connect the watch to all tags
    const createdWatch = await prisma.watch.create({
      data: {
        name,
        description,
        details,
        image,
        image2,
        image3,
        image4,
        image5,
        price,
        tags: {
          connect: upsertedTags.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        tags: true,
      },
    });

    res.status(201).json(createdWatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// DELETE route for deleting a watch by ID
router.delete('/:id', async (req, res) => {
  const watchId = parseInt(req.params.id, 10);

  try {
    const deletedWatch = await prisma.watch.delete({
      where: {
        id: watchId,
      },
    });

    res.status(200).json({ message: 'Watch deleted successfully', deletedWatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;


