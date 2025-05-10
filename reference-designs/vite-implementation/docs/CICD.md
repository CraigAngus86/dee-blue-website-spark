
# CI/CD Process Documentation

This document outlines the continuous integration and continuous deployment (CI/CD) processes used in the Banks o' Dee FC website project.

## Continuous Integration

Our CI process ensures code quality and prevents integration issues by automatically validating changes before they are merged into the main codebase.

### Workflows

#### Main CI Workflow (`ci.yml`)

This workflow runs on every push to `main` and `development` branches, as well as on all pull requests targeting these branches.

**Steps:**
1. **Checkout** - Retrieves the latest code
2. **Setup Node.js** - Configures the Node.js environment (v18)
3. **Install Dependencies** - Runs `npm ci` to install exact versions of dependencies
4. **Type Check** - Validates TypeScript types with `tsc --noEmit`
5. **Lint** - Checks code style and patterns with ESLint
6. **Build** - Verifies the application builds successfully
7. **Test** - Runs the test suite
8. **Upload Coverage** - Saves test coverage reports as artifacts

#### Pull Request Checks (`pr-checks.yml`)

This workflow enforces PR conventions and manages PR quality:

**Steps:**
1. **Check PR Title** - Enforces semantic commit message format
2. **Check PR Size** - Prevents excessively large PRs (>500 files)

#### Dependency Review (`dependency-review.yml`)

This workflow analyzes dependencies for security vulnerabilities during pull requests:

**Steps:**
1. **Dependency Review** - Scans for vulnerabilities and fails on high-severity issues

### CI Flow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Code Change   │────►│   Pull Request  │────►│   CI Workflow   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │                 │
                                                │  Review & Merge │
                                                │                 │
                                                └─────────────────┘
```

## Continuous Deployment

Our CD process automatically deploys changes to the appropriate environments after they pass CI checks.

### Environments

1. **Development** - Automatically deployed from the `development` branch
2. **Staging** - Manually triggered deployment from `main` branch
3. **Production** - Manually triggered deployment from `main` branch with approval

### Deployment Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Merged to Main │────►│   CI Workflow   │────►│ Manual Approval │
│                 │     │   (Validation)  │     │ (For Production)│
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │                 │
                                                │   Deployment    │
                                                │                 │
                                                └─────────────────┘
```

## Setting Up Local Development

To ensure your local development environment mirrors the CI environment:

1. Use Node.js v18 (as specified in the CI workflow)
2. Run `npm ci` instead of `npm install` to ensure exact dependency versions
3. Before committing, run:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   npm run test
   ```

## Troubleshooting CI Issues

If a CI build fails:

1. Check the specific step that failed in the GitHub Actions interface
2. For test failures, download the coverage artifact for detailed reports
3. For type checking failures, run `npx tsc --noEmit` locally
4. For lint failures, run `npm run lint` locally
