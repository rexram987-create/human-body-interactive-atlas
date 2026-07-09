# אטלס גוף האדם האינטראקטיבי  
# Human Body Interactive Atlas

פרויקט דו־לשוני בעברית ובאנגלית ליצירת אתר לימודי אינטראקטיבי על גוף האדם.  
A bilingual Hebrew-English educational project for building an interactive website about the human body.

> **Medical disclaimer:** This project is intended for general education only. It is not medical advice and is not a substitute for professional diagnosis or treatment.

---

## עברית

### מטרת הפרויקט
האתר יציג איור של גוף האדם ואיבריו הפנימיים. כאשר המשתמש ילחץ על איבר מסוים, ייפתח חלון צף קטן עם הסבר קצר וברור על אותו איבר.

### מה קיים כרגע
- דף בית דו־לשוני: עברית ואנגלית.
- כפתור מעבר שפה.
- הדגמה ראשונית של גוף האדם עם איברים לחיצים.
- חלונות צפים עם הסברים בסיסיים.
- עיצוב רספונסיבי שמתאים גם לטלפון וגם למחשב.

### מה נוסיף בהמשך
- שילוב האיור ההיסטורי המקורי של גוף האדם.
- מיקום מדויק של נקודות לחיצה על האיברים שבתמונה.
- הרחבת המידע על כל איבר.
- תמיכה במערכות גוף נוספות: שלד, שרירים, עצבים, עיכול, נשימה ועוד.
- מקורות מידע אמינים.

### מקור תמונה מתוכנן
בשלב הבא ניתן לשלב את התמונה:

**Internal Organs of the Human Body from The Household Physician, 1905**

לפי Wikimedia Commons, התמונה מסומנת כ־**Public Domain** / נחלת הכלל.

---

## English

### Project Goal
The website will display an illustration of the human body and its internal organs. When the user clicks a specific organ, a small popup window will open with a clear explanation about that organ.

### Current Version
- Bilingual homepage: Hebrew and English.
- Language toggle button.
- Initial interactive body demo with clickable organs.
- Popup windows with basic explanations.
- Responsive design for both mobile and desktop.
- 8 body systems and 61 interactive structures.
- Full information-page fallback for every structure.
- Persistent language preference and keyboard-accessible navigation.
- Automated validation for data and asset integrity.

### Planned Additions
- Integration of the original historical human-body illustration.
- Accurate clickable hotspots on the image organs.
- Expanded information for each organ.
- Support for additional body systems: skeleton, muscles, nerves, digestion, respiration, and more.
- Reliable information sources.
- Professional medical review and per-image provenance records.

### Local validation

Run:

```bash
npm test
```

No build step is required. Serve the repository root with any static HTTP server.

### Licensing and sources

- Source code: MIT License. See `LICENSE`.
- Medical references and image-status notes: see `SOURCES.md`.
- Images are not covered by the MIT license unless their individual provenance explicitly permits it.

### Planned Image Source
The next stage may integrate the image:

**Internal Organs of the Human Body from The Household Physician, 1905**

According to Wikimedia Commons, the image is marked as **Public Domain**.

---

## Suggested GitHub Pages Setup

1. Open the repository settings.
2. Go to **Pages**.
3. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
4. Save.

After GitHub Pages finishes building, the site should be available at:

`https://rexram987-create.github.io/human-body-interactive-atlas/`
