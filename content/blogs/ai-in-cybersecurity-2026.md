---
title: "AI in Cybersecurity: The Double-Edged Sword Reshaping Defence"
excerpt: "Artificial intelligence is simultaneously the most powerful tool defenders have ever had and the most dangerous capability attackers have ever gained. Understanding both sides is no longer optional."
date: "2026-03-10"
author: "Vibhum Dubey"
tags: ["AI", "machine learning", "threat detection", "blue team"]
coverImage: "/blog-covers/ai-cybersecurity.jpg"
featured: false
readingTime: 8
---

Artificial intelligence entered the cybersecurity conversation with enormous promise: systems that could detect threats faster than any human analyst, correlate signals across millions of events in real time, and respond to incidents before damage spread. That promise is now partially real — and the other half of the story is that the same technology is making attackers significantly more capable.

This piece examines both sides with specificity. Not the hype, not the fear — the actual current state.

---

## What AI Is Actually Doing Well on the Defence Side

### Behavioural Anomaly Detection

Traditional signature-based detection fails against novel malware and living-off-the-land attacks by definition — it only catches what it has seen before. AI-based behavioural detection watches *how* processes behave rather than *what* they are. A legitimate `powershell.exe` running in an enterprise looks different from one that has been spawned by a malicious Office macro and is now making outbound connections to an unfamiliar IP.

Modern endpoint detection and response (EDR) platforms use gradient-boosted trees and neural networks to build baselines of normal behaviour per user, per machine, per network segment — and flag deviations. The false positive rate is still a problem, but it has dropped dramatically from the early-generation systems of 2018–2020.

### Threat Intelligence Correlation

Security operations centres drown in data. A mid-sized enterprise might generate tens of millions of log events per day. No human team can read that. AI-driven SIEM (Security Information and Event Management) platforms can correlate across log sources — firewall, endpoint, cloud, identity — and surface the handful of event chains that actually warrant human attention.

The practical result: a trained analyst spends their time on real incidents rather than chasing noise.

### Vulnerability Prioritisation

Having 3,000 open CVEs in your environment is common. Knowing which 30 to patch first is the actual hard problem. AI models trained on exploit availability, CVSS scores, asset criticality, and observed threat actor TTPs can rank vulnerabilities by actual risk rather than theoretical severity. This has materially changed how mature security teams do patch management.

---

## What AI Is Doing on the Attacker Side

### AI-Generated Phishing at Scale

The grammatical errors and awkward phrasing that once made phishing emails detectable are gone. Large language models can generate contextually appropriate, grammatically perfect lures in any language, tailored to any industry or individual. A threat actor with basic API access to a commercial LLM can generate 10,000 personalised phishing emails in the time it once took to write one.

Worse: AI can scrape LinkedIn profiles, news mentions, and social media to personalise each lure with accurate details about the target's employer, role, and recent professional activity.

### Automated Vulnerability Discovery

Code analysis models trained on millions of open-source repositories can now identify vulnerability patterns — buffer overflows, injection points, authentication flaws — at a scale and speed no human auditor can match. Offensive security researchers are using these tools legitimately for bug bounty work. Adversaries are using them to find zero-days in production software.

### Adversarial Attacks on AI Defences

The most sophisticated concern: AI systems defending infrastructure can themselves be attacked. Adversarial machine learning techniques allow attackers to craft inputs that cause AI models to misclassify malicious activity as benign. An AI-based network intrusion detection system can be fooled by subtly crafted traffic patterns that fall just outside its decision boundary.

This is not theoretical. Research published in 2024 and 2025 demonstrated adversarial bypass of commercial EDR products using gradient-based perturbation techniques.

---

## The Skills Gap This Creates

AI-driven security tools require security professionals who understand enough about machine learning to:

- Tune models rather than treat them as black boxes
- Recognise when a model is drifting or being poisoned
- Interpret confidence scores and uncertainty rather than binary outputs
- Design training pipelines that don't introduce bias toward historical attack patterns

This is a new category of skill that sits at the intersection of data science and security operations. The supply of people with both skill sets is currently well below demand.

---

## What Organisations Should Do

**1. Invest in AI-augmented tooling, not AI-replacement tooling.** AI works best as a force multiplier for human analysts, not as an unsupervised autonomous system making containment decisions.

**2. Red-team your AI defences.** If you have deployed AI-based detection, test it adversarially. Hire someone to attempt bypass. Assume attackers are already trying.

**3. Train your analysts on AI literacy.** They do not need to become data scientists. They need to understand what the models are doing, what their failure modes are, and when not to trust the output.

**4. Do not assume AI procurement equals AI security.** Buying an AI-based EDR does not mean your organisation is protected. It means you have a tool that requires configuration, tuning, and human oversight to deliver value.

---

## The Honest Assessment

AI is not going to solve cybersecurity. It is going to change what competent defence looks like — and raise the floor for what attackers can do with limited resources. Organisations that treat AI as a force multiplier for skilled people will improve their security posture. Organisations that treat it as a substitute for skilled people will find themselves worse off than before, because they will have dismissed the human expertise they needed to recognise when the AI is wrong.

The double-edged nature of this technology is not a reason to avoid it. It is a reason to approach it with precision.

---

*Cybercell provides AI security assessments — evaluating both your use of AI-based defences and your exposure to AI-enabled attacks. [Get in touch](/contact) to discuss.*
