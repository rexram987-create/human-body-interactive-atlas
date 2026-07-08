const pageBody = document.body;
const modal = document.getElementById('organModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const activeSystemTitle = document.getElementById('activeSystemTitle');
const atlasImage = document.getElementById('atlasImage');
const hotspotLayer = document.getElementById('hotspotLayer');

const systems = {
  digestive: {
    image: 'images/digestive-system-vintage-anatomy.jpg',
    title: { he: 'מערכת העיכול', en: 'Digestive System' },
    organs: [
      { key: 'mouth', x: 50, y: 12, he: ['הפה', 'תחילת מערכת העיכול. המזון נלעס ומתערבב עם רוק כדי להתחיל את פירוקו.'], en: ['Mouth', 'The beginning of the digestive system. Food is chewed and mixed with saliva to begin digestion.'] },
      { key: 'esophagus', x: 50, y: 26, he: ['הוושט', 'צינור שרירי שמעביר את המזון מן הלוע אל הקיבה.'], en: ['Esophagus', 'A muscular tube that moves food from the throat to the stomach.'] },
      { key: 'stomach', x: 45, y: 43, he: ['הקיבה', 'הקיבה מערבבת את המזון ומתחילה לפרק אותו בעזרת מיצי עיכול.'], en: ['Stomach', 'The stomach mixes food and begins breaking it down with digestive juices.'] },
      { key: 'liver', x: 58, y: 38, he: ['הכבד', 'הכבד מסייע בעיבוד חומרים, פירוק רעלים, אגירת אנרגיה וייצור מרה.'], en: ['Liver', 'The liver helps process substances, break down toxins, store energy, and produce bile.'] },
      { key: 'intestines', x: 50, y: 64, he: ['המעיים', 'המעיים ממשיכים את תהליך העיכול וסופגים חומרים מזינים ומים אל הגוף.'], en: ['Intestines', 'The intestines continue digestion and absorb nutrients and water into the body.'] }
    ]
  },
  respiratory: {
    image: 'images/respiratory-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הנשימה', en: 'Respiratory System' },
    organs: [
      { key: 'nasal', x: 50, y: 12, he: ['חלל האף', 'חלל האף מסנן, מחמם ומלחלח את האוויר לפני כניסתו לריאות.'], en: ['Nasal Cavity', 'The nasal cavity filters, warms, and humidifies air before it reaches the lungs.'] },
      { key: 'trachea', x: 50, y: 31, he: ['קנה הנשימה', 'קנה הנשימה מוביל אוויר מן הגרון אל הסמפונות והריאות.'], en: ['Trachea', 'The trachea carries air from the throat to the bronchi and lungs.'] },
      { key: 'lungs', x: 50, y: 48, he: ['הריאות', 'הריאות מאפשרות חילוף גזים: כניסת חמצן ויציאת פחמן דו־חמצני.'], en: ['Lungs', 'The lungs enable gas exchange: oxygen enters and carbon dioxide leaves.'] },
      { key: 'diaphragm', x: 50, y: 67, he: ['הסרעפת', 'הסרעפת היא שריר מרכזי בתהליך הנשימה.'], en: ['Diaphragm', 'The diaphragm is a major muscle used in breathing.'] }
    ]
  },
  circulatory: {
    image: 'images/circulatory-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הדם', en: 'Circulatory System' },
    organs: [
      { key: 'heart', x: 51, y: 34, he: ['הלב', 'הלב הוא משאבה שרירית המזרימה דם לכל חלקי הגוף.'], en: ['Heart', 'The heart is a muscular pump that circulates blood throughout the body.'] },
      { key: 'aorta', x: 54, y: 29, he: ['אבי העורקים', 'אבי העורקים הוא העורק הראשי היוצא מן הלב ומוביל דם עשיר בחמצן.'], en: ['Aorta', 'The aorta is the main artery that carries oxygen-rich blood from the heart.'] },
      { key: 'veins', x: 46, y: 47, he: ['ורידים מרכזיים', 'הוורידים מחזירים דם מן הגוף אל הלב.'], en: ['Major Veins', 'Veins return blood from the body back to the heart.'] }
    ]
  },
  nervous: {
    image: 'images/nervous-system-vintage-anatomy.jpg',
    title: { he: 'מערכת העצבים', en: 'Nervous System' },
    organs: [
      { key: 'brain', x: 50, y: 11, he: ['המוח', 'המוח הוא מרכז הבקרה של הגוף ואחראי על חשיבה, זיכרון, תנועה ותחושה.'], en: ['Brain', 'The brain is the body’s control center for thought, memory, movement, and sensation.'] },
      { key: 'spinal', x: 50, y: 37, he: ['חוט השדרה', 'חוט השדרה מעביר אותות עצביים בין המוח לשאר הגוף.'], en: ['Spinal Cord', 'The spinal cord carries nerve signals between the brain and the body.'] },
      { key: 'nerves', x: 56, y: 60, he: ['עצבים היקפיים', 'העצבים ההיקפיים מקשרים בין מערכת העצבים המרכזית לאיברי הגוף.'], en: ['Peripheral Nerves', 'Peripheral nerves connect the central nervous system with the organs and limbs.'] }
    ]
  },
  skeletal: {
    image: 'images/skeletal-system-vintage-anatomy.jpg',
    title: { he: 'מערכת השלד', en: 'Skeletal System' },
    organs: [
      { key: 'skull', x: 50, y: 11, he: ['הגולגולת', 'הגולגולת מגינה על המוח ויוצרת את מבנה הראש והפנים.'], en: ['Skull', 'The skull protects the brain and forms the structure of the head and face.'] },
      { key: 'ribcage', x: 50, y: 33, he: ['כלוב הצלעות', 'כלוב הצלעות מגן על הלב והריאות.'], en: ['Rib Cage', 'The rib cage protects the heart and lungs.'] },
      { key: 'pelvis', x: 50, y: 56, he: ['האגן', 'האגן תומך במשקל הגוף ומחבר בין עמוד השדרה לגפיים התחתונות.'], en: ['Pelvis', 'The pelvis supports body weight and connects the spine to the lower limbs.'] }
    ]
  },
  muscular: {
    image: 'images/muscular-system-vintage-anatomy.jpg',
    title: { he: 'מערכת השרירים', en: 'Muscular System' },
    organs: [
      { key: 'chest-muscles', x: 50, y: 31, he: ['שרירי החזה', 'שרירי החזה מסייעים בתנועת הזרועות ובתמיכה בבית החזה.'], en: ['Chest Muscles', 'The chest muscles help move the arms and support the thorax.'] },
      { key: 'abdominals', x: 50, y: 47, he: ['שרירי הבטן', 'שרירי הבטן תומכים בגו ומסייעים בתנועה וביציבה.'], en: ['Abdominal Muscles', 'The abdominal muscles support the trunk and assist movement and posture.'] },
      { key: 'leg-muscles', x: 50, y: 76, he: ['שרירי הרגליים', 'שרירי הרגליים מאפשרים הליכה, עמידה וקפיצה.'], en: ['Leg Muscles', 'The leg muscles enable walking, standing, and jumping.'] }
    ]
  },
  urinary: {
    image: 'images/urinary-system-vintage-anatomy.jpg',
    title: { he: 'מערכת השתן', en: 'Urinary System' },
    organs: [
      { key: 'kidneys', x: 50, y: 35, he: ['הכליות', 'הכליות מסננות את הדם, מסייעות בוויסות נוזלים ומייצרות שתן.'], en: ['Kidneys', 'The kidneys filter blood, regulate fluids, and produce urine.'] },
      { key: 'ureters', x: 50, y: 51, he: ['השופכנים', 'השופכנים מעבירים שתן מן הכליות אל שלפוחית השתן.'], en: ['Ureters', 'The ureters carry urine from the kidneys to the bladder.'] },
      { key: 'bladder', x: 50, y: 66, he: ['שלפוחית השתן', 'שלפוחית השתן אוגרת שתן עד להתרוקנות.'], en: ['Urinary Bladder', 'The urinary bladder stores urine until it is released.'] }
    ]
  },
  senses: {
    image: 'images/sense-organs-vintage-anatomy.jpg',
    title: { he: 'איברי החושים', en: 'Sense Organs' },
    organs: [
      { key: 'eye', x: 40, y: 19, he: ['העין', 'העין קולטת אור ומאפשרת ראייה.'], en: ['Eye', 'The eye detects light and enables vision.'] },
      { key: 'ear', x: 61, y: 34, he: ['האוזן', 'האוזן מאפשרת שמיעה ותורמת לשיווי המשקל.'], en: ['Ear', 'The ear enables hearing and contributes to balance.'] },
      { key: 'tongue', x: 50, y: 64, he: ['הלשון', 'הלשון מסייעת בטעם, דיבור ובליעה.'], en: ['Tongue', 'The tongue supports taste, speech, and swallowing.'] },
      { key: 'skin', x: 50, y: 82, he: ['העור', 'העור מגן על הגוף ומכיל קולטני תחושה.'], en: ['Skin', 'The skin protects the body and contains sensory receptors.'] }
    ]
  },
  maleReproductive: {
    image: 'images/male-reproductive-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הרבייה הזכרית', en: 'Male Reproductive System' },
    organs: [
      { key: 'testes', x: 50, y: 67, he: ['האשכים', 'האשכים מייצרים תאי זרע והורמונים זכריים.'], en: ['Testes', 'The testes produce sperm cells and male hormones.'] },
      { key: 'prostate', x: 50, y: 52, he: ['הערמונית', 'הערמונית מפרישה נוזל המסייע בהרכב נוזל הזרע.'], en: ['Prostate', 'The prostate secretes fluid that contributes to semen.'] }
    ]
  },
  femaleReproductive: {
    image: 'images/female-reproductive-system-vintage-anatomy.jpg',
    title: { he: 'מערכת הרבייה הנשית', en: 'Female Reproductive System' },
    organs: [
      { key: 'ovaries', x: 50, y: 38, he: ['השחלות', 'השחלות מייצרות ביציות והורמונים נשיים.'], en: ['Ovaries', 'The ovaries produce egg cells and female hormones.'] },
      { key: 'uterus', x: 50, y: 51, he: ['הרחם', 'הרחם הוא איבר שרירי שבו מתפתח העובר במהלך היריון.'], en: ['Uterus', 'The uterus is a muscular organ where a fetus develops during pregnancy.'] },
      { key: 'vagina', x: 50, y: 66, he: ['הנרתיק', 'הנרתיק מחבר בין צוואר הרחם לחלק החיצוני של מערכת הרבייה.'], en: ['Vagina', 'The vagina connects the cervix to the external reproductive tract.'] }
    ]
  }
};

function lang() { return pageBody.dataset.lang || 'he'; }

function renderTabs() {
  const nav = document.getElementById('systemTabs');
  nav.innerHTML = Object.entries(systems).map(([key, system], index) => `
    <button class="tab ${index === 0 ? 'active' : ''}" data-system="${key}" onclick="setSystem('${key}', this)">
      <span class="he-text">${system.title.he}</span><span class="en-text">${system.title.en}</span>
    </button>
  `).join('');
}

function renderHotspots(systemKey) {
  const system = systems[systemKey];
  hotspotLayer.innerHTML = system.organs.map(organ => `
    <button class="hotspot" style="left:${organ.x}%; top:${organ.y}%;" onclick="openOrgan('${systemKey}', '${organ.key}')" aria-label="${organ.en[0]}"></button>
  `).join('');
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
    renderHotspots(systemKey);
    atlasImage.classList.remove('is-changing');
  }, 160);
}

function toggleLanguage() {
  const next = lang() === 'he' ? 'en' : 'he';
  pageBody.dataset.lang = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr';
  const currentSystem = pageBody.dataset.system || 'digestive';
  activeSystemTitle.textContent = systems[currentSystem].title[next];
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
