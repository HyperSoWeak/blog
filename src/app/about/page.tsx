/* eslint-disable @next/next/no-img-element */
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "About Me | Terminal Reverie",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 font-mono border-b border-border pb-4 text-white">
        <span className="text-primary">/</span>root<span className="text-zinc-500">/</span>
        about_me
      </h1>

      {/* Full-width Featured Image at Top */}
      <div className="mb-12 w-full h-48 md:h-100 overflow-hidden border border-border relative group bg-zinc-950">
        <img
          src="/images/about/featured.jpg"
          alt="Featured"
          className="w-full h-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d1117] via-transparent to-transparent"></div>
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-4 right-4 text-right">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] bg-black/50 px-2 py-1 border border-border/50">
            system_snapshot_v1.0.jpg
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Sidebar / Profile Card */}
        <div className="w-full md:w-1/4 flex flex-col gap-6 md:sticky md:top-24">
          <div className="flex md:flex-col gap-6 items-center md:items-stretch">
            {/* Avatar - Smaller on mobile and side-by-side with info if possible, or just centered */}
            <div className="group relative flex w-32 md:w-full aspect-square items-center justify-center overflow-hidden border border-border bg-zinc-950 shrink-0">
              <img
                src="/images/about/avatar.png"
                alt={siteConfig.profile.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Info Card */}
            <div className="grow md:grow-0 border border-border bg-zinc-950 p-4 font-mono text-xs space-y-3 shadow-sm w-full">
              <div className="flex justify-between border-b border-border pb-2 mb-2">
                <span className="text-primary font-bold">USER_PROFILE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ID:</span>
                <span className="text-foreground">{siteConfig.profile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ALIAS:</span>
                <span className="text-zinc-300">{siteConfig.profile.alias}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">LOC:</span>
                <span className="text-zinc-300">{siteConfig.profile.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">STATUS:</span>
                <span className="text-success">ONLINE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-2 gap-4">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center border border-border bg-zinc-950 p-2 transition-all hover:border-primary hover:bg-primary hover:text-black rounded-sm"
            >
              <Github size={20} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center border border-border bg-zinc-950 p-2 transition-all hover:border-primary hover:bg-primary hover:text-black rounded-sm"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center border border-border bg-zinc-950 p-2 transition-all hover:border-primary hover:bg-primary hover:text-black rounded-sm"
            >
              <Instagram size={20} />
            </a>
            <a
              href={`mailto:${siteConfig.profile.email}`}
              className="flex justify-center border border-border bg-zinc-950 p-2 transition-all hover:border-primary hover:bg-primary hover:text-black rounded-sm"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 space-y-8 font-mono leading-relaxed text-zinc-300 text-sm">
          {/* Lead */}
          <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 text-md text-foreground">
            <p>Terminal Reverie: Even 1s and 0s crave dreams.</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 border-b border-border pb-2">
              <span className="text-primary">#</span> 關於作者
            </h2>
            <p>
              我是 <strong className="text-foreground">{siteConfig.profile.name}</strong>
              ，來自台灣，畢業於高雄中學，目前就讀台大資工。網路上常見的 ID 是{" "}
              <code className="bg-zinc-800 px-1 py-0.5 rounded text-primary">
                HyperSoWeak
              </code> 或{" "}
              <code className="bg-zinc-800 px-1 py-0.5 rounded text-primary">
                {siteConfig.profile.alias}
              </code>
              ，一點自嘲，也是一種提醒，別忘了保持謙遜與幽默。
            </p>
            <p>
              我喜歡做各種專案，從遊戲、網站到應用程式開發，也曾涉足機器學習與資訊安全。範圍雖廣，沒有哪一項特別精通，但每一次嘗試都是一次探索，也是對這個世界更深一層的理解。
            </p>
            <p>
              小時候的夢想是當理論物理學家，也曾幻想當個數學家，但命運讓我掉進了程式的黑洞，從此迷失...或許是找到了更自由的維度。現在的我仍偶爾與拓樸學角力，只是它似乎沒打算讓我贏。
            </p>
            <p>
              目前正悠然地往演算法競賽靠近，雖然晚起步，但輸贏不重要，重要的是過程中那份「解開世界規律的快感」。
            </p>

            <blockquote className="border-l-2 border-zinc-700 pl-4 py-2 my-6 text-zinc-400 italic">
              每一行程式碼都是一次思考的痕跡，
              <br />
              每個錯誤都是通往真理的碎片。
            </blockquote>

            <p>我也偶爾寫些關於時間、記憶與人性的文字，當成是一種放鬆與自我對話的方式。</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 border-b border-border pb-2">
              <span className="text-primary">#</span> 關於本站
            </h2>
            <p>
              最早開始寫文章是在 HackMD
              上，那時只是想把想到的東西記錄下來。上了大學之後，看著身邊許多人都有自己的部落格，我也開始想擁有一個能真正屬於自己的空間。
            </p>
            <p>
              <strong className="text-foreground">Terminal Reverie</strong> 誕生於某個深夜的 Hugo
              架站實驗。靈感來自我腦中混沌卻執著的思緒。如今它已不再只是實驗，而是我親手重新設計與打造的
              blog。它是我在資訊之海中留下的燈塔，也是我寫給未來自己的備忘錄。
            </p>
            <p>
              這裡會記錄我學習資工的點滴，包括筆記、實驗、奇怪的
              bug，也會寫些生活觀察、創作靈感、甚至哲學碎語。希望這裡能成為一個思想碰撞與靈感交織的空間，如果你也剛好停留在這裡，歡迎與我交流。也許在彼此的思緒交會之中，我們都能更接近那個還未定義的自己。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
