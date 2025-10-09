import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const seed = async () => {
  // Add your seed data here
  await prisma.roles.createMany({
    data: [
      {
        role_id: "r_001",
        role_name: "System Administrator",
        description:
          "Manages and maintains the entire system infrastructure and user access.",
      },
      {
        role_id: "r_002",
        role_name: "Project Manager",
        description:
          "Plans, executes, and finalizes projects according to deadlines and budget.",
      },
      {
        role_id: "r_003",
        role_name: "Software Developer",
        description:
          "Writes, tests, and maintains the codebase for the application.",
      },
      {
        role_id: "r_004",
        role_name: "Frontend Developer",
        description:
          "Builds the user-facing part of the application, focusing on design and user experience.",
      },
      {
        role_id: "r_005",
        role_name: "Backend Developer",
        description:
          "Works on server-side logic, databases, and application programming interfaces (APIs).",
      },
      {
        role_id: "r_006",
        role_name: "Full-Stack Developer",
        description:
          "Handles both the frontend and backend aspects of an application.",
      },
      {
        role_id: "r_007",
        role_name: "UI/UX Designer",
        description:
          "Designs the user interface and overall user experience of the application.",
      },
      {
        role_id: "r_008",
        role_name: "Data Scientist",
        description:
          "Analyzes and interprets complex data to help the organization make decisions.",
      },
      {
        role_id: "r_009",
        role_name: "Database Administrator (DBA)",
        description:
          "Manages and maintains the database system, ensuring performance and security.",
      },
      {
        role_id: "r_010",
        role_name: "Quality Assurance (QA) Engineer",
        description:
          "Tests the application to identify bugs and ensure quality standards.",
      },
      {
        role_id: "r_011",
        role_name: "DevOps Engineer",
        description:
          "Manages and improves the software development and operations processes.",
      },
      {
        role_id: "r_012",
        role_name: "Product Owner",
        description:
          "Defines the product vision and prioritizes the product backlog.",
      },
      {
        role_id: "r_013",
        role_name: "Business Analyst",
        description:
          "Analyzes the business needs and translates them into technical requirements.",
      },
      {
        role_id: "r_014",
        role_name: "Scrum Master",
        description:
          "Facilitates the Scrum process and helps the development team to remove impediments.",
      },
      {
        role_id: "r_015",
        role_name: "Content Manager",
        description:
          "Manages and curates the content that appears on the website or application.",
      },
      {
        role_id: "r_016",
        role_name: "Marketing Specialist",
        description:
          "Develops and executes marketing campaigns to promote the application.",
      },
      {
        role_id: "r_017",
        role_name: "Support Agent",
        description:
          "Assists users with issues, provides support, and gathers feedback.",
      },
      {
        role_id: "r_018",
        role_name: "Technical Architect",
        description:
          "Designs the technical structure of the system and makes high-level design choices.",
      },
      {
        role_id: "r_019",
        role_name: "Network Engineer",
        description:
          "Designs, implements, and manages computer networks within the organization.",
      },
      {
        role_id: "r_020",
        role_name: "System Analyst",
        description:
          "Analyzes the effectiveness of information systems and designs new processes.",
      },
      {
        role_id: "r_021",
        role_name: "Cloud Engineer",
        description:
          "Manages and maintains cloud-based services and infrastructure.",
      },
      {
        role_id: "r_022",
        role_name: "Mobile Developer",
        description:
          "Develops applications for mobile devices, such as iOS or Android.",
      },
      {
        role_id: "r_023",
        role_name: "Security Analyst",
        description:
          "Monitors the system for security threats and develops security measures.",
      },
      {
        role_id: "r_024",
        role_name: "Site Reliability Engineer (SRE)",
        description:
          "Focuses on the reliability, availability, and performance of the system.",
      },
      {
        role_id: "r_025",
        role_name: "Technical Writer",
        description:
          "Creates documentation for the application, including user manuals and API docs.",
      },
      {
        role_id: "r_026",
        role_name: "Release Manager",
        description:
          "Coordinates the release of new software versions into production.",
      },
      {
        role_id: "r_027",
        role_name: "Business Development Manager",
        description:
          "Identifies new business opportunities and develops strategic partnerships.",
      },
      {
        role_id: "r_028",
        role_name: "Account Manager",
        description:
          "Manages client relationships and ensures customer satisfaction.",
      },
      {
        role_id: "r_029",
        role_name: "HR Manager",
        description:
          "Handles human resources tasks, including recruitment and employee relations.",
      },
      {
        role_id: "r_030",
        role_name: "Finance Officer",
        description: "Manages financial records and oversees budget planning.",
      },
      {
        role_id: "r_031",
        role_name: "Legal Counsel",
        description:
          "Provides legal advice and ensures the project complies with regulations.",
      },
      {
        role_id: "r_032",
        role_name: "Sales Manager",
        description: "Leads the sales team and oversees the sales strategy.",
      },
      {
        role_id: "r_033",
        role_name: "Compliance Officer",
        description:
          "Ensures the project and organization adhere to legal standards and internal policies.",
      },
      {
        role_id: "r_034",
        role_name: "Executive Director",
        description:
          "Provides high-level strategic direction for the project and organization.",
      },
      {
        role_id: "r_035",
        role_name: "Team Lead",
        description: "Guides and mentors a team of developers or specialists.",
      },
      {
        role_id: "r_036",
        role_name: "Junior Developer",
        description:
          "An entry-level developer who works on less complex tasks under supervision.",
      },
      {
        role_id: "r_037",
        role_name: "Senior Developer",
        description:
          "An experienced developer who leads technical design and mentors junior staff.",
      },
      {
        role_id: "r_038",
        role_name: "Database Analyst",
        description:
          "Analyzes database requirements and assists in data modeling.",
      },
      {
        role_id: "r_039",
        role_name: "Product Marketing Manager",
        description: "Manages the product's marketing strategy and messaging.",
      },
      {
        role_id: "r_040",
        role_name: "Social Media Manager",
        description: "Manages the company's social media presence and content.",
      },
      {
        role_id: "r_041",
        role_name: "Technical Support Engineer",
        description:
          "Provides in-depth technical support to clients and internal teams.",
      },
      {
        role_id: "r_042",
        role_name: "Client Success Manager",
        description:
          "Helps clients achieve their goals using the company's product.",
      },
      {
        role_id: "r_043",
        role_name: "Operations Manager",
        description: "Oversees the daily operations of the company.",
      },
      {
        role_id: "r_044",
        role_name: "Logistics Coordinator",
        description:
          "Coordinates the movement and storage of goods or resources.",
      },
      {
        role_id: "r_045",
        role_name: "IT Support Technician",
        description:
          "Provides technical assistance for computer systems and hardware.",
      },
      {
        role_id: "r_046",
        role_name: "Cybersecurity Analyst",
        description: "Specializes in protecting the system from cyber threats.",
      },
      {
        role_id: "r_047",
        role_name: "Quality Control Inspector",
        description:
          "Ensures that products or services meet quality standards.",
      },
      {
        role_id: "r_048",
        role_name: "Technical Recruiter",
        description: "Finds and hires technical talent for the organization.",
      },
      {
        role_id: "r_049",
        role_name: "Research Scientist",
        description:
          "Conducts research to improve or develop new products and features.",
      },
      {
        role_id: "r_050",
        role_name: "Content Writer",
        description:
          "Creates engaging written content for the application or website.",
      },
    ],
  });
};

seed().then(async () => {
  await prisma.$disconnect();
});
