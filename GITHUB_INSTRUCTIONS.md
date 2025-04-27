# GitHub Push Instructions

Follow these steps to push your TextConverter project to GitHub:

## 1. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" button in the top right corner and select "New repository"
3. Name the repository "TextConverter"
4. Make sure it's set to "Public"
5. Do not initialize the repository with a README, .gitignore, or license (as we already have these files)
6. Click "Create repository"

## 2. Push Your Code to GitHub

After creating the repository, GitHub will show you commands to push your existing repository. You can use the following commands:

```bash
# You've already done these steps:
# git init
# git add .
# git commit -m "Initial commit"
# git branch -M main

# Add the remote repository URL
git remote add origin https://github.com/prathamhanda/TextConverter.git

# Push your code to GitHub
git push -u origin main
```

## 3. Authenticate with GitHub

When pushing for the first time, GitHub will prompt for authentication. You need to use a personal access token instead of a password:

1. Generate a personal access token:
   - Go to GitHub settings > Developer settings > Personal access tokens
   - Click "Generate new token" (classic)
   - Give it a name, set expiration, and select at least the "repo" scope
   - Copy the generated token

2. When prompted for a password, paste your personal access token.

## 4. Verify Your Repository

1. After pushing, refresh your GitHub page
2. You should see your code in the TextConverter repository
3. The repository should have all the files including both client and server folders 