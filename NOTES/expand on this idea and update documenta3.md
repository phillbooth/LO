expand on this idea and update documentation

At **code-language level**, LO cannot stop someone physically observing packets on a network. Routers, switches, ISPs, Wi-Fi access points, cloud providers or attackers on the path may still see that packets exist.

What LO *can* do is make sure they cannot read or tamper with the useful content.

The rule should be:

```text
LO cannot make packets invisible.
LO can make packet contents encrypted, authenticated, permissioned, minimised and auditable.
```

TLS 1.3 is designed to prevent eavesdropping, tampering and message forgery between client/server applications, and QUIC uses TLS 1.3 for its security model. ([IETF Datatracker][1])

---

## 1. TLS by default

LO should never allow normal network traffic to be plaintext by default.

Bad default:

```text
http://api.example.com
```

Better LO default:

```text
https://api.example.com
```

LO policy:

```text
network {
    default: deny

    allow outbound https to ["api.example.com"]
    allow inbound https on port 443

    deny http
    deny plaintextTcp
    deny rawSocket
}
```

Production builds should fail if plaintext is used:

```text
Build failed:
Plain HTTP is not allowed in production.
Route: http://api.example.com
Use HTTPS/TLS.
```

OWASP’s TLS guidance focuses on using TLS correctly for application transport protection, and NIST SP 800-52 provides guidance for selecting, configuring and using TLS implementations. ([cheatsheetseries.owasp.org][2])

---

## 2. Strong production profile

LO should have a strict production networking mode:

```text
production network {
    require tls
    require certificateValidation
    require hostnameValidation
    deny selfSignedCertificates
    deny expiredCertificates
    deny weakCiphers
    deny plaintextFallback
    deny debugProxy
}
```

This prevents common mistakes like:

```text
turning certificate checks off
using test certificates in production
allowing fallback to HTTP
accepting any certificate
leaking secrets into logs
```

---

## 3. Mutual TLS for enterprise systems

For internal enterprise systems, LO could support **mTLS**.

Normal TLS proves the server identity to the client.
mTLS proves both sides:

```text
client proves identity to server
server proves identity to client
```

LO example:

```text
service PaymentsApi {
    network {
        require tls
        require mutualTls

        clientCertificate: secret "PAYMENTS_CLIENT_CERT"
        clientKey: secret "PAYMENTS_CLIENT_KEY"

        allowHosts: ["payments.internal.company"]
    }
}
```

This helps prevent fake internal services or unauthorised clients talking to sensitive APIs.

---

## 4. No silent downgrade

LO should block protocol downgrade.

Bad:

```text
try HTTPS
if failed, use HTTP
```

LO should deny this unless explicitly allowed in development:

```text
tls {
    minVersion: "TLS1.3"
    allowDowngrade: false
    allowPlaintextFallback: false
}
```

If a library tries to downgrade:

```text
Runtime blocked:
TLS downgrade attempted.
Plaintext fallback is denied by policy.
```

---

## 5. End-to-end encryption for sensitive payloads

TLS protects data while travelling between two network endpoints.

But sometimes data passes through:

```text
load balancers
reverse proxies
API gateways
message queues
cloud services
logging systems
internal services
```

So for highly sensitive data, LO could support **application-layer encryption** as well.

Example:

```text
payload CustomerRecord {
    encryption: endToEnd
    decryptOnlyAt: "trusted-service.customer-api"
}
```

That means even if traffic passes through intermediate systems, the sensitive fields stay encrypted.

---

## 6. Metadata minimisation

Even with encryption, observers may still see metadata such as:

```text
source IP
destination IP
packet size
timing
connection frequency
domain name in some cases
traffic volume
```

So LO should help reduce what can be inferred.

Example:

```text
network privacy {
    minimiseMetadata: true
    batchSmallMessages: true
    avoidSensitiveDataInUrls: true
    denyQueryStringSecrets: true
}
```

LO should block things like:

```text
GET /reset-password?token=secret-token
```

and require:

```text
POST /reset-password
body: encrypted/validated payload
```

---

## 7. No secrets in URLs, headers or logs unless approved

LO should have secret-aware networking.

```text
secret API_KEY from env

request ExternalApi {
    method: POST
    url: "https://api.example.com/data"

    headers {
        Authorization: Bearer(API_KEY)
    }

    logging {
        redact headers.Authorization
        redact body.personalData
    }
}
```

LO should block:

```text
log(API_KEY)
sendSecretToUnapprovedHost(API_KEY)
putSecretInUrl(API_KEY)
```

Build error:

```text
Build failed:
Secret API_KEY is used in a URL query string.
Secrets must not be transmitted in URLs.
```

---

## 8. Typed allowlist networking

LO should deny unknown outbound traffic.

```text
network {
    default: deny

    allow outbound https to [
        "api.stripe.com",
        "auth.company.com",
        "storage.company.com"
    ]

    deny outbound any
}
```

This helps stop:

```text
malicious packages calling unknown servers
data exfiltration
unexpected analytics
unsafe telemetry
supply-chain attacks
```

If a package tries to connect elsewhere:

```text
Runtime blocked:
Package image-tools attempted outbound connection to unknown-host.example.
Policy denies this.
```

---

## 9. Safe package networking

Packages should not get network access automatically.

```text
package imageResize {
    allow file.read
    allow image.decode
    deny network.open
    deny shell.run
}
```

If it is an API package:

```text
package paymentProvider {
    allow network.outbound.https to ["api.stripe.com"]
    deny network.any
}
```

This would be a major LO security feature.

---

## 10. Network reports

Every build should generate a network security report:

```text
app.network-report.json
app.tls-report.json
app.secret-flow-report.json
app.package-network-report.json
```

Example:

```json
{
  "network": {
    "plaintextAllowed": false,
    "tlsRequired": true,
    "minimumTlsVersion": "TLS1.3",
    "outboundHosts": [
      "api.stripe.com",
      "auth.company.com"
    ],
    "inboundPorts": [443],
    "rawSockets": "denied",
    "secretsInUrls": "denied",
    "certificateValidation": "required",
    "warnings": []
  }
}
```

This gives developers, auditors and DevOps teams proof of what the app is allowed to do.

---

## 11. Packet capture blocked by default

At code level, LO should deny packet inspection unless the app is explicitly a security/network tool.

Default:

```text
deny packetCapture
deny rawSocket
deny promiscuousMode
deny networkSniff
```

Only allow it with an explicit security profile:

```text
securityTool PacketMonitor {
    allow packetCapture
    allow rawSocket
    require admin
    require auditLog
    require localOnly
}
```

This prevents normal apps or dependencies from silently observing traffic.

---

## 12. Safer internal service calls

For enterprise microservices, LO should support service identity.

```text
service OrdersApi {
    identity: "orders-api"

    allow calls to [
        "payments-api",
        "stock-api"
    ]

    deny calls to [
        "admin-api",
        "secrets-service"
    ]

    require mutualTls
}
```

This means services cannot randomly call anything on the internal network.

---

## Best LO rule

I would define it like this:

```text
Network access in LO is denied by default.

All network communication must be:
- encrypted where appropriate
- authenticated
- host allow-listed
- typed
- secret-aware
- logged safely
- reportable
- blocked from plaintext fallback in production
```

## Suggested LO docs section

```markdown
## Safe Networking

LO cannot prevent packets from being physically observed on a network.

LO can prevent useful data inside those packets from being readable or tampered with by requiring secure transport, typed network policies and secret-safe data handling.

LO should deny plaintext networking by default.

Production LO applications should require:

- TLS
- certificate validation
- hostname validation
- no plaintext fallback
- no secrets in URLs
- no unsafe debug proxying
- no unknown outbound hosts
- no packet capture unless explicitly approved
- safe logging and redaction
- generated network security reports

For enterprise systems, LO should also support:

- mutual TLS
- service identity
- host allowlists
- package-level network permissions
- application-layer encryption for sensitive payloads
- metadata minimisation where possible
```

The strongest security position is:

```text
LO should not trust the network.

LO should assume packets can be observed, copied, delayed, blocked or modified.

Therefore LO must encrypt, authenticate, validate, minimise and report all network communication.
```

[1]: https://datatracker.ietf.org/doc/html/rfc8446?utm_source=chatgpt.com "RFC 8446 - The Transport Layer Security (TLS) Protocol ..."
[2]: https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html?utm_source=chatgpt.com "Transport Layer Security Cheat Sheet"
