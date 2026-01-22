import type { Metadata } from "next";
import Link from "next/link";
import DemoForm from "@/app/components/forms/DemoForm";

export const metadata: Metadata = {
  title: "Call Center Software for Modern Customer Service Teams | Vocalcom",
  description: "All-in-one call center solution to manage inbound & outbound calls, digital channels, and AI — from a single platform. Cloud-based, scalable, designed for enterprise.",
  keywords: "call center software, contact center software, cloud call center, call center solution, omnichannel contact center, ai call center",
};

export default function CallCenterSoftwarePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Call Center Software for Modern Customer Service Teams
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                All-in-one call center solution to manage inbound & outbound calls, digital channels, and AI — from a single platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cloud-based</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Scalable for enterprise</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Designed for sales & support</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#demo" className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition text-center">
                  Request a Demo
                </a>
                <a href="#demo" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition text-center">
                  Talk to a Call Center Expert
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 border-b flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600 ml-2">Agent Workspace</div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">📞</div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">Incoming Call</div>
                        <div className="text-xs text-gray-600">John Smith - Premium Customer</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">💬</div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">Live Chat</div>
                        <div className="text-xs text-gray-600">2 messages waiting</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">🤖</div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">AI Assistant</div>
                        <div className="text-xs text-gray-600">Suggested response ready</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Companies Switch Their Call Center Software
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If you're searching for a call center solution, you're likely facing one (or more) of these issues:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Legacy phone systems that don't scale",
              "Disconnected tools for calls, chat, email & CRM",
              "Long wait times and poor call routing",
              "Limited visibility into agent performance",
              "Pressure to reduce costs without hurting CX",
              "AI projects that never move beyond experimentation"
            ].map((problem, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-red-500 text-2xl">❌</div>
                  <p className="text-gray-700 font-medium">{problem}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-xl font-semibold text-gray-900">
              You don't need more tools. You need one platform that works.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              A Complete Call Center Solution — Built for Performance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vocalcom provides a cloud-based call center platform that centralizes all customer interactions and optimizes agent productivity.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-16">
            {/* Feature 1: Voice */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl">📞</span>
                  <span className="font-semibold">Voice Management</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Inbound & Outbound Call Management</h3>
                <p className="text-gray-600 mb-6">
                  Handle all voice interactions with reliability and control.
                </p>
                <ul className="space-y-3">
                  {["Inbound & outbound calling", "Advanced IVR & call flows", "Skills-based & priority routing", "Call recording & monitoring"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-sm text-gray-500 mb-4">Call Routing Flow</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                      <div className="text-sm">Incoming call detected</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                      <div className="text-sm">Customer identified (CRM lookup)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                      <div className="text-sm">Routed to best available agent</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Omnichannel */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-sm text-gray-500 mb-4">Unified Agent Interface</div>
                  <div className="space-y-2">
                    {["📞 Phone", "💬 Live Chat", "📧 Email", "📱 SMS", "💚 WhatsApp", "🌐 Social"].map((channel, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{channel}</span>
                        <span className="text-xs text-green-600 font-semibold">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl">💬</span>
                  <span className="font-semibold">Omnichannel</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Omnichannel Contact Center</h3>
                <p className="text-gray-600 mb-6">
                  Go beyond voice with a fully unified contact center.
                </p>
                <ul className="space-y-3">
                  {["Phone, email, live chat, SMS, WhatsApp & social", "One agent interface for all channels", "Unified customer history", "Seamless channel switching"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3: AI */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl">🤖</span>
                  <span className="font-semibold">AI-Powered</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">AI-Powered Call Center Capabilities</h3>
                <p className="text-gray-600 mb-6">
                  Use AI to reduce workload and improve resolution, not to replace agents.
                </p>
                <ul className="space-y-3">
                  {[
                    "AI voicebots & chatbots for Tier-1 requests",
                    "Real-time agent assist & suggested replies",
                    "Automated call summaries & CRM updates",
                    "Conversation analytics & sentiment detection"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-sm text-gray-500 mb-4">AI Assistant in Action</div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-xs text-blue-600 font-semibold mb-2">Customer Question:</div>
                      <div className="text-sm text-gray-700">"What's my account balance?"</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <div className="text-xs text-purple-600 font-semibold mb-2">🤖 AI Suggested Response:</div>
                      <div className="text-sm text-gray-700">"Your current balance is $2,450.00. Would you like details on recent transactions?"</div>
                    </div>
                    <div className="text-xs text-gray-500 text-center">✨ Agent can use or modify suggestion</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: Analytics */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-sm text-gray-500 mb-4">Live Dashboard</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">94%</div>
                      <div className="text-xs text-gray-600">Service Level</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2:15</div>
                      <div className="text-xs text-gray-600">Avg Handle Time</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">78%</div>
                      <div className="text-xs text-gray-600">FCR Rate</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4.6</div>
                      <div className="text-xs text-gray-600">CSAT Score</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl">📊</span>
                  <span className="font-semibold">Analytics</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Call Center Analytics & Monitoring</h3>
                <p className="text-gray-600 mb-6">
                  Track performance in real time and optimize continuously.
                </p>
                <ul className="space-y-3">
                  {[
                    "Live dashboards & wallboards",
                    "Agent KPIs (AHT, FCR, SLA, CSAT)",
                    "Call playback & quality analysis",
                    "Custom reports & data export"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 5: WFM */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl">👥</span>
                  <span className="font-semibold">Workforce Management</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Workforce Management & Quality Assurance</h3>
                <p className="text-gray-600 mb-6">
                  Improve productivity while maintaining service quality.
                </p>
                <ul className="space-y-3">
                  {[
                    "Forecasting & scheduling",
                    "Quality scoring & evaluations",
                    "Coaching & performance insights",
                    "Compliance & audit readiness"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-sm text-gray-500 mb-4">Weekly Schedule Overview</div>
                  <div className="space-y-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="text-xs font-semibold text-gray-600 w-20">{day}</div>
                        <div className="flex-1 bg-gray-100 h-8 rounded-lg overflow-hidden flex">
                          <div className="bg-green-500 w-3/4" title="Scheduled"></div>
                          <div className="bg-yellow-500 w-1/4" title="Break"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Built for Enterprise Scale & Security
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you manage 50 or 5,000 agents, the platform scales with you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "☁️", title: "Cloud & Hybrid", desc: "Flexible deployment options" },
              { icon: "🌍", title: "Multi-Country", desc: "Global operations support" },
              { icon: "🔒", title: "Enterprise Security", desc: "SOC 2, GDPR compliant" },
              { icon: "🔌", title: "Open APIs", desc: "CRM & tool integrations" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Who Uses This Call Center Software?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ideal for organizations with high interaction volumes and complex operations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Customer support & service centers",
              "Sales & telesales teams",
              "Outsourced contact centers (BPOs)",
              "Financial services & insurance",
              "Retail & e-commerce support",
              "Utilities & telecommunications"
            ].map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-gray-900">{useCase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Measurable Results from Real Deployments
            </h2>
            <p className="text-xl text-purple-100">
              Typical impact across customer implementations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { metric: "+20–35%", label: "First Contact Resolution" },
              { metric: "−15–30%", label: "Average Handling Time" },
              { metric: "+25%", label: "Agent Productivity" },
              { metric: "−20%", label: "Cost per Interaction" },
              { metric: "+10–20pts", label: "Customer Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
                <div className="text-3xl font-bold mb-2">{stat.metric}</div>
                <div className="text-sm text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-purple-200 text-sm">
            Results vary based on use case & deployment
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Choose Vocalcom?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              "All-in-one call center & CX platform",
              "Proven in complex, high-volume environments",
              "AI + Human-first approach",
              "Fast deployment & expert support",
              "Built for performance, not vanity features",
              "Designed for long-term scalability"
            ].map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Is this a cloud-based call center solution?",
                a: "Yes — cloud-first with hybrid deployment options available for enterprise requirements."
              },
              {
                q: "Can it replace my current phone system?",
                a: "Yes. Vocalcom can fully replace legacy systems or integrate with existing infrastructure during migration."
              },
              {
                q: "Does it integrate with my CRM?",
                a: "Yes — native integrations and open APIs support Salesforce, Microsoft Dynamics, HubSpot, Zendesk, and custom systems."
              },
              {
                q: "How long does deployment take?",
                a: "Typical deployment ranges from 2-8 weeks depending on complexity, integrations, and customization requirements."
              },
              {
                q: "What support is included?",
                a: "24/7 technical support, dedicated customer success manager, training programs, and ongoing optimization consulting."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <summary className="font-semibold text-lg cursor-pointer text-gray-900">{faq.q}</summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Form Section */}
      <section id="demo" className="py-20 px-6 bg-gradient-to-br from-purple-700 to-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Modernize Your Call Center?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Whether you're replacing a legacy system or scaling a fast-growing operation, Vocalcom helps you turn your call center into a performance engine.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">Personalized Demo</div>
                    <div className="text-purple-200 text-sm">See the platform configured for your use case</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">Expert Consultation</div>
                    <div className="text-purple-200 text-sm">Discuss your requirements with a call center specialist</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">No Commitment</div>
                    <div className="text-purple-200 text-sm">Explore the platform with no obligation</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <DemoForm customButtonText="Request Call Center Demo" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
