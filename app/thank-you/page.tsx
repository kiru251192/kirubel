'use client';

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f172a]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-4">
          🎉 Thank you for your message!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          I'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:scale-105 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
