### Constellation — Personal Landing Page
*A link-in-bio page that feels like a living constellation, not a list.*

### Problem
Every link-in-bio page looks the same — a vertical stack of buttons on a colored background. For someone who's social, geeky, and investing heavily in AI, that generic template actively misrepresents who they are. This page should feel alive, warm, and memorable — the kind of thing a recruiter or collaborator visits and actually remembers.

### Core Features

**1. Constellation Layout**
Your photo, name, and a punchy one-liner sit at the center. Four nodes orbit around you: Projects, Blog, Contact, Social. Connected by faint lines that suggest relationships. This replaces the traditional vertical link list with something spatial and explorable.

**2. Staggered Fade-In**
On load, the page pauses for a beat, then your photo fades in first. Nodes drift into position one by one over ~3 seconds. The page feels like it's waking up — not just rendering.

**3. Breathing Animation**
Each node has a slow, subtle pulse. Not bouncing, not spinning — breathing. The effect is organic and alive without being distracting.

**4. Interactive Hover States**
Hovering a node lights up its connecting lines to the center. Each node shows a witty tooltip:
- Projects: *"things I've built (and things I'm building)"*
- Blog: *"thoughts that escaped my head"*
- Contact: *"let's talk — I don't bite"*
- Social: *"proof I go outside... digitally"*
(Final copy to be refined, but the tone is: warm, slightly funny, never try-hard.)

**5. Mixed Click Behavior**
- **Projects** and **Social** expand on click — revealing 2-3 sub-links inline. The constellation reorganizes to make room. Social fans out into GitHub, LinkedIn, Twitter/X, etc. Projects shows featured work.
- **Blog** and **Contact** link out directly — Blog goes to the blog, Contact opens email or a contact method.

**6. Responsive Design**
Works on mobile. The constellation adapts — possibly stacking vertically on small screens while keeping the spatial feel. Nodes remain tappable with enough spacing.

### Non-Goals
- No CMS or admin panel — links are edited directly in the HTML/JS
- No analytics or tracking scripts
- No chatbot or AI-powered interactive features — the AI influence is in the aesthetic, not a gimmick
- No separate pages — everything lives on one page
- No build step or framework — pure static files
- No dark/light mode toggle — pick one and commit

### Technical Considerations
- **Stack:** Single `index.html` with inline CSS and JS. No dependencies, no build tools, no framework. GitHub Pages serves it as-is.
- **Animation:** CSS animations for breathing/pulsing. JS for the staggered fade-in sequencing and hover interactions. CSS transitions for the node expansion.
- **Layout:** CSS positioning (absolute or a combination of flexbox with transforms) to place nodes in a circular/orbital pattern around the center. JS to handle the expand/collapse reorganization.
- **Lines:** Either SVG lines or CSS borders/pseudo-elements connecting nodes to center. SVG gives more control over animation (line glow on hover).
- **Responsive:** Media queries to adjust node positions and spacing. On very small screens, consider a more compact arrangement while preserving the constellation feel.
- **Assets:** A single profile photo. Optimized for web. Everything else is text and code.

### Milestones

**1. Static Constellation**
Center element (photo + name + tagline) with four nodes positioned around it. Connected by lines. No animation yet. Just the layout working on desktop and mobile.

**2. Animation & Interaction**
Add the staggered fade-in on load, breathing pulse on nodes, hover effects (line glow + tooltips). The page should feel alive.

**3. Expand/Collapse Nodes**
Projects and Social nodes expand to show sub-links on click. Constellation reorganizes smoothly. Blog and Contact link out directly.

**4. Polish & Deploy**
Final copy, color tuning, responsive testing, performance check. Push to GitHub Pages.

### Open Questions
- What profile photo to use?
- What's the exact one-liner for the center? (Should capture the "social tech guy investing in AI" personality.)
- What are the actual links for each node? (Which GitHub repos to feature, blog URL, social profile URLs, preferred contact method.)
- Color palette — dark background with warm glowing nodes? Or light with bold accent colors? Needs to feel warm but also "alive/intelligent."
- Should the sub-links (expanded Projects/Social) have their own mini-tooltips too?
