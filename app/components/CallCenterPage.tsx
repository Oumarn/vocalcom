import Link from "next/link";
import DemoForm from "@/app/components/forms/DemoForm";

type CallCenterContent = {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    cta: string;
  };
  hero: {
    title: string;
    subtitle: string;
    benefits: string[];
    formTitle: string;
    formSubtitle: string;
    formButtonText: string;
  };
  results: {
    title: string;
    subtitle: string;
    metrics: Array<{ metric: string; label: string }>;
    disclaimer: string;
  };
  solution: {
    title: string;
    subtitle: string;
    features: Array<{
      badge: { emoji: string; label: string };
      title: string;
      description: string;
      items: string[];
      objective: string;
      visual: any;
    }>;
  };
  security: {
    title: string;
    subtitle: string;
    certifications: Array<{ logo: string; title: string }>;
    features: Array<{
      icon: string;
      color: string;
      title: string;
      description: string;
    }>;
  };
  salesforce: {
    badge: string;
    title: string;
    subtitle: string;
    benefits: string[];
    quote: string;
    image: string;
    imageAlt: string;
    appExchange: {
      label: string;
      value: string;
    };
  };
  integrations: {
    badge: string;
    title: string;
    subtitle: string;
    count: string;
    countLabel: string;
  };
  customerLogos: {
    badge: string;
    title: string;
  };
  useCases: {
    title: string;
    subtitle: string;
    cases: string[];
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      company: string;
      industry: string;
      logo: string;
      quote: string;
      author: string;
      role: string;
      stats: Array<{ label: string; value: string }>;
      color: string;
    }>;
  };
  finalCta: {
    title: string;
    subtitle: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
};

export default function CallCenterPage({ content }: { content: CallCenterContent }) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; badge: string; avatar: string; statColors: string[] }> = {
      blue: {
        bg: "from-blue-50 via-white to-white",
        border: "border-blue-100 hover:border-blue-300",
        badge: "bg-blue-500",
        avatar: "from-blue-400 to-purple-500",
        statColors: ["bg-green-50 text-green-600", "bg-blue-50 text-blue-600"]
      },
      purple: {
        bg: "from-purple-50 via-white to-white",
        border: "border-purple-100 hover:border-purple-300",
        badge: "bg-purple-500",
        avatar: "from-purple-400 to-pink-500",
        statColors: ["bg-green-50 text-green-600", "bg-purple-50 text-purple-600"]
      },
      green: {
        bg: "from-green-50 via-white to-white",
        border: "border-green-100 hover:border-green-300",
        badge: "bg-green-500",
        avatar: "from-green-400 to-teal-500",
        statColors: ["bg-green-50 text-green-600", "bg-blue-50 text-blue-600"]
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  const getSecurityColorClasses = (color: string) => {
    const colorMap: Record<string, { gradient: string; border: string }> = {
      teal: { gradient: "from-teal-100 to-teal-50", border: "border-teal-200 hover:border-teal-300" },
      violet: { gradient: "from-violet-100 to-violet-50", border: "border-violet-200 hover:border-violet-300" },
      orange: { gradient: "from-orange-100 to-orange-50", border: "border-orange-200 hover:border-orange-300" }
    };
    return colorMap[color] || colorMap.teal;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img src="/assets/logo-vocalcom.svg" alt="Vocalcom" className="w-44 lg:w-52" />
            </Link>
            <a href="#demo" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition">
              {content.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Form */}
      <section className="relative bg-white text-gray-900 pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/LP2_Landing_Page.jpeg" 
            alt="Call Center Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
                {content.hero.title}
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                {content.hero.subtitle}
              </p>
              <div className="space-y-3 mb-8">
                {content.hero.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Demo Form Card */}
            <div id="demo" className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.hero.formTitle}</h3>
                <p className="text-gray-600">{content.hero.formSubtitle}</p>
              </div>
              <DemoForm customButtonText={content.hero.formButtonText} />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-700 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {content.results.title}
            </h2>
            <p className="text-xl text-purple-100">
              {content.results.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.results.metrics.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:shadow-lg transition-all">
                <div className="text-3xl font-bold mb-2">{stat.metric}</div>
                <div className="text-sm text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-purple-200 text-sm">
            {content.results.disclaimer}
          </p>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {content.solution.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.solution.subtitle}
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-16">
            {content.solution.features.map((feature, featureIndex) => {
              const isEven = featureIndex % 2 === 0;
              const badgeColors = ["orange", "teal", "green", "orange", "orange"];
              const badgeColor = badgeColors[featureIndex] || "orange";
              const badgeClasses = badgeColor === "orange" 
                ? "bg-orange-100 text-orange-700" 
                : badgeColor === "teal"
                ? "bg-teal-100 text-teal-700"
                : "bg-green-100 text-green-700";

              return (
                <div key={featureIndex} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={!isEven ? 'order-2 lg:order-1' : ''}>
                    <div className={`inline-flex items-center gap-2 ${badgeClasses} px-4 py-2 rounded-full mb-4`}>
                      <span className="text-2xl">{feature.badge.emoji}</span>
                      <span className="font-semibold">{feature.badge.label}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {feature.objective && (
                      <p className="mt-6 text-sm text-gray-600 italic">
                        <strong>Objectif :</strong> {feature.objective}
                      </p>
                    )}
                  </div>
                  <div className={!isEven ? 'order-1 lg:order-2' : ''}>
                    {feature.visual.type === "screenshot" ? (
                      <div className="rounded-xl overflow-hidden max-w-md mx-auto">
                        <img src={feature.visual.image} alt={feature.visual.title} className="w-full shadow-2xl rounded-xl" />
                      </div>
                    ) : feature.visual.type === "workflow" ? (
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                          <div className="text-sm text-gray-500 mb-4">{feature.visual.title}</div>
                          <div className="space-y-3">
                            {feature.visual.steps.map((step: any, i: number) => {
                              const colorMap: Record<string, string> = {
                                blue: "bg-blue-500",
                                purple: "bg-purple-500",
                                green: "bg-green-500"
                              };
                              return (
                                <div key={i} className="flex items-center gap-3">
                                  <div className={`w-8 h-8 ${colorMap[step.color]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{step.number}</div>
                                  <div className="text-sm">{step.text}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : feature.visual.type === "channels" ? (
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                          <div className="text-sm text-gray-500 mb-4">{feature.visual.title}</div>
                          <div className="space-y-2">
                            {feature.visual.channels.map((channel: any, i: number) => (
                              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm">{channel.emoji} {channel.name}</span>
                                <span className="text-xs text-green-600 font-semibold">Actif</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : feature.visual.type === "ai-assistant" ? (
                      <div className="relative rounded-xl overflow-hidden">
                        <img 
                          src="/assets/AIHumanAgent.jpg" 
                          alt="AI Assistant" 
                          className="w-full h-auto object-cover rounded-xl shadow-2xl"
                        />
                      </div>
                    ) : feature.visual.type === "stats" ? (
                      <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-xl p-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                          <div className="text-sm text-gray-500 mb-4">{feature.visual.title}</div>
                          <div className="space-y-4">
                            {feature.visual.stats.map((stat: any, i: number) => {
                              const colorMap: Record<string, string> = {
                                green: "bg-green-50 text-green-600",
                                blue: "bg-blue-50 text-blue-600",
                                purple: "bg-purple-50 text-purple-600"
                              };
                              return (
                                <div key={i} className={`flex items-center justify-between p-3 ${colorMap[stat.color]} rounded-lg`}>
                                  <span className="text-sm font-medium">{stat.label}</span>
                                  <span className="text-xl font-bold">{stat.value}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security and Compliance Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              {content.security.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.security.subtitle}
            </p>
          </div>

          {/* Certifications grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {content.security.certifications.map((cert, index) => (
              <div
                key={index}
                className="group flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-16 flex items-center justify-center mb-2">
                  <img 
                    src={cert.logo} 
                    alt={cert.title}
                    className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <p className="text-[10px] text-center text-gray-600 font-medium">{cert.title}</p>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {content.security.features.map((feature, index) => {
              const colors = getSecurityColorClasses(feature.color);
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-8 border-2 ${colors.border} hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-6 text-3xl`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Salesforce Integration Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-700 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span className="font-semibold text-sm">{content.salesforce.badge}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                {content.salesforce.title}
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                {content.salesforce.subtitle}
              </p>
              <div className="space-y-4 mb-8">
                {content.salesforce.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-purple-50">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <p className="text-purple-100 italic">
                  "{content.salesforce.quote}"
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <img 
                  src={content.salesforce.image}
                  alt={content.salesforce.imageAlt}
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-violet-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{content.salesforce.appExchange.label}</div>
                    <div className="font-bold text-gray-900 text-sm">{content.salesforce.appExchange.value}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></div>
              <p className="text-xs text-violet-700 font-medium uppercase tracking-wider">{content.integrations.badge}</p>
            </div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 tracking-tight whitespace-pre-line">
              {content.integrations.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {content.integrations.subtitle}
            </p>
          </div>

          {/* Integration logos grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 max-w-md md:max-w-none mx-auto">
            {[
              { name: "Salesforce", logo: "/assets/Salesforce.com_logo.svg.png" },
              { name: "Microsoft Dynamics", logo: "/assets/Microsoft_Dynamics_logo.png" },
              { name: "Zendesk", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Zendesk_logo.svg" },
              { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
              { name: "Zoho CRM", logo: "/assets/Zoho_CRM_Logo.png" },
              { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" }
            ].map((integration, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center h-24 bg-white rounded-xl border border-gray-200 hover:border-violet-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden p-4"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-violet-50/50 group-hover:via-purple-50/30 group-hover:to-blue-50/50 transition-all duration-300"></div>
                <img 
                  src={integration.logo} 
                  alt={integration.name}
                  className="relative z-10 max-w-full max-h-full object-contain transition-all duration-300"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(231deg) brightness(95%) contrast(101%)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* +200 integrations */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-full">
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{content.integrations.count}</span>
              <span className="text-sm text-gray-600">{content.integrations.countLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logos Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 shadow-lg shadow-violet-500/10 mb-4">
              <span className="text-xs font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                {content.customerLogos.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{content.customerLogos.title}</h3>
          </div>
          <div className="relative bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-2xl py-8 shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
            <div className="overflow-hidden">
              <div className="flex animate-[scroll-left_25s_linear_infinite]">
                <div className="flex items-center gap-16 px-8 shrink-0">
                  {[
                    "/logos/Blancheporte.png",
                    "/logos/Konecta_logo.png",
                    "/logos/Logo_fcbarcelone.png",
                    "/logos/Nexity_logo.png",
                    "/logos/SFR_Logo.png",
                    "/logos/Stellantis_logo.png",
                    "/logos/Vodafone_logo.png",
                    "/logos/Volkswagen_logo.png",
                    "/logos/armatis.png",
                    "/logos/bnp paribas logo.png",
                    "/logos/conentrix webhelp.png",
                    "/logos/engie_logo.png",
                    "/logos/macdonald_logo.png",
                    "/logos/renault.svg"
                  ].map((logo, i) => (
                    <img key={i} src={logo} alt="" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                  ))}
                </div>
                <div className="flex items-center gap-16 px-8 shrink-0">
                  {[
                    "/logos/Blancheporte.png",
                    "/logos/Konecta_logo.png",
                    "/logos/Logo_fcbarcelone.png",
                    "/logos/Nexity_logo.png",
                    "/logos/SFR_Logo.png",
                    "/logos/Stellantis_logo.png",
                    "/logos/Vodafone_logo.png",
                    "/logos/Volkswagen_logo.png",
                    "/logos/armatis.png",
                    "/logos/bnp paribas logo.png",
                    "/logos/conentrix webhelp.png",
                    "/logos/engie_logo.png",
                    "/logos/macdonald_logo.png",
                    "/logos/renault.svg"
                  ].map((logo, i) => (
                    <img key={i} src={logo} alt="" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {content.useCases.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.useCases.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.useCases.cases.map((useCase, index) => (
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

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
              </svg>
              {content.testimonials.badge}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              {content.testimonials.title}
            </h2>
            <p className="text-lg text-gray-600">
              {content.testimonials.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.testimonials.items.map((testimonial, index) => {
              const colors = getColorClasses(testimonial.color);
              const initials = testimonial.author.split(' ').map(n => n[0]).join('');
              
              return (
                <div key={index} className={`relative bg-gradient-to-br ${colors.bg} p-8 rounded-2xl border-2 ${colors.border} hover:shadow-2xl transition-all duration-300`}>
                  <div className={`absolute top-4 right-4 ${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {testimonial.industry}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center p-2">
                      <img src={testimonial.logo} alt={testimonial.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{testimonial.company}</div>
                      <div className="text-xs text-gray-500">{testimonial.industry}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="space-y-3 mb-6">
                    {testimonial.stats.map((stat, statIndex) => (
                      <div key={statIndex} className={`flex items-center justify-between p-3 ${colors.statColors[statIndex]} rounded-lg`}>
                        <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                        <span className="text-2xl font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors.avatar} flex items-center justify-center text-white font-bold text-sm`}>
                      {initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-700 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {content.finalCta.title}
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            {content.finalCta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#demo" className="bg-white text-orange-700 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition text-center">
              {content.finalCta.buttons.primary}
            </a>
            <a href="#demo" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-700 transition text-center">
              {content.finalCta.buttons.secondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
