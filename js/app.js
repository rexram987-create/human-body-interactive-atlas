const pageBody = document.body;
const modal = document.getElementById('organModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const activeSystemTitle = document.getElementById('activeSystemTitle');
const atlasImage = document.getElementById('atlasImage');
const hotspotLayer = document.getElementById('hotspotLayer');
const organList = document.getElementById('organList');

let currentSystemKey = 'digestive';
let currentDetailLevel = 'basic';
const detailOrder = { basic: 1, medium: 2, advanced: 3 };

const organImages = {
  heart: 'images/organs/heart-vintage-anatomy.jpg',
  brain: 'images/organs/brain-vintage-anatomy.jpg',
  lungs: 'images/organs/lungs-vintage-anatomy.jpg',
  liver: 'images/organs/liver-vintage-anatomy.jpg',
  stomach: 'images/organs/stomach-vintage-anatomy.jpg',
  kidneys: 'images/organs/kidneys-vintage-anatomy.jpg',
  pancreas: 'images/organs/pancreas-vintage-anatomy.jpg',
  spleen: 'images/organs/spleen-vintage-anatomy.jpg',
  intestines: 'images/organs/intestines-vintage-anatomy.jpg',
  bladder: 'images/organs/urinary-bladder-vintage-anatomy.jpg',
  esophagus: 'images/organs/esophagus-vintage-anatomy.jpg',
  trachea: 'images/organs/trachea-bronchi-vintage-anatomy.jpg',
  bronchi: 'images/organs/trachea-bronchi-vintage-anatomy.jpg',
  bronchioles: 'images/organs/trachea-bronchi-vintage-anatomy.jpg',
  thyroid: 'images/organs/thyroid-vintage-anatomy.jpg',
  eye: 'images/organs/eye-vintage-anatomy.jpg',
  ear: 'images/organs/ear-vintage-anatomy.jpg',
  'inner-ear': 'images/organs/ear-vintage-anatomy.jpg'
};

const systems = {
  digestive: {
    image: 'images/digestive-system-vintage-anatomy.jpg',
    title: { he: 'מערכת העיכול', en: 'Digestive System' },
    organs: [
      organ('mouth', 50, 12, 'basic', 'הפה', 'תחילת מערכת העיכול. המזון נלעס ומתערבב עם רוק.', 'Mouth', 'The beginning of the digestive system. Food is chewed and mixed with saliva.'),
      organ('esophagus', 50, 26, 'basic', 'הוושט', 'צינור שרירי שמעביר את המזון מן הלוע אל הקיבה.', 'Esophagus', 'A muscular tube that moves food from the throat to the stomach.'),
      organ('stomach', 45, 43, 'basic', 'הקיבה', 'הקיבה מערבבת את המזון ומתחילה לפרק אותו בעזרת מיצי עיכול.', 'Stomach', 'The stomach mixes food and begins breaking it down with digestive juices.'),
      organ('liver', 58, 38, 'basic', 'הכבד', 'הכבד מסייע בעיבוד חומרים, פירוק רעלים, אגירת אנרגיה וייצור מרה.', 'Liver', 'The liver processes substances, breaks down toxins, stores energy, and produces bile.'),
      organ('intestines', 50, 64, 'basic', 'המעיים', 'המעיים ממשיכים את תהליך העיכול וסופגים חומרים מזינים ומים.', 'Intestines', 'The intestines continue digestion and absorb nutrients and water.'),
      organ('pancreas', 55, 49, 'medium', 'הלבלב', 'הלבלב מפריש אנזימי עיכול ומסייע בוויסות רמות הסוכר בדם.', 'Pancreas', 'The pancreas releases digestive enzymes and helps regulate blood sugar.'),
      organ('gallbladder', 62, 43, 'medium', 'כיס המרה', 'כיס המרה אוגר מרה ומפריש אותה לעיכול שומנים.', 'Gallbladder', 'The gallbladder stores bile and releases it to help digest fats.'),
      organ('spleen', 35, 45, 'medium', 'הטחול', 'הטחול מסנן דם, מסייע לפעילות מערכת החיסון ומשתתף בפירוק תאי דם ישנים.', 'Spleen', 'The spleen filters blood, supports the immune system, and helps remove old blood cells.'),
      organ('appendix', 57, 72, 'advanced', 'התוספתן', 'התוספתן הוא שלוחה קטנה של המעי הגס ויש לו תפקיד חיסוני מסוים.', 'Appendix', 'The appendix is a small extension of the large intestine with some immune function.'),
      organ('rectum', 50, 82, 'advanced', 'החלחולת', 'החלחולת אוגרת פסולת לפני יציאתה מן הגוף.', 'Rectum', 'The rectum stores waste before it leaves the body.')
    ]
  },
  respiratory: {
    image: 'images/respiratory-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הנשימה', en: 'Respiratory System' },
    organs: [
      organ('nasal', 50, 12, 'basic', 'חלל האף', 'חלל האף מסנן, מחמם ומלחלח את האוויר.', 'Nasal Cavity', 'The nasal cavity filters, warms, and humidifies air.'),
      organ('trachea', 50, 31, 'basic', 'קנה הנשימה', 'קנה הנשימה מוביל אוויר מן הגרון אל הריאות.', 'Trachea', 'The trachea carries air from the throat to the lungs.'),
      organ('lungs', 50, 48, 'basic', 'הריאות', 'הריאות מאפשרות חילוף גזים: כניסת חמצן ויציאת פחמן דו־חמצני.', 'Lungs', 'The lungs enable gas exchange: oxygen enters and carbon dioxide leaves.'),
      organ('diaphragm', 50, 67, 'basic', 'הסרעפת', 'הסרעפת היא שריר מרכזי בתהליך הנשימה.', 'Diaphragm', 'The diaphragm is a major muscle used in breathing.'),
      organ('thyroid', 50, 23, 'medium', 'בלוטת התריס', 'בלוטת התריס נמצאת בקדמת הצוואר ומפרישה הורמונים המשפיעים על חילוף החומרים.', 'Thyroid Gland', 'The thyroid gland sits in the front of the neck and produces hormones that affect metabolism.'),
      organ('larynx', 50, 24, 'medium', 'הגרון', 'הגרון משתתף בנשימה ובהפקת קול.', 'Larynx', 'The larynx supports breathing and voice production.'),
      organ('bronchi', 50, 40, 'medium', 'הסמפונות', 'הסמפונות מתפצלות מקנה הנשימה ומובילות אוויר אל הריאות.', 'Bronchi', 'The bronchi branch from the trachea and carry air into the lungs.'),
      organ('bronchioles', 56, 52, 'advanced', 'הסימפוניות', 'הסימפוניות הן הסתעפויות קטנות המובילות אוויר לעומק הריאות.', 'Bronchioles', 'Bronchioles are small branches that carry air deeper into the lungs.')
    ]
  },
  circulatory: {
    image: 'images/circulatory-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הדם', en: 'Circulatory System' },
    organs: [
      organ('heart', 51, 34, 'basic', 'הלב', 'הלב הוא משאבה שרירית המזרימה דם לכל חלקי הגוף.', 'Heart', 'The heart is a muscular pump that circulates blood throughout the body.'),
      organ('aorta', 54, 29, 'basic', 'אבי העורקים', 'אבי העורקים הוא העורק הראשי היוצא מן הלב.', 'Aorta', 'The aorta is the main artery leaving the heart.'),
      organ('veins', 46, 47, 'basic', 'ורידים מרכזיים', 'הוורידים מחזירים דם מן הגוף אל הלב.', 'Major Veins', 'Veins return blood from the body to the heart.'),
      organ('carotid', 48, 20, 'medium', 'עורקי הצוואר', 'עורקי הצוואר מספקים דם למוח ולראש.', 'Carotid Arteries', 'The carotid arteries supply blood to the brain and head.'),
      organ('pulmonary', 47, 33, 'medium', 'כלי הדם הריאתיים', 'כלים אלה מעבירים דם בין הלב לריאות.', 'Pulmonary Vessels', 'These vessels carry blood between the heart and lungs.'),
      organ('leg-vessels', 50, 78, 'advanced', 'כלי הדם ברגליים', 'כלי הדם ברגליים מספקים דם לגפיים התחתונות ומחזירים אותו ללב.', 'Leg Vessels', 'Leg vessels supply and return blood from the lower limbs.')
    ]
  },
  nervous: {
    image: 'images/nervous-system-vintage-anatomy.jpg',
    title: { he: 'מערכת העצבים', en: 'Nervous System' },
    organs: [
      organ('brain', 50, 11, 'basic', 'המוח', 'המוח הוא מרכז הבקרה של הגוף.', 'Brain', 'The brain is the body’s control center.'),
      organ('spinal', 50, 37, 'basic', 'חוט השדרה', 'חוט השדרה מעביר אותות עצביים בין המוח לשאר הגוף.', 'Spinal Cord', 'The spinal cord carries nerve signals between the brain and body.'),
      organ('nerves', 56, 60, 'basic', 'עצבים היקפיים', 'העצבים ההיקפיים מקשרים בין מערכת העצבים המרכזית לאיברי הגוף.', 'Peripheral Nerves', 'Peripheral nerves connect the central nervous system with the body.'),
      organ('cerebellum', 52, 14, 'medium', 'המוחון', 'המוחון מסייע בקואורדינציה, שיווי משקל ודיוק תנועה.', 'Cerebellum', 'The cerebellum supports coordination, balance, and movement precision.'),
      organ('sciatic', 45, 70, 'advanced', 'העצב הסיאטי', 'העצב הסיאטי הוא אחד העצבים הגדולים בגוף ומגיע לרגל.', 'Sciatic Nerve', 'The sciatic nerve is one of the largest nerves and extends into the leg.')
    ]
  },
  skeletal: {
    image: 'images/skeletal-system-vintage-anatomy.jpg',
    title: { he: 'מערכת השלד', en: 'Skeletal System' },
    organs: [
      organ('skull', 50, 11, 'basic', 'הגולגולת', 'הגולגולת מגינה על המוח ויוצרת את מבנה הראש.', 'Skull', 'The skull protects the brain and forms the head structure.'),
      organ('ribcage', 50, 33, 'basic', 'כלוב הצלעות', 'כלוב הצלעות מגן על הלב והריאות.', 'Rib Cage', 'The rib cage protects the heart and lungs.'),
      organ('pelvis', 50, 56, 'basic', 'האגן', 'האגן תומך במשקל הגוף ומחבר בין עמוד השדרה לרגליים.', 'Pelvis', 'The pelvis supports body weight and connects the spine to the legs.'),
      organ('spine', 50, 40, 'medium', 'עמוד השדרה', 'עמוד השדרה תומך בגוף ומגן על חוט השדרה.', 'Spine', 'The spine supports the body and protects the spinal cord.'),
      organ('humerus', 35, 39, 'medium', 'עצם הזרוע', 'עצם הזרוע היא העצם הארוכה של הזרוע העליונה.', 'Humerus', 'The humerus is the long bone of the upper arm.'),
      organ('femur', 45, 72, 'advanced', 'עצם הירך', 'עצם הירך היא העצם הארוכה והחזקה ביותר בגוף.', 'Femur', 'The femur is the longest and strongest bone in the body.')
    ]
  },
  muscular: {
    image: 'images/muscular-system-vintage-anatomy.jpg',
    title: { he: 'מערכת השרירים', en: 'Muscular System' },
    organs: [
      organ('chest-muscles', 50, 31, 'basic', 'שרירי החזה', 'שרירי החזה מסייעים בתנועת הזרועות ובתמיכה בבית החזה.', 'Chest Muscles', 'Chest muscles help move the arms and support the thorax.'),
      organ('abdominals', 50, 47, 'basic', 'שרירי הבטן', 'שרירי הבטן תומכים בגו ומסייעים בתנועה וביציבה.', 'Abdominal Muscles', 'Abdominal muscles support the trunk and posture.'),
      organ('leg-muscles', 50, 76, 'basic', 'שרירי הרגליים', 'שרירי הרגליים מאפשרים הליכה, עמידה וקפיצה.', 'Leg Muscles', 'Leg muscles enable walking, standing, and jumping.'),
      organ('deltoid', 36, 28, 'medium', 'שריר הדלתא', 'שריר הדלתא משתתף בהרמת הזרוע ובתנועות הכתף.', 'Deltoid', 'The deltoid helps raise the arm and move the shoulder.'),
      organ('biceps', 34, 40, 'medium', 'שריר הזרוע הדו־ראשי', 'שריר זה מסייע בכיפוף המרפק.', 'Biceps', 'The biceps helps bend the elbow.'),
      organ('quadriceps', 47, 69, 'advanced', 'הארבע־ראשי', 'קבוצת שרירים מרכזית בקדמת הירך המיישרת את הברך.', 'Quadriceps', 'A major front-thigh muscle group that extends the knee.')
    ]
  },
  urinary: {
    image: 'images/urinary-system-vintage-anatomy.jpg',
    title: { he: 'מערכת השתן', en: 'Urinary System' },
    organs: [
      organ('kidneys', 50, 35, 'basic', 'הכליות', 'הכליות מסננות את הדם, מווסתות נוזלים ומייצרות שתן.', 'Kidneys', 'The kidneys filter blood, regulate fluids, and produce urine.'),
      organ('ureters', 50, 51, 'basic', 'השופכנים', 'השופכנים מעבירים שתן מן הכליות אל שלפוחית השתן.', 'Ureters', 'The ureters carry urine from the kidneys to the bladder.'),
      organ('bladder', 50, 66, 'basic', 'שלפוחית השתן', 'שלפוחית השתן אוגרת שתן עד להתרוקנות.', 'Urinary Bladder', 'The bladder stores urine until it is released.'),
      organ('renal-arteries', 43, 37, 'medium', 'עורקי הכליה', 'עורקי הכליה מובילים דם אל הכליות לצורך סינון.', 'Renal Arteries', 'Renal arteries carry blood to the kidneys for filtration.'),
      organ('urethra', 50, 75, 'advanced', 'השופכה', 'השופכה מובילה שתן מן השלפוחית אל מחוץ לגוף.', 'Urethra', 'The urethra carries urine from the bladder out of the body.')
    ]
  },
  senses: {
    image: 'images/sense-organs-vintage-anatomy.jpg',
    title: { he: 'איברי החושים', en: 'Sense Organs' },
    organs: [
      organ('eye', 40, 19, 'basic', 'העין', 'העין קולטת אור ומאפשרת ראייה.', 'Eye', 'The eye detects light and enables vision.'),
      organ('ear', 61, 34, 'basic', 'האוזן', 'האוזן מאפשרת שמיעה ותורמת לשיווי המשקל.', 'Ear', 'The ear enables hearing and contributes to balance.'),
      organ('tongue', 50, 64, 'basic', 'הלשון', 'הלשון מסייעת בטעם, דיבור ובליעה.', 'Tongue', 'The tongue supports taste, speech, and swallowing.'),
      organ('skin', 50, 82, 'medium', 'העור', 'העור מגן על הגוף ומכיל קולטני תחושה.', 'Skin', 'The skin protects the body and contains sensory receptors.'),
      organ('nose', 50, 48, 'medium', 'האף', 'האף מסייע בהרחה ובסינון האוויר.', 'Nose', 'The nose supports smell and filters air.'),
      organ('inner-ear', 67, 40, 'advanced', 'האוזן הפנימית', 'האוזן הפנימית משתתפת בשמיעה ובשיווי משקל.', 'Inner Ear', 'The inner ear supports hearing and balance.')
    ]
  },
  maleReproductive: {
    image: 'images/male-reproductive-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הרבייה הזכרית', en: 'Male Reproductive System' },
    organs: [
      organ('testes', 50, 67, 'basic', 'האשכים', 'האשכים מייצרים תאי זרע והורמונים זכריים.', 'Testes', 'The testes produce sperm cells and male hormones.'),
      organ('prostate', 50, 52, 'basic', 'הערמונית', 'הערמונית מפרישה נוזל המסייע בהרכב נוזל הזרע.', 'Prostate', 'The prostate secretes fluid that contributes to semen.'),
      organ('vas-deferens', 55, 48, 'medium', 'צינור הזרע', 'צינור הזרע מוביל תאי זרע מן האשכים.', 'Vas Deferens', 'The vas deferens carries sperm from the testes.'),
      organ('seminal-vesicles', 55, 45, 'advanced', 'שלפוחיות הזרע', 'שלפוחיות הזרע מפרישות נוזל חשוב לנוזל הזרע.', 'Seminal Vesicles', 'Seminal vesicles secrete fluid that contributes to semen.')
    ]
  },
  femaleReproductive: {
    image: 'images/female-reproductive-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הרבייה הנשית', en: 'Female Reproductive System' },
    organs: [
      organ('ovaries', 50, 38, 'basic', 'השחלות', 'השחלות מייצרות ביציות והורמונים נשיים.', 'Ovaries', 'The ovaries produce egg cells and female hormones.'),
      organ('uterus', 50, 51, 'basic', 'הרחם', 'הרחם הוא איבר שרירי שבו מתפתח העובר במהלך היריון.', 'Uterus', 'The uterus is a muscular organ where a fetus develops during pregnancy.'),
      organ('vagina', 50, 66, 'basic', 'הנרתיק', 'הנרתיק מחבר בין צוואר הרחם לחלק החיצוני של מערכת הרבייה.', 'Vagina', 'The vagina connects the cervix to the external reproductive tract.'),
      organ('fallopian-tubes', 50, 42, 'medium', 'החצוצרות', 'החצוצרות מקשרות בין השחלות לרחם.', 'Fallopian Tubes', 'The fallopian tubes connect the ovaries to the uterus.'),
      organ('cervix', 50, 58, 'advanced', 'צוואר הרחם', 'צוואר הרחם הוא החלק התחתון של הרחם המחבר לנרתיק.', 'Cervix', 'The cervix is the lower part of the uterus that connects to the vagina.')
    ]
  }
};

function organ(key, x, y, level, heTitle, heText, enTitle, enText) {
  return { key, x, y, level, he: [heTitle, heText], en: [enTitle, enText] };
}
function lang() { return pageBody.dataset.lang || 'he'; }
function labelFor(item) { return item[lang()][0]; }
function visibleOrgans(systemKey) { return systems[systemKey].organs.filter(item => detailOrder[item.level] <= detailOrder[currentDetailLevel]); }
function imageFor(item) { return organImages[item.key] || null; }
function renderTabs() {
  const nav = document.getElementById('systemTabs');
  nav.innerHTML = Object.entries(systems).map(([key, system], index) => `
    <button class="tab ${index === 0 ? 'active' : ''}" type="button" data-system="${key}" onclick="setSystem('${key}', this)" aria-pressed="${index === 0}">
      <span class="he-text">${system.title.he}</span><span class="en-text">${system.title.en}</span>
    </button>
  `).join('');
}
function renderHotspots(systemKey) {
  hotspotLayer.innerHTML = visibleOrgans(systemKey).map(item => `
    <button class="hotspot" type="button" title="${labelFor(item)}" style="left:${item.x}%; top:${item.y}%;" onclick="openOrgan('${systemKey}', '${item.key}')" aria-label="${labelFor(item)}"></button>
  `).join('');
}
function renderOrganList(systemKey) {
  organList.innerHTML = visibleOrgans(systemKey).map(item => `
    <button class="organ-chip" type="button" onclick="openOrgan('${systemKey}', '${item.key}')">${labelFor(item)}</button>
  `).join('');
}
function refreshAtlasContent() {
  activeSystemTitle.textContent = systems[currentSystemKey].title[lang()];
  renderHotspots(currentSystemKey);
  renderOrganList(currentSystemKey);
}
function setSystem(systemKey, button) {
  if (!systems[systemKey]) return;
  currentSystemKey = systemKey;
  const system = systems[systemKey];
  document.querySelectorAll('.tab[data-system]').forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-pressed', 'false');
  });
  if (button) {
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
  }
  pageBody.dataset.system = systemKey;
  activeSystemTitle.textContent = system.title[lang()];
  atlasImage.classList.add('is-changing');
  setTimeout(() => {
    atlasImage.src = system.image;
    atlasImage.alt = system.title.en;
    refreshAtlasContent();
    atlasImage.classList.remove('is-changing');
  }, 160);
}
function setDetailLevel(level, button) {
  currentDetailLevel = level;
  pageBody.dataset.detail = level;
  document.querySelectorAll('.detail-btn').forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
  refreshAtlasContent();
}
function toggleLanguage() {
  const next = lang() === 'he' ? 'en' : 'he';
  pageBody.dataset.lang = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr';
  localStorage.setItem('atlas-language', next);
  refreshAtlasContent();
}
function detailLabel(level) {
  const labels = { basic: { he: 'בסיסי', en: 'Basic' }, medium: { he: 'בינוני', en: 'Medium' }, advanced: { he: 'מתקדם', en: 'Advanced' } };
  return labels[level][lang()];
}
function factFor(item) {
  if (lang() === 'he') return `עובדה קצרה: ${item.he[0]} הוא חלק ממערכת ${systems[currentSystemKey].title.he}, ולכן אפשר להציגו בלי להעמיס על שאר המערכות.`;
  return `Quick fact: ${item.en[0]} belongs to the ${systems[currentSystemKey].title.en}, so it can be explored without cluttering the other systems.`;
}
function openOrgan(systemKey, organKey) {
  currentSystemKey = systemKey;
  const system = systems[systemKey];
  const item = system.organs.find(organItem => organItem.key === organKey);
  if (!item) return;
  const data = item[lang()];
  const imagePath = imageFor(item);
  modalTitle.textContent = data[0];
  const labels = lang() === 'he'
    ? { latin: 'שם באנגלית / לטיני', system: 'מערכת', level: 'רמת פירוט', role: 'תפקיד עיקרי', location: 'מיקום כללי', fact: 'עובדה מעניינת' }
    : { latin: 'English / Latin name', system: 'System', level: 'Detail level', role: 'Main function', location: 'General location', fact: 'Interesting fact' };
  const location = lang() === 'he' ? 'מסומן על האיור בהתאם למיקום האנטומי הכללי.' : 'Marked on the illustration according to its general anatomical position.';
  const imageBlock = imagePath ? `<div class="organ-image-wrap"><img class="organ-image" src="${imagePath}" alt="${item.en[0]}" loading="lazy" decoding="async"></div>` : '';
  modalText.innerHTML = `
    <div class="info-card">
      <div class="info-top">
        ${imageBlock}
        <p class="info-summary">${data[1]}</p>
      </div>
      <div class="info-grid-card">
        <div class="info-field"><span class="info-label">${labels.latin}</span><span class="info-value">${item.en[0]}</span></div>
        <div class="info-field"><span class="info-label">${labels.system}</span><span class="info-value">${system.title[lang()]}</span></div>
        <div class="info-field"><span class="info-label">${labels.level}</span><span class="info-value">${detailLabel(item.level)}</span></div>
        <div class="info-field"><span class="info-label">${labels.location}</span><span class="info-value">${location}</span></div>
      </div>
      <div class="info-fact"><strong>${labels.fact}:</strong> ${factFor(item)}</div>
    </div>
  `;
  modal.showModal();
}
function closeOrgan() { modal.close(); }
function scrollToAtlas() { document.getElementById('atlas').scrollIntoView({ behavior: 'smooth', block: 'center' }); }

function initializeAtlas() {
  const savedLanguage = localStorage.getItem('atlas-language');
  if (savedLanguage === 'he' || savedLanguage === 'en') {
    pageBody.dataset.lang = savedLanguage;
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === 'he' ? 'rtl' : 'ltr';
  }
  renderTabs();
  setSystem('digestive', document.querySelector('.tab[data-system="digestive"]'));
}

if (document.getElementById('atlas')) initializeAtlas();
