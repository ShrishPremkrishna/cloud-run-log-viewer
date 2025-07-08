"use client"

import { useEffect, useState } from "react"
import { LiveLogPanel } from "./components/LiveLogPanel"
import { AnalysisHub } from "./components/AnalysisHub"
import { AgentInstancesPanel } from "./components/AgentInstancesPanel"

interface AgentInstance {
  id: string
  timestamp: string
  status: "SUCCESS" | "FAILURE" | "IN_PROGRESS"
  email?: string
}

export default function App() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hideNoNewEmails, setHideNoNewEmails] = useState(false)
  const [severityFilter, setSeverityFilter] = useState("ALL")
  const [searchFilter, setSearchFilter] = useState("")

  // New state for agent instances
  const [agentInstances, setAgentInstances] = useState<AgentInstance[]>([
    {
      id: "agent-001",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: "SUCCESS",
      email: "user@example.com",
    },
    {
      id: "agent-002",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      status: "FAILURE",
      email: "admin@company.com",
    },
    {
      id: "agent-003",
      timestamp: new Date().toISOString(),
      status: "IN_PROGRESS",
      email: "support@service.com",
    },
  ])
  const [selectedInstance, setSelectedInstance] = useState<AgentInstance | null>(null)

  useEffect(() => {
    // WebSocket connection logic with localhost fix
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    const host = window.location.hostname === 'localhost' ? 'localhost:5001' : window.location.host;
    const wsUrl = `${protocol}//${host}`
    const ws = new WebSocket(wsUrl)

    ws.onopen = () => {
      console.log("WebSocket connected")
      setLoading(false)
      setError(null)
    }

    ws.onmessage = (event) => {
      try {
        const newLogs = JSON.parse(event.data)
        if (Array.isArray(newLogs)) {
          setLogs((prevLogs) => [...prevLogs, ...newLogs])
        }
      } catch (e) {
        console.error("Failed to parse log data:", e)
      }
    }

    ws.onerror = (err) => {
      console.error("WebSocket error:", err)
      setError("Connection to log stream failed. Retrying...")
      setLoading(false)
    }

    ws.onclose = () => {
      console.log("WebSocket connection closed")
      setError("Connection lost. Retrying...")
      setLoading(false)
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }

    return () => {
      ws.close()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Connecting to AI Agent Dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md">
          <h2 className="text-red-400 font-semibold mb-2">Connection Error</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">AI Email Agent Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Real-time diagnostic and analysis platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Three Panel Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Panel 1: Live Log Stream (33%) */}
        <div className="w-1/3 min-w-0">
          <LiveLogPanel
            logs={logs}
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            severityFilter={severityFilter}
            setSeverityFilter={setSeverityFilter}
            hideNoNewEmails={hideNoNewEmails}
            setHideNoNewEmails={setHideNoNewEmails}
          />
        </div>

        {/* Panel 2: Analysis Hub (33%) */}
        <div className="w-1/3 min-w-0">
          <AnalysisHub selectedInstance={selectedInstance} />
        </div>

        {/* Panel 3: Agent Instances (33%) */}
        <div className="w-1/3 min-w-0">
          <AgentInstancesPanel
            instances={agentInstances}
            selectedInstance={selectedInstance}
            onSelectInstance={setSelectedInstance}
          />
        </div>
      </div>
    </div>
  )
} 