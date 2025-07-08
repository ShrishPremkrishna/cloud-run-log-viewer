"use client"
import { Clock, CheckCircle, XCircle, Loader } from "lucide-react"

interface AgentInstance {
  id: string
  timestamp: string
  status: "SUCCESS" | "FAILURE" | "IN_PROGRESS"
  email?: string
}

interface AgentInstancesPanelProps {
  instances: AgentInstance[]
  selectedInstance: AgentInstance | null
  onSelectInstance: (instance: AgentInstance) => void
}

export function AgentInstancesPanel({ instances, selectedInstance, onSelectInstance }: AgentInstancesPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "FAILURE":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "IN_PROGRESS":
        return <Loader className="w-4 h-4 text-yellow-400 animate-spin" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "border-green-500/30 bg-green-900/20"
      case "FAILURE":
        return "border-red-500/30 bg-red-900/20"
      case "IN_PROGRESS":
        return "border-yellow-500/30 bg-yellow-900/20"
      default:
        return "border-gray-500/30 bg-gray-900/20"
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Agent Instances
        </h2>
        <p className="text-sm text-gray-400 mt-1">{instances.length} total runs</p>
      </div>

      {/* Instance List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          {instances.length > 0 ? (
            instances.map((instance) => (
              <div
                key={instance.id}
                onClick={() => onSelectInstance(instance)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-gray-800/70 ${
                  selectedInstance?.id === instance.id
                    ? "border-blue-500 bg-blue-900/20 shadow-lg"
                    : `border-gray-700 bg-gray-800/30 ${getStatusColor(instance.status)}`
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(instance.status)}
                    <span className="text-white font-mono text-sm">{instance.id}</span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      instance.status === "SUCCESS"
                        ? "bg-green-900/50 text-green-300"
                        : instance.status === "FAILURE"
                          ? "bg-red-900/50 text-red-300"
                          : "bg-yellow-900/50 text-yellow-300"
                    }`}
                  >
                    {instance.status}
                  </span>
                </div>

                <div className="text-gray-400 text-xs mb-1">{new Date(instance.timestamp).toLocaleString()}</div>

                {instance.email && <div className="text-gray-500 text-xs truncate">{instance.email}</div>}
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No agent instances yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 