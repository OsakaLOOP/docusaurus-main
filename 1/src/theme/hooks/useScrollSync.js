import { useEffect } from 'react';

export default function useScrollSync() {
  useEffect(() => {
    function syncBackgroundScroll() {
      const bgElement = document.querySelector('.full-frame-bg');
      if (!bgElement) return;
      const htmlScrollTop = document.documentElement.scrollTop;
      const bodyScrollTop = document.body.scrollTop;
      const windowScrollY = window.scrollY;

      // Console log these to see which one changes from 0 as you scroll down
      console.log(`HTML: ${htmlScrollTop} | Body: ${bodyScrollTop} | Window: ${windowScrollY}`);
      // --- 1. Determine the Scrolling Element ---
      // We check for window scroll first (most common for modern Docusaurus setups)
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      console.log(scrollTop)
      // Calculate total scrollable height
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight === 0) return; // Prevent division by zero on short or error pages

      // --- 2. Calculate the Scroll Percentage (0 to 1) ---
      const scrollPercent = scrollTop / scrollHeight;

      // --- 3. Map to Background Position (0% to 100%) ---
      // This maps the user's scroll depth to the background image's vertical position.
      const bgPositionPercent = scrollPercent * 100;

      // --- 4. Apply the Position ---
      // Set the X position to center (50%) and the Y position to the synced percentage.
      bgElement.style.backgroundPosition = `50% ${bgPositionPercent}%`;
    }

    // Attach listener
    window.addEventListener('scroll', syncBackgroundScroll);

    // Run initial sync on load to set the correct starting position
    syncBackgroundScroll();

    // Clean up listener on unmount
    return () => {
      window.removeEventListener('scroll', syncBackgroundScroll);
    };
  }, []);
}
