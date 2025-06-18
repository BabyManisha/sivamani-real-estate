# SivaMani Real Estate - Professional Real Estate Website

A modern, responsive real estate website designed for Siva Ranga Rao Sunkara, featuring rich UI design, lead generation capabilities, and Google Sheets integration.

## 🌟 Features

### Design & UI
- **Rich, Silk-like Design**: Premium gradient backgrounds, smooth animations, and elegant typography
- **Responsive Layout**: Fully responsive design that works on all devices
- **Modern Animations**: Smooth scroll effects, hover animations, and loading transitions
- **Professional Color Scheme**: Sophisticated color palette with gradients and shadows

### Content Sections
- **Agent Profile**: Professional introduction with 20+ years of experience
- **Property Listings**: Categorized properties (Residential, Commercial, Agriculture, Rental)
- **Services**: Comprehensive real estate services with detailed descriptions
- **Testimonials**: Client reviews and social proof
- **Contact Forms**: Lead capture with Google Sheets integration

### Functionality
- **Property Filtering**: Interactive filters for different property types
- **Contact Form**: Form submission with validation and Google Sheets integration
- **WhatsApp Integration**: Direct WhatsApp contact button
- **Smooth Scrolling**: Enhanced navigation experience
- **Mobile Navigation**: Responsive mobile menu

## 🚀 Quick Start

### Prerequisites
- Web server (Apache, Nginx, or local development server)
- Google account for Google Sheets integration

### Installation
1. Clone or download the project files
2. Upload to your web server
3. Configure Google Sheets integration (see setup below)
4. Customize content and images
5. Deploy and test

### Google Sheets Integration Setup

1. **Create a Google Sheet**:
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Add headers: Timestamp, Name, Email, Phone, Interest, Message

2. **Set up Google Apps Script**:
   - In your Google Sheet, go to Extensions > Apps Script
   - Replace the default code with the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.email,
    data.phone,
    data.interest,
    data.message
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy the Script**:
   - Click "Deploy" > "New deployment"
   - Choose "Web app"
   - Set access to "Anyone"
   - Copy the deployment URL

4. **Update the Website**:
   - Open `script.js`
   - Replace `YOUR_SCRIPT_ID` with your actual deployment URL

## 📁 File Structure

```
sivamani-realestate/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── README.md           # This file
└── Images/             # Image assets
    ├── bg.jpeg         # Hero background
    ├── logo.jpeg       # Company logo
    ├── smr.jpeg        # Agent photo
    ├── i1-i6.jpeg      # Property images
    ├── callus.jpeg     # Contact image
    └── favicon.jpeg    # Website favicon
```

## 🎨 Customization

### Colors and Styling
The website uses CSS custom properties for easy customization. Edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    --accent-color: #f39c12;
    --gold-color: #d4af37;
    /* ... other variables */
}
```

### Content Updates
- **Agent Information**: Update the hero section in `index.html`
- **Properties**: Add/remove property cards in the properties section
- **Services**: Modify service descriptions and features
- **Contact Details**: Update phone numbers, email, and address

### Images
Replace images in the `Images/` folder:
- Use high-quality, optimized images
- Maintain aspect ratios for property images
- Ensure images are web-optimized (compressed)

## 📱 SEO Optimization

### Meta Tags
The website includes optimized meta tags for search engines:
- Title with location and keywords
- Description with key services
- Keywords for real estate terms

### Content Structure
- Semantic HTML5 elements
- Proper heading hierarchy
- Alt text for images
- Structured data ready for implementation

### Performance
- Optimized images
- Minified CSS and JavaScript
- Lazy loading for images
- Preloaded critical resources

## 🔧 Additional Features

### Lead Generation
- Contact form with validation
- Property inquiry forms
- WhatsApp integration
- Call-to-action buttons

### Analytics Ready
- Google Analytics integration ready
- Event tracking for form submissions
- Property view tracking
- Contact button click tracking

### Social Media Integration
- WhatsApp floating button
- Social media links in footer
- Share functionality ready

## 📞 Contact Information

**Siva Ranga Rao Sunkara**
- **Phone**: +91 9399965595, +91 8143052789
- **WhatsApp**: +91 8143052789
- **Email**: Sunkarayukeshkumar@gmail.com
- **Address**: 9-105/1, Vaani Enclave, Kankipadu, AP, India - 521151

## 🌍 Service Areas

- **Kankipadu, Vijayawada**
- **Amaravathi**
- **Hyderabad**

## 🏠 Property Types

- **Residential Properties**: Apartments, Villas, Independent Houses
- **Commercial Real Estate**: Office Spaces, Retail, Warehouses
- **Agriculture Lands**: Farmlands, Agricultural Plots
- **Rental Properties**: Residential and Commercial Rentals

## 🛡️ Trust Features

- **100% Legal Documentation**: All properties verified
- **Litigation-Free Properties**: Clean title guarantees
- **20+ Years Experience**: Established track record
- **Local Expertise**: Deep market knowledge

## 📈 Marketing Features

### Content Marketing Ready
- Blog section structure ready
- Market trend articles
- Neighborhood guides
- Home buying/selling tips

### Social Media Content
- Property showcase posts
- Market updates
- Client testimonials
- Local area highlights

### Email Marketing
- Lead nurturing sequences
- Property alerts
- Market updates
- Newsletter templates

## 🔒 Security Features

- Form validation
- XSS protection
- CSRF protection ready
- Secure data transmission

## 🚀 Performance Optimization

- Optimized images
- Minified code
- Lazy loading
- CDN ready
- Caching headers

## 📊 Analytics Integration

Ready for integration with:
- Google Analytics 4
- Google Tag Manager
- Facebook Pixel
- LinkedIn Insight Tag

## 🎯 Conversion Optimization

- Multiple contact points
- Clear call-to-actions
- Trust signals
- Social proof
- Easy navigation

## 🔄 Updates and Maintenance

### Regular Updates
- Property listings
- Market information
- Client testimonials
- Service offerings

### Technical Maintenance
- Security updates
- Performance optimization
- SEO improvements
- Content updates

## 📞 Support

For technical support or customization requests, contact the development team.

---

**Built with ❤️ for SivaMani Real Estate**

*Professional real estate solutions with 20+ years of trust and excellence.*
