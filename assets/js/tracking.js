
(function(){
  const PRODUCTION_HOSTS=new Set(['cardenasyasociados.com.ar','www.cardenasyasociados.com.ar']);
  const isProduction=PRODUCTION_HOSTS.has(window.location.hostname);
  window.CYA_IS_PRODUCTION=isProduction;

  // GTM se carga solamente en el dominio real. Así localhost no contamina Google Ads/Analytics.
  if(isProduction){
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    const s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtm.js?id=GTM-P9BRX6NS'; document.head.appendChild(s);
  }

  function formatNow(){
    const d=new Date(); const p=n=>String(n).padStart(2,'0');
    return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }
  function updateWhatsAppLinks(gclid,time){
    const raw=`¡Hola! Me contacto desde la web de Cárdenas & Asociados para realizar una consulta legal. Mi código automático de consulta es: GCLID ${gclid}; TIME ${time}. [Por favor, no borrar]. Necesito asesoramiento sobre lo siguiente: `;
    const text=encodeURIComponent(raw);
    document.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp.com"]').forEach(link=>{
      const href=link.getAttribute('href')||''; const m=href.match(/(?:phone=|\/)([0-9]{10,15})/); const phone=m?m[1]:'5491131166233';
      link.href=`https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    });
  }
  const params=new URLSearchParams(location.search); const incoming=params.get('gclid');
  if(incoming){localStorage.setItem('cya_gclid',incoming);localStorage.setItem('cya_gclid_time',formatNow())}
  const gclid=localStorage.getItem('cya_gclid'); const time=localStorage.getItem('cya_gclid_time');
  if(gclid&&time)updateWhatsAppLinks(gclid,time);
})();
