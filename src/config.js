// ---------------------------------------------------------------------------
// Single place to edit all personal details, links and gallery settings.
// Everything else on the site reads from here.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Zdenek Otcenasek',
  title: 'Construction Supervisor · Mechanical Fitter · Certified MMA / TIG Welder (6G)',
  tagline:
    'Industrial mechanical construction across Europe — steel structures, pipelines, machinery assembly & dismantling. Combines technical/analytical education with 8+ years of hands-on site experience.',
  // Portrait shown in the hero. Put the file at public/me.jpg
  // (the gallery build step optimises it automatically).
  photo: 'me.jpg',
  education:
    'MSc in Physical Electronics — Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague',
};

export const contact = {
  phone: '+420 604 820 380',
  email: 'zdenek.otcenasek@outlook.com',
  linkedin: 'https://www.linkedin.com/in/zdenekotcenasek',
  linkedinLabel: 'linkedin.com/in/zdenekotcenasek',
  address: [
    'Nova Ves u Voderad 21',
    '517 21 Tyniste nad Orlici',
    'Czech Republic, Europe',
  ],
  vat: '07866178',
};

export const links = {
  // CV lives in /public/cv/ and is copied there by the gallery build script.
  cv: 'cv/Zdenek_Otcenasek_CV.pdf',
  // Certificates: single external Google Drive folder.
  certificates:
    'https://drive.google.com/drive/folders/1TRCjhB7-kfhempOzSPCOVUr_dyIvHfUg?usp=drive_link',
};

// ---------------------------------------------------------------------------
// Manual cover photo per gallery. Key = project slug, value = the ORIGINAL
// photo filename (extension optional). Anything not listed uses the newest
// photo automatically.
// ---------------------------------------------------------------------------
// Photos to drop from a gallery entirely (wrong/personal shots). Key = slug,
// value = array of original filenames (extension optional).
export const exclude = {
  'alizay-france-dismantling-paper-mill': ['20220417_155025.jpg', '20220417_155012.jpg'],
};

export const covers = {
  'longcliffe-quarries-ltd-uk-stone-quarry': 'IMG20260615180321.jpg',
  'dreher-hungary-brewery': 'TimePhoto_20260227_173907.jpg',
  'shotton-mill-uk-paper-mill': 'IMG-20251028-WA0004.jpeg',
  'koehler-paper-germany-paper-mill': 'TimePhoto_20250129_173746.jpg',
  'saint-gobain-czech-republic-fibre-glass-manufacturer': 'IMG-20241105-WA0016.jpeg',
  'lasselsberger-czech-republic-tile-manufacturer': 'TimePhoto_20231008_115642.jpg',
  'chart-ferox-czech-republic-petrol-station': 'IMG_20240514_105535_690.jpg',
  'mondi-czech-republic-paper-mill-ii': 'IMG_20240420_100537_046.jpg',
  'model-sachsen-papier-germany-paper-mill': 'TimePhoto_20230517_151206.jpg',
  'stora-enso-sweden-paper-mill': 'IMG_20230423_194908_379.jpg',
  'stora-enso-finland-paper-mill': 'IMG_20230316_134344_895.jpg',
  'mondi-bubak-czech-republic-paper-mill': 'IMG-20230111-WA0002.jpeg',
  'model-sachsen-papier-germany-rewinder-dismantling': 'IMG_20221208_155921_411.jpg',
  'keller-lufttechnik-germany-pharmacy-incubators': 'IMG_20221201_130539_049.jpg',
  'keller-lufttechnik-italy-door-handle-manufacturer': 'IMG_20220925_162557_052.jpg',
  'alizay-france-dismantling-paper-mill': '20220504_084244.jpg',
  'keller-lufttechnik-germany-automotive-beck': 'IMG_20220118_124513_3.jpg',
  'keller-lufttechnik-germany-mineralix-gmbh-construction-rubble-waste-processing': 'IMG_20211120_094658_4.jpg',
  'smartply-ireland-osb-factory': 'IMG_20210914_154608_1.jpg',
  'mondi-czech-republic-paper-mill': 'IMG_20200819_105422_2.jpg',
  'pilsner-urquell-czech-republic-brewery': 'IMG_20190617_131639_1.jpg',
  'horn-germany-disassembly': 'IMG_20200219_145450_6.jpg',
  'carlsberg-denmark-brewery': 'IMG_20190902_162903_8.jpg',
  'berchtegadener-land-germany-dairy-company': 'IMG_20190814_084808_2.jpg',
  'olma-czech-republic-dairy-company': 'IMG-20190316-WA0002.jpeg',
};

// ---------------------------------------------------------------------------
// Build-time settings used by scripts/build-gallery.mjs
// ---------------------------------------------------------------------------
export const gallery = {
  // Longest edge (px) for the large lightbox image.
  largeSize: 1600,
  // Longest edge (px) for grid thumbnails.
  thumbSize: 700,
  largeQuality: 80,
  thumbQuality: 72,
  // Absolute path to the CV PDF to copy into /public/cv/ during build.
  cvSourcePath:
    'C:/Users/zdene/My Drive/Zdenek_Otcenasek_construction_documents/Zdenek_Otcenasek_CV/Zdenek_Otcenasek_CV.pdf',

  // Portrait for the hero. Drop your original photo at this path and the build
  // resizes it into public/me.jpg. Set flipPortrait: true to un-mirror a
  // front-camera selfie (so reversed text/parting reads correctly).
  portraitSourcePath: 'C:/Users/zdene/Downloads/me.jpg',
  portraitSize: 640,
  portraitQuality: 82,
  flipPortrait: true,
};
