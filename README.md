# Abraham — Portfolio Website

A modern, responsive single-page portfolio website built with HTML5, CSS3, JavaScript, Bootstrap 5, and Tailwind CSS.

## Features

- Responsive mobile-first design
- Dark/Light theme toggle with localStorage persistence
- Smooth scrolling navigation
- Animated typing effect in hero section
- Scroll-triggered animations (fade-in, skill bars, counters)
- Portfolio filtering by category
- Testimonial carousel with auto-slide
- Contact form with client-side validation
- Scroll progress bar
- Back-to-top button
- SEO optimized with Open Graph and Schema markup

## File Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── style.css           # Main stylesheet (all custom styles)
│   ├── bootstrap-custom.css # Bootstrap overrides
│   └── tailwind-custom.css  # Tailwind utility-like helpers
├── js/
│   ├── main.js             # Core functionality (nav, theme, carousel, filter, typing)
│   ├── animations.js       # Scroll animations, skill bars, counter animation
│   └── form-validation.js  # Contact form validation and submission
├── assets/
│   ├── images/             # Place your images here
│   ├── icons/              # Custom icons
│   └── fonts/              # Custom fonts
└── README.md               # This file
```

## Deployment Instructions

### Option 1: Static Hosting (Recommended)

1. **Netlify**
   - Drag-and-drop the `portfolio` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or connect a Git repository for continuous deployment

2. **Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the project directory and follow prompts

3. **GitHub Pages**
   - Push to a GitHub repository
   - Go to Settings > Pages > Source: main branch, root folder

4. **Traditional Hosting**
   - Upload all files via FTP to your web host's public_html directory

### Option 2: Local Testing

Open `index.html` directly in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

## Customization

1. **Personal Info**: Edit `index.html` — update name, bio, email, social links
2. **Profile Photo**: Replace hero avatar icon with `<img>` in hero and about sections
3. **Projects**: Add/remove project cards in the projects section
4. **Skills**: Adjust skill percentages via `data-progress` attributes
5. **Colors**: Modify CSS variables in `css/style.css` under `:root`

## Performance Optimization Tips

- Compress images using tools like TinyPNG or Squoosh
- Enable gzip compression on your server
- Use a CDN for libraries (already configured via CDN links)
- Minify CSS and JS for production
- Lazy load below-the-fold images
- Use browser caching headers

## SEO Checklist

- [ ] Meta description updated
- [ ] Open Graph tags configured with actual URLs
- [ ] Schema markup updated with real info
- [ ] Alt text added to all images
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Semantic HTML elements used
- [ ] Sitemap.xml generated (for production)
- [ ] robots.txt configured

## Hosting Recommendations

| Provider      | Pricing     | Best For          |
|---------------|-------------|-------------------|
| Netlify       | Free tier   | Static sites, JAMstack |
| Vercel        | Free tier   | Static sites, frontend |
| GitHub Pages  | Free        | Open source projects |
| Cloudflare Pages | Free    | Global performance |
| Hostinger     | $2-3/mo     | Traditional hosting |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari & Chrome
