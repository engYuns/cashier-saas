# Custom Font Implementation Guide

## How to Add Custom Fonts to Your Cashier System

### Method 1: Local Font Files (Recommended)

#### Step 1: Prepare Your Font Files
1. Convert your font files to web formats:
   - **WOFF2** (best compression, modern browsers)
   - **WOFF** (good compression, broader support)
   - **TTF** (fallback for older browsers)

2. Use online converters like:
   - https://convertio.co/font-converter/
   - https://cloudconvert.com/ttf-to-woff2
   - https://www.fontsquirrel.com/tools/webfont-generator

#### Step 2: Add Font Files
Place your font files in: `frontend/src/assets/fonts/`

Example structure:
```
frontend/src/assets/fonts/
├── CustomEnglish-Regular.woff2
├── CustomEnglish-Regular.woff
├── CustomEnglish-Regular.ttf
├── CustomEnglish-Bold.woff2
├── CustomEnglish-Bold.woff
├── CustomEnglish-Bold.ttf
├── CustomKurdish-Regular.woff2
├── CustomKurdish-Regular.woff
├── CustomKurdish-Regular.ttf
├── CustomKurdish-Bold.woff2
├── CustomKurdish-Bold.woff
└── CustomKurdish-Bold.ttf
```

#### Step 3: Update fonts.css
Edit `frontend/src/assets/fonts/fonts.css` and replace the example font names with your actual font names:

```css
@font-face {
  font-family: 'YourCustomFont';
  src: url('./YourCustomFont-Regular.woff2') format('woff2'),
       url('./YourCustomFont-Regular.woff') format('woff'),
       url('./YourCustomFont-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

#### Step 4: Update CSS Variables
In the same file, update the CSS variables:

```css
:root {
  --font-english: 'YourCustomEnglishFont', Arial, sans-serif;
  --font-kurdish: 'YourCustomKurdishFont', 'Noto Sans Arabic', Arial, sans-serif;
}
```

### Method 2: Google Fonts (Easiest)

#### Step 1: Find Your Font
Go to https://fonts.google.com and select your desired fonts.

#### Step 2: Update CSS Files
Replace the Google Fonts imports in App.css and SuperAdminDashboard.css:

```css
@import url('https://fonts.googleapis.com/css2?family=YourChosenFont:wght@400;700&display=swap');
```

#### Step 3: Update Font Variables
```css
:root {
  --font-english: 'YourChosenFont', Arial, sans-serif;
  --font-kurdish: 'YourChosenKurdishFont', Arial, sans-serif;
}
```

### Method 3: CDN Fonts

#### Step 1: Find CDN Link
Get the CDN link for your font (Adobe Fonts, Font Awesome, etc.)

#### Step 2: Add to index.html
Add to `frontend/public/index.html`:

```html
<link rel="stylesheet" href="YOUR_CDN_FONT_LINK">
```

#### Step 3: Update CSS Variables
Follow the same CSS variable approach as above.

### Font Performance Tips

1. **Use font-display: swap** - Shows fallback font while custom font loads
2. **Preload important fonts** - Add to index.html:
   ```html
   <link rel="preload" href="/src/assets/fonts/YourFont.woff2" as="font" type="font/woff2" crossorigin>
   ```
3. **Optimize file sizes** - Use WOFF2 format for best compression
4. **Subset fonts** - Include only characters you need

### Testing Your Fonts

1. Clear browser cache
2. Check Developer Tools > Network tab to see if fonts load
3. Test both English and Kurdish text
4. Verify fallback fonts work if custom fonts fail to load

### Troubleshooting

- **Font not loading**: Check file paths and formats
- **Wrong direction**: Ensure RTL/LTR classes are applied correctly
- **Performance issues**: Optimize font files and use font-display: swap
- **Fallback not working**: Check CSS variable definitions

### Current Implementation

Your system now supports:
- CSS variables for easy font management
- Automatic fallbacks to Google Fonts and system fonts
- Separate styling for English and Kurdish text
- RTL support for Kurdish content
- Font optimization with font-display: swap
