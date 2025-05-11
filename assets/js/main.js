// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Load navbar and footer components
  loadComponent('navbar', '../components/navbar.html');
  loadComponent('footer', '../components/footer.html');

  // Initialize About Slide Show
  initializeAboutSlideShow();
});

// Function to load HTML components
function loadComponent(id, url) {
  const element = document.getElementById(id);
  if (element) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        element.innerHTML = data;
        // Initialize sidebar after navbar is loaded
        if (id === 'navbar') {
          initializeSidebar();
        }
      })
      .catch(error => {
        console.error('Error loading component:', error);
      });
  }
}

// Ensure script runs after DOM is fully loaded
function initializeSidebar() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');

  if (hamburger && sidebar && closeBtn) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });

    // Add event listener to sidebar links to close the sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('active');
      });
    });
  } else {
    console.error('Navigation elements not found. Ensure hamburger, sidebar, and close-btn elements are present.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const scrollArrow = document.querySelector('.scroll-arrow');
  const heroSection = document.querySelector('.hero');

  if (scrollArrow && heroSection) {
    scrollArrow.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Apply fade-out effect to the hero section only
      heroSection.style.transition = 'opacity 0.5s ease';
      heroSection.style.opacity = '0';

      // Get the target section ID from the href
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Scroll to the target section after the fade-out
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          // Reset hero section opacity after scrolling
          heroSection.style.opacity = '1';
        }, 500);
      } else {
        console.error(`Target section ${targetId} not found`);
        // Reset hero section opacity if target not found
        heroSection.style.opacity = '1';
      }
    });
  }
});

// Initialize About Slide Show
function initializeAboutSlideShow() {
  const slides = document.querySelectorAll('.about-slide');
  const navBtn = document.querySelector('.about-nav-btn');

  if (!slides.length || !navBtn) {
    console.error('About slides or navigation button not found. Slides:', slides.length, 'Nav Btn:', navBtn);
    return;
  }

  let slideIndex = 0;
  let isTransitioning = false;

  function showSlide(index) {
    if (isTransitioning) return; // Prevent overlap during transition
    isTransitioning = true;

    // First, make sure all slides are ready for transition
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.display = 'flex'; // Ensure slide is ready to transition
      slide.style.opacity = '0'; // Reset opacity
      slide.style.transform = 'translateX(100%)'; // Reset position
    });

    // Activate the current slide
    const currentSlide = slides[index];
    currentSlide.classList.add('active');
    currentSlide.style.opacity = '1';
    currentSlide.style.transform = 'translateX(0)';

    // After transition, hide non-active slides
    setTimeout(() => {
      slides.forEach((slide, i) => {
        if (i !== index) {
          slide.style.display = 'none'; // Hide non-active slides
        }
      });
      isTransitioning = false;
    }, 500); // Match transition duration in CSS

    console.log('Showing slide:', index); // Debug log
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  // Show the first slide immediately
  showSlide(slideIndex);

  // Automatic transition every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000);

  // Manual navigation
  navBtn.addEventListener('click', () => {
    if (isTransitioning) return; // Prevent overlap during transition
    clearInterval(slideInterval); // Prevent overlap with auto-transition
    nextSlide();
    slideInterval = setInterval(nextSlide, 5000); // Restart auto-transition
  });
}

document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('subscriber-email').value;
  const message = document.getElementById('subscription-message');

  if (!email || !email.includes('@')) {
    message.textContent = 'Please enter a valid email address.';
    message.style.color = 'red';
    return;
  }

  // Simulate successful subscription (replace with real API call if needed)
  console.log('Subscribed:', email);
  message.textContent = 'Thank you for subscribing GlowSkin Blog!';
  message.style.color = 'green';

  // Optionally clear input
  document.getElementById('subscriber-email').value = '';
});