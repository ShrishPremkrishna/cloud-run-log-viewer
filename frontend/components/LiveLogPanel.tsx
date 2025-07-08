"use client"
import { Search, Filter } from "lucide-react"
import { LogItem } from "./LogItem"

interface LiveLogPanelProps {
  logs: any[]
  searchFilter: string
  setSearchFilter: (value: string) => void
  severityFilter: string
  setSeverityFilter: (value: string) => void
  hideNoNewEmails: boolean
  setHideNoNewEmails: (value: boolean) => void
}

export function LiveLogPanel({
  logs,
  searchFilter,
  setSearchFilter,
  severityFilter,
  setSeverityFilter,
  hideNoNewEmails,
  setHideNoNewEmails,
}: LiveLogPanelProps) {
  const filteredLogs = logs.filter((log) => {
    if (hideNoNewEmails && log.log.message.includes("No new emails to process.")) {
      return false
    }
    if (severityFilter !== "ALL" && log.log.severity?.toUpperCase() !== severityFilter) {
      return false
    }
    if (searchFilter && !log.log.message.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Live Log Stream
        </h2>

        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Severity Filter */}
        <div className="flex flex-wrap gap-2 mb-3">
          {["ALL", "INFO", "WARNING", "ERROR"].map((level) => (
            <button
              key={level}
              onClick={() => setSeverityFilter(level)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                severityFilter === level
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-600 text-gray-300 hover:bg-gray-500"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Hide Filter */}
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={hideNoNewEmails}
            onChange={(e) => setHideNoNewEmails(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-300">Hide "No new emails"</span>
        </label>
      </div>

      {/* Log Stream */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, idx) => <LogItem key={idx} log={log} />)
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No logs match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 