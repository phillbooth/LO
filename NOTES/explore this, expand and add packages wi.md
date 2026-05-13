explore this, expand and add packages with correct naming and add/update documents

Reading that as **rendering in the browser when data is received** — yes, LO could help a lot here.

The idea is that LO should not just receive JSON and let JavaScript manually update HTML. LO could define a **typed browser rendering pipeline**.

```text id="5ee5oh"
API response
  -> validate schema
  -> convert to typed state
  -> sanitise unsafe content
  -> compare with current UI state
  -> render/update only changed parts
  -> report errors/performance
```

## Best package names

I would group this under:

```text id="2guw3b"
lo-web
lo-web-render
lo-web-state
lo-web-components
lo-web-router
lo-web-events
lo-data-json
lo-security-html
lo-target-wasm
lo-target-js
```

Or shorter:

```text id="rjvy35"
lo-ui
lo-ui-web
lo-ui-render
lo-ui-state
```

My preference:

```text id="7dqu7j"
lo-web-render
```

because it clearly means browser rendering.

---

## How LO could help browser rendering

### 1. Typed API responses

Instead of receiving loose JSON:

```javascript id="nrfl5p"
const data = await response.json();
```

LO could require a schema:

```text id="wmmnsn"
schema Product {
    id: Text
    title: Text
    price: Money<GBP>
    imageUrl: Url
    inStock: Bool
}
```

Then:

```text id="ag1kqb"
let products = fetch "/api/products" as Product[]
```

If the API returns bad data, LO blocks rendering and returns a typed error.

---

### 2. Safe rendering by default

LO should prevent unsafe HTML injection.

Bad pattern:

```text id="lcrrt0"
element.innerHTML = apiData.description
```

LO should require:

```text id="va0v2w"
render Text(apiData.description)
```

or, if HTML is allowed:

```text id="u1o7mb"
render SafeHtml(apiData.description)
```

Only sanitised or trusted HTML should be allowed.

```text id="514k7z"
Text       = escaped by default
SafeHtml   = sanitised and approved
RawHtml    = denied unless explicitly enabled
```

This would help prevent XSS-style issues.

---

### 3. State-driven rendering

LO could use a state model:

```text id="t7pgn4"
state ProductPage {
    products: Product[]
    loading: Bool
    error: Text optional
}
```

Then the UI renders from state:

```text id="5f2urt"
view ProductGrid(state: ProductPage) {
    if state.loading {
        render LoadingSpinner()
    }

    if state.error exists {
        render ErrorBox(state.error)
    }

    for product in state.products {
        render ProductCard(product)
    }
}
```

When data changes, LO updates the UI.

---

### 4. Only update changed parts

LO could compile browser rendering to:

```text id="vgxr9t"
JavaScript
WebAssembly
DOM operations
virtual DOM style diffing
fine-grained reactive updates
```

The developer should not manually decide which DOM node to update.

LO could do:

```text id="gu8ddx"
old state -> new state -> update changed UI only
```

This would make rendering faster and safer.

---

### 5. Streaming rendering

For large data, LO should not wait for everything.

Example:

```text id="3kedwi"
stream Product[] from "/api/products" {
    renderEach: ProductCard
    batchSize: 20
}
```

Useful for:

```text id="drpk8t"
search results
large tables
logs
chat messages
product grids
financial data
AI responses
```

Instead of:

```text id="gr7bmu"
download all data
parse all data
render all data
freeze browser
```

LO should support:

```text id="8nzvbi"
receive chunk
validate chunk
render batch
continue
```

---

## Example LO-style browser page

```text id="43lc3g"
use web.render
use web.state
use data.json

schema Product {
    id: Text
    title: Text
    price: Money<GBP>
    imageUrl: Url
    inStock: Bool
}

state ProductPage {
    products: Product[]
    loading: Bool = true
    error: Text optional
}

component ProductCard(product: Product) {
    render article class "product-card" {
        img src product.imageUrl alt product.title
        h2 Text(product.title)
        p Text(product.price.format())
        
        if product.inStock {
            span class "stock-ok" Text("In stock")
        } else {
            span class "stock-none" Text("Out of stock")
        }
    }
}

page Products {
    onLoad {
        let result = fetch "/api/products" as Product[]

        match result {
            Ok(items) => state.products = items
            Err(error) => state.error = error.message
        }

        state.loading = false
    }

    render {
        if state.loading {
            LoadingSpinner()
        }

        if state.error exists {
            ErrorBox(state.error)
        }

        grid {
            for product in state.products {
                ProductCard(product)
            }
        }
    }
}
```

---

## Browser rendering reports

LO could generate:

```text id="ekaidr"
app.web-render-report.json
app.client-state-report.json
app.api-schema-report.json
app.security-html-report.json
app.performance-report.json
```

Example:

```json id="cn2e9p"
{
  "page": "Products",
  "api": "/api/products",
  "schema": "Product[]",
  "renderMode": "state-diff",
  "unsafeHtml": "denied",
  "streaming": false,
  "warnings": [
    "Product imageUrl is remote. Consider image domain allowlist."
  ]
}
```

---

## Good LO rule for browser rendering

```text id="i52whm"
Data received by the browser must be validated before it becomes UI.
```

Then:

```text id="tpx20l"
Text is escaped by default.
HTML is denied unless sanitised.
API data is schema-checked.
State controls rendering.
DOM updates are generated safely.
Large data can stream in batches.
```

## Best positioning

LO could make browser rendering stronger by combining:

```text id="owj3xa"
typed API data
safe HTML rendering
state-driven UI
streaming updates
WASM/JS output
security reports
performance reports
```

So LO would not replace the browser. It would compile safe, typed LO UI code into browser-compatible JavaScript/WASM and make sure received data is validated before rendering.
