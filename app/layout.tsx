import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLD Practice Platform",
  description:
    "Practice Low-Level Design problems, submit solutions, receive feedback, and improve through repeated practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>

          <footer className="border-t border-zinc-800 bg-zinc-950">
            <div className="mx-auto max-w-6xl px-6 py-10">
              <div className="grid gap-10 md:grid-cols-2">
                {/* About the Project */}
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    LLD Practice Platform
                  </h2>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
                    A focused practice platform designed to help learners
                    practice Low-Level Design, submit solutions, receive
                    explainable feedback, and improve through repeated
                    practice.
                  </p>
                </div>

                {/* About Me */}
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    About Me
                  </h2>

                  <div className="mt-3 max-w-lg space-y-3 text-sm leading-6 text-zinc-400">
                    <p>
                      Hi, I&apos;m{" "}
                      <span className="font-medium text-zinc-200">
                        Utsav Kumar Jha
                      </span>
                      . I&apos;m a Computer Science &amp; Engineering (AI)
                      student at Government Engineering College, Munger. My
                      journey started with C programming — building
                      logic-heavy CLI tools — and has since expanded into the
                      world of Machine Learning and Deep Learning.
                    </p>

                    <p>
                      I enjoy understanding how things work at a deep level,
                      whether that&apos;s an algorithm, a data structure, or an
                      entire system. I write code not just to make things work,
                      but to make them work well.
                    </p>

                    <p>
                      My long-term goal is to contribute to impactful software
                      systems that combine performance, intelligence, and great
                      user experience — systems that genuinely matter.
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="mt-5 flex gap-5">
                    <a
                      href="https://github.com/UtsavJha01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      GitHub
                    </a>

                    <a
                      href="https://www.linkedin.com/in/utsavjha01/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="mt-10 border-t border-zinc-800 pt-6 text-center">
                <p className="text-sm text-zinc-500">
                  © 2026 Utsav Kumar Jha. All rights reserved.
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Built as an LLD engineering assignment.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
