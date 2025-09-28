import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const seed = async () => {
  // Add your seed data here
  await prisma.user.createMany({
    data: [
      {
        email: "user1@example.com",
        password: "password123",
        name: "Alice Johnson",
      },
      {
        email: "user2@example.com",
        password: "password123",
        name: "Bob Smith",
      },
      {
        email: "user3@example.com",
        password: "password123",
        name: "Charlie Brown",
      },
      {
        email: "user4@example.com",
        password: "password123",
        name: "Diana Prince",
      },
      {
        email: "user5@example.com",
        password: "password123",
        name: "Ethan Hunt",
      },
      {
        email: "user6@example.com",
        password: "password123",
        name: "Fiona Gallagher",
      },
      {
        email: "user7@example.com",
        password: "password123",
        name: "George Miller",
      },
      {
        email: "user8@example.com",
        password: "password123",
        name: "Hannah Baker",
      },
      {
        email: "user9@example.com",
        password: "password123",
        name: "Ian Curtis",
      },
      {
        email: "user10@example.com",
        password: "password123",
        name: "Julia Roberts",
      },
    ],
  });
};

seed().then(async () => {
  await prisma.$disconnect();
});
