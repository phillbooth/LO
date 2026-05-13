LO could prevent CSRF by making it a **default security rule in the language/app-kernel**, not something every developer has to remember manually.

CSRF happens because browsers automatically send cookies, including session cookies, with requests; a malicious site can trick an authenticated browser into sending a state-changing request to a trusted site. OWASP recommends CSRF tokens for state-changing requests, synchronizer tokens for stateful apps, signed double-submit cookies for stateless apps, custom headers for API-driven sites, Fetch Metadata checks, SameSite cookies, Origin/Referer checks, and avoiding state-changing `GET` requests. OWASP also warns that XSS can bypass CSRF protections, so CSRF must be paired with XSS prevention. ([OWASP Cheat Sheet Series][1])

## Where this fits in the LO roadmap

```text
v3  - LO Secure Network
      CSRF policy, secure cookies, Fetch Metadata, Origin checks

v5  - LO App Kernel
      Route-level CSRF enforcement for APIs and forms

v11 - LO Finance
      Stronger CSRF rules for payments, trades, account changes

v20 - LO Standards and ISO Review
      Map LO protections to OWASP, NIST, ISO/IEC and secure coding guidance
```

## Core LO principle

```text
Any route that changes state must prove user intent.
```

So LO should treat these as **unsafe by default**:

```text
POST
PUT
PATCH
DELETE
file upload
payment action
stock trade action
password change
email change
account deletion
admin action
```

And these should require protection unless explicitly exempted:

```text
CSRF token
Origin / Referer validation
Fetch Metadata validation
SameSite cookie policy
route-level security report
```

---

# Suggested LO CSRF Policy

```lo
security csrf {
  enabled: true

  apply_to: ["POST", "PUT", "PATCH", "DELETE"]

  token {
    mode: "auto"
    stateful: "synchronizer_token"
    stateless: "signed_double_submit_cookie"
    bind_to_session: true
    header: "X-CSRF-Token"
    form_field: "_csrf"
  }

  fetch_metadata {
    enabled: true
    block_cross_site_state_change: true
    allow_same_origin: true
    same_site_requires_token: true
  }

  origin_check {
    enabled: true
    fallback_to_referer: true
  }

  cookies {
    same_site: "Lax"
    secure: true
    http_only_session_cookie: true
  }

  deny_state_change_get: true
}
```

## Route example

```lo
api AccountApi {
  POST "/account/email" {
    request ChangeEmailRequest
    response ChangeEmailResponse

    auth required
    csrf required

    handler changeEmail
  }
}
```

## Compiler check

LO should fail the build if a state-changing route has no CSRF policy:

```text
LO_SECURITY_ERROR: Route POST /account/email changes user state but has no CSRF protection.

Fix:
- add `csrf required`
- or declare a safe non-cookie auth method such as bearer-token API auth
```

---

# GET must not change state

LO should block this:

```lo
GET "/delete-account" {
  handler deleteAccount
}
```

Because OWASP explicitly says not to use `GET` for state-changing operations. ([OWASP Cheat Sheet Series][1])

LO should report:

```text
LO_ROUTE_ERROR: GET route cannot call a state-changing handler.

Route:
GET /delete-account

Problem:
deleteAccount performs a write/delete operation.

Fix:
Use POST or DELETE with csrf required.
```

---

# API distinction: cookie auth vs bearer auth

CSRF mainly matters when the browser automatically sends authentication, especially cookies.

So LO should understand the difference:

```lo
auth session_cookie {
  csrf required
}
```

But for a pure API using explicit headers:

```lo
auth bearer_token {
  csrf not_required
  require_header: "Authorization"
}
```

Important rule:

```text
If authentication is automatic through cookies, CSRF is required.
If authentication is manually attached through Authorization headers, CSRF may not be required.
```

But LO should still enforce:

```text
CORS policy
Origin checks where useful
rate limits
request validation
audit logging
```

---

# Runtime CSRF request flow

```text
1. Request arrives
2. LO checks HTTP method
3. If method is GET/HEAD/OPTIONS, allow only read-safe behaviour
4. If method is POST/PUT/PATCH/DELETE, mark as state-changing
5. Check Fetch Metadata headers
6. Reject cross-site unsafe requests
7. Check Origin or Referer
8. Check CSRF token
9. Check token is bound to session
10. Reject if missing, expired, mismatched or forged
11. Log failed CSRF attempt
12. Continue to handler only if all checks pass
```

---

# Generated CSRF report

LO should generate a security report like this:

```json
{
  "csrf": {
    "enabled": true,
    "stateChangingMethods": ["POST", "PUT", "PATCH", "DELETE"],
    "tokenMode": "auto",
    "statefulMode": "synchronizer_token",
    "statelessMode": "signed_double_submit_cookie",
    "fetchMetadata": true,
    "originCheck": true,
    "sameSiteCookie": "Lax",
    "unsafeGetRoutes": 0,
    "unprotectedStateChangingRoutes": 0
  }
}
```

This fits LO’s idea of:

```text
deny by default
allow explicitly
report everything
```

---

# Strong finance/admin rule

For financial routes, LO should go further:

```lo
api TradingApi {
  POST "/trade/buy" {
    auth required
    csrf required
    user_interaction required
    audit required
    idempotency_key required

    handler buyStock
  }
}
```

For example, a stock trade, payment, withdrawal, password change, or account deletion should not rely only on a token. It should also support user interaction checks for sensitive operations, which OWASP recommends considering for highly sensitive actions. ([OWASP Cheat Sheet Series][1])

---

# Recommended roadmap addition

Add this under **v3 - LO Secure Network**:

```markdown
## CSRF Protection

LO should include built-in CSRF protection for cookie-authenticated web applications.

State-changing routes must require CSRF protection by default.

LO should support:

- synchronizer tokens for stateful applications
- signed double-submit cookies for stateless applications
- custom CSRF headers for SPA/API-driven applications
- Fetch Metadata validation
- Origin and Referer validation
- SameSite cookie defaults
- rejection of state-changing GET requests
- CSRF security reports
- route-level compiler warnings and errors
```

In short: **LO can prevent CSRF by making unsafe routes impossible to compile unless the route has an explicit protection model.**

[1]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html "Cross-Site Request Forgery Prevention - OWASP Cheat Sheet Series"
