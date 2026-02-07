# WRP - Web Rocket Pro Website

> Webflow-exported static website with custom dropdown mega menu, hamburger menu, accordion navigation, and GSAP animations.

---

## 📁 Project Structure

```
webflowwebsite/
├── index.html                     ← Main HTML page (all sections)
├── css/
│   ├── normalize.css              ← Browser reset (DO NOT EDIT)
│   ├── webflow.css                ← Webflow core styles (DO NOT EDIT)
│   ├── wrp-3653b4.webflow.css     ← Webflow-exported design styles (DO NOT EDIT)
│   ├── styles.css                 ← Additional Webflow styles (DO NOT EDIT)
│   └── dropdown-fix.css           ← ✅ CUSTOM: All dropdown/menu overrides (EDIT THIS)
├── js/
│   ├── main.js                    ← ✅ CUSTOM: Hamburger menu, dropdown positioning, accordion, mobile width
│   ├── animations.js              ← ✅ CUSTOM: GSAP animations, FAQ accordion, Read More, marquee
│   └── webflow.js.bak             ← Backup of original Webflow JS (DO NOT USE)
└── images/                        ← All website images (.avif format)
```

---

## 🔗 CSS Load Order (Priority: Low → High)

CSS files load in this order in `index.html`. Later files override earlier ones:

| #  | File                         | Purpose                          | Editable? |
|----|------------------------------|----------------------------------|-----------|
| 1  | `css/styles.css`             | Imports normalize + webflow + wrp CSS | ❌ No     |
| 2  | `css/dropdown-fix.css`       | Custom dropdown & menu overrides | ✅ Yes    |
| 3  | Inline `<style>` in HTML     | Webflow utility overrides        | ⚠️ Careful |
| 4  | Inline `style=""` on elements | Highest priority overrides       | ✅ Yes    |

---

## 🔧 JavaScript Files

Scripts load at the bottom of `index.html` in this order:

| #  | Script                       | Purpose                          | Editable? |
|----|------------------------------|----------------------------------|-----------|
| 1  | jQuery 3.5.1 (CDN)          | Required by Webflow              | ❌ No     |
| 2  | GSAP 3.12.2 (CDN)           | Animation library                | ❌ No     |
| 3  | Webflow.js (CDN)             | Webflow runtime (dropdown states)| ❌ No     |
| 4  | Inline `<script>` marquee    | Logo slider animation            | ⚠️ Careful |
| 5  | `js/main.js` (defer)         | Custom hamburger, dropdown, accordion | ✅ Yes |
| 6  | `js/animations.js`           | Loaded dynamically by main.js    | ✅ Yes    |

---

## 🎯 WHAT TO CHANGE & WHERE

---

### 1. SERVICES DROPDOWN - DESKTOP (5 Column Mega Menu)

**File:** `css/dropdown-fix.css` → `@media screen and (min-width: 992px)` section

| What to change | CSS Property | Current Value | Where |
|----------------|-------------|---------------|-------|
| Dropdown width | `width` on `.dropdown-menu.w-dropdown-list` | `120vw` | dropdown-fix.css line ~92 |
| Dropdown max-width | `max-width` on `.dropdown-menu.w-dropdown-list` | `1400px` | dropdown-fix.css line ~93 |
| Horizontal position | `left` on `.dropdown-menu.w-dropdown-list` | `60%` | dropdown-fix.css line ~89 |
| Horizontal centering | `transform` on `.dropdown-menu.w-dropdown-list` | `translateX(-48%)` | dropdown-fix.css line ~91 |
| Dropdown padding (when open) | `padding` on `.dropdown-menu.w-dropdown-list.w--open` | `2rem 3.5rem` | dropdown-fix.css line ~104 |
| Shadow | `box-shadow` on `.dropdown-menu.w-dropdown-list` | See file | dropdown-fix.css line ~97 |
| Column spacing | `padding` on `.dropdown-grid-item` | `0 1.25rem` | dropdown-fix.css line ~121 |
| Divider height | `min-height` on `.dropdown-divider` | `300px` | dropdown-fix.css line ~136 |
| Divider color | `background-color` on `.dropdown-divider` | `#eaecf0` | dropdown-fix.css line ~133 |
| Category title color | `color` on `.dropdown-text` | `#0c111d` | dropdown-fix.css line ~147 |
| Category title size | `font-size` on `.dropdown-text` | `1rem` | dropdown-fix.css line ~149 |
| Link text color | `color` on `.dropdown-link-text` | `#667085` | dropdown-fix.css line ~194 |
| Link hover color | `color` on `.dropdown-link:hover .dropdown-link-text` | `#004185` | dropdown-fix.css line ~200 |
| Link hover background | `background-color` on `.dropdown-link:hover` | `#f2f4f7` | dropdown-fix.css line ~178 |
| Icon dots color | `background-color` on `.menu-icon-line` | `#0095CA` | dropdown-fix.css line ~158 |

**File:** `js/main.js` → `positionDropdown()` function (inside "Services Dropdown Enhancement" IIFE)

| What to change | JS Property | Current Value | Where |
|----------------|------------|---------------|-------|
| Vertical position offset | `navbarRect.bottom - 50` | `-50` (moves dropdown 50px up) | main.js ~line 290 |
| Position type | `dropdownMenu.style.position` | `'fixed'` | main.js ~line 292 |
| Center align | `dropdownMenu.style.left` + `transform` | `'50%'` + `'translateX(-50%)'` | main.js ~line 294-295 |

---

### 2. SERVICES DROPDOWN - MOBILE (Accordion Inside Hamburger)

**File:** `css/dropdown-fix.css` → `@media screen and (max-width: 991px)` section

| What to change | CSS Property | Current Value | Where |
|----------------|-------------|---------------|-------|
| Open dropdown background | `background-color` on `.dropdown-menu.w-dropdown-list.w--open` | `#f5f7fa` | dropdown-fix.css ~line 264 |
| Category header padding | `padding` on `.dropdown-text-wrap` | `1rem 0.5rem` | dropdown-fix.css ~line 309 |
| Category text size | `font-size` on `.dropdown-text` | `0.9375rem` | dropdown-fix.css ~line 317 |
| Category text color | `color` on `.dropdown-text` | `#0c111d` | dropdown-fix.css ~line 319 |
| Plus icon color | `background-color` on `.navbar-menu-icon .menu-icon-line` | `#344054` | dropdown-fix.css ~line 336 |
| Plus icon horizontal bar size | `width/height` on `.menu-icon-line:first-child` | `14px / 2px` | dropdown-fix.css ~line 341-342 |
| Plus icon vertical bar size | `width/height` on `.menu-icon-line.is--2` | `2px / 14px` | dropdown-fix.css ~line 346-347 |
| Link text color (mobile) | `color` on `.dropdown-link-text` | `#475467` | dropdown-fix.css ~line 379 |
| Link hover background | `background-color` on `.dropdown-link:hover` | `#e8ecf1` | dropdown-fix.css ~line 370 |
| Border between categories | `border-bottom` on `.dropdown-grid-item` | `1px solid #eaecf0` | dropdown-fix.css ~line 289 |

**File:** `js/main.js` → "Force 100% width" IIFE + "Category Toggles" IIFE

| What to change | Description | Where |
|----------------|------------|-------|
| Which elements get 100% width | `forceDropdownWidth()` function targets | main.js ~line 97-175 |
| Accordion open/close behavior | `initCategoryToggles()` - toggles `.active` and `.is-open` classes | main.js ~line 215-255 |
| Close other accordions on open | Loop inside click handler removes `.active` from siblings | main.js ~line 235-242 |

---

### 3. HAMBURGER MENU (Mobile Navigation)

**File:** `css/dropdown-fix.css` → Mobile menu section

| What to change | CSS Property | Current Value | Where |
|----------------|-------------|---------------|-------|
| Menu top position | `top` on `.nav-menu.w--open` | `5.5rem` | dropdown-fix.css ~line 37 |
| Menu height | `height` on `.nav-menu.w--open` | `50vh` | dropdown-fix.css ~line 41 |
| Menu background | `background` on `.nav-menu.w--open` | `white` | dropdown-fix.css ~line 42 |
| Menu z-index | `z-index` on `.nav-menu.w--open` | `9999` | dropdown-fix.css ~line 43 |
| Menu alignment | `align-items` on `.nav-menu.w--open` | `center` | dropdown-fix.css ~line 46 |

**File:** `js/main.js` → "Hamburger Menu Toggle" IIFE

| What to change | Description | Where |
|----------------|------------|-------|
| Toggle class name | `.w--open` on `.nav-menu` | main.js ~line 44 |
| Hamburger icon selector | `.menu-icon:not(.is--close)` | main.js ~line 51 |
| Close icon selector | `.menu-icon.is--close` | main.js ~line 52 |
| Mobile breakpoint | `window.innerWidth < 992` | main.js ~line 71 |

---

### 4. FAQ ACCORDION

**File:** `js/animations.js` → FAQ accordion IIFE (~line 220)

| What to change | Description | Where |
|----------------|------------|-------|
| Animation duration | `'height 260ms ease'` transition | animations.js ~line 250, 270 |
| Toggle class | `.is--open` on `.dropdown-item` | animations.js ~line 232 |
| Panel selector | `.dropdown-panel` inside `.dropdown-item` | animations.js ~line 226 |

---

### 5. READ MORE SECTION

**File:** `js/animations.js` → Read More IIFE (~line 28)

| What to change | Description | Where |
|----------------|------------|-------|
| Animation duration | `'height 260ms ease'` transition | animations.js ~line 46, 61 |
| Target wrapper | `.about-read-more` | animations.js ~line 29 |
| Hidden content | `.hidden-box` | animations.js ~line 30 |
| Trigger button | `.button-group.is--read-more .button` | animations.js ~line 31 |

**File:** `index.html` → Inline `<style>` at bottom (~line 2383)

| What to change | CSS Property | Where |
|----------------|-------------|-------|
| Button text toggle (Read More / Read Less) | `.button-text.is--1` / `.button-text.is--2` display | index.html ~line 2395-2405 |
| Arrow rotation | `.button-arrow` transform: `rotate(180deg)` | index.html ~line 2408 |
| Gradient overlay | `.about-linear-bg` opacity | index.html ~line 2416 |

---

### 6. LOGO MARQUEE / SLIDER

**File:** `index.html` → Inline `<script>` after Webflow.js (~line 2338)

| What to change | Description | Current Value | Where |
|----------------|------------|---------------|-------|
| Scroll speed | `duration` in `gsap.fromTo()` | `20` (seconds) | index.html ~line 2363 |
| Direction | `x` value (negative = left) | `-totalWidth` | index.html ~line 2362 |
| Resize debounce | `gsap.utils.debounce` delay | `300ms` | index.html ~line 2370 |

---

### 7. GSAP PAGE ANIMATIONS

**File:** `js/animations.js` → `loadGsapAndAnimate()` function (~line 320)

| What to change | Description | Current Value | Where |
|----------------|------------|---------------|-------|
| Reveal animation | `gsap.fromTo()` on `[data-w-id]` elements | `y:12 → 0, opacity:0 → 1` | animations.js ~line 345 |
| Duration | Animation duration | `0.7s` | animations.js ~line 345 |
| Stagger | Delay between elements | `0.06s` | animations.js ~line 345 |
| Easing | Animation curve | `'power2.out'` | animations.js ~line 345 |

---

### 8. COLORS REFERENCE

| Color | Hex Code | Used For |
|-------|----------|----------|
| Primary Blue | `#0095CA` | Icons, focus outlines, icon dots |
| Dark Blue | `#004185` | Link hover text |
| Dark Text | `#0c111d` | Category headings |
| Gray Text | `#667085` | Link text (desktop) |
| Gray Text Alt | `#475467` | Link text (mobile) |
| Light Gray BG | `#f2f4f7` | Link hover background (desktop) |
| Light Gray BG Alt | `#e8ecf1` | Link hover background (mobile) |
| Section BG | `#f5f7fa` | Open dropdown background (mobile) |
| Border | `#eaecf0` | Dividers, category borders |
| Dark Gray | `#344054` | Plus/minus icon (mobile) |
| White | `#ffffff` | Dropdown background, menu background |

---

### 9. BREAKPOINTS

| Breakpoint | Screen Width | Behavior |
|------------|-------------|----------|
| Desktop | ≥ 992px | 5-column mega menu, fixed positioning |
| Tablet | 768px – 991px | Hamburger menu, accordion dropdown |
| Mobile | ≤ 767px | Hamburger menu, accordion dropdown |

The breakpoint `992px` is used in both CSS (`@media`) and JS (`window.innerWidth`). To change:
- **CSS:** Edit `min-width: 992px` and `max-width: 991px` in `dropdown-fix.css`
- **JS:** Edit `window.innerWidth >= 992` and `window.innerWidth < 992` in `main.js`

---

### 10. FONTS

**Google Fonts** loaded via `@import` in `index.html` `<head>`:
- **Roboto** (weight 100-900, normal + italic)
- **Bitcount Grid Double** (weight 100-900)

To change fonts, edit the `@import url(...)` in the `<style>` tag inside `<head>` of `index.html` (~line 14).

---

### 11. IMAGES

All images are in `/images/` folder in `.avif` format:

| Image | Used For |
|-------|----------|
| `CTA.avif`, `CTA-2.avif` | Call-to-action sections |
| `image.avif` + responsive variants (`image-p-500.avif` to `image-p-3200.avif`) | Hero/main image with srcset |
| `video-thumbnail-1.avif`, `video-thumbnail-2.avif` | Video section thumbnails |
| `Frame-301-1.avif` | Content frame |
| `logo.svg` | Site logo (in images folder) |
| `favicon.ico` | Browser tab icon |
| `webclip.png` | Apple touch icon |

---

### 12. KEY HTML CLASSES (Webflow)

| Class | Element | Purpose |
|-------|---------|---------|
| `.navbar.w-nav` | `<div>` | Main navbar wrapper |
| `.nav-menu.w-nav-menu` | `<nav>` | Navigation menu container |
| `.menu-button.w-nav-button` | `<div>` | Hamburger menu button |
| `.nav-link.is--dropdown.w-dropdown` | `<div>` | Services dropdown wrapper |
| `.dropdown-toggle.w-dropdown-toggle` | `<div>` | Services button (click target) |
| `.dropdown-menu.w-dropdown-list` | `<nav>` | Dropdown content panel |
| `.dropdown-grid.w-layout-grid` | `<div>` | 5-column grid (desktop) / accordion list (mobile) |
| `.dropdown-grid-item` | `<div>` | Single category column |
| `.dropdown-text-wrap` | `<div>` | Category header (accordion trigger on mobile) |
| `.dropdown-link-wrap` | `<div>` | Links container (hidden by default on mobile) |
| `.dropdown-link.w-inline-block` | `<a>` | Individual service link |
| `.dropdown-divider` | `<div>` | Vertical line between columns (desktop only) |
| `.w--open` | Added by JS | Indicates open state (menu, dropdown) |
| `.active` | Added by JS | Indicates open accordion section |
| `.is-open` | Added by JS | Indicates open category header (for +/- icon) |

---

### 13. ADDING NEW SERVICE LINKS

To add a new link under a category, find the `.dropdown-link-wrap` inside the desired `.dropdown-grid-item` in `index.html` and duplicate an existing `<a class="dropdown-link w-inline-block">` block:

```html
<a href="#YOUR-URL" class="dropdown-link w-inline-block">
  <div class="dropdown-link-icon w-embed">
    <svg viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Your SVG icon path here -->
    </svg>
  </div>
  <div class="dropdown-link-text">Your Service Name</div>
</a>
```

---

### 14. ADDING A NEW DROPDOWN CATEGORY (6th Column)

1. In `index.html`, add a new `<div class="dropdown-divider">` + `<div class="dropdown-grid-item">` after the last grid item
2. In `css/dropdown-fix.css`, update the grid template:
   ```
   grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
   ```
   (Add one more `auto 1fr` pair)
3. Adjust `max-width` on `.dropdown-menu.w-dropdown-list` if needed

---

### 15. IMPORTANT NOTES

- **DO NOT EDIT** `normalize.css`, `webflow.css`, `wrp-3653b4.webflow.css`, or `styles.css` — these are Webflow-generated
- **All custom CSS** goes in `dropdown-fix.css`
- **All custom JS** goes in `main.js` or `animations.js`
- `!important` is used extensively in `dropdown-fix.css` to override Webflow's styles
- Inline `style=""` attributes on HTML elements have the highest CSS priority
- The `webflow.js` CDN handles basic dropdown open/close (`.w--open` class toggling)
- `main.js` adds extra functionality: hamburger toggle, dropdown positioning, accordion, mobile width forcing
- `animations.js` is loaded dynamically by `main.js` via script injection

---

### 16. ORIGINAL WEBFLOW SITE

Reference: https://web-rocket-pro.webflow.io/
