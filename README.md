# HOP AI Foundation Website

This is the production-ready website for the HOP AI Foundation.

## Setting Up

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add Media Assets:**
   Before running the application, place your assets into the `public/assets/` directory:
   - Place the fallback hero background video at `public/assets/bgvideo.mp4`
   - Place the image frame sequence inside `public/assets/video-frames/`. They should be named sequentially (e.g. `frame-001.jpg`, `frame-002.jpg` ... up to `frame-100.jpg`).

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Production Build:**
   ```bash
   npm run build
   ```
