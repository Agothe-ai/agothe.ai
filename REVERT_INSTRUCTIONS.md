# How to Revert Hero Section Changes

## Current State
- **Branch**: `copilot/redesign-landing-page-hero`
- **Commit with changes**: `6d6c7ca`
- **Commit before changes**: `47161ca`

## Option 1: Don't Merge (Recommended)
If you decide you don't want these changes:
1. Simply **don't merge** the pull request
2. Your `main` branch remains unchanged
3. You can safely delete the feature branch

## Option 2: Restore Original File
If the PR is already merged or you want to restore the original on this branch:

```bash
# Restore the original hero.tsx file
git checkout 47161ca -- components/agothe/hero.tsx

# Commit the revert
git commit -m "Revert hero section to original design"

# Push the revert
git push origin copilot/redesign-landing-page-hero
```

## Option 3: Revert the Entire Commit
To completely undo the commit:

```bash
# Revert the commit (creates a new commit that undoes changes)
git revert 6d6c7ca

# Push the revert
git push origin copilot/redesign-landing-page-hero
```

## Option 4: Hard Reset (Use with Caution)
To completely remove the commit from history:

```bash
# WARNING: This rewrites history. Only use if PR not merged!
git reset --hard 47161ca

# Force push (be careful!)
git push --force origin copilot/redesign-landing-page-hero
```

## Option 5: View Original File Without Changing Anything
```bash
# Just view the original file content
git show 47161ca:components/agothe/hero.tsx

# Or compare the changes
git diff 47161ca 6d6c7ca -- components/agothe/hero.tsx
```

## Safety Notes
✅ Your `main` branch is **completely safe** - it has not been touched
✅ All changes are only on the feature branch
✅ Nothing has been merged yet
✅ You can revert at any time

## Need Help?
If you're unsure which option to use:
- **Before merging PR**: Use Option 1 or Option 3
- **After merging PR**: Use Option 2
- **Just testing**: Keep the feature branch and test before merging
