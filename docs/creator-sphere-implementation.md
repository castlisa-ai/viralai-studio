# Creator Sphere Implementation Contract

## Source of truth

Implement the Creator Sphere from the supplied Figma capture `creator-command-center.figmacapture`.

- Figma root: `creator-command-center` — node `3:4`
- Reference viewport: 1440 × 1024 for the root frame
- Main content: node `3:40`
- Treat the supplied reference PNG as the visual authority.
- Treat `design/nodes.json` and `prompt.md` as the structural/layout authority.
- Do not infer or redesign missing elements.

## Target stack

The existing project is React + Vite with plain CSS. Do **not** install Tailwind, Chakra, or another UI framework unless explicitly requested.

## Architecture

Refactor the Creator Sphere into reusable components. Do not leave the complete screen as one monolithic `App.jsx` implementation.

Recommended structure:

```text
src/
  components/
    oae/
      Panel.jsx
      TagBadge.jsx
      MiniStatus.jsx
      PipelineCard.jsx
      TeamMember.jsx
      ContextCell.jsx
      Field.jsx
      SelectField.jsx
    layout/
      Sidebar.jsx
      TopNav.jsx
    creator/
      CreatorCommandCenter.jsx
      MissionSetup.jsx
      TeamPosture.jsx
      Activity.jsx
      RuntimeContext.jsx
  design-system/
    tokens.css
```

Use existing components when present. Do not create duplicate implementations of the same visual primitive.

## Required visual tokens

```css
--oae-bg: #07090E;
--oae-sidebar: #0C0F16;
--oae-panel: #111521;
--oae-field: #161B2B;
--oae-border: #1F2637;
--oae-cyan: #00F0FF;
--oae-text: #F1F5F9;
--oae-secondary: #94A3B8;
--oae-muted: #64748B;
--oae-green: #10B981;
--oae-yellow: #EAB308;
--oae-orange: #F97316;
```

Typography uses Inter. Preserve the weights/sizes from the Figma capture rather than approximating them.

## Layout rules

- Preserve the Figma hierarchy and child order.
- Use CSS Grid/Flexbox for normal layout.
- Use `gap` for spacing between functional elements.
- Preserve the Figma fixed widths where the source specifies them, especially the right-side panels/status area.
- Use `box-sizing: border-box` globally.
- Do not use empty elements to create spacing.
- Do not use spacer divs.
- Do not use arbitrary large `min-height` values to force visual alignment.
- Do not use arbitrary margins to push content into place.
- Do not use absolute positioning unless the Figma node explicitly requires it.
- Responsive behavior must reflow/collapse the existing layout; it must not introduce empty vertical regions.

## Explicitly forbidden

- No Tailwind classes.
- No Chakra installation.
- No new UI framework.
- No duplicated Card/Panel/Badge components.
- No generated placeholder sections.
- No decorative whitespace that is not in the reference.
- No implementation of Figma measurement overlays.
- No implementation of Figma inspection guides.
- Do not implement the Figma node named `Additional Element` (`1:8`) as visible layout; it is not part of the intended UI and must not create the large empty area seen in raw generated markup.

## Creator Sphere component mapping

Use these Figma nodes as the component references:

- `3:5` LeftSidebar → `Sidebar`
- `3:24` RightPane → application content shell
- `3:25` TopNav → `TopNav`
- `3:40` MainContent → `CreatorCommandCenter`
- `3:41` HeaderAndStatusSection → `HeaderAndStatus`
- `3:48` TagBadge → `TagBadge`
- `3:56`, `3:62`, `3:69`, `3:75` MiniStatus variants → `MiniStatus`
- `3:82` MissionSetup → `MissionSetup`
- `3:91`, `3:95`, `3:101`, `3:106` form controls → `Field` / `SelectField`
- `3:108` TeamPosture → `TeamPosture`
- `3:113`, `3:121`, `3:127`, `3:133` → `TeamMember`
- `3:139` PipelineGrid → `PipelineGrid`
- `3:141`, `3:147`, `3:153`, `3:160`, `3:166`, `3:172` → `PipelineCard`
- `12:4` Activity → `Activity`
- `12:9` activity-empty-state → `EmptyState`
- `3:185` RuntimeContext → `RuntimeContext`
- `3:191`, `3:194`, `3:198`, `3:201` → `ContextCell`
- `3:204` capability-scope → `CapabilityScope`

## Content/state

Preserve the visible copy from the Figma reference:

- CREATOR COMMAND
- Creator command center
- Kick off a new creative mission, sort out the team setup, and keep track of what's ready in the workspace.
- CREATOR / SPHERE: CREATOR / MISSION: SET UP ORGANIZATION
- RESEARCH / Not researched yet / Scout's advice
- HOOK / Pending / Waiting on hook creation
- SCRIPT / Pending / No script output yet
- PACKAGE / Not made yet / No content package available
- MISSION SETUP / Start the creative mission
- TEAM POSTURE / Creator team
- Scout / Spotting opportunities / RESEARCH ADVISORY
- Strategist / Narrative direction
- Creator / Content production
- Critic / Review and approval
- HANDOFF / No handoff yet / No production handoff yet
- TEAM POSTURE / 4 out of 4 roles filled / Current workspace roles
- ACTIVITY / Recent creative activity
- Only current live workspace state is reflected here.
- No creative activity yet.
- RUNTIME CONTEXT / Creator workspace status
- ORGANIZATION / OAE
- ROLE / CREATOR
- ACTIVE SPHERE / creator
- CURRENT MISSION / Initialize Organization
- CAPABILITY SCOPE / creator, content, script, package, hooks, research

Interactive inputs may remain functional, but their styling and dimensions must match the Figma design.

## Implementation workflow

1. Inspect the current repository before changing files.
2. Preserve useful existing functionality.
3. Create the design tokens and reusable OAE primitives first.
4. Build the Creator Sphere from those primitives.
5. Compare the result against the supplied reference PNG at the target viewport.
6. Fix geometry/layout drift before adding polish.
7. Do not make unrelated refactors.
8. Run the project's build/test commands if available.
9. Report exactly which files changed and any verification that could not be run.

## Definition of done

The Creator Sphere is done only when:

- The shell, sidebar, top navigation, and MainContent match the reference composition.
- No unintended large empty spaces exist.
- No Figma measurement/inspection artifacts are rendered.
- Repeated visual patterns are reusable React components.
- Colors, typography, borders, radii, gaps, and panel proportions follow the supplied Figma capture.
- The implementation remains plain React + CSS and does not add Tailwind or Chakra.
- The page remains functional and responsive without drifting from the desktop reference.
