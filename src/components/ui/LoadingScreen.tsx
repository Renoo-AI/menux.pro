

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-mx-bg">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-mx-accent opacity-20"></div>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-mx-border border-t-mx-accent"></div>
      </div>
      <p className="mt-4 font-display text-lg tracking-widest text-mx-muted">MENUXPRO</p>
    </div>
  );
}
