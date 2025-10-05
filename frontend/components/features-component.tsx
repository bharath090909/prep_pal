// src/components/WorkflowFeatures.jsx

import { User, Bolt, ChartColumnBig } from "lucide-react";

// Data for the feature list. This makes the component cleaner and easier to update.
const features = [
  {
    name: "Real-Time Collaboration",
    description:
      "Work together with your team in real-time. See edits live, comment instantly, and resolve faster.",
    icon: User,
  },
  {
    name: "Smart Workflows",
    description:
      "Automate repetitive tasks with triggers. Focus on what really matters — not the manual work.",
    icon: Bolt,
  },
  {
    name: "Insights at a Glance",
    description:
      "Get instant dashboards of your data, without writing code. Understand your project’s health in seconds.",
    icon: ChartColumnBig,
  },
];

export default function FeaturesComponent() {
  return (
    // Main container with glassmorphism effect for both light and dark modes
    <div className="rounded-3xl border border-gray-200/20 dark:border-white/10 bg-gray-100/50 dark:bg-white/5 p-10 shadow-2xl backdrop-blur-lg">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Accelerate your team's workflow.
      </h2>

      {/* Container for the list of features */}
      <div className="mt-10 flex flex-col gap-8">
        {features.map((feature) => (
          // Individual feature item
          <div key={feature.name} className="flex items-start gap-4">
            {/* Icon container */}
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200/30 dark:border-white/10 bg-gray-200/50 dark:bg-white/5">
              <feature.icon
                className="h-6 w-6 text-gray-600 dark:text-neutral-300"
                aria-hidden="true"
              />
            </div>
            {/* Text content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {feature.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
