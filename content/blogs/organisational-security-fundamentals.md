---
title: "What Organisations Actually Get Wrong About Cybersecurity"
excerpt: "Most breaches exploit a small set of recurring failures — not exotic zero-days. This is what the incident data actually shows, and what organisations consistently get wrong."
date: "2025-06-14"
author: "Vibhum Dubey"
tags: ["awareness", "organisational security", "incident response", "fundamentals", "risk management"]
coverImage: "/blog-covers/organisational-security.jpg"
featured: false
readingTime: 7
---

Every year, industry reports document thousands of breaches. The causes, when you look across the data, are remarkably consistent. Organisations are not losing data to novel, exotic attacks in most cases. They are losing it to the same failures, repeated at scale, across different industries and geographies.

This post documents what the incident data actually shows — and the organisational mistakes that make those incidents possible.

---

## Mistake 1: Treating Security as a Compliance Checkbox

The most pervasive mistake. An organisation gets an ISO 27001 certificate or completes an annual VAPT engagement, and security is filed as "done" for the year. The certificate proves that controls existed at a point in time. It does not prove that those controls are effective, correctly configured, or actually used.

**What this looks like in practice**: Policies exist but are not enforced. Penetration testing reports contain critical findings that are remediated for the assessment and then quietly de-prioritised. Security questionnaires are completed honestly by people who have not verified the answers against actual system configuration.

**The alternative**: Continuous verification. Automated security scanning in CI/CD pipelines. Regular internal red team exercises that test controls against real adversary techniques. Treating the pentest report as the start of a remediation project, not its end.

---

## Mistake 2: Underestimating the Insider Threat

The phrase "insider threat" conjures images of malicious employees stealing data for competitors. The more common case is mundane: an employee clicks a phishing link, uses the same password across work and personal accounts, or connects an infected personal device to the corporate network.

The threat model needs to account for both:

**Unintentional insider**: The employee who isn't malicious but whose credentials are compromised because of poor personal hygiene, or who responds to a social engineering attack. This is the most common path of initial access in enterprise breaches.

**Intentional insider**: The employee with elevated access and a grievance — or a financial incentive. Insider threats are harder to detect than external attacks because the activity looks legitimate.

**Minimum controls for both**:
- Principle of least privilege: users have access only to what they need for their current role, reviewed on a regular schedule
- Separation of duties on high-value operations (no single person can authorise and execute a large financial transaction)
- Monitoring of privileged account activity with alerts on anomalous behaviour
- Offboarding procedures that immediately revoke access across all systems — including SaaS and cloud services that may not be in the HR system's purview

---

## Mistake 3: No Asset Inventory

You cannot protect what you don't know you have. This sounds obvious. It is also genuinely rare for organisations of any size to have a complete, accurate, up-to-date asset inventory.

Shadow IT makes this worse. Employees spin up cloud resources, install SaaS tools on corporate cards, and connect personal devices — all outside the visibility of IT. Attackers find these forgotten assets through automated internet scanning. The organisation finds them through breach notifications.

**Asset inventory is not a one-time project.** It requires:
- Automated discovery (network scanning, cloud API enumeration, software asset management agents)
- A process for employees to register new services and tools
- Regular reconciliation against what's actually running versus what's in the inventory
- A clear owner for each asset

---

## Mistake 4: Inadequate Identity and Access Management

Identity is the new perimeter. When attackers get hold of credentials — through phishing, password reuse, or credential purchase on dark web markets — strong network perimeter controls provide limited protection because the access looks legitimate.

**The recurring failure pattern**:
- No MFA on remote access (VPN, RDP, cloud consoles)
- Service accounts with excessive privileges and passwords that never rotate
- Shared credentials used by multiple people (so no individual accountability)
- Offboarded employees whose accounts remain active weeks after departure
- Cloud IAM misconfiguration: publicly accessible storage, overly permissive instance roles

**The corrective measures are known**: MFA everywhere externally accessible, managed service account credentials via a vault, individual accounts for all users with role-based access control, automated offboarding triggers tied to HR systems.

---

## Mistake 5: No Tested Incident Response Plan

Every organisation should have a plan for what happens when — not if — a security incident occurs. Most don't. Of those that do, most have never tested it.

An untested IR plan is roughly as useful as an untested fire evacuation plan. When the moment comes, people discover the emergency contact numbers are wrong, the backup system hasn't been tested, legal and communications aren't looped in, and no one is sure who has authority to make containment decisions.

**A minimal IR plan answers these questions in advance**:
- Who declares an incident, and what are the escalation paths?
- Who has authority to take containment actions (isolate systems, revoke credentials, engage external help)?
- What are the legal notification requirements (CERT-In mandatory reporting within 6 hours for certain incident types)?
- Who communicates externally — to customers, regulators, press — and what is the approval process?
- Where are the backups, and have they been tested recently?
- What is the forensic preservation procedure to avoid destroying evidence while containing the incident?

**Then test it.** Tabletop exercises — walkthroughs of realistic scenarios with the relevant stakeholders — expose gaps without the cost and stress of a real incident.

---

## Mistake 6: Security Awareness Training That Doesn't Change Behaviour

Annual compliance training in the form of a 45-minute click-through module with a quiz at the end produces one outcome reliably: completion certificates. There is no evidence it changes employee behaviour in meaningful ways.

Effective security awareness training has different characteristics:
- Short, frequent, and relevant to the actual threats employees face in their roles
- Simulated phishing campaigns that provide immediate feedback at the moment of failure
- Tailored to specific risk groups (finance staff face different threats than developers)
- Measured by behaviour change (phishing simulation click rates, reported incidents) rather than completion rates

Awareness is not a training event. It is a continuous programme that keeps threat information fresh and specific.

---

## The Consistent Thread

The common thread across all six mistakes is the gap between the appearance of security and its substance. Certificates, policies, training completion rates, and vendor purchases create the appearance of security. Continuous testing, verification, and measurement of actual behaviour create the substance.

Attackers don't probe for certifications. They probe for controls that aren't actually working.

---

## Where to Start

If your organisation needs to prioritise, the data suggests this sequence:

1. **MFA on all externally accessible systems** — this closes the majority of credential-based attack paths
2. **Asset inventory** — know what you're protecting
3. **Tested incident response plan** — you will eventually need it
4. **Patch management** — unpatched known vulnerabilities remain one of the most common breach causes
5. **Security awareness training** redesigned around behaviour change, not completion

None of these require significant budget. They require organisational will and consistent execution.

---

*Cybercell provides security assessments, penetration testing, and awareness training calibrated to the specific threat landscape facing Indian organisations. [Contact us](/contact) to discuss what your organisation actually needs.*
