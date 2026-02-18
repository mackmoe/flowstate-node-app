"use client";

import type { Metadata } from "next";
import { useState } from "react";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Callout from "@/components/Callout";

const kitIncludes = [
  {
    title: "Focus Playlist Guide",
    description: "Curated session structures for different types of deep work",
  },
  {
    title: "Flow State Triggers",
    description: "Science-backed techniques to enter flow faster",
  },
  {
    title: "Distraction Blockers",
    description: "Tools and strategies to eliminate digital interruptions",
  },
  {
    title: "Productivity Rituals",
    description: "Pre-session routines used by top performers",
  },
];

export default function KitPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Check your inbox! Your Focus Kit is on the way.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Connection error. Please check your internet and try again.");
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      <Container size="lg">
        {/* Header */}
        <SectionHeader
          title="Free Focus Kit"
          subtitle="Evidence-based tools and techniques to help you achieve peak productivity."
          accent="yellow"
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: What's Included */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">What's Included</h2>
            <div className="space-y-4">
              {kitIncludes.map((item, index) => (
                <Card key={index} hover={false} className="border-l-4 border-brand-yellow">
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Email Form */}
          <div>
            <Card className="sticky top-24" glow>
              <h3 className="text-2xl font-serif font-bold mb-4 text-center">
                Get Your Free Kit
              </h3>
              <p className="text-gray-400 text-center mb-6">
                Instant download. No spam. Unsubscribe anytime.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-brand-yellow hover:bg-brand-yellow/90"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Get Free Kit"}
                </Button>
              </form>

              {/* Status Messages */}
              {status === "success" && (
                <Callout variant="success" className="mt-4">
                  <p className="text-sm">{message}</p>
                </Callout>
              )}

              {status === "error" && (
                <Callout variant="warning" className="mt-4">
                  <p className="text-sm">{message}</p>
                </Callout>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
