const body = document.body;
const params = new URLSearchParams(window.location.search);
const organKey = params.get('organ') || 'heart';

const fallbackImage = 'images/human-body.jpg';

const genericSections = {
  he: {
    etymology: 'שם האיבר משמש כיום כשם אנטומי מקובל. בהמשך ניתן להוסיף כאן מקור לשוני מפורט יותר.',
    history: 'חקר האיבר התפתח בהדרגה דרך תצפיות אנטומיות, רפואה קלינית וטכנולוגיות הדמיה מודרניות.',
    function: 'האיבר משתתף בתפקוד חיוני של הגוף ותורם לשמירה על איזון ובריאות.',
    structure: 'מבנה האיבר מותאם לתפקידו, עם רקמות וכלי דם המסייעים לפעילותו התקינה.',
    blood: 'אספקת הדם משתנה לפי האיבר. בהמשך ניתן להוסיף פירוט של עורקים, ורידים וניקוז דם.',
    innervation: 'העצבוב משתתף בבקרה על פעילות האיבר ובתקשורת עם מערכות אחרות בגוף.',
    development: 'האיבר מתפתח בשלבי העוברות כחלק ממערכת הגוף שאליה הוא שייך.',
    health: 'שמירה על אורח חיים בריא, תזונה מתאימה ובדיקות לפי הצורך יכולות לסייע בשמירה על תפקודו.',
    tests: 'בדיקות רפואיות מתאימות נקבעות לפי האיבר, התסמינים והערכת איש מקצוע רפואי.',
    fact: 'דף זה הוא בסיס להרחבה עתידית: בהמשך ניתן להוסיף גלריה, מקורות, מחלות נפוצות ומידע אנטומי מתקדם.'
  },
  en: {
    etymology: 'The organ name is used as a standard anatomical term. A more detailed linguistic origin can be added later.',
    history: 'The study of this organ developed through anatomical observation, clinical medicine, and modern imaging technologies.',
    function: 'This organ supports an essential body function and helps maintain balance and health.',
    structure: 'Its structure is adapted to its role, with tissues and blood vessels that support normal function.',
    blood: 'Blood supply varies by organ. More detail about arteries, veins, and drainage can be added later.',
    innervation: 'Innervation helps regulate the organ and connects it with other body systems.',
    development: 'The organ develops during embryonic growth as part of its body system.',
    health: 'A healthy lifestyle, appropriate nutrition, and checkups when needed can help maintain its function.',
    tests: 'Medical tests depend on the organ, symptoms, and evaluation by a healthcare professional.',
    fact: 'This page is a foundation for future expansion: gallery, sources, common conditions, and advanced anatomy can be added later.'
  }
};

const organData = {
  heart: richOrgan({
    he: 'הלב',
    en: 'Heart',
    image: 'images/organs/heart-vintage-anatomy.jpg',
    heIntro: 'הלב הוא איבר שרירי חלול הפועל כמשאבה המרכזית של מערכת הדם. הוא מזרים דם לריאות לצורך חמצון, ולאחר מכן מזרים דם עשיר בחמצן לכל רקמות הגוף.',
    enIntro: 'The heart is a hollow muscular organ that acts as the central pump of the circulatory system. It sends blood to the lungs for oxygenation and then pumps oxygen-rich blood to the body tissues.',
    quickFacts: {
      he: [
        ['מערכת', 'מערכת הדם'],
        ['מיקום', 'מרכז בית החזה, מעט שמאלה מקו האמצע'],
        ['מבנה בסיסי', 'ארבעה חללים ושסתומים המכוונים את זרימת הדם'],
        ['תפקיד', 'הזרמת דם לריאות ולשאר הגוף']
      ],
      en: [
        ['System', 'Circulatory system'],
        ['Location', 'Central chest, slightly left of the midline'],
        ['Basic structure', 'Four chambers and valves that direct blood flow'],
        ['Role', 'Pumps blood to the lungs and the rest of the body']
      ]
    },
    heSections: {
      etymology: 'המילה העברית "לב" היא מן המילים העתיקות והמרכזיות בעברית, ומשמשת גם במשמעות גופנית וגם כסמל לרגש, אומץ ומרכז פנימי. באנגלית המילה Heart משמשת גם היא הן לאיבר והן כסמל רגשי ותרבותי.',
      history: 'הלב סיקרן רופאים, פילוסופים וחוקרי טבע במשך אלפי שנים. בעולם העתיק יוחסו לו לעיתים רגשות, מחשבה וחיים עצמם. עם התפתחות האנטומיה, ובמיוחד עם הבנת מחזור הדם, התברר תפקידו המדויק כמשאבה מכנית־ביולוגית המניעה את הדם במעגלים סגורים.',
      function: 'תפקידו המרכזי של הלב הוא להזרים דם. הצד הימני מקבל דם דל בחמצן מן הגוף ושולח אותו לריאות. הצד השמאלי מקבל דם עשיר בחמצן מן הריאות ושולח אותו דרך אבי העורקים אל הגוף כולו. קצב הלב משתנה לפי פעילות, מנוחה, רגשות, גיל ומצב בריאותי.',
      structure: 'הלב בנוי מארבעה חללים: עלייה ימנית, חדר ימני, עלייה שמאלית וחדר שמאלי. בין החללים ובפתחי כלי הדם נמצאים שסתומים שמונעים חזרה לאחור של הדם. דופן הלב עשויה שריר לב ייחודי, ובחלקו החיצוני הוא עטוף בקרום הנקרא פריקרד.',
      blood: 'הלב עצמו זקוק לאספקת דם קבועה. עורקי הלב, הנקראים עורקים כליליים, מספקים לשריר הלב חמצן וחומרי מזון. חסימה בעורקים אלה עלולה לפגוע בשריר הלב ולגרום לאירוע לבבי.',
      innervation: 'פעילות הלב נשלטת על ידי מערכת הולכה חשמלית פנימית ועל ידי מערכת העצבים האוטונומית. קוצב הלב הטבעי יוצר אותות חשמליים, והעצבים יכולים להאיץ או להאט את קצב הלב לפי צורכי הגוף.',
      development: 'הלב הוא מן האיברים הראשונים שמתחילים לפעול בעובר. בתחילה הוא מתפתח כצינור פשוט, ובהמשך עובר קיפול וחלוקה לחללים ולמחיצות, עד להיווצרות מבנה ארבעת החללים המוכר.',
      health: 'בריאות הלב מושפעת מגורמים רבים: פעילות גופנית, תזונה, לחץ דם, עישון, סוכרת, שומנים בדם, שינה ומתח נפשי. שמירה על אורח חיים בריא ובדיקות תקופתיות יכולות להפחית סיכון למחלות לב.',
      tests: 'בדיקות נפוצות הקשורות ללב כוללות מדידת לחץ דם, אק״ג, בדיקות דם, אקו לב, מבחן מאמץ, הולטר ולעיתים בדיקות הדמיה מתקדמות יותר. הבחירה בבדיקה תלויה בתסמינים ובהערכת רופא.',
      fact: 'הלב פועל ללא הפסקה במשך כל החיים. גם בזמן שינה הוא ממשיך להתכווץ ולהרפות בקצב מותאם, כדי לשמור על זרימת הדם לכל רקמות הגוף.'
    },
    enSections: {
      etymology: 'The Hebrew word “lev” is one of the ancient central words in Hebrew and is used both for the physical organ and as a symbol of emotion, courage, and inner center. The English word “heart” also carries both anatomical and symbolic meanings.',
      history: 'The heart fascinated physicians, philosophers, and naturalists for thousands of years. In ancient cultures it was often associated with emotion, thought, and life itself. As anatomy advanced, especially with the understanding of circulation, its role as a biological pump became clear.',
      function: 'The heart’s main function is to pump blood. The right side receives oxygen-poor blood from the body and sends it to the lungs. The left side receives oxygen-rich blood from the lungs and sends it through the aorta to the entire body.',
      structure: 'The heart has four chambers: right atrium, right ventricle, left atrium, and left ventricle. Valves between chambers and major vessels prevent backflow. The heart wall is made of specialized cardiac muscle and is surrounded by the pericardium.',
      blood: 'The heart muscle needs its own constant blood supply. The coronary arteries deliver oxygen and nutrients to the myocardium. Blockage in these vessels can injure heart muscle and lead to a heart attack.',
      innervation: 'Heart activity is controlled by an internal electrical conduction system and by the autonomic nervous system. The natural pacemaker generates electrical impulses, while nerves can speed up or slow down the heart according to body needs.',
      development: 'The heart is one of the first organs to begin functioning in the embryo. It starts as a simple tube, then folds and divides into chambers and septa, eventually forming the four-chambered heart.',
      health: 'Heart health is influenced by physical activity, diet, blood pressure, smoking, diabetes, blood lipids, sleep, and stress. Healthy habits and periodic medical checks can reduce the risk of heart disease.',
      tests: 'Common heart-related tests include blood pressure measurement, ECG, blood tests, echocardiography, stress testing, Holter monitoring, and sometimes advanced imaging. The appropriate test depends on symptoms and medical evaluation.',
      fact: 'The heart works continuously throughout life. Even during sleep, it keeps contracting and relaxing at an adjusted rhythm to maintain blood flow to all body tissues.'
    }
  }),
  brain: simpleOrgan('המוח', 'Brain', 'images/organs/brain-vintage-anatomy.jpg', 'המוח הוא מרכז הבקרה של הגוף, האחראי על חשיבה, תחושה, זיכרון ותנועה.', 'The brain is the body’s control center for thought, sensation, memory, and movement.'),
  lungs: simpleOrgan('הריאות', 'Lungs', 'images/organs/lungs-vintage-anatomy.jpg', 'הריאות מאפשרות חילוף גזים בין הגוף לאוויר.', 'The lungs enable gas exchange between the body and the air.'),
  liver: simpleOrgan('הכבד', 'Liver', 'images/organs/liver-vintage-anatomy.jpg', 'הכבד מעבד חומרים, מסייע בפירוק רעלים ומייצר מרה.', 'The liver processes substances, helps break down toxins, and produces bile.'),
  stomach: simpleOrgan('הקיבה', 'Stomach', 'images/organs/stomach-vintage-anatomy.jpg', 'הקיבה מערבבת מזון ומתחילה לפרק אותו בעזרת מיצי עיכול.', 'The stomach mixes food and begins breaking it down with digestive juices.'),
  kidneys: simpleOrgan('הכליות', 'Kidneys', 'images/organs/kidneys-vintage-anatomy.jpg', 'הכליות מסננות את הדם, מווסתות נוזלים ומייצרות שתן.', 'The kidneys filter blood, regulate fluids, and produce urine.'),
  pancreas: simpleOrgan('הלבלב', 'Pancreas', 'images/organs/pancreas-vintage-anatomy.jpg', 'הלבלב מפריש אנזימי עיכול ומסייע בוויסות רמת הסוכר בדם.', 'The pancreas releases digestive enzymes and helps regulate blood sugar.'),
  spleen: simpleOrgan('הטחול', 'Spleen', 'images/organs/spleen-vintage-anatomy.jpg', 'הטחול מסנן דם ותומך בפעילות מערכת החיסון.', 'The spleen filters blood and supports the immune system.'),
  intestines: simpleOrgan('המעיים', 'Intestines', 'images/organs/intestines-vintage-anatomy.jpg', 'המעיים ממשיכים את תהליך העיכול וסופגים חומרים מזינים ומים.', 'The intestines continue digestion and absorb nutrients and water.'),
  bladder: simpleOrgan('שלפוחית השתן', 'Urinary Bladder', 'images/organs/urinary-bladder-vintage-anatomy.jpg', 'שלפוחית השתן אוגרת שתן עד להתרוקנות.', 'The urinary bladder stores urine until it is released.'),
  esophagus: simpleOrgan('הוושט', 'Esophagus', 'images/organs/esophagus-vintage-anatomy.jpg', 'הוושט מעביר מזון מן הלוע אל הקיבה.', 'The esophagus moves food from the throat to the stomach.'),
  trachea: simpleOrgan('קנה הנשימה', 'Trachea', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'קנה הנשימה מוביל אוויר אל הסמפונות והריאות.', 'The trachea carries air to the bronchi and lungs.'),
  bronchi: simpleOrgan('הסמפונות', 'Bronchi', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'הסמפונות מתפצלות מקנה הנשימה ומוליכות אוויר לריאות.', 'The bronchi branch from the trachea and carry air into the lungs.'),
  bronchioles: simpleOrgan('הסימפוניות', 'Bronchioles', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'הסימפוניות הן הסתעפויות קטנות של דרכי הנשימה.', 'Bronchioles are small branches of the airways.'),
  thyroid: simpleOrgan('בלוטת התריס', 'Thyroid Gland', 'images/organs/thyroid-vintage-anatomy.jpg', 'בלוטת התריס מפרישה הורמונים המשפיעים על חילוף החומרים.', 'The thyroid gland produces hormones that affect metabolism.'),
  eye: simpleOrgan('העין', 'Eye', 'images/organs/eye-vintage-anatomy.jpg', 'העין קולטת אור ומאפשרת ראייה.', 'The eye detects light and enables vision.'),
  ear: simpleOrgan('האוזן', 'Ear', 'images/organs/ear-vintage-anatomy.jpg', 'האוזן מאפשרת שמיעה ותורמת לשיווי המשקל.', 'The ear enables hearing and contributes to balance.'),
  'inner-ear': simpleOrgan('האוזן הפנימית', 'Inner Ear', 'images/organs/ear-vintage-anatomy.jpg', 'האוזן הפנימית משתתפת בשמיעה ובשיווי משקל.', 'The inner ear supports hearing and balance.')
};

function simpleOrgan(he, en, image, heIntro, enIntro) {
  return richOrgan({
    he, en, image, heIntro, enIntro,
    quickFacts: {
      he: [['מערכת', 'יושלם בהמשך'], ['מיקום', 'יושלם בהמשך'], ['תפקיד', 'יושלם בהמשך'], ['סטטוס', 'תבנית בסיסית']],
      en: [['System', 'To be completed'], ['Location', 'To be completed'], ['Role', 'To be completed'], ['Status', 'Basic template']]
    },
    heSections: genericSections.he,
    enSections: genericSections.en
  });
}

function richOrgan(data) { return data; }
function currentLang() { return body.dataset.lang || 'he'; }
function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value; }

function renderQuickFacts(item, isHe) {
  const facts = isHe ? item.quickFacts.he : item.quickFacts.en;
  document.getElementById('quickFacts').innerHTML = facts.map(([label, value]) => `
    <div class="quick-fact"><span>${label}</span><strong>${value}</strong></div>
  `).join('');
}

function renderOrganPage() {
  const item = organData[organKey] || organData.heart;
  const isHe = currentLang() === 'he';
  document.documentElement.lang = isHe ? 'he' : 'en';
  document.documentElement.dir = isHe ? 'rtl' : 'ltr';
  document.title = `${isHe ? item.he : item.en} | Human Body Interactive Atlas`;

  setText('organPageTitle', isHe ? item.he : item.en);
  setText('organPageIntro', isHe ? item.heIntro : item.enIntro);
  document.getElementById('organPageImage').src = item.image || fallbackImage;
  document.getElementById('organPageImage').alt = item.en;
  renderQuickFacts(item, isHe);

  const titles = isHe
    ? {
      etymology: 'אטימולוגיה ושם האיבר', history: 'היסטוריה וחקר האיבר', function: 'תפקיד פיזיולוגי', structure: 'אנטומיה ומבנה', blood: 'אספקת דם', innervation: 'עצבוב ובקרה', development: 'התפתחות עוברית', health: 'בריאות ומחלות נפוצות', tests: 'בדיקות רפואיות', fact: 'עובדה מעניינת'
    }
    : {
      etymology: 'Etymology and Name', history: 'History and Study', function: 'Physiological Function', structure: 'Anatomy and Structure', blood: 'Blood Supply', innervation: 'Innervation and Control', development: 'Embryological Development', health: 'Health and Common Conditions', tests: 'Medical Tests', fact: 'Interesting Fact'
    };

  const sections = isHe ? item.heSections : item.enSections;
  Object.keys(titles).forEach(key => {
    setText(`${key}Title`, titles[key]);
    setText(`${key}Text`, sections[key]);
  });
}

function toggleOrganPageLanguage() {
  body.dataset.lang = currentLang() === 'he' ? 'en' : 'he';
  renderOrganPage();
}

renderOrganPage();
