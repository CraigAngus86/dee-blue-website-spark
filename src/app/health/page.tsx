
export default function HealthCheck() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">System Health: OK</h1>
        <p>Next.js is running correctly.</p>
        <p className="text-sm mt-4">Build Date: {new Date().toISOString()}</p>
      </div>
    </div>
  );
}
