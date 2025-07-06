# GitHub Webhook Auto-Deploy Setup Instructions

This guide will help you set up automatic deployment from GitHub to your 20i hosting so your website updates automatically whenever you push changes.

## 🚀 Overview

When you push changes to GitHub, it will automatically trigger a webhook that pulls the latest changes to your 20i server. No more manual deployment!

## 📋 Prerequisites

- Your website is already connected to GitHub (✅ already done)
- You have access to your GitHub repository settings
- Your 20i hosting supports PHP and shell commands

## 🔧 Step 1: Configure the Webhook Script

### 1.1 Generate a Secret Token

First, you need to create a secret token for security. This can be any random string.

**Easy way to generate a token:**
- Go to: https://www.random.org/strings/?num=1&len=32&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new
- Copy the generated string

### 1.2 Edit the Webhook Script

1. Open the file `webhook-deploy.php` in your repository
2. Find this line:
   ```php
   $SECRET_TOKEN = 'your-secret-token-here-change-this';
   ```
3. Replace `'your-secret-token-here-change-this'` with your generated token:
   ```php
   $SECRET_TOKEN = 'your-actual-secret-token-here';
   ```
4. Save the file

### 1.3 Commit and Push the Changes

```bash
git add webhook-deploy.php
git commit -m "Add webhook deployment script"
git push origin main
```

## 🌐 Step 2: Set Up GitHub Webhook

### 2.1 Go to Your Repository Settings

1. Go to: https://github.com/Devall-Digital/artificial-grass-oldham
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Webhooks**
4. Click **Add webhook**

### 2.2 Configure the Webhook

Fill in the following details:

**Payload URL:** `https://artificial-grass-oldham.com/webhook-deploy.php`

**Content type:** `application/json`

**Secret:** Enter the same secret token you used in Step 1.2

**Which events would you like to trigger this webhook?**
- Select **Just the push event**

**Active:** ✅ Make sure this is checked

### 2.3 Save the Webhook

Click **Add webhook** to save

## 🎯 Step 3: Test the Deployment

### 3.1 Make a Test Change

1. Edit any file in your repository (e.g., add a comment to `index.html`)
2. Commit and push the change:
   ```bash
   git add .
   git commit -m "Test webhook deployment"
   git push origin main
   ```

### 3.2 Check if It Worked

1. **Check GitHub:** Go to your repository → Settings → Webhooks
   - Click on your webhook
   - Look for a green checkmark (✅) next to recent deliveries
   - If there's a red X (❌), click on it to see the error

2. **Check Your Website:** Visit your website to see if the changes appeared

3. **Check the Logs:** Your website will have a `deploy.log` file that shows deployment activity

## 📊 Step 4: Monitor Deployments

### 4.1 View Deployment Logs

Your website will create a `deploy.log` file that records all deployment activity. You can check this file to see:
- When deployments happened
- If they were successful
- Any error messages

### 4.2 GitHub Webhook Status

In your GitHub repository:
1. Go to Settings → Webhooks
2. Click on your webhook
3. Check the "Recent Deliveries" section
4. Green checkmarks = successful deployments
5. Red X's = failed deployments (click to see details)

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Unauthorized: Missing signature"
**Solution:** Make sure the secret token in your `webhook-deploy.php` file matches exactly what you entered in GitHub.

#### Issue 2: "Repository path not found"
**Solution:** The path in the script might be wrong. Double-check the repository path in your 20i control panel.

#### Issue 3: "Git pull failed"
**Solution:** This could be due to:
- File permissions issues
- Uncommitted changes on the server
- Git authentication problems

#### Issue 4: Webhook shows red X in GitHub
**Solution:** 
1. Click on the failed delivery to see the error message
2. Check if your website's `webhook-deploy.php` file is accessible
3. Verify the webhook URL is correct

### Getting Help

If you encounter issues:
1. Check the `deploy.log` file on your website
2. Check the webhook delivery details in GitHub
3. Try the manual deploy button in your 20i control panel first to ensure git pull works

## 🎉 Success!

Once everything is working, your workflow will be:

1. **Edit code** on your laptop
2. **Commit and push** to GitHub
3. **Automatic deployment** happens within seconds
4. **Your website is updated** automatically!

## 📝 Additional Notes

- The webhook only triggers for pushes to the `main` branch
- You can still use the manual deploy button in 20i if needed
- The system is secure - only authenticated requests from GitHub will trigger deployments
- All deployment activity is logged for your reference

## 🔒 Security Features

- **Signature verification:** Only GitHub can trigger deployments
- **Branch checking:** Only main branch pushes trigger deployment
- **Detailed logging:** All activity is recorded
- **Error handling:** Failed deployments are logged and reported

---

**Need help?** If you run into any issues, check the troubleshooting section above or contact support with your `deploy.log` file contents. 