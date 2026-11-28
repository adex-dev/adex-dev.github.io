<script lang="ts">
  import TypingAnimation from "../atom/TypingAnimation.svelte";
</script>

<footer class="default">
  <nav class="footer-links" aria-label="Footer navigation">
    <a href="/">Home</a><a href="/project-list">Projects</a><a
      href="/experience">Experience</a
    ><a href="/blogs">Handbook</a><a href="https://game.akmadnudin.com/">Game</a
    ><a href="mailto:akmadnudin.inc@gmail.com">Contact</a><a
      href="https://github.com/adex-dev"
      target="_blank"
      rel="noopener noreferrer">GitHub</a
    ><a
      href="https://www.linkedin.com/in/akmadnudin"
      target="_blank"
      rel="noopener noreferrer">LinkedIn</a
    >
  </nav>
  <div class="copyright">
    <div class="footer-copy footer-label default">
      © {new Date().getFullYear()} Akmad Nudin. All rights reserved.
    </div>
    <div class="footer-right footer-label default"><TypingAnimation /></div>
  </div>
</footer>
