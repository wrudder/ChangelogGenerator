import { ExternalLink } from "lucide-react";
import type { Commit } from "../../../hooks/useCommits";

interface CommitTableProps {
  commits: Commit[];
}

const CommitTable = ({ commits }: CommitTableProps) => {
  if (!commits || commits.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-96 rounded-lg border border-gray-300 shadow-md">
      <table className="min-w-full table-fixed border-collapse">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="w-12 px-4 py-3 text-center text-sm font-semibold">
              Link
            </th>
            <th className="w-12 px-4 py-3 text-center text-sm font-semibold whitespace-nowrap">
              Short SHA
            </th>
            <th className="w-1/4 px-4 py-3 text-left text-sm font-semibold border-r border-indigo-500">
              Commit Title
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Commit Message
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {commits.map((commit) => (
            <tr key={commit.id ?? `${commit.short_sha}-${commit.title}`} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-center">
                {commit.github_commit_url && (
                  <a
                    href={commit.github_commit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                    title="View on GitHub"
                  >
                    <ExternalLink className="w-4 h-4 mx-auto" />
                  </a>
                )}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-indigo-800 border-r text-center">
                {commit.short_sha}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-indigo-800 border-r">
                {commit.title}
              </td>

              <td
                className="px-4 py-3 text-sm text-gray-800 truncate max-w-[500px]"
                title={commit.content}
              >
                {commit.content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitTable;
