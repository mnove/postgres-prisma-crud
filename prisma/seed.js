const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const newPlan = await prisma.plan.createMany({
    data: [
      {
        name: "Free Forever",
        description: "A free plan",
        yearly_cost_USD: 0,
        yearly_cost_EURO: 0,
      },
      {
        name: "Pro",
        description: "Pro paid plan",
        yearly_cost_USD: 300,
        yearly_cost_EURO: 280,
      },
    ],
  });

  const newFeatures = await prisma.feature.createMany({
    data: [
      {
        name: "do x",
        description: "You can do do that...",
      },
    ],
  });
  const newOrganization = await prisma.organization.createMany({
    data: [
      {
        name: "Acme Inc",
        slug: "acme",
      },
      {
        name: "Wunder Inc",
        slug: "wunder",
      },

      {
        name: "Awesome Inc",
        slug: "awesomeinc",
      },
    ],
  });

  const newUsers = await prisma.user.createMany({
    data: [
      {
        first_name: "John",
        last_name: "Smith",
        email: "john@gmail.com",
        password: "john1234",
      },
      {
        first_name: "Emma",
        last_name: "Watsom",
        email: "emma@gmail.com",
        password: "emma1234",
      },

      {
        first_name: "Lora",
        last_name: "Black",
        email: "lora@gmail.com",
        password: "lora1234",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
