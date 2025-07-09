"use client";

import { useState } from "react";

// Local quotes array
const quotes = [
  {
    topic: "inspiration",
    text: "The best way to get started is to quit talking and begin doing.",
  },
  {
    topic: "inspiration",
    text: "Don't let yesterday take up too much of today.",
  },
  {
    topic: "inspiration",
    text: "It's not whether you get knocked down, it's whether you get up.",
  },
  {
    topic: "success",
    text: "Success is not in what you have, but who you are.",
  },
  {
    topic: "success",
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
  },
  {
    topic: "success",
    text: "The road to success and the road to failure are almost exactly the same.",
  },
  {
    topic: "life",
    text: "Life is what happens when you're busy making other plans.",
  },
  { topic: "life", text: "Get busy living or get busy dying." },
  {
    topic: "life",
    text: "You only live once, but if you do it right, once is enough.",
  },
  {
    topic: "motivation",
    text: "The only way to do great work is to love what you do.",
  },
  {
    topic: "motivation",
    text: "Believe you can and you're halfway there.",
  },
  {
    topic: "motivation",
    text: "Don't watch the clock; do what it does. Keep going.",
  },
  {
    topic: "wisdom",
    text: "The only true wisdom is in knowing you know nothing.",
  },
  {
    topic: "wisdom",
    text: "Knowledge speaks, but wisdom listens.",
  },
  {
    topic: "wisdom",
    text: "The more you learn, the more you realize how much you don't know.",
  },
];

// Get unique topics for display
const availableTopics = [...new Set(quotes.map((q) => q.topic))];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<{ topic: string; text: string }[]>([]);
  const [searched, setSearched] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;

    const filtered = quotes
      .filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
      .slice(0, 3);
    setResults(filtered);
    setSearched(true);
  }

  function handleTopicClick(selectedTopic: string) {
    setTopic(selectedTopic);
    const filtered = quotes
      .filter((q) => q.topic.toLowerCase() === selectedTopic.toLowerCase())
      .slice(0, 3);
    setResults(filtered);
    setSearched(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quote Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Discover inspiring quotes for any topic
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <input
              type="text"
              placeholder="Enter a topic (e.g. inspiration, success, life)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg"
            >
              Get Quotes
            </button>
          </form>

          {/* Available Topics */}
          <div className="mb-4">
            <p className="text-gray-600 mb-3 font-medium">Popular topics:</p>
            <div className="flex flex-wrap gap-2">
              {availableTopics.map((t) => (
                <button
                  key={t}
                  onClick={() => handleTopicClick(t)}
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-all duration-200 font-medium capitalize"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {searched && results.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No quotes found for &quot;{topic}&quot;
              </h3>
              <p className="text-gray-600 mb-4">
                Try one of the popular topics above or search for something
                else.
              </p>
              <button
                onClick={() => {
                  setTopic("");
                  setResults([]);
                  setSearched(false);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Clear Search
              </button>
            </div>
          ) : results.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quotes about &quot;{topic}&quot;
              </h2>
              <div className="grid gap-4">
                {results.map((q, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-200"
                  >
                    <p className="text-xl text-gray-800 mb-3 italic">
                      &quot;{q.text}&quot;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 capitalize">
                        Topic: {q.topic}
                      </span>
                      <span className="text-2xl">💬</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Ready to discover quotes?
              </h3>
              <p className="text-gray-600">
                Enter a topic above or click on one of the popular topics to get
                started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
