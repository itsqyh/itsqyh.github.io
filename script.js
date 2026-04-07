document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const gallery = document.querySelector('.gallery');
  if (gallery) {
    let isDown = false;
    let startX;
    let scrollLeft;

    gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      gallery.style.cursor = 'grabbing';
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => {
      isDown = false;
      gallery.style.cursor = 'grab';
    });

    gallery.addEventListener('mouseup', () => {
      isDown = false;
      gallery.style.cursor = 'grab';
    });

    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 2;
      gallery.scrollLeft = scrollLeft - walk;
    });
  }

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
      document.getElementById('gallery-modal-img').src = this.src;
      document.getElementById('gallery-modal-img').alt = this.alt;
      document.getElementById('gallery-modal').hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('gallery-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.hidden = true;
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.getElementById('gallery-modal').hidden = true;
      document.body.style.overflow = '';
    }
  });
});
