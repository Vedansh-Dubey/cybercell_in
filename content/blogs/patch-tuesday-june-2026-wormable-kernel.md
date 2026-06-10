---
title: "Microsoft June 2026 Patch Tuesday: 208 CVEs and a Wormable Kernel Flaw"
excerpt: "Microsoft's largest-ever Patch Tuesday ships 208 CVEs, including a CVSS 9.8 wormable kernel flaw that requires no credentials to exploit."
date: "2026-06-11"
author: "Vibhum Dubey"
tags: ["patch-tuesday", "windows-security", "vulnerability-management", "remote-code-execution"]
coverImage: "/blog-covers/patch-tuesday-june-2026-wormable-kernel.jpg"
featured: false
readingTime: 7
---

On June 9, 2026, Microsoft released security fixes for more than 200 vulnerabilities — the largest single Patch Tuesday in the programme's history. The prior record, set in 2025, stood at 177. This cycle breaks it by roughly 20 percent.

The volume alone would command attention. But buried in that count is one flaw — CVE-2026-45657 — that belongs in a different category of urgency. It is wormable, unauthenticated, and scores CVSS 9.8. Patch Tuesday June 2026 is not a routine maintenance window. It is a forcing function.

## Why CVE-2026-45657 Is the Flaw to Patch First

CVE-2026-45657 is a use-after-free vulnerability in the Windows Kernel, specifically in how the operating system processes TCP/IP traffic. An attacker can exploit it remotely — no credentials, no user interaction — to execute arbitrary code at SYSTEM privilege level.

SYSTEM is the ceiling. An attacker who reaches it can install and remove software, manipulate accounts, disable security tooling, and move laterally across the network at will. There is no meaningful escalation step left once SYSTEM is achieved.

The flaw is **wormable**, meaning a successful exploit can propagate automatically across a network without any further attacker input. Security researchers have drawn a direct comparison to EternalBlue, the exploit behind the 2017 WannaCry ransomware campaign. WannaCry infected over 200,000 systems across 150 countries within 72 hours of initial deployment. That outbreak is the baseline model for what a reliable exploit against CVE-2026-45657 could produce.

Microsoft currently rates exploitation as "less likely," which reflects the difficulty of writing a working exploit at the moment the patch ships — not a permanent ceiling. For critical TCP/IP kernel flaws at this severity, the window between patch release and the appearance of functional public proof-of-concept code is historically measured in days to weeks, not months.

### Affected Platforms and Patch References

CVE-2026-45657 affects all supported Windows 11 and Windows Server releases:

- Windows 11 versions 23H2, 24H2, 25H2, and 26H1 (x64 and ARM64)
- Windows Server 2022 and Windows Server 2025, including Server Core installations

| Platform | Knowledge Base Article |
|---|---|
| Windows 11 24H2 / 25H2 | KB5094126 |
| Windows Server 2025 | KB5094125 |
| Windows Server 2022 | KB5094128 |
| Windows 11 23H2 | KB5093998 |

Apply the relevant cumulative update via Windows Update, WSUS, or your endpoint management platform immediately. If your patch deployment cycle runs on a monthly cadence, this is the exception that warrants accelerated treatment.

## How to Prioritise the Rest of the 208 CVEs

The June 2026 release is not reducible to a single headline. Several other vulnerabilities in this cycle require prompt attention from enterprise security teams.

**CVE-2026-41091** is the confirmed zero-day under active exploitation in this cycle. Microsoft's advisory confirms in-the-wild use. Exact attack-chain details remain limited, but confirmed active exploitation places it at identical deployment urgency to CVE-2026-45657.

**CVE-2026-42897** is a cross-site scripting flaw in the Outlook Web Access component of Exchange Server, confirmed under active exploitation since May 14. XSS on a webmail interface enables credential theft, session hijacking, and — in Exchange environments — direct access to internal communications and calendar data. If this patch has not been applied, it is overdue.

**CVE-2026-49160** is an HTTP.sys denial-of-service vulnerability tied to the HTTP/2 Bomb technique, and it is publicly disclosed. Proof-of-concept material is available. Any Windows server handling HTTP/2 traffic — IIS deployments, cloud-facing Windows workloads — is exposed until patched.

### A Practical Triage Order

For security and IT operations teams managing large Windows estates, a workable sequence this cycle:

1. CVE-2026-45657 — wormable kernel remote code execution, CVSS 9.8, maximum blast radius
2. CVE-2026-41091 — confirmed active exploitation
3. CVE-2026-42897 — Exchange OWA cross-site scripting, active since May
4. CVE-2026-49160 — publicly disclosed HTTP.sys denial of service
5. Remaining criticals across Azure, Hyper-V, BitLocker, and Office components

CVE-2026-45657 and CVE-2026-41091 should close within 72 hours of patch availability. Remaining criticals within seven days. Standard business risk items within the usual 30-day cycle. If your current SLA does not support this tiering, this month is the right time to revise it.

## What Indian Enterprise Teams Should Do This Week

India's enterprise technology base skews heavily toward Windows. Three Indian organisations — 3i Infotech, IP Rings, and Aegle Aviation — were confirmed compromised on the same day these patches shipped, June 9. The timing is a pattern, not a coincidence.

Threat actors monitor Patch Tuesday releases. Analysing the binary diff between pre-patch and post-patch Windows components can reveal the precise mechanics of a vulnerability within hours of publication. This is well-established practice in offensive security circles. Patch deployment cycles measured in weeks create a window that informed attackers will use.

Specific actions for Indian IT and security teams this week:

- **Audit exposure immediately.** Query your asset management platform for all Windows 11 and Server 2022/2025 systems that have not yet received the June Cumulative Update. This list is your exposure map.
- **Segment vulnerable hosts.** Where patching cannot complete within 24 hours, consider isolating high-value servers — domain controllers, database servers, email infrastructure — from lateral movement paths until the update is applied.
- **Verify Defender tamper protection.** Ensure Microsoft Defender's tamper protection is active on all endpoints. A post-exploitation attacker's first step is typically disabling local security tooling. Tamper protection raises the bar on that.
- **Review your patch SLA.** If your programme currently targets 30 days for critical patches, CVE-2026-45657 is a concrete case for reassessment. The threat model has changed; the policy should reflect it.
- **Check SAP systems.** CVE-2026-44748, a CVSS 9.9 SAP SAML authentication bypass disclosed the same week, affects organisations running SAP on Windows infrastructure. Dual exposure this cycle for SAP environments.

## The Pattern Behind the Number

208 CVEs in a single month is not a statistical outlier that resolves next cycle. It is a directional signal. The Microsoft security perimeter — Windows, Exchange, Azure, Hyper-V, Secure Boot, Office, and now AI tooling — expands each year. The number of CVEs that can be assigned against that surface grows proportionally.

Vulnerability management programmes built on monthly cadences and undifferentiated 30-day SLAs were calibrated for a different environment. The current standard of care for wormable, unauthenticated, SYSTEM-level flaws is near-real-time response: identification within hours of publication, patch testing underway within 24, deployment complete within 72.

If your organisation cannot close a CVSS 9.8 wormable flaw within 48 hours of release, the gap is itself a finding. Not a future improvement area — a current exposure.

---

Cybercell can help your organisation assess and strengthen its vulnerability management programme against the current threat environment. [Get in touch](/contact).