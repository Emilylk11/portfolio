/* ═══ CASE STUDY JS ═══ */

document.addEventListener('DOMContentLoaded',()=>{

  // ─── Before / After toggle ───
  const baBtns=document.querySelectorAll('.ba-btn');
  const baImgs=document.querySelectorAll('.ba-img');
  baBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      baBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const show=btn.getAttribute('data-show');
      baImgs.forEach(img=>{
        img.classList.toggle('hidden',img.getAttribute('data-state')!==show);
      });
    });
  });

  // ─── Lightbox gallery ───
  const thumbs=document.querySelectorAll('.assets-grid img');
  if(thumbs.length){
    // Create lightbox
    const lb=document.createElement('div');
    lb.className='lightbox';
    lb.innerHTML=`
      <div class="lightbox-inner">
        <button class="lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
        <img src="" alt="Gallery preview">
        <button class="lightbox-nav lightbox-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
      </div>`;
    document.body.appendChild(lb);

    const lbImg=lb.querySelector('img');
    const lbClose=lb.querySelector('.lightbox-close');
    const lbPrev=lb.querySelector('.lightbox-prev');
    const lbNext=lb.querySelector('.lightbox-next');
    let idx=0;

    function openLb(i){idx=i;lbImg.src=thumbs[idx].src;lbImg.alt=thumbs[idx].alt||'';lb.classList.add('open');document.body.style.overflow='hidden'}
    function closeLb(){lb.classList.remove('open');document.body.style.overflow=''}
    function nextLb(){openLb((idx+1)%thumbs.length)}
    function prevLb(){openLb((idx-1+thumbs.length)%thumbs.length)}

    thumbs.forEach((t,i)=>{t.style.cursor='zoom-in';t.addEventListener('click',()=>openLb(i))});
    lbClose.addEventListener('click',closeLb);
    lbNext.addEventListener('click',nextLb);
    lbPrev.addEventListener('click',prevLb);
    lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});
    document.addEventListener('keydown',e=>{
      if(!lb.classList.contains('open'))return;
      if(e.key==='Escape')closeLb();
      if(e.key==='ArrowRight')nextLb();
      if(e.key==='ArrowLeft')prevLb();
    });
  }

  // ─── Result counters ───
  const counters=document.querySelectorAll('.result-stat .counter');
  if(counters.length){
    let done=false;
    const obs=new IntersectionObserver(es=>{
      es.forEach(e=>{
        if(e.isIntersecting&&!done){
          done=true;
          counters.forEach(c=>{
            const target=parseFloat(c.getAttribute('data-target'));
            const isDecimal=String(target).includes('.');
            const duration=1200;
            const start=performance.now();
            function tick(now){
              const elapsed=now-start;
              const progress=Math.min(elapsed/duration,1);
              const eased=1-Math.pow(1-progress,3);
              const val=eased*target;
              c.textContent=isDecimal?val.toFixed(1):Math.round(val);
              if(progress<1)requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          });
          obs.disconnect();
        }
      });
    },{threshold:.3});
    const rg=document.querySelector('.results-grid');
    if(rg)obs.observe(rg);
  }

  // ─── Process step spotlights (desktop) ───
  if(window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.process-step').forEach(step=>{
      const spot=step.querySelector('.spotlight');
      if(!spot)return;
      step.addEventListener('mousemove',e=>{
        const rect=step.getBoundingClientRect();
        spot.style.left=(e.clientX-rect.left)+'px';
        spot.style.top=(e.clientY-rect.top)+'px';
      });
    });
  }

});
