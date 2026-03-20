<!-- 
SYNC IMPACT REPORT
Version change: Template -> v1.1.0
Modified principles:
- [PRINCIPLE_1_NAME] -> I. Ultra Fast Response
- [PRINCIPLE_2_NAME] -> II. Minimalist UI
- [PRINCIPLE_3_NAME] -> III. Storage Discipline
- [PRINCIPLE_4_NAME] -> IV. Aggressive Caching
- [PRINCIPLE_5_NAME] -> V. Clean API Contracts & Simple Flows
Added sections: None
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md (✅ updated)
- .specify/templates/spec-template.md (✅ updated)
- .specify/templates/tasks-template.md (✅ updated)
Follow-up TODOs: None
-->
# Speckit Constitution

## Core Principles

### I. Ultra Fast Response
Target sub-500ms for all user interactions and API calls. Performance is a core requirement; any feature that compromises this target must be re-evaluated or optimized.

### II. Minimalist UI
Zero unnecessary dependencies. Use vanilla CSS and JS wherever possible. Every pixel and every byte must justify its existence. No UI bloat.

### III. Storage Discipline
No database unless strictly required. Favor ephemeral state, client-side storage, or flat files. If a database is used, it must be justified by complex relational requirements that cannot be solved simpler.

### IV. Aggressive Caching
Cache external API responses aggressively to minimize latency and improve reliability. External dependency failures or delays should not degrade the core user experience whenever cached data can suffice.

### V. Clean API Contracts & Simple Flows
Predictable, strongly typed, and version-neutral interfaces. User flows must be linear and predictable with minimal friction. Avoid complex branching logic in UX.

## Performance Standards

### Latency Targets
- API Response: < 200ms (p95)
- Time to Interactive: < 500ms
- Cache Hit Ratio: > 80% for external data

## Development Workflow

### Performance-First Review
All Pull Requests must be evaluated for performance impact. If a change increases latency by more than 10%, it requires a performance justification or optimization.

## Governance

This constitution supersedes all other practices. Amendments require documentation in a Sync Impact Report, a version bump, and a migration plan for existing code if applicable.

**Version**: 1.1.0 | **Ratified**: 2026-03-20 | **Last Amended**: 2026-03-20
