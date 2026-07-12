# Příručka pro údržbu portfolia

Praktický návod, jak web jednoduše měnit a přidávat projekty. Web běží na
**https://shatanga.github.io/portfolio/** a po každém `git push` se sám
přebuildí (za ~1–2 minuty).

> Všechno, co budeš běžně měnit, je buď **název složky s fotkami**, nebo soubor
> **`src/config.js`**. Nic jiného upravovat nemusíš.

---

## 0. Co potřebuješ jednou nastavit

Na počítači musí být:
- **Node.js** (verze 20+) — https://nodejs.org
- **Git** — https://git-scm.com

První stažení projektu na nový počítač:
```bash
git clone https://github.com/shatanga/portfolio.git
cd portfolio
npm install
```

---

## 1. Zlatý postup (platí skoro pro všechno)

Ať měníš cokoli, workflow je vždycky stejný:

```bash
npm run gallery        # zpracuje fotky + aktualizuje data (když jsi sáhl na fotky)
git add -A
git commit -m "kratky popis zmeny"
git push
```

- `npm run gallery` spouštěj **jen když jsi přidal/odebral fotky nebo složku**.
  Když měníš jen texty v `config.js`, můžeš ho přeskočit.
- Po `git push` se web sám nasadí. Průběh: https://github.com/shatanga/portfolio/actions

Chceš si to napřed prohlédnout lokálně, než to nahraješ?
```bash
npm run dev
```
a otevři http://localhost:4321/portfolio/ (ukončíš klávesou `Ctrl+C`).

---

## 2. Přidat nový projekt

1. Vytvoř složku s fotkami pojmenovanou podle vzoru **`Firma - Země - typ`**, např.:
   ```
   Nova Firma - Germany - paper mill
   ```
   a dej ji do hlavní složky projektu (`work_portfolio`).
2. Spusť zlatý postup:
   ```bash
   npm run gallery
   git add -A && git commit -m "Add Nova Firma project" && git push
   ```

Fotky se automaticky zmenší, seřadí od nejnovějších a vytvoří se stránka galerie.
Původní velké fotky zůstávají jen u tebe na disku (na web se nenahrávají).

### Víc tagů (štítků)
Za zemí můžeš přidat víc segmentů oddělených ` - ` a každý bude samostatný štítek:
```
Keller Lufttechnik - Germany - MinERALiX GmbH - construction rubble waste processing
```
→ štítky: `Germany` · `MinERALiX GmbH` · `construction rubble waste processing`

### Dvě stejně pojmenované firmy
Když máš dvě stejné (např. dvě „Mondi paper mill"), přidej na konec `II`:
```
Mondi - Czech Republic - paper mill II
```
Na webu se `II` samo skryje (na štítku bude jen „paper mill"), ale adresa
galerie zůstane jedinečná.

---

## 3. Změnit náhledovou (cover) fotku galerie

Cover fotky se nastavují v **`src/config.js`** v sekci `covers`. Klíč je „slug"
projektu (název složky malými písmeny, mezery nahrazené pomlčkami), hodnota je
**původní název souboru** fotky.

```js
export const covers = {
  'dreher-hungary-brewery': 'TimePhoto_20260227_173907.jpg',
  // ... další projekty
};
```

Když neznáš přesný název souboru, otevři složku s fotkami a najdi ho tam.
Cokoli, co v `covers` není uvedené, použije automaticky nejnovější fotku.

Po úpravě:
```bash
npm run gallery
git add -A && git commit -m "Change cover for Dreher" && git push
```

---

## 4. Odebrat konkrétní fotky z galerie

Když se do galerie připletla špatná/soukromá fotka, přidej ji do sekce
`exclude` v **`src/config.js`** (klíč = slug, hodnota = pole názvů souborů):

```js
export const exclude = {
  'alizay-france-dismantling-paper-mill': ['20220417_155025.jpg', '20220417_155012.jpg'],
};
```

Pak: `npm run gallery` → commit → push.

---

## 5. Přejmenovat projekt nebo změnit štítky

Přejmenuj **složku** s fotkami (to je zdroj názvu i štítků).

> ⚠️ **Důležité:** přejmenováním složky se změní i „slug" (adresa). Když má
> projekt nastavený cover v `covers` (nebo `exclude`), **musíš stejně
> přejmenovat i klíč** v `src/config.js`, jinak cover přestane fungovat.

Příklad – přejmenování „Kell" na „Koehler paper":
1. Přejmenuj složku `Kell - Germany - paper mill` → `Koehler paper - Germany - paper mill`
2. V `config.js` uprav klíč:
   ```js
   // z:
   'kell-germany-paper-mill': 'TimePhoto_20250129_173746.jpg',
   // na:
   'koehler-paper-germany-paper-mill': 'TimePhoto_20250129_173746.jpg',
   ```
3. `npm run gallery` → commit → push.

**Jak vytvořit slug z názvu složky:** vše malými písmeny, mezery a speciální
znaky nahraď pomlčkou. `Saint Gobain - Czech Republic - fibre glass manufacturer`
→ `saint-gobain-czech-republic-fibre-glass-manufacturer`.

---

## 6. Změnit osobní údaje, texty, odkazy

Vše je v **`src/config.js`** — přehledně pojmenované:

| Co chceš změnit | Kde v `config.js` |
|---|---|
| Jméno, titulní řádek, tagline, vzdělání | objekt `site` |
| Telefon, e-mail, LinkedIn, adresa, IČ/VAT | objekt `contact` |
| Odkaz na CV, odkaz na certifikáty | objekt `links` |
| Cesta k CV / profilové fotce | objekt `gallery` (dole) |

Po úpravě textů stačí (fotek ses nedotkl):
```bash
git add -A && git commit -m "Update kontakt" && git push
```

### Vyměnit profilovou fotku v hlavičce
1. Ulož novou fotku jako `C:\Users\zdene\Downloads\me.jpg`
2. `npm run gallery` (zmenší ji a překlopí) → commit → push
   - (Pokud nechceš zrcadlit selfie, přepni `flipPortrait` v `config.js` na `false`.)

### Vyměnit CV (PDF)
Nahraď soubor na cestě uvedené v `gallery.cvSourcePath` a spusť `npm run gallery`.

---

## 7. Řešení problémů

- **Web se nezměnil po pushi** → mrkni na https://github.com/shatanga/portfolio/actions,
  jestli běh nesvítí červeně. Zelená fajfka = hotovo, pak dej v prohlížeči `Ctrl+F5`.
- **Cover fotka zmizela / je špatná** → nejčastěji nesedí klíč v `covers` se
  slugem (viz kapitola 5) nebo název souboru.
- **Fotky se nezmenšily** → zapomněl jsi spustit `npm run gallery` před pushem.
- **Chci přegenerovat úplně všechny fotky** → `npm run gallery:force`.

---

## 8. Kam se co ukládá (rychlý přehled)

```
work_portfolio/
├─ Firma - Země - typ/        ← tvoje ORIGINÁLNÍ fotky (nenahrávají se na web)
├─ src/config.js              ← VŠECHNY texty, kontakty, covers, exclude
├─ public/gallery/            ← zmenšené fotky (generuje npm run gallery)
├─ public/cv/                 ← CV (kopíruje npm run gallery)
├─ public/me.jpg              ← profilová fotka (generuje npm run gallery)
└─ src/pages/                 ← vzhled stránek (běžně neměníš)
```
