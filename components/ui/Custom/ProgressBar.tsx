export function ProgressBar({ progress, showPercentage = true, height = 'h-2', className = '' }) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full flex items-center gap-3 ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>

      {showPercentage && (
        <span className="text-sm font-medium text-gray-700">{clampedProgress}%</span>
      )}
    </div>
  );
}
