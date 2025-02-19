### **Development Documentation for Debugging TypeScript and NPM Issues**

This document provides guidelines and common commands to debug TypeScript compilation issues, npm package problems, and environment-related setup issues. It covers how to troubleshoot common problems encountered during TypeScript compilation, npm dependency installation, and node configuration. This is useful when working with TypeScript in a Node.js environment, especially when things don't behave as expected.

---

### **1. Check TypeScript Version**

To ensure that TypeScript is installed correctly and to verify the version you are using:

```bash
tsc --version
# or
npx tsc --version
```

### **2. Check Global and Local TypeScript Installations**

If you're unsure whether TypeScript is installed globally or locally, use these commands:

- To check for a globally installed TypeScript version:

  ```bash
  npm list -g typescript
  ```

- To check for a locally installed TypeScript version:

  ```bash
  npm list typescript
  ```

### **3. Reinstall TypeScript Locally**

If you're facing issues with TypeScript, you can reinstall it locally to make sure the version you're using is correct:

```bash
npm install typescript --save-dev
```

### **4. Run TypeScript with Explicit Target and Lib Options**

When dealing with ES2015 features like async/await or `Promise`, you may encounter issues related to the target or ES version. To explicitly define the version of ECMAScript that TypeScript compiles to, run:

```bash
npx tsc --target ES2015 --lib ES2015,DOM
```

### **5. Check TypeScript Configuration (`tsconfig.json`)**

If you are unsure whether TypeScript is using the correct settings, you can check the active TypeScript configuration:

```bash
tsc --showConfig
```

This command shows the actual configuration TypeScript is using, including `compilerOptions`, `include`, and `exclude` settings.

### **6. Clean TypeScript Cache**

If you're experiencing unexpected behavior during compilation, TypeScript might be caching build artifacts. You can clean the cache and rebuild the project:

```bash
npx tsc --build --clean
npx tsc
```

### **7. Check NPM Dependency Issues**

If your problem is related to missing or incorrectly installed dependencies, list the top-level dependencies of your project:

```bash
npm list --depth=0
```

This will show you all the dependencies installed in your project, allowing you to see if there are any missing or incorrect versions.

### **8. Reinstall All NPM Packages**

Sometimes dependency issues arise due to missing or corrupted `node_modules` folders. To resolve this, you can delete the existing `node_modules` folder and reinstall all packages:

```bash
rm -rf node_modules
npm install
```

### **9. Clean NPM Cache**

In some cases, npm's cache can cause issues with package installations. You can clean the npm cache with the following command:

```bash
npm cache clean --force
```

### **10. Verify File Inclusion in `tsconfig.json`**

Ensure that the TypeScript compiler is picking up the correct files and directories by checking the `tsconfig.json`. Add or verify that the `include` field contains the correct directories and the `exclude` field excludes unnecessary files:

```json
{
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### **11. Check for Errors in `tsconfig.json`**

If you suspect that there may be an issue in your `tsconfig.json` file, run the following to check for errors in the configuration without generating output files:

```bash
npx tsc --noEmit
```

### **12. Ensure Correct `node_modules` Version**

If you are facing version conflicts in your dependencies, use the following command to view your project’s dependency tree:

```bash
npm ls
```

This will show the entire dependency tree, highlighting any conflicts.

### **13. Force Install Specific Package Versions**

If a specific version of a package is required, you can force the installation of that version by specifying the version number:

```bash
npm install <package-name>@<version>
# Example:
npm install typescript@4.7.4
```

### **14. Check Node Version**

Ensure that the Node.js version you're using is compatible with your project:

```bash
node --version
```

If necessary, update Node.js to a compatible version.

### **15. View TypeScript Errors**

If TypeScript is throwing errors during compilation, you can use the following command to view detailed errors without generating output files:

```bash
npx tsc --noEmit
```

### **16. List Available Scripts in `package.json`**

If you are facing issues with running npm scripts (like `npm run build`), check the available scripts:

```bash
npm run
```

This will list all available npm scripts in your `package.json` file.

## **17. Compile the package**

Compile the package 

```bash
npx tsc
```

### **18. Check for Any Errors in Logs**

If an npm process fails silently, run the following command to get more detailed information:

```bash
npm install --verbose
```

This will provide a verbose output, showing all details of the installation process and any potential issues.

### **19. Force Rebuild the Project**

If you want to force TypeScript to rebuild everything from scratch, run:

```bash
npx tsc --force
```

### **20. change the lib**

Change the lib in the tsconfig if not compiling

"lib": ["ES2015", "DOM"],

Make the tsc compiler if issues happen

---

### **Summary of Debugging Commands**

| Command                                      | Purpose                                                              |
|----------------------------------------------|----------------------------------------------------------------------|
| `tsc --version`                              | Check installed TypeScript version                                      |
| `npm list -g typescript`                     | Check global TypeScript version                                        |
| `npm install typescript --save-dev`          | Reinstall TypeScript locally                                          |
| `npx tsc --target ES2015 --lib ES2015,DOM`   | Compile with explicit ES target and libraries                          |
| `tsc --showConfig`                           | Show current TypeScript configuration                                 |
| `npx tsc --build --clean`                    | Clean and rebuild TypeScript project                                  |
| `npm list --depth=0`                         | Check installed npm dependencies                                      |
| `rm -rf node_modules && npm install`         | Reinstall all npm packages                                            |
| `npm cache clean --force`                    | Clean npm cache                                                       |
| `npx tsc --noEmit`                           | Check for TypeScript errors without emitting output                   |
| `npm ls`                                     | View the full npm dependency tree                                     |
| `npm install <package-name>@<version>`       | Force install a specific package version                              |
| `node --version`                             | Check Node.js version                                                 |
| `npm run`                                    | List all available npm scripts                                        |
| `npm install --verbose`                      | Install dependencies with verbose output                              |
| `npx tsc --force`                            | Force TypeScript to rebuild from scratch                              |

---

## Docker Commands 

Run the docker run command with init.sql file

```bash

docker pull postgres

docker run -d --name postgres-container \
  -e POSTGRES_USER=abhi \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=contact \
  -v $(pwd)/init.sql:/docker-entrypoint-initdb.d/init.sql \
  -p 5432:5432 \
  postgres

docker rm $(docker ps -aq)

```


### Steps 

instructions 
1. install the docker postgresql image ( docker pull postgres )
2. run the image in src dir with init.sql using the command above 
3. Make the package by "npx tsc" 
4. Check the table and relation by using create_db_schema.js
5. Install the package use npm install git@github.com:abhishekprakash256/pgsql-ts-helper.git#branch_name (if branch is needed)


## Developemnt and branch info 

### **Git Branching Strategy for Main, Test, and Feature Branches**

When working on a project with multiple branches like `main`, `test`, and `feature` branches, it is important to follow a structured workflow to maintain stability, enable smooth development, and ensure seamless integration. Below is an ideal branching strategy for handling code efficiently.

---

## **Branching Overview**
1. **`main` (Production Branch)**
   - The most stable branch containing production-ready code.
   - Only well-tested and reviewed code should be merged into `main`.
   - Deployment to production happens from this branch.

2. **`test` (Staging/Testing Branch)**
   - Used for integration testing before merging into `main`.
   - All new features and bug fixes are merged into `test` first.
   - It acts as a buffer between `feature` branches and `main`.
   - Continuous integration (CI) runs automated tests here.

3. **`feature/*` (Development Branches)**
   - Short-lived branches created for specific features or bug fixes.
   - Named descriptively, e.g., `feature/authentication`, `feature/api-refactor`.
   - Developers work on features independently before merging into `test`.

---

## **Workflow Strategy**
### **1. Creating a New Feature Branch**
Every new feature or bug fix should start from the latest `test` branch.

```bash
git checkout test
git pull origin test  # Ensure the latest updates
git checkout -b feature/new-feature
```

Work on your feature, commit changes, and push to remote:

```bash
git add .
git commit -m "Added new feature: X"
git push origin feature/new-feature
```

---

### **2. Merging Feature Branch into `test`**
Once development is complete, create a pull request (PR) from `feature/new-feature` → `test`.

- Ensure code is reviewed.
- Run all tests before merging.

If everything is fine, merge into `test`:

```bash
git checkout test
git pull origin test
git merge feature/new-feature
git push origin test
```

After merging, delete the feature branch:

```bash
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

---

### **3. Merging `test` into `main`**
After multiple features are tested in `test`, merge it into `main`:

```bash
git checkout main
git pull origin main
git merge test
git push origin main
```

This step should be followed by deploying `main` to production.

---

## **Best Practices**
✅ **Keep `main` clean** – Never push directly to `main`; always merge from `test`.  
✅ **Frequent sync** – Regularly update `feature` branches from `test` to prevent merge conflicts.  
✅ **Use descriptive branch names** – Example: `feature/user-auth`, `bugfix/payment-error`.  
✅ **Delete merged branches** – Keep the repository clean by removing feature branches after merging.  
✅ **Code reviews & CI/CD** – Run automated tests on `test` before merging into `main`.  

---

## **Example Git Workflow**
```bash
# Create and work on a feature branch
git checkout test
git pull origin test
git checkout -b feature/new-api
# Work on code...
git add .
git commit -m "Implemented new API feature"
git push origin feature/new-api

# Merge into test after review
git checkout test
git pull origin test
git merge feature/new-api
git push origin test

# Merge tested code into main
git checkout main
git pull origin main
git merge test
git push origin main
```

