/* ═══════════════════════════════════════════════════
   EMILY KUNTZE PORTFOLIO — SHARED JS
   ═══════════════════════════════════════════════════ */

// ═══ Theme ═══
function setTheme(t){document.documentElement.setAttribute('data-theme',t);localStorage.setItem('theme',t)}
function toggleTheme(){setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark')}

document.addEventListener('DOMContentLoaded',()=>{
  const dt=document.getElementById('themeToggle');
  const dm=document.getElementById('themeToggleMob');
  if(dt)dt.addEventListener('click',toggleTheme);
  if(dm)dm.addEventListener('click',toggleTheme);
});

window.matchMedia('(prefers-color-scheme:light)').addEventListener('change',e=>{
  if(!localStorage.getItem('theme'))setTheme(e.matches?'light':'dark');
});

// ═══ Cursor light ═══
const isDesktop=window.matchMedia('(pointer:fine)').matches;
document.addEventListener('DOMContentLoaded',()=>{
  const cl=document.getElementById('cursorLight');
  if(!cl)return;
  if(isDesktop){
    document.addEventListener('mousemove',e=>{cl.style.left=e.clientX+'px';cl.style.top=e.clientY+'px'});
  }else{cl.style.display='none'}
});

// ═══ Nav scroll ═══
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('nav');
  if(nav)nav.classList.toggle('scrolled',scrollY>40);
});

// ═══ Mobile menu ═══
document.addEventListener('DOMContentLoaded',()=>{
  const hb=document.getElementById('hamburger');
  const mo=document.getElementById('mobileOverlay');
  if(!hb||!mo)return;
  hb.addEventListener('click',()=>{
    mo.classList.toggle('open');
    const i=hb.querySelector('i');
    if(i){i.classList.toggle('fa-bars');i.classList.toggle('fa-times')}
  });
  mo.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mo.classList.remove('open');
    const i=hb.querySelector('i');
    if(i&&i.classList.contains('fa-times')){i.classList.add('fa-bars');i.classList.remove('fa-times')}
  }));
});

// ═══ Scroll reveal ═══
document.addEventListener('DOMContentLoaded',()=>{
  const obs=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}});
  },{threshold:.08,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
});

// ═══ Page transitions ═══
document.addEventListener('DOMContentLoaded',()=>{
  document.body.style.opacity='1';
  document.body.style.transition='opacity .35s';

  document.querySelectorAll('a[href]').forEach(a=>{
    const h=a.getAttribute('href');
    if(h&&!h.startsWith('#')&&!h.startsWith('http')&&!h.startsWith('mailto')){
      a.addEventListener('click',e=>{
        e.preventDefault();
        document.body.style.opacity='0';
        document.body.style.transition='opacity .25s';
        setTimeout(()=>location.href=h,250);
      });
    }
  });
});

// ═══════════════════════════════════════════
// INTERACTIVE ENHANCEMENTS (desktop only)
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded',()=>{
  if(!isDesktop)return;

  // ─── Magnetic buttons ───
  document.querySelectorAll('.btn-magnetic').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const rect=btn.getBoundingClientRect();
      const x=e.clientX-rect.left-rect.width/2;
      const y=e.clientY-rect.top-rect.height/2;
      btn.style.transform=`translate(${x*.2}px,${y*.2}px)`;
    });
    btn.addEventListener('mouseleave',()=>{
      btn.style.transform='translate(0,0)';
      btn.style.transition='transform .4s cubic-bezier(.16,1,.3,1)';
      setTimeout(()=>btn.style.transition='',400);
    });
  });

  // ─── Project card 3D tilt ───
  document.querySelectorAll('.p-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const rect=card.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-.5;
      const y=(e.clientY-rect.top)/rect.height-.5;
      card.style.transform=`perspective(800px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave',()=>{
      card.style.transform='perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });

  // ─── Capability card spotlight ───
  document.querySelectorAll('.cap-card').forEach(card=>{
    const spot=card.querySelector('.spotlight');
    if(!spot)return;
    card.addEventListener('mousemove',e=>{
      const rect=card.getBoundingClientRect();
      spot.style.left=(e.clientX-rect.left)+'px';
      spot.style.top=(e.clientY-rect.top)+'px';
    });
  });
});

// ─── Scroll-triggered counter animation ───
document.addEventListener('DOMContentLoaded',()=>{
  const counters=document.querySelectorAll('.metric-value .num');
  if(!counters.length)return;
  let done=false;
  const obs=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting&&!done){
        done=true;
        counters.forEach(c=>{
          const target=parseInt(c.getAttribute('data-target'));
          const duration=1200;
          const start=performance.now();
          function tick(now){
            const elapsed=now-start;
            const progress=Math.min(elapsed/duration,1);
            const eased=1-Math.pow(1-progress,3);
            c.textContent=Math.round(eased*target);
            if(progress<1)requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
        obs.disconnect();
      }
    });
  },{threshold:.5});
  const el=document.querySelector('.hero-metrics');
  if(el)obs.observe(el);
});
