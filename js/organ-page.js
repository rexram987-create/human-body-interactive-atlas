const body = document.body;
const params = new URLSearchParams(window.location.search);
const organKey = params.get('organ') || 'heart';

const fallbackImage = 'images/human-body.jpg';

const organData = {
  heart: organ('הלב', 'Heart', 'images/organs/heart-vintage-anatomy.jpg', 'הלב הוא משאבה שרירית שמזרימה דם לכל חלקי הגוף.', 'The heart is a muscular pump that circulates blood throughout the body.'),
  brain: organ('המוח', 'Brain', 'images/organs/brain-vintage-anatomy.jpg', 'המוח הוא מרכז הבקרה של הגוף, האחראי על חשיבה, תחושה, זיכרון ותנועה.', 'The brain is the body’s control center for thought, sensation, memory, and movement.'),
  lungs: organ('הריאות', 'Lungs', 'images/organs/lungs-vintage-anatomy.jpg', 'הריאות מאפשרות חילוף גזים בין הגוף לאוויר.', 'The lungs enable gas exchange between the body and the air.'),
  liver: organ('הכבד', 'Liver', 'images/organs/liver-vintage-anatomy.jpg', 'הכבד מעבד חומרים, מסייע בפירוק רעלים ומייצר מרה.', 'The liver processes substances, helps break down toxins, and produces bile.'),
  stomach: organ('הקיבה', 'Stomach', 'images/organs/stomach-vintage-anatomy.jpg', 'הקיבה מערבבת מזון ומתחילה לפרק אותו בעזרת מיצי עיכול.', 'The stomach mixes food and begins breaking it down with digestive juices.'),
  kidneys: organ('הכליות', 'Kidneys', 'images/organs/kidneys-vintage-anatomy.jpg', 'הכליות מסננות את הדם, מווסתות נוזלים ומייצרות שתן.', 'The kidneys filter blood, regulate fluids, and produce urine.'),
  pancreas: organ('הלבלב', 'Pancreas', 'images/organs/pancreas-vintage-anatomy.jpg', 'הלבלב מפריש אנזימי עיכול ומסייע בוויסות רמת הסוכר בדם.', 'The pancreas releases digestive enzymes and helps regulate blood sugar.'),
  spleen: organ('הטחול', 'Spleen', 'images/organs/spleen-vintage-anatomy.jpg', 'הטחול מסנן דם ותומך בפעילות מערכת החיסון.', 'The spleen filters blood and supports the immune system.'),
  intestines: organ('המעיים', 'Intestines', 'images/organs/intestines-vintage-anatomy.jpg', 'המעיים ממשיכים את תהליך העיכול וסופגים חומרים מזינים ומים.', 'The intestines continue digestion and absorb nutrients and water.'),
  bladder: organ('שלפוחית השתן', 'Urinary Bladder', 'images/organs/urinary-bladder-vintage-anatomy.jpg', 'שלפוחית השתן אוגרת שתן עד להתרוקנות.', 'The urinary bladder stores urine until it is released.'),
  esophagus: organ('הוושט', 'Esophagus', 'images/organs/esophagus-vintage-anatomy.jpg', 'הוושט מעביר מזון מן הלוע אל הקיבה.', 'The esophagus moves food from the throat to the stomach.'),
  trachea: organ('קנה הנשימה', 'Trachea', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'קנה הנשימה מוביל אוויר אל הסמפונות והריאות.', 'The trachea carries air to the bronchi and lungs.'),
  bronchi: organ('הסמפונות', 'Bronchi', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'הסמפונות מתפצלות מקנה הנשימה ומוליכות אוויר לריאות.', 'The bronchi branch from the trachea and carry air into the lungs.'),
  bronchioles: organ('הסימפוניות', 'Bronchioles', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'הסימפוניות הן הסתעפויות קטנות של דרכי הנשימה.', 'Bronchioles are small branches of the airways.'),
  thyroid: organ('בלוטת התריס', 'Thyroid Gland', 'images/organs/thyroid-vintage-anatomy.jpg', 'בלוטת התריס מפרישה הורמונים המשפיעים על חילוף החומרים.', 'The thyroid gland produces hormones that affect metabolism.'),
  eye: organ('העין', 'Eye', 'images/organs/eye-vintage-anatomy.jpg', 'העין קולטת אור ומאפשרת ראייה.', 'The eye detects light and enables vision.'),
  ear: organ('האוזן', 'Ear', 'images/organs/ear-vintage-anatomy.jpg', 'האוזן מאפשרת שמיעה ותורמת לשיווי המשקל.', 'The ear enables hearing and contributes to balance.'),
  'inner-ear': organ('האוזן הפנימית', 'Inner Ear', 'images/organs/ear-vintage-anatomy.jpg', 'האוזן הפנימית משתתפת בשמיעה ובשיווי משקל.', 'The inner ear supports hearing and balance.')
};

function organ(he, en, image, heIntro, enIntro) {
  return {
    he, en, image, heIntro, enIntro,
    heSections: {
      function: 'האיבר משתתף בתפקוד חיוני של הגוף ותורם לשמירה על איזון ובריאות.',
      structure: 'מבנה האיבר מותאם לתפקידו, עם רקמות וכלי דם המסייעים לפעילותו התקינה.',
      health: 'שמירה על אורח חיים בריא, תזונה מתאימה ובדיקות לפי הצורך יכולות לסייע בשמירה על תפקודו.',
      fact: 'דף זה הוא בסיס להרחבה עתידית: בהמשך ניתן להוסיף גלריה, מקורות, מחלות נפוצות ומידע אנטומי מתקדם.'
    },
    enSections: {
      function: 'This organ supports an essential body function and helps maintain balance and health.',
      structure: 'Its structure is adapted to its role, with tissues and blood vessels that support normal function.',
      health: 'A healthy lifestyle, appropriate nutrition, and checkups when needed can help maintain its function.',
      fact: 'This page is a foundation for future expansion: gallery, sources, common conditions, and advanced anatomy can be added later.'
    }
  };
}

function currentLang() { return body.dataset.lang || 'he'; }

function renderOrganPage() {
  const item = organData[organKey] || organData.heart;
  const isHe = currentLang() === 'he';
  document.documentElement.lang = isHe ? 'he' : 'en';
  document.documentElement.dir = isHe ? 'rtl' : 'ltr';
  document.title = `${isHe ? item.he : item.en} | Human Body Interactive Atlas`;

  document.getElementById('organPageTitle').textContent = isHe ? item.he : item.en;
  document.getElementById('organPageIntro').textContent = isHe ? item.heIntro : item.enIntro;
  document.getElementById('organPageImage').src = item.image || fallbackImage;
  document.getElementById('organPageImage').alt = item.en;

  document.getElementById('functionTitle').textContent = isHe ? 'תפקיד עיקרי' : 'Main Function';
  document.getElementById('structureTitle').textContent = isHe ? 'מבנה כללי' : 'General Structure';
  document.getElementById('healthTitle').textContent = isHe ? 'בריאות ובדיקות' : 'Health and Checks';
  document.getElementById('factTitle').textContent = isHe ? 'עובדה והמשך פיתוח' : 'Fact and Future Expansion';

  const sections = isHe ? item.heSections : item.enSections;
  document.getElementById('functionText').textContent = sections.function;
  document.getElementById('structureText').textContent = sections.structure;
  document.getElementById('healthText').textContent = sections.health;
  document.getElementById('factText').textContent = sections.fact;
}

function toggleOrganPageLanguage() {
  body.dataset.lang = currentLang() === 'he' ? 'en' : 'he';
  renderOrganPage();
}

renderOrganPage();
