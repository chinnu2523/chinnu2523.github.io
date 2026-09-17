export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web Security' | 'IoT & Embedded' | 'Cloud Architecture';
  period: string;
  technologies: string[];
  overview: string;
  problemStatement: string;
  architectureDetails: string[];
  keyOutcomes: string[];
  demoType: 'owasp-scanner' | 'iot-visualizer' | 'multicloud';
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  methodology: string;
  bullets: string[];
  skills: string[];
  badgeColor: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Cybersecurity' | 'Cloud Networking' | 'Governance & Threat' | 'Job Simulation' | 'Foundational';
  credentialUrl?: string;
  description: string;
  skillsCovered: string[];
  verified: boolean;
}

export const PERSONAL_INFO = {
  fullName: "Veera Guru Datta Srinidhi Visaka",
  displayName: "Visaka Srinidhi",
  heroTitle: "Cybersecurity Specialist & Multicloud Security Associate",
  tagline: "Proactive Defense. Network Reconnaissance. Cloud Hardening.",
  bio: "Detail-oriented cybersecurity analyst and penetration tester pursuing BCA at KL University (CGPA 8.7). Armed with real-world internship experience across Edufyi, Corizo, and Skill Dunia, plus certified credentials from Red Team Leaders, Aviatrix, Google, and ISC2. Dedicated to identifying critical attack vectors before adversaries do.",
  location: "Vijayawada, Andhra Pradesh, India",
  email: "chinnu.visakas@gmail.com",
  phone: "+91 9963759333",
  linkedin: "https://linkedin.com/in/visaka-srinidhi-a445a82al",
  linkedinHandle: "visaka-srinidhi-a445a82al",
  avatarUrl: "/visaka_photo.png",
  availabilityStatus: "Open for Full-time Roles & Security Analyst Positions",
  clearanceLevel: "THREAT ANALYST // TIER-1 SOC READY",
  metrics: [
    { label: "BCA CGPA", value: "8.7", subtitle: "KL University (2023–2026)" },
    { label: "Security Internships", value: "3+", subtitle: "Edufyi, Corizo, Skill Dunia" },
    { label: "Certifications & Simulations", value: "11+", subtitle: "Google, Aviatrix, Red Team, Deloitte" },
    { label: "OWASP Vectors", value: "10/10", subtitle: "Scanner Engineered" }
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "edufyi",
    role: "Cybersecurity Project Intern",
    company: "Edufyi Tech Solutions",
    period: "June 2025 – August 2025",
    location: "Remote / Hybrid",
    type: "Project Internship",
    summary: "Led the development and execution of an automated Web Application Vulnerability Scanner mapped against the OWASP Top 10 vulnerabilities.",
    methodology: "OWASP Testing Guide (OTG v4.2) & PTES",
    bullets: [
      "Engineered an automated Web Application Vulnerability Scanner structured around the OWASP Top 10 security framework.",
      "Executed manual and automated vulnerability assessments utilizing Linux penetration testing methodologies to uncover high-impact system weaknesses.",
      "Authored rigorous vulnerability reports and actionable remediation documentation directly delivered to engineering leads."
    ],
    skills: ["OWASP Top 10", "Web Pentesting", "Linux CLI", "Vulnerability Reporting", "Security Architecture"],
    badgeColor: "platinum"
  },
  {
    id: "corizo",
    role: "Cybersecurity & Network Penetration Testing Intern",
    company: "Corizo",
    period: "Internship",
    location: "Remote / Virtual",
    type: "Technical Internship",
    summary: "Hands-on network scanning, packet-level telemetry inspection, and exploitation workflows on live target virtual architectures.",
    methodology: "Network Reconnaissance & Vulnerability Analysis",
    bullets: [
      "Conducted extensive port scanning, service enumeration, and OS fingerprinting utilizing Nmap and Wireshark across diverse subnets.",
      "Applied core penetration testing exploitation fundamentals to discover misconfigured firewalls and unprotected protocols.",
      "Leveraged Linux command-line security suites to audit baseline security posture and document potential pivot routes."
    ],
    skills: ["Nmap", "Wireshark", "Packet Capture", "Network Architecture", "Exploitation Fundamentals"],
    badgeColor: "platinum"
  },
  {
    id: "skilldunia",
    role: "Cybersecurity Intern",
    company: "Skill Dunia",
    period: "Internship",
    location: "Virtual Labs",
    type: "Practical Training",
    summary: "Active network monitoring, continuous reconnaissance, and structured risk assessment in controlled multi-tenant virtual cyber labs.",
    methodology: "Continuous Security Monitoring & NIST CSF",
    bullets: [
      "Performed real-time network traffic monitoring and passive/active reconnaissance in enterprise virtual lab configurations.",
      "Executed structured vulnerability scanning drills and calculated qualitative risk priority ratings for identified assets.",
      "Hardened foundational cybersecurity operations through incident scenario drills and operational tool proficiency exercises."
    ],
    skills: ["Active Reconnaissance", "Virtual Lab SOC", "Risk Assessment", "Network Monitoring", "Security Posture"],
    badgeColor: "platinum"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "owasp-scanner",
    title: "OWASP Top 10 Web Vulnerability Scanner",
    subtitle: "Automated Security Audit & Remediation Platform",
    category: "Web Security",
    period: "June 2025 – August 2025",
    technologies: ["Python", "Linux", "OWASP Top 10", "HTTP Header Inspection", "Regex Payload Engine"],
    overview: "A specialized security tool built at Edufyi Tech Solutions designed to probe web targets against the OWASP Top 10, including SQL Injection, XSS, Broken Access Control, and Insecure Headers, outputting structured remediation roadmaps.",
    problemStatement: "Organizations frequently push web apps with basic misconfigurations and injection flaws. Traditional enterprise scanners are bulky and difficult for small development teams to parse quickly.",
    architectureDetails: [
      "Modular audit engines for SQLi, Reflected/Stored XSS, CSRF tokens, and security headers (CSP, HSTS, X-Frame-Options).",
      "Dynamic payload generator utilizing fuzzing patterns designed to test backend sanitization.",
      "Automated CVSS v3.1 scoring calculator producing prioritized mitigation plans for dev teams."
    ],
    keyOutcomes: [
      "Successfully identified critical misconfigurations and simulated injection bypasses in test labs.",
      "Generated clean, executive-ready technical remediation reports.",
      "Demonstrated practical defensive coding guidelines."
    ],
    demoType: "owasp-scanner",
    tags: ["OWASP", "Vulnerability Assessment", "Python", "Linux Pentest", "Remediation"]
  },
  {
    id: "esp32-iot-security",
    title: "IoT Security & Hardware Defense Architecture",
    subtitle: "Wireless Threat Mitigation using ESP32 Microcontroller",
    category: "IoT & Embedded",
    period: "February 2024 – April 2024",
    technologies: ["ESP32", "Wi-Fi 802.11", "Arduino IDE", "AES-128 Encryption", "Network Hardening"],
    overview: "A hardware security prototype establishing encrypted, tamper-resistant device telemetry over wireless networks while mitigating rogue AP injection and deauth attempts.",
    problemStatement: "IoT devices are notoriously vulnerable to eavesdropping, packet sniffing, and unauthorized Wi-Fi access due to plaintext telemetry and default firmware credentials.",
    architectureDetails: [
      "Configured secure Wi-Fi connection handshake with WPA2-Enterprise standards on the ESP32 chip.",
      "Programmed custom firmware in Arduino IDE to encrypt sensor telemetry payloads before transmission.",
      "Integrated rogue network intrusion detection to reject unauthorized management frames."
    ],
    keyOutcomes: [
      "Zero unencrypted data leakage during network traffic packet capture analysis in Wireshark.",
      "Resistant to basic Wi-Fi deauthentication and access point cloning attacks in lab tests.",
      "Full hardware-software integration validated on ESP32 development board."
    ],
    demoType: "iot-visualizer",
    tags: ["ESP32", "Hardware Security", "Wi-Fi Protocols", "Arduino IDE", "Embedded C++"]
  },
  {
    id: "multicloud-architecture",
    title: "Multicloud Zero-Trust Transit Architecture",
    subtitle: "Aviatrix-Certified High-Availability Security Mesh",
    category: "Cloud Architecture",
    period: "November 2025",
    technologies: ["Aviatrix ACE", "AWS VPC", "Azure VNet", "GCP VPC", "NGFW Deep Packet Inspection"],
    overview: "Architected a unified multicloud network transit topology providing centralized egress security, encrypted spoke-to-spoke communication, and continuous threat telemetry across AWS, Azure, and Google Cloud.",
    problemStatement: "Fragmented cloud environments suffer from disparate security policies, blind spots between VPCs, and complex egress filtering.",
    architectureDetails: [
      "Central Aviatrix transit gateway routing traffic across AWS, Azure, and GCP.",
      "Integrated Next-Generation Firewall (NGFW) insertion for automated deep-packet inspection.",
      "Standardized segmentation domain policies ensuring micro-isolated production workloads."
    ],
    keyOutcomes: [
      "End-to-end encrypted transit with zero-trust spoke-to-spoke network segmentation.",
      "Standardized cloud security compliance aligned with Aviatrix ACE certification standards."
    ],
    demoType: "multicloud",
    tags: ["Multicloud", "Aviatrix", "Cloud Security", "AWS", "Azure", "GCP", "Zero-Trust"]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "ccsc",
    title: "Cybersecurity Career Starter Certification (CCSC)",
    issuer: "Hack & Fix Academy",
    date: "March 2026",
    category: "Cybersecurity",
    description: "Rigorous training covering defensive strategies, vulnerability analysis, practical threat identification, and career-readiness in cybersecurity operations.",
    skillsCovered: ["Vulnerability Assessment", "Cyber Defense", "Incident Basics", "Security Tooling"],
    verified: true
  },
  {
    id: "ctiga",
    title: "Certified Threat Intelligence & Governance Analyst (CTIGA)",
    issuer: "Red Team Leaders",
    date: "February 2026",
    category: "Governance & Threat",
    description: "Advanced methodology in threat intelligence collection, adversary emulation frameworks (MITRE ATT&CK), risk management, and cybersecurity governance.",
    skillsCovered: ["Threat Intelligence", "MITRE ATT&CK", "Security Governance", "Risk Assessment"],
    verified: true
  },
  {
    id: "ccep",
    title: "Certified Cybersecurity Educator Professional (CCEP)",
    issuer: "Red Team Leaders",
    date: "February 2026",
    category: "Governance & Threat",
    description: "Pedagogy and technical leadership in delivering cyber hygiene, threat mitigation training, and security awareness culture across engineering teams.",
    skillsCovered: ["Cybersecurity Training", "Technical Communication", "Security Culture"],
    verified: true
  },
  {
    id: "aviatrix-ace",
    title: "Aviatrix Certified Engineer (ACE) – Multicloud Network Associate",
    issuer: "Aviatrix",
    date: "November 2025",
    category: "Cloud Networking",
    description: "Comprehensive multicloud network architecture design, security enforcement, transit gateway operations, and troubleshooting across AWS, Azure, GCP, and OCI.",
    skillsCovered: ["Multicloud Networking", "AWS / Azure / GCP", "Aviatrix Transit", "Egress Filtering", "Zero-Trust"],
    verified: true
  },
  {
    id: "google-foundations",
    title: "Foundations of Cybersecurity",
    issuer: "Google via Coursera",
    date: "November 2025",
    category: "Cybersecurity",
    description: "Core cybersecurity domains, historical threat landscape analysis, compliance standards (NIST, CIS), and security team roles in enterprise environments.",
    skillsCovered: ["NIST Framework", "Security Ethics", "CIS Controls", "Defense in Depth"],
    verified: true
  },
  {
    id: "google-play-safe",
    title: "Play It Safe: Manage Security Risks",
    issuer: "Google via Coursera",
    date: "November 2025",
    category: "Governance & Threat",
    description: "Comprehensive risk identification, qualitative/quantitative risk matrices, threat modeling, and incident response planning.",
    skillsCovered: ["Risk Management", "Threat Modeling", "Incident Response", "Asset Protection"],
    verified: true
  },
  {
    id: "isc2-cc",
    title: "ISC2 – Certified in Cybersecurity (CC) Domain 1: Security Principles",
    issuer: "ISC2",
    date: "2025",
    category: "Foundational",
    description: "Foundational security concepts including Confidentiality, Integrity, Availability (CIA Triad), access controls, authentication factors, and risk governance.",
    skillsCovered: ["CIA Triad", "Access Controls", "Security Principles", "Authentication Models"],
    verified: true
  },
  {
    id: "be10x-ai",
    title: "AI Tools & Prompt Engineering Workshop",
    issuer: "be10x",
    date: "December 2025",
    category: "Foundational",
    description: "Practical deployment of AI coding assistants, automated log parsing, and data analysis tools to accelerate security engineering workflows.",
    skillsCovered: ["AI Automation", "Log Analysis", "Prompt Engineering"],
    verified: true
  },
  {
    id: "web-dev-dream-india",
    title: "Certificate Course in Software Training (Web Designing)",
    issuer: "Dream India Technologies",
    date: "May 2023",
    category: "Foundational",
    description: "Front-end structure, responsive web principles, and web application architecture fundamentals—providing a strong basis for web app security testing.",
    skillsCovered: ["HTML5/CSS3", "JavaScript", "Web Architecture", "UI Structure"],
    verified: true
  },
  {
    id: "forage-aws",
    title: "AWS Solutions Architecture Job Simulation",
    issuer: "Forage",
    date: "December 2025",
    category: "Job Simulation",
    description: "Simulated architectural design of cloud hosting environments, cost optimization, disaster recovery, and VPC subnet security planning.",
    skillsCovered: ["AWS Architecture", "VPC Security", "Disaster Recovery", "Cloud Scalability"],
    verified: true
  },
  {
    id: "forage-deloitte-cyber",
    title: "Deloitte Cyber Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "December 2025",
    category: "Job Simulation",
    description: "Enterprise cyber risk assessment, forensic log analysis, remediation strategy formulation, and client presentation simulations.",
    skillsCovered: ["Forensic Analysis", "Enterprise Risk", "Client Briefing", "Remediation Strategy"],
    verified: true
  },
  {
    id: "forage-deloitte-data",
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "December 2025",
    category: "Job Simulation",
    description: "Statistical data modeling, exploratory telemetry data mining, and executive dashboard communication.",
    skillsCovered: ["Data Analysis", "Pattern Recognition", "Telemetry Metrics"],
    verified: true
  },
  {
    id: "forage-tata-cyber",
    title: "TATA Cybersecurity Analyst Job Simulation",
    issuer: "Tata Group (via Forage)",
    date: "2025",
    category: "Job Simulation",
    description: "Role-based simulated defense against corporate security incidents, identity management audits, and compliance evaluations.",
    skillsCovered: ["Incident Response", "IAM Auditing", "Corporate Cyber Defense"],
    verified: true
  }
];

export const SKILL_CATEGORIES = [
  {
    category: "Security & Penetration Testing",
    icon: "ShieldAlert",
    skills: [
      { name: "Web Application Pentesting", level: 90, note: "OWASP Top 10, Injection, Auth flaws" },
      { name: "Network Scanning & Enumeration", level: 92, note: "Nmap, Wireshark, Port mapping" },
      { name: "Vulnerability Assessment", level: 88, note: "CVE mapping, CVSS scoring, Remediation" },
      { name: "Active & Passive Reconnaissance", level: 90, note: "OSINT, Footprinting, Subnet discovery" },
      { name: "Exploitation Fundamentals", level: 82, note: "Proof of concept exploits, Post-scan checks" },
      { name: "Threat Intelligence & Governance", level: 85, note: "CTIGA Certified, MITRE ATT&CK framework" }
    ]
  },
  {
    category: "Cloud & Multicloud Security",
    icon: "Cloud",
    skills: [
      { name: "Multicloud Networking", level: 90, note: "AWS, Azure, GCP, OCI Transit" },
      { name: "Aviatrix Cloud Transit", level: 88, note: "ACE Certified, Spoke-to-spoke encryption" },
      { name: "Cloud Security Architecture", level: 85, note: "VPC/VNet security groups, NGFW insertion" },
      { name: "Zero-Trust Segmentation", level: 84, note: "Microsegmentation & egress filtering" },
      { name: "Scalable Hosting Design", level: 82, note: "High availability, load balancer security" }
    ]
  },
  {
    category: "Tools & Operating Systems",
    icon: "Terminal",
    skills: [
      { name: "Kali Linux & Linux CLI", level: 92, note: "Bash scripting, system hardening, daemon audit" },
      { name: "Nmap", level: 94, note: "NSE scripts, SYN scans, service detection" },
      { name: "Wireshark", level: 88, note: "TCP stream reassembly, packet filters, PCAP analysis" },
      { name: "ESP32 & Arduino IDE", level: 82, note: "Embedded C++, 802.11 frames, IoT encryption" },
      { name: "AI Threat & Data Analysis", level: 86, note: "Automated parsing, prompt-driven anomaly triage" }
    ]
  },
  {
    category: "Core Professional Competencies",
    icon: "FileCheck",
    skills: [
      { name: "Vulnerability Documentation", level: 95, note: "Actionable, engineer-ready remediation reports" },
      { name: "Analytical Problem-Solving", level: 92, note: "Root cause isolation, threat pattern mapping" },
      { name: "Risk Assessment & Governance", level: 88, note: "Quantitative & qualitative risk matrices" },
      { name: "Team Collaboration & Delivery", level: 90, note: "Cross-functional engineering & client communication" }
    ]
  }
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "KL University",
    location: "Vaddeswaram, Andhra Pradesh",
    period: "2023 – 2026",
    score: "CGPA: 8.7 / 10.0",
    highlight: "Top academic performer focusing on Computer Networks, Cybersecurity, and Cloud Systems."
  },
  {
    degree: "Intermediate (Class XII)",
    institution: "State Board",
    location: "Andhra Pradesh",
    period: "2023",
    score: "CGPA: 6.8 / 10.0",
    highlight: "Foundational mathematics and computer science."
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "State Board",
    location: "Andhra Pradesh",
    period: "2018",
    score: "CGPA: 6.0 / 10.0",
    highlight: "Core secondary school graduation."
  }
];
