# GSTflow Website — Setup Guide

## Overview
Your website uses **two services** to make registrations work:
1. **EmailJS** — sends a confirmation email to the person who registers
2. **Google Apps Script** — sends their data to your Google Sheet in real time

Both are **free** for your usage level.

---

## Step 1: Google Sheets (Real-Time Registration Data)

### A. Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it `GSTflow Registrations`
3. In row 1, add these headers:
   ```
   A: Timestamp  |  B: Name  |  C: Email  |  D: Phone  |  E: Clients
   ```

### B. Create the Apps Script
1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.email,
    data.phone || '',
    data.clients
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (name the project anything, e.g. `GSTflow`)
4. Click **Deploy → New Deployment**
5. Type: **Web App**
6. Set **Execute as:** Me
7. Set **Who has access:** Anyone
8. Click **Deploy** → Copy the **Web App URL**
9. Open `waitlist.html` and replace:
   ```
   const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
   ```
   with your URL.

✅ Now every registration appears in your Google Sheet instantly.

---

## Step 2: EmailJS (Auto-Confirmation Email to Registrants)

### A. Create an EmailJS Account
1. Go to [emailjs.com](https://emailjs.com) → Sign Up (free)
2. Connect your Gmail: **Email Services → Add New Service → Gmail**
   - Use `gstfloww@gmail.com`
   - Click **Connect Account** and authorize

### B. Create an Email Template
1. Go to **Email Templates → Create New Template**
2. Template name: `GSTflow Registration Confirmation`
3. Use this template:

**Subject:**
```
You're registered for GSTflow — Welcome aboard! ⚡
```

**Body (HTML recommended):**
```html
<p>Hi {{to_name}},</p>

<p>Thank you for pre-registering for <strong>GSTflow</strong>! You're now on our early access list.</p>

<p>Here's what happens next:</p>
<ol>
  <li>We'll review your registration within 48 hours</li>
  <li>You'll receive a personal email when we're ready to onboard you</li>
  <li>As a founding member, you get <strong>20% off for life</strong></li>
</ol>

<p><strong>Your details:</strong><br/>
Name: {{to_name}}<br/>
Clients managed: {{client_count}}</p>

<p>Questions? Just reply to this email or reach us at <a href="mailto:gstfloww@gmail.com">gstfloww@gmail.com</a></p>

<p>See you soon,<br/>
<strong>We at GSTflow</strong><br/>
⚡ gstfloww@gmail.com</p>
```

4. Under **To Email**, set it to: `{{to_email}}`
5. Save the template

### C. Get Your Keys
1. **Public Key**: Account → API Keys → Public Key
2. **Service ID**: Email Services → your service → Service ID
3. **Template ID**: Email Templates → your template → Template ID

4. Open `waitlist.html` and replace:
```javascript
const EMAILJS_PUBLIC_KEY  = 'YOUR_EMAILJS_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
```

✅ Now every registrant gets a formal confirmation email automatically.

---

## Step 3: Deploy the Website

### Option A: GitHub Pages (Free)
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository named `gstflow-website`
3. Upload all files from the `final/` folder
4. Go to **Settings → Pages → Source: main branch**
5. Your site will be live at `https://yourusername.github.io/gstflow-website`

### Option B: Netlify (Free, Custom Domain)
1. Go to [netlify.com](https://netlify.com) → Sign up
2. Drag and drop the `final/` folder onto the deploy area
3. Your site is live instantly with a `*.netlify.app` URL
4. To connect a custom domain: Site settings → Domain management

### Option C: Vercel (Free, Fast)
1. Go to [vercel.com](https://vercel.com) → Sign up
2. Import your GitHub repo or drag and drop
3. Done — live in 30 seconds

---

## How the Registration Count Works

The count on the website **starts at 128** and increments by 1 every time someone registers on that device (using `localStorage`).

This means:
- Every visitor sees at least 128
- Visitors who registered see their signup counted
- It's a realistic starting count for your launch

When you have real data from your Google Sheet, you can update the `BASE_COUNT` value in `waitlist.html`:
```javascript
const BASE_COUNT = 128; // ← Update this as your real count grows
```

---

## Testing

1. Open `waitlist.html` in a browser (or via a local server)
2. Before you add real API keys, the form works in **demo mode** — it shows the success state without actually sending anything
3. Once you add your keys, test with a real email to confirm everything works

---

## Summary of Keys Needed

| Service | Where to get it | Variable in waitlist.html |
|---------|----------------|--------------------------|
| Google Apps Script | sheets.google.com → Extensions → Apps Script → Deploy | `GOOGLE_SHEET_URL` |
| EmailJS Public Key | emailjs.com → Account → API Keys | `EMAILJS_PUBLIC_KEY` |
| EmailJS Service ID | emailjs.com → Email Services | `EMAILJS_SERVICE_ID` |
| EmailJS Template ID | emailjs.com → Email Templates | `EMAILJS_TEMPLATE_ID` |

**Total cost: ₹0.** All free.
