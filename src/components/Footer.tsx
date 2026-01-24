export function Footer() {
  return (
    <footer className="border-t border-border py-8 bg-background mt-20">
      <div className="container mx-auto px-4 text-center text-zinc-600 text-xs font-mono uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} TERMINAL_REVERIE. SYSTEM_ONLINE.</p>
        <p className="mt-2 text-[10px]">[STACK]: NEXT.JS_V16 :: TAILWIND_V4 :: TYPESCRIPT</p>
      </div>
    </footer>
  );
}
