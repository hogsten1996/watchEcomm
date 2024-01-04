const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
  const salt_rounds = 5;

  const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds);

  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email, // Add this line to include the email field
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res.status(201).send({
      token,
      user: {
        userId: user.id,
        username: user.username,
        admin: false,
        image: null,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(401).send("Invalid Login");
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return res.status(401).send("Invalid Login");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.send({ token, user: { userId: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Login failed due to a server error." });
  }
});

router.put("/edit", require("./middleware"), async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: req.body,
    });

    res.send({
      userId: user.id,
      username: user.username,
      admin: user.admin,
      image: user.image !== "null" ? user.image : null,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", async (req, res, next) => {
  if (!req.user) {
    return res.send({});
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
