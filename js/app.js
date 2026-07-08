const pageBody = document.body;
const modal = document.getElementById('organModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const activeSystemTitle = document.getElementById('activeSystemTitle');
const atlasImage = document.getElementById('atlasImage');
const hotspotLayer = document.getElementById('hotspotLayer');
const organList = document.getElementById('organList');

let currentDetail = 'basic';

const detailOrder = { basic: 1, medium: 2, advanced: 3 };

const systems = {
  digestive: {
    image: 'images/digestive-system-vintage-anatomy.jpg',
    title: { he: 'מערכת העיכול', en: 'Digestive System' },
    organs: [
      { level: 'basic', key: 'mouth', x: 50, y: 12, he: ['הפה', 'תחילת מערכת העיכול. המזון נלעס ומתערבב עם רוק כדי להתחיל את פירוקו.'], en: ['Mouth', 'The beginning of the digestive system. Food is chewed and mixed with saliva to begin digestion.'] },
      { level: 'basic', key: 'esophagus', x: 50, y: 26, he: ['הוושט', 'צינור שרירי שמעביר את המזון מן הלוע אל הקיבה.'], en: ['Esophagus', 'A muscular tube that moves food from the throat to the stomach.'] },
      { level: 'basic', key: 'stomach', x: 45, y: 43, he: ['הקיבה', 'הקיבה מערבבת את המזון ומתחילה לפרק אותו בעזרת מיצי עיכול.'], en: ['Stomach', 'The stomach mixes food and begins breaking it down with digestive juices.'] },
      { level: 'basic', key: 'liver', x: 58, y: 38, he: ['הכבד', 'הכבד מסייע בעיבוד חומרים, פירוק רעלים, אגירת אנרגיה וייצור מרה.'], en: ['Liver', 'The liver helps process substances, break down toxins, store energy, and produce bile.'] },
      { level: 'basic', key: 'intestines', x: 50, y: 64, he: ['המעיים', 'המעיים ממשיכים את תהליך העיכול וסופגים חומרים מזינים ומים אל הגוף.'], en: ['Intestines', 'The intestines continue digestion and absorb nutrients and water into the body.'] },
      { level: 'medium', key: 'pancreas', x: 53, y: 49, he: ['הלבלב', 'הלבלב מייצר אנזימי עיכול וגם הורמונים חשובים לוויסות סוכר בדם.'], en: ['Pancreas', 'The pancreas produces digestive enzymes and hormones that help regulate blood sugar.'] },
      { level: 'medium', key: 'gallbladder', x: 62, y: 43, he: ['כיס המרה', 'כיס המרה אוגר מרה ומסייע בעיכול שומנים.'], en: ['Gallbladder', 'The gallbladder stores bile and helps digest fats.'] },
      { level: 'advanced', key: 'appendix', x: 57, y: 72, he: ['התוספתן', 'התוספתן הוא שלוחה קטנה של המעי הגס, עם תפקיד חיסוני מסוים.'], en: ['Appendix', 'The appendix is a small pouch attached to the large intestine and has some immune functions.'] }
    ]
  },
  respiratory: {
    image: 'images/respiratory-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הנשימה', en: 'Respiratory System' },
    organs: [
      { level: 'basic', key: 'nasal', x: 50, y: 12, he: ['חלל האף', 'חלל האף מסנן, מחמם ומלחלח את האוויר לפני כניסתו לריאות.'], en: ['Nasal Cavity', 'The nasal cavity filters, warms, and humidifies air before it reaches the lungs.'] },
      { level: 'basic', key: 'trachea', x: 50, y: 31, he: ['קנה הנשימה', 'קנה הנשימה מוביל אוויר מן הגרון אל הסמפונות והריאות.'], en: ['Trachea', 'The trachea carries air from the throat to the bronchi and lungs.'] },
      { level: 'basic', key: 'lungs', x: 50, y: 48, he: ['הריאות', 'הריאות מאפשרות חילוף גזים: כניסת חמצן ויציאת פחמן דו־חמצני.'], en: ['Lungs', 'The lungs enable gas exchange: oxygen enters and carbon dioxide leaves.'] },
      { level: 'basic', key: 'diaphragm', x: 50, y: 67, he: ['הסרעפת', 'הסרעפת היא שריר מרכזי בתהליך הנשימה.'], en: ['Diaphragm', 'The diaphragm is a major muscle used in breathing.'] },
      { level: 'medium', key: 'bronchi', x: 50, y: 39, he: ['הסמפונות', 'הסמפונות מתפצלות מקנה הנשימה ומובילות אוויר אל חלקי הריאות.'], en: ['Bronchi', 'The bronchi branch from the trachea and carry air into the lungs.'] }
    ]
  },
  circulatory: {
    image: 'images/circulatory-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הדם', en: 'Circulatory System' },
    organs: [
      { level: 'basic', key: 'heart', x: 51, y: 34, he: ['הלב', 'הלב הוא משאבה שרירית המזרימה דם לכל חלקי הגוף.'], en: ['Heart', 'The heart is a muscular pump that circulates blood throughout the body.'] },
      { level: 'basic', key: 'aorta', x: 54, y: 29, he: ['אבי העורקים', 'אבי העורקים הוא העורק הראשי היוצא מן הלב ומוביל דם עשיר בחמצן.'], en: ['Aorta', 'The aorta is the main artery that carries oxygen-rich blood from the heart.'] },
      { level: 'basic', key: 'veins', x: 46, y: 47, he: ['ורידים מרכזיים', 'הוורידים מחזירים דם מן הגוף אל הלב.'], en: ['Major Veins', 'Veins return blood from the body back to the heart.'] },
      { level: 'medium', key: 'carotid', x: 47, y: 20, he: ['עורקי הצוואר', 'עורקי הצוואר מובילים דם עשיר בחמצן אל המוח והראש.'], en: ['Carotid Arteries', 'The carotid arteries carry oxygen-rich blood to the brain and head.'] }
    ]
  },
  nervous: {
    image: 'images/nervous-system-vintage-anatomy.jpg',
    title: { he: 'מערכת העצבים', en: 'Nervous System' },
    organs: [
      { level: 'basic', key: 'brain', x: 50, y: 11, he: ['המוח', 'המוח הוא מרכז הבקרה של הגוף ואחראי על חשיבה, זיכרון, תנועה ותחושה.'], en: ['Brain', 'The brain is the body’s control center for thought, memory, movement, and sensation.'] },
      { level: 'basic', key: 'spinal', x: 50, y: 37, he: ['חוט השדרה', 'חוט השדרה מעביר אותות עצביים בין המוח לשאר הגוף.'], en: ['Spinal Cord', 'The spinal cord carries nerve signals between the brain and the body.'] },
      { level: 'basic', key: 'nerves', x: 56, y: 60, he: ['עצבים היקפיים', 'העצבים ההיקפיים מקשרים בין מערכת העצבים המרכזית לאיברי הגוף.'], en: ['Peripheral Nerves', 'Peripheral nerves connect the central nervous system with the organs and limbs.'] },
      { level: 'medium', key: 'cerebellum', x: 50, y: 15, he: ['המוחון', 'המוחון מסייע בתיאום תנועה, יציבה ושיווי משקל.'], en: ['Cerebellum', 'The cerebellum helps coordinate movement, posture, and balance.'] }
    ]
  },
  skeletal: {
    image: 'images/skeletal-system-vintage-anatomy.jpg',
    title: { he: 'מערכת השלד', en: 'Skeletal System' },
    organs: [
      { level: 'basic', key: 'skull', x: 50, y: 11, he: ['הגולגולת', 'הגולגולת מגינה על המוח ויוצרת את מבנה הראש והפנים.'], en: ['Skull', 'The skull protects the brain and forms the structure of the head and face.'] },
      { level: 'basic', key: 'ribcage', x: 50, y: 33, he: ['כלוב הצלעות', 'כלוב הצלעות מגן על הלב והריאות.'], en: ['Rib Cage', 'The rib cage protects the heart and lungs.'] },
      { level: 'basic', key: 'pelvis', x: 50, y: 56, he: ['האגן', 'האגן תומך במשקל הגוף ומחבר בין עמוד השדרה לגפיים התחתונות.'], en: ['Pelvis', 'The pelvis supports body weight and connects the spine to the lower limbs.'] },
      { level: 'medium', key: 'spine', x: 50, y: 42, he: ['עמוד השדרה', 'עמוד השדרה תומך בגוף ומגן על חוט השדרה.'], en: ['Spine', 'The spine supports the body and protects the spinal cord.'] },
      { level: 'advanced', key: 'femur', x: 47, y: 70, he: ['עצם הירך', 'עצם הירך היא העצם הארוכה והחזקה ביותר בגוף.'], en: ['Femur', 'The femur is the longest and strongest bone in the body.'] }
    ]
  },
  muscular: {
    image: 'images/muscular-system-vintage-anatomy.jpg',
    title: { he: 'מערכת השרירים', en: 'Muscular System' },
    organs: [
      { level: 'basic', key: 'chest-muscles', x: 50, y: 31, he: ['שרירי החזה', 'שרירי החזה מסייעים בתנועת הזרועות ובתמיכה בבית החזה.'], en: ['Chest Muscles', 'The chest muscles help move the arms and support the thorax.'] },
      { level: 'basic', key: 'abdominals', x: 50, y: 47, he: ['שרירי הבטן', 'שרירי הבטן תומכים בגו ומסייעים בתנועה וביציבה.'], en: ['Abdominal Muscles', 'The abdominal muscles support the trunk and assist movement and posture.'] },
      { level: 'basic', key: 'leg-muscles', x: 50, y: 76, he: ['שרירי הרגליים', 'שרירי הרגליים מאפשרים הליכה, עמידה וקפיצה.'], en: ['Leg Muscles', 'The leg muscles enable walking, standing, and jumping.'] },
      { level: 'medium', key: 'shoulder-muscles', x: 40, y: 28, he: ['שרירי הכתף', 'שרירי הכתף מאפשרים תנועה רחבה של הזרוע.'], en: ['Shoulder Muscles', 'The shoulder muscles allow a wide range of arm movement.'] }
    ]
  },
  urinary: {
    image: 'images/urinary-system-vintage-anatomy.jpg',
    title: { he: 'מערכת השתן', en: 'Urinary System' },
    organs: [
      { level: 'basic', key: 'kidneys', x: 50, y: 35, he: ['הכליות', 'הכליות מסננות את הדם, מסייעות בוויסות נוזלים ומייצרות שתן.'], en: ['Kidneys', 'The kidneys filter blood, regulate fluids, and produce urine.'] },
      { level: 'basic', key: 'ureters', x: 50, y: 51, he: ['השופכנים', 'השופכנים מעבירים שתן מן הכליות אל שלפוחית השתן.'], en: ['Ureters', 'The ureters carry urine from the kidneys to the bladder.'] },
      { level: 'basic', key: 'bladder', x: 50, y: 66, he: ['שלפוחית השתן', 'שלפוחית השתן אוגרת שתן עד להתרוקנות.'], en: ['Urinary Bladder', 'The urinary bladder stores urine until it is released.'] }
    ]
  },
  senses: {
    image: 'images/sense-organs-vintage-anatomy.jpg',
    title: { he: 'איברי החושים', en: 'Sense Organs' },
    organs: [
      { level: 'basic', key: 'eye', x: 40, y: 19, he: ['העין', 'העין קולטת אור ומאפשרת ראייה.'], en: ['Eye', 'The eye detects light and enables vision.'] },
      { level: 'basic', key: 'ear', x: 61, y: 34, he: ['האוזן', 'האוזן מאפשרת שמיעה ותורמת לשיווי המשקל.'], en: ['Ear', 'The ear enables hearing and contributes to balance.'] },
      { level: 'basic', key: 'tongue', x: 50, y: 64, he: ['הלשון', 'הלשון מסייעת בטעם, דיבור ובליעה.'], en: ['Tongue', 'The tongue supports taste, speech, and swallowing.'] },
      { level: 'medium', key: 'skin', x: 50, y: 82, he: ['העור', 'העור מגן על הגוף ומכיל קולטני תחושה.'], en: ['Skin', 'The skin protects the body and contains sensory receptors.'] }
    ]
  },
  maleReproductive: {
    image: 'images/male-reproductive-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הרבייה הזכרית', en: 'Male Reproductive System' },
    organs: [
      { level: 'basic', key: 'testes', x: 50, y: 67, he: ['האשכים', 'האשכים מייצרים תאי זרע והורמונים זכריים.'], en: ['Testes', 'The testes produce sperm cells and male hormones.'] },
      { level: 'basic', key: 'prostate', x: 50, y: 52, he: ['הערמונית', 'הערמונית מפרישה נוזל המסייע בהרכב נוזל הזרע.'], en: ['Prostate', 'The prostate secretes fluid that contributes to semen.'] }
    ]
  },
  femaleReproductive: {
    image: 'images/female-reproductive-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הרבייה הנשית', en: 'Female Reproductive System' },
    organs: [
      { level: 'basic', key: 'ovaries', x: 50, y: 38, he: ['השחלות', 'השחלות מייצרות ביציות והורמונים נשיים.'], en: ['Ovaries', 'The ovaries produce egg cells and female hormones.'] },
      { level: 'basic', key: 'uterus', x: 50, y: 51, he: ['הרחם', 'הרחם הוא איבר שרירי שבו מתפתח העובר במהלך היריון.'], en: ['Uterus', 'The uterus is a muscular organ where a fetus develops during pregnancy.'] },
      { level: 'medium', key: 'vagina', x: 50, y: 66, he: ['הנרתיק', 'הנרתיק מחבר בין צוואר הרחם לחלק החיצוני של מערכת הרבייה.'], en: ['Vagina', 'The vagina connects the cervix to the external reproductive tract.'] }
    ]
  }
};

function lang() { return pageBody.dataset.lang || 'he'; }
function labelFor(organ) { return organ[lang()][0]; }
function currentSystemKey() { return pageBody.dataset.system || 'digestive'; }
function visibleOrgans(systemKey) { return systems[systemKey].organs.filter(organ => detailOrder[organ.level || 'basic'] <= detailOrder[currentDetail]); }

function renderTabs() {
  const nav = document.getElementById('systemTabs');
  nav.innerHTML = Object.entries(systems).map(([key, system], index) => `
    <button class="tab ${index === 0 ? 'active' : ''}" data-system="${key}" onclick="setSystem('${key}', this)">
      <span class="he-text">${system.title.he}</span><span class="en-text">${system.title.en}</span>
    </button>
  `).join('');
}

function renderHotspots(systemKey) {
  hotspotLayer.innerHTML = visibleOrgans(systemKey).map(organ => `
    <button class="hotspot" title="${labelFor(organ)}" style="left:${organ.x}%; top:${organ.y}%;" onclick="openOrgan('${systemKey}', '${organ.key}')" aria-label="${organ.en[0]}"></button>
  `).join('');
}

function renderOrganList(systemKey) {
  organList.innerHTML = visibleOrgans(systemKey).map(organ => `
    <button class="organ-chip" onclick="openOrgan('${systemKey}', '${organ.key}')">${labelFor(organ)}</button>
  `).join('');
}

function refreshVisibleOrgans() {
  const key = currentSystemKey();
  renderHotspots(key);
  renderOrganList(key);
}

function setDetailLevel(level, button) {
  currentDetail = level;
  document.querySelectorAll('.detail-btn').forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
  refreshVisibleOrgans();
}

function setSystem(systemKey, button) {
  const system = systems[systemKey];
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  if (button) button.classList.add('active');
  pageBody.dataset.system = systemKey;
  activeSystemTitle.textContent = system.title[lang()];
  atlasImage.classList.add('is-changing');
  setTimeout(() => {
    atlasImage.src = system.image;
    atlasImage.alt = system.title.en;
    refreshVisibleOrgans();
    atlasImage.classList.remove('is-changing');
  }, 160);
}

function toggleLanguage() {
  const next = lang() === 'he' ? 'en' : 'he';
  pageBody.dataset.lang = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr';
  const key = currentSystemKey();
  activeSystemTitle.textContent = systems[key].title[next];
  renderHotspots(key);
  renderOrganList(key);
}

function openOrgan(systemKey, organKey) {
  const organ = systems[systemKey].organs.find(item => item.key === organKey);
  const data = organ[lang()];
  modalTitle.textContent = data[0];
  modalText.textContent = data[1];
  modal.showModal();
}

function closeOrgan() { modal.close(); }
function scrollToAtlas() { document.getElementById('atlas').scrollIntoView({ behavior: 'smooth', block: 'center' }); }

renderTabs();
setSystem('digestive', document.querySelector('.tab[data-system="digestive"]'));
