# Quick GitHub Webhook Setup

## 🚀 Essential Steps for Auto-Deployment

### 1. Generate Secret Token
- Go to: https://www.random.org/strings/?num=1&len=32&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new
- Copy the generated string

### 2. Edit webhook-deploy.php
- Replace `'your-secret-token-here-change-this'` with your generated token
- Commit and push changes

### 3. Set Up GitHub Webhook
- Go to: https://github.com/Devall-Digital/artificial-grass-oldham/settings/hooks
- Click "Add webhook"
- **Payload URL:** `https://artificial-grass-oldham.com/webhook-deploy.php`
- **Content type:** `application/json`
- **Secret:** Your generated token
- **Events:** Just the push event
- Click "Add webhook"

### 4. Test
- Make a small change to any file
- Commit and push
- Check your website - changes should appear automatically!

## 🔍 Check Status
- **GitHub:** Settings → Webhooks → Recent Deliveries
- **Website:** Check `deploy.log` file
- **Green checkmark = Success!**

---

**Full instructions:** See `WEBHOOK_SETUP_INSTRUCTIONS.md` 