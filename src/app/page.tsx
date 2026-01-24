import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Hero / Terminal Buffer */}
      <section className="border border-border bg-zinc-950 p-6 md:p-10 font-mono text-sm md:text-base relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary opacity-50"></div>

        <div className="space-y-2 text-zinc-400">
          <p>
            <span className="text-primary">sysadmin@terminal-reverie</span>:
            <span className="text-blue-500">~</span>$ ./init_sequence.sh
          </p>
          <p className="pl-4 text-zinc-500">Loading modules...</p>
          <p className="pl-4 text-zinc-500">Connecting to neural interface...</p>
          <p className="pl-4 text-success">Access Granted.</p>
          <br />
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
            TERMINAL REVERIE
          </h1>
          <p className="max-w-2xl text-zinc-300 leading-relaxed">
            Welcome to the digital archive. This is a personal exploration of software engineering,
            distributed systems, and the ghost in the machine.
          </p>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section>
        <div className="flex items-end justify-between mb-6 border-b border-border pb-2">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Terminal size={20} />
            LATEST_LOGS
          </h2>
          <Link
            href="/archive"
            className="text-xs font-mono text-zinc-500 hover:text-primary flex items-center gap-1 transition-colors group"
          >
            [VIEW_ALL_LOGS]{" "}
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
