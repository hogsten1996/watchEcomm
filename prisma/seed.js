const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedWatches = async () => {
  try {
    const watchesData = [
      {
        name: "ROLEX MENS DATEJUST BLUE DIAL 18K WHITE GOLD & STAINLESS STEEL WATCH",
        description:
          "The Rolex Mens Datejust features a striking blue dial and is crafted with a combination of 18K white gold and stainless steel, offering a sophisticated and timeless design",
        details:
          "This is an authentic Rolex watch with a Rolex blue dial, Rolex 18K white gold fluted bezel, and custom stainless steel jubilee band.\n\n" +
          "This genuine pre-owned timepiece is in great condition and keeps accurate time. This timepiece has been serviced, polished, and tested prior to sale. It comes with a one-year warranty and a 30-DAY NO HASSLE RETURN GUARANTEE.\n\n" +
          "Descriptions:\n" +
          "Brand: Rolex\n" +
          "Model: Datejust\n" +
          "Reference: 1601\n" +
          "Gender: Men's\n" +
          "Case Diameter: 36mm\n" +
          "\n" +
          "Features:\n" +
          "Dial: Rolex Blue Dial\n" +
          "Bezel: Rolex 18K White Gold Fluted Bezel\n" +
          "Crystal: Acrylic Crystal\n" +
          "Case: Rolex Stainless Steel Case\n" +
          "Movement: Rolex Certified Chronometer Self-Winding Automatic Non-Quickset 1570 Movement.\n" +
          "Bracelet: Custom Stainless Steel Jubilee Band (Upgrade to Rolex is Available)\n" +
          "Wrist Size: Fits Wrist up to 7.5 in. (Additional links to increase length can be purchased)\n" +
          "Box: Watch Box\n" +
          "Paper: None",
        image: "https://i.ebayimg.com/images/g/CA4AAOSwBDRgF65t/s-l1600.jpg",
        image2: "https://i.ebayimg.com/images/g/HAcAAOSwPnpgF65u/s-l1600.jpg",
        image3: "https://i.ebayimg.com/images/g/PQYAAOSw-itgF65v/s-l1600.jpg",
        image4: "https://i.ebayimg.com/images/g/rtIAAOSw0WdgF65w/s-l1600.jpg",
        image5: "https://i.ebayimg.com/images/g/iIMAAOSwXuFgF65y/s-l1600.jpg",
        price: 3995.95,
        tags: ["rolex", "stainless", "whitegold", "mens", "datejust", "18k"],
      },
      {
        name: "ROLEX MENS DATEJUST GREEN DIAL 18K WHITE GOLD STEEL WATCH with JUBILEE BRACELET",
        description:
          "The Rolex Mens Datejust features a striking green dial and is crafted with a combination of 18K white gold and stainless steel, offering a sophisticated and timeless design",
        details:
          "This is an authentic Rolex watch with Rolex 18K white gold fluted bezel, Rolex stick dial, and custom stainless steel jubilee bracelet.\n\n" +
          "This genuine pre-owned timepiece is in great condition and keeps accurate time. This timepiece has been serviced, polished, and tested prior to sale. It comes with a one-year warranty and a 30-DAY NO HASSLE RETURN GUARANTEE.\n\n" +
          "Descriptions:\n" +
          "Brand: Rolex\n" +
          "Model: Datejust\n" +
          "Reference: 1601\n" +
          "Gender: Men's\n" +
          "Case Diameter: 36mm\n" +
          "\n" +
          "Features:\n" +
          "Dial: Rolex Stick Dial\n" +
          "Bezel: Rolex 18K White Gold Fluted Bezel\n" +
          "Crystal: Acrylic Crystal\n" +
          "Case: Rolex Stainless Steel Case\n" +
          "Movement: Rolex Certified Chronometer Self-Winding Automatic non-Quickset 1570 Movement.\n" +
          "Bracelet: Custom Stainless Steel Jubilee Bracelet (Upgrade to Rolex is available)\n" +
          "Wrist Size: Clasp Fits Wrist up to 7.5 in. (Additional links to increase length can be purchased)\n" +
          "Box: Watch Box\n" +
          "Paper: None",
        image: "https://i.ebayimg.com/images/g/WYIAAOSwUF5laLmh/s-l1600.jpg",
        image2: "https://i.ebayimg.com/images/g/wX8AAOSwmbtlaLmh/s-l1600.jpg",
        image3: "https://i.ebayimg.com/images/g/V~UAAOSwCqJlaLmh/s-l1600.jpg",
        image4: "https://i.ebayimg.com/images/g/EHAAAOSw3PRlaLmh/s-l1600.jpg",
        image5: "https://i.ebayimg.com/images/g/8a4AAOSwXO1laLmh/s-l1600.jpg",
        price: 3999.95,
        tags: ["rolex", "stainless", "whitegold", "mens", "datejust", "18k"],
      },
      // Add more watches as needed
    ];

    for (const watchData of watchesData) {
      const {
        name,
        description,
        details,
        image,
        image2,
        image3,
        image4,
        image5,
        price,
        tags,
      } = watchData;

      const upsertedTags = await Promise.all(
        tags.map(async (tagName) => {
          return await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });
        })
      );

      await prisma.watch.create({
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
      });
    }

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedWatches();
