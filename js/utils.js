export const $=s=>document.querySelector(s);export const $$=s=>[...document.querySelectorAll(s)];
export function localDateKey(d=new Date()){const z=new Date(d.getTime()-d.getTimezoneOffset()*60000);return z.toISOString().slice(0,10)}
export function brDate(value){return value?new Intl.DateTimeFormat('pt-BR',{timeZone:'UTC'}).format(new Date(value+'T00:00:00Z')):''}
export function normalize(value=''){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
export function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
export const round=value=>Math.round((Number(value)||0)*10)/10;
export function debounce(fn,ms=250){let timer;return(...args)=>{clearTimeout(timer);timer=setTimeout(()=>fn(...args),ms)}}
