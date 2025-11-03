// script.js - manejo simple del login y stub para Google Sign-In
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.querySelector('#loginForm');
  const googleBtn = document.querySelector('#googleSign');
  // Generar hojas dinámicamente y prepararlas para comenzar ya en caída
  const LEAF_COUNT = 64; // <- cambia este número para ajustar la cantidad de hojas
  const leavesContainer = document.querySelector('.leaves');

  function rand(min, max){ return Math.random()*(max-min)+min; }

  function createLeaves(n){
    if(!leavesContainer) return;
    leavesContainer.innerHTML = '';
    for(let i=0;i<n;i++){
      const d = document.createElement('div');
      d.className = 'leaf';
      const speed = Math.floor(rand(1,6));
      d.setAttribute('data-speed', String(speed));
      leavesContainer.appendChild(d);
    }
  }

  createLeaves(LEAF_COUNT);

  // Asignar posiciones iniciales, delays negativos y transformaciones aleatorias
  const leaves = leavesContainer ? leavesContainer.querySelectorAll('.leaf') : [];
  leaves.forEach((leaf)=>{
    const left = rand(2,94).toFixed(2);
    const top = -(rand(5,25)).toFixed(2);
    leaf.style.left = `${left}%`;
    leaf.style.top = `${top}%`;
    const neg = -rand(0,30).toFixed(2);
    leaf.style.setProperty('--start', `${neg}s`);
    const rot = rand(-30,30).toFixed(2);
    const scl = (0.7 + Math.random()*0.6).toFixed(2);
    leaf.style.transform = `rotate(${rot}deg) scale(${scl})`;
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const email = data.get('email')?.trim();
    const pass = data.get('password')?.trim();
    if(!email || !pass){
      showMessage('Por favor completa email y contraseña','error');
      return;
    }
    // Simular login
    showMessage(`Iniciando sesión como ${email}`,'ok');
    setTimeout(()=>{
      showMessage('Bienvenido — login simulado','ok');
    },900);
  });

  googleBtn.addEventListener('click', ()=>{
    // Aquí normalmente usarías la biblioteca de Google Identity (gsi) con tu client_id
    // Este es un stub que muestra un mensaje y dónde integrar la lógica real.
    showMessage('Iniciar con Google (no configurado en demo). Implementa Google Identity con tu client_id.','info');
  });
});

function showMessage(msg, type='info'){
  let el = document.querySelector('#toast');
  if(!el){
    el = document.createElement('div');
    el.id = 'toast';
    el.style.position = 'fixed';
    el.style.right = '18px';
    el.style.bottom = '18px';
    el.style.padding = '12px 16px';
    el.style.borderRadius = '12px';
    el.style.background = 'rgba(2,6,23,0.7)';
    el.style.color = '#e6eef8';
    el.style.boxShadow = '0 8px 24px rgba(2,6,23,0.6)';
    el.style.zIndex = 9999;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
  clearTimeout(el._t);
  el._t = setTimeout(()=>{
    el.style.transition = 'opacity 400ms, transform 400ms';
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
  }, 2200);
}
