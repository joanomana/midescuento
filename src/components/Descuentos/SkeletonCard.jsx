export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-white border shadow-sm">
      <div className="aspect-[4/3] rounded-t-2xl bg-slate-100" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-24 bg-slate-100 rounded" />
        <div className="h-4 w-5/6 bg-slate-100 rounded" />
        <div className="h-3 w-1/3 bg-slate-100 rounded" />
        <div className="h-6 w-28 bg-slate-100 rounded" />
      </div>
    </div>
  );
}
