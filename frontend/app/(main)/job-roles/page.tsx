import React from "react";
import { Search } from "lucide-react";

interface Role {
  role_id: string;
  role_name: string;
  description: string;
}

const dummyRoles: Role[] = [
  {
    role_id: "r_001",
    role_name: "Frontend Developer",
    description:
      "Create engaging user interfaces using modern web technologies like React, Vue, or Angular. Focus on user experience, responsive design, and performance optimization.",
  },
  {
    role_id: "r_002",
    role_name: "Backend Developer",
    description:
      "Build robust server-side applications and APIs. Work with databases, cloud services, and ensure scalability, security, and performance of web applications.",
  },
  {
    role_id: "r_003",
    role_name: "Full Stack Developer",
    description:
      "Handle both frontend and backend development. Bridge the gap between user interface and server logic while maintaining code quality across the entire stack.",
  },
  {
    role_id: "r_004",
    role_name: "DevOps Engineer",
    description:
      "Streamline development and deployment processes. Manage CI/CD pipelines, cloud infrastructure, and ensure reliable, automated software delivery.",
  },
  {
    role_id: "r_005",
    role_name: "Product Manager",
    description:
      "Define product vision and strategy. Collaborate with cross-functional teams to deliver products that meet user needs and business objectives.",
  },
  {
    role_id: "r_006",
    role_name: "UX/UI Designer",
    description:
      "Design intuitive user experiences and beautiful interfaces. Conduct user research, create wireframes, prototypes, and ensure design consistency.",
  },
  {
    role_id: "r_007",
    role_name: "Data Scientist",
    description:
      "Extract insights from complex datasets using machine learning and statistical analysis. Build predictive models to drive data-driven decisions.",
  },
  {
    role_id: "r_008",
    role_name: "Scrum Master",
    description:
      "Facilitate the Scrum process and help the development team remove impediments. Ensure team follows agile principles and continuous improvement.",
  },
];

function page() {
  return (
    <div className="flex-1 bg-white dark:bg-gray-900 ">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Choose Your Role in which you want to Practice Interview
        </h2>
        {/* Beautiful search bar */}
        <div className="relative">
          <div className="relative bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-1 rounded-2xl">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              {/* Search Icon */}
              <div className="flex items-center justify-center pl-6 pr-4">
                <Search className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>

              {/* Vertical Divider */}
              <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search for your dream role..."
                className="flex-1 py-5 px-6 text-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 border-0 rounded-r-xl"
              />

              {/* Optional search button */}
              {/* <button className="mr-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium">
                Search
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* List of roles */}
      <div>
        <div className="max-w-6xl mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dummyRoles.map((role) => (
              <div
                key={role.role_id}
                className="group cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {role.role_name}
                  </h3>
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {role.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    {role.role_id}
                  </span>
                  <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
