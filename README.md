# Allysa's Portfolio - React Version

A modern, responsive portfolio website built with React.js, featuring a clean design and smooth user experience.

## Features

- ✨ Modern React.js architecture with reusable components
- 🎨 Preserved original color scheme and design aesthetic
- 📱 Fully responsive design for all devices
- 🎭 Smooth scroll animations and transitions
- 🔄 React Router for navigation
- 📧 Contact form integration with Formspree
- 🎯 Optimized performance and accessibility

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy all assets (images) from the root directory to the `public` folder:
   - All `.png`, `.jpg` files
   - The `gallery` folder with all its contents

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
my-portfolio/
├── public/
│   ├── index.html
│   ├── hero-intro.png
│   ├── line.png
│   ├── footer.png
│   ├── work-1.png, work-2.png, work-3.png
│   ├── 1.png, 2.png, 3.png, 4.png
│   └── gallery/
│       └── (all gallery images)
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── Gallery.js
│   │   ├── About.js
│   │   ├── Projects.js
│   │   ├── Contact.js
│   │   └── ThankYou.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Components

- **Navbar**: Sticky navigation with smooth scroll
- **Hero**: Introduction section with call-to-action
- **Gallery**: Sample works and live project previews
- **About**: Skills, technologies, and experience
- **Projects**: Featured project showcase
- **Contact**: Contact form and social links
- **ThankYou**: Thank you page after form submission

## Color Scheme

The original color scheme has been preserved:
- Background: `rgb(255, 255, 249)` (cream/beige)
- Navbar: `#333` (dark)
- Accent: `#d1b19d` (beige/tan)
- Button: `#65481f` (brown)
- Text: `#4a4a4a` (dark gray)

## Technologies Used

- React 18.2.0
- React Router DOM 6.20.0
- CSS3 with modern features
- Font Awesome icons
- Google Fonts (Poppins, Roboto, Quicksand)

## Notes

- Make sure all image assets are in the `public` folder
- The contact form uses Formspree - ensure the endpoint is configured correctly
- Google Analytics and Tag Manager scripts are included in `public/index.html`

## License

© 2025 Allysa. All Rights Reserved.


