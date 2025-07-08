"use client"

import { useState } from "react"
import { Brain, ArrowRightLeft, MessageSquare, Mail, Wrench, Send } from "lucide-react"

interface AnalysisHubProps {
  selectedInstance: any
}

export function AnalysisHub({ selectedInstance }: AnalysisHubProps) {
  const [activeTab, setActiveTab] = useState("summary")
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([])
  const [chatInput, setChatInput] = useState("")

  const tabs = [
    { id: "summary", label: "AI Summary", icon: Brain },
    { id: "io", label: "Input/Output", icon: ArrowRightLeft },
    { id: "chat", label: "Chat", icon: MessageSquare },
  ]

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    setChatMessages((prev) => [...prev, { role: "user", content: chatInput }])
    setChatInput("")

    // Simulate AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `I can help you analyze the agent instance "${selectedInstance?.id}". What specific aspect would you like to explore?`,
        },
      ])
    }, 1000)
  }

  if (!selectedInstance) {
    return (
      <div className="flex flex-col h-full bg-gray-900 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700 bg-gray-800/50">
          <h2 className="text-lg font-semibold text-white">Analysis Hub</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No Instance Selected</p>
            <p className="text-sm">Select an agent instance to begin analysis</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-700">
      {/* Header with Tabs */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <h2 className="text-lg font-semibold text-white mb-4">Analysis Hub</h2>
        <div className="flex space-x-1 bg-gray-700 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-600"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "summary" && (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-400" />
                AI-Generated Summary
              </h3>
              <div className="text-gray-300 leading-relaxed">
                <p>
                  This agent instance processed an email request and successfully completed its task. The agent utilized
                  multiple tools including database queries and API calls to generate a comprehensive response.
                  Processing time was within normal parameters with no critical errors detected.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "io" && (
          <div className="space-y-4">
            {/* Input Email Card */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-400" />
                Input Email
              </h3>
              <div className="bg-gray-900 rounded-md p-4 font-mono text-sm text-gray-300">
                <pre className="whitespace-pre-wrap">
                  {`From: user@example.com
Subject: Account Status Inquiry
Date: ${new Date().toLocaleString()}

Hi, I need to check my account status and recent transactions. 
Can you help me with this?

Thanks!`}
                </pre>
              </div>
            </div>

            {/* Agent Response Card */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <ArrowRightLeft className="w-5 h-5 mr-2 text-blue-400" />
                Agent Response
              </h3>
              <div className="bg-gray-900 rounded-md p-4 font-mono text-sm text-gray-300">
                <pre className="whitespace-pre-wrap">
                  {`Hello! I've checked your account status and recent transactions.

Account Status: Active
Recent Transactions: 3 transactions in the last 30 days
Last Login: ${new Date(Date.now() - 86400000).toLocaleString()}

Is there anything specific you'd like to know about your account?`}
                </pre>
              </div>
            </div>

            {/* Tools Used Card */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-yellow-400" />
                Tools Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {["get_user_data", "query_transactions", "check_account_status", "send_email"].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-mono border border-gray-600"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation about this agent instance</p>
                </div>
              ) : (
                chatMessages.map((message, idx) => (
                  <div key={idx} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about this agent instance..."
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 