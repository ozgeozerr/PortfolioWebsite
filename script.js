// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.browser-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));

      // Remove active class from all tab contents
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');

      // Show corresponding content
      document.getElementById('tab-' + targetTab).classList.add('active');
    });
  });
});
