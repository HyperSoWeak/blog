import { Terminal, Github, Linkedin, Mail, Cpu } from "lucide-react";

export const metadata = {
  title: "About | Terminal Reverie",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 font-mono border-b border-border pb-4 text-white">
        <span className="text-primary">/</span>root<span className="text-zinc-500">/</span>
        sys_info
      </h1>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <div className="group relative flex aspect-square items-center justify-center overflow-hidden border border-border bg-zinc-950">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,240,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] duration-1000 group-hover:bg-[position:200%_0,0_0]"></div>
            <Terminal size={80} className="text-primary" />
          </div>

          <div className="mt-4 space-y-2 border border-border bg-zinc-950 p-4 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">STATUS:</span>
              <span className="text-green-500">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">UPTIME:</span>
              <span className="text-zinc-300">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">LOCATION:</span>
              <span className="text-zinc-300">LOCALHOST</span>
            </div>
          </div>
        </div>

        <div className="w-full space-y-6 font-mono text-sm leading-relaxed text-zinc-300 md:w-2/3">
          <div className="border-l-2 border-primary pl-4">
            <p className="mb-2 text-lg text-white">&gt; Hello, World.</p>
            <p>
              I am a software engineer obsessed with the intersection of clean code and chaotic
              systems. This blog is my public memory dump.
            </p>
          </div>

          <p>
            Here I document protocols, algorithms, and the occasional rant about web standards. The
            goal is simple: continuous integration of knowledge.
          </p>

          <div className="space-y-4 pt-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <Cpu size={20} className="text-primary" />
              TECH_STACK
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border bg-zinc-950 p-3">
                <h3 className="mb-2 text-xs font-bold uppercase text-primary">Frontend</h3>
                <ul className="list-none space-y-1 text-zinc-400">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>WebGL / Three.js</li>
                </ul>
              </div>
              <div className="border border-border bg-zinc-950 p-3">
                <h3 className="mb-2 text-xs font-bold uppercase text-primary">Backend</h3>
                <ul className="list-none space-y-1 text-zinc-400">
                  <li>Node.js / Deno</li>
                  <li>Go (Golang)</li>
                  <li>PostgreSQL</li>
                  <li>Redis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <a
              href="https://github.com"
              className="border border-border bg-zinc-950 p-2 transition-all hover:border-primary hover:bg-primary hover:text-black"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              className="border border-border bg-zinc-950 p-2 transition-all hover:border-primary hover:bg-primary hover:text-black"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:hello@example.com"
              className="border border-border bg-zinc-950 p-2 transition-all hover:border-primary hover:bg-primary hover:text-black"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
