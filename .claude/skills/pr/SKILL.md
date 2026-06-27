---
name: pr
description: Open a GitHub pull request whose title follows the Conventional Commits spec. Use when the user asks to create a PR, open a pull request, or run /pr.
---

# Create a Pull Request with a Conventional Commit title

Open a pull request for the current branch against `master`, deriving the PR
title from the branch's changes using the [Conventional Commits](https://www.conventionalcommits.org/)
format.

## Steps

1. **Gather context.** Run these to understand the branch and its changes:
   - `git branch --show-current` — confirm you're not on `master`.
   - `git fetch origin master` then `git log origin/master..HEAD --oneline` — the
     commits unique to this branch.
   - `git diff origin/master...HEAD --stat` and skim the actual diff so the title
     reflects what really changed.
   - If there are uncommitted changes the user wants included, stage and commit
     them first (ask if unsure).

2. **Push the branch** if it has no upstream: `git push -u origin HEAD`.

3. **Compose the title** as a Conventional Commit:

   ```
   <type>[optional scope][!]: <description>
   ```

   - **type** — pick the one that best describes the *primary* change:
     - `feat` — a new feature or capability
     - `fix` — a bug fix
     - `docs` — documentation only
     - `style` — formatting/whitespace, no code-meaning change
     - `refactor` — code change that neither fixes a bug nor adds a feature
     - `perf` — performance improvement
     - `test` — adding or correcting tests
     - `build` — build system or dependencies
     - `ci` — CI configuration
     - `chore` — maintenance, tooling, housekeeping
     - `revert` — reverts a previous commit
   - **scope** (optional) — a noun in parentheses naming the affected area, e.g.
     `feat(recipes):`. Use the page/section/module touched when it adds clarity.
   - **description** — imperative mood, lowercase first letter, no trailing
     period, ≤ 72 chars total. "add recipe photo gallery", not "Added a gallery."
   - Append `!` after the type/scope (e.g. `feat!:`) for a breaking change, and
     note it in the body.

   When the branch spans multiple change types, choose the type of the most
   significant change and describe the rest in the body.

4. **Write the body** with a short summary of what and why. Include a brief
   bullet list of notable changes when there's more than one. End the body with:

   ```
   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   ```

5. **Create the PR:**

   ```bash
   gh pr create --base master --title "<conventional title>" --body "<body>"
   ```

   Then report the PR URL back to the user.

## Examples

| Changes | Title |
| --- | --- |
| New recipes collection page | `feat(recipes): add recipes content collection` |
| Fixed broken nav link on mobile | `fix(nav): correct clickable area on nav button` |
| Updated README setup steps | `docs: update local development instructions` |
| Reworked home layout, no new feature | `refactor(home): restructure layout into square photo grid` |
