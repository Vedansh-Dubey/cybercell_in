---
title: "Understanding Phishing in 2025: What's Changed and What Hasn't"
excerpt: "Phishing remains the entry point for the overwhelming majority of breaches. The delivery mechanisms have evolved — the psychology hasn't."
date: "2025-05-12"
author: "Vibhum Dubey"
tags: ["phishing", "awareness", "social-engineering"]
featured: true
readingTime: 6
---

Phishing is the oldest trick in the attacker's playbook. It is also, consistently, the most effective. In 2024, over 80% of breaches began with a human decision — a click, a credential typed into the wrong form, a call answered by the wrong person at the wrong moment.

The technology that delivers phishing has changed substantially. The psychology it exploits has not changed at all.

## What's actually new

### AI-generated lures

The grammatical errors that once let you spot a phishing email are increasingly gone. Modern phishing emails are composed by language models fine-tuned on corporate communication samples — board memos, HR announcements, IT helpdesk templates. The output is indistinguishable from legitimate email in tone, formatting, and sentence structure.

The practical implication: **you can no longer train employees to spot bad grammar**. That heuristic is dead.

### QR code phishing (quishing)

Attackers discovered a gap in email security toolchains: most email scanners inspect URLs but not QR codes embedded in images. A QR code that routes to a credential harvesting page passes through most enterprise mail gateways without a flag.

Quishing attacks peaked in Q3 2024 and remain effective, particularly against executives who use mobile devices to scan codes from printed materials.

### Voice cloning (vishing 2.0)

With three to five seconds of audio — often harvested from YouTube, earnings calls, or LinkedIn video — an attacker can clone a voice with sufficient fidelity to fool a colleague in a phone call. We have documented cases in India where CFOs transferred funds after receiving calls that appeared to come from their CEO. The audio was synthetic.

This is not theoretical. It is happening in SMEs right now.

## What hasn't changed

### The pretext playbook

Urgency, authority, and fear remain the three levers that make phishing work. The email from "IT Security" saying your account will be locked in 24 hours. The "CEO" who needs a wire transfer processed before the board meeting. The "bank" warning you of suspicious activity.

These pretexts work because they are designed to bypass deliberate thinking. When someone believes they are in a time-critical situation involving authority and consequence, their capacity for critical evaluation drops substantially.

Training that addresses the pretext — not just the technical indicators — is substantially more effective.

### Credential harvesting as the primary goal

Most phishing attacks are not about installing malware. They are about getting a username and password, which the attacker then uses to access a system, escalate privileges, or sell on a credential market.

Multi-factor authentication (MFA) reduces but does not eliminate this risk. Adversary-in-the-middle (AiTM) proxies — tools like Evilginx — can intercept MFA tokens in real time. **MFA is necessary but not sufficient.**

## What organizations should actually do

### Move beyond checkbox training

Annual security awareness training that consists of watching a 20-minute video and passing a multiple-choice test has measurably zero effect on breach rates. The research on this is consistent.

What works:
- **Simulated phishing campaigns** run regularly, with immediate feedback when someone clicks
- **Post-click coaching** that explains what the lure was and why it worked — not punitive
- **Role-specific training** for high-value targets: finance, HR, executives, IT administrators

### Fix the technical floor

No human-focused training program will work if basic technical controls are absent:

1. **DMARC, DKIM, SPF** configured correctly on your domain — this prevents attackers from sending email that appears to come from you
2. **MFA on all externally accessible systems** — VPN, email, cloud services
3. **Conditional access policies** that flag impossible travel or unusual session properties

### Build a reporting culture

The single highest-value intervention is making it easy and psychologically safe for employees to report suspected phishing. Most phishing emails are not clicked — but the ones that are often sit in inboxes for days before they are reported, if they are reported at all.

A Slack channel, a report button in the email client, or a simple email alias with a guaranteed same-day response dramatically reduces dwell time.

## A note on personal hygiene

Executives and their families are targeted as a route into organizations. Personal email accounts, social media accounts, and home devices are frequently compromised first, because they lack the technical controls of corporate environments.

If you are a senior decision-maker: your personal attack surface is part of your organization's attack surface.

---

*Cybercell offers awareness training programs customized to your organization's actual risk profile — not off-the-shelf content. [Get in touch](/contact) to discuss.*
