# Google Sheets Integration Setup Guide

## 📋 Overview
This guide will help you set up Google Sheets integration for the SivaMani Real Estate website. When visitors submit the contact form, their information will be automatically saved to a Google Sheet and you'll receive email notifications.

## 🚀 Step-by-Step Setup

### Step 1: Create a Google Sheet

1. **Go to Google Sheets**
   - Visit [sheets.google.com](https://sheets.google.com)
   - Sign in with your Google account

2. **Create a New Spreadsheet**
   - Click the "+" button to create a new spreadsheet
   - Name it "SivaMani Real Estate - Website Inquiries"

3. **Set Up Headers**
   - In the first row, add these headers:
     ```
     A1: Timestamp
     B1: Name
     C1: Email
     D1: Phone
     E1: Interest
     F1: Message
     G1: Source
     H1: Status
     I1: Follow-up Date
     J1: Notes
     ```

4. **Format Headers**
   - Select row 1 (A1:J1)
   - Make text bold
   - Add background color (light gray)
   - Freeze the first row

### Step 2: Set Up Google Apps Script

1. **Open Apps Script**
   - In your Google Sheet, go to **Extensions** > **Apps Script**
   - This will open a new tab with the Apps Script editor

2. **Replace Default Code**
   - Delete all existing code in the editor
   - Copy and paste the entire content from `google-apps-script.js` file
   - Save the project (Ctrl+S or Cmd+S)
   - Name it "SivaMani Real Estate - Form Handler"

3. **Deploy the Script**
   - Click the **Deploy** button
   - Select **New deployment**
   - Choose **Web app** as the type
   - Set the following options:
     - **Execute as**: Me (your email)
     - **Who has access**: Anyone
   - Click **Deploy**
   - Click **Authorize access** when prompted
   - Grant necessary permissions

4. **Copy the Web App URL**
   - After deployment, you'll get a URL like:
     ```
     https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
     ```
   - Copy this URL - you'll need it for the website

### Step 3: Update the Website

1. **Open script.js**
   - In your website files, open `script.js`

2. **Update the Google Sheets URL**
   - Find this line:
     ```javascript
     const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
     ```
   - Replace `YOUR_SCRIPT_ID` with the actual URL from Step 2

3. **Save and Upload**
   - Save the file
   - Upload the updated file to your web server

### Step 4: Test the Integration

1. **Test the Form**
   - Go to your website
   - Fill out the contact form
   - Submit the form
   - Check if data appears in your Google Sheet

2. **Check Email Notifications**
   - Verify you receive email notifications for new submissions
   - Check your spam folder if you don't see them

## 🔧 Advanced Configuration

### Customizing Email Notifications

1. **Update Email Address**
   - In the `google-apps-script.js` file, find:
     ```javascript
     var recipientEmail = 'Sunkarayukeshkumar@gmail.com';
     ```
   - Change to your preferred email address

2. **Customize Email Content**
   - Modify the `sendEmailNotification` function
   - Update subject line, email body, or add more recipients

### Setting Up Automated Features

1. **Initialize the System**
   - In Apps Script, run the `initializeSystem()` function
   - This will set up data validation, conditional formatting, and dashboard

2. **Set Up Triggers**
   - The system will automatically create triggers for:
     - Daily follow-up reminders
     - Weekly dashboard updates

### Creating a Dashboard

1. **Run Dashboard Function**
   - In Apps Script, run `createDashboard()`
   - This creates a summary sheet with statistics

2. **Customize Dashboard**
   - Modify the `createDashboard()` function
   - Add more metrics or change the layout

## 📊 Managing Inquiries

### Status Management
- **Pending**: New inquiries that need attention
- **Contacted**: You've reached out to the client
- **Interested**: Client is interested in properties
- **Not Interested**: Client declined
- **Closed**: Deal completed or inquiry closed

### Follow-up Process
1. Check the Google Sheet daily for new inquiries
2. Update status as you contact clients
3. Add notes in the Notes column
4. Use the dashboard to track progress

### Exporting Data
- Run `exportToCSV()` function to export data
- Useful for backup or analysis

## 🛠️ Troubleshooting

### Common Issues

1. **Form Not Working**
   - Check if the Google Sheets URL is correct
   - Verify the Apps Script is deployed
   - Check browser console for errors

2. **No Email Notifications**
   - Check spam folder
   - Verify email address in the script
   - Check Apps Script logs for errors

3. **Data Not Saving**
   - Check Apps Script execution logs
   - Verify spreadsheet permissions
   - Test with the `testSystem()` function

### Debugging Steps

1. **Check Apps Script Logs**
   - In Apps Script, go to **Executions**
   - View recent executions and logs

2. **Test the API**
   - Use the `doGet()` function to test if the script is running
   - Visit the web app URL in browser

3. **Validate Data**
   - Check if form data is being sent correctly
   - Verify required fields are present

## 🔒 Security Considerations

### Permissions
- The script only has access to the specific spreadsheet
- No other Google Drive files are accessible
- Users can only submit data, not read existing data

### Data Protection
- All form submissions are logged with timestamps
- Email notifications help track all inquiries
- Regular backups via CSV export

## 📈 Analytics and Reporting

### Built-in Analytics
- Total inquiries count
- Status distribution
- Response time tracking
- Source tracking (website form)

### Custom Reports
- Modify the dashboard function
- Add charts and graphs
- Create monthly/weekly summaries

## 🔄 Maintenance

### Regular Tasks
- Check for new inquiries daily
- Update inquiry statuses
- Review dashboard statistics
- Export data monthly

### Updates
- Keep the Apps Script code updated
- Monitor for any Google API changes
- Test functionality regularly

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Apps Script logs
3. Test with the provided test functions
4. Contact technical support if needed

---

**Note**: This integration requires a Google account and basic familiarity with Google Sheets. The setup process takes approximately 15-30 minutes to complete. 