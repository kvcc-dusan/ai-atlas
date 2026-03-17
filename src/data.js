// ==========================================
// SKILLS — All playbook entries
// Categories serve as the unified taxonomy
// (no separate "workflows" — they're just
//  skills tagged with WORKFLOW category)
// ==========================================
export const skills = [
  {
    id: 1,
    chapter: '01',
    category: 'CREATIVE',
    title: 'AI Image Generation',
    brief: 'Generating, editing, and iterating on images for design work. Covers prompting techniques, style control, and integration with Figma workflows.',
    tools: ['Midjourney', 'DALL-E 3', 'Flux'],
    status: 'active',
    lastUpdated: '2026-02-15',
    hasDetail: true,
    detail: {
      overview: [
        'AI image generation has fundamentally changed how we approach visual design at INOVA IT. Instead of spending hours searching stock libraries or waiting for custom illustrations, designers can now generate tailored visuals in minutes — iterating on concepts faster than ever before.',
        'This skill covers the three major tools we use in production: Midjourney for high-fidelity creative work, DALL-E 3 for quick conceptual exploration and text-integrated images, and Flux for open-source flexibility when client data policies require it.',
        'Understanding image generation isn\'t just about typing prompts — it\'s about controlling style consistency across a project, knowing which tool fits which use case, and integrating AI-generated assets into existing Figma workflows without breaking your design system.'
      ],
      tools: [
        { name: 'Midjourney', best: 'High-quality creative imagery, brand visuals, mood boards. Best photorealism and artistic control.', note: 'Accessed via Discord. v6+ recommended. Requires paid plan.' },
        { name: 'DALL-E 3', best: 'Quick iterations, text in images, conceptual mockups. Excellent prompt adherence.', note: 'Available through ChatGPT Plus or API. Good for rapid exploration.' },
        { name: 'Flux', best: 'Open-source alternative, on-premise deployment, sensitive client work where data can\'t leave our infrastructure.', note: 'Self-hosted via ComfyUI. Requires GPU resources.' }
      ],
      gettingStarted: [
        'Start with Midjourney — join the INOVA IT workspace on Discord and use the #ai-images channel. Run /imagine with a simple descriptive prompt to see how the tool responds.',
        'Learn the anatomy of a good image prompt: Subject + Style + Mood + Technical parameters. Example: "Modern office interior, Scandinavian design, warm natural lighting, architectural photography style --ar 16:9 --v 6"',
        'Experiment with style references (--sref) and character references (--cref) in Midjourney to maintain visual consistency across a series of images for the same project.',
        'For client-facing work, always generate 3-4 variations and present options. Use Midjourney\'s variation and zoom features to refine the selected direction.',
        'Export at maximum resolution and bring into Figma. Use the "Upscale (Subtle)" option for production-ready assets. Document your prompts in the project brief for future reference.'
      ],
      prompts: [
        {
          title: 'Hero Image for Landing Page',
          context: 'When you need a high-impact visual for a website hero section that matches a specific brand aesthetic.',
          template: 'Professional photograph of [subject], [brand style] aesthetic, [color palette] tones, soft studio lighting, shallow depth of field, editorial quality, 8K resolution --ar 16:9 --v 6 --style raw'
        },
        {
          title: 'UI Mockup Background Texture',
          context: 'When you need subtle background textures or abstract visuals for app interfaces.',
          template: 'Abstract [geometric/organic] pattern, [color] gradient, minimal, clean, suitable as UI background, subtle texture, low contrast --ar 1:1 --v 6 --style raw --s 50'
        },
        {
          title: 'Icon Set Generation',
          context: 'When you need a consistent set of custom icons that match a specific design language.',
          template: 'Simple [style] icon of [object], flat design, single color [hex], centered, white background, consistent line weight, minimal detail --ar 1:1 --v 6 --no background texture shadow'
        }
      ],
      tips: [
        'Always use --style raw for commercial work — it gives you more control and less "Midjourney flavor" in the output.',
        'Negative prompts (--no) are your best friend. Specify what you DON\'T want to avoid common AI artifacts: --no text, watermark, blurry, distorted.',
        'For consistent character design across multiple images, use --cref with a reference image. This is game-changing for pitch decks and storyboards.',
        'DALL-E 3 is surprisingly good at text in images — use it when you need placeholder text that actually looks readable in mockups.',
        'Never deliver AI-generated images directly to clients without post-processing. Always bring them into Photoshop or Figma for color correction, cropping, and integration with the design system.',
        'Keep a prompt library in your project documentation. Future you (and your teammates) will thank you when you need to generate more images in the same style.'
      ],
      relatedSkills: [4, 6, 10]
    }
  },
  {
    id: 2,
    chapter: '02',
    category: 'DEVELOPMENT',
    title: 'Code Generation & Assistance',
    brief: 'Using AI for writing, reviewing, refactoring, and debugging code. Includes prompt patterns for different languages and frameworks.',
    tools: ['Claude', 'Cursor', 'GitHub Copilot'],
    status: 'active',
    lastUpdated: '2026-02-22',
    hasDetail: true,
    detail: {
      overview: [
        'AI-assisted code generation has become a core part of how our development team operates. It\'s not about replacing developers — it\'s about removing the tedious parts of coding so you can focus on architecture, logic, and quality.',
        'At INOVA IT, we use Claude for complex code generation (full components, API integration, refactoring), Cursor as our AI-native IDE for inline editing and multi-file changes, and GitHub Copilot for rapid line-by-line completions during regular coding.',
        'The key insight: AI code generation is only as good as your ability to describe what you want. Specificity in prompts is everything — the same tool will produce trash or production-ready code depending on how you communicate with it.'
      ],
      tools: [
        { name: 'Claude', best: 'Full component generation, complex refactoring, code review, debugging deep issues. Best for tasks requiring reasoning across multiple files.', note: 'Use Opus 4 for complex multi-file tasks, Sonnet 4 for quick single-file edits.' },
        { name: 'Cursor', best: 'Inline code editing, multi-file changes, codebase-aware completions. Works best when it has full project context.', note: 'Set Claude as preferred model. Use Cmd+K for inline edits, Cmd+L for chat.' },
        { name: 'GitHub Copilot', best: 'Fast line completions, boilerplate code, writing tests from function signatures.', note: 'Best for flow-state coding. Less precise than Claude for complex logic.' }
      ],
      gettingStarted: [
        'Start with Cursor — install it and open your current project. Try Cmd+K on a function and ask it to "add error handling and input validation." See how it proposes changes in context.',
        'For new components, use Claude directly. Describe the component\'s purpose, props, state, and behavior. Include your tech stack (e.g., "React + TypeScript + Tailwind") and any patterns to follow.',
        'Learn to break large coding tasks into sequential prompts. Don\'t ask for an entire feature at once. Ask for the data model first, then the API layer, then the UI, then the tests.',
        'Always review AI-generated code before committing. Check for: hardcoded values, missing edge cases, unnecessary complexity, and whether it follows your project\'s conventions.',
        'Set up GitHub Copilot in your IDE for everyday coding. It\'s best for autocompletion — let it suggest, but don\'t rely on it for complex logic.'
      ],
      prompts: [
        {
          title: 'React Component Generator',
          context: 'When you need a complete, well-structured React component that follows your project patterns.',
          template: 'Create a React component called [ComponentName] with the following specs:\n\nPurpose: [what it does]\nProps: [list props with types]\nState: [internal state if any]\nBehavior: [interactions, events]\nStyling: [CSS approach - modules/tailwind/styled]\nPatterns: [follow existing patterns from project]\n\nInclude TypeScript types, proper error boundaries, and loading states.'
        },
        {
          title: 'Refactoring Prompt',
          context: 'When you have working code that needs improvement without changing behavior.',
          template: 'Refactor the following code to improve [readability/performance/maintainability].\n\nRequirements:\n- Do NOT change the external API or behavior\n- Maintain all existing functionality\n- Add inline comments explaining non-obvious logic\n- Extract repeated patterns into reusable functions\n\n[paste code]'
        }
      ],
      tips: [
        'The #1 mistake is accepting AI code without reading it. Always review — AI confidently generates plausible-looking code that can have subtle bugs.',
        'For TypeScript projects, always ask AI to include proper type definitions. Don\'t accept `any` types in generated code.',
        'When debugging, paste the error message AND the relevant code. AI is much better at fixing bugs when it has both pieces of context.',
        'Use AI to write tests AFTER you\'ve written the implementation. It\'s surprisingly good at generating edge cases you hadn\'t considered.',
        'For repetitive patterns (CRUD endpoints, form components, data transformations), create a single good example manually, then ask AI to generate the rest following the same pattern.'
      ],
      relatedSkills: [4, 5, 6]
    }
  },
  {
    id: 3,
    chapter: '03',
    category: 'CONTENT',
    title: 'AI Writing & Content',
    brief: 'Drafting, editing, and structuring written content. Covers technical documentation, client communication, and internal reports.',
    tools: ['Claude', 'ChatGPT'],
    status: 'active',
    lastUpdated: '2026-02-18',
    hasDetail: true,
    detail: {
      overview: [
        'Content creation is one of AI\'s strongest use cases — and one where INOVA IT can save the most time. From technical documentation to client proposals to internal reports, AI can produce solid first drafts that human editors can refine into final copy.',
        'The critical distinction: AI is a drafting tool, not a publishing tool. Every piece of content that leaves our agency should be reviewed and edited by a human who understands the audience, context, and brand voice.',
        'This skill covers the workflows and prompts that our content, PM, and leadership teams use daily. Whether you\'re writing a project postmortem or a client-facing case study, you\'ll find patterns here that save hours of blank-page staring.'
      ],
      tools: [
        { name: 'Claude', best: 'Long-form content, technical writing, structured documents, maintaining consistent tone across long pieces.', note: 'Primary recommendation. Opus for complex/long pieces, Sonnet for quick drafts.' },
        { name: 'ChatGPT', best: 'Short-form content, brainstorming headlines, casual writing, quick email drafts.', note: 'Good for conversational tone. Use when Claude feels too formal.' }
      ],
      gettingStarted: [
        'Start simple — next time you need to write an email, try prompting Claude with the key points and audience. Compare the AI draft to what you would have written manually.',
        'Always specify: audience (who reads this?), tone (formal/casual/technical), length (word count or paragraph count), and structure (sections, bullet points, narrative).',
        'Use the "write a draft then critique it" pattern: ask AI to write, then in a follow-up, ask it to identify weaknesses in its own draft and rewrite with improvements.',
        'For client-facing content, include your agency\'s brand voice guidelines in the prompt. If you don\'t have formal guidelines, describe the tone: "professional but not stiff, confident but not arrogant."',
        'Build a library of system prompts for recurring content types — weekly status updates, project briefs, postmortems, blog posts. Reuse them.'
      ],
      prompts: [
        {
          title: 'Technical Documentation',
          context: 'When you need to document a feature, API, or process for internal or external use.',
          template: 'Write technical documentation for [feature/system].\n\nAudience: [developers / PMs / non-technical stakeholders]\nFormat: [README / wiki / guide]\nInclude:\n- Overview (what it does and why)\n- Prerequisites\n- Step-by-step setup/usage\n- Configuration options\n- Common issues and troubleshooting\n\nTone: Clear, concise, no unnecessary jargon. Use code examples where relevant.'
        },
        {
          title: 'Client Status Update',
          context: 'Weekly or bi-weekly project status email for client stakeholders.',
          template: 'Write a project status update email.\n\nProject: [name]\nPeriod: [date range]\nCompleted: [list of completed items]\nIn progress: [current work]\nBlockers: [any issues]\nNext steps: [upcoming work]\n\nTone: Professional, transparent, solution-oriented. Keep it under 300 words. If there are delays, explain why and provide revised timelines.'
        }
      ],
      tips: [
        'Never send AI-generated client content without editing. AI doesn\'t know the nuances of your client relationship, past conversations, or sensitivities.',
        'For long documents, write the outline yourself and let AI fill in the sections. You maintain control of structure while delegating the writing.',
        'AI tends to be verbose. After generating, always edit for conciseness — cut 20-30% of the word count. Your readers will thank you.',
        'Use AI to translate between audiences: "Rewrite this technical explanation for a non-technical client stakeholder."',
        'For recurring content (weekly reports, status updates), save your best prompt as a template and reuse with updated data each time.'
      ],
      relatedSkills: [4, 9, 10]
    }
  },
  {
    id: 4,
    chapter: '04',
    category: 'CORE SKILL',
    title: 'Prompt Engineering Fundamentals',
    brief: 'The foundation skill for everything else. How to write effective prompts, use system instructions, chain tasks, and get consistent results.',
    tools: ['All LLMs'],
    status: 'active',
    lastUpdated: '2026-02-20',
    hasDetail: true,
    detail: {
      overview: [
        'Prompt engineering is the single most important skill in the AI toolkit. Every other skill in this playbook depends on your ability to communicate effectively with language models. It\'s not about tricks or hacks — it\'s about developing a mental model for how these systems process and respond to input.',
        'At INOVA IT, we\'ve found that the difference between a junior and senior AI user almost always comes down to prompting discipline. Senior users write structured, specific prompts. They iterate deliberately. They understand when to add constraints and when to leave room for the model to be creative.',
        'This skill covers the core principles that apply across all LLMs — whether you\'re using Claude, GPT-4, Gemini, or a local model. The specific quirks of each model matter less than understanding the universal patterns that make prompts work.'
      ],
      tools: [
        { name: 'Claude (Anthropic)', best: 'Long-form reasoning, code generation, analysis tasks. Excellent at following complex multi-step instructions.', note: 'Primary recommendation for most INOVA IT use cases. Use Claude Opus 4 for complex tasks.' },
        { name: 'ChatGPT (OpenAI)', best: 'General-purpose tasks, quick brainstorming, image generation via DALL-E integration.', note: 'GPT-4o for speed, GPT-4.5 for deeper reasoning. Good for casual exploration.' },
        { name: 'Gemini (Google)', best: 'Multi-modal tasks, Google ecosystem integration, large context windows.', note: 'Gemini 2.0 Pro for heavy analytical work. Good for processing large documents.' }
      ],
      gettingStarted: [
        'Start with the ROLE-TASK-FORMAT pattern. Every prompt should define: Who is the AI? What should it do? How should it format the output? Example: "You are a senior React developer. Review this component for performance issues. Output a numbered list of issues with severity ratings."',
        'Practice specificity over length. "Write a good email" is a bad prompt. "Write a 3-paragraph client email explaining a two-week delay in the API integration phase, tone: professional but honest, include a revised timeline" is a good prompt.',
        'Learn to use system prompts (instructions that set persistent behavior). In Claude, this is the system prompt field. In ChatGPT, it\'s the custom instructions. Set role, tone, constraints, and output format here so you don\'t repeat them every message.',
        'Master the chain-of-thought technique: ask the model to think step by step before giving its final answer. This dramatically improves accuracy on complex tasks.',
        'Build a personal prompt library. When you write a prompt that works well, save it. Categorize by task type. Share with your team. This is how institutional knowledge compounds.'
      ],
      prompts: [
        {
          title: 'The Universal Task Prompt',
          context: 'A general-purpose template that works for most tasks. Customize the bracketed sections.',
          template: 'You are a [role] with expertise in [domain].\n\nContext: [relevant background information]\n\nTask: [specific thing you want done]\n\nConstraints:\n- [constraint 1]\n- [constraint 2]\n- [constraint 3]\n\nOutput format: [how you want the response structured]\n\nBefore responding, think through your approach step by step.'
        },
        {
          title: 'Code Review Prompt',
          context: 'When you want AI to review code with specific criteria.',
          template: 'Review the following [language] code for:\n1. Bug risks and edge cases\n2. Performance issues\n3. Readability and maintainability\n4. Adherence to [framework/style guide] conventions\n\nFor each issue found:\n- Quote the specific line(s)\n- Explain why it\'s a problem\n- Suggest a concrete fix\n- Rate severity: critical / warning / suggestion'
        },
        {
          title: 'Iterative Refinement Prompt',
          context: 'When the first response isn\'t quite right and you need to steer the model.',
          template: 'That\'s close, but I need you to adjust:\n\n1. [What to change]: [specific instruction]\n2. [What to keep]: [what was good about the previous response]\n3. [Additional constraint]: [new requirement]\n\nPlease regenerate with these adjustments. Keep everything else the same.'
        }
      ],
      tips: [
        'The most common mistake is being too vague. If your prompt could reasonably produce 10 very different outputs, it\'s not specific enough.',
        'Context is king. The same prompt with different context produces wildly different results. Always include relevant background.',
        'Don\'t ask the model to be "creative" and "precise" in the same prompt. These are opposing instructions.',
        'When a prompt doesn\'t work, resist the urge to completely rewrite it. Change one variable at a time.',
        'Temperature and other model parameters matter less than your prompt quality.',
        'For complex tasks, break them into sub-tasks and chain the prompts. Sequential prompts with clear handoffs produce better results than one mega-prompt.'
      ],
      relatedSkills: [2, 3, 10]
    }
  },
  {
    id: 5,
    chapter: '05',
    category: 'DEVELOPMENT',
    title: 'AI for Code Review',
    brief: 'Automated pre-review of pull requests. Pattern detection, consistency checks, and review summaries before human sign-off.',
    tools: ['Claude', 'CodeRabbit'],
    status: 'active',
    lastUpdated: '2026-02-12',
    hasDetail: true,
    detail: {
      overview: [
        'Code review is one of the highest-leverage activities in software development — and also one of the most time-consuming. AI-assisted code review doesn\'t replace human reviewers, but it handles the tedious parts: catching obvious bugs, checking for consistency, and summarizing what changed.',
        'At INOVA IT, we use a two-layer review process: CodeRabbit runs automatically on every PR to catch patterns and generate summaries, then human reviewers focus on architecture, business logic, and design decisions that AI can\'t evaluate.',
        'The result: our senior developers spend less time on "you forgot to add error handling" comments and more time on meaningful technical discussions. Review turnaround has improved by about 40% since we adopted this workflow.'
      ],
      tools: [
        { name: 'CodeRabbit', best: 'Automated PR review, pattern detection, consistency checks, summary generation for large PRs.', note: 'Integrates directly with GitHub. Runs on every PR automatically.' },
        { name: 'Claude', best: 'Deep code analysis, architectural review, explaining complex code changes to non-technical stakeholders.', note: 'Use for manual deep-dives on critical PRs. Paste diffs into Claude for detailed analysis.' }
      ],
      gettingStarted: [
        'CodeRabbit is already configured on our GitHub organization. It will automatically comment on your PRs with findings. Start by reading its comments on your next PR.',
        'For important PRs, supplement CodeRabbit with a Claude review: paste the diff and ask for a detailed analysis focusing on edge cases and architectural implications.',
        'Learn to distinguish between AI suggestions you should follow (clear bugs, missing validation) and ones you can ignore (style preferences, unnecessary abstractions).',
        'Use AI to write your PR descriptions: paste the diff into Claude and ask for a structured summary of what changed and why.',
        'When reviewing others\' PRs, use AI to help: "Explain this code change and identify potential issues" is faster than reading line-by-line.'
      ],
      prompts: [
        {
          title: 'Deep PR Review',
          context: 'For critical PRs that need thorough analysis beyond what CodeRabbit catches.',
          template: 'Review this pull request diff carefully.\n\nContext: [what this PR is supposed to do]\n\nFocus on:\n1. Logic errors and edge cases\n2. Security implications\n3. Performance concerns\n4. Breaking changes to existing functionality\n5. Missing tests for new code paths\n\nFor each finding, explain the risk and suggest a fix.'
        }
      ],
      tips: [
        'Don\'t blindly accept CodeRabbit suggestions — it catches patterns but doesn\'t understand business context.',
        'AI review is best for catching what humans miss: typos, inconsistent naming, forgotten error handling. Humans are better at evaluating design decisions.',
        'Use AI to generate PR descriptions — it\'s faster and often more thorough than writing them manually.',
        'The best time to use AI review is BEFORE requesting human review. Fix the obvious issues first.'
      ],
      relatedSkills: [2, 4, 12]
    }
  },
  {
    id: 6,
    chapter: '06',
    category: 'WORKFLOW',
    title: 'Design-to-Code Workflows',
    brief: 'Translating design specs into code faster. AI-assisted component generation from Figma files, design token extraction, and spec validation.',
    tools: ['Claude', 'Cursor', 'Figma'],
    status: 'active',
    lastUpdated: '2026-01-28',
    hasDetail: true,
    detail: {
      overview: [
        'The design-to-code handoff has always been a friction point in our projects. Designers create pixel-perfect mockups in Figma, developers interpret them, and the result rarely matches perfectly on the first pass. AI dramatically accelerates this loop.',
        'This workflow uses Claude to analyze Figma design exports and generate React components that closely match the design spec — handling spacing, typography, colors, and component structure. It gets us about 80% of the way there in minutes instead of hours.',
        'The workflow also includes design token extraction: AI pulls color values, spacing scales, and typography settings from Figma files and generates CSS custom properties or theme files automatically.'
      ],
      tools: [
        { name: 'Claude', best: 'Analyzing design screenshots and generating component code. Best for translating visual specs into structured code.', note: 'Use with screenshots or exported design specs. Opus handles complex multi-component layouts.' },
        { name: 'Cursor', best: 'Refining AI-generated components in context of your full project. Codebase-aware edits.', note: 'Import AI-generated code and use Cmd+K to refine with full project context.' },
        { name: 'Figma', best: 'Source of truth for designs. Use auto-layout and design tokens for best AI compatibility.', note: 'Export designs as PNG + structured specs. Dev mode exports CSS properties cleanly.' }
      ],
      gettingStarted: [
        'Screenshot a Figma component and paste it into Claude with: "Generate a React component that matches this design exactly. Use CSS modules for styling. Include responsive breakpoints."',
        'For design tokens, export your Figma color styles and typography settings, then ask Claude to generate CSS custom properties matching the design system.',
        'Start with simple components (buttons, cards, headers) before attempting full page layouts. Build confidence with the workflow on low-stakes pieces.',
        'Use Cursor\'s multi-file mode to generate a component file + its CSS module + a Storybook story in one pass.',
        'After generating, always validate against the Figma source. The AI gets proportions right but may miss subtle details like specific border-radius values or shadow specifications.'
      ],
      prompts: [
        {
          title: 'Component from Screenshot',
          context: 'When you have a Figma design screenshot and need a React component.',
          template: 'Generate a React component that matches the attached design screenshot.\n\nRequirements:\n- React functional component with TypeScript\n- CSS modules for styling (create separate .module.css)\n- Responsive: mobile-first, breakpoints at 768px and 1200px\n- Use semantic HTML elements\n- Include hover/focus states matching the design\n- Name: [ComponentName]\n\nDesign system tokens to use: [paste your CSS variables]'
        }
      ],
      tips: [
        'The quality of AI component generation is directly proportional to the quality of the design system. Well-organized Figma files with auto-layout produce much better results.',
        'Always include your project\'s existing CSS variables or theme tokens in the prompt — AI will use them instead of hardcoding values.',
        'For complex layouts, describe the grid/flex structure in words alongside the screenshot. AI sometimes misinterprets visual layout hierarchy.',
        'Don\'t expect pixel-perfection from AI. Use it for the 80% structural work, then manually adjust the last 20% of visual refinements.',
        'Design tokens extracted by AI should be verified against the Figma source before committing to your codebase.'
      ],
      relatedSkills: [1, 2, 4]
    }
  },
  {
    id: 7,
    chapter: '07',
    category: 'QA',
    title: 'AI-Assisted QA & Testing',
    brief: 'Generating test cases, writing automated tests, and using AI for visual regression detection and content validation.',
    tools: ['Claude', 'Playwright'],
    status: 'active',
    lastUpdated: '2026-03-01',
    hasDetail: true,
    detail: {
      overview: [
        'Quality assurance is one of the most underutilized areas for AI assistance at INOVA IT. While most teams immediately think of code generation, AI can dramatically accelerate testing — from writing comprehensive test suites to identifying edge cases that humans consistently miss.',
        'The combination of Claude for test logic generation and Playwright for browser automation creates a powerful QA pipeline. Claude understands application requirements and can generate test scenarios, while Playwright executes them in real browsers with full screenshot and trace capabilities.',
        'This skill focuses on practical QA workflows: generating test cases from user stories, writing end-to-end tests, performing visual regression checks, and using AI to review test coverage gaps. The goal is not to replace QA thinking — it\'s to amplify it.'
      ],
      tools: [
        { name: 'Claude', best: 'Generating test cases from requirements, writing Playwright test code, analyzing test failures and suggesting fixes.', note: 'Use Claude Opus for complex test logic. Sonnet works fine for simple unit tests.' },
        { name: 'Playwright', best: 'Cross-browser end-to-end testing, visual regression screenshots, API testing, mobile viewport testing.', note: 'Our standard E2E framework. Supports Chromium, Firefox, and WebKit.' }
      ],
      gettingStarted: [
        'Start by feeding Claude a component or page specification and asking it to generate a comprehensive list of test scenarios — including happy paths, edge cases, and error states.',
        'Install Playwright in your project: npm init playwright@latest. Run the example tests to verify your setup works with all three browser engines.',
        'Take an existing manual QA checklist and ask Claude to convert it into Playwright test code. Review the generated tests — they\'ll need adjustments but save 70% of the writing time.',
        'Set up visual regression testing: use Playwright\'s screenshot comparison feature to catch unintended UI changes. Store baseline screenshots in your repo.',
        'Integrate Playwright tests into your CI pipeline. Run the full suite on every PR to catch regressions before they reach staging.'
      ],
      prompts: [
        {
          title: 'Test Case Generator',
          context: 'When you have a feature spec or user story and need comprehensive test coverage.',
          template: 'I have the following feature specification:\\n\\n[paste spec or user story]\\n\\nGenerate a comprehensive test plan including:\\n1. Happy path scenarios\\n2. Edge cases and boundary conditions\\n3. Error handling scenarios\\n4. Accessibility checks\\n5. Performance considerations\\n\\nFor each scenario, provide: description, preconditions, steps, and expected results.'
        },
        {
          title: 'Playwright Test Writer',
          context: 'When you need to turn test scenarios into executable Playwright test code.',
          template: 'Write Playwright test code (TypeScript) for the following test scenarios:\\n\\n[paste test scenarios]\\n\\nThe application uses:\\n- Framework: [React/Vue/etc]\\n- Base URL: [URL]\\n- Authentication: [describe auth flow]\\n\\nUse Page Object Model pattern. Include proper waits, assertions, and error handling. Add comments explaining each test step.'
        }
      ],
      tips: [
        'AI-generated tests are a starting point, not a finished product. Always review locators — AI often guesses at selectors that don\'t match your actual DOM.',
        'Use data-testid attributes in your components. Tell Claude about your naming convention so generated tests use the right selectors from the start.',
        'For visual regression, set a tolerance threshold (usually 0.1-0.5%). Pixel-perfect matching creates too many false positives from font rendering differences.',
        'Claude is excellent at generating test data — ask it to create edge-case datasets (empty strings, unicode, very long inputs, SQL injection attempts) for input validation testing.',
        'Don\'t automate everything. Reserve AI-assisted E2E tests for critical user flows. Use lighter unit/integration tests for component-level logic.',
        'When a bug is reported, ask Claude to write a failing test that reproduces it BEFORE fixing the bug. This ensures regression coverage going forward.'
      ],
      relatedSkills: [2, 4, 6]
    }
  },
  {
    id: 8,
    chapter: '08',
    category: 'PRODUCTIVITY',
    title: 'Meeting & Documentation AI',
    brief: 'Automated meeting summaries, action item extraction, and keeping documentation up to date without manual effort.',
    tools: ['Claude', 'Otter.ai', 'Fireflies'],
    status: 'active',
    lastUpdated: '2026-03-01',
    hasDetail: true,
    detail: {
      overview: [
        'Meetings are where decisions happen — and where information goes to die. At INOVA IT, we lose an estimated 15-20 hours per week across the team to meeting follow-ups: writing summaries, extracting action items, updating project docs, and chasing people who missed what was decided.',
        'AI-powered meeting tools change this equation entirely. Automatic transcription with speaker identification, real-time summarization, and structured action item extraction mean that meetings now generate documentation instead of consuming time to create it afterward.',
        'This skill covers the full meeting-to-documentation pipeline: how to set up recording and transcription tools, how to train them on your team\'s terminology, and how to use Claude to transform raw transcripts into polished documentation that actually gets read.'
      ],
      tools: [
        { name: 'Otter.ai', best: 'Real-time meeting transcription, speaker identification, automated summary generation. Works with Zoom, Google Meet, Teams.', note: 'Best transcription accuracy for English. Enterprise plan required for full team use.' },
        { name: 'Fireflies', best: 'Post-meeting search across all transcripts, CRM integration, automatic action item tracking.', note: 'Great for PM workflows. Slack and Notion integrations are excellent.' },
        { name: 'Claude', best: 'Processing raw transcripts into structured documentation: meeting minutes, decision logs, spec updates, email summaries.', note: 'Use for the "last mile" — transforming transcripts into polished, actionable documents.' }
      ],
      gettingStarted: [
        'Pick one recurring meeting (standup, sprint review, client sync) and set up Otter.ai or Fireflies to record it automatically. Don\'t try to instrument all meetings at once.',
        'After your first recorded meeting, take the transcript and paste it into Claude with the prompt: "Create structured meeting minutes from this transcript with: decisions made, action items (with owners), and open questions."',
        'Compare the AI-generated summary with what you would have written manually. Note what it captured that you might have missed, and what context it lost that you need to add.',
        'Set up a Notion or Confluence template for meeting notes. Use Claude to transform transcripts into your template format — this creates consistency across all team meetings.',
        'After 2 weeks, review the accumulated meeting documentation. You should have a searchable archive of decisions and action items that previously existed only in people\'s heads.'
      ],
      prompts: [
        {
          title: 'Meeting Minutes Generator',
          context: 'When you have a raw meeting transcript and need clean, structured meeting notes.',
          template: 'Transform this meeting transcript into structured meeting notes:\n\n[paste transcript]\n\nFormat as:\n## Meeting: [infer title from content]\n**Date:** [date] | **Attendees:** [list speakers]\n\n### Key Decisions\n- Decision with context\n\n### Action Items\n| Owner | Task | Deadline |\n\n### Discussion Summary\nBrief narrative of key topics\n\n### Open Questions\n- Items needing follow-up'
        },
        {
          title: 'Spec Updater from Discussion',
          context: 'When a meeting resulted in changes to project requirements and the spec document needs updating.',
          template: 'Here is our current specification document:\n\n[paste current spec]\n\nAnd here is a transcript from our latest discussion where changes were decided:\n\n[paste transcript excerpt]\n\nUpdate the specification to reflect the decisions made. For each change:\n1. Mark what changed with [UPDATED]\n2. Add a change note with date and reason\n3. Flag any conflicts with existing requirements'
        }
      ],
      tips: [
        'Always let participants know the meeting is being recorded and transcribed. This is both an ethics requirement and a legal one in many jurisdictions.',
        'AI transcription accuracy drops significantly with heavy accents, cross-talk, and poor audio. Invest in a good conference microphone — it pays for itself in transcript quality.',
        'Don\'t just summarize meetings — extract the decisions. A list of "what was decided" is 10x more valuable than a summary of "what was discussed."',
        'Set up weekly digest emails from your meeting AI tool. Stakeholders who skip meetings can stay informed without asking teammates for recaps.',
        'For client meetings specifically, always have a human review the summary before sharing. AI can misinterpret sarcasm, tentative agreement, or politically sensitive topics.',
        'Use the search-across-meetings feature to resolve "didn\'t we already discuss this?" debates. Being able to find the exact meeting where something was decided saves enormous time.'
      ],
      relatedSkills: [3, 9, 4]
    }
  },
  {
    id: 9,
    chapter: '09',
    category: 'PM',
    title: 'Client Communication',
    brief: 'Drafting client emails, summarizing feedback threads, preparing status updates, and translating technical details for non-technical stakeholders.',
    tools: ['Claude', 'ChatGPT'],
    status: 'active',
    lastUpdated: '2026-03-01',
    hasDetail: true,
    detail: {
      overview: [
        'Communication is the #1 skill that separates good agencies from great ones. At INOVA IT, every PM sends dozens of client-facing messages per week — status updates, requirement clarifications, timeline adjustments, and the dreaded scope change conversations. AI can help you write faster and more consistently without losing your personal voice.',
        'The goal isn\'t to automate client relationships — it\'s to remove the cognitive overhead of writing so you can focus on the relationship itself. When drafting a difficult email takes 2 minutes instead of 20, you\'re more likely to communicate proactively rather than reactively.',
        'This skill covers AI-assisted writing for the full spectrum of client interactions: from casual Slack check-ins to formal project proposals. You\'ll learn how to maintain tone consistency, adapt complexity to your audience, and use AI as a thinking partner for sensitive conversations.'
      ],
      tools: [
        { name: 'Claude', best: 'Long-form communication: project proposals, scope documents, detailed status reports. Excellent at maintaining professional tone while being personable.', note: 'Best for high-stakes communication where nuance matters.' },
        { name: 'ChatGPT', best: 'Quick email drafts, casual Slack messages, brainstorming subject lines. Fast and conversational.', note: 'Good for rapid-fire communication throughout the day.' }
      ],
      gettingStarted: [
        'Start with status updates — they\'re the most repetitive form of client communication. Create a Claude prompt that takes your bullet-point notes and turns them into a polished weekly update.',
        'Build a "tone library" — save 3-4 examples of your best client emails (one friendly, one formal, one delivering bad news, one upselling). Use these as style references when asking AI to draft messages.',
        'Practice the "translate for the audience" workflow: paste a technical Slack thread and ask Claude to summarize it for a non-technical client stakeholder. Compare with what you would have written.',
        'Set up a personal prompt template for each major client. Include their communication preferences, project context, and any relationship dynamics that affect tone.',
        'After a week of AI-assisted drafting, review your sent messages. You should notice higher consistency, fewer typos, and — most importantly — shorter response times to clients.'
      ],
      prompts: [
        {
          title: 'Weekly Status Update',
          context: 'When you need to turn internal project notes into a polished client-facing status report.',
          template: 'Draft a weekly status update email to [client name/role].\n\nProject: [project name]\nTone: [professional but warm / formal / casual]\n\nThis week\'s progress (raw notes):\n[paste bullet points]\n\nBlockers/risks:\n[list any issues]\n\nNext week\'s plan:\n[brief notes]\n\nFormat as a scannable email with clear sections. Keep it under 300 words. End with a specific question or call to action.'
        },
        {
          title: 'Technical-to-Stakeholder Translator',
          context: 'When you need to explain a technical issue or decision to a non-technical client.',
          template: 'Translate this technical information for a non-technical client stakeholder:\n\n[paste technical content — Slack thread, bug report, architecture decision, etc.]\n\nThe client\'s role: [CEO / Marketing Director / Product Owner / etc.]\nWhat they care about: [timeline impact / cost / user experience / etc.]\n\nRewrite this in plain language that:\n1. Leads with the business impact\n2. Explains the "what" without the "how"\n3. Provides clear options if a decision is needed\n4. Avoids jargon entirely'
        }
      ],
      tips: [
        'Never send AI-drafted client communication without editing it. Add one personal touch — reference a previous conversation, include a relevant detail, or adjust the warmth level.',
        'AI is great at diplomatic language but terrible at reading relationships. Only you know if a client needs directness or softening — override the AI\'s tone when your instinct says to.',
        'For scope change conversations, use AI to draft the initial framing but write the key ask yourself. "We need to discuss timeline adjustments" hits differently depending on the relationship.',
        'Keep a shared prompt library for your team. When a PM leaves or is on vacation, others can maintain consistent communication style with their clients.',
        'Use ChatGPT for the first quick draft, then refine in Claude if the stakes are high. This two-step approach is faster than trying to get perfection in one pass.',
        'The best use of AI in client comms isn\'t writing — it\'s preparation. Before a difficult call, ask Claude to anticipate the client\'s likely objections and prepare your responses.'
      ],
      relatedSkills: [3, 8, 4]
    }
  },
  {
    id: 10,
    chapter: '10',
    category: 'REFERENCE',
    title: 'AI Model Comparison & Selection',
    brief: 'When to use which model. Strengths, weaknesses, cost comparison, and recommended use cases for Claude, GPT-4, Gemini, and local models.',
    tools: [],
    status: 'active',
    lastUpdated: '2026-02-28',
    hasDetail: true,
    detail: {
      overview: [
        'Not all AI models are created equal, and choosing the right one for a task can be the difference between a 10-minute win and a 2-hour frustration. At INOVA IT, we work with multiple models — not out of indecision, but because each has genuine strengths that matter for different use cases.',
        'This reference guide is opinionated by design. We\'ve tested these models extensively across real client work — code generation, content writing, analysis, and creative tasks — and we\'re giving you our honest assessment of what works and where each model falls short.',
        'The AI model landscape changes fast. This page is updated whenever a significant model release happens. Check the Updates section for the latest changes and what they mean for your workflow.'
      ],
      tools: [
        { name: 'Claude Opus 4 (Anthropic)', best: 'Complex reasoning, long-form code, detailed analysis, following nuanced instructions.', note: 'Our primary recommendation. Best at maintaining coherence across long conversations.' },
        { name: 'Claude Sonnet 4 (Anthropic)', best: 'Fast code generation, quick analysis, everyday tasks where speed matters more than depth.', note: 'Great balance of speed and quality. Significantly cheaper than Opus.' },
        { name: 'GPT-4o (OpenAI)', best: 'Multi-modal tasks (text + image), fast responses, general-purpose work, DALL-E integration.', note: 'Good all-rounder. Faster than Opus but less precise on complex instructions.' },
        { name: 'GPT-4.5 (OpenAI)', best: 'Deep reasoning tasks, research, and nuanced content where you need the model to "think harder."', note: 'Expensive and slower. Use only when GPT-4o isn\'t cutting it on quality.' },
        { name: 'Gemini 2.0 Pro (Google)', best: 'Massive context windows (1M+ tokens), processing large codebases or documents.', note: 'Good for "dump everything and ask questions" workflows.' },
        { name: 'Local Models (Llama, Mistral)', best: 'Sensitive data that can\'t leave your machine, offline work, experimentation without API costs.', note: 'Quality varies. Not recommended for production-critical work.' }
      ],
      gettingStarted: [
        'Default to Claude Sonnet 4 for everyday tasks — it\'s fast, capable, and cost-effective. Only escalate to Opus when you need complex reasoning.',
        'Use GPT-4o when you need multi-modal capabilities or DALL-E image generation inline.',
        'For large document analysis (100+ page specs, full codebases), try Gemini 2.0 Pro first — its context window handles this better.',
        'Keep sensitive client data off cloud APIs. Use local models for confidential work not covered by enterprise agreements.',
        'Don\'t compare models on "vibes." Run the same prompt through 2-3 models and compare outputs side by side.'
      ],
      prompts: [
        {
          title: 'Model Comparison Test',
          context: 'Use this prompt across multiple models to evaluate which handles a task type best.',
          template: 'I\'m going to give you a [task type] task. Before you begin:\n1. State your understanding of what\'s being asked\n2. Identify any ambiguities\n3. Outline your approach\n4. Then complete the task\n\nTask: [your actual task here]\n\nEvaluate your own confidence in the output on a scale of 1-10 and explain why.'
        }
      ],
      tips: [
        'Claude is better at following complex, multi-layered instructions. GPT-4o is better at casual, conversational tasks.',
        'Model pricing changes frequently. Check current pricing before committing to a model for high-volume workflows.',
        'Don\'t assume the newest model is always the best for your task.',
        'Context window size matters less than you think for most tasks. Be selective about context.',
        'When a model gives you a bad response, try a different model before rewriting the prompt.',
        'All model outputs should be reviewed by a human before going to a client. No exceptions.'
      ],
      relatedSkills: [4, 2, 12]
    }
  },
  {
    id: 11,
    chapter: '11',
    category: 'ADVANCED',
    title: 'Custom GPTs & Automation',
    brief: 'Building reusable AI assistants for recurring tasks. Custom instructions, knowledge bases, and connecting AI to existing tools.',
    tools: ['OpenAI GPTs', 'Claude Projects', 'Zapier'],
    status: 'active',
    lastUpdated: '2026-03-01',
    hasDetail: true,
    detail: {
      overview: [
        'Every team has recurring AI tasks — the same types of code reviews, the same format of meeting notes, the same structure of client proposals. Custom GPTs and Claude Projects let you encode your best prompts, context, and instructions into reusable assistants that anyone on the team can use without AI expertise.',
        'This is where AI moves from "useful tool" to "force multiplier." Instead of each person writing their own prompts from scratch, you build once and share. A well-configured custom assistant with the right context and instructions consistently outperforms ad-hoc prompting — even from experienced users.',
        'This skill covers three tiers of AI customization: lightweight prompt templates (minutes to create), full custom GPTs and Claude Projects (hours to create), and automated workflows connecting AI to your existing tools via Zapier (days to set up, but enormous ongoing time savings).'
      ],
      tools: [
        { name: 'OpenAI GPTs', best: 'Building shareable AI assistants with custom instructions, knowledge files, and optional web browsing/code execution capabilities.', note: 'Requires ChatGPT Plus or Team plan. Shareable via link or GPT Store.' },
        { name: 'Claude Projects', best: 'Team-shared AI workspaces with persistent context, uploaded documents, and custom instructions. Best for knowledge-intensive tasks.', note: 'Enterprise plan recommended for team sharing. Excellent for internal documentation Q&A.' },
        { name: 'Zapier', best: 'Connecting AI to your existing tools: auto-process new emails, generate reports from spreadsheets, create tasks from Slack messages.', note: 'No code required for basic automations. AI actions support Claude and GPT-4.' }
      ],
      gettingStarted: [
        'Start by identifying your team\'s top 3 recurring AI tasks. The best candidates are tasks where: (1) the same prompt structure is used repeatedly, (2) specific context or knowledge is always needed, and (3) multiple people need to do the same thing.',
        'Build your first Custom GPT: go to chat.openai.com → Explore → Create a GPT. Start simple — paste your best prompt as the instruction, upload any reference documents, and test with real tasks from last week.',
        'Create a Claude Project for your team\'s internal documentation. Upload your company wiki, coding standards, and project specs. Set the custom instructions to "Answer questions about INOVA IT processes using only the uploaded documentation."',
        'For automation, start with a simple Zapier workflow: "When a new email arrives with \'proposal request\' in the subject, use AI to draft a response outline and post it to the #proposals Slack channel."',
        'After building 2-3 custom assistants, create a team directory — a shared document listing all available custom GPTs and Claude Projects with descriptions, links, and when to use each one.'
      ],
      prompts: [
        {
          title: 'Custom GPT System Prompt',
          context: 'When setting up a reusable Custom GPT for a specific recurring task.',
          template: 'You are [role name], a specialized AI assistant for [team/department] at INOVA IT.\n\nYour purpose: [specific task description]\n\nContext you always have access to:\n- [uploaded doc 1: what it contains]\n- [uploaded doc 2: what it contains]\n\nWhen users interact with you:\n1. Always ask for [required inputs] before starting\n2. Format output as [specific format]\n3. Follow these rules: [list constraints]\n4. Never [list restrictions]\n\nTone: [professional/casual/technical]\nOutput length: [brief/detailed/user asks]'
        },
        {
          title: 'Zapier AI Automation Design',
          context: 'When planning a new AI-powered automation workflow before building it in Zapier.',
          template: 'I want to automate the following workflow:\n\nTrigger: [what starts the automation — new email, Slack message, calendar event, etc.]\nInput data: [what information is available from the trigger]\nAI processing needed: [what the AI should do with the input]\nOutput destination: [where the result should go — Slack, email, Notion, etc.]\nOutput format: [how the result should be structured]\n\nDesign a step-by-step Zapier workflow for this. Include:\n1. Exact trigger configuration\n2. Any data formatting steps needed before AI processing\n3. The AI prompt (optimized for automation context)\n4. Output formatting and destination configuration\n5. Error handling for cases where AI output is unexpected'
        }
      ],
      tips: [
        'The #1 mistake with Custom GPTs is making them too general. A GPT that "helps with marketing" is useless. A GPT that "generates social media captions for B2B SaaS products in our brand voice" is gold.',
        'Always upload real examples as knowledge files. Custom GPTs with 5-10 examples of desired output dramatically outperform those with only instructions.',
        'Claude Projects are better than Custom GPTs for knowledge-heavy tasks because Claude handles long documents more reliably. Use Projects for documentation Q&A, spec review, and policy compliance checking.',
        'Start Zapier automations with a manual approval step. Once you trust the AI output quality (usually after 20-30 successful runs), remove the approval step for full automation.',
        'Version your custom assistants. When you update instructions, note what changed and why. This prevents the "it used to work better" problem.',
        'Share your custom assistants across the team with documentation: what it does, when to use it, what inputs it needs, and known limitations. Adoption dies without documentation.'
      ],
      relatedSkills: [4, 2, 10]
    }
  },
  {
    id: 12,
    chapter: '12',
    category: 'POLICY',
    title: 'AI Security & Data Policy',
    brief: 'What\'s allowed, what\'s not. Data handling rules, confidentiality guidelines, and approved tools list. The company\'s AI usage policy in plain language.',
    tools: [],
    status: 'active',
    lastUpdated: '2026-02-10',
    hasDetail: true,
    detail: {
      overview: [
        'AI tools are powerful, but they come with real data handling risks. Every AI provider processes your inputs differently — some train on your data, some don\'t, some store conversations, some delete them. Knowing the rules isn\'t optional; it\'s part of being a professional.',
        'This page is the plain-language version of our AI usage policy. It covers what tools you can use, what data you can share with AI services, and what requires special approval. When in doubt, default to the more restrictive option.',
        'The policy applies to all INOVA IT employees and contractors. Violations aren\'t just a policy issue — they can have legal and contractual consequences with our clients. Take this seriously.'
      ],
      tools: [
        { name: 'Approved (Enterprise)', best: 'Claude (Anthropic), Cursor — covered by our enterprise agreements. Data is not used for training.', note: 'Safe for internal work and non-confidential client work.' },
        { name: 'Approved (Standard)', best: 'ChatGPT Plus, GitHub Copilot, Midjourney, CodeRabbit, Figma AI — approved for non-confidential work.', note: 'Check individual tool policies for data handling details.' },
        { name: 'Restricted', best: 'Any tool not on the approved list, any tool for confidential/financial/personal data.', note: 'Requires written approval from AI Operations team before use.' }
      ],
      gettingStarted: [
        'Review the approved tools list above. If a tool isn\'t listed, assume it\'s not approved until you get explicit clearance.',
        'Classify your data before choosing a tool: Public (marketing content) → any approved tool. Internal (processes, code) → approved tools. Confidential (client data, financials, PII) → enterprise tools only or local models.',
        'Never paste confidential client data into any AI tool without checking. This includes: client names in certain contexts, financial data, personal information, and contractual details.',
        'If a client asks about our AI usage, be transparent. We have a standard disclosure that covers how we use AI in our work. Ask your PM for the template.',
        'Report any suspected data incidents to the AI Operations team immediately. Early reporting prevents small issues from becoming big problems.'
      ],
      prompts: [
        {
          title: 'Data Classification Check',
          context: 'Before using AI on any client-related work, classify the data.',
          template: 'Before proceeding, classify the sensitivity of the data:\n\n1. PUBLIC — Marketing materials, published content, open-source code\n2. INTERNAL — Internal processes, non-specific code patterns, general project structure\n3. CONFIDENTIAL — Client names (in sensitive contexts), financial data, PII, contractual terms\n\nFor CONFIDENTIAL data, only use enterprise-approved tools or local models.'
        }
      ],
      tips: [
        'When in doubt, don\'t share it. It\'s always easier to explain being cautious than to explain a data breach.',
        'Client NDAs often have specific language about third-party processing. Check before using AI on client projects.',
        'Screenshots and images can contain confidential data too — logos, names, financial figures. Think before pasting.',
        'AI-generated content is not automatically copyrightable in all jurisdictions. For client deliverables, always include human creative input.',
        'Keep your AI conversation history organized. Delete conversations containing sensitive data after you\'re done using them.'
      ],
      relatedSkills: [10, 4, 11]
    }
  }
];

// ==========================================
// TOOLS — Evaluated tools
// ==========================================
export const toolsData = [
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    category: 'LLM',
    status: 'approved',
    description: 'Our primary AI model for code generation, analysis, writing, and complex reasoning tasks. Enterprise agreement in place.',
    bestFor: ['Code generation', 'Long-form analysis', 'Complex instructions', 'Technical writing'],
    usedInSkills: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    tier: 'PRIMARY'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    provider: 'Anysphere',
    category: 'IDE',
    status: 'approved',
    description: 'AI-powered IDE built on VS Code. Multi-file editing, codebase-aware completions, and native Claude integration.',
    bestFor: ['Code editing', 'Multi-file refactoring', 'Codebase navigation', 'Inline completions'],
    usedInSkills: [2, 6],
    tier: 'PRIMARY'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    provider: 'Midjourney Inc.',
    category: 'IMAGE GEN',
    status: 'approved',
    description: 'High-fidelity image generation via Discord. Best-in-class for photorealism, artistic control, and brand visuals.',
    bestFor: ['Brand imagery', 'Photorealism', 'Mood boards', 'Creative exploration'],
    usedInSkills: [1],
    tier: 'PRIMARY'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    provider: 'OpenAI',
    category: 'LLM',
    status: 'approved',
    description: 'General-purpose AI assistant. GPT-4o for speed, GPT-4.5 for depth. Includes DALL-E image generation.',
    bestFor: ['Quick brainstorming', 'General tasks', 'Image generation', 'Multi-modal work'],
    usedInSkills: [3, 9],
    tier: 'SECONDARY'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    provider: 'GitHub / Microsoft',
    category: 'IDE',
    status: 'approved',
    description: 'AI pair-programming tool integrated into VS Code and JetBrains IDEs. Fast inline completions.',
    bestFor: ['Inline completions', 'Boilerplate code', 'Test generation', 'Quick suggestions'],
    usedInSkills: [2],
    tier: 'SECONDARY'
  },
  {
    id: 'dalle',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    category: 'IMAGE GEN',
    status: 'approved',
    description: 'Text-to-image generation with excellent prompt adherence. Best for quick concepts and text in images.',
    bestFor: ['Quick mockups', 'Text in images', 'Concept exploration', 'Rapid iteration'],
    usedInSkills: [1],
    tier: 'SECONDARY'
  },
  {
    id: 'coderabbit',
    name: 'CodeRabbit',
    provider: 'CodeRabbit',
    category: 'CODE REVIEW',
    status: 'approved',
    description: 'AI-powered code review bot for GitHub PRs. Automated pattern detection and consistency checks.',
    bestFor: ['PR reviews', 'Pattern detection', 'Code consistency', 'Review summaries'],
    usedInSkills: [5],
    tier: 'SECONDARY'
  },
  {
    id: 'figma',
    name: 'Figma',
    provider: 'Figma (Adobe)',
    category: 'DESIGN',
    status: 'approved',
    description: 'Primary design tool. Used with AI for design-to-code workflows, token extraction, and spec validation.',
    bestFor: ['UI design', 'Design systems', 'Prototyping', 'Design tokens'],
    usedInSkills: [1, 6],
    tier: 'PRIMARY'
  },
  {
    id: 'playwright',
    name: 'Playwright',
    provider: 'Microsoft',
    category: 'TESTING',
    status: 'approved',
    description: 'Browser automation framework. Used with AI for generating and running automated test suites.',
    bestFor: ['E2E testing', 'Visual regression', 'Test automation', 'Cross-browser testing'],
    usedInSkills: [7],
    tier: 'SECONDARY'
  },
  {
    id: 'flux',
    name: 'Flux',
    provider: 'Black Forest Labs',
    category: 'IMAGE GEN',
    status: 'approved',
    description: 'Open-source image generation model. Self-hosted via ComfyUI for sensitive client work.',
    bestFor: ['On-premise deployment', 'Sensitive data', 'Custom pipelines', 'Cost optimization'],
    usedInSkills: [1],
    tier: 'SPECIALIZED'
  }
];

// ==========================================
// UPDATES — Chronological feed with detail
// ==========================================
export const updates = [
  {
    id: 'update-1',
    date: '2026-03-02',
    title: 'Claude Opus 4.6 Released — What It Means for Us',
    summary: 'Anthropic released Claude Opus 4.6 with significant improvements to code generation accuracy and reasoning depth. Early testing shows 20-30% better performance on our standard code review benchmarks.',
    tag: 'Model update',
    detail: {
      content: [
        'Anthropic has released Claude Opus 4.6, and after a week of internal testing, we can confidently say this is a meaningful upgrade for our workflows.',
        'The biggest improvement is in code generation accuracy. In our testing across 50 representative tasks, Opus 4.6 produced correct, production-ready code on the first attempt about 20-30% more often than Opus 4.',
        'Structured output capabilities are the other headline feature. You can now request specific JSON schemas, and the model will reliably conform to them.'
      ],
      actionItems: [
        'Update your Claude settings to use Opus 4.6 as the default model for complex tasks',
        'Review the updated prompt templates in Skill #04',
        'Sonnet 4 remains the recommended model for quick, everyday tasks',
        'If you\'re using the API, update your model parameter to claude-opus-4.6'
      ],
      affectedSkills: [2, 4, 5, 10]
    }
  },
  {
    id: 'update-2',
    date: '2026-02-18',
    title: 'Cursor 1.0 Stable — Worth Switching To',
    summary: 'Cursor has hit 1.0 stable after months in beta. The AI-powered IDE now supports multi-file editing, improved context awareness, and native Claude integration.',
    tag: 'New tool',
    detail: {
      content: [
        'Cursor 1.0 is officially stable, and after two months of team-wide testing, we\'re adding it to our recommended tools list.',
        'The key differentiator is context awareness. Cursor understands your entire codebase, not just the file you\'re editing.',
        'Multi-file editing is the other killer feature. You can describe a change that spans multiple files, and Cursor will generate all the files in one operation.'
      ],
      actionItems: [
        'Download Cursor from cursor.com',
        'Your VS Code extensions and settings will transfer over automatically',
        'Set Claude as your preferred model in Cursor settings',
        'Check Skill #02 for Cursor-specific prompt patterns'
      ],
      affectedSkills: [2, 6]
    }
  },
  {
    id: 'update-3',
    date: '2026-02-10',
    title: 'Internal Policy Update: Expanded Approved Tools List',
    summary: 'We\'ve expanded the approved AI tools list. Cursor and Claude Projects are now approved for non-confidential client data. Fireflies.ai approved for internal meetings only.',
    tag: 'Policy change',
    detail: {
      content: [
        'Following our quarterly security review, we\'ve updated the approved AI tools list with more flexibility while maintaining data handling standards.',
        'Cursor is now approved for use with non-confidential client data after reviewing their data handling policies.',
        'Claude Projects is approved for internal use and non-confidential client work.',
        'Fireflies.ai is approved for internal meetings only — cannot be used in client meetings without written consent.'
      ],
      actionItems: [
        'Review the full updated policy in Skill #12',
        'Default to the more restrictive category when uncertain',
        'Never use unapproved tools for any client data',
        'Submit requests for new tool evaluations to AI Operations team'
      ],
      affectedSkills: [12]
    }
  },
  {
    id: 'update-4',
    date: '2026-01-28',
    title: 'New Skill Added: Design-to-Code Workflows',
    summary: 'We\'ve documented our AI-assisted workflow for translating Figma designs into code. Covers component generation, design token extraction, and spec validation.',
    tag: 'New skill',
    detail: {
      content: [
        'The design-to-code gap has always been a friction point. We\'ve developed an AI-assisted workflow that reduces it significantly.',
        'The workflow uses Claude to analyze Figma exports and generate React components that closely match the design spec.',
        'We\'ve also integrated design token extraction — automatically generating CSS custom properties from Figma styles.'
      ],
      actionItems: [
        'Read the full workflow guide in Skill #06',
        'Frontend developers should try it on their next component build',
        'Feedback welcome — this is still a v1 workflow',
        'Design team: ensure Figma files use auto-layout and design tokens for best compatibility'
      ],
      affectedSkills: [6, 1, 2]
    }
  },
  {
    id: 'update-5',
    date: '2026-01-15',
    title: 'Midjourney v7 — What\'s Improved for Production Work',
    summary: 'Major improvements to photorealism, text rendering, and consistency across image sets. New --personalize flag for brand-specific aesthetic training.',
    tag: 'Model update',
    detail: {
      content: [
        'Midjourney v7 is a significant update for our creative team, directly addressing our three biggest pain points with v6.',
        'Text rendering is dramatically better — consistently legible for short strings, useful for mockups and social media templates.',
        'The --personalize flag lets you build a preference profile to generate consistently on-brand imagery.'
      ],
      actionItems: [
        'Update your Midjourney subscription if needed — v7 is available on all paid plans',
        'Check the updated prompting guide in Skill #01',
        'Try --personalize: start by rating 200+ image pairs at midjourney.com/rank',
        'Always specify --v 7 explicitly in prompts to avoid version inconsistency'
      ],
      affectedSkills: [1]
    }
  }
];

// ==========================================
// CATEGORIES — For filter pills
// ==========================================
export const categories = [
  'ALL',
  'CREATIVE',
  'DEVELOPMENT',
  'CONTENT',
  'CORE SKILL',
  'WORKFLOW',
  'QA',
  'PM',
  'PRODUCTIVITY',
  'REFERENCE',
  'ADVANCED',
  'POLICY'
];

// Only categories that have active skills
export const activeCategories = (() => {
  const cats = new Set(skills.map(s => s.category));
  return ['ALL', ...Array.from(cats)];
})();

export const navItems = ['Skills', 'Tools', 'Articles'];

export const stats = [
  { value: skills.length, label: 'Skills documented' },
  { value: toolsData.length, label: 'Tools evaluated' },
  { value: updates.length, label: 'Articles posted' }
];
