(function(){
  const y = document.getElementById('y'); if(y) y.textContent = new Date().getFullYear();


  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const inc = document.getElementById('font-inc');
  const dec = document.getElementById('font-dec');

  const savedTheme = localStorage.getItem('dj_theme') || 'dark';
  const savedFs = localStorage.getItem('dj_fs') || '16';
  if(savedTheme === 'light') root.classList.add('light');
  root.style.setProperty('--fs', savedFs + 'px');

  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem('dj_theme', root.classList.contains('light') ? 'light' : 'dark');
    });
  }
  function setFs(n){ const v = Math.min(22, Math.max(14, n)); root.style.setProperty('--fs', v+'px'); localStorage.setItem('dj_fs', String(v)); }
  if(inc) inc.addEventListener('click', () => setFs(parseInt(getComputedStyle(root).getPropertyValue('--fs')) + 1));
  if(dec) dec.addEventListener('click', () => setFs(parseInt(getComputedStyle(root).getPropertyValue('--fs')) - 1));


  const grid = document.getElementById('courses-grid');
  if(grid){
    const courses = [
      {title:'HTML & CSS do Zero', cat:'Front-end', desc:'Semântica, layout e responsividade.', price:0},
      {title:'JavaScript Essencial', cat:'Front-end', desc:'DOM, eventos, APIs, módulos.', price:139},
      {title:'Back-end com Node.js', cat:'Back-end', desc:'Express, REST e persistência.', price:199},
      {title:'Lógica de Programação', cat:'Carreira', desc:'Algoritmos, funções e desafios.', price:0},
      {title:'Introdução a Dados', cat:'Dados', desc:'CSV, exploração e visualização.', price:179},
    ];
    function money(v){ return v===0 ? 'GRATUITO' : 'R$ '+v.toFixed(0) }
    grid.innerHTML = '';
    courses.forEach(c => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = '<div class="body">'
        + `<h3>${c.title}</h3>`
        + `<p class="muted">${c.cat} • ${c.desc}</p>`
        + `<div class="row" style="justify-content:space-between"><span class="badge">${money(c.price)}</span><button class="btn">Matricular</button></div>`
        + '</div>';
      grid.appendChild(el);
    });
  }

  const form = document.getElementById('contact-form');
  if(form){
    function err(id, msg){ const el = document.getElementById(id); if(el){ el.textContent = msg || ''; } }
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      let ok = true;
      err('err-name'); err('err-email'); err('err-message');

      if(name.length < 2){ err('err-name','Informe um nome válido.'); ok=false; }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ err('err-email','E-mail inválido.'); ok=false; }
      if(message.length < 10){ err('err-message','Escreva pelo menos 10 caracteres.'); ok=false; }

      if(ok){

        const box = JSON.parse(localStorage.getItem('dj_msgs')||'[]');
        box.push({ name, email, message, at: new Date().toISOString() });
        localStorage.setItem('dj_msgs', JSON.stringify(box));
        form.reset();
        alert('Mensagem enviada! (simulação)');
      }
    });
  }
})();
