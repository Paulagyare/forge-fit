/* Official creator-hosted videos. No footage is copied or represented as HomePulse-owned. */
const HUMAN_DEMOS=Object.freeze({
  1:{video:'FQKfr1YDhEk',creator:'ScottHermanFitness',note:'Dumbbell Romanian deadlift technique.'},
  2:{video:'uUGDRwge4F8',creator:'ScottHermanFitness',note:'Dumbbell floor press technique.'},
  3:{video:'pYcpY20QaE8',creator:'ScottHermanFitness',note:'Single-arm row. The trainer uses a bench; at home, use a stable support that cannot slide.'},
  13:{video:'8XLxfXROrTo',creator:'ScottHermanFitness',note:'Hammer curl coaching and common technique mistakes.'},
  15:{video:'bndt_t7aSXI',creator:'Nuffield Health',note:'Bodyweight squat technique. Practice without weights first.'}
});
function humanDemo(id){const d=HUMAN_DEMOS[id];if(!d)return '';return `<section class="human-demo"><span class="tag">REAL PEOPLE. CLEARER MOVEMENT.</span><h3>Watch a real demonstration</h3><div class="demo-player"><button class="demo-play" onclick="loadHumanDemo(this,${id})"><span aria-hidden="true">▶</span>Play ${esc(exercises[id][0])} here</button></div><p>${esc(d.note)}</p><div class="demo-source">By ${esc(d.creator)} · <a href="https://www.youtube.com/watch?v=${d.video}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div><small>Loads YouTube only when you tap. Internet required. Creator-hosted video; availability and ads are controlled by YouTube.</small></section>`}
function loadHumanDemo(button,id){const d=HUMAN_DEMOS[id];if(!d||!button)return;const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+d.video+'?autoplay=1&playsinline=1&rel=0';frame.title=exercises[id][0]+' demonstration by '+d.creator;frame.allow='autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';button.parentElement.replaceChildren(frame);}
const demoDetailBase=movementDetail;
movementDetail=function(id){demoDetailBase(id);const panel=$('#dialogContent');if(HUMAN_DEMOS[id]){panel.querySelector('h1').insertAdjacentHTML('afterend',humanDemo(id));const search=panel.querySelector('a[href*="results?search_query"]');if(search){const holder=search.parentElement;const disclaimer=holder.nextElementSibling;if(disclaimer)disclaimer.remove();holder.remove();}}};
const demoSessionBase=sessionView;
sessionView=function(){demoSessionBase();if(!session)return;const id=session.ids[session.current];if(HUMAN_DEMOS[id]){const main=$('#modal .session-main');main.querySelector('h1').insertAdjacentHTML('afterend',humanDemo(id));const search=main.querySelector('a[href*="results?search_query"]');if(search)search.remove();}};

function watchHumanDemo(id){movementDetail(id);const button=$('#dialogContent .demo-play');if(button)loadHumanDemo(button,id)}
