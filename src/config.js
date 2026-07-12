// ---------------------------------------------------------------------------
// Single place to edit all personal details, links and gallery settings.
// Everything else on the site reads from here.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Zdenek Otcenasek',
  title: 'Construction Supervisor · Mechanical Fitter · Certified MMA / TIG Welder (6G)',
  tagline:
    'Industrial mechanical construction across Europe — steel structures, pipelines, machinery assembly & dismantling. 8+ years on site.',
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
};

export const links = {
  // CV lives in /public/cv/ and is copied there by the gallery build script.
  cv: 'cv/Zdenek_Otcenasek_CV.pdf',
  // Certificates: single external Google Drive folder.
  certificates:
    'https://drive.google.com/drive/folders/1TRCjhB7-kfhempOzSPCOVUr_dyIvHfUg?usp=drive_link',
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
