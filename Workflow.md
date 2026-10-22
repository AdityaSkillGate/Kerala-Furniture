
UNIVERSAL WEBSITE DEVELOPMENT WORKFLOW

A structured framework for planning, building, testing, refining, and launching web development projects.

Core Operational Logic

• Section-by-Section Iteration: The website is never built all at once. Each distinct component or section must pass through planning, implementation, testing, review, and approval gates before moving forward.
• Macro Pipeline: PLAN → UNDERSTAND → PROMPT → BUILD → TEST → REVIEW → REWORK → APPROVE → NEXT SECTION → FINAL QA → LIVE
• Micro Section Loop: UNDERSTAND → BUILD → TEST → REVIEW → REWORK → APPROVE

Phase 1: Initiation & Requirements Analysis


1. Requirements Clarity

• Read the comprehensive project documentation thoroughly before writing any code.
• Map out the entire architectural structure and define the explicit purpose of every page section.
• Review all provided UI/UX reference frames and wireframes.
• Finalize design tokens: target color palettes, typography rules, spacing scales, and global interactions.
• Hard Stop: Do not write any code until the core objectives are completely understood.

2. Pre-Build Preparation

• Audit the existing repository, folder structure, and global configuration.
• Identify reusable components, styles, utilities, and pre-existing animation modules.
• Catalog and organize production-ready, high-resolution media assets.
• Maintain structural modularity so individual components can be edited independently without breaking side layouts.

Phase 2: The Sprint Engine (Section-by-Section)


3. Developer / AI Prompt Structure

When engineering tasks or prompting AI tools for a specific section, use the following standardized format:
text
SECTION:        [Name / Identifier of the specific section]
REFERENCE:      [Link to UI design file, mockup, or wireframe]
OBJECTIVE:      [Functional purpose and user goal of this section]
CONTENT:        [Exact text copy, headings, and labels required]
ASSETS:         [Paths to specific images, logos, icons, fonts, or videos]
DESIGN:         [Specific layout rules, grid structure, spacing, colors]
ANIMATION:      [Exact scroll triggers, hover states, transitions, or micro-interactions]
RESPONSIVE:     [Breakpoints and layout adaptations for Mobile, Tablet, and Desktop]
DO NOT CHANGE:  [Global configurations or previously approved styles to lock]
QA CRITERIA:    [Specific behaviors that must be validated]
STOP CONDITION: [Instruction to finish this section only and await structural approval]
Use code with caution.

4. Asset Handling & Interaction Standard

• Asset Integrity: Always use original, uncompressed high-resolution digital assets. Avoid artificial upscaling artifacts, text distortions, or blurred components.
• Motion Ethics: Motion behaviors must support user experience, not distract. Avoid aggressive zooming effects, oversized transitions, or excessive parallax styling. Keep interactions synchronized with content focal points and respect system reduced-motion preferences.

Phase 3: The Quality Gates


5. Pre-Review Testing Checklist

Developers must run this checklist locally before staging code for external review:
• Visual Fidelity: Check layout positioning, proportions, and spacing against the design files.
• Typography: Verify font hierarchy, weights, and cross-device visibility.
• Interactivity: Validate buttons, links, form inputs, and state changes.
• Responsive Check: Test performance across standard desktop, tablet, and mobile viewport sizes.
• System Integrity: Clear runtime console errors and ensure the new code does not introduce regression issues to existing layouts.

6. Review, Rework, & Approval

• Mandatory Rework: If the current section deviates from specifications, it must enter a correction cycle before completion.
• Isolation: Pinpoint the exact visual, structural, or asset issue without tearing down nearby working modules.
• Sign-Off: Present the section, explain the technical setup, confirm compliance with requirements, and freeze development until approval is documented.

Phase 4: Release & Deployment


7. End-to-End Final QA

Once all individual components are built and merged, execute a full project regression pass covering:
• Global navigation, menus, and footer maps.
• System-wide interactive flows, links, and forms.
• Global site performance, image optimization, and load times.
• Consistent theme colors, font families, and asset distribution.
• Completed user journey maps from landing entry points to final actions.

8. Final Pre-Flight Corrections

If final testing reveals critical issues:
1. Isolate and document the bug.
2. Apply targeted adjustments.
3. Verify the fixed component.
4. Test surrounding views to check for layout regressions.
5. Deploy strictly after all parameters clear verification.

9. Delivery Pipeline

• Confirm complete delivery of all requirements.
• Verify asset delivery across live networks.
• Deploy the optimized code to production.
• Run a live production post-deployment check immediately following launch.

Golden Rules for Project Teams

1. Never build everything at once — iterate incrementally.
2. Never compromise requirements analysis for early speed.
3. Never skip cross-device mobile responsive testing.
4. Never advance a feature branch without formal step approval.
5. Never push production builds without a comprehensive QA audit.