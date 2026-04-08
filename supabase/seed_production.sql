-- ============================================
-- AI Atlas — Production Seed Data
-- Run in Supabase SQL editor
-- NOTE: Clear any conflicting rows first if needed:
--   DELETE FROM skills; DELETE FROM updates;
-- ============================================

-- ============================================
-- SKILLS (10 entries)
-- ============================================

insert into skills (id, chapter, category, title, brief, tools, status, last_updated, overview, getting_started, tips, detail_tools, prompts, related_skills) values

(1, '01', 'CREATIVE', 'AI Image Generation',
 'Generating, editing, and iterating on images for design work. Covers prompting techniques, style control, and integration with Figma workflows.',
 array['Midjourney','DALL-E 3','Flux'], 'active', '2026-03-10',
 array[
   'AI image generation has fundamentally changed how we approach visual content at INOVA IT. Instead of spending hours searching stock libraries or briefing illustrators, designers can now generate tailored visuals in minutes — iterating on concepts faster than ever before.',
   'This skill covers the three major tools we use in production: Midjourney for high-fidelity creative work and photorealistic renders, DALL-E 3 for quick conceptual exploration and text-integrated images, and Flux as an open-source option when client data policies require on-premise processing.',
   'Image generation is not just about typing prompts — it is about controlling style consistency across a project, knowing which tool fits which use case, and integrating AI-generated assets into Figma without breaking your design system.'
 ],
 array[
   'Start with Midjourney — join the workspace on Discord and run /imagine with a simple descriptive prompt. Get familiar with how it interprets natural language before adding technical parameters.',
   'Learn the core prompt anatomy: Subject + Style + Mood + Technical parameters. Example: "Modern office interior, Scandinavian design, warm natural lighting, architectural photography style --ar 16:9 --v 6".',
   'Explore --sref (style reference) and --cref (character reference) in Midjourney to maintain visual consistency across a series of images for the same project.',
   'For client work always generate 3–4 variations and present options. Use Midjourney variation and zoom features to refine the selected direction before upscaling.',
   'Export at maximum resolution and bring into Figma. Use "Upscale (Subtle)" for production-ready assets. Document your prompts in the project brief for future reference.'
 ],
 array[
   'Use --style raw for commercial work — it gives you more control and less of the default "Midjourney aesthetic" in the output.',
   'Negative prompts (--no) are essential. Always add --no text, watermark, blurry to avoid common AI artifacts in hero images.',
   'For consistent character design across multiple images, use --cref with a reference image. Game-changing for pitch decks and storyboards.',
   'DALL-E 3 handles text in images better than Midjourney — use it when you need placeholder text that looks readable in UI mockups.',
   'Never deliver AI-generated images directly to clients without post-processing. Bring them into Figma for color grading, cropping, and integration with the design system.',
   'Keep a prompt library in your project documentation. Future teammates (and you) will need it when generating more images in the same visual style.'
 ],
 '[{"name":"Midjourney","best":"High-quality creative imagery, brand visuals, photorealistic renders, mood boards.","note":"Accessed via Discord. v6.1+ recommended. Requires paid plan."},{"name":"DALL-E 3","best":"Quick iterations, text in images, conceptual mockups. Excellent prompt adherence.","note":"Available via ChatGPT Plus or API. Good for rapid exploration and prototyping."},{"name":"Flux","best":"Open-source alternative for on-premise deployment or when client data policies restrict cloud usage.","note":"Self-hosted via ComfyUI or fal.ai. Requires GPU for local use."}]'::jsonb,
 '[{"title":"Hero Image for Landing Page","context":"When you need a high-impact visual for a website hero section matching a specific brand aesthetic.","template":"Professional photograph of [subject], [brand style] aesthetic, [primary color] tones, soft studio lighting, shallow depth of field, editorial quality --ar 16:9 --v 6 --style raw"},{"title":"UI Mockup Background","context":"When you need subtle background textures or abstract visuals for app interfaces.","template":"Abstract [geometric/organic] pattern, [color] gradient, minimal, clean, suitable as UI background, subtle texture, low contrast --ar 1:1 --v 6 --style raw --s 50"},{"title":"Consistent Icon Set","context":"When you need a batch of custom icons that match a single design language.","template":"Simple flat icon of [object], single color [hex], white background, centered, consistent line weight, minimal detail, icon set style --ar 1:1 --v 6 --no background shadow gradient"}]'::jsonb,
 array[2,6,10]),

(2, '02', 'DEVELOPMENT', 'Code Generation & Assistance',
 'Using AI for writing, reviewing, refactoring, and debugging code. Includes prompt patterns for React, TypeScript, and API integration work.',
 array['Claude','Cursor','GitHub Copilot'], 'active', '2026-03-18',
 array[
   'AI-assisted coding has become a core part of how our development team works. It is not about replacing developers — it is about removing the tedious parts so you can focus on architecture, logic, and quality.',
   'At INOVA IT we use Claude for complex code generation (full components, API integration, refactoring), Cursor as our AI-native IDE for inline editing and multi-file changes, and GitHub Copilot for rapid line-by-line completions during regular coding flow.',
   'AI code generation is only as good as your ability to describe what you want. Specificity in prompts is everything — the same model will produce garbage or production-ready code depending entirely on how you communicate.'
 ],
 array[
   'Start with Cursor — install it, open your current project, and try Cmd+K on any function. Ask it to "add error handling and input validation." See how it proposes changes in full file context.',
   'For new components, use Claude directly. Describe the component purpose, props, state, and behavior. Include your stack (e.g. React + TypeScript + Tailwind) and any conventions to follow.',
   'Break large features into sequential prompts. Do not ask for an entire feature at once. Ask for the data model first, then the API layer, then the UI component, then the tests.',
   'Always review AI-generated code before committing. Check for: hardcoded values, missing edge cases, unnecessary complexity, and whether it follows your project conventions.',
   'Set up GitHub Copilot in your IDE for everyday coding. Use it for autocompletion — it is best at suggesting the next few lines, not designing systems.'
 ],
 array[
   'Never accept AI code without reading it. AI confidently generates plausible-looking code with subtle bugs. Your review is not optional.',
   'For TypeScript projects, always ask the AI to include proper type definitions. Reject any generated code with `any` types unless there is a genuine reason.',
   'When debugging, paste both the error message AND the relevant code. AI performs much better at fixing bugs when it has both pieces of context.',
   'Use AI to write tests after you have written the implementation. It is surprisingly good at identifying edge cases you had not considered.',
   'For repetitive patterns (CRUD endpoints, form components, data transforms), build one good example manually, then ask AI to generate the rest following the exact same pattern.'
 ],
 '[{"name":"Claude","best":"Full component generation, complex refactoring, code review, debugging deep logic issues.","note":"Use Opus 4 for complex multi-file tasks, Sonnet 4 for quick single-file edits."},{"name":"Cursor","best":"Inline code editing, multi-file changes, codebase-aware completions.","note":"Set Claude as preferred model. Use Cmd+K for inline edits, Cmd+L for chat with context."},{"name":"GitHub Copilot","best":"Fast line completions, boilerplate, writing tests from function signatures.","note":"Best for flow-state coding. Less precise than Claude for complex logic."}]'::jsonb,
 '[{"title":"React Component Generator","context":"When you need a complete, well-structured component that follows your project patterns.","template":"Create a React component called [ComponentName].\n\nPurpose: [what it does]\nProps: [list props with types]\nState: [internal state if needed]\nBehavior: [interactions, events, side effects]\nStyling: [CSS approach — modules/tailwind/CSS vars]\nPatterns: follow conventions from [reference file or describe pattern]\n\nInclude TypeScript types, loading and error states, and brief comments for non-obvious logic."},{"title":"Bug Fix Prompt","context":"When you have a failing function or component and an error message.","template":"I have a bug in the following code. Here is the error:\n[paste error message]\n\nHere is the relevant code:\n[paste code]\n\nPlease identify the root cause and provide a fix. Explain what was wrong in one sentence."},{"title":"Code Review","context":"When you want a second opinion on code you wrote or AI generated.","template":"Review the following code for: correctness, edge cases, performance issues, security concerns, and readability. Flag anything you would change and explain why.\n\n[paste code]"}]'::jsonb,
 array[5,7,9]),

(3, '03', 'CONTENT', 'AI Writing & Content',
 'Drafting, editing, and structuring written content — from technical documentation to client proposals and internal reports.',
 array['Claude','ChatGPT'], 'active', '2026-03-05',
 array[
   'AI writing tools are now essential for content production workflows at the agency. Whether you are drafting a client proposal, writing technical documentation, or producing internal reports, AI significantly reduces time spent without sacrificing quality — if you know how to prompt it well.',
   'The key distinction: use AI as a first-draft generator for structured content (reports, docs, proposals) and as an editor for creative or personal content. The mode of use changes the quality of output dramatically.',
   'Claude excels at long-form structured content and maintaining tone consistency across sections. ChatGPT is strong for quick brainstorming and variation generation. Use each based on the task and your familiarity.'
 ],
 array[
   'Always start with a brief to the AI — audience, purpose, tone, and key points. The more context you provide up front, the less editing the first draft needs.',
   'Generate the outline first, approve it, then generate each section separately. This gives you more control and catches direction problems early.',
   'After generating, always edit for factual accuracy. AI writes confidently even about things it is uncertain about — your domain expertise is required for the final pass.',
   'For recurring content types (weekly reports, status updates, meeting summaries), save a template prompt. Consistent inputs produce consistent outputs across your team.',
   'Use AI to adapt content for different audiences. Write once for a technical audience, then ask AI to produce an executive version and a client-facing version from the same source.'
 ],
 array[
   'Never ship AI-generated content without reading every sentence. AI confidently invents facts, names, and statistics.',
   'Provide examples of your best writing. "Write in a tone similar to this example:" dramatically improves output quality over generic style requests.',
   'For technical documentation, always verify code examples and version numbers. AI knowledge has a cutoff date and may reference outdated APIs.',
   'Instruct the AI to avoid filler phrases like "In conclusion", "It is worth noting", and "Furthermore" — they make AI writing obvious. Ask for direct, plain language.',
   'Use AI to suggest headlines and section titles after writing the body content. It is better at summarizing once it has context than at predicting structure upfront.'
 ],
 '[{"name":"Claude","best":"Long-form structured content, technical documentation, consistent tone across long documents.","note":"Opus 4 for nuanced writing tasks. Sonnet 4 for quick drafts and editing."},{"name":"ChatGPT","best":"Brainstorming, quick variation generation, casual content, social media copy.","note":"GPT-4o for quality output. Good complement to Claude for idea generation."}]'::jsonb,
 '[{"title":"Client Proposal Draft","context":"When you need to write a project proposal for a new client engagement.","template":"Write a professional project proposal for the following engagement:\n\nClient: [client name or type]\nProject: [what we are building]\nScope: [key deliverables]\nDuration: [timeline]\nTone: professional but approachable, not corporate\n\nInclude: executive summary, problem statement, proposed approach, deliverables list, and next steps. Keep each section concise — no padding."},{"title":"Technical Documentation","context":"When you need to document a feature, API, or internal system.","template":"Write technical documentation for [feature/system name].\n\nAudience: [developer/non-technical/mixed]\nWhat it does: [description]\nKey concepts to explain: [list]\nInclude: overview, how it works, usage examples, edge cases, and common mistakes to avoid.\n\nUse clear headings, short paragraphs, and code examples where relevant."}]'::jsonb,
 array[4,8,10]),

(4, '04', 'FOUNDATIONS', 'Prompt Engineering',
 'Writing effective prompts for any AI task. Covers structure, context setting, chain-of-thought, and iterative refinement techniques.',
 array['Claude','ChatGPT'], 'active', '2026-03-20',
 array[
   'Prompt engineering is the most transferable AI skill you can develop. Every AI tool — from image generators to code assistants to writing tools — responds dramatically better to well-structured input. It is the foundation that makes everything else in this playbook work.',
   'The core insight is that AI models are not search engines — they are context processors. The quality of output is almost entirely determined by the quality, clarity, and completeness of what you put in. Vague input produces vague output, every time.',
   'This skill covers the patterns we use daily at INOVA IT: role prompts, task decomposition, chain-of-thought, few-shot examples, and structured output requests. You do not need to learn all of them at once — even one or two techniques will immediately improve your results.'
 ],
 array[
   'Start by adding a role to your prompts. "You are a senior UX designer reviewing a client brief" gives the model a frame of reference that shapes every word of its response.',
   'Be specific about format. "Give me a bullet list of 5 items" produces a radically more useful response than "what do you think about X." Ambiguity is your enemy.',
   'When a single prompt is not working, break it down. Chain-of-thought: ask the model to think through the problem step by step before giving an answer. This dramatically improves reasoning quality.',
   'Use few-shot examples. Provide 2–3 examples of the format or style you want, then ask the model to continue in the same pattern. This is the fastest way to train a response format.',
   'Iterate out loud. If the first response is not right, do not start over — tell the model what is wrong and ask it to adjust. "This is too formal — rewrite it in a more direct, casual tone."'
 ],
 array[
   'The single biggest improvement: add context. Who is the audience? What is the goal? What should the output be used for? Context transforms mediocre output to good output.',
   'Specify constraints explicitly. "Under 200 words", "no bullet points", "avoid jargon" — constraints are not limitations, they are guidance that gets you closer to what you actually need.',
   'For complex tasks, ask the model to state its understanding before answering. "Before you begin, summarize what I am asking you to do." Catches misinterpretations before you waste tokens.',
   'Save prompts that work. Keep a personal prompt library in your notes. Reusable prompt patterns compound over time into significant productivity gains.',
   'Different models need different approaches. Claude prefers clear, direct instructions with context. ChatGPT responds well to persona and conversational framing. Adapt your style to the model.'
 ],
 '[{"name":"Claude","best":"Complex reasoning tasks, structured outputs, long-context analysis, chain-of-thought.","note":"Responds well to clear role + task + format instructions. Prefers direct language over conversational prompts."},{"name":"ChatGPT","best":"Creative brainstorming, persona-based prompting, quick iterations, casual tasks.","note":"GPT-4o. Responds well to conversational framing. Good for exploring ideas before committing to a direction."}]'::jsonb,
 '[{"title":"Role + Task + Format Prompt","context":"A reliable base structure for almost any AI task.","template":"You are [role — e.g. a senior copywriter specializing in B2B SaaS].\n\nTask: [describe the specific task clearly]\n\nContext: [relevant background the model needs]\n\nOutput format: [describe exactly what you want — bullet list, paragraph, table, JSON, etc.]\n\nConstraints: [word limit, tone, what to avoid]"},{"title":"Iterative Refinement","context":"When the first response is close but not right.","template":"This is good but needs adjustment. Specifically:\n- [What to change #1]\n- [What to change #2]\n- Keep: [what to preserve]\n\nPlease revise with these changes only. Do not rewrite sections that were already correct."},{"title":"Chain of Thought","context":"When you need the model to reason carefully before answering.","template":"Before answering, think through this step by step:\n1. What is the core question or problem?\n2. What relevant information do I have?\n3. What are the key considerations or trade-offs?\n4. What is the most reasonable conclusion?\n\nThen give your final answer.\n\nQuestion: [your question]"}]'::jsonb,
 array[1,2,3,5,6,7,8,9,10]),

(5, '05', 'DEVELOPMENT', 'QA & Testing with AI',
 'Using AI to write test cases, find edge cases, automate regression checks, and speed up QA workflows for web and mobile projects.',
 array['Claude','Cursor','Playwright'], 'active', '2026-03-15',
 array[
   'QA has historically been the bottleneck in agency project delivery. AI is changing that — not by removing the need for quality checks, but by dramatically reducing the manual effort required to write comprehensive tests and identify edge cases.',
   'At INOVA IT we use AI in two main QA contexts: test generation (writing unit, integration, and E2E tests from existing code) and exploratory QA assistance (having AI analyze features for potential failure modes before testing begins).',
   'The most underused application: pasting a feature spec or PR description into Claude and asking "what could go wrong here?" AI is remarkably good at identifying edge cases, race conditions, and user scenarios that human testers overlook under time pressure.'
 ],
 array[
   'Start with test generation for existing components. Paste a component or function into Claude and ask it to write unit tests covering normal cases, edge cases, and error states.',
   'For E2E testing, describe the user flow in plain language and ask Claude to generate Playwright or Cypress test code. Review and adjust — it gets the structure right even if IDs need updating.',
   'Before a QA sprint, paste the feature specification into Claude and ask: "List every edge case and failure mode you can identify in this feature." Use the output as your test planning document.',
   'Use AI to generate test data. Realistic mock data for forms, databases, and API responses is tedious to write manually and AI handles it well.',
   'For regression testing, ask Claude to compare two versions of a component or API response and identify behavioral differences that should be verified.'
 ],
 array[
   'AI-generated tests are a starting point, not finished tests. Always review generated assertions — they can test the wrong thing with perfect syntax.',
   'Provide real code context when generating tests. "Here is the component, here is how it fetches data, now write tests" produces far better output than just the function signature.',
   'Ask AI to generate tests that SHOULD fail as well as pass. Negative test cases are often more valuable than happy-path tests.',
   'Use AI to review your existing test suite for gaps. "Here are my current tests — what important cases am I not covering?" is a powerful quality check.',
   'For accessibility testing, ask Claude to audit your component markup for ARIA issues, keyboard navigation gaps, and screen reader incompatibilities.'
 ],
 '[{"name":"Claude","best":"Test case generation, edge case analysis, reviewing test coverage, accessibility audits.","note":"Paste real code for best results. Ask for tests by framework name (Jest, Vitest, Playwright)."},{"name":"Cursor","best":"Inline test generation in context, running tests and fixing failures in a loop.","note":"Use Cmd+K to generate tests for the function currently in focus. Strong for unit tests."},{"name":"Playwright","best":"AI-assisted E2E test writing for web applications.","note":"Claude can generate Playwright scripts from plain-language user flow descriptions. Verify selectors manually."}]'::jsonb,
 '[{"title":"Unit Test Generator","context":"When you need comprehensive tests for a specific function or component.","template":"Write unit tests for the following [function/component] using [Jest/Vitest/Playwright].\n\nCover:\n- Normal use cases (happy path)\n- Edge cases (empty input, null values, boundary conditions)\n- Error states (invalid input, failed API calls)\n- Any side effects that should be verified\n\n[paste code here]"},{"title":"Edge Case Analysis","context":"Before testing begins — use this to build your test plan.","template":"I am about to test the following feature. Identify every edge case, potential failure mode, and unusual user scenario you can think of.\n\nFeature description:\n[describe the feature]\n\nOutput as a checklist grouped by: input validation, state management, async behavior, UI edge cases, and error handling."}]'::jsonb,
 array[2,4,9]),

(6, '06', 'CREATIVE', 'AI-Assisted Design & Figma',
 'Integrating AI into design workflows — from ideation and layout generation to component documentation and handoff preparation.',
 array['Claude','Midjourney','Figma AI'], 'active', '2026-03-22',
 array[
   'AI is reshaping the design process at every stage — from early ideation to final handoff. The designers at INOVA IT who are moving fastest are not using AI to replace their design decisions, they are using it to collapse the time between idea and tangible output.',
   'The highest-impact use cases we have found: using Claude to generate detailed design briefs from a rough client description, using Midjourney to produce mood boards and visual references in minutes rather than hours, and using AI to write component documentation and design system annotations automatically.',
   'Figma is adding AI features rapidly. The current best use is AI-assisted layout suggestions and design token generation. The workflow is still evolving — treat it as a complement to your process, not a replacement for design thinking.'
 ],
 array[
   'Use Claude to translate vague client requirements into a structured design brief before opening Figma. Ask it to generate: target audience, visual tone, color direction, reference styles, and accessibility requirements.',
   'Generate mood boards with Midjourney before committing to a visual direction. Create 3–4 distinct style explorations and present them to stakeholders. This moves alignment conversations earlier in the process.',
   'For component documentation, paste your Figma component structure into Claude and ask it to generate usage guidelines, prop descriptions, and do/do not examples. Automates the tedious documentation work.',
   'Use AI to generate placeholder content for designs. Realistic names, addresses, copy, and data make presentations and client reviews significantly more compelling than lorem ipsum.',
   'When stuck on a layout, describe the content and hierarchy to Claude and ask for 3 different layout approaches. Use its suggestions as inspiration, not prescriptions.'
 ],
 array[
   'Do not show clients AI-generated mood boards without disclosing they are AI-generated. Use them as internal alignment tools, then execute with real assets.',
   'AI layout suggestions work best when you give strong constraints — screen size, content hierarchy, and existing design system components.',
   'For icon generation, Midjourney produces better consistency than DALL-E 3 for icon sets — use --style raw and a fixed color palette.',
   'Claude can write remarkably good UX copy for UI elements (empty states, error messages, tooltips, onboarding). This is one of the fastest wins in a design workflow.',
   'Keep AI-generated design assets organized in a separate Figma page labeled "AI Exploration" until they are refined and approved for production use.'
 ],
 '[{"name":"Claude","best":"Design briefs, component documentation, UX copy, design system annotations.","note":"Best for translating fuzzy client requirements into structured, actionable design direction."},{"name":"Midjourney","best":"Mood boards, visual style exploration, reference imagery, icon and illustration generation.","note":"v6.1+ with --style raw for professional output. Document all prompts used in the project file."},{"name":"Figma AI","best":"Layout suggestions, design token generation, component variant generation.","note":"Features are evolving rapidly. Best used for exploration, not production-critical decisions yet."}]'::jsonb,
 '[{"title":"Design Brief from Client Input","context":"When a client gives you a vague or unstructured project description and you need to create an actionable design brief.","template":"Transform the following client input into a structured design brief.\n\nClient input:\n[paste their description or notes]\n\nOutput format:\n- Project overview (1 paragraph)\n- Target audience (demographics, behaviors, goals)\n- Visual direction (tone, style references, color mood)\n- Key screens or deliverables\n- Accessibility and technical constraints\n- Open questions that need clarification"},{"title":"UX Microcopy Generator","context":"When you need copy for UI elements — empty states, error messages, tooltips, CTAs.","template":"Write UX microcopy for the following UI elements in [product name].\n\nProduct context: [brief description]\nTone: [casual/professional/friendly]\n\nWrite copy for:\n- Empty state (no data yet)\n- Success confirmation message\n- Error message (generic network error)\n- Onboarding tooltip for [feature]\n- CTA button text for [action]\n\nKeep each under 15 words. Be helpful, not robotic."}]'::jsonb,
 array[1,4,8]),

(7, '07', 'ANALYTICS', 'Data Analysis with AI',
 'Using AI to analyze datasets, generate reports, interpret results, and create data narratives for client presentations.',
 array['Claude','ChatGPT','Python'], 'active', '2026-02-28',
 array[
   'Data analysis has always required both technical skill and interpretive judgment. AI excels at the parts that slow most people down: writing query logic, interpreting statistical output, and transforming raw numbers into coherent narratives.',
   'At INOVA IT we use AI most for three data tasks: generating analysis scripts (Python/SQL), interpreting the results of analytics tools, and producing clear data narratives for client-facing reports that translate metrics into business insight.',
   'The limiting factor is not AI capability — it is data quality and context. AI can only analyze what you give it. Spending 20 minutes cleaning and contextualizing your data before prompting produces dramatically better output than dumping raw exports.'
 ],
 array[
   'Start by uploading your data to Claude or ChatGPT with Advanced Data Analysis enabled. Describe what you are trying to understand. Let the AI suggest what analyses make sense before you prescribe a specific approach.',
   'For SQL or Python queries, describe the question you are trying to answer, not the query you want written. "How many users dropped off between step 2 and step 3 of the funnel last month?" is better than "write a SQL query with GROUP BY."',
   'After getting analysis results, ask AI to interpret them. "Here are the results of this analysis — what do they suggest? What should we investigate further?" The interpretation step is where AI adds the most value for non-technical stakeholders.',
   'For client reports, ask AI to write a data narrative: "Here are the key metrics. Write a 3-paragraph executive summary that explains what happened, why it likely happened, and what we recommend."',
   'Verify all AI-generated queries before running them on production data. Ask AI to explain what the query does before executing it.'
 ],
 array[
   'Always include data schema and column definitions when asking AI to write queries. Without knowing what your columns mean, it will make wrong assumptions.',
   'For anomaly detection in data, ask Claude to scan your dataset for outliers and unexpected patterns before you define what you are looking for.',
   'AI is particularly useful for explaining statistical concepts in plain language. When analysis tools produce results you do not fully understand, ask AI to explain them.',
   'Use AI to proofread data narratives for logical consistency. It will catch cases where your conclusion does not follow from the data you cited.',
   'Keep analysis scripts AI generated in a clearly labeled folder. Always include a comment at the top: what it does, what data it expects, what it produces.'
 ],
 '[{"name":"Claude","best":"Data interpretation, writing SQL and Python, creating narratives and reports from analysis results.","note":"Paste data samples or schema definitions for best results. Opus 4 for complex multi-step analysis."},{"name":"ChatGPT","best":"Advanced Data Analysis (Code Interpreter) — upload CSV files for direct analysis and visualization.","note":"GPT-4o with Advanced Data Analysis enabled. Excellent for exploratory analysis on uploaded files."},{"name":"Python","best":"Automated data processing pipelines, recurring analysis scripts, custom visualizations.","note":"AI generates scripts; you run and maintain them. Pandas, Matplotlib, and Seaborn are the primary libraries."}]'::jsonb,
 '[{"title":"Data Interpretation Prompt","context":"When you have analysis results and need clear interpretation for stakeholders.","template":"Here are the results of a [type of analysis] for [project/client]:\n\n[paste results or key metrics]\n\nPlease interpret these results for a [technical/non-technical/executive] audience. Explain:\n1. What the data shows (plain language)\n2. What is notable or unexpected\n3. What likely explains these patterns\n4. What actions or further investigation this suggests"},{"title":"SQL Query Generator","context":"When you need a query to answer a specific business question from your database schema.","template":"Write a SQL query to answer the following question:\n[business question]\n\nDatabase schema:\n[paste relevant table definitions]\n\nRequirements:\n- Optimize for readability, not just performance\n- Include comments explaining each major step\n- Handle null values appropriately\n- Return: [describe the expected output columns]"}]'::jsonb,
 array[2,4,10]),

(8, '08', 'PRODUCTIVITY', 'Meeting & Communication AI',
 'Using AI to prepare for meetings, generate agendas, summarize notes, and produce follow-up communications at scale.',
 array['Claude','ChatGPT','Otter.ai'], 'active', '2026-03-08',
 array[
   'Meetings are one of the highest time costs in agency work. AI does not eliminate meetings — but it dramatically reduces the preparation and follow-up burden that consumes hours every week without touching the actual meeting time.',
   'The three highest-impact areas: pre-meeting preparation (context briefs, agenda generation, background research), in-meeting support (note-taking, action item capture), and post-meeting output (structured summaries, follow-up emails, decision logs).',
   'These workflows are immediately accessible to anyone on the team regardless of technical background. If you use email and take notes, you can use AI to make both faster and better.'
 ],
 array[
   'Before any client meeting, give Claude the context: who is attending, what the meeting is about, what you need to decide or present, and any background documents. Ask it to generate a focused agenda and a list of questions to ask.',
   'After a meeting, immediately paste your raw notes into Claude and ask for a structured summary: decisions made, action items with owners, open questions, and next steps. Takes 2 minutes instead of 30.',
   'Use Otter.ai to transcribe meetings automatically. Feed the transcript into Claude for a clean summary if your raw notes are sparse.',
   'For recurring meetings (weekly standups, client check-ins), create a template prompt that produces a consistent output format every time. Your team will know exactly what to expect.',
   'Use AI to draft follow-up emails from your meeting summary. Provide the summary and ask for a professional client-facing email that confirms decisions and outlines next steps.'
 ],
 array[
   'Review every AI-generated meeting summary before sharing. Context that was obvious in the room (tone, subtext, hesitation) does not exist in the text — and the AI will miss it.',
   'For action items, always include owner names and deadlines in your prompt. "Extract action items with owners and due dates" produces a usable task list.',
   'AI is particularly useful for turning messy brainstorm notes into a structured document. Do not clean up your notes first — give it the raw chaos and ask it to make sense of it.',
   'For sensitive client conversations, keep AI processing local (Claude or ChatGPT) and avoid feeding confidential data into any tool that trains on your input by default.',
   'Build a library of meeting templates: discovery meeting, project kickoff, sprint review, client feedback session. One good template per meeting type saves significant prep time.'
 ],
 '[{"name":"Claude","best":"Agenda generation, meeting summaries, follow-up email drafting, structured output from raw notes.","note":"Paste raw notes or transcripts directly. Ask for a specific output format every time."},{"name":"ChatGPT","best":"Quick summaries, casual follow-up drafts, brainstorm synthesis.","note":"GPT-4o. Good for speed. Use Claude when you need more structured or nuanced output."},{"name":"Otter.ai","best":"Automatic meeting transcription, real-time captions, speaker identification.","note":"Connects to Zoom and Google Meet. Free tier covers most use cases. Export transcript as text for AI processing."}]'::jsonb,
 '[{"title":"Meeting Agenda Generator","context":"When preparing for a client or internal meeting.","template":"Generate a focused agenda for the following meeting.\n\nMeeting type: [discovery / kickoff / check-in / review]\nDuration: [time]\nAttendees: [roles, not names]\nGoal: [what this meeting needs to accomplish]\nContext: [relevant background — project status, open issues, decisions needed]\n\nOutput: agenda with time allocations, 2–3 questions to drive each section, and a clear desired outcome per topic."},{"title":"Meeting Summary Generator","context":"After a meeting, with raw notes as input.","template":"Summarize the following meeting notes into a structured document.\n\nMeeting: [name/type]\nDate: [date]\nAttendees: [roles]\n\nRaw notes:\n[paste notes]\n\nOutput format:\n- Summary (2–3 sentences)\n- Decisions made\n- Action items (owner, task, deadline)\n- Open questions\n- Next steps"}]'::jsonb,
 array[3,4,6]),

(9, '09', 'RESEARCH', 'Research & Competitive Intelligence',
 'Using AI to accelerate research, synthesize information, map competitive landscapes, and produce structured briefing documents.',
 array['Claude','Perplexity','ChatGPT'], 'active', '2026-03-12',
 array[
   'Research is one of the highest-leverage applications of AI in agency work. Tasks that used to take half a day — competitive analysis, market mapping, technology landscape research — can now be completed in under an hour with the right workflow.',
   'The key distinction: AI is exceptional at synthesizing and structuring information, but unreliable as a primary source. Use AI to process, organize, and interpret — but verify factual claims against primary sources before including them in client-facing materials.',
   'At INOVA IT we primarily use Perplexity for research tasks that require current information (news, recent product updates, current pricing), and Claude for synthesis tasks — taking a collection of sources and producing a structured analysis or briefing document.'
 ],
 array[
   'Start research tasks in Perplexity — it retrieves current information with citations, which you can then verify. Use it for: competitor features, industry trends, recent announcements, and pricing data.',
   'After gathering raw information, switch to Claude for synthesis. Paste your research notes and ask it to produce a structured competitive analysis, trend summary, or briefing document.',
   'For competitive landscape mapping, ask Claude to create a comparison table from your research notes. Tables are faster to review than prose and easier to present to clients.',
   'Use AI to identify gaps in your research. After summarizing what you found, ask: "What important aspects of this topic am I not covering yet?" It will surface areas you missed.',
   'For ongoing competitive monitoring, set up a regular research prompt and run it weekly. Track how competitor positions change over time with a structured format.'
 ],
 array[
   'Never cite AI-generated research without verification. Use it to identify what to look for, not as the source of what you found.',
   'Perplexity citations do not always link to the exact claim you need. Click through and verify before including specific statistics or quotes.',
   'For highly specialized domains, AI research quality drops significantly. Supplement with primary sources, industry reports, and subject matter experts.',
   'Use AI to read and summarize long reports and whitepapers. Paste sections and ask for key takeaways. Enormous time saver for dense source material.',
   'For competitor feature research, ask AI to help you design a structured scoring rubric before you start gathering data. Consistent criteria make the analysis more defensible.'
 ],
 '[{"name":"Claude","best":"Synthesis, structuring research findings, producing briefing documents, comparison tables.","note":"Paste raw research and ask for structured output. Best for analysis after information is gathered."},{"name":"Perplexity","best":"Current information retrieval with citations, recent news, live pricing and feature data.","note":"Use Pro for more thorough searches. Always verify citations before using in client materials."},{"name":"ChatGPT","best":"Brainstorming research frameworks, generating survey or interview questions, exploring unfamiliar domains.","note":"GPT-4o. Good starting point when you do not yet know what you are looking for."}]'::jsonb,
 '[{"title":"Competitive Analysis Brief","context":"When you need to map a competitive landscape for a client or internal strategy project.","template":"Produce a competitive analysis for the following context:\n\nOur product/service: [description]\nMarket: [industry/segment]\nCompetitors to analyze: [list]\n\nFor each competitor provide:\n- Core offering\n- Target audience\n- Key differentiators\n- Notable weaknesses\n- Pricing model (if known)\n\nClose with: key opportunities we could exploit and threats to be aware of."},{"title":"Source Synthesis","context":"When you have gathered research from multiple sources and need a coherent document.","template":"I have gathered the following research on [topic]. Synthesize it into a structured briefing document.\n\nAudience: [who will read this]\nGoal: [what decision or action this will inform]\n\nResearch notes:\n[paste your notes]\n\nOutput format: executive summary, key findings (grouped thematically), implications, and recommended next steps."}]'::jsonb,
 array[3,4,7,8]),

(10, '10', 'PRODUCTIVITY', 'AI Presentations & Decks',
 'Using AI to structure, write, and prepare slide decks — from initial outline to speaker notes and visual direction.',
 array['Claude','ChatGPT','Gamma'], 'active', '2026-03-25',
 array[
   'Presentation creation is one of the most time-consuming tasks in agency work and one of the best candidates for AI acceleration. The research, structuring, writing, and speaker note preparation stages all benefit from AI involvement — without compromising the visual design quality that clients expect.',
   'At INOVA IT the typical workflow: use Claude to build the narrative structure and write slide content, use Midjourney or DALL-E for any custom visuals, then execute the final design in Figma or PowerPoint. Gamma is a useful tool for rapid internal presentations where design quality is secondary to speed.',
   'The key skill is knowing what to ask for at each stage. AI cannot know your client context or what will land in the room — but it is excellent at structuring arguments, writing tight slide copy, and generating speaker notes from bullet points.'
 ],
 array[
   'Start with the narrative. Tell Claude the context (audience, goal, key message, presentation length) and ask for a story structure before writing any slides. Get alignment on the story before writing the content.',
   'Once the structure is approved, generate slide-by-slide content. Ask for headline, 3 supporting bullet points, and one key visual direction per slide. Review before moving to design.',
   'For speaker notes, paste your slide content and ask Claude to write 3–5 sentences of speaking points per slide — what to say, not what is on the slide.',
   'Use Gamma for rapid internal presentations where you need something professional in 20 minutes. It handles layout automatically and produces clean output for low-stakes decks.',
   'For client-facing presentations, always execute the final design in your design tool of choice. Use AI for structure and copy, not for the design itself.'
 ],
 array[
   'Good presentation structure is: problem → stakes → solution → evidence → ask. Ask AI to force your content into this structure and see if it holds.',
   'Slide headlines should tell the story on their own. Ask AI to rewrite your headlines so the deck makes sense even if someone only reads the bold text.',
   'For data slides, give AI the numbers and ask it to write the "so what" — the one-sentence interpretation that tells the audience what to take away from the chart.',
   'Speaker notes written by AI tend to be too generic. Ask it to write notes "as if presenting to [specific audience]" for much more relevant and useful output.',
   'Use AI to pressure-test your presentation logic. Ask: "What objections might a skeptical audience raise to each of these points?" Prepare for the tough questions in advance.'
 ],
 '[{"name":"Claude","best":"Narrative structure, slide copy, speaker notes, argument development.","note":"Give it full context: audience, goal, key message, time available. Structure first, then content."},{"name":"ChatGPT","best":"Quick deck outlines, variation generation, casual internal presentations.","note":"GPT-4o. Good for speed when the presentation does not need deep strategic thinking."},{"name":"Gamma","best":"Fast, automatically laid-out presentations for internal use.","note":"Free tier is generous. Best for internal decks where speed matters more than design polish."}]'::jsonb,
 '[{"title":"Presentation Narrative Structure","context":"Before writing any slides — build the story first.","template":"I need to create a presentation with the following context:\n\nAudience: [who they are, what they care about]\nGoal: [what I want them to think, feel, or do after]\nKey message: [one sentence]\nLength: [number of slides or minutes]\nContext: [relevant background — pitch, update, proposal, etc.]\n\nGenerate a narrative structure for this presentation. For each section include: the purpose, what it needs to accomplish, and 1–2 key points to land."},{"title":"Slide Content Generator","context":"Once the structure is approved, generate the actual slide content.","template":"Write content for the following slides. For each slide provide:\n- Headline (max 8 words, tells the story)\n- 3 bullet points (max 10 words each)\n- Speaker note (2–3 sentences of what to say out loud)\n- Visual direction (what kind of image or chart would work)\n\nSlides to write:\n[list slide titles from your approved structure]"}]'::jsonb,
 array[3,4,6,8]);

-- ============================================
-- UPDATES / ARTICLES (4 entries)
-- ============================================

insert into updates (id, date, title, summary, tag, content, action_items, affected_skills) values

('update-1', '2026-03-28',
 'Claude vs ChatGPT in 2026: Which Model for Agency Work?',
 'A practical comparison of Claude and ChatGPT for the tasks we actually do — code generation, writing, research, and client presentations.',
 'COMPARISON',
 array[
   'Both Claude and ChatGPT have matured significantly in the past year, and the honest answer to "which is better" is: it depends on the task. After six months of using both in production at INOVA IT, we have a clearer picture of where each model actually wins.',
   'Claude (Sonnet 4 / Opus 4) consistently outperforms ChatGPT on tasks requiring careful reasoning, structured output, and long-context comprehension. Feed it a 50-page client brief and ask for a structured summary — it handles it well. Ask it to refactor a complex codebase with specific constraints — it follows instructions more precisely than GPT-4o. It is also significantly more reliable at refusing to hallucinate details when it does not know something.',
   'ChatGPT (GPT-4o) has the edge in two areas: speed of iteration and the Advanced Data Analysis feature. For rapid brainstorming, generating 10 variations of a headline, or doing exploratory data analysis on a CSV file, GPT-4o is faster to work with. The image generation integration (DALL-E 3 built-in) also makes it more convenient for quick visual mockups within a chat workflow.',
   'Our current default: Claude for anything that requires precision — code, documentation, structured analysis, complex writing. ChatGPT for speed-critical tasks, data exploration, and when the built-in image generation saves a context switch.',
   'One important note: model quality is a moving target. Both Anthropic and OpenAI ship meaningful updates frequently. The best practice is to run your critical prompts on both models every quarter and reassess. What is true today may not be true in six months.'
 ],
 array[
   'Audit your current AI tool usage — which tasks are you defaulting to ChatGPT for that would be better served by Claude, and vice versa?',
   'Set up both Claude and ChatGPT in your workflow. Do not force yourself to use only one model for everything.',
   'For any high-stakes deliverable (client proposal, critical code, published content), run your key prompts on both models and compare output quality.',
   'Subscribe to release notes from both Anthropic and OpenAI. Model updates happen frequently and can change your optimal workflow.'
 ],
 array[1,2,3,4,5,6,7,8,9,10]),

('update-2', '2026-03-14',
 'How We Cut Design Research Time by 60% with AI',
 'A case study from our recent adidas project: how the design team used AI at every research and ideation stage to move faster without cutting corners.',
 'CASE STUDY',
 array[
   'Design research has always been a significant investment on any serious project. User interviews, competitive analysis, trend research, synthesis — easily two to three weeks of work before a single frame is in Figma. On a recent project we experimented with integrating AI at every stage of this process. Here is what we learned.',
   'The biggest time saving came in competitive analysis. What typically takes two days — gathering information on 8–10 competitors, synthesizing it into a structured document, and creating a comparison matrix — took four hours. We used Perplexity to gather current information on each competitor with citations, then fed the raw notes into Claude to produce a structured analysis with a comparison table. The output was review-ready, not perfect, but the editing time was a fraction of the writing time.',
   'For synthesis of user research notes, we pasted interview transcripts into Claude in batches and asked for recurring themes, direct quotes, and pain points grouped by category. This produced a first-pass affinity map that the team could react to in a workshop rather than spending a day building from scratch. The speed of getting to "react and refine" rather than "build from zero" was significant.',
   'Where AI was less useful: interpreting the emotional nuance of user interviews. When a participant hesitated before answering a question, or when their body language contradicted their words, that context does not exist in the transcript. The human synthesis layer remains essential for insight depth.',
   'The overall time reduction was roughly 60% across the research phase. The quality of insights was comparable — in some cases better, because we had more time to go deep on the areas that mattered rather than spending energy on the mechanics of synthesis.'
 ],
 array[
   'Map your current research process and identify which stages are primarily mechanical (gathering, organizing, formatting) versus interpretive. AI wins on mechanical; humans win on interpretive.',
   'Try the Perplexity → Claude workflow for your next competitive analysis. Perplexity for information gathering with citations, Claude for structured synthesis.',
   'For user research, experiment with pasting interview transcripts into Claude for first-pass theme identification before your synthesis workshop.',
   'Document time savings on AI-assisted research phases to build the internal case for adopting these workflows across the team.'
 ],
 array[6,9,4]),

('update-3', '2026-03-05',
 'Midjourney v7: What Changed and What It Means for Design Work',
 'The latest Midjourney release brings significant improvements to photorealism and style consistency. Here is what matters for agency workflows.',
 'TOOL UPDATE',
 array[
   'Midjourney v7 is a meaningful upgrade over v6.1, particularly for the two areas most relevant to agency work: photorealism and style consistency across a series of images.',
   'Photorealism has improved noticeably — especially for product photography, architectural renders, and lifestyle imagery. The model handles complex lighting scenarios better, reduces the soft-focus artifacts that plagued earlier versions on sharp-edged objects, and produces more convincing textures on materials like fabric, metal, and glass. For clients who need product mockups or lifestyle imagery, v7 reduces the post-processing work required to make AI images look credible.',
   'Style consistency is the more significant improvement for multi-image projects. The --sref (style reference) feature is more reliable in v7 — passing a reference image produces closer stylistic alignment across a batch of images, which was inconsistent in v6.1. For pitch decks, case study imagery, and brand campaigns that require visual cohesion across multiple assets, this matters.',
   'What has not changed: the need for human judgment in prompt writing and output selection. v7 generates better images from the same prompts, but it still requires iteration. Plan for 3–4 rounds of refinement on any important image. The "Vary (Subtle)" and "Vary (Strong)" options remain your primary tools for that iteration.',
   'One workflow note: v7 is slightly slower than v6.1 at standard quality settings. If you need speed for rapid ideation, v6.1 is still available. Use v7 when the final quality matters.'
 ],
 array[
   'Update your Midjourney prompts to remove any v6-specific workarounds you added to compensate for photorealism issues — test whether v7 handles them natively.',
   'If you have active brand projects requiring image consistency, test the --sref improvements in v7 against your reference images.',
   'Add a note to your project documentation to specify v7 (--v 7) when generating images for client-facing deliverables going forward.',
   'Compare v7 output against your best v6.1 results for your most common use cases and decide if the quality improvement justifies the speed trade-off for your workflows.'
 ],
 array[1,6]),

('update-4', '2026-02-20',
 'Building Our First Internal AI Automation: Lessons Learned',
 'We connected Supabase, Claude API, and a simple webhook to automate our weekly AI tool monitoring process. What worked, what broke, and what we would do differently.',
 'WORKFLOW',
 array[
   'We set out to automate something simple: every Monday, pull the latest updates from the AI tools we actively use, summarize what changed, and post a brief digest to our internal Slack channel. In theory, a weekend project. In practice, a two-week education in the realities of building with AI APIs.',
   'The architecture ended up clean: a scheduled Supabase Edge Function fires every Monday morning, queries a list of tools and their update URLs, fetches the relevant release notes and changelogs, sends the content to Claude API with a structured summary prompt, and posts the result to Slack via webhook. Total cost: roughly $0.30 per week in API calls.',
   'What worked well: the Claude API is remarkably stable and the output format consistency (we asked for structured JSON) was high enough to parse programmatically without constant schema validation failures. The prompt we landed on after five iterations asked Claude to return a specific JSON shape with tool name, change category, user impact level, and a one-sentence summary. It produced valid output over 95% of the time.',
   'What broke: changelog formats vary wildly across tools. Some publish structured release notes, some have blog posts, some update a single page with no date markers. We ended up building lightweight scrapers for four of the eight tools, which was the majority of the engineering effort. The AI part was the easy part.',
   'The lesson: automating research and synthesis with AI is genuinely accessible and cost-effective. The hard part is usually data acquisition — getting clean, structured input for the AI to process. Invest in that layer first before building the AI integration.'
 ],
 array[
   'Identify one repetitive research or reporting task in your workflow that follows a consistent pattern — this is your automation candidate.',
   'Before building, map the data flow: where does the input come from, in what format, and how consistent is that format? Data acquisition complexity is usually the limiting factor, not AI capability.',
   'Start with a manual version of the workflow using Claude in chat before building any automation. Validate that the AI output quality is good enough before writing code.',
   'Review the Claude API pricing for your use case. Most lightweight summarization and analysis workflows cost pennies per run — the economics are compelling even for small teams.'
 ],
 array[2,4,7,9]);

-- Reset the skills id sequence to avoid conflicts on future inserts
select setval('skills_id_seq', (select max(id) from skills));
