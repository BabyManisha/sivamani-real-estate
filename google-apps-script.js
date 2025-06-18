/**
 * Google Apps Script for SivaMani Real Estate Website
 * This script handles form submissions from the website and saves data to Google Sheets
 */

// Main function to handle POST requests from the website
function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return createErrorResponse('Missing required fields');
    }
    
    // Prepare row data
    var rowData = [
      new Date(), // Timestamp
      data.name,
      data.email,
      data.phone,
      data.interest || 'General Inquiry',
      data.message || '',
      'Website Form', // Source
      'Pending' // Status
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Send email notification (optional)
    sendEmailNotification(data);
    
    // Return success response
    return createSuccessResponse('Data saved successfully');
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return createErrorResponse('Server error: ' + error.message);
  }
}

// Function to handle GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput('SivaMani Real Estate API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Function to create success response
function createSuccessResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: message,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

// Function to create error response
function createErrorResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: message,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

// Function to send email notification
function sendEmailNotification(data) {
  try {
    // Email configuration
    var recipientEmail = 'Sunkarayukeshkumar@gmail.com'; // Replace with your email
    var subject = 'New Website Inquiry - SivaMani Real Estate';
    
    // Create email body
    var emailBody = `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Interest:</strong> ${data.interest || 'General Inquiry'}</p>
      <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-IN')}</p>
      
      <hr>
      <p><em>This inquiry was submitted through the SivaMani Real Estate website.</em></p>
    `;
    
    // Send email
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      htmlBody: emailBody
    });
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

// Function to set up the spreadsheet headers
function setupSpreadsheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  // Set headers
  var headers = [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Interest',
    'Message',
    'Source',
    'Status',
    'Follow-up Date',
    'Notes'
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#f0f0f0');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

// Function to create data validation for status column
function createDataValidation() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  // Create status options
  var statusOptions = ['Pending', 'Contacted', 'Interested', 'Not Interested', 'Closed'];
  
  // Apply data validation to status column (column H)
  var statusRange = sheet.getRange('H2:H');
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(statusOptions, true)
    .setAllowInvalid(false)
    .setHelpText('Select a status for this inquiry')
    .build();
  
  statusRange.setDataValidation(rule);
}

// Function to add conditional formatting
function addConditionalFormatting() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  // Format pending inquiries in yellow
  var pendingRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Pending')
    .setBackground('#fff2cc')
    .setRanges([sheet.getRange('H:H')])
    .build();
  
  // Format contacted inquiries in blue
  var contactedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Contacted')
    .setBackground('#d9e2f3')
    .setRanges([sheet.getRange('H:H')])
    .build();
  
  // Format interested inquiries in green
  var interestedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Interested')
    .setBackground('#d5e8d4')
    .setRanges([sheet.getRange('H:H')])
    .build();
  
  // Format closed inquiries in gray
  var closedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Closed')
    .setBackground('#f2f2f2')
    .setRanges([sheet.getRange('H:H')])
    .build();
  
  // Apply all rules
  var rules = [pendingRule, contactedRule, interestedRule, closedRule];
  sheet.setConditionalFormatRules(rules);
}

// Function to create summary dashboard
function createDashboard() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create dashboard sheet
  var dashboardSheet = spreadsheet.getSheetByName('Dashboard');
  if (!dashboardSheet) {
    dashboardSheet = spreadsheet.insertSheet('Dashboard');
  }
  
  // Clear existing content
  dashboardSheet.clear();
  
  // Get data from main sheet
  var dataSheet = spreadsheet.getActiveSheet();
  var data = dataSheet.getDataRange().getValues();
  
  // Calculate statistics
  var totalInquiries = data.length - 1; // Subtract header row
  var pendingInquiries = 0;
  var contactedInquiries = 0;
  var interestedInquiries = 0;
  var closedInquiries = 0;
  
  // Count by status
  for (var i = 1; i < data.length; i++) {
    var status = data[i][7]; // Status column
    switch(status) {
      case 'Pending':
        pendingInquiries++;
        break;
      case 'Contacted':
        contactedInquiries++;
        break;
      case 'Interested':
        interestedInquiries++;
        break;
      case 'Closed':
        closedInquiries++;
        break;
    }
  }
  
  // Create dashboard content
  var dashboardData = [
    ['SivaMani Real Estate - Inquiry Dashboard'],
    [''],
    ['Total Inquiries:', totalInquiries],
    ['Pending:', pendingInquiries],
    ['Contacted:', contactedInquiries],
    ['Interested:', interestedInquiries],
    ['Closed:', closedInquiries],
    [''],
    ['Last Updated:', new Date().toLocaleString('en-IN')]
  ];
  
  // Set dashboard data
  dashboardSheet.getRange(1, 1, dashboardData.length, 2).setValues(dashboardData);
  
  // Format dashboard
  dashboardSheet.getRange(1, 1, 1, 2).merge();
  dashboardSheet.getRange(1, 1).setFontSize(16).setFontWeight('bold');
  dashboardSheet.autoResizeColumns(1, 2);
}

// Function to send follow-up reminders
function sendFollowUpReminders() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var today = new Date();
  var remindersSent = 0;
  
  // Check each row for pending inquiries older than 24 hours
  for (var i = 1; i < data.length; i++) {
    var timestamp = data[i][0];
    var status = data[i][7];
    var name = data[i][1];
    var phone = data[i][3];
    var interest = data[i][4];
    
    // If status is pending and inquiry is older than 24 hours
    if (status === 'Pending' && (today - timestamp) > 24 * 60 * 60 * 1000) {
      // Send reminder email
      sendFollowUpEmail(name, phone, interest);
      remindersSent++;
      
      // Update status to 'Reminder Sent'
      sheet.getRange(i + 1, 8).setValue('Reminder Sent');
    }
  }
  
  console.log('Follow-up reminders sent: ' + remindersSent);
}

// Function to send follow-up email
function sendFollowUpEmail(name, phone, interest) {
  try {
    var subject = 'Follow-up: Your Property Inquiry - SivaMani Real Estate';
    var emailBody = `
      <h2>Follow-up: Your Property Inquiry</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in our properties. We noticed you inquired about ${interest} and wanted to follow up.</p>
      <p>We have several properties that might match your requirements. Would you like to:</p>
      <ul>
        <li>Schedule a property viewing?</li>
        <li>Receive detailed property information?</li>
        <li>Discuss financing options?</li>
        <li>Get market insights for your area of interest?</li>
      </ul>
      <p>Please contact us at your convenience:</p>
      <p>📞 +91 9399965595<br>
      📱 WhatsApp: +91 8143052789<br>
      📧 Sunkarayukeshkumar@gmail.com</p>
      <p>Best regards,<br>
      Siva Ranga Rao Sunkara<br>
      SivaMani Real Estate</p>
    `;
    
    // Note: You would need to store email addresses to send follow-ups
    // For now, this is a template function
    
  } catch (error) {
    console.error('Error sending follow-up email:', error);
  }
}

// Function to export data to CSV
function exportToCSV() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var csvContent = '';
  
  // Convert data to CSV format
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    for (var j = 0; j < row.length; j++) {
      if (j > 0) csvContent += ',';
      csvContent += '"' + row[j] + '"';
    }
    csvContent += '\n';
  }
  
  // Create file in Google Drive
  var fileName = 'SivaMani_Real_Estate_Inquiries_' + new Date().toISOString().split('T')[0] + '.csv';
  var file = DriveApp.createFile(fileName, csvContent, MimeType.CSV);
  
  return file.getUrl();
}

// Function to set up automated triggers
function setupTriggers() {
  // Delete existing triggers
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });
  
  // Create daily trigger for follow-up reminders
  ScriptApp.newTrigger('sendFollowUpReminders')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
  
  // Create weekly trigger for dashboard update
  ScriptApp.newTrigger('createDashboard')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(8)
    .create();
}

// Function to initialize the entire system
function initializeSystem() {
  setupSpreadsheet();
  createDataValidation();
  addConditionalFormatting();
  createDashboard();
  setupTriggers();
  
  console.log('SivaMani Real Estate system initialized successfully!');
}

// Test function to verify the setup
function testSystem() {
  var testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91 9876543210',
    interest: 'Residential Property',
    message: 'This is a test message'
  };
  
  var mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
} 