---
title: "DDoS Attacks: Roots, Mechanics, and What Actually Stops Them"
excerpt: "Distributed Denial of Service attacks have existed for over two decades. They remain one of the most disruptive tools in an attacker's arsenal — and one of the most misunderstood by the organisations they target."
date: "2025-11-18"
author: "Vibhum Dubey"
tags: ["DDoS", "network security", "infrastructure", "fundamentals"]
coverImage: "/blog-covers/ddos-roots-basics.jpg"
featured: false
readingTime: 9
---

In August 2023, a DDoS attack peaked at 71 million requests per second — the largest ever recorded at that time. By 2024, that record had been broken multiple times. The attacks are getting larger, cheaper to launch, and harder to distinguish from legitimate traffic spikes.

Yet most organisations still treat DDoS as an afterthought — something that happens to banks and gaming companies, not to them. This is a mistake. Any internet-facing service is a potential target, and the barrier to launching an attack has dropped to near zero.

This post covers the fundamentals: what DDoS actually is, how it works at a technical level, and what realistic mitigation looks like.

---

## What "Distributed Denial of Service" Actually Means

A Denial of Service (DoS) attack makes a resource unavailable to legitimate users by overwhelming it. The "distributed" part means the attack traffic originates from many sources simultaneously — typically thousands or millions of compromised machines (a botnet) — making source-based blocking ineffective.

The objective is not to steal data or gain access. The objective is to make a service unreachable. The impact can be commercial (e-commerce site offline during a sale), reputational (bank's mobile app unavailable during a market event), or operational (disrupting critical infrastructure).

---

## The Three Main Attack Categories

### 1. Volumetric Attacks

The oldest and bluntest category: flood the target's internet connection with more traffic than it can handle. When the pipe is full, legitimate requests can't get through.

**UDP Flood**: Send massive volumes of UDP packets to random ports. The target wastes resources responding to each one with ICMP "destination unreachable" messages.

**Amplification attacks**: The more sophisticated variant. Attackers send small requests to open DNS resolvers, NTP servers, or Memcached servers, *spoofing the source IP as the victim's address*. The server sends a large response to the victim. A 64-byte DNS query can return a 4,096-byte response — a 64x amplification factor. Memcached attacks have achieved amplification factors above 50,000x.

This is why organizations running open DNS resolvers or Memcached instances accessible from the internet are not just harming themselves — they are infrastructure for attacks on others.

### 2. Protocol Attacks

These exploit weaknesses in network protocols rather than simply overwhelming bandwidth.

**SYN Flood**: TCP connections begin with a three-way handshake. The client sends SYN, the server responds with SYN-ACK and holds state waiting for the final ACK. An attacker sends millions of SYN packets with spoofed source IPs. The server allocates memory for each half-open connection until it runs out of resources. Legitimate connections can't be established.

**Ping of Death / Fragmentation attacks**: Malformed packets that cause the target's network stack to consume disproportionate resources during reassembly.

### 3. Application Layer Attacks (Layer 7)

The hardest category to defend against. Instead of overwhelming the network, these target the application itself with requests that look like legitimate traffic.

**HTTP Flood**: Send millions of GET or POST requests to resource-intensive endpoints — search functions, login pages, checkout processes. Each request triggers database queries, session management, and computation. The server exhausts CPU and memory rather than bandwidth.

**Slowloris**: Open many connections to a web server and keep them alive by sending partial HTTP requests, never completing them. The server holds the connection open waiting. With enough connections, the server's connection pool is exhausted.

**SSL/TLS renegotiation attacks**: Repeatedly renegotiate the TLS handshake, which is computationally expensive. A single attacking machine can exhaust the CPU of a server handling many legitimate users.

---

## Why Traditional Defences Fail

**IP blocking doesn't work** because the traffic comes from thousands of different IPs — often legitimate-looking ones from cloud providers and residential networks.

**Rate limiting doesn't work** against distributed attacks because each source IP sends relatively few requests. The volume only appears malicious in aggregate.

**Upstream bandwidth isn't a solution** — you can't buy your way out of volumetric attacks because attackers can always generate more traffic than you can absorb. The 71 million RPS attack would have saturated any private connection.

---

## What Actually Works

### Scrubbing Centres and CDN-Based Mitigation

The most effective approach for volumetric and protocol attacks: route traffic through a provider with enormous bandwidth capacity and specialised hardware that can distinguish attack traffic from legitimate traffic before it reaches your infrastructure.

Providers like Cloudflare, Akamai, and AWS Shield operate globally distributed networks with aggregate capacity measured in terabits per second. They can absorb attacks that would flatten any direct connection.

The critical detail: **this protection must be in place before an attack starts.** Bringing in a mitigation provider during an active attack is slow and often too late.

### Rate Limiting and Challenge Pages

For Layer 7 attacks, challenge-response mechanisms (CAPTCHAs, JavaScript challenges) distinguish automated attack traffic from real browsers. These add friction that bots can't easily clear.

### Anycast Routing

Distribute your service across many geographically dispersed nodes using the same IP address. Attack traffic gets distributed across all nodes rather than concentrated on one, and the geographic spread means the nearest node absorbs local attack traffic.

### SYN Cookies

A TCP stack feature that allows servers to handle SYN packets without allocating state until the handshake is complete, defeating SYN flood attacks. Should be enabled on all internet-facing servers.

### Network-Level Filtering

Work with your ISP to implement BCP38 — network ingress filtering that drops packets with spoofed source IPs. This directly counters amplification attacks. Unfortunately, many ISPs still do not implement this.

---

## The India Context

India has seen a significant increase in DDoS activity targeting financial services, government portals, and e-commerce platforms. The India Computer Emergency Response Team (CERT-In) reported multiple high-profile DDoS incidents in 2024–2025. The motivations range from hacktivism to competitive disruption to extortion — attackers who threaten attacks unless paid.

If you receive a DDoS extortion demand: **do not pay**. Payment proves willingness to pay and invites repeat demands. Report to CERT-In and engage a mitigation provider.

---

## Minimum Baseline for Any Internet-Facing Service

1. **Cloud-based DDoS mitigation** (Cloudflare free tier is a start; paid tiers for serious protection)
2. **SYN cookies enabled** on all servers
3. **Rate limiting** on all API and authentication endpoints
4. **No open DNS resolvers or Memcached instances** accessible from the internet
5. **An incident response plan** that includes ISP contact numbers and mitigation provider onboarding steps

DDoS is not a sophisticated attack. It does not require skill to execute. That is precisely why it remains so prevalent — and why not having basic mitigation in place is increasingly indefensible.

---

*Cybercell conducts DDoS resilience assessments — testing your infrastructure's ability to withstand volumetric, protocol, and application-layer attacks. [Get in touch](/contact) to discuss.*
