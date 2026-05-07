# Research Workflow

This workflow outlines the steps for conducting research before starting any implementation.

## Steps
1. **Define Scope**: Identify exactly what part of the system is being researched.
2. **Codebase Exploration**:
   - Use `grep_search` to find relevant keywords, components, or API endpoints.
   - Use `list_dir` to understand folder structures.
3. **Dependency Mapping**:
   - Check `package.json` files in relevant apps/packages.
   - Identify shared components in `packages/ui` or `packages/db`.
4. **Logic Analysis**:
   - Read core files to understand current implementation logic.
   - Look for existing patterns that should be followed.
5. **Documentation**:
   - Record findings in the implementation plan or research notes.
   - Highlight any potential conflicts or breaking changes.
