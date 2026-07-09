const body = document.body;
const params = new URLSearchParams(window.location.search);
const organKey = params.get('organ') || 'heart';

const fallbackImage = 'images/human-body.jpg';

const baseText = {
  he: {
    history: name => `חקר ${name} התפתח לאורך דורות מתוך שילוב של אנטומיה קלאסית, רפואה קלינית, ניתוחים, הדמיה רפואית ומחקר מודרני. בדף זה מוצג בסיס מסודר שאפשר להרחיב בהמשך למידע היסטורי מפורט יותר.`,
    blood: name => `אספקת הדם של ${name} מאפשרת הובלת חמצן וחומרי מזון לרקמות, וכן ניקוז של דם וחומרי פסולת. בהמשך ניתן להוסיף פירוט מדויק של העורקים והוורידים הקשורים לאיבר.`,
    innervation: name => `העצבוב של ${name} משתתף בבקרה על פעילותו ובתקשורת שלו עם מערכות אחרות בגוף. בחלק מן האיברים הבקרה היא רצונית, ובאחרים היא אוטונומית או משולבת.`,
    development: name => `${name} מתפתח בשלבי העוברות כחלק מן המערכת שאליה הוא שייך. תהליך ההתפתחות כולל התמיינות של רקמות, יצירת מבנה ייחודי והתאמה הדרגתית לתפקוד האיבר לאחר הלידה.`,
    health: name => `שמירה על בריאות ${name} קשורה לאורח חיים, תזונה, פעילות גופנית, הימנעות מגורמי סיכון ובדיקות רפואיות לפי הצורך. בכל חשד לבעיה רפואית יש לפנות לאיש מקצוע רפואי.`,
    tests: name => `בדיקות הקשורות ל${name} נקבעות לפי התסמינים, הגיל, הרקע הרפואי והערכת רופא. ייתכנו בדיקות דם, הדמיה, בדיקות תפקוד או בדיקות ייעודיות אחרות.`,
    fact: name => `${name} הוא חלק ממערכת מורכבת שבה איברים שונים פועלים יחד. הבנת תפקידו עוזרת להבין טוב יותר את תפקוד גוף האדם כולו.`
  },
  en: {
    history: name => `The study of the ${name} developed over generations through classical anatomy, clinical medicine, surgery, medical imaging, and modern research. This page provides an organized foundation that can be expanded later.`,
    blood: name => `The blood supply of the ${name} brings oxygen and nutrients to tissues and helps remove waste. More precise arterial and venous details can be added in a later version.`,
    innervation: name => `The innervation of the ${name} helps regulate its activity and connect it with other body systems. Control may be voluntary, autonomic, or mixed depending on the organ.`,
    development: name => `The ${name} develops during embryonic growth as part of its body system. Development includes tissue differentiation, structural formation, and gradual adaptation to function after birth.`,
    health: name => `The health of the ${name} is influenced by lifestyle, nutrition, physical activity, risk factors, and appropriate medical checks. Medical concerns should be evaluated by a healthcare professional.`,
    tests: name => `Tests related to the ${name} depend on symptoms, age, medical history, and clinical evaluation. They may include blood tests, imaging, functional tests, or other specialized studies.`,
    fact: name => `The ${name} is part of a complex system in which several organs work together. Understanding its role helps explain how the human body functions as a whole.`
  }
};

const organData = {
  heart: richOrgan({
    he: 'הלב', en: 'Heart', image: 'images/organs/heart-vintage-anatomy.jpg',
    heIntro: 'הלב הוא איבר שרירי חלול הפועל כמשאבה המרכזית של מערכת הדם. הוא מזרים דם לריאות לצורך חמצון, ולאחר מכן מזרים דם עשיר בחמצן לכל רקמות הגוף.',
    enIntro: 'The heart is a hollow muscular organ that acts as the central pump of the circulatory system. It sends blood to the lungs for oxygenation and then pumps oxygen-rich blood to the body tissues.',
    quickFacts: { he: [['מערכת', 'מערכת הדם'], ['מיקום', 'מרכז בית החזה, מעט שמאלה מקו האמצע'], ['מבנה בסיסי', 'ארבעה חללים ושסתומים'], ['תפקיד', 'הזרמת דם לריאות ולגוף']], en: [['System', 'Circulatory system'], ['Location', 'Central chest, slightly left of midline'], ['Basic structure', 'Four chambers and valves'], ['Role', 'Pumps blood to lungs and body']] },
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
  mouth: detailedOrgan('הפה', 'Mouth', 'images/organs/intestines-vintage-anatomy.jpg', 'מערכת העיכול', 'Digestive system', 'החלק הקדמי של הפנים', 'Front of the face', 'לעיסה, דיבור ותחילת העיכול', 'Chewing, speech, and the beginning of digestion'),
  nasal: detailedOrgan('חלל האף', 'Nasal Cavity', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'מערכת הנשימה והחושים', 'Respiratory and sensory systems', 'בתוך האף והפנים', 'Inside the nose and face', 'סינון, חימום ולחלוח האוויר', 'Filters, warms, and humidifies air'),
  diaphragm: detailedOrgan('הסרעפת', 'Diaphragm', 'images/organs/lungs-vintage-anatomy.jpg', 'מערכת הנשימה והשרירים', 'Respiratory and muscular systems', 'בין בית החזה לבטן', 'Between chest and abdomen', 'שריר מרכזי בנשימה', 'Main muscle of breathing'),
  larynx: detailedOrgan('הגרון', 'Larynx', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'מערכת הנשימה', 'Respiratory system', 'קדמת הצוואר', 'Front of the neck', 'נשימה והפקת קול', 'Breathing and voice production'),
  gallbladder: detailedOrgan('כיס המרה', 'Gallbladder', 'images/organs/liver-vintage-anatomy.jpg', 'מערכת העיכול', 'Digestive system', 'מתחת לכבד', 'Under the liver', 'אגירת מרה לעיכול שומנים', 'Stores bile for fat digestion'),
  appendix: detailedOrgan('התוספתן', 'Appendix', 'images/organs/intestines-vintage-anatomy.jpg', 'מערכת העיכול והחיסון', 'Digestive and immune systems', 'תחילת המעי הגס', 'Beginning of the large intestine', 'תפקיד חיסוני מסוים', 'A limited immune-related role'),
  rectum: detailedOrgan('החלחולת', 'Rectum', 'images/organs/intestines-vintage-anatomy.jpg', 'מערכת העיכול', 'Digestive system', 'סוף המעי הגס', 'End of the large intestine', 'אגירת פסולת לפני יציאה', 'Stores waste before elimination'),
  brain: detailedOrgan('המוח', 'Brain', 'images/organs/brain-vintage-anatomy.jpg', 'מערכת העצבים', 'Nervous system', 'חלל הגולגולת', 'Cranial cavity', 'בקרה, חשיבה, תחושה וזיכרון', 'Control, thought, sensation, and memory'),
  spinal: detailedOrgan('חוט השדרה', 'Spinal Cord', 'images/organs/brain-vintage-anatomy.jpg', 'מערכת העצבים', 'Nervous system', 'בתוך עמוד השדרה', 'Inside the spinal column', 'העברת אותות עצביים', 'Transmits nerve signals'),
  nerves: detailedOrgan('עצבים היקפיים', 'Peripheral Nerves', 'images/organs/brain-vintage-anatomy.jpg', 'מערכת העצבים', 'Nervous system', 'ברחבי הגוף', 'Throughout the body', 'קישור בין המוח, חוט השדרה והגוף', 'Connects brain, spinal cord, and body'),
  cerebellum: detailedOrgan('המוחון', 'Cerebellum', 'images/organs/brain-vintage-anatomy.jpg', 'מערכת העצבים', 'Nervous system', 'חלק אחורי־תחתון של המוח', 'Back-lower part of the brain', 'קואורדינציה ושיווי משקל', 'Coordination and balance'),
  sciatic: detailedOrgan('העצב הסיאטי', 'Sciatic Nerve', 'images/organs/brain-vintage-anatomy.jpg', 'מערכת העצבים', 'Nervous system', 'מהאגן אל הרגל', 'From pelvis into the leg', 'העברת אותות לרגל', 'Carries signals to the leg'),
  lungs: detailedOrgan('הריאות', 'Lungs', 'images/organs/lungs-vintage-anatomy.jpg', 'מערכת הנשימה', 'Respiratory system', 'בית החזה', 'Chest cavity', 'חילוף גזים בין אוויר לדם', 'Gas exchange between air and blood'),
  liver: detailedOrgan('הכבד', 'Liver', 'images/organs/liver-vintage-anatomy.jpg', 'מערכת העיכול וחילוף החומרים', 'Digestive and metabolic system', 'החלק הימני העליון של הבטן', 'Upper right abdomen', 'עיבוד חומרים, ייצור מרה ופירוק רעלים', 'Metabolism, bile production, and detoxification'),
  stomach: detailedOrgan('הקיבה', 'Stomach', 'images/organs/stomach-vintage-anatomy.jpg', 'מערכת העיכול', 'Digestive system', 'בטן עליונה', 'Upper abdomen', 'ערבול מזון ותחילת פירוקו', 'Mixes food and begins digestion'),
  kidneys: detailedOrgan('הכליות', 'Kidneys', 'images/organs/kidneys-vintage-anatomy.jpg', 'מערכת השתן', 'Urinary system', 'אזור המותניים, משני צדי עמוד השדרה', 'Flank region on both sides of the spine', 'סינון דם וייצור שתן', 'Filters blood and produces urine'),
  pancreas: detailedOrgan('הלבלב', 'Pancreas', 'images/organs/pancreas-vintage-anatomy.jpg', 'מערכת העיכול והמערכת האנדוקרינית', 'Digestive and endocrine systems', 'מאחורי הקיבה', 'Behind the stomach', 'אנזימי עיכול וויסות סוכר', 'Digestive enzymes and blood sugar regulation'),
  spleen: detailedOrgan('הטחול', 'Spleen', 'images/organs/spleen-vintage-anatomy.jpg', 'מערכת הלימפה והחיסון', 'Lymphatic and immune system', 'בטן שמאלית עליונה', 'Upper left abdomen', 'סינון דם ותמיכה חיסונית', 'Filters blood and supports immunity'),
  intestines: detailedOrgan('המעיים', 'Intestines', 'images/organs/intestines-vintage-anatomy.jpg', 'מערכת העיכול', 'Digestive system', 'חלל הבטן', 'Abdominal cavity', 'ספיגת מזון, מים והובלת פסולת', 'Absorbs nutrients and water and moves waste'),
  bladder: detailedOrgan('שלפוחית השתן', 'Urinary Bladder', 'images/organs/urinary-bladder-vintage-anatomy.jpg', 'מערכת השתן', 'Urinary system', 'אגן תחתון', 'Lower pelvis', 'אגירת שתן עד להתרוקנות', 'Stores urine before release'),
  esophagus: detailedOrgan('הוושט', 'Esophagus', 'images/organs/esophagus-vintage-anatomy.jpg', 'מערכת העיכול', 'Digestive system', 'בין הלוע לקיבה', 'Between throat and stomach', 'העברת מזון לקיבה', 'Moves food to the stomach'),
  trachea: detailedOrgan('קנה הנשימה', 'Trachea', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'מערכת הנשימה', 'Respiratory system', 'צוואר ובית חזה עליון', 'Neck and upper chest', 'הובלת אוויר לסמפונות', 'Carries air to the bronchi'),
  bronchi: detailedOrgan('הסמפונות', 'Bronchi', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'מערכת הנשימה', 'Respiratory system', 'בתוך הריאות', 'Inside the lungs', 'חלוקת האוויר בין חלקי הריאות', 'Distributes air through the lungs'),
  bronchioles: detailedOrgan('הסימפוניות', 'Bronchioles', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'מערכת הנשימה', 'Respiratory system', 'עומק הריאות', 'Deep inside the lungs', 'הובלת אוויר לענפים הקטנים של הריאות', 'Carries air to smaller lung branches'),
  thyroid: detailedOrgan('בלוטת התריס', 'Thyroid Gland', 'images/organs/thyroid-vintage-anatomy.jpg', 'המערכת האנדוקרינית', 'Endocrine system', 'קדמת הצוואר', 'Front of the neck', 'הפרשת הורמונים המשפיעים על חילוף החומרים', 'Produces hormones that affect metabolism'),
  eye: detailedOrgan('העין', 'Eye', 'images/organs/eye-vintage-anatomy.jpg', 'מערכת החושים', 'Sensory system', 'ארובת העין', 'Eye socket', 'קליטת אור וראייה', 'Detects light and enables vision'),
  ear: detailedOrgan('האוזן', 'Ear', 'images/organs/ear-vintage-anatomy.jpg', 'מערכת החושים', 'Sensory system', 'צדי הראש ועצם הרקה', 'Side of the head and temporal bone', 'שמיעה ושיווי משקל', 'Hearing and balance'),
  'inner-ear': detailedOrgan('האוזן הפנימית', 'Inner Ear', 'images/organs/ear-vintage-anatomy.jpg', 'מערכת החושים', 'Sensory system', 'בתוך עצם הרקה', 'Inside the temporal bone', 'שמיעה ושיווי משקל עדינים', 'Fine hearing and balance control'),
  skull: detailedOrgan('הגולגולת', 'Skull', fallbackImage, 'מערכת השלד', 'Skeletal system', 'ראש', 'Head', 'הגנה על המוח ועיצוב הראש', 'Protects the brain and shapes the head'),
  ribcage: detailedOrgan('כלוב הצלעות', 'Rib Cage', fallbackImage, 'מערכת השלד', 'Skeletal system', 'בית החזה', 'Chest', 'הגנה על הלב והריאות', 'Protects heart and lungs'),
  pelvis: detailedOrgan('האגן', 'Pelvis', fallbackImage, 'מערכת השלד', 'Skeletal system', 'בסיס הגו', 'Base of trunk', 'תמיכה וחיבור לרגליים', 'Support and connection to legs'),
  spine: detailedOrgan('עמוד השדרה', 'Spine', fallbackImage, 'מערכת השלד', 'Skeletal system', 'גב', 'Back', 'תמיכה והגנה על חוט השדרה', 'Support and spinal cord protection'),
  humerus: detailedOrgan('עצם הזרוע', 'Humerus', fallbackImage, 'מערכת השלד', 'Skeletal system', 'זרוע עליונה', 'Upper arm', 'תנועה ותמיכה בזרוע', 'Movement and support of arm'),
  femur: detailedOrgan('עצם הירך', 'Femur', fallbackImage, 'מערכת השלד', 'Skeletal system', 'ירך', 'Thigh', 'נשיאת משקל ותנועה', 'Weight bearing and movement'),
  'chest-muscles': detailedOrgan('שרירי החזה', 'Chest Muscles', fallbackImage, 'מערכת השרירים', 'Muscular system', 'בית החזה', 'Chest', 'תנועת הזרועות ותמיכה', 'Arm movement and support'),
  abdominals: detailedOrgan('שרירי הבטן', 'Abdominal Muscles', fallbackImage, 'מערכת השרירים', 'Muscular system', 'דופן הבטן', 'Abdominal wall', 'יציבה ותנועת הגו', 'Posture and trunk movement'),
  'leg-muscles': detailedOrgan('שרירי הרגליים', 'Leg Muscles', fallbackImage, 'מערכת השרירים', 'Muscular system', 'רגליים', 'Legs', 'הליכה, עמידה וקפיצה', 'Walking, standing, and jumping'),
  deltoid: detailedOrgan('שריר הדלתא', 'Deltoid', fallbackImage, 'מערכת השרירים', 'Muscular system', 'כתף', 'Shoulder', 'הרמת הזרוע', 'Raises the arm'),
  biceps: detailedOrgan('שריר הזרוע הדו־ראשי', 'Biceps', fallbackImage, 'מערכת השרירים', 'Muscular system', 'זרוע קדמית', 'Front upper arm', 'כיפוף המרפק', 'Bends the elbow'),
  quadriceps: detailedOrgan('הארבע־ראשי', 'Quadriceps', fallbackImage, 'מערכת השרירים', 'Muscular system', 'קדמת הירך', 'Front thigh', 'יישור הברך', 'Extends the knee'),
  ureters: detailedOrgan('השופכנים', 'Ureters', 'images/organs/kidneys-vintage-anatomy.jpg', 'מערכת השתן', 'Urinary system', 'בין הכליות לשלפוחית', 'Between kidneys and bladder', 'הובלת שתן', 'Carries urine'),
  'renal-arteries': detailedOrgan('עורקי הכליה', 'Renal Arteries', 'images/organs/kidneys-vintage-anatomy.jpg', 'מערכת הדם והשתן', 'Circulatory and urinary systems', 'ליד הכליות', 'Near the kidneys', 'אספקת דם לכליות', 'Supplies blood to kidneys'),
  urethra: detailedOrgan('השופכה', 'Urethra', 'images/organs/urinary-bladder-vintage-anatomy.jpg', 'מערכת השתן', 'Urinary system', 'מתחת לשלפוחית', 'Below the bladder', 'הוצאת שתן מן הגוף', 'Carries urine out of the body'),
  tongue: detailedOrgan('הלשון', 'Tongue', 'images/organs/eye-vintage-anatomy.jpg', 'מערכת העיכול והחושים', 'Digestive and sensory systems', 'חלל הפה', 'Oral cavity', 'טעם, דיבור ובליעה', 'Taste, speech, and swallowing'),
  skin: detailedOrgan('העור', 'Skin', fallbackImage, 'מערכת הכסות והחושים', 'Integumentary and sensory systems', 'כל פני הגוף', 'Entire body surface', 'הגנה ותחושה', 'Protection and sensation'),
  nose: detailedOrgan('האף', 'Nose', 'images/organs/trachea-bronchi-vintage-anatomy.jpg', 'מערכת הנשימה והחושים', 'Respiratory and sensory systems', 'מרכז הפנים', 'Center of face', 'הרחה וסינון אוויר', 'Smell and air filtering'),
  testes: detailedOrgan('האשכים', 'Testes', fallbackImage, 'מערכת הרבייה הזכרית', 'Male reproductive system', 'שק האשכים', 'Scrotum', 'ייצור תאי זרע והורמונים', 'Produces sperm and hormones'),
  prostate: detailedOrgan('הערמונית', 'Prostate', fallbackImage, 'מערכת הרבייה הזכרית', 'Male reproductive system', 'מתחת לשלפוחית השתן', 'Below the bladder', 'הפרשת נוזל לזרע', 'Secretes fluid for semen'),
  'vas-deferens': detailedOrgan('צינור הזרע', 'Vas Deferens', fallbackImage, 'מערכת הרבייה הזכרית', 'Male reproductive system', 'באגן', 'Pelvis', 'הובלת תאי זרע', 'Carries sperm'),
  'seminal-vesicles': detailedOrgan('שלפוחיות הזרע', 'Seminal Vesicles', fallbackImage, 'מערכת הרבייה הזכרית', 'Male reproductive system', 'מאחורי שלפוחית השתן', 'Behind bladder', 'הפרשת נוזל זרע', 'Secretes seminal fluid'),
  ovaries: detailedOrgan('השחלות', 'Ovaries', fallbackImage, 'מערכת הרבייה הנשית', 'Female reproductive system', 'אגן', 'Pelvis', 'ייצור ביציות והורמונים', 'Produce eggs and hormones'),
  uterus: detailedOrgan('הרחם', 'Uterus', fallbackImage, 'מערכת הרבייה הנשית', 'Female reproductive system', 'אגן', 'Pelvis', 'התפתחות היריון', 'Supports pregnancy'),
  vagina: detailedOrgan('הנרתיק', 'Vagina', fallbackImage, 'מערכת הרבייה הנשית', 'Female reproductive system', 'אגן תחתון', 'Lower pelvis', 'חיבור לצוואר הרחם ולחוץ הגוף', 'Connects cervix to external body'),
  'fallopian-tubes': detailedOrgan('החצוצרות', 'Fallopian Tubes', fallbackImage, 'מערכת הרבייה הנשית', 'Female reproductive system', 'בין השחלות לרחם', 'Between ovaries and uterus', 'הובלת ביצית', 'Carries egg cells'),
  cervix: detailedOrgan('צוואר הרחם', 'Cervix', fallbackImage, 'מערכת הרבייה הנשית', 'Female reproductive system', 'תחתית הרחם', 'Lower uterus', 'חיבור בין רחם לנרתיק', 'Connects uterus and vagina')
};

function detailedOrgan(he, en, image, heSystem, enSystem, heLocation, enLocation, heRole, enRole) {
  return richOrgan({
    he, en, image,
    heIntro: `${he} הוא איבר או מבנה מרכזי בגוף האדם. הוא שייך ל${heSystem}, ממוקם ב${heLocation}, ותפקידו העיקרי הוא ${heRole}.`,
    enIntro: `The ${en} is an important human organ or structure. It belongs to the ${enSystem}, is located in the ${enLocation}, and its main role is to ${enRole.toLowerCase()}.`,
    quickFacts: { he: [['מערכת', heSystem], ['מיקום', heLocation], ['תפקיד', heRole], ['מבנה', 'מותאם לתפקידו האנטומי']], en: [['System', enSystem], ['Location', enLocation], ['Role', enRole], ['Structure', 'Adapted to its anatomical function']] },
    heSections: {
      etymology: `השם ${he} הוא השם האנטומי המקובל בעברית. בדף זה הוא מוצג יחד עם השם האנגלי ${en}, כדי לאפשר לימוד דו־לשוני ושימוש נוח באתר.`, history: baseText.he.history(he), function: `${he} מבצע תפקיד חיוני: ${heRole}. תפקיד זה משתלב עם פעילותם של איברים אחרים ומסייע לשמירה על תפקוד תקין של הגוף.`, structure: `המבנה של ${he} מותאם היטב לתפקידו. הוא כולל רקמות, חללים, צינורות, כלי דם או סיבי עצב בהתאם לאופיו האנטומי ולמערכת שאליה הוא שייך.`, blood: baseText.he.blood(he), innervation: baseText.he.innervation(he), development: baseText.he.development(he), health: baseText.he.health(he), tests: baseText.he.tests(he), fact: baseText.he.fact(he)
    },
    enSections: {
      etymology: `The name ${en} is the standard English anatomical term. It is presented together with the Hebrew name ${he} to support bilingual learning and easy use of the atlas.`, history: baseText.en.history(en), function: `The ${en} performs an essential role: ${enRole.toLowerCase()}. This role works together with other organs and helps maintain normal body function.`, structure: `The structure of the ${en} is adapted to its role. Depending on the organ, it may include tissues, chambers, ducts, vessels, or nerve fibers related to its body system.`, blood: baseText.en.blood(en), innervation: baseText.en.innervation(en), development: baseText.en.development(en), health: baseText.en.health(en), tests: baseText.en.tests(en), fact: baseText.en.fact(en)
    }
  });
}

function richOrgan(data) { return data; }
function catalogOrgan(key) {
  for (const system of Object.values(systems)) {
    const item = system.organs.find(candidate => candidate.key === key);
    if (item) {
      return detailedOrgan(item.he[0], item.en[0], organImages[key] || fallbackImage, system.title.he, system.title.en, 'מסומן באיור האנטומי', 'Marked in the anatomical illustration', item.he[1], item.en[1]);
    }
  }
  return null;
}
function unknownOrgan(key) { return detailedOrgan('איבר לא מזוהה', 'Unknown Organ', fallbackImage, 'אטלס גוף האדם', 'Human body atlas', 'לא צוין', 'Not specified', 'יושלם בהמשך', 'To be completed'); }
function currentLang() { return body.dataset.lang || 'he'; }
function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value; }
function renderQuickFacts(item, isHe) { const facts = isHe ? item.quickFacts.he : item.quickFacts.en; document.getElementById('quickFacts').innerHTML = facts.map(([label, value]) => `<div class="quick-fact"><span>${label}</span><strong>${value}</strong></div>`).join(''); }

function renderOrganPage() {
  const item = organData[organKey] || catalogOrgan(organKey) || unknownOrgan(organKey);
  const isHe = currentLang() === 'he';
  document.documentElement.lang = isHe ? 'he' : 'en';
  document.documentElement.dir = isHe ? 'rtl' : 'ltr';
  document.title = `${isHe ? item.he : item.en} | Human Body Interactive Atlas`;
  setText('organPageTitle', isHe ? item.he : item.en);
  setText('organPageIntro', isHe ? item.heIntro : item.enIntro);
  document.getElementById('organPageImage').src = item.image || fallbackImage;
  document.getElementById('organPageImage').alt = item.en;
  renderQuickFacts(item, isHe);
  const titles = isHe ? { etymology: 'אטימולוגיה ושם האיבר', history: 'היסטוריה וחקר האיבר', function: 'תפקיד פיזיולוגי', structure: 'אנטומיה ומבנה', blood: 'אספקת דם', innervation: 'עצבוב ובקרה', development: 'התפתחות עוברית', health: 'בריאות ומחלות נפוצות', tests: 'בדיקות רפואיות', fact: 'עובדה מעניינת' } : { etymology: 'Etymology and Name', history: 'History and Study', function: 'Physiological Function', structure: 'Anatomy and Structure', blood: 'Blood Supply', innervation: 'Innervation and Control', development: 'Embryological Development', health: 'Health and Common Conditions', tests: 'Medical Tests', fact: 'Interesting Fact' };
  const sections = isHe ? item.heSections : item.enSections;
  Object.keys(titles).forEach(key => { setText(`${key}Title`, titles[key]); setText(`${key}Text`, sections[key]); });
}

function toggleOrganPageLanguage() {
  body.dataset.lang = currentLang() === 'he' ? 'en' : 'he';
  localStorage.setItem('atlas-language', body.dataset.lang);
  renderOrganPage();
}

const savedLanguage = localStorage.getItem('atlas-language');
if (savedLanguage === 'he' || savedLanguage === 'en') body.dataset.lang = savedLanguage;
renderOrganPage();
