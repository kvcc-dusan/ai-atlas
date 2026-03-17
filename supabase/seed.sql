-- ============================================
-- Ai Atlas — Seed Data
-- Run AFTER schema.sql
-- ============================================

-- Skills
insert into skills (id, chapter, category, title, brief, tools, status, last_updated, overview, getting_started, tips, detail_tools, prompts, related_skills) values

(1, '01', 'CREATIVE', 'AI Image Generation',
 'Generating, editing, and iterating on images for design work. Covers prompting techniques, style control, and integration with Figma workflows.',
 array['Midjourney','DALL-E 3','Flux'], 'active', '2026-02-15',
 array[
   'AI image generation has fundamentally changed how we approach visual design at INOVA IT. Instead of spending hours searching stock libraries or waiting for custom illustrations, designers can now generate tailored visuals in minutes — iterating on concepts faster than ever before.',
   'This skill covers the three major tools we use in production: Midjourney for high-fidelity creative work, DALL-E 3 for quick conceptual exploration and text-integrated images, and Flux for open-source flexibility when client data policies require it.',
   'Understanding image generation isn''t just about typing prompts — it''s about controlling style consistency across a project, knowing which tool fits which use case, and integrating AI-generated assets into existing Figma workflows without breaking your design system.'
 ],
 array[
   'Start with Midjourney — join the INOVA IT workspace on Discord and use the #ai-images channel. Run /imagine with a simple descriptive prompt to see how the tool responds.',
   'Learn the anatomy of a good image prompt: Subject + Style + Mood + Technical parameters. Example: "Modern office interior, Scandinavian design, warm natural lighting, architectural photography style --ar 16:9 --v 6"',
   'Experiment with style references (--sref) and character references (--cref) in Midjourney to maintain visual consistency across a series of images for the same project.',
   'For client-facing work, always generate 3-4 variations and present options. Use Midjourney''s variation and zoom features to refine the selected direction.',
   'Export at maximum resolution and bring into Figma. Use the "Upscale (Subtle)" option for production-ready assets. Document your prompts in the project brief for future reference.'
 ],
 array[
   'Always use --style raw for commercial work — it gives you more control and less "Midjourney flavor" in the output.',
   'Negative prompts (--no) are your best friend. Specify what you DON''T want to avoid common AI artifacts: --no text, watermark, blurry, distorted.',
   'For consistent character design across multiple images, use --cref with a reference image. This is game-changing for pitch decks and storyboards.',
   'DALL-E 3 is surprisingly good at text in images — use it when you need placeholder text that actually looks readable in mockups.',
   'Never deliver AI-generated images directly to clients without post-processing. Always bring them into Photoshop or Figma for color correction, cropping, and integration with the design system.',
   'Keep a prompt library in your project documentation. Future you (and your teammates) will thank you when you need to generate more images in the same style.'
 ],
 '[{"name":"Midjourney","best":"High-quality creative imagery, brand visuals, mood boards. Best photorealism and artistic control.","note":"Accessed via Discord. v6+ recommended. Requires paid plan."},{"name":"DALL-E 3","best":"Quick iterations, text in images, conceptual mockups. Excellent prompt adherence.","note":"Available through ChatGPT Plus or API. Good for rapid exploration."},{"name":"Flux","best":"Open-source alternative, on-premise deployment, sensitive client work where data can''t leave our infrastructure.","note":"Self-hosted via ComfyUI. Requires GPU resources."}]'::jsonb,
 '[{"title":"Hero Image for Landing Page","context":"When you need a high-impact visual for a website hero section that matches a specific brand aesthetic.","template":"Professional photograph of [subject], [brand style] aesthetic, [color palette] tones, soft studio lighting, shallow depth of field, editorial quality, 8K resolution --ar 16:9 --v 6 --style raw"},{"title":"UI Mockup Background Texture","context":"When you need subtle background textures or abstract visuals for app interfaces.","template":"Abstract [geometric/organic] pattern, [color] gradient, minimal, clean, suitable as UI background, subtle texture, low contrast --ar 1:1 --v 6 --style raw --s 50"},{"title":"Icon Set Generation","context":"When you need a consistent set of custom icons that match a specific design language.","template":"Simple [style] icon of [object], flat design, single color [hex], centered, white background, consistent line weight, minimal detail --ar 1:1 --v 6 --no background texture shadow"}]'::jsonb,
 array[4,6,10]),

(2, '02', 'DEVELOPMENT', 'Code Generation & Assistance',
 'Using AI for writing, reviewing, refactoring, and debugging code. Includes prompt patterns for different languages and frameworks.',
 array['Claude','Cursor','GitHub Copilot'], 'active', '2026-02-22',
 array[
   'AI-assisted code generation has become a core part of how our development team operates. It''s not about replacing developers — it''s about removing the tedious parts of coding so you can focus on architecture, logic, and quality.',
   'At INOVA IT, we use Claude for complex code generation (full components, API integration, refactoring), Cursor as our AI-native IDE for inline editing and multi-file changes, and GitHub Copilot for rapid line-by-line completions during regular coding.',
   'The key insight: AI code generation is only as good as your ability to describe what you want. Specificity in prompts is everything — the same tool will produce trash or production-ready code depending on how you communicate with it.'
 ],
 array[
   'Start with Cursor — install it and open your current project. Try Cmd+K on a function and ask it to "add error handling and input validation." See how it proposes changes in context.',
   'For new components, use Claude directly. Describe the component''s purpose, props, state, and behavior. Include your tech stack (e.g., "React + TypeScript + Tailwind") and any patterns to follow.',
   'Learn to break large coding tasks into sequential prompts. Don''t ask for an entire feature at once. Ask for the data model first, then the API layer, then the UI, then the tests.',
   'Always review AI-generated code before committing. Check for: hardcoded values, missing edge cases, unnecessary complexity, and whether it follows your project''s conventions.',
   'Set up GitHub Copilot in your IDE for everyday coding. It''s best for autocompletion — let it suggest, but don''t rely on it for complex logic.'
 ],
 array[
   'The #1 mistake is accepting AI code without reading it. Always review — AI confidently generates plausible-looking code that can have subtle bugs.',
   'For TypeScript projects, always ask AI to include proper type definitions. Don''t accept `any` types in generated code.',
   'When debugging, paste the error message AND the relevant code. AI is much better at fixing bugs when it has both pieces of context.',
   'Use AI to write tests AFTER you''ve written the implementation. It''s surprisingly good at generating edge cases you hadn''t considered.',
   'For repetitive patterns (CRUD endpoints, form components, data transformations), create a single good example manually, then ask AI to generate the rest following the same pattern.'
 ],
 '[{"name":"Claude","best":"Full component generation, complex refactoring, code review, debugging deep issues. Best for tasks requiring reasoning across multiple files.","note":"Use Opus 4 for complex multi-file tasks, Sonnet 4 for quick single-file edits."},{"name":"Cursor","best":"Inline code editing, multi-file changes, codebase-aware completions. Works best when it has full project context.","note":"Set Claude as preferred model. Use Cmd+K for inline edits, Cmd+L for chat."},{"name":"GitHub Copilot","best":"Fast line completions, boilerplate code, writing tests from function signatures.","note":"Best for flow-state coding. Less precise than Claude for complex logic."}]'::jsonb,
 '[{"title":"React Component Generator","context":"When you need a complete, well-structured React component that follows your project patterns.","template":"Create a React component called [ComponentName] with the following specs:\n\nPurpose: [what it does]\nProps: [list props with types]\nState: [internal state if any]\nBehavior: [interactions, events]\nStyling: [CSS approach - modules/tailwind/styled]\nPatterns: [follow existing patterns from project]\n\nInclude TypeScript types, proper error boundaries, and loading states."},{"title":"Refactoring Prompt","context":"When you have working code that needs improvement without changing behavior.","template":"Refactor the following code to improve [readability/performance/maintainability].\n\nRequirements:\n- Do NOT change the external API or behavior\n- Maintain all existing functionality\n- Add inline comments explaining non-obvious logic\n- Extract repeated patterns into reusable functions\n\n[paste code]"}]'::jsonb,
 array[4,5,6]),

(3, '03', 'CONTENT', 'AI Writing & Content',
 'Drafting, editing, and structuring written content. Covers technical documentation, client communication, and internal reports.',
 array['Claude','ChatGPT'], 'active', '2026-02-18',
 array[
   'AI writing tools have become essential for our content production workflows. Whether you''re drafting a client proposal, writing technical documentation, or creating internal reports, AI can significantly speed up the process while maintaining quality.',
   'The key is knowing when to use AI as a first-draft generator versus as an editor. For structured content (reports, docs, proposals), start with AI. For creative or highly personal content, use AI to refine rather than originate.',
   'Claude excels at long-form structured content and maintaining consistent tone across sections. ChatGPT is strong for quick drafts and brainstorming. Use both based on the task.'
 ],
 array[
   'Start by giving Claude your content brief — the audience, purpose, tone, and key points to cover. The more context you provide, the better the first draft.',
   'Use AI for the hardest part: getting started. Ask it to generate an outline first, approve it, then generate each section separately for better control.',
   'After generating, always edit for accuracy. AI will write confidently even about things it''s uncertain about. Your domain expertise is required for the final pass.',
   'For recurring content types (weekly reports, status updates, meeting summaries), build a template prompt and save it. Consistency across your team starts with consistent inputs.',
   'Use AI to adapt content for different audiences. Write once for a technical audience, then ask AI to rewrite for an executive summary or client-facing version.'
 ],
 array[
   'Never ship AI-generated content without reading every word. AI confidently hallucinates facts, names, and statistics.',
   'Give AI examples of your best writing. "Write in a tone similar to this example:" dramatically improves output quality.',
   'For technical documentation, always verify code examples and version numbers. AI''s knowledge has a cutoff date.',
   'AI is great at fixing passive voice, improving clarity, and catching redundancy — use it as a final editing pass even for content you wrote yourself.',
   'For client-facing content, have a human always do final review. The nuance of client relationships is beyond current AI capability.'
 ],
 '[{"name":"Claude","best":"Long-form content, technical documentation, structured reports. Best for maintaining consistency across long documents.","note":"Claude Opus 4 for complex, nuanced writing. Sonnet 4 for quick drafts."},{"name":"ChatGPT","best":"Quick brainstorming, email drafts, short-form content. Good for iterating on tone and style.","note":"GPT-4o for speed and everyday tasks. Strong at creative reformatting."}]'::jsonb,
 '[{"title":"Content Brief to Draft","context":"When you need to generate a first draft from a content brief or outline.","template":"Write a [content type] about [topic] for [audience].\n\nTone: [professional/conversational/technical]\nLength: approximately [word count]\nKey points to cover:\n1. [point 1]\n2. [point 2]\n3. [point 3]\n\nAvoid: [things to not include]\nInclude: [specific requirements]"},{"title":"Edit for Clarity","context":"When you have a draft that needs to be cleaner and more readable.","template":"Edit the following text for clarity and conciseness. Preserve all key information but:\n- Remove redundant phrases\n- Fix passive voice where possible\n- Improve paragraph transitions\n- Ensure consistent tone throughout\n\nTarget reading level: [general/technical/executive]\n\n[paste text]"}]'::jsonb,
 array[4,8,9]),

(4, '04', 'CORE SKILL', 'Prompt Engineering',
 'Designing effective prompts for consistent, high-quality AI outputs. Covers structure, context-setting, iteration, and evaluation.',
 array['Claude','ChatGPT'], 'active', '2026-02-10',
 array[
   'Prompt engineering is the foundational skill that multiplies your effectiveness with every other AI tool in this playbook. Better prompts mean better outputs — consistently. It''s not magic; it''s a learnable craft.',
   'The difference between a mediocre and exceptional AI output is usually in how the task was framed. Vague instructions produce vague results. Specific, structured prompts with clear context and constraints produce precise, useful outputs.',
   'This skill covers the patterns we''ve found most effective across code generation, writing, analysis, and creative work — distilled from thousands of real-world prompting sessions at INOVA IT.'
 ],
 array[
   'Learn the four components of a strong prompt: Role + Context + Task + Constraints. "You are a senior React developer. I''m building a dashboard. Create a reusable chart component. Use TypeScript, no external chart libraries."',
   'Practice iterative prompting: start with a first draft, evaluate what''s wrong or missing, then refine. The first prompt is rarely the final prompt.',
   'Use few-shot prompting for format control: show 1-2 examples of what you want, then ask for more. AI is very good at pattern matching.',
   'Learn when to use system prompts vs user messages. System prompts set persistent context; user messages are for specific tasks.',
   'Build a personal prompt library. When you write a great prompt, save it. Reusable prompts are a professional multiplier.'
 ],
 array[
   'Be specific about what you want and what you don''t want. "Don''t use markdown formatting" is as important as "write in bullet points".',
   'Longer prompts are usually better. Context that feels redundant to you is valuable to the model.',
   'When outputs are poor, diagnose why: wrong role? Missing context? Unclear task? Too many constraints? Fix one thing at a time.',
   'Chain of thought prompting ("think step by step") dramatically improves reasoning quality for complex tasks.',
   'Test your prompts with multiple inputs before declaring them "done." A prompt that works once might fail on edge cases.'
 ],
 '[{"name":"Claude","best":"Complex, multi-part prompts. Excellent at following detailed instructions and nuanced constraints.","note":"Supports very long context. Use Projects for persistent prompt templates."},{"name":"ChatGPT","best":"Quick experimentation, creative variations, system prompt testing.","note":"Strong at format manipulation. Useful for rapidly testing prompt variations."}]'::jsonb,
 '[{"title":"Role + Context Prompt","context":"The foundational pattern for any complex task. Sets the model up for success with clear role and context.","template":"You are a [role] with expertise in [domain].\n\nContext: [relevant background, constraints, tech stack, etc.]\n\nTask: [specific thing you want done]\n\nRequirements:\n- [requirement 1]\n- [requirement 2]\n- [requirement 3]\n\nFormat: [how you want the output structured]"},{"title":"Few-Shot Format Control","context":"When you need output in a very specific format and examples communicate it better than description.","template":"I need you to [task]. Use exactly the format shown in these examples:\n\nExample 1:\nInput: [example input]\nOutput: [example output]\n\nExample 2:\nInput: [example input]\nOutput: [example output]\n\nNow do the same for:\nInput: [your actual input]"}]'::jsonb,
 array[2,3,5]),

(5, '05', 'DEVELOPMENT', 'AI-Assisted Code Review',
 'Using AI to improve code review quality and speed. Covers automated checks, review prompts, and integrating AI into PR workflows.',
 array['Claude','CodeRabbit','GitHub Copilot'], 'active', '2026-01-28',
 array[
   'Code review is one of the highest-leverage activities in software development — it''s where knowledge transfers, bugs get caught, and code quality is maintained. AI can make every code review faster and more thorough.',
   'We use a two-layer approach: CodeRabbit runs automatically on every PR for pattern detection and consistency checks, while Claude is used for deeper analysis of complex changes, architecture decisions, and security implications.',
   'The goal isn''t to replace human reviewers — it''s to eliminate the low-value parts of code review (formatting, obvious bugs, missing error handling) so humans can focus on logic, architecture, and business correctness.'
 ],
 array[
   'Install CodeRabbit on your GitHub organization. Configure it with your project''s style guide and conventions. Let it run on a few PRs to calibrate.',
   'For complex changes, paste the diff into Claude with context: "Review this code change. Focus on: correctness, edge cases, security implications, and maintainability."',
   'Create a code review checklist prompt that matches your team''s standards. Run it on your own code before requesting review — catch your own issues first.',
   'Use AI to generate review comments in a constructive tone. "Rewrite this as a helpful code review comment" turns blunt feedback into collaborative suggestions.',
   'For security-sensitive code (auth, payments, data handling), use Claude to specifically look for OWASP vulnerabilities. It''s surprisingly effective at pattern-matching known issues.'
 ],
 array[
   'AI code review is a supplement, not a replacement. Always have a human review security-critical code.',
   'CodeRabbit false positives are common — configure .coderabbit.yaml to tune it for your project''s patterns and reduce noise.',
   'When AI flags an issue, don''t just accept it. Understand why it''s flagged before fixing. Sometimes AI is wrong.',
   'For large PRs, break the review into layers: first structural/architectural, then logic, then style. Ask AI to review each layer separately.',
   'Build an escalation path: CodeRabbit auto-review → AI deep review → human review → senior review for critical changes.'
 ],
 '[{"name":"Claude","best":"Deep code analysis, security review, architecture feedback, complex refactoring suggestions.","note":"Best for nuanced review of business logic and multi-file changes."},{"name":"CodeRabbit","best":"Automated PR review, pattern detection, consistency checks, review summaries.","note":"Runs automatically on every PR. Configure via .coderabbit.yaml in repo root."},{"name":"GitHub Copilot","best":"Inline suggestions during writing, test generation, quick fixes.","note":"Less useful for review, more useful during initial development."}]'::jsonb,
 '[{"title":"Deep Code Review","context":"When you need a thorough AI review of a specific piece of code or a PR diff.","template":"Review the following code for:\n1. Correctness and edge cases\n2. Security vulnerabilities (especially input validation, auth)\n3. Performance issues\n4. Maintainability and readability\n5. Missing error handling\n\nFor each issue found, explain:\n- What the problem is\n- Why it matters\n- How to fix it\n\n```\n[paste code or diff]\n```"},{"title":"Self-Review Before PR","context":"Run this on your own code before requesting review to catch obvious issues.","template":"I''m about to submit this code for review. Help me find issues I might have missed:\n\n- Any bugs or logic errors?\n- Missing edge cases or error handling?\n- Security concerns?\n- Anything that violates common best practices for [language/framework]?\n\nBe specific and actionable. If everything looks good, say so.\n\n```\n[paste your code]\n```"}]'::jsonb,
 array[2,4,6]),

(6, '06', 'WORKFLOW', 'Design-to-Code Workflow',
 'AI-assisted translation of Figma designs into production-ready components. Covers component generation, token extraction, and validation.',
 array['Claude','Cursor','Figma'], 'active', '2026-01-28',
 array[
   'The gap between design and code has always been a major friction point in product development. Designers create in Figma, developers interpret in code — and something always gets lost in translation. AI is closing this gap.',
   'Our workflow uses Claude to analyze Figma exports and generate React components that closely match the design spec. Combined with Cursor for codebase-aware editing, we''ve reduced implementation time for standard components by 40-60%.',
   'This isn''t about generating perfect code from a screenshot — it''s about using AI to handle the scaffolding and boilerplate so developers can focus on interaction logic, accessibility, and integration with the data layer.'
 ],
 array[
   'Start with a well-structured Figma file: use auto-layout everywhere, name all layers semantically, and extract design tokens (colors, typography, spacing) as variables.',
   'Export your Figma component as an image or use the Dev Mode JSON export. Paste it into Claude with your tech stack context.',
   'Ask Claude to generate the component structure first (no styling), review it, then ask for the CSS. Two passes produce better results than asking for everything at once.',
   'For your design system components, build a prompt template that includes your component library conventions, naming patterns, and TypeScript interface style.',
   'Validate AI-generated code against the original Figma design using a side-by-side comparison. Pixel-perfect isn''t the goal — structural fidelity is.'
 ],
 array[
   'AI-generated components need accessibility review. Always add ARIA attributes, focus management, and keyboard navigation — AI often skips these.',
   'Use Figma''s "Inspect" panel values (not just visual) when writing prompts. Exact spacing values produce better code than "make it look like this image".',
   'For complex interactive components, generate the static HTML/CSS first, then ask separately for the React state and event handling.',
   'Always check AI-generated CSS for magic numbers (unexplained pixel values). These are usually wrong or fragile.',
   'Build a project-specific prompt template that includes your CSS variables, component file structure, and TypeScript patterns. Reuse it for every new component.'
 ],
 '[{"name":"Claude","best":"Analyzing Figma exports, generating component code, extracting design tokens from screenshots.","note":"Multimodal — can analyze design images directly. Best for structured component generation."},{"name":"Cursor","best":"Inline component editing, matching existing codebase patterns, multi-file component generation.","note":"Codebase-aware. Set it to reference your existing components when generating new ones."},{"name":"Figma","best":"Source of truth for designs. Dev Mode for exact values, Variables for design tokens.","note":"Enable Dev Mode for access to exact measurements, colors, and CSS export."}]'::jsonb,
 '[{"title":"Component from Figma","context":"When you have a Figma design and need to generate a React component.","template":"I need to build a React component from this Figma design.\n\nTech stack: [React version, TypeScript?, CSS approach]\nDesign tokens available: [list your CSS variables or Tailwind classes]\nExisting patterns to follow: [link or describe your component conventions]\n\nGenerate:\n1. TypeScript interface for props\n2. Component structure (no styles yet)\n3. Then separately: the CSS/styles\n\n[attach Figma export or describe the design]"},{"title":"Design Token Extraction","context":"When you need to extract design tokens from a Figma file for use in code.","template":"Extract design tokens from this Figma design. Output as CSS custom properties in the format:\n\n:root {\n  --color-[name]: [value];\n  --spacing-[name]: [value];\n  --font-[name]: [value];\n}\n\nOrganize by: Colors, Typography, Spacing, Shadows, Border Radius.\n\n[paste Figma variables or screenshot of style panel]"}]'::jsonb,
 array[1,2,4]),

(7, '07', 'QA', 'AI Test Generation',
 'Using AI to write, expand, and maintain automated test suites. Covers unit tests, integration tests, and E2E test generation with Playwright.',
 array['Claude','Playwright','GitHub Copilot'], 'active', '2026-01-14',
 array[
   'Writing tests is one of the most tedious parts of software development — and one of the highest-value. AI has made it dramatically faster to achieve meaningful test coverage without sacrificing quality.',
   'Our approach: use Claude to generate comprehensive test cases from function signatures and requirements, GitHub Copilot for quick inline test completion, and Playwright for E2E tests generated from user flow descriptions.',
   'The goal isn''t 100% coverage for its own sake — it''s to test the behaviors that matter. AI helps you think through edge cases you''d miss and write the boilerplate you''d skip.'
 ],
 array[
   'Start with unit tests for your most critical business logic. Paste the function signature and docstring into Claude with: "Write comprehensive tests covering happy path, edge cases, and error conditions."',
   'For E2E tests, write a user flow description in plain English first, then ask Claude to generate Playwright tests from it. User-story-first produces more readable tests.',
   'Use GitHub Copilot for test completion — it''s excellent at filling in test assertions once you''ve started the test structure.',
   'Ask AI to generate test data (fixtures, mocks) separately from test logic. Better organized, easier to maintain.',
   'Review AI-generated tests critically. Check that they actually test the right thing — AI sometimes writes tests that pass trivially without verifying behavior.'
 ],
 array[
   'AI-generated tests can have false confidence — they compile and run but don''t actually verify the right behavior. Always read the assertions.',
   'For Playwright E2E tests, use data-testid attributes in your components. AI-generated selectors often rely on text content which breaks on copy changes.',
   'Generate tests before refactoring. This gives you a safety net and also tells AI exactly what behavior to preserve.',
   'Ask AI to generate both positive (should work) and negative (should fail/validate) test cases. The negative cases are often the more valuable ones.',
   'Use AI to maintain tests when requirements change. "Update these tests to reflect the new validation rules: [new rules]" is much faster than manual updates.'
 ],
 '[{"name":"Claude","best":"Comprehensive test generation, edge case identification, test strategy design.","note":"Best for generating full test suites from requirements. Use structured prompts for consistent output."},{"name":"Playwright","best":"E2E browser automation, visual regression testing, cross-browser testing.","note":"Generate from user flow descriptions. Use Page Object Model pattern for maintainability."},{"name":"GitHub Copilot","best":"Quick test completion, assertion generation, mock and fixture creation.","note":"Best for completing test structure you''ve started. Less reliable for full test generation."}]'::jsonb,
 '[{"title":"Unit Test Generation","context":"When you need comprehensive unit tests for a function or module.","template":"Write unit tests for the following function using [testing framework - Jest/Vitest/etc.].\n\nCover:\n1. Happy path with typical inputs\n2. Edge cases (empty, null, boundary values)\n3. Error conditions (invalid inputs, thrown errors)\n4. Any async behavior\n\nUse descriptive test names that explain what the test verifies.\n\n```\n[paste function code]\n```"},{"title":"Playwright E2E from User Flow","context":"When you need to generate E2E tests from a user story or flow description.","template":"Generate Playwright tests for the following user flow:\n\n[describe the user flow in plain English, e.g. ''User logs in, navigates to dashboard, creates a new project, fills in the form, submits, and sees the project in their project list'']\n\nRequirements:\n- Use data-testid attributes for selectors\n- Include assertions for each step\n- Handle async operations with proper awaiting\n- Add error state testing where relevant\n- Follow Page Object Model pattern"}]'::jsonb,
 array[2,5,4]),

(8, '08', 'PM', 'AI for Project Management',
 'Using AI to improve project documentation, sprint planning, status reporting, and stakeholder communication.',
 array['Claude','ChatGPT'], 'active', '2026-01-07',
 array[
   'Project management generates enormous amounts of structured, repetitive documentation — status reports, meeting summaries, risk registers, sprint retrospectives. AI can handle much of this production, freeing PMs to focus on the actual work of coordination and decision-making.',
   'The highest-value applications are: meeting transcript summarization, status report generation, risk identification from project context, and stakeholder communication drafting. Each of these is a well-defined task that AI handles well.',
   'At INOVA IT, PMs are required to use AI for first drafts of all standard project documentation. The time saved on production is reinvested in stakeholder relationships and strategic thinking.'
 ],
 array[
   'Start with meeting summaries. After every significant meeting, paste the transcript or notes into Claude and ask for: key decisions, action items (with owners), open questions, and next steps.',
   'Build templates for your recurring reports (weekly status, sprint review, executive summary). Once you have a good template, generating consistent reports takes minutes.',
   'Use AI for risk identification: paste your project plan or sprint backlog and ask "what risks or blockers do you see in this plan that I might not have considered?"',
   'For stakeholder communication, draft your message, then ask AI to adapt it for different audiences: technical team vs. executive sponsor vs. external client.',
   'Use AI to generate retrospective questions tailored to your specific project situation. Generic retro questions get generic answers — specific ones unlock real insight.'
 ],
 array[
   'AI project summaries need human judgment for context. AI doesn''t know what''s politically sensitive or what the sponsor actually cares about.',
   'Always verify dates, names, and action item owners in AI-generated outputs. AI is good at structure but careless with specifics.',
   'For sensitive stakeholder communication, use AI for drafting, not final send. The tone and nuance of important messages needs human judgment.',
   'Build a project context document that you paste at the start of every AI session. Background on the project, team, client, and current challenges dramatically improves output quality.',
   'Use AI to prepare for difficult conversations: "I need to deliver this news to the client. Help me think through how to frame it and what questions they''ll ask."'
 ],
 '[{"name":"Claude","best":"Long-form documentation, complex analysis, meeting summary with action items, risk identification.","note":"Best for structured, multi-section outputs. Use Projects to maintain project context."},{"name":"ChatGPT","best":"Quick status updates, email drafts, stakeholder message adaptation.","note":"Good for shorter, iterative outputs. Strong at tone adjustment for different audiences."}]'::jsonb,
 '[{"title":"Meeting Summary","context":"When you need to turn meeting notes or a transcript into a structured summary.","template":"Summarize the following meeting notes into a structured format:\n\n## Key Decisions\n[bullet points]\n\n## Action Items\n[owner | action | due date]\n\n## Open Questions\n[items needing resolution]\n\n## Next Steps\n[immediate next actions]\n\nBe concise. Use names for owners, not ''the team''.\n\n[paste meeting notes or transcript]"},{"title":"Status Report","context":"When you need to generate a weekly or sprint status report from raw notes.","template":"Generate a project status report from the following notes.\n\nProject: [name]\nPeriod: [date range]\nAudience: [internal team / executive / client]\n\nFormat:\n- Overall RAG status (Red/Amber/Green) with one-line reason\n- Completed this period\n- In progress / planned for next period\n- Risks and blockers\n- Decisions needed from stakeholders\n\nNotes:\n[paste your raw notes]"}]'::jsonb,
 array[3,9,4]),

(9, '09', 'PRODUCTIVITY', 'AI-Powered Research',
 'Using AI to accelerate research, competitive analysis, and knowledge synthesis. Covers web search integration, source evaluation, and output structuring.',
 array['Claude','ChatGPT'], 'active', '2026-01-05',
 array[
   'Research tasks that used to take days can now take hours. AI doesn''t replace research — it accelerates the synthesis and structuring of information you gather, and helps you identify what to look for next.',
   'The key distinction: use AI to synthesize and structure, not to generate facts. AI''s training data has a cutoff date and it can hallucinate specifics. Your role is still to gather primary sources; AI''s role is to help you make sense of them faster.',
   'Most valuable research use cases: competitive landscape synthesis, technology evaluation, summarizing long documents, identifying knowledge gaps, and structuring findings into presentations or reports.'
 ],
 array[
   'Start with source gathering using real search tools. Collect 5-10 credible sources on your topic. Don''t ask AI to research facts for you — ask it to help you synthesize facts you''ve gathered.',
   'Paste source content into Claude with context: "I''m researching [topic] for [purpose]. Here are excerpts from several sources. Synthesize the key findings and identify where sources agree or disagree."',
   'Use AI to identify gaps: "Based on what I''ve told you about this topic, what important aspects haven''t I covered yet? What should I look for next?"',
   'For competitive analysis, build a structured comparison framework with AI first. Then fill in the actual data yourself from primary sources. AI formats; you verify.',
   'Use AI to adapt your research findings for different audiences: technical memo, executive briefing, client presentation. Same research, different frames.'
 ],
 array[
   'Never cite AI outputs as sources. AI synthesizes patterns from training data — it cannot tell you what a specific company did last quarter.',
   'Ask AI to flag its own uncertainty: "In your synthesis above, where are you less confident? What should I verify from primary sources?"',
   'Use AI for second-opinion analysis: after forming your own view, ask AI to steelman the opposing position. This surfaces blind spots.',
   'Claude''s large context window makes it excellent for "read and synthesize" tasks — you can paste entire PDFs or research papers.',
   'For market/competitive research, use AI to structure the analysis framework first. What dimensions matter? What questions need answering? Then do the actual research with that framework.'
 ],
 '[{"name":"Claude","best":"Synthesis of long documents, competitive analysis structuring, knowledge gap identification.","note":"Large context window (200k tokens) ideal for processing multiple documents simultaneously."},{"name":"ChatGPT","best":"Quick synthesis tasks, brainstorming research directions, reformatting findings.","note":"Web search integration (with Browse) useful for recent information. Verify all specific claims."}]'::jsonb,
 '[{"title":"Source Synthesis","context":"When you have gathered multiple sources and need to synthesize them into a coherent summary.","template":"I''m researching [topic] for [purpose/audience].\n\nI''ve gathered the following information from [number] sources:\n\n[paste source excerpts, clearly labeled by source]\n\nPlease:\n1. Identify the key themes and findings across sources\n2. Note where sources agree and where they diverge\n3. Flag any claims I should verify from primary sources\n4. Identify 2-3 important aspects not covered in my sources\n\nDo not add facts not present in my sources."},{"title":"Competitive Analysis Framework","context":"When you need to structure a competitive analysis before doing the actual research.","template":"I need to analyze the competitive landscape for [product/service/market].\n\nMy company: [brief description]\nPurpose of analysis: [what decision this informs]\nAudience: [who will read this]\n\nGenerate:\n1. The key dimensions I should evaluate competitors on\n2. A comparison table structure (rows = competitors, columns = dimensions)\n3. The top 5 questions I need to answer\n4. Recommended primary sources to gather data from\n\nDo NOT fill in competitor data — I''ll research that myself."}]'::jsonb,
 array[3,8,4]),

(10, '10', 'ADVANCED', 'AI Agents & Automation',
 'Building and using AI agents for multi-step automation. Covers Claude API usage, simple agents, and workflow automation.',
 array['Claude'], 'active', '2026-02-25',
 array[
   'AI agents represent the next evolution beyond prompting. Instead of asking AI to do one thing, you''re building systems where AI can plan, take actions, and complete multi-step tasks autonomously.',
   'At INOVA IT, we''re starting with simple agents: workflows that use Claude to make decisions about what to do next, then call external tools (APIs, databases, file systems) based on those decisions. The complexity grows from there.',
   'The foundation is the Claude API. Before building agents, understand how to call the API directly, structure conversations programmatically, and implement tool use (function calling).'
 ],
 array[
   'Start with the Claude API basics. Get an API key, make your first API call in Python or Node, understand the messages array structure.',
   'Learn tool use (function calling): define a function, tell Claude it has access to it, and watch it decide when to call it. This is the foundation of agent behavior.',
   'Build a simple one-step agent first: a script that takes a task description, uses Claude to generate a plan, then executes one action based on that plan.',
   'Add memory: store conversation history and intermediate results. Agents without memory repeat themselves and lose context.',
   'Graduate to multi-step workflows: a loop where Claude assesses progress after each step and decides whether to continue, retry, or escalate.'
 ],
 array[
   'Always add human checkpoints for consequential agent actions. An agent deleting files or sending emails should require human approval.',
   'Log everything agents do. When something goes wrong (and it will), you need to reconstruct what the agent was doing and why.',
   'Start simple: the smallest useful agent is better than a complex one that doesn''t work reliably. Reliability > Sophistication.',
   'Rate limiting is real — agents can make many API calls quickly. Implement exponential backoff and respect rate limits from the start.',
   'Test agents with production-like data but non-production systems first. Agent mistakes can have real consequences.'
 ],
 '[{"name":"Claude","best":"Planning, reasoning about complex tasks, function calling, multi-step decision making.","note":"Use claude-sonnet-4 for agent tasks — better instruction following than smaller models. Opus for complex planning."}]'::jsonb,
 '[{"title":"Simple Agent Loop","context":"The basic structure for a Claude agent that can use tools and loop until complete.","template":"I want to build a Claude agent that: [describe the task]\n\nThe agent should have access to these tools:\n- [tool 1]: [description]\n- [tool 2]: [description]\n\nFor each step, the agent should:\n1. Assess the current state\n2. Decide what action to take next\n3. Execute the action\n4. Evaluate the result\n5. Continue or stop based on success criteria\n\nSuccess criteria: [how do you know the task is complete?]\nStop conditions: [when should the agent give up?]\n\nGenerate the Python/Node implementation."}]'::jsonb,
 array[2,4,12]),

(11, '11', 'PRODUCTIVITY', 'Meeting Intelligence',
 'Using AI for meeting preparation, real-time assistance, and post-meeting processing. Covers note-taking, action extraction, and follow-up automation.',
 array['Claude','ChatGPT'], 'active', '2026-01-20',
 array[
   'Meetings are one of the biggest time sinks in professional work — but the problem isn''t the meetings themselves, it''s the lack of structured capture and follow-through. AI can fix both.',
   'There are three stages where AI adds value: before (preparation), during (assistance), and after (processing). Most people only use AI after meetings for summarization — the real leverage is in preparation.',
   'Our approach focuses on making every meeting more intentional: clear purpose, prepared participants, and reliable action capture. AI handles the mechanical parts so the human parts can be higher quality.'
 ],
 array[
   'Pre-meeting: paste the meeting agenda and attendee list into Claude. Ask for: key questions to ask, potential discussion points, decisions that need to be made, and pre-read materials to review.',
   'During meeting: keep a running notes document. Don''t try to capture everything — focus on decisions, action items, and unresolved questions. AI can fill in context later.',
   'Post-meeting: within 30 minutes, paste your raw notes into Claude for structured summary and action item extraction. While context is fresh, review and add anything missing.',
   'For recurring meetings (standup, sprint review, 1:1), build a prompt template that generates consistent output. The consistency makes it easy to track trends over time.',
   'Set up automated distribution: after reviewing, send the AI-generated summary to attendees. This closes the loop and signals to the team that meetings lead to action.'
 ],
 array[
   'AI meeting summaries capture what was said, not what was meant. The political subtext, the hesitation, the body language — that''s still on you to interpret.',
   'Send action items within 2 hours of the meeting. The longer you wait, the more context is lost and the less likely they are to be acted on.',
   'For external client meetings, always review AI summaries before sending. Client-facing communication requires your professional judgment on tone and content.',
   'Use Fireflies.ai for internal meetings (approved) — it transcribes automatically. Then use Claude to process the transcript for structured output.',
   'Build a personal action item tracker: paste action items from each meeting into a running document. Use AI weekly to surface overdue items and patterns.'
 ],
 '[{"name":"Claude","best":"Meeting preparation, agenda analysis, structured summary generation, action item extraction.","note":"Strong at processing long transcripts. Use Projects to maintain context across recurring meeting series."},{"name":"ChatGPT","best":"Quick agenda analysis, email follow-up drafting, meeting type templates.","note":"Good for shorter tasks and iterating on tone for follow-up communications."}]'::jsonb,
 '[{"title":"Pre-Meeting Prep","context":"When you need to prepare effectively for an upcoming meeting.","template":"Help me prepare for this meeting:\n\nMeeting type: [standup / review / client / interview / etc.]\nAttendees: [names and roles]\nAgenda: [paste or describe]\nMy role in this meeting: [facilitator / participant / presenter]\nDesired outcome: [what does success look like?]\n\nGive me:\n1. 3-5 key questions to ask or topics to address\n2. Decisions that need to be made\n3. Potential friction points to be aware of\n4. What I should have reviewed before the meeting"},{"title":"Post-Meeting Processing","context":"When you need to turn raw meeting notes into structured output.","template":"Process these meeting notes into structured output:\n\nMeeting: [title]\nDate: [date]\nAttendees: [list]\n\nRaw notes:\n[paste your notes]\n\nGenerate:\n1. Meeting summary (3-5 bullets)\n2. Decisions made (with context)\n3. Action items (Owner | Task | Due Date)\n4. Open questions / unresolved items\n5. Next meeting agenda suggestions\n\nBe specific about owners — use names, not ''the team''."}]'::jsonb,
 array[8,3,4]),

(12, '12', 'POLICY', 'AI Usage Policy & Governance',
 'INOVA IT''s approved AI tools, data handling rules, and governance framework. Required reading for all team members.',
 array['Claude'], 'active', '2026-02-10',
 array[
   'Using AI tools responsibly at INOVA IT means understanding not just how to use them, but when it''s appropriate to use them and with what data. This policy exists to protect our clients, our team, and our business.',
   'The core principle: client data is sacred. The default is to not use AI tools with client data unless the tool is explicitly approved for that data classification. When in doubt, don''t.',
   'This is a living document. As tools evolve and we conduct new security reviews, approvals change. Check this skill page before using a new tool with client data for the first time.'
 ],
 array[
   'Read the full policy document in the company wiki (linked in #ai-tools Slack channel) before using any AI tool with client data.',
   'When onboarding to a new project, check the client data classification. Highly confidential projects have additional restrictions.',
   'Use the Data Classification Matrix (in wiki) to determine which tools are approved for each data type. If the matrix doesn''t answer your question, ask the AI Operations team.',
   'When a client asks about our AI usage, refer to the standard client disclosure template in the wiki. Do not improvise this communication.',
   'If you discover a potential data handling violation (your own or a team member''s), report it immediately to your manager and the AI Operations team. Early disclosure is always better.'
 ],
 array[
   'Confidential client data means: client names, project details, financials, personal data, IP, source code, and anything marked confidential in the contract.',
   'The "free tier" rule: never use the free tier of any AI tool with work data. Free tiers typically use your data for training.',
   'Screenshots and images count as data. Don''t upload client UI mockups or screenshots to unapproved tools.',
   'If a client asks you to use a specific AI tool that''s not on our approved list, escalate to your manager before using it. Client requests don''t override our policy.',
   'Personal use of AI tools on work devices follows the same policy as professional use. The device classification applies.'
 ],
 '[{"name":"Claude","best":"Internal work, non-confidential client data, documentation. Enterprise agreement in place.","note":"Approved for confidential client data under our enterprise agreement with Anthropic. Confirm before each new client engagement."}]'::jsonb,
 '[{"title":"Data Classification Check","context":"When you''re unsure whether a specific piece of data can be used with a specific AI tool.","template":"Help me determine if I can use this data with this AI tool.\n\nData description: [what is the data? e.g., client name, project design mockup, source code]\nData source: [where does it come from?]\nClient/project: [name or type]\nAI tool I want to use: [tool name]\n\nBased on INOVA IT''s policy:\n- What data classification does this fall under?\n- Is [tool] approved for this classification?\n- What precautions should I take?\n- Who should I check with if uncertain?"}]'::jsonb,
 array[10,4,11]);

-- Reset the serial sequence after manual inserts
select setval('skills_id_seq', (select max(id) from skills));

-- Tools
insert into tools_data (id, name, provider, category, status, description, best_for, used_in_skills, tier) values
('claude',         'Claude',          'Anthropic',          'LLM',         'approved', 'Our primary AI model for code generation, analysis, writing, and complex reasoning tasks. Enterprise agreement in place.',           array['Code generation','Long-form analysis','Complex instructions','Technical writing'], array[1,2,3,4,5,6,7,8,9], 'PRIMARY'),
('cursor',         'Cursor',          'Anysphere',           'IDE',         'approved', 'AI-powered IDE built on VS Code. Multi-file editing, codebase-aware completions, and native Claude integration.',                   array['Code editing','Multi-file refactoring','Codebase navigation','Inline completions'],   array[2,6],               'PRIMARY'),
('midjourney',     'Midjourney',      'Midjourney Inc.',     'IMAGE GEN',   'approved', 'High-fidelity image generation via Discord. Best-in-class for photorealism, artistic control, and brand visuals.',                   array['Brand imagery','Photorealism','Mood boards','Creative exploration'],                      array[1],                 'PRIMARY'),
('chatgpt',        'ChatGPT',         'OpenAI',              'LLM',         'approved', 'General-purpose AI assistant. GPT-4o for speed, GPT-4.5 for depth. Includes DALL-E image generation.',                              array['Quick brainstorming','General tasks','Image generation','Multi-modal work'],               array[3,9],               'SECONDARY'),
('github-copilot', 'GitHub Copilot',  'GitHub / Microsoft',  'IDE',         'approved', 'AI pair-programming tool integrated into VS Code and JetBrains IDEs. Fast inline completions.',                                     array['Inline completions','Boilerplate code','Test generation','Quick suggestions'],             array[2],                 'SECONDARY'),
('dalle',          'DALL-E 3',        'OpenAI',              'IMAGE GEN',   'approved', 'Text-to-image generation with excellent prompt adherence. Best for quick concepts and text in images.',                               array['Quick mockups','Text in images','Concept exploration','Rapid iteration'],                   array[1],                 'SECONDARY'),
('coderabbit',     'CodeRabbit',      'CodeRabbit',          'CODE REVIEW', 'approved', 'AI-powered code review bot for GitHub PRs. Automated pattern detection and consistency checks.',                                     array['PR reviews','Pattern detection','Code consistency','Review summaries'],                    array[5],                 'SECONDARY'),
('figma',          'Figma',           'Figma (Adobe)',        'DESIGN',      'approved', 'Primary design tool. Used with AI for design-to-code workflows, token extraction, and spec validation.',                             array['UI design','Design systems','Prototyping','Design tokens'],                                 array[1,6],               'PRIMARY'),
('playwright',     'Playwright',      'Microsoft',           'TESTING',     'approved', 'Browser automation framework. Used with AI for generating and running automated test suites.',                                       array['E2E testing','Visual regression','Test automation','Cross-browser testing'],               array[7],                 'SECONDARY'),
('flux',           'Flux',            'Black Forest Labs',   'IMAGE GEN',   'approved', 'Open-source image generation model. Self-hosted via ComfyUI for sensitive client work.',                                             array['On-premise deployment','Sensitive data','Custom pipelines','Cost optimization'],           array[1],                 'SPECIALIZED');

-- Updates
insert into updates (id, date, title, summary, tag, content, action_items, affected_skills) values
('update-1', '2026-03-02', 'Claude Opus 4.6 Released — What It Means for Us',
 'Anthropic released Claude Opus 4.6 with significant improvements to code generation accuracy and reasoning depth. Early testing shows 20-30% better performance on our standard code review benchmarks.',
 'Model update',
 array[
   'Anthropic has released Claude Opus 4.6, and after a week of internal testing, we can confidently say this is a meaningful upgrade for our workflows.',
   'The biggest improvement is in code generation accuracy. In our testing across 50 representative tasks, Opus 4.6 produced correct, production-ready code on the first attempt about 20-30% more often than Opus 4.',
   'Structured output capabilities are the other headline feature. You can now request specific JSON schemas, and the model will reliably conform to them.'
 ],
 array[
   'Update your Claude settings to use Opus 4.6 as the default model for complex tasks',
   'Review the updated prompt templates in Skill #04',
   'Sonnet 4 remains the recommended model for quick, everyday tasks',
   'If you''re using the API, update your model parameter to claude-opus-4.6'
 ],
 array[2,4,5,10]),

('update-2', '2026-02-18', 'Cursor 1.0 Stable — Worth Switching To',
 'Cursor has hit 1.0 stable after months in beta. The AI-powered IDE now supports multi-file editing, improved context awareness, and native Claude integration.',
 'New tool',
 array[
   'Cursor 1.0 is officially stable, and after two months of team-wide testing, we''re adding it to our recommended tools list.',
   'The key differentiator is context awareness. Cursor understands your entire codebase, not just the file you''re editing.',
   'Multi-file editing is the other killer feature. You can describe a change that spans multiple files, and Cursor will generate all the files in one operation.'
 ],
 array[
   'Download Cursor from cursor.com',
   'Your VS Code extensions and settings will transfer over automatically',
   'Set Claude as your preferred model in Cursor settings',
   'Check Skill #02 for Cursor-specific prompt patterns'
 ],
 array[2,6]),

('update-3', '2026-02-10', 'Internal Policy Update: Expanded Approved Tools List',
 'We''ve expanded the approved AI tools list. Cursor and Claude Projects are now approved for non-confidential client data. Fireflies.ai approved for internal meetings only.',
 'Policy change',
 array[
   'Following our quarterly security review, we''ve updated the approved AI tools list with more flexibility while maintaining data handling standards.',
   'Cursor is now approved for use with non-confidential client data after reviewing their data handling policies.',
   'Claude Projects is approved for internal use and non-confidential client work.',
   'Fireflies.ai is approved for internal meetings only — cannot be used in client meetings without written consent.'
 ],
 array[
   'Review the full updated policy in Skill #12',
   'Default to the more restrictive category when uncertain',
   'Never use unapproved tools for any client data',
   'Submit requests for new tool evaluations to AI Operations team'
 ],
 array[12]),

('update-4', '2026-01-28', 'New Skill Added: Design-to-Code Workflows',
 'We''ve documented our AI-assisted workflow for translating Figma designs into code. Covers component generation, design token extraction, and spec validation.',
 'New skill',
 array[
   'The design-to-code gap has always been a friction point. We''ve developed an AI-assisted workflow that reduces it significantly.',
   'The workflow uses Claude to analyze Figma exports and generate React components that closely match the design spec.',
   'We''ve also integrated design token extraction — automatically generating CSS custom properties from Figma styles.'
 ],
 array[
   'Read the full workflow guide in Skill #06',
   'Frontend developers should try it on their next component build',
   'Feedback welcome — this is still a v1 workflow',
   'Design team: ensure Figma files use auto-layout and design tokens for best compatibility'
 ],
 array[6,1,2]),

('update-5', '2026-01-15', 'Midjourney v7 — What''s Improved for Production Work',
 'Major improvements to photorealism, text rendering, and consistency across image sets. New --personalize flag for brand-specific aesthetic training.',
 'Model update',
 array[
   'Midjourney v7 is a significant update for our creative team, directly addressing our three biggest pain points with v6.',
   'Text rendering is dramatically better — consistently legible for short strings, useful for mockups and social media templates.',
   'The --personalize flag lets you build a preference profile to generate consistently on-brand imagery.'
 ],
 array[
   'Update your Midjourney subscription if needed — v7 is available on all paid plans',
   'Check the updated prompting guide in Skill #01',
   'Try --personalize: start by rating 200+ image pairs at midjourney.com/rank',
   'Always specify --v 7 explicitly in prompts to avoid version inconsistency'
 ],
 array[1]);
