interface LogItemProps {
  log: {
    log: {
      severity?: string
      message: string
      module?: string
      file?: string
      line?: number
      type?: string
    }
    originalTimestamp: string
  }
}

export function LogItem({ log }: LogItemProps) {
  const logData = log.log

  const severityColors = {
    INFO: {
      border: "border-l-blue-500",
      badge: "bg-blue-900/50 text-blue-300 border-blue-500/30",
    },
    WARNING: {
      border: "border-l-yellow-500",
      badge: "bg-yellow-900/50 text-yellow-300 border-yellow-500/30",
    },
    ERROR: {
      border: "border-l-red-500",
      badge: "bg-red-900/50 text-red-300 border-red-500/30",
    },
    DEFAULT: {
      border: "border-l-gray-500",
      badge: "bg-gray-700/50 text-gray-300 border-gray-500/30",
    },
  }

  const colors =
    severityColors[logData.severity?.toUpperCase() as keyof typeof severityColors] || severityColors.DEFAULT

  return (
    <div
      className={`font-mono text-sm p-3 bg-gray-800/50 border-l-2 ${colors.border} hover:bg-gray-800/70 transition-colors`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-0.5 text-xs font-medium rounded border ${colors.badge}`}>
            {logData.severity || "LOG"}
          </span>
          {logData.type === "structured" && logData.module && (
            <span className="text-gray-400 text-xs">
              {logData.module} ({logData.file}:{logData.line})
            </span>
          )}
        </div>
        <span className="text-gray-500 text-xs whitespace-nowrap ml-2">
          {new Date(log.originalTimestamp).toLocaleTimeString()}
        </span>
      </div>
      <pre className="whitespace-pre-wrap text-gray-300 text-xs leading-relaxed">{logData.message}</pre>
    </div>
  )
} 