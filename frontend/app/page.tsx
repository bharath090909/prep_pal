import Header from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Welcome to Prep Pal
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
            Your ultimate companion for interview preparation and career
            success.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="rounded-lg  px-6 py-3 font-semibold dark:text-black text-white transition-colors bg-button-bg">
              Get Started
            </button>
            <button className="rounded-lg border font-semibold border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
