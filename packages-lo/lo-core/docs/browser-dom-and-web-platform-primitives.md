# LO Browser, DOM and Web Platform Primitives

LO, short for **Logic Omni**, is a programming language and compiler/toolchain. LO source files use the `.lo` extension.

Example files:

```text
boot.lo
main.lo
browser.lo
dom.lo
html.lo
forms.lo
notifications.lo
```

This document describes what LO should support for browser, DOM, HTML and web platform use cases **as a language**, not as a framework.

LO should not become a frontend framework, CMS, page builder, templating engine or WordPress-style platform. Instead, LO should provide safe types, effects, permissions, compilation targets and reports that frameworks and packages can build on top of.

---

## Summary

LO should support browser and DOM work through safe primitives such as:

```text
HtmlDocument
HtmlFragment
SafeHtml
DomDocument
DomNode
DomElement
DomSelector
BrowserEvent
SafeUrl
CssClass
SafeCss
FormData
PushSubscription
NotificationPayload
ServiceWorker
LocalStorage
SessionStorage
Cookie
```

LO should also support browser-related effects such as:

```text
dom.read
dom.write
network.fetch
storage.local
storage.session
cookie.read
cookie.write
notification.request_permission
notification.show
push.subscribe
push.unsubscribe
service_worker.register
clipboard.read
clipboard.write
camera.read
microphone.read
geolocation.read
```

The core idea is:

```text
LO provides safe browser/web primitives.
Frameworks provide UI structure and developer opinions.
Browsers provide the actual Web APIs.
```

For React, Angular, Node and similar ecosystems, LO should generate framework
adapter outputs rather than framework syntax. ESM JavaScript, TypeScript
declarations, JSON Schema, OpenAPI, WASM bridges, source maps and adapter
manifests belong in the toolchain; React components, Angular components,
framework routing and state-management systems do not belong in LO core.

---

## Core Principle

```text
LO should not be a browser framework.

LO should provide safe browser, DOM, HTML, URL, form, storage, notification and network primitives
so browser frameworks and packages can be built safely on top of LO.
```

---

# 1. What Belongs in LO

LO should provide language/toolchain support for:

```text
safe HTML types
safe DOM operations
browser effects
browser permissions
safe URL handling
typed form validation
browser events
storage/cookie safety
push notification primitives
service worker primitives
browser target compilation
JavaScript/WASM interop
source maps
security reports
AI guide summaries
```

These are language and standard-library style capabilities.

---

# 2. What Should Stay in Frameworks or Packages

LO should not hard-code:

```text
component framework
virtual DOM
reactive state system
client-side router
SSR framework
templating engine
theme system
CMS blocks
admin dashboard
page builder
frontend bundler
CSS framework
UI component library
push notification UI workflow
notification preference dashboard
```

These should be built as optional packages or frameworks using LO's safe primitives.

---

# 3. Safe HTML Types

HTML should not be treated as a plain string once it is being parsed, sanitised or rendered.

Recommended types:

```lo
type HtmlDocument
type HtmlFragment
type SafeHtml
type HtmlText
```

Rules:

```text
String is not HTML.
HtmlDocument is parsed HTML.
HtmlFragment is partial HTML.
SafeHtml is sanitised and safe to render.
Only SafeHtml can be inserted as HTML.
```

Example:

```lo
secure flow cleanHtml(input: String) -> Result<SafeHtml, HtmlError> {
  let document: HtmlDocument = html.parse(input)?
  let safe: SafeHtml = html.sanitize(document, policy: "user_content")?

  return Ok(safe)
}
```

Bad:

```lo
dom.setHtml("#content", rawString)
```

Good:

```lo
dom.setHtml("#content", safeHtml)
```

---

# 4. HTML Policy in `boot.lo`

HTML security rules should be declared centrally.

```lo
html_policy {
  default_mode "safe"

  sanitise {
    scripts "deny"
    inline_events "deny"
    javascript_urls "deny"
    iframes "deny"
    external_resources "warn"
    forms "deny"
    style_tags "deny"
    inline_styles "deny"
    data_urls "deny"
  }

  allowed_tags [
    "p",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "a",
    "br"
  ]

  allowed_attributes {
    a ["href", "title"]
  }

  links {
    require_https true
    add_rel_noopener true
    add_rel_noreferrer true
  }
}
```

---

# 5. DOM Types

LO should support DOM primitives, not a UI framework.

Recommended types:

```lo
type DomDocument
type DomNode
type DomElement
type DomText
type DomAttribute
type DomSelector
```

Example:

```lo
secure flow updateTitle(title: String) -> Result<Void, DomError>
effects [dom.write] {
  let heading: DomElement = dom.select("#page-title")?

  dom.setText(heading, title)

  return Ok()
}
```

Important DOM rule:

```text
dom.setText() escapes text.
dom.setHtml() requires SafeHtml.
```

This helps prevent unsafe HTML injection.

---

# 6. Browser Target

LO could support a browser target without becoming a frontend framework.

Example:

```lo
target browser {
  compile_to "wasm"
  js_bridge true
  source_maps true
}
```

Possible browser outputs:

```text
WASM
JavaScript bridge
source maps
browser security report
browser AI guide section
```

Good browser-side LO use cases:

```text
form validation
safe DOM updates
small UI interactions
client-side data parsing
image/text preprocessing
local compute
WASM compute blocks
browser-safe helpers
```

---

# 7. Browser Effects

Browser code should declare what it touches.

Recommended effects:

```text
dom.read
dom.write
network.fetch
storage.local
storage.session
cookie.read
cookie.write
notification.request_permission
notification.show
push.subscribe
push.unsubscribe
service_worker.register
clipboard.read
clipboard.write
camera.read
microphone.read
geolocation.read
```

Example:

```lo
secure flow saveTheme(theme: String) -> Result<Void, BrowserError>
effects [storage.local] {
  browser.localStorage.set("theme", theme)

  return Ok()
}
```

This allows LO to generate security reports and block unsafe behaviour.

---

# 8. Browser Permissions in `boot.lo`

Browser permissions should be explicit.

```lo
browser {
  allowed_effects [
    dom.read,
    dom.write,
    network.fetch,
    storage.local
  ]

  denied_effects [
    camera.read,
    microphone.read,
    geolocation.read,
    clipboard.read
  ]
}
```

If code uses a denied effect:

```lo
secure flow getLocation() -> Result<Location, BrowserError>
effects [geolocation.read] {
  return browser.geolocation.currentPosition()
}
```

LO should fail unless `geolocation.read` is allowed.

---

# 9. Safe URL Support

LO should support safe URL types.

```lo
type Url
type SafeUrl
```

Example:

```lo
pure flow makeProfileLink(username: String) -> SafeUrl {
  return url.safePath("/users/" + url.encode(username))
}
```

Rules:

```text
javascript: URLs denied by default
data: URLs denied by default
external URLs require policy
unsafe redirects must be reported
relative paths should be normalised
user input must be encoded before being placed in URLs
```

---

# 10. Browser Network / Fetch Policy

Browser fetch access should be controlled.

```lo
browser {
  fetch {
    allow_origins [
      "https://api.example.com"
    ]

    allow_methods [GET, POST]
    deny_methods [PUT, PATCH, DELETE]
    credentials "same_origin"
  }
}
```

Example:

```lo
secure flow loadProducts() -> Result<Array<Product>, ApiError>
effects [network.fetch] {
  return fetch.get<Array<Product>>("https://api.example.com/products")?
}
```

LO should block unexpected origins, methods or credential behaviour.

---

# 11. Forms and Validation

LO should support typed form validation primitives.

This is not a full form framework. It is a safe schema and validation capability that frameworks can use.

Example:

```lo
form ContactForm {
  name: String required max 100
  email: Email required
  message: String required max 5000
}
```

Client-side validation:

```lo
secure flow validateContactForm(form: ContactForm) -> ValidationResult {
  return validate(form)
}
```

Server-side validation should reuse the same schema.

Important rule:

```text
Client validation improves user experience.
Server validation is still required.
```

---

# 12. Browser Events

LO should support typed browser events.

Example:

```lo
event SubmitContactForm {
  selector "#contact-form"
  event "submit"
  handler onContactSubmit
}
```

Handler:

```lo
secure flow onContactSubmit(event: BrowserEvent) -> Result<Void, BrowserError>
effects [dom.read, dom.write, network.fetch] {
  event.preventDefault()

  let form: ContactForm = dom.readForm<ContactForm>("#contact-form")?
  let validation: ValidationResult = validate(form)

  if validation.valid == false {
    dom.setText("#error", validation.message)
    return Ok()
  }

  fetch.post("/api/contact", form)?

  return Ok()
}
```

This is safe event binding, not a UI framework.

---

# 13. CSS Safety

LO should not become CSS, but it should prevent CSS injection where it handles styles or classes.

Recommended types:

```lo
type CssClass
type SafeCss
type StyleValue
```

Rules:

```text
class names should be escaped or validated
inline styles should be restricted
style injection should be denied by default
external CSS should follow security policy
```

Example:

```lo
dom.addClass("#menu", css.class("is-open"))
```

---

# 14. Script Policy

LO should support browser script security.

```lo
browser {
  scripts {
    inline_scripts "deny"
    eval "deny"
    dynamic_imports "deny_by_default"
    allowed_sources ["self"]
  }
}
```

Rules:

```text
no eval by default
no inline scripts by default
no unsafe dynamic script injection
JavaScript interop must be declared
external script sources require policy
```

---

# 15. JavaScript Interop

LO may need to call JavaScript packages, but interop should be permissioned.

Example:

```lo
packages {
  use ChartJs from npm "chart.js" {
    version "4.4.0"

    permissions {
      dom_write "allow"
      network "deny"
      storage "deny"
      unsafe "deny"
    }
  }
}
```

Usage:

```lo
use ChartJs
```

This lets LO work with the browser ecosystem without treating all JavaScript as trusted.

---

# 16. Browser Storage

LO should support safe storage primitives.

Recommended types:

```lo
type LocalStorage
type SessionStorage
type Cookie
type IndexedDb
```

Policy:

```lo
browser {
  storage {
    local allow
    session allow
    indexed_db "deny_by_default"
  }

  cookies {
    secure true
    same_site "strict"
    http_only_for_server true
  }
}
```

Rules:

```text
do not store SecureString in localStorage
do not store API secrets in browser storage
localStorage is readable by browser JavaScript
cookies should use secure defaults
server-only cookies should be HttpOnly
```

---

# 17. Push Notifications

Push notifications should be supported as safe browser/backend primitives, not as a fixed framework workflow.

Push notifications involve:

```text
browser permission prompt
service worker
Push API
Notifications API
backend subscription storage
push provider delivery
user preferences
unsubscribe flow
```

LO should provide typed primitives and effects. A framework/package should provide UI flows and admin screens.

Recommended types:

```lo
type PushSubscription
type PushMessage
type NotificationPermission
type NotificationPayload
type NotificationAction
type ServiceWorkerRegistration
```

Recommended effects:

```text
notification.request_permission
notification.show
push.subscribe
push.unsubscribe
service_worker.register
network.fetch
storage.local
database.read
database.write
network.outbound
```

## Browser-Side Push Permission

```lo
secure flow requestPushPermission() -> Result<NotificationPermission, BrowserError>
effects [notification.request_permission] {
  return browser.notifications.requestPermission()
}
```

## Browser-Side Push Subscribe

```lo
secure flow subscribeToPush() -> Result<PushSubscription, BrowserError>
effects [push.subscribe, network.fetch, storage.local] {
  let permission: NotificationPermission = requestPushPermission()?

  if permission != "granted" {
    return Err(BrowserError.PermissionDenied)
  }

  let subscription: PushSubscription = browser.push.subscribe()?

  fetch.post("/api/push/subscribe", subscription)?

  return Ok(subscription)
}
```

## Backend Subscription Storage

```lo
secure flow savePushSubscription(req: Request) -> Result<Response, ApiError>
effects [network.inbound, database.write] {
  let subscription: PushSubscription = json.decode<PushSubscription>(&req.body)?

  db.pushSubscriptions.insert(subscription)?

  return JsonResponse({
    "status": "ok"
  })
}
```

## Backend Push Send

```lo
secure flow sendPushNotification(userId: UserId, message: PushMessage) -> Result<Void, PushError>
effects [database.read, network.outbound] {
  let subscription: PushSubscription = db.pushSubscriptions.findByUser(userId)?

  return push.send(subscription, message)
}
```

## Push Policy in `boot.lo`

```lo
browser {
  notifications {
    enabled true
    require_user_permission true
    max_payload_size 4kb
  }

  service_worker {
    enabled true
    scope "/"
  }
}

security {
  push {
    allowed_origins ["https://example.com"]
    require_auth true
    store_subscriptions_encrypted true
    allow_silent_push false
  }
}
```

Rules:

```text
push subscription requires user permission
subscription endpoints should be stored securely
unsubscribe must be supported
notification payload size should be limited
sensitive data should not be sent in notification payloads
backend push sending requires network.outbound
```

---

# 18. Service Workers

Service workers are browser platform features. LO should support safe registration and event handling primitives.

Recommended types:

```lo
type ServiceWorker
type ServiceWorkerRegistration
type ServiceWorkerEvent
type PushEvent
type FetchEvent
```

Example:

```lo
secure flow registerServiceWorker() -> Result<ServiceWorkerRegistration, BrowserError>
effects [service_worker.register] {
  return browser.serviceWorker.register("/service-worker.js")
}
```

Push event handler concept:

```lo
service_worker PushWorker {
  on push handlePushEvent
}
```

```lo
secure flow handlePushEvent(event: PushEvent) -> Result<Void, BrowserError>
effects [notification.show] {
  let payload: NotificationPayload = event.payload?

  browser.notifications.show(payload.title, payload)

  return Ok()
}
```

---

# 19. Clipboard, Camera, Microphone and Geolocation

These features should be denied by default and require explicit permission.

Example policy:

```lo
browser {
  permissions {
    clipboard_read "deny"
    clipboard_write "allow"
    camera "deny"
    microphone "deny"
    geolocation "deny"
  }
}
```

Example:

```lo
secure flow copyInviteLink(link: SafeUrl) -> Result<Void, BrowserError>
effects [clipboard.write] {
  browser.clipboard.writeText(link.toString())

  return Ok()
}
```

Geolocation example:

```lo
secure flow getUserLocation() -> Result<Location, BrowserError>
effects [geolocation.read] {
  return browser.geolocation.currentPosition()
}
```

This should fail unless `geolocation.read` is allowed.

---

# 20. Browser Security Report

LO should generate browser/DOM security reports.

Example:

```json
{
  "browserSecurityReport": {
    "target": "browser",
    "allowedEffects": [
      "dom.read",
      "dom.write",
      "network.fetch",
      "storage.local"
    ],
    "deniedEffects": [
      "camera.read",
      "microphone.read",
      "geolocation.read",
      "clipboard.read"
    ],
    "domWrites": [
      {
        "flow": "updateTitle",
        "source": "src/browser/page.lo:4",
        "method": "dom.setText",
        "safe": true
      }
    ],
    "unsafeHtmlWrites": [],
    "fetchOrigins": [
      "https://api.example.com"
    ],
    "notifications": {
      "enabled": true,
      "requiresPermission": true
    },
    "serviceWorker": {
      "enabled": true,
      "scope": "/"
    }
  }
}
```

---

# 21. AI Guide Integration

LO should tell AI tools how browser code works.

Example generated AI guide section:

```markdown
## Browser / DOM Summary

Browser target:
WASM with JavaScript bridge.

Allowed effects:
- dom.read
- dom.write
- network.fetch
- storage.local
- notification.request_permission
- push.subscribe
- service_worker.register

Denied effects:
- geolocation.read
- camera.read
- microphone.read
- clipboard.read

DOM safety:
- Use `dom.setText()` for text.
- Use `dom.setHtml()` only with `SafeHtml`.
- Raw `String` cannot be rendered as HTML.

Push notifications:
- User permission required.
- Subscription storage must be encrypted.
- Sensitive data must not be sent in notification payloads.
```

---

# 22. Map Manifest Integration

Example:

```json
{
  "browserFeatures": [
    {
      "feature": "dom.write",
      "flow": "updateTitle",
      "source": "src/browser/page.lo:4",
      "safeMethod": "dom.setText"
    },
    {
      "feature": "push.subscribe",
      "flow": "subscribeToPush",
      "source": "src/browser/notifications.lo:8",
      "requiresPermission": true
    },
    {
      "feature": "service_worker.register",
      "flow": "registerServiceWorker",
      "source": "src/browser/service-worker.lo:3",
      "scope": "/"
    }
  ]
}
```

---

# 23. Source Maps

Browser-targeted LO should generate source maps.

```text
build/browser/app.js
build/browser/app.wasm
build/browser/app.source-map.json
```

Error reports should map back to original `.lo` files.

Example:

```text
Browser error:
Unsafe HTML write blocked.

Source:
  src/browser/comments.lo:18

Suggestion:
  Convert String to SafeHtml using html.sanitize().
```

---

# 24. Security Rules

LO should enforce:

```text
String cannot be rendered as HTML
SafeHtml required for HTML insertion
dom.setText escapes by default
javascript: URLs denied by default
data: URLs denied by default
eval denied by default
inline scripts denied by default
browser permissions declared in boot.lo
push notifications require user permission
service worker scope declared in boot.lo
SecureString cannot be stored in localStorage
external fetch origins must be allowlisted
JS packages require permissions
```

---

# 25. Recommended Support List

LO should support these at language/standard-library level:

```text
HtmlDocument
HtmlFragment
SafeHtml
DomDocument
DomNode
DomElement
DomSelector
BrowserEvent
SafeUrl
CssClass
SafeCss
FormData
ValidationResult
PushSubscription
PushMessage
NotificationPermission
NotificationPayload
ServiceWorkerRegistration
LocalStorage
SessionStorage
Cookie
browser target
WASM/JS output option
dom.read/dom.write effects
network.fetch effect
storage/cookie effects
push/notification effects
service worker effects
browser permissions in boot.lo
HTML sanitisation
text escaping by default
safe DOM updates
typed form validation primitives
typed browser events
browser security reports
source maps
AI guide browser summary
JavaScript package interop with permissions
```

---

# 26. Non-Goals

LO browser support should not:

```text
be a frontend framework
define a virtual DOM
force a component model
include a CMS
include a page builder
include a fixed router
include a fixed template engine
include a fixed CSS framework
make all JavaScript trusted
allow raw String HTML rendering
silently request browser permissions
hide service worker behaviour
send sensitive data in notification payloads
```

---

# 27. Open Questions

```text
Should SafeHtml be a built-in core type or standard-library type?
Should LO compile browser code to WASM first, JavaScript first, or both?
Should service worker files be generated from .lo files?
Should push notifications require a standard LO package?
Should localStorage access be denied by default?
Should clipboard.write be allowed by default?
Should browser permissions be separated by environment?
Should LO generate Content Security Policy guidance?
Should JS interop packages require lock hashes?
Should SafeUrl reject all external URLs unless allowlisted?
```

---

# Recommended Early Version

## Version 0.1

```text
SafeHtml
HtmlDocument
html.parse()
html.sanitize()
dom.setText()
dom.setHtml(SafeHtml)
dom.read/dom.write effects
browser security report
```

## Version 0.2

```text
browser target
WASM/JS bridge
typed browser events
typed form validation
SafeUrl
fetch policy
storage/cookie policy
```

## Version 0.3

```text
push notification primitives
service worker primitives
notification permission effects
subscription storage types
push security reports
```

## Version 0.4

```text
JavaScript package interop permissions
CSS safety types
CSP guidance
AI guide browser summaries
source maps for browser builds
```

---

# Final Principle

LO should provide safe browser and web platform primitives without becoming a framework.

Final rule:

```text
Support safe HTML.
Support safe DOM updates.
Support browser effects and permissions.
Support typed forms and events.
Support push notifications and service workers as primitives.
Support browser compilation targets.
Leave UI frameworks, templates, routers, CMS tools and component systems to packages and frameworks.
Report everything clearly.
```
