const photos=[
 {src:'assets/hero.jpg',label:'Living room'},
 {src:'assets/patio.jpg',label:'Outdoor lounge'},
 {src:'assets/jacuzzi.jpg',label:'Private jacuzzi'},
 {src:'assets/bedroom.jpg',label:'Bedroom'},
 {src:'assets/building.jpg',label:'Building exterior'}
];
const tour=document.querySelector('#tour'),lightbox=document.querySelector('#lightbox');let current=0,lastFocus=null;
const tourGrid=document.querySelector('#tourGrid');
photos.forEach((p,i)=>{const b=document.createElement('button');b.className='tour-item';b.innerHTML=`<img src="${p.src}" alt="${p.label}"><span>${p.label}</span>`;b.addEventListener('click',()=>openLightbox(i));tourGrid.append(b)});
function showModal(el){lastFocus=document.activeElement;el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';el.querySelector('button')?.focus()}
function hideModal(el){el.classList.remove('open');el.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus()}
function openTour(){showModal(tour)}
function openLightbox(i){current=i;renderLightbox();showModal(lightbox)}
function renderLightbox(){lightbox.querySelector('.lb-image').src=photos[current].src;lightbox.querySelector('.lb-image').alt=photos[current].label;lightbox.querySelector('.lb-count').textContent=`${current+1} / ${photos.length}`;lightbox.querySelector('.lb-caption').textContent=photos[current].label}
function move(n){current=(current+n+photos.length)%photos.length;renderLightbox()}
document.querySelectorAll('.photo').forEach(el=>el.addEventListener('click',()=>{if(el.classList.contains('hero'))openTour();else openLightbox(Number(el.dataset.photo))}));
document.querySelector('.last .all-photos').addEventListener('click',e=>{e.stopPropagation();openTour()});
tour.querySelector('.close').addEventListener('click',()=>hideModal(tour));lightbox.querySelector('.lb-close').addEventListener('click',()=>hideModal(lightbox));lightbox.querySelector('.prev').addEventListener('click',()=>move(-1));lightbox.querySelector('.next').addEventListener('click',()=>move(1));
window.addEventListener('keydown',e=>{if(lightbox.classList.contains('open')){if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1);if(e.key==='Escape')hideModal(lightbox)}else if(tour.classList.contains('open')&&e.key==='Escape')hideModal(tour);else if(amenitiesModal.classList.contains('open')&&e.key==='Escape')hideModal(amenitiesModal)});
tour.addEventListener('click',e=>{if(e.target===tour)hideModal(tour)});
let toastTimer;function toast(text){const el=document.querySelector('.toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2100)}
document.querySelector('#saveBtn').addEventListener('click',e=>{const b=e.currentTarget,active=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(active));b.querySelector('.heart').textContent=active?'♥':'♡';b.querySelector('.heart').style.color=active?'#e31c5f':'';toast(active?'Added to your wishlist':'Removed from your wishlist')});
document.querySelector('#shareBtn').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);toast('Link copied to clipboard')}catch{toast('Share this stay with someone you love')}});
document.querySelector('.reserve-btn').addEventListener('click',()=>toast('Choose your dates to continue booking'));
document.querySelector('.small-reserve').addEventListener('click',()=>{document.querySelector('#calendar').scrollIntoView({behavior:'smooth',block:'center'});toast('Choose your dates')});
document.querySelector('.deal button').addEventListener('click',()=>toast('10% offer applied to your next eligible stay'));
document.querySelectorAll('.tour-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.tour-tabs .selected')?.classList.remove('selected');btn.classList.add('selected')}));
document.querySelectorAll('.sticky-nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelectorAll('.sticky-nav a').forEach(a=>a.removeAttribute('aria-current'));link.setAttribute('aria-current','location')}));
const amenities=[
  ['♨','Kitchen'],['◉','Wifi'],['▤','Dedicated workspace'],['♙','Free parking on premises'],['▧','Pool'],['♨','Hot tub'],['♧','Pets allowed'],['◉','Security cameras'],['❄','Air conditioning'],['▣','TV'],
  ['◌','Ceiling fan'],['▥','Dining area'],['⌂','Private entrance'],['♨','Outdoor dining area'],['☀','Patio'],['♨','Fire pit'],['▱','BBQ grill'],['♧','Garden'],['◒','Beach access'],['⌕','Luggage dropoff allowed'],
  ['▣','Washer'],['▣','Dryer'],['♨','Essentials'],['♨','Towels, bed sheets and soap'],['▥','Hangers'],['▤','Iron'],['◉','Dedicated workspace desk'],['❄','Heating'],['▧','Hot water'],['♨','Shampoo'],
  ['▣','Hair dryer'],['◌','Body soap'],['♙','Private bathroom'],['⌁','Bed linens'],['◒','Extra pillows and blankets'],['▧','Room-darkening shades'],['♧','Crib'],['♧','High chair'],['⌂','Long-term stays allowed'],['◉','Self check-in'],
  ['♙','Building staff'],['⌁','Elevator'],['▤','Free street parking'],['♨','Paid parking off premises'],['◉','Smoke alarm'],['⊘','Carbon monoxide alarm'],['♧','Fire extinguisher'],['⌂','First aid kit'],['▣','Lockbox'],['◌','Cleaning available during stay']
];
const amenitiesModal=document.querySelector('#amenitiesModal'),amenitiesGrid=document.querySelector('#amenitiesModalGrid'),amenitiesButton=document.querySelector('#amenitiesBtn');
amenitiesGrid.innerHTML=amenities.map(([icon,name])=>`<div class="amenity-modal-item"><span aria-hidden="true">${icon}</span><span>${name}</span></div>`).join('');
amenitiesButton.addEventListener('click',()=>showModal(amenitiesModal));
amenitiesModal.querySelector('.amenities-close').addEventListener('click',()=>hideModal(amenitiesModal));
amenitiesModal.addEventListener('click',e=>{if(e.target===amenitiesModal)hideModal(amenitiesModal)});
const calendarPair=document.querySelector('.calendar-pair');let monthStart=new Date(2026,9,1),checkIn=new Date(2026,9,18),checkOut=new Date(2026,9,23);
const monthLabel=d=>d.toLocaleString('en-US',{month:'long',year:'numeric'}),shortDate=d=>d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
function syncBookingDates(){const fields=document.querySelectorAll('.dates label strong'),heading=document.querySelector('.calendar-section h2'),intro=document.querySelector('.calendar-section>p'),rate=document.querySelector('.booking-card .rate');fields[0].textContent=checkIn?`${checkIn.getMonth()+1}/${checkIn.getDate()}/${checkIn.getFullYear()}`:'Add date';fields[1].textContent=checkOut?`${checkOut.getMonth()+1}/${checkOut.getDate()}/${checkOut.getFullYear()}`:'Add date';if(checkIn&&checkOut){const nights=Math.max(1,Math.round((checkOut-checkIn)/86400000));heading.textContent=`Calendar · ${nights} ${nights===1?'night':'nights'} in Candolim`;intro.textContent=`${shortDate(checkIn)} – ${shortDate(checkOut)} · Add your travel dates for exact pricing`;rate.innerHTML=`<b>₹28,499</b> for ${nights} ${nights===1?'night':'nights'}`}else if(checkIn){heading.textContent='Calendar · Choose your checkout in Candolim';intro.textContent=`Check-in ${shortDate(checkIn)} · Select a checkout date`;rate.innerHTML='<b>₹28,499</b> per night'}else{heading.textContent='Calendar · Choose your dates in Candolim';intro.textContent='Add your travel dates for exact pricing';rate.innerHTML='<b>₹28,499</b> per night'}}
function renderCalendars(){calendarPair.replaceChildren();for(let offset=0;offset<2;offset++){const month=new Date(monthStart.getFullYear(),monthStart.getMonth()+offset,1),year=month.getFullYear(),monthIndex=month.getMonth(),daysInMonth=new Date(year,monthIndex+1,0).getDate(),firstWeekday=month.getDay();const block=document.createElement('div');block.className='calendar-month';const head=document.createElement('header');if(offset===0){const prev=document.createElement('button');prev.type='button';prev.setAttribute('aria-label','Previous month');prev.textContent='‹';prev.addEventListener('click',()=>{monthStart=new Date(year,monthIndex-1,1);renderCalendars()});head.append(prev)}else head.append(document.createElement('span'));const title=document.createElement('b');title.textContent=monthLabel(month);head.append(title);if(offset===1){const next=document.createElement('button');next.type='button';next.setAttribute('aria-label','Next month');next.textContent='›';next.addEventListener('click',()=>{monthStart=new Date(year,monthIndex+1,1);renderCalendars()});head.append(next)}else head.append(document.createElement('span'));block.append(head);const days=document.createElement('div');days.className='days';['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(name=>{const label=document.createElement('span');label.textContent=name;days.append(label)});for(let blank=0;blank<firstWeekday;blank++){const spacer=document.createElement('i');spacer.setAttribute('aria-hidden','true');days.append(spacer)}for(let day=1;day<=daysInMonth;day++){const date=new Date(year,monthIndex,day),button=document.createElement('button');button.type='button';button.textContent=String(day);button.setAttribute('aria-label',`${monthLabel(month)} ${day}`);const inRange=checkIn&&checkOut&&date>=checkIn&&date<=checkOut;if(inRange)button.classList.add('date-selected');if(checkIn&&checkOut&&date>checkIn&&date<checkOut)button.classList.add('range-middle');button.setAttribute('aria-pressed',String(Boolean(inRange)));button.addEventListener('click',()=>{if(!checkIn||checkOut){checkIn=date;checkOut=null}else if(date<=checkIn){checkIn=date;checkOut=null}else{checkOut=date}syncBookingDates();renderCalendars()});days.append(button)}block.append(days);calendarPair.append(block)}syncBookingDates()}
renderCalendars();document.querySelector('.clear-dates').addEventListener('click',()=>{checkIn=null;checkOut=null;syncBookingDates();renderCalendars()});
document.querySelectorAll('.map-zoom button').forEach((btn,i)=>btn.addEventListener('click',()=>{const map=document.querySelector('.map');const scale=Number(map.dataset.scale||1)*(i===0?1.12:.9);map.dataset.scale=String(scale);map.style.backgroundSize=`${180*scale}px ${180*scale}px`;toast(i===0?'Map zoomed in':'Map zoomed out')}));
document.querySelector('.map-search').addEventListener('click',()=>toast('Candolim, Goa, India'));
document.querySelector('.message-host').addEventListener('click',()=>toast('Host messaging is available after sign-in'));
document.querySelectorAll('.carousel-arrow').forEach(btn=>btn.addEventListener('click',()=>{const track=document.querySelector('.nearby-track'),forward=btn.classList.contains('next-stays');track.scrollBy({left:forward?track.clientWidth:-track.clientWidth,behavior:'smooth'});document.querySelectorAll('.carousel-pages span:not(.page-number)').forEach((x,i)=>x.classList.toggle('active',i===(forward?1:0)));document.querySelector('.page-number').textContent=forward?'2 / 2':'1 / 2'}));
document.querySelectorAll('.linklike').forEach(btn=>{if(!btn.id&&btn.textContent.trim()==='Show more')btn.addEventListener('click',()=>toast('Showing the complete details'))});
const amenityChips=document.querySelector('.amenity-chips');
if(amenityChips){
  amenityChips.addEventListener('wheel',e=>{
    if(Math.abs(e.deltaY)>Math.abs(e.deltaX) && amenityChips.scrollWidth>amenityChips.clientWidth){e.preventDefault();amenityChips.scrollLeft+=e.deltaY}
  },{passive:false});
  let dragging=false,startX=0,startScroll=0;
  amenityChips.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;dragging=true;startX=e.clientX;startScroll=amenityChips.scrollLeft;amenityChips.classList.add('is-dragging');amenityChips.setPointerCapture?.(e.pointerId)});
  amenityChips.addEventListener('pointermove',e=>{if(!dragging)return;amenityChips.scrollLeft=startScroll-(e.clientX-startX)});
  const stopChipDrag=e=>{if(!dragging)return;dragging=false;amenityChips.classList.remove('is-dragging');if(e.pointerId!==undefined)amenityChips.releasePointerCapture?.(e.pointerId)};
  amenityChips.addEventListener('pointerup',stopChipDrag);amenityChips.addEventListener('pointercancel',stopChipDrag);amenityChips.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')stopChipDrag(e)});
}


// Keep the sticky section navigation's active underline aligned with the current scroll position.
const sectionLinks=[...document.querySelectorAll('.sticky-nav nav a')];
const sectionObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const id=entry.target.id;sectionLinks.forEach(link=>{if(link.getAttribute('href')===`#${id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}},{rootMargin:'-170px 0px -68% 0px',threshold:0});
sectionLinks.forEach(link=>{const section=document.querySelector(link.getAttribute('href'));if(section)sectionObserver.observe(section)});
document.querySelector('.reviews-how')?.addEventListener('click',()=>toast('Category ratings and written reviews are provided by guests after their stay.'));
