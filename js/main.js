window.addEventListener('scroll', () => {
  const beforeAfter = document.querySelector('.before-after');
  const rect = beforeAfter.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    beforeAfter.classList.add('visible');
  }
});
