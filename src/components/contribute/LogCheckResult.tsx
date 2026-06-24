import type { LogCheckResult as Result } from '../../store/services/logApi';

// Presentational only — renders a scored EAC/XLD log: the 0–100 score colored by
// value (mirrors the threshold-coloring idiom in profile/RatioStats.tsx) and the
// per-rule deduction list (the legacy "Details" block).

const scoreColor = (score: number): string => {
  if (score >= 95) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

export default function LogCheckResult({ result }: { result: Result }) {
  if (result.ripper === null) {
    return (
      <p className="text-sm text-red-400">
        {result.deductions[0]?.message ??
          'Unrecognized log — not an EAC or XLD log.'}
      </p>
    );
  }

  return (
    <div className="space-y-2" data-testid="log-check-result">
      <div className="flex items-baseline gap-2">
        <span className="text-sm text-gray-400">
          {result.ripper}
          {result.version ? ` ${result.version}` : ''} log score:
        </span>
        <span className={`text-lg font-semibold ${scoreColor(result.score)}`}>
          {result.score}
        </span>
        <span className="text-sm text-gray-500">/ 100</span>
        {result.isPerfect && (
          <span className="rounded bg-green-800 px-1.5 py-0.5 text-xs font-medium text-green-100">
            Perfect
          </span>
        )}
      </div>

      {result.deductions.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-xs text-gray-400">
          {result.deductions.map((d, i) => (
            <li key={i}>{d.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
