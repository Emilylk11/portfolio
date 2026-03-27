/* ═══ SHARED JS — Case study pages ═══ */
document.addEventListener('DOMContentLoaded',()=>{
  // Scroll reveal
  const obs=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}});
  },{threshold:.08,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Mobile menu toggle
  const toggle=document.getElementById('menuToggle');
  const menu=document.getElementById('mobileMenu');
  if(toggle&&menu){
    toggle.addEventListener('click',()=>{
      menu.classList.toggle('open');
      toggle.querySelector('i').classList.toggle('fa-bars');
      toggle.querySelector('i').classList.toggle('fa-times');
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      menu.classList.remove('open');
      toggle.querySelector('i').classList.add('fa-bars');
      toggle.querySelector('i').classList.remove('fa-times');
    }));
  }
});
window.addEventListener('pageshow',e=>{if(e.persisted)document.body.style.opacity='1'});
