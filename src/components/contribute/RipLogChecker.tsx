import { useState } from 'react';
import { useCheckLogMutation } from '../../store/services/logApi';
import LogCheckResult from './LogCheckResult';

// Self-contained FLAC rip-log checker for the contribute flow: paste an EAC or XLD
// log, get a 0–100 score + deductions. Advisory only — the score is not submitted
// with the contribution in this phase (no field is wired to it); it helps the
// contributor confirm their rip before uploading.
//
// Paste (not file upload): the contribute "upload" is itself a URL field and the
// codebase has no file-input component. Pasting also sidesteps log encoding — the
// browser decodes UTF-16 EAC logs to a Unicode string, which is what the API expects.

const labelClass = 'block text-sm font-medium text-gray-300 mb-1';

export default function RipLogChecker() {
  const [log, setLog] = useState('');
  const [checkLog, { data, isLoading, error, reset }] = useCheckLogMutation();

  const onCheck = () => {
    if (log.trim()) checkLog({ log });
  };

  return (
    <div className="space-y-2 rounded border border-gray-700/70 p-3">
      <label htmlFor="rip-log" className={labelClass}>
        Rip log (EAC / XLD)
      </label>
      <p className="text-xs text-gray-500">
        Optional. Paste your ripping log to check its score before contributing.
        Advisory only — the score is not saved with this contribution.
      </p>
      <textarea
        id="rip-log"
        value={log}
        onChange={(e) => {
          setLog(e.target.value);
          if (data || error) reset();
        }}
        rows={6}
        placeholder="Paste the contents of your EAC or XLD .log file…"
        className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 font-mono text-xs text-gray-200 focus:border-indigo-500 focus:outline-none"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCheck}
          disabled={!log.trim() || isLoading}
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Checking…' : 'Check log'}
        </button>
        {error && (
          <span className="text-sm text-red-400">
            Could not check the log. Please try again.
          </span>
        )}
      </div>
      {data && <LogCheckResult result={data} />}
    </div>
  );
}
