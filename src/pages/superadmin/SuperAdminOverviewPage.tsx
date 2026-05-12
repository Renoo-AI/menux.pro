

export default function SuperAdminOverviewPage() {
  return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-bold text-mx-espresso mb-6">Platform Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-mx-surface p-6 rounded-xl border border-mx-border shadow-sm">
          <h3 className="text-sm font-medium text-mx-muted">Total Restaurants</h3>
          <p className="mt-2 text-3xl font-bold text-mx-espresso">12</p>
        </div>
      </div>
    </div>
  );
}
