import { Commit } from "../../../hooks/useCommits";

interface CommitFooterProps {
  callbacks: {
    generateAISummary: () => void;
  };
  commits: Commit[];
  loadingChangelog: boolean;
}

const CommitFooter = ({ commits, callbacks: { generateAISummary }, loadingChangelog }: CommitFooterProps) => {
  return (
    <>
      <div className="mt-2 text-right text-indigo-900 font-semibold text-sm">
        Total commits: {commits.length}
      </div>

      <div className="flex justify-center mb-4">
        <button
          type="button"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={generateAISummary}
          disabled={loadingChangelog}
        >
          {loadingChangelog ? "Generating…" : "Generate Changelog"}
        </button>
      </div>
    </>
  );
};

export default CommitFooter;