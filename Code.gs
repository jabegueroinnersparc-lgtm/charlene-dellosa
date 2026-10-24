const DESKTOP_HEADER_BACKGROUND_FILE_ID = '1mFQBZ6sjwv4jKKch4c5FLIMuRvU5Qbwf';
const MOBILE_HEADER_BACKGROUND_FILE_ID = '1lWJhR0FoVgLXC_AKiKhdDJCxA_kOYWDz';

// Store testimonial images in Google Drive and set each file to
// Anyone with the link -> Viewer. Replace these placeholders with the
// real Drive file IDs of the testimonial photos.
const TESTIMONIAL_SANTOS_FILE_ID = '1to92kxemMLTJvbiHYeXWlNod6WZXA7-R';
const TESTIMONIAL_VILLANUEVA_FILE_ID = '143T8pg0-3XWOc0i6hdWYV7TWy4TqOLk5';

// Landing-page palette: emerald, dark green, gold, pale gold, cream, and neutral ink.
const AGENT_EMAIL = 'dellosacharlene1317@gmail.com';
// Optional secondary recipient for internal lead alerts. Leave blank when it
// is the same as AGENT_EMAIL to avoid duplicate quota usage.
const SECONDARY_AGENT_EMAIL = 'jabeguero.innersparc@gmail.com';
const AGENT_NAME = 'Charlene Dellosa';
const SENDER_NAME = 'Charlene Dellosa Properties · Dynamic Property Specialist';
const EMAIL_BRAND_LOGO_FILE_ID = '1lWJhR0FoVgLXC_AKiKhdDJCxA_kOYWDz';
// Upload the PDF guide to Google Drive, then paste its file ID here.
// Set the Drive file to Anyone with the link -> Viewer so the button works
// for clients who are not signed in to Google.
const QUIZ_GUIDE_FILE_ID = '17CsjLVE3DV7lOH80Kn6qDHWPgnkZyNLA';
const QUIZ_GUIDE_FILE_NAME = 'Charlene Dellosa Properties Guide.pdf';

function getQuizGuide_() {
  if (!QUIZ_GUIDE_FILE_ID || QUIZ_GUIDE_FILE_ID.indexOf('REPLACE_WITH_') === 0) {
    throw new Error('QUIZ_GUIDE_FILE_ID has not been configured.');
  }
  return DriveApp.getFileById(QUIZ_GUIDE_FILE_ID)
    .getBlob()
    .setName(QUIZ_GUIDE_FILE_NAME);
}

function getQuizGuideDownloadUrl_() {
  if (!QUIZ_GUIDE_FILE_ID || QUIZ_GUIDE_FILE_ID.indexOf('REPLACE_WITH_') === 0) return '';
  return 'https://drive.google.com/uc?export=download&id=' + encodeURIComponent(QUIZ_GUIDE_FILE_ID);
}

function getEmailBrandLogo_() {
  try {
    if (!EMAIL_BRAND_LOGO_FILE_ID) return {};
    return { brandLogo: DriveApp.getFileById(EMAIL_BRAND_LOGO_FILE_ID).getBlob() };
  } catch (error) {
    console.warn('Email brand logo could not be loaded: ' + error.message);
    return {};
  }
}

function emailBrandLogoHtml_(align) {
  const margin = align === 'left' ? '0 0 16px' : '0 auto 16px';
  return '<img src="cid:brandLogo" alt="Charlene Dellosa" width="180" draggable="false" unselectable="on" style="display:block;width:180px;max-width:72%;height:auto;margin:' + margin + ';border:0;pointer-events:none;cursor:default;user-select:none;" />';
}
const PUBLIC_PHONE = '+639169994124';
const PUBLIC_CONTACT_EMAIL = 'dellosacharlene1317@gmail.com';
const PUBLIC_OFFICE_ADDRESS = 'Avida Residences, Sta. Catalina, Salawag, Dasmariñas, Cavite 4114, Philippines';
const PUBLIC_CONSULTATION_HOURS = 'Monday–Saturday, 9:00 AM–6:00 PM';
// Always use the public /exec deployment in email links, including editor-based tests.
const PUBLIC_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbymj8Gh664A3dsBL1SX_GQsKE71h7_kq1pLh2UembRC5DvOzhhtmj0cImYGBGoegqrA/exec';
const PRIVACY_NOTICE_VERSION = '2026-08-24';
const BRAND = {
  deepGreen: '#063c24',
  emerald: '#275016',
  gold: '#cc953e',
  paleGold: '#f5d68a',
  cream: '#fbf8f2',
  paper: '#ffffff',
  ink: '#173226',
  muted: '#66736c',
  line: '#e8dfd2'
};

const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/CharleneDellosaProperties/',
  instagram: 'https://www.instagram.com/chadlls13',
  tiktok: 'https://www.tiktok.com/@dynamicpropertyagent',
  youtube: 'https://www.youtube.com/@chadellosa'
};
// Direct Drive image URL used as the Facebook CTA background in email clients.
// The Drive file must be shared as Anyone with the link -> Viewer.
const FACEBOOK_CTA_BACKGROUND_URL = 'https://drive.google.com/uc?export=download&id=1DUediE3w5OB6tvkaaO58Fwv_cv-2Lt_8';
// Direct Drive image used in the separate Facebook CTA section below the social links.
// The Drive file must be shared as Anyone with the link -> Viewer.
const JOIN_US_BANNER_URL = 'https://drive.google.com/uc?export=download&id=1DUediE3w5OB6tvkaaO58Fwv_cv-2Lt_8';
const LINK_LIBRARY_SPREADSHEET_NAME = 'Charlene Dellosa · Website Link Library';
const IMAGE_SETTINGS_SHEET_NAME = 'Image Settings';
const QUIZ_QUESTIONS_SHEET_NAME = 'Quiz Questions';
const QUIZ_SPREADSHEET_NAME = 'Charlene Dellosa · Quiz Questions';
// Leave blank. setupQuizQuestionsSheet() stores the generated Sheet ID in Script Properties.
// If you already have a dedicated spreadsheet, you may paste its ID here once.
const QUIZ_SPREADSHEET_ID = '';
const QUIZ_CACHE_SECONDS = 60;
// Google reCAPTCHA v2 secret is stored only in Apps Script Properties.
const RECAPTCHA_SECRET_PROPERTY = 'RECAPTCHA_SECRET_KEY';

function getRecaptchaSecretKey_() {
  const secret = String(
    PropertiesService.getScriptProperties().getProperty(RECAPTCHA_SECRET_PROPERTY) || ''
  ).trim();
  if (!secret) {
    throw new Error('reCAPTCHA is not configured. Add RECAPTCHA_SECRET_KEY to Script Properties.');
  }
  return secret;
}

function verifyRecaptcha_(token) {
  const responseToken = String(token || '').trim();
  if (!responseToken) throw new Error('Please complete the reCAPTCHA verification before submitting.');

  const response = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    payload: {
      secret: getRecaptchaSecretKey_(),
      response: responseToken
    },
    muteHttpExceptions: true
  });
  let result = {};
  try {
    result = JSON.parse(response.getContentText() || '{}');
  } catch (error) {
    throw new Error('The reCAPTCHA verification service returned an invalid response.');
  }
  if (!result.success) {
    console.warn('reCAPTCHA rejected submission: ' + JSON.stringify(result['error-codes'] || []));
    throw new Error('reCAPTCHA verification failed. Please try again.');
  }
  return true;
}

function doGet(e) {
  // Public configuration endpoint for external frontends such as Vercel.
  // Example: https://script.google.com/macros/s/DEPLOYMENT_ID/exec?config=quiz
  if (e && e.parameter && e.parameter.config === 'quiz') {
    return jsonResponse_({
      ok: true,
      endpoint: PUBLIC_WEB_APP_URL,
      privacyNoticeVersion: PRIVACY_NOTICE_VERSION,
      nurtureConsentVersion: NURTURE_CONSENT_VERSION
    });
  }

  if (e && e.parameter && e.parameter.sitemap === '1') {
    return ContentService
      .createTextOutput(buildSitemapXml_())
      .setMimeType(ContentService.MimeType.XML);
  }

  if (e && e.parameter && e.parameter.unsubscribe) {
    return handleUnsubscribe_(e.parameter.unsubscribe, e.parameter.confirm, e.parameter.cancel);
  }

  // Show a neutral response when the web-app URL is opened directly.
  // The configuration, sitemap, and unsubscribe routes above remain intact.
  return ContentService
    .createTextOutput('Not available')
    .setMimeType(ContentService.MimeType.TEXT);

  const template = HtmlService.createTemplateFromFile('Index');
  // Read image IDs from the Image Settings sheet so visual updates do not require code edits.
  const imageSettings = getImageSettings_();
  const quizQuestions = getQuizQuestions_();
  template.quizQuestionsJson = JSON.stringify(quizQuestions);
  template.desktopHeaderBackground = imageSettings.desktopHeaderBackgroundUrl;
  template.mobileHeaderBackground = imageSettings.mobileHeaderBackgroundUrl;
  template.profileImageUrl = imageSettings.profileImageUrl;
  // Embed testimonial photos in the HTML response. The browser therefore
  // does not need a Google login, cookies, referrer, or public Drive access.
  template.testimonialImagesJson = JSON.stringify({
    santos: imageSettings.testimonialSantosUrl,
    villanueva: imageSettings.testimonialVillanuevaUrl
  });
  template.publicPhone = PUBLIC_PHONE;
  template.publicContactEmail = PUBLIC_CONTACT_EMAIL;
  template.publicOfficeAddress = PUBLIC_OFFICE_ADDRESS;
  template.publicConsultationHours = PUBLIC_CONSULTATION_HOURS;
  template.privacyNoticeVersion = PRIVACY_NOTICE_VERSION;

  return template
    .evaluate()
    .setTitle('Real Estate Agent in Cavite & Metro Manila | Charlene Dellosa Properties')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setFaviconUrl('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/favicon.ico');
}

function doPost(e) {
  try {
    const payload = readQuizPostPayload_(e);
    verifyRecaptcha_(payload.recaptchaToken);
    const result = payload.mode === 'guide' ? sendGuideLeadNotification(payload) : sendQuizNotification(payload);
    return jsonResponse_({
      ok: true,
      leadId: result.leadId || '',
      duplicate: result.duplicate === true,
      emailQueued: result.emailQueued === true,
      agentEmailWarning: result.agentEmailWarning || '',
      clientEmailWarning: result.clientEmailWarning || '',
      emailWarning: result.emailWarning || ''
    });
  } catch (error) {
    console.error('doPost failed: ' + (error && error.stack ? error.stack : error));
    return jsonResponse_({
      ok: false,
      error: String(error && error.message ? error.message : error)
    });
  }
}

/**
 * Accept JSON, a JSON string in a payload field, or ordinary form fields.
 * This supports fetch(), sendBeacon(), URL-encoded forms, and FormData.
 */
function readQuizPostPayload_(e) {
  e = e || {};
  const parameters = e.parameter || {};
  const raw = e.postData && e.postData.contents ? String(e.postData.contents) : '';
  let payload = null;

  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch (jsonError) {
      // Continue to e.parameter for URL-encoded/FormData submissions.
    }
  }

  if (!payload && parameters.payload) {
    try {
      payload = JSON.parse(String(parameters.payload));
    } catch (payloadError) {
      throw new Error('The quiz payload is not valid JSON.');
    }
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    payload = {
      name: parameters.name || '',
      email: parameters.email || '',
      mobile: parameters.mobile || '',
      consultationDate: parameters.consultationDate || '',
      privacyConsent: asBoolean_(parameters.privacyConsent),
      privacyNoticeVersion: parameters.privacyNoticeVersion || '',
      nurtureConsent: asBoolean_(parameters.nurtureConsent),
      nurtureConsentVersion: parameters.nurtureConsentVersion || '',
      submissionId: parameters.submissionId || '',
      answers: []
    };

    if (parameters.answers) {
      try {
        payload.answers = JSON.parse(String(parameters.answers));
      } catch (answersError) {
        throw new Error('The quiz answers are not valid JSON.');
      }
    }
  }

  payload.answers = Array.isArray(payload.answers) ? payload.answers : [];
  return payload;
}

function jsonResponse_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function getImageThumbnailUrl_(fileId, width) {
  return 'https://drive.google.com/thumbnail?id=' + encodeURIComponent(fileId) + '&sz=w' + String(width);
}

function getPublicImageUrl_(fileId, label) {
  // Use a compact Drive thumbnail URL. The image itself is not embedded in the
  // HTML response, which keeps first-load HTML small and fast.
  if (!fileId || fileId.indexOf('REPLACE_WITH_') === 0) {
    return makeTestimonialPlaceholder_(label || 'Client');
  }
  return getImageThumbnailUrl_(fileId, 900);
}

function makeTestimonialPlaceholder_(label) {
  const initials = String(label || 'Client').trim().split(/\s+/).map(function(part) {
    return part.charAt(0);
  }).join('').substring(0, 2).toUpperCase() || 'C';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#063c24"/><stop offset="1" stop-color="#cc953e"/></linearGradient></defs>' +
    '<rect width="900" height="900" fill="url(#g)"/>' +
    '<circle cx="450" cy="330" r="135" fill="#fbf8f2" opacity=".95"/>' +
    '<path d="M190 760c20-180 120-260 260-260s240 80 260 260" fill="#fbf8f2" opacity=".95"/>' +
    '<text x="450" y="850" text-anchor="middle" font-family="Georgia,serif" font-size="72" font-weight="700" fill="#fbf8f2">' + initials + '</text>' +
    '</svg>';
  return 'data:image/svg+xml;base64,' + Utilities.base64Encode(Utilities.newBlob(svg).getBytes());
}

function getImageAsDataUri(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    const blob = file.getBlob();
    return 'data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes());
  } catch (e) {
    console.error('Header image error: ' + e.message);
    return '';
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Reads active popup quiz questions from the dedicated Quiz Questions sheet.
 * The public web app receives only the active question text and options.
 * Sheet columns: Active | Question | Options (one per line) | Notes
 */
function getQuizQuestions_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('websiteQuizQuestions');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (error) {
      cache.remove('websiteQuizQuestions');
    }
  }

  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty('QUIZ_SPREADSHEET_ID') || QUIZ_SPREADSHEET_ID;
  if (!spreadsheetId) return [];

  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(QUIZ_QUESTIONS_SHEET_NAME);
    if (!sheet || sheet.getLastRow() < 2) return [];

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getDisplayValues();
    const questions = [];
    values.forEach(function(row) {
      const active = String(row[0] || '').trim().toUpperCase();
      const question = String(row[1] || '').trim().slice(0, 500);
      const options = String(row[2] || '').split(/\r?\n/)
        .map(function(option) { return String(option || '').trim().slice(0, 500); })
        .filter(function(option) { return option !== ''; });

      if (active === 'FALSE' || active === 'NO' || active === '0' || !question || options.length < 2) return;
      questions.push({ question: question, options: options.slice(0, 12) });
    });

    cache.put('websiteQuizQuestions', JSON.stringify(questions), QUIZ_CACHE_SECONDS);
    return questions;
  } catch (error) {
    console.error('Quiz questions sheet could not be read: ' + error.message);
    return [];
  }
}

/**
 * Creates the dedicated Google Sheet and a starter Quiz Questions tab.
 * Run once from the Apps Script editor, approve permissions, and open the returned URL.
 * If the tab already contains rows, this function preserves them.
 */
function setupQuizQuestionsSheet() {
  const properties = PropertiesService.getScriptProperties();
  const storedId = properties.getProperty('QUIZ_SPREADSHEET_ID') || QUIZ_SPREADSHEET_ID;
  let spreadsheet = null;

  if (storedId) {
    try {
      spreadsheet = SpreadsheetApp.openById(storedId);
    } catch (error) {
      console.warn('Stored quiz spreadsheet could not be opened: ' + error.message);
    }
  }

  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create(QUIZ_SPREADSHEET_NAME);
    properties.setProperty('QUIZ_SPREADSHEET_ID', spreadsheet.getId());
  }

  const sheet = spreadsheet.getSheetByName(QUIZ_QUESTIONS_SHEET_NAME) || spreadsheet.insertSheet(QUIZ_QUESTIONS_SHEET_NAME);
  const headers = ['Active', 'Question', 'Options (one per line)', 'Notes'];
  const starterRows = [
    [true, 'WHICH BEST DESCRIBES YOUR CURRENT SITUATION AS A PROPERTY BUYER?', 'Corporate Employee\nFreelancer\nBusiness Owner\nRetiree or Planning to Retire\nOverseas Filipino Worker (OFW)\nCurrently Looking for Work', 'Edit the question or replace the options.'],
    [true, 'WHAT IS YOUR MAIN REAL ESTATE GOAL?', 'Buy My First Home\nSell My Property\nInvest in Real Estate\nRent Out My Property\nUpgrade to a Bigger Home\nJust Exploring My Options', 'Lead classification currently looks for sell, rent out, or invest in this answer.'],
    [true, 'WHAT IS YOUR BUDGET RANGE?', '₱1M – ₱3M\n₱3M – ₱5M\n₱5M – ₱10M\n₱10M – ₱20M\n₱20M and Above\nI\'m Not Sure Yet', 'Use one option per line.'],
    [true, 'WHERE WOULD YOU LIKE TO BUY OR INVEST?', 'Metro Manila\nCavite\nLaguna\nBatangas\nOther Provinces\nOpen to Any Location', 'Use one option per line.'],
    [true, 'WHAT TYPE OF PROPERTY ARE YOU LOOKING FOR?', 'House and Lot\nCondominium\nLot / Vacant Land\nTownhouse\nCommercial Property\nAgricultural Land', 'Use one option per line.'],
    [true, 'WHEN ARE YOU PLANNING TO MAKE YOUR MOVE?', 'Within 1–3 Months\nWithin 3–6 Months\nWithin 6–12 Months\nWithin 1–2 Years\nStill Researching\nI\'m Ready to Take Action', 'Use one option per line.']
  ];

  const existingLastRow = sheet.getLastRow();
  if (existingLastRow === 0 || !String(sheet.getRange(1, 1).getDisplayValue()).trim()) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(2, 1, starterRows.length, headers.length).setValues(starterRows);
  } else {
    const currentHeaders = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getDisplayValues()[0];
    headers.forEach(function(header, index) {
      if (String(currentHeaders[index] || '').trim() !== header) {
        sheet.getRange(1, index + 1).setValue(header);
      }
    });
  }

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#063c24')
    .setFontColor('#ffffff')
    .setFontWeight('bold');
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length)
      .setVerticalAlignment('top')
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).setHorizontalAlignment('center');
  }
  sheet.setColumnWidth(1, 90);
  sheet.setColumnWidth(2, 520);
  sheet.setColumnWidth(3, 420);
  sheet.setColumnWidth(4, 420);
  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), headers.length).createFilter();
  cacheQuizQuestions();

  const result = {
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
    sheetName: QUIZ_QUESTIONS_SHEET_NAME
  };
  console.log('Quiz questions ready: ' + JSON.stringify(result));
  return result;
}

/** Clears the short quiz cache after editing the Quiz Questions tab. */
function cacheQuizQuestions() {
  CacheService.getScriptCache().remove('websiteQuizQuestions');
  return { ok: true, message: 'Quiz question cache cleared.' };
}

/**
 * Repairs the Quiz Questions tab's Active column (Column A).
 * It converts common text variants into TRUE/FALSE checkbox values and
 * applies checkbox validation so the sheet does not display stray code/text.
 * Run once from the Apps Script editor after authorizing access.
 */
function repairQuizQuestionsColumnA() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty('QUIZ_SPREADSHEET_ID') || QUIZ_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('No quiz spreadsheet is configured. Run setupQuizQuestionsSheet() first.');
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(QUIZ_QUESTIONS_SHEET_NAME);
  if (!sheet) throw new Error('The Quiz Questions tab could not be found.');

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { ok: true, message: 'No quiz rows needed repair.' };
  const values = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  const activeValues = values.map(function(row) {
    const raw = String(row[0] == null ? '' : row[0]).trim().toUpperCase();
    const questionExists = String(row[1] == null ? '' : row[1]).trim() !== '';
    const isFalse = raw === 'FALSE' || raw === 'NO' || raw === '0' || raw === 'OFF';
    return [questionExists && !isFalse];
  });
  const activeRange = sheet.getRange(2, 1, lastRow - 1, 1);
  activeRange.setValues(activeValues);
  activeRange.setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
  cacheQuizQuestions();
  return { ok: true, message: 'Quiz Questions Column A repaired and converted to checkboxes.', rows: lastRow - 1 };
}

function getImageSettings_() {
  const defaults = {
    desktopHeaderFileId: DESKTOP_HEADER_BACKGROUND_FILE_ID,
    mobileHeaderFileId: MOBILE_HEADER_BACKGROUND_FILE_ID,
    profileFileId: DESKTOP_HEADER_BACKGROUND_FILE_ID,
    testimonialSantosFileId: TESTIMONIAL_SANTOS_FILE_ID,
    testimonialVillanuevaFileId: TESTIMONIAL_VILLANUEVA_FILE_ID
  };
  const cache = CacheService.getScriptCache();
  const cached = cache.get('websiteImageSettings');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (error) {
      cache.remove('websiteImageSettings');
    }
  }

  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty('IMAGE_SETTINGS_SPREADSHEET_ID') || properties.getProperty('LINK_LIBRARY_SPREADSHEET_ID');
  if (!spreadsheetId) return buildImageSettings_(defaults);

  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(IMAGE_SETTINGS_SHEET_NAME);
    if (!sheet || sheet.getLastRow() < 2) return buildImageSettings_(defaults);
    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
    values.forEach(function(row) {
      const key = String(row[0] || '').trim();
      const value = String(row[1] || '').trim();
      if (Object.prototype.hasOwnProperty.call(defaults, key) && value) defaults[key] = value;
    });
  } catch (error) {
    console.warn('Image settings sheet could not be read; using defaults: ' + error.message);
  }
  return buildImageSettings_(defaults);
}

function buildImageSettings_(settings) {
  const result = {
    desktopHeaderFileId: settings.desktopHeaderFileId,
    mobileHeaderFileId: settings.mobileHeaderFileId,
    profileFileId: settings.profileFileId,
    testimonialSantosFileId: settings.testimonialSantosFileId,
    testimonialVillanuevaFileId: settings.testimonialVillanuevaFileId,
    desktopHeaderBackgroundUrl: getImageThumbnailUrl_(settings.desktopHeaderFileId, 1600),
    mobileHeaderBackgroundUrl: getImageThumbnailUrl_(settings.mobileHeaderFileId, 1200),
    profileImageUrl: getImageThumbnailUrl_(settings.profileFileId, 2000),
    testimonialSantosUrl: getPublicImageUrl_(settings.testimonialSantosFileId, 'Santos'),
    testimonialVillanuevaUrl: getPublicImageUrl_(settings.testimonialVillanuevaFileId, 'Villanueva')
  };
  CacheService.getScriptCache().put('websiteImageSettings', JSON.stringify(result), 60);
  return result;
}

/**
 * Creates or refreshes the Image Settings tab in the website link-library spreadsheet.
 * Edit only the Image File ID column; the website reads the values on its next load.
 */
function setupImageSettingsSheet() {
  const properties = PropertiesService.getScriptProperties();
  const storedId = properties.getProperty('IMAGE_SETTINGS_SPREADSHEET_ID') || properties.getProperty('LINK_LIBRARY_SPREADSHEET_ID');
  let spreadsheet = null;
  if (storedId) {
    try {
      spreadsheet = SpreadsheetApp.openById(storedId);
    } catch (error) {
      console.warn('Image settings spreadsheet could not be opened: ' + error.message);
    }
  }
  if (!spreadsheet) spreadsheet = SpreadsheetApp.create(LINK_LIBRARY_SPREADSHEET_NAME);
  properties.setProperty('IMAGE_SETTINGS_SPREADSHEET_ID', spreadsheet.getId());
  properties.setProperty('LINK_LIBRARY_SPREADSHEET_ID', spreadsheet.getId());

  const sheet = spreadsheet.getSheetByName(IMAGE_SETTINGS_SHEET_NAME) || spreadsheet.insertSheet(IMAGE_SETTINGS_SHEET_NAME);
  const columns = ['Key', 'Image File ID', 'Preview URL', 'Used By', 'Instructions'];
  const rows = [
    ['desktopHeaderFileId', DESKTOP_HEADER_BACKGROUND_FILE_ID, getImageThumbnailUrl_(DESKTOP_HEADER_BACKGROUND_FILE_ID, 320), 'Desktop hero background', 'Paste a Google Drive file ID in column B. Share the file as Viewer.'],
    ['mobileHeaderFileId', MOBILE_HEADER_BACKGROUND_FILE_ID, getImageThumbnailUrl_(MOBILE_HEADER_BACKGROUND_FILE_ID, 320), 'Mobile hero background', 'Paste a Google Drive file ID in column B.'],
    ['profileFileId', DESKTOP_HEADER_BACKGROUND_FILE_ID, getImageThumbnailUrl_(DESKTOP_HEADER_BACKGROUND_FILE_ID, 320), 'Hero profile image', 'Paste a Google Drive file ID in column B.'],
    ['testimonialSantosFileId', TESTIMONIAL_SANTOS_FILE_ID, getImageThumbnailUrl_(TESTIMONIAL_SANTOS_FILE_ID, 320), 'Santos testimonial', 'Paste a Google Drive file ID in column B.'],
    ['testimonialVillanuevaFileId', TESTIMONIAL_VILLANUEVA_FILE_ID, getImageThumbnailUrl_(TESTIMONIAL_VILLANUEVA_FILE_ID, 320), 'Villanueva testimonial', 'Paste a Google Drive file ID in column B.']
  ];
  const values = [columns].concat(rows);
  sheet.clear();
  sheet.getRange(1, 1, values.length, columns.length).setValues(values);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, columns.length).setBackground('#063c24').setFontColor('#ffffff').setFontWeight('bold');
  sheet.getRange(2, 1, rows.length, columns.length).setVerticalAlignment('top').setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  sheet.getRange(2, 3, rows.length, 1).setFontColor('#275016');
  sheet.setColumnWidth(1, 240);
  sheet.setColumnWidth(2, 290);
  sheet.setColumnWidth(3, 420);
  sheet.setColumnWidth(4, 220);
  sheet.setColumnWidth(5, 410);
  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, values.length, columns.length).createFilter();
  CacheService.getScriptCache().remove('websiteImageSettings');
  const result = { spreadsheetId: spreadsheet.getId(), spreadsheetUrl: spreadsheet.getUrl(), sheetName: IMAGE_SETTINGS_SHEET_NAME };
  console.log('Image settings ready: ' + JSON.stringify(result));
  return result;
}

/** Clears the one-minute image cache after editing Image Settings. */
function clearImageSettingsCache() {
  CacheService.getScriptCache().remove('websiteImageSettings');
  return { ok: true, message: 'Image settings cache cleared.' };
}

/**
 * Creates or refreshes one organized Google Sheet for the links used by the website.
 * Run this function once from the Apps Script editor, approve the Sheets permission,
 * then copy the returned URL from the execution result or log.
 */
function setupLinkLibrary() {
  const properties = PropertiesService.getScriptProperties();
  const storedId = properties.getProperty('LINK_LIBRARY_SPREADSHEET_ID');
  let spreadsheet = null;

  if (storedId) {
    try {
      spreadsheet = SpreadsheetApp.openById(storedId);
    } catch (error) {
      console.warn('Stored link-library spreadsheet could not be opened: ' + error.message);
    }
  }

  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create(LINK_LIBRARY_SPREADSHEET_NAME);
    properties.setProperty('LINK_LIBRARY_SPREADSHEET_ID', spreadsheet.getId());
  }

  const columns = ['Name', 'Category', 'Link', 'Identifier', 'Used By', 'Notes'];
  const firstSheet = spreadsheet.getSheets()[0];
  if (firstSheet && firstSheet.getName() === 'Sheet1' && !spreadsheet.getSheetByName('All Links')) {
    firstSheet.setName('All Links');
  }
  const rows = getLinkLibraryRows_();
  const discoveredRows = getDiscoveredIndexLinks_(rows);
  const groups = {
    'All Links': rows.concat(discoveredRows),
    'Header Images': rows.filter(function(row) { return row.category === 'Header Images'; }),
    'Testimonials': rows.filter(function(row) { return row.category === 'Testimonials'; }),
    'Featured Video': rows.filter(function(row) { return row.category === 'Featured Video'; }),
    'Video Guides': rows.filter(function(row) { return row.category === 'Video Guides'; }),
    'Social & Contact': rows.filter(function(row) { return row.category === 'Social & Contact'; }),
    'Libraries & Deploy': rows.filter(function(row) { return row.category === 'Libraries & Deployment'; }),
    'Discovered': discoveredRows
  };

  Object.keys(groups).forEach(function(sheetName) {
    const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    const groupRows = groups[sheetName];
    const values = [columns].concat(groupRows.map(function(row) {
      return [row.name, row.category, row.link, row.identifier, row.usedBy, row.notes];
    }));

    sheet.clear();
    sheet.getRange(1, 1, values.length, columns.length).setValues(values);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, columns.length)
      .setBackground('#063c24')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
    if (values.length > 1) {
      sheet.getRange(2, 1, values.length - 1, columns.length)
        .setVerticalAlignment('top')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
      sheet.getRange(2, 3, values.length - 1, 1).setFontColor('#275016');
    }
    sheet.setColumnWidth(1, 230);
    sheet.setColumnWidth(2, 150);
    sheet.setColumnWidth(3, 390);
    sheet.setColumnWidth(4, 250);
    sheet.setColumnWidth(5, 230);
    sheet.setColumnWidth(6, 360);
    if (sheet.getFilter()) sheet.getFilter().remove();
    sheet.getRange(1, 1, values.length, columns.length).createFilter();
  });

  const result = {
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
    sheetNames: Object.keys(groups)
  };
  console.log('Link library ready: ' + JSON.stringify(result));
  return result;
}

/**
 * Installs one idempotent six-hour trigger. Each run refreshes the existing
 * spreadsheet and scans Index.html for newly added absolute links.
 */
function installLinkLibrarySyncTrigger() {
  const handler = 'setupLinkLibrary';
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === handler && trigger.getEventType() === ScriptApp.EventType.CLOCK) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  const trigger = ScriptApp.newTrigger(handler).timeBased().everyHours(6).create();
  const result = { ok: true, frequency: 'Every 6 hours', triggerId: trigger.getUniqueId() };
  console.log('Link-library sync trigger installed: ' + JSON.stringify(result));
  return result;
}

function getDiscoveredIndexLinks_(knownRows) {
  const knownLinks = {};
  (knownRows || []).forEach(function(row) { knownLinks[row.link] = true; });
  let html = '';
  try {
    html = HtmlService.createHtmlOutputFromFile('Index').getContent();
  } catch (error) {
    console.warn('Index link scan skipped: ' + error.message);
    return [];
  }
  const found = {};
  const pattern = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const link = String(match[1] || '').trim();
    if (!/^https?:\/\//i.test(link) || knownLinks[link] || found[link]) continue;
    found[link] = true;
  }
  return Object.keys(found).sort().map(function(link) {
    return {
      name: 'Discovered HTML link',
      category: 'Discovered Links',
      link: link,
      identifier: '',
      usedBy: 'Index.html automatic scan',
      notes: 'New absolute URL found in the HTML. Add it to getLinkLibraryRows_ for a named category.'
    };
  });
}

function getLinkLibraryRows_() {
  const driveViewUrl = function(fileId) {
    return 'https://drive.google.com/file/d/' + fileId + '/view?usp=sharing';
  };
  const youtubeWatchUrl = function(videoId) {
    return 'https://www.youtube.com/watch?v=' + videoId;
  };
  return [
    { name: 'Desktop header image', category: 'Header Images', link: driveViewUrl(DESKTOP_HEADER_BACKGROUND_FILE_ID), identifier: DESKTOP_HEADER_BACKGROUND_FILE_ID, usedBy: 'Desktop hero background', notes: 'Drive image ID used by desktopHeaderBackground.' },
    { name: 'Mobile header image', category: 'Header Images', link: driveViewUrl(MOBILE_HEADER_BACKGROUND_FILE_ID), identifier: MOBILE_HEADER_BACKGROUND_FILE_ID, usedBy: 'Mobile hero background', notes: 'Drive image ID used by mobileHeaderBackground.' },
    { name: 'Profile image fallback', category: 'Header Images', link: driveViewUrl(DESKTOP_HEADER_BACKGROUND_FILE_ID), identifier: DESKTOP_HEADER_BACKGROUND_FILE_ID, usedBy: 'Profile image markup in hero', notes: 'Uses the browser-renderable thumbnail URL in the HTML.' },
    { name: 'Santos testimonial photo', category: 'Testimonials', link: driveViewUrl(TESTIMONIAL_SANTOS_FILE_ID), identifier: TESTIMONIAL_SANTOS_FILE_ID, usedBy: 'Testimonial card: Santos', notes: 'Drive file should be shared as Viewer.' },
    { name: 'Villanueva testimonial photo', category: 'Testimonials', link: driveViewUrl(TESTIMONIAL_VILLANUEVA_FILE_ID), identifier: TESTIMONIAL_VILLANUEVA_FILE_ID, usedBy: 'Testimonial card: Villanueva', notes: 'Drive file should be shared as Viewer.' },
    { name: 'Featured property tour', category: 'Featured Video', link: youtubeWatchUrl('Vje0FZ5HqrQ'), identifier: 'Vje0FZ5HqrQ', usedBy: 'Featured video player', notes: 'Loaded only after the visitor clicks the preview.' },
    { name: 'First-Time Buyer’s Starting Guide', category: 'Video Guides', link: youtubeWatchUrl('pVIWs3LjIiA'), identifier: 'pVIWs3LjIiA', usedBy: 'Video guide card', notes: 'Buying a home.' },
    { name: 'What to Check During a Viewing', category: 'Video Guides', link: youtubeWatchUrl('gp8NCyOCLV4'), identifier: 'gp8NCyOCLV4', usedBy: 'Video guide card', notes: 'Buying a home.' },
    { name: 'Prepare Your Home to Sell', category: 'Video Guides', link: youtubeWatchUrl('4n5yhj0B_Us'), identifier: '4n5yhj0B_Us', usedBy: 'Video guide card', notes: 'Selling tips.' },
    { name: 'Property Investment Basics', category: 'Video Guides', link: youtubeWatchUrl('Vvt-a4ZJOEo'), identifier: 'Vvt-a4ZJOEo', usedBy: 'Video guide card', notes: 'Property investing.' },
    { name: 'Financing Your Dream Home', category: 'Video Guides', link: youtubeWatchUrl('IgReOJ6sobU'), identifier: 'IgReOJ6sobU', usedBy: 'Video guide card', notes: 'Buying a home.' },
    { name: 'Choosing the Right Location', category: 'Video Guides', link: youtubeWatchUrl('ViWXPgBJZxQ'), identifier: 'ViWXPgBJZxQ', usedBy: 'Video guide card', notes: 'Property investing.' },
    { name: 'YouTube channel', category: 'Social & Contact', link: SOCIAL_LINKS.youtube, identifier: 'chadellosa', usedBy: 'Footer and video-library button', notes: 'Public video channel.' },
    { name: 'Instagram profile', category: 'Social & Contact', link: SOCIAL_LINKS.instagram, identifier: '@chadlls13', usedBy: 'Footer social link', notes: 'Public social profile.' },
    { name: 'TikTok profile', category: 'Social & Contact', link: SOCIAL_LINKS.tiktok, identifier: '@dynamicpropertyagent', usedBy: 'Footer social link', notes: 'Public social profile.' },
    { name: 'Public phone', category: 'Social & Contact', link: 'tel:' + PUBLIC_PHONE, identifier: PUBLIC_PHONE, usedBy: 'Contact links and sticky actions', notes: 'Phone links are rendered dynamically.' },
    { name: 'Public email', category: 'Social & Contact', link: 'mailto:' + PUBLIC_CONTACT_EMAIL, identifier: PUBLIC_CONTACT_EMAIL, usedBy: 'Contact links and privacy notice', notes: 'Email links are rendered dynamically.' },
    { name: 'Font Awesome', category: 'Libraries & Deployment', link: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css', identifier: 'Font Awesome 6 beta', usedBy: 'Icons throughout the site', notes: 'Loaded with a deferred stylesheet.' },
    { name: 'Google Fonts', category: 'Libraries & Deployment', link: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap', identifier: 'Playfair Display + Inter', usedBy: 'Typography', notes: 'Loaded with a deferred stylesheet.' },
    { name: 'Flatpickr', category: 'Libraries & Deployment', link: 'https://cdn.jsdelivr.net/npm/flatpickr', identifier: 'flatpickr', usedBy: 'Consultation date picker', notes: 'Loaded only when the page uses the date picker.' },
    { name: 'Public web-app deployment', category: 'Libraries & Deployment', link: PUBLIC_WEB_APP_URL, identifier: 'Apps Script /exec', usedBy: 'Public links in notifications', notes: 'Canonical public deployment URL.' }
  ];
}

/**
 * Sends an email only when at least one daily recipient remains. Email
 * delivery is best-effort because the lead is saved before this is called.
 */
function sendEmailWithinQuota_(message, label) {
  const safeLabel = label || 'email';

  try {
    if (MailApp.getRemainingDailyQuota() < 1) {
      const quotaError =
        'Daily email quota is exhausted. The lead was saved, but the ' +
        safeLabel + ' was not sent.';
      console.error(quotaError);
      return { sent: false, error: quotaError };
    }

    MailApp.sendEmail(message);
    return { sent: true, error: '' };
  } catch (error) {
    const messageText = String(error && error.message ? error.message : error);
    console.error(safeLabel + ' failed: ' + messageText);
    return { sent: false, error: messageText };
  }
}

function checkEmailQuota() {
  const result = {
    remainingRecipients: MailApp.getRemainingDailyQuota(),
    checkedAt: new Date().toISOString()
  };

  Logger.log(JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));

  return result;
}

function inspectEmailAccess() {
  const result = {
    configuredAgentEmail: AGENT_EMAIL,
    remainingRecipients: MailApp.getRemainingDailyQuota(),
    checkedAt: new Date().toISOString(),
    note: 'Effective account lookup omitted to avoid requiring the userinfo.email OAuth scope.'
  };

  Logger.log(JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  return result;
}


function sendQuizNotification(payload) {
  payload = payload || {};
  console.log('sendQuizNotification started');

  const name = cleanText_(payload.name, 120);
  const email = cleanText_(payload.email, 254).toLowerCase();
  const mobile = cleanText_(payload.mobile, 40);
  const consultationDate = cleanText_(payload.consultationDate, 120);
  const privacyConsent = asBoolean_(payload.privacyConsent);
  const nurtureConsent = asBoolean_(payload.nurtureConsent);
  const nurtureConsentVersion = cleanText_(payload.nurtureConsentVersion, 80) || NURTURE_CONSENT_VERSION;
  const submissionId = cleanText_(payload.submissionId, 120);
  const answers = Array.isArray(payload.answers) ? payload.answers.slice(0, 20).map(function(item) {
    return {
      question: cleanText_(item && item.question, 500),
      answer: cleanText_(item && item.answer, 500)
    };
  }) : [];

  if (!name) throw new Error('Please provide your full name.');
  if (!isValidEmail_(email)) throw new Error('Please provide a valid email address.');
  if (!isValidMobile_(mobile)) throw new Error('Please provide a valid mobile number.');
  if (!consultationDate) throw new Error('Please select a preferred consultation date and time.');
  if (!privacyConsent) throw new Error('Please confirm the privacy notice before submitting your request.');

  // Check duplicates only after validation. A failed or invalid request must remain retryable.
  const submissionCacheKey = submissionId ? 'quiz-submission-' + submissionId : '';
  const submissionLock = LockService.getScriptLock();
  if (submissionCacheKey) {
    submissionLock.waitLock(5000);
    try {
      if (CacheService.getScriptCache().get(submissionCacheKey)) {
        console.log('Duplicate quiz submission ignored: ' + submissionId);
        return { ok: true, duplicate: true };
      }
    } finally {
      submissionLock.releaseLock();
    }
  }

  const consentAt = new Date();
  const submittedAt = Utilities.formatDate(consentAt, Session.getScriptTimeZone(), 'MMMM d, yyyy · h:mm a');
  const leadType = classifyLead_(answers);
  const profile = getLeadProfile_(leadType);
  const subject = profile.agentSubject + ' · ' + name;
  const clientSubject = profile.clientSubject + ' · ' + AGENT_NAME;
  const leadId = Utilities.getUuid();
  const answerRows = answers.map(function(item, index) {
    return '<tr><td style="padding:12px 14px;border-top:1px solid ' + BRAND.line + ';vertical-align:top;color:' + BRAND.muted + ';font-size:16px;width:38%;">' +
      (index + 1) + '. ' + escapeHtml_(item.question) + '</td><td style="padding:12px 14px;border-top:1px solid ' + BRAND.line + ';vertical-align:top;color:' + BRAND.ink + ';font-size:16px;font-weight:600;">' +
      escapeHtml_(item.answer || 'No answer') + '</td></tr>';
  }).join('');

  const agentText = buildAgentText_(name, email, mobile, consultationDate, submittedAt, answers, nurtureConsent, nurtureConsentVersion) + '\nPrivacy consent: Confirmed · notice ' + PRIVACY_NOTICE_VERSION;
  const clientText = buildClientText_(name, mobile, consultationDate, leadType, answers, leadId);

  // Save the lead before doing slow Drive and MailApp work. This ensures that
  // the enquiry is recorded even if an email service or attachment fails.
  try {
    saveLead_(
      leadId,
      name,
      email,
      mobile,
      consultationDate,
      leadType,
      answers,
      consentAt,
      PRIVACY_NOTICE_VERSION,
      nurtureConsent,
      nurtureConsent ? consentAt : null,
      nurtureConsentVersion
    );
  } catch (saveError) {
    const saveMessage = String(saveError && saveError.message ? saveError.message : saveError);
    console.error('sendQuizNotification save error: ' + saveMessage);
    throw new Error('Lead saving failed: ' + saveMessage);
  }

  // Mark only after the lead is safely saved, so failed requests can be retried.
  if (submissionCacheKey) {
    CacheService.getScriptCache().put(submissionCacheKey, 'processed', 21600);
  }

  // Email delivery is best-effort after the lead has been safely recorded.
  // The browser does not wait for this function because the frontend uses
  // sendBeacon()/keepalive for the public submission request.
  let agentEmailError = '';
  let clientEmailError = '';

  const agentMessage = {
    to: AGENT_EMAIL,
    subject: subject,
    body: agentText,
    htmlBody: buildAgentHtml_(name, email, mobile, consultationDate, submittedAt, answerRows, nurtureConsent, nurtureConsentVersion),
    replyTo: email,
    inlineImages: getEmailBrandLogo_(),
    name: SENDER_NAME
  };
  if (SECONDARY_AGENT_EMAIL && SECONDARY_AGENT_EMAIL.toLowerCase() !== AGENT_EMAIL.toLowerCase()) {
    agentMessage.cc = SECONDARY_AGENT_EMAIL;
  }

  const agentResult = sendEmailWithinQuota_(agentMessage, 'agent notification');
  if (!agentResult.sent) {
    agentEmailError = agentResult.error;
  }

  // Send the buyer confirmation through MailApp without forcing a `from` alias.
  // GmailApp can reject `from: AGENT_EMAIL` when that address is not configured
  // as a verified Gmail alias. The confirmation should still send if the PDF
  // guide is unavailable, so attachment loading is isolated from email delivery.
  let clientAttachments = [];
  try {
    clientAttachments = [getQuizGuide_()];
  } catch (attachmentError) {
    clientEmailError = 'The buyer email was sent without the PDF guide because the attachment could not be loaded: ' +
      String(attachmentError && attachmentError.message ? attachmentError.message : attachmentError);
    console.error('Client guide attachment unavailable for lead ' + leadId + ': ' + clientEmailError);
  }

  const clientResult = sendEmailWithinQuota_({
    to: email,
    subject: clientSubject,
    body: clientText,
    htmlBody: buildClientHtml_(name, mobile, consultationDate, leadType, answers, leadId),
    attachments: clientAttachments,
    replyTo: AGENT_EMAIL,
    inlineImages: getEmailBrandLogo_(),
    name: SENDER_NAME
  }, 'client confirmation');
  if (!clientResult.sent) {
    clientEmailError = clientEmailError
      ? clientEmailError + ' Email delivery also failed: ' + clientResult.error
      : clientResult.error;
  }

  const emailWarnings = [];
  if (agentEmailError) emailWarnings.push('Agent notification: ' + agentEmailError);
  if (clientEmailError) emailWarnings.push('Client confirmation: ' + clientEmailError);

  console.log('sendQuizNotification completed for lead ' + leadId + (emailWarnings.length ? ' with email warnings.' : ' successfully.'));
  return {
    ok: true,
    leadId: leadId,
    leadType: leadType,
    emailQueued: !agentEmailError && !clientEmailError,
    agentEmailWarning: agentEmailError || undefined,
    clientEmailWarning: clientEmailError || undefined,
    emailWarning: emailWarnings.join(' ') || undefined
  };
}


function sendGuideLeadNotification(payload) {
  payload = payload || {};
  var name = cleanText_(payload.name, 120);
  var email = cleanText_(payload.email, 254).toLowerCase();
  var mobile = cleanText_(payload.mobile, 40);
  var privacyConsent = asBoolean_(payload.privacyConsent);
  var submissionId = cleanText_(payload.submissionId, 120);
  var answers = Array.isArray(payload.answers) ? payload.answers.slice(0, 20) : [{ question: 'Campaign', answer: 'Home Upgrade Journey' }];
  if (!name) throw new Error('Please provide your full name.');
  if (!isValidEmail_(email)) throw new Error('Please provide a valid email address.');
  if (!isValidMobile_(mobile)) throw new Error('Please provide a valid mobile number.');
  if (!privacyConsent) throw new Error('Please confirm the privacy notice before submitting your request.');
  var cacheKey = submissionId ? 'guide-submission-' + submissionId : '';
  var lock = LockService.getScriptLock();
  if (cacheKey) { lock.waitLock(5000); try { if (CacheService.getScriptCache().get(cacheKey)) return { ok: true, duplicate: true }; } finally { lock.releaseLock(); } }
  var leadId = Utilities.getUuid();
  var now = new Date();
  saveLead_(leadId, name, email, mobile, 'Not booked yet', 'home-upgrade-guide', answers, now, PRIVACY_NOTICE_VERSION, false, null, '');
  if (cacheKey) CacheService.getScriptCache().put(cacheKey, 'processed', 21600);
  var guide = null;
  try { guide = getQuizGuide_(); } catch (error) { console.warn('Guide attachment unavailable: ' + error.message); }
  var attachments = guide ? [guide] : [];
  var clientMessage = { to: email, subject: 'Your Homebuyer Mistakes Checklist · ' + AGENT_NAME, body: 'Thank you for requesting the Homebuyer Mistakes Checklist. Your guide is attached. When you are ready, reply to this email or book a free 15-minute consultation.', htmlBody: emailShell_('Your Homebuyer Mistakes Checklist', '<div style="background:' + BRAND.deepGreen + ';padding:28px 30px;color:#fff;"><div style="font-size:14px;letter-spacing:1.2px;text-transform:uppercase;color:' + BRAND.paleGold + ';font-weight:700;">The Home Upgrade Journey</div><h1 style="margin:8px 0 0;font-family:Georgia,serif;color:#fff;">Your guide is ready</h1></div><div style="padding:30px;color:' + BRAND.ink + ';font-size:17px;line-height:1.8;"><p>Hi ' + escapeHtml_(name) + ',</p><p>Thank you for taking the first step. Your Homebuyer Mistakes Checklist is attached to this email.</p><p>When you are ready, book a private 15-minute consultation so we can look at your current situation, goals, budget, location, and next step together.</p></div>' + footerHtml_('Home Upgrade Journey · Charlene Dellosa')), attachments: attachments, replyTo: AGENT_EMAIL, inlineImages: getEmailBrandLogo_(), name: SENDER_NAME };
  var agentMessage = { to: AGENT_EMAIL, cc: SECONDARY_AGENT_EMAIL, subject: 'New Home Upgrade Journey guide lead · ' + name, body: 'New guide lead\n\nName: ' + name + '\nEmail: ' + email + '\nMobile: ' + mobile + '\nLead ID: ' + leadId, htmlBody: emailShell_('New Home Upgrade Journey guide lead', '<div style="padding:30px;color:' + BRAND.ink + ';font-size:17px;line-height:1.8;"><h1 style="font-family:Georgia,serif;color:' + BRAND.deepGreen + ';">New guide lead</h1><p><strong>' + escapeHtml_(name) + '</strong><br>' + escapeHtml_(email) + '<br>' + escapeHtml_(mobile) + '</p><p>Campaign: Home Upgrade Journey<br>Lead ID: ' + escapeHtml_(leadId) + '</p></div>' + footerHtml_('Internal lead notification')), replyTo: email, inlineImages: getEmailBrandLogo_(), name: SENDER_NAME };
  var agentResult = sendEmailWithinQuota_(agentMessage, 'guide lead notification');
  var clientResult = sendEmailWithinQuota_(clientMessage, 'guide delivery');
  return { ok: true, leadId: leadId, emailQueued: agentResult.sent && clientResult.sent, agentEmailWarning: agentResult.error || undefined, clientEmailWarning: clientResult.error || undefined };
}

function diagnoseSubmissionBackend() {
  const result = { status: 'started' };
  try {
    const sheet = getLeadsSheet_();
    result.sheet = 'OK: ' + sheet.getName();
  } catch (error) {
    result.sheet = 'ERROR: ' + String(error && error.message ? error.message : error);
  }
  try {
    MailApp.getRemainingDailyQuota();
    result.mail = 'OK';
  } catch (error) {
    result.mail = 'ERROR: ' + String(error && error.message ? error.message : error);
  }
  try {
    ensureFollowUpTrigger_();
    result.trigger = 'OK';
  } catch (error) {
    result.trigger = 'ERROR: ' + String(error && error.message ? error.message : error);
  }
  console.log(JSON.stringify(result));
  return result;
}

function buildAgentHtml_(name, email, mobile, consultationDate, submittedAt, answerRows, nurtureConsent, nurtureConsentVersion) {
  return emailShell_(
    'New property inquiry',
    '<div style="background:' + BRAND.deepGreen + ';padding:28px 30px 24px;color:#ffffff;">' +
      '<div style="font-size:14px;letter-spacing:1.4px;text-transform:uppercase;color:' + BRAND.paleGold + ';font-weight:700;">New lead notification</div>' +
      '<h1 class="email-title" style="margin:8px 0 5px;font-family:Georgia,serif;font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;">A new Consultation Assessment is ready</h1>' +
      '<p style="margin:0;color:#e9f1eb;font-size:17px;line-height:1.85;">A potential client has completed the consultation assessment and requested a follow-up.</p>' +
    '</div>' +
    '<div class="email-pad" style="padding:30px 30px 14px;">' +
      '<div style="font-size:14px;letter-spacing:1.1px;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;margin-bottom:10px;">Client summary</div>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:' + BRAND.cream + ';border:1px solid ' + BRAND.line + ';border-radius:10px;overflow:hidden;">' +
        detailRow_('Client name', escapeHtml_(name)) +
        detailRow_('Email address', '<a href="mailto:' + escapeHtml_(email) + '" style="color:' + BRAND.emerald + ';font-weight:700;text-decoration:none;">' + escapeHtml_(email) + '</a>') +
        detailRow_('Mobile number', escapeHtml_(mobile)) +
        detailRow_('Preferred consultation', escapeHtml_(consultationDate)) +
        detailRow_('Submitted', escapeHtml_(submittedAt)) +
        detailRow_('Privacy consent', 'Confirmed · notice ' + escapeHtml_(PRIVACY_NOTICE_VERSION)) +
        detailRow_('Property guidance emails', nurtureConsent ? 'Confirmed · version ' + escapeHtml_(nurtureConsentVersion || NURTURE_CONSENT_VERSION) : 'Not selected') +
      '</table>' +
      '<div style="margin:25px 0 10px;font-size:14px;letter-spacing:1.1px;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;">Quiz answers</div>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ' + BRAND.line + ';border-radius:10px;overflow:hidden;">' +
        (answerRows || '<tr><td style="padding:14px;color:' + BRAND.muted + ';">No answers were recorded.</td></tr>') +
      '</table>' +
      '<div style="margin:24px 0 8px;padding:14px 16px;border-left:4px solid ' + BRAND.gold + ';background:#fffaf0;color:' + BRAND.ink + ';font-size:17px;line-height:1.85;"><strong>Recommended next step:</strong> Reply to this email to contact the client directly and confirm the consultation schedule.</div>' +
    '</div>' +
    footerHtml_('Internal lead notification · Charlene Dellosa')
  );
}

function buildClientHtml_(name, mobile, consultationDate, leadType, answers, leadId) {
  const submittedAnswerRows = (answers || []).map(function(item, index) {
    return '<tr><td style="padding:10px 12px;border-top:1px solid ' + BRAND.line + ';vertical-align:top;color:' + BRAND.muted + ';font-size:15px;width:42%;">' +
      (index + 1) + '. ' + escapeHtml_(item.question) + '</td><td style="padding:10px 12px;border-top:1px solid ' + BRAND.line + ';vertical-align:top;color:' + BRAND.ink + ';font-size:15px;font-weight:600;">' +
      escapeHtml_(item.answer || 'No answer') + '</td></tr>';
  }).join('');
  const profile = getLeadProfile_(leadType);
  const unsubscribeUrl = getUnsubscribeUrl_(leadId);
  // The guide is sent only as one PDF attachment.
  // No download link is included, preventing the client from seeing a second PDF path.
  const guideSection =
    '<div style="margin:24px 0;padding:20px;background:' + BRAND.cream + ';border:1px solid ' + BRAND.line + ';border-radius:10px;text-align:center;">' +
      '<div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;margin-bottom:8px;">Your property guide</div>' +
      '<p style="margin:0;color:' + BRAND.ink + ';font-size:16px;line-height:1.7;">Your property guide is attached to this email as one PDF file.</p>' +
    '</div>';
  return emailShell_(
    profile.previewTitle,
    '<div style="background:' + BRAND.deepGreen + ';padding:30px;color:#ffffff;text-align:center;">' +
      '<div style="margin:0 auto 12px;width:48px;height:48px;border-radius:50%;background:' + BRAND.gold + ';color:#ffffff;font-family:Georgia,serif;font-size:22px;line-height:48px;font-weight:700;">CD</div>' +
      '<div style="font-size:14px;letter-spacing:1.4px;text-transform:uppercase;color:' + BRAND.paleGold + ';font-weight:700;">' + profile.eyebrow + '</div>' +
      '<h1 class="email-title" style="margin:9px 0 0;font-family:Georgia,serif;font-size:28px;line-height:1.2;color:#ffffff;">' + profile.clientHeadline + '</h1>' +
    '</div>' +
    '<div class="email-pad" style="padding:32px 30px 26px;">' +
      '<p style="margin:0 0 16px;color:' + BRAND.ink + ';font-size:17px;line-height:1.8;">Hi <strong>' + escapeHtml_(name) + '</strong>,</p>' +
      '<p style="margin:0 0 16px;color:' + BRAND.ink + ';font-size:17px;line-height:1.8;">' + profile.clientIntro + '</p>' +
      '<div style="margin:22px 0;padding:18px 20px;background:#fffaf0;border:1px solid ' + BRAND.line + ';border-left:5px solid ' + BRAND.gold + ';border-radius:8px;">' +
        '<div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;margin-bottom:7px;">What we will help you avoid</div>' +
        '<div style="font-size:16px;line-height:1.75;color:' + BRAND.ink + ';">' + profile.painPoint + '</div>' +
      '</div>' +
      '<div style="margin:22px 0;padding:18px 20px;background:' + BRAND.cream + ';border:1px solid ' + BRAND.line + ';border-left:5px solid ' + BRAND.gold + ';border-radius:8px;">' +
        '<div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;margin-bottom:6px;">Your preferred consultation</div>' +
        '<div style="font-size:18px;color:' + BRAND.deepGreen + ';font-weight:700;">' + escapeHtml_(consultationDate) + '</div>' +
        '<div style="margin-top:10px;font-size:13px;color:' + BRAND.muted + ';">Mobile: ' + escapeHtml_(mobile) + '</div>' +
      '</div>' +
      '<div style="margin:22px 0;padding:18px 20px;background:#ffffff;border:1px solid ' + BRAND.line + ';border-radius:10px;">' +
        '<div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;margin-bottom:10px;">Your submitted quiz answers</div>' +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ' + BRAND.line + ';border-radius:8px;overflow:hidden;">' +
          (submittedAnswerRows || '<tr><td style="padding:12px;color:' + BRAND.muted + ';">No answers were recorded.</td></tr>') +
        '</table>' +
      '</div>' +
      '<p style="margin:0 0 16px;color:' + BRAND.ink + ';font-size:17px;line-height:1.8;">' + profile.clientPromise + '</p>' +
      '<div style="margin:22px 0 24px;padding:18px 16px;background:#ffffff;border:1px solid ' + BRAND.line + ';border-radius:10px;">' +
        '<div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;margin-bottom:13px;">Your recommended next step</div>' +
        '<div style="font-size:17px;line-height:1.85;color:' + BRAND.ink + ';">' + profile.nextStep + '</div>' +
      '</div>' +
      guideSection +
      '<div style="margin:24px 0 4px;text-align:center;"><a href="mailto:' + AGENT_EMAIL + '" style="display:inline-block;background:' + BRAND.gold + ';color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:15px 24px;border-radius:24px;">Share Your Property Preferences</a></div>' +
    '</div>' +
    footerHtml_('Thank you for trusting Charlene Dellosa with your property journey.') +
    '<div style="padding:4px 30px 28px;background:' + BRAND.cream + ';text-align:center;color:' + BRAND.muted + ';font-size:11px;line-height:1.6;">' +
      '<div style="margin-bottom:12px;">You are receiving this because you requested property guidance.</div>' +
      '<a href="' + escapeHtml_(unsubscribeUrl) + '" style="display:inline-block;background:#b54832;color:#ffffff;border:1px solid #b54832;border-radius:24px;padding:11px 20px;font-size:12px;font-weight:700;text-decoration:none;">Unsubscribe from property guidance</a>' +
      '<div style="margin-top:10px;font-size:10px;color:' + BRAND.muted + ';">You will be asked to confirm before any change is made.</div>' +
    '</div>'
  );
}

function classifyLead_(answers) {
  const goal = answers.length > 1 ? String(answers[1].answer || '').toLowerCase() : '';
  if (goal.indexOf('sell') !== -1 || goal.indexOf('rent out') !== -1) return 'seller';
  if (goal.indexOf('invest') !== -1) return 'investor';
  return 'buyer';
}

function getLeadProfile_(leadType) {
  const profiles = {
    buyer: {
      label: 'Buyer', eyebrow: 'Buyer consultation', previewTitle: 'Your home-buying plan starts here',
      agentSubject: 'New Buyer Lead', clientSubject: 'Your Buyer Consultation', clientHeadline: 'Turn your home plan into a clear next step',
      clientIntro: 'Thank you for completing the consultation assessment. Your request has been received. Buying a home can feel overwhelming when prices, financing, requirements, and timing all compete for your attention—but you do not have to figure it out alone.',
      painPoint: 'Many buyers delay because they are unsure what they can really afford, worry about unexpected costs, or fear choosing a location that does not fit their daily life. A clear, personalized starting point can replace guesswork with a practical plan.',
      clientPromise: 'Charlene will review your preferred location, property type, budget range, and timeline so the conversation can focus on realistic options—not generic listings or pressure to decide before you are ready.',
      nextStep: 'Reply with your must-have features, preferred areas, or biggest concern—budget, down payment, monthly payment, requirements, or location—so Charlene can prepare a more focused starting point.'
    },
    seller: {
      label: 'Seller', eyebrow: 'Seller consultation', previewTitle: 'Your property-selling plan starts here',
      agentSubject: 'New Seller Lead', clientSubject: 'Your Seller Consultation', clientHeadline: 'Prepare your property for its next chapter',
      clientIntro: 'Thank you for completing the consultation assessment. Your property-selling request has been received. Selling can feel uncertain when you are worried about pricing too low, attracting the wrong buyers, or spending on improvements that may not pay off.',
      painPoint: 'The most expensive mistake is often making decisions without a clear position on price, presentation, timing, and buyer fit. A structured review helps you avoid unnecessary guesswork before going to market.',
      clientPromise: 'Charlene will help you think through positioning, presentation, pricing considerations, and a clear process for attracting suitable buyers.',
      nextStep: 'Reply with the property location, approximate size, and your biggest selling concern so Charlene can make the consultation more relevant.'
    },
    investor: {
      label: 'Investor', eyebrow: 'Investment consultation', previewTitle: 'Your property strategy starts here',
      agentSubject: 'New Investor Lead', clientSubject: 'Your Investment Consultation', clientHeadline: 'Build your property strategy with clarity',
      clientIntro: 'Thank you for completing the consultation assessment. Your real-estate investment request has been received. Investment decisions can become stressful when projected returns, cash flow, financing, and market risks are not viewed together.',
      painPoint: 'A property may look attractive on paper but still fail to match your time horizon, liquidity needs, or risk tolerance. Reviewing the numbers and purpose first can help you avoid an expensive mismatch.',
      clientPromise: 'Charlene will review your preferred market, budget range, property type, and timing so the discussion can focus on suitable opportunities and next steps.',
      nextStep: 'Reply with your investment goal—income, long-term growth, diversification, or another priority—and Charlene can make the consultation more relevant.'
    }
  };
  return profiles[leadType] || profiles.buyer;
}

function emailShell_(previewTitle, content) {
  return '<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light"><style>' +
    'body{margin:0!important;padding:0!important;background:#f2efe9;font-family:Arial,Helvetica,sans-serif;color:' + BRAND.ink + ';}' +
    'table{border-spacing:0;}img{border:0;display:block;max-width:100%;}a{color:' + BRAND.emerald + ';}' +
    '@media only screen and (max-width:680px){.email-outer{padding:12px 6px!important}.email-card{border-radius:10px!important}.email-pad{padding-left:20px!important;padding-right:20px!important}.email-title{font-size:27px!important;line-height:1.3!important}.answer-question,.answer-value{display:block!important;width:auto!important;font-size:16px!important;line-height:1.7!important}.answer-value{border-top:0!important;padding-top:0!important}.social-link{display:block!important;margin:8px auto!important;max-width:280px!important;text-align:left!important;font-size:15px!important;padding:11px 15px!important}.email-pad p,.email-pad td{font-size:16px!important;line-height:1.75!important}.email-pad a{font-size:16px!important}}' +
    '</style></head>' +
    '<body>' +
      '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' + escapeHtml_(previewTitle) + '</div>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:#f2efe9;"><tr><td class="email-outer" align="center" style="padding:28px 12px;">' +
        '<table role="presentation" class="email-card" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:680px;background:' + BRAND.paper + ';border:1px solid ' + BRAND.line + ';border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(18,55,42,.10);">' +
          '<tr><td style="height:6px;background:' + BRAND.gold + ';font-size:0;line-height:0;">&nbsp;</td></tr>' +
          '<tr><td align="center" style="padding:22px 30px 4px;background:' + BRAND.paper + ';">' + emailBrandLogoHtml_('center') + '</td></tr>' +
          '<tr><td>' + content + '</td></tr>' +
        '</table>' +
      '</td></tr></table>' +
    '</body></html>';
}

function detailRow_(label, value) {
  return '<tr><td style="padding:12px 14px;border-bottom:1px solid ' + BRAND.line + ';color:' + BRAND.muted + ';font-size:16px;width:38%;">' + label + '</td><td style="padding:12px 14px;border-bottom:1px solid ' + BRAND.line + ';color:' + BRAND.ink + ';font-size:16px;font-weight:600;">' + value + '</td></tr>';
}

function footerHtml_(text) {
  return '<div class="email-pad" style="padding:26px 30px 30px;background:' + BRAND.cream + ';border-top:1px solid ' + BRAND.line + ';text-align:center;">' +
    '<div style="font-family:Georgia,serif;color:' + BRAND.deepGreen + ';font-size:20px;font-weight:700;">Charlene Dellosa</div>' +
    '<div style="margin-top:5px;color:' + BRAND.gold + ';font-size:13px;letter-spacing:1px;text-transform:uppercase;font-weight:700;">The Dynamic Property Specialist</div>' +
    '<div style="margin:14px auto 18px;max-width:510px;color:' + BRAND.muted + ';font-size:14px;line-height:1.75;">' + escapeHtml_(text) + '</div>' +
    '<div style="height:1px;background:' + BRAND.line + ';margin:0 auto 18px;max-width:420px;"></div>' +
    '<div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;margin-bottom:11px;">Follow the property journey</div>' +
    '<a class="social-link" href="' + SOCIAL_LINKS.instagram + '" target="_blank" rel="noopener" style="display:inline-block;vertical-align:middle;margin:4px;padding:9px 14px 9px 9px;border:1px solid #ddc9a7;border-radius:24px;background:#ffffff;color:' + BRAND.deepGreen + ';text-decoration:none;font-size:12px;font-weight:700;box-shadow:0 2px 5px rgba(18,55,42,.06);"><span style="display:inline-block;width:23px;height:23px;margin-right:6px;border-radius:50%;background:' + BRAND.gold + ';color:#ffffff;font-size:10px;line-height:23px;text-align:center;vertical-align:middle;">IG</span>Instagram</a>' +
    '<a class="social-link" href="' + SOCIAL_LINKS.tiktok + '" target="_blank" rel="noopener" style="display:inline-block;vertical-align:middle;margin:4px;padding:9px 14px 9px 9px;border:1px solid #ddc9a7;border-radius:24px;background:#ffffff;color:' + BRAND.deepGreen + ';text-decoration:none;font-size:12px;font-weight:700;box-shadow:0 2px 5px rgba(18,55,42,.06);"><span style="display:inline-block;width:23px;height:23px;margin-right:6px;border-radius:50%;background:' + BRAND.deepGreen + ';color:#ffffff;font-size:10px;line-height:23px;text-align:center;vertical-align:middle;">TT</span>TikTok</a>' +
    '<a class="social-link" href="' + SOCIAL_LINKS.youtube + '" target="_blank" rel="noopener" style="display:inline-block;vertical-align:middle;margin:4px;padding:9px 14px 9px 9px;border:1px solid #ddc9a7;border-radius:24px;background:#ffffff;color:' + BRAND.deepGreen + ';text-decoration:none;font-size:12px;font-weight:700;box-shadow:0 2px 5px rgba(18,55,42,.06);"><span style="display:inline-block;width:23px;height:23px;margin-right:6px;border-radius:50%;background:#b54832;color:#ffffff;font-size:10px;line-height:23px;text-align:center;vertical-align:middle;">YT</span>YouTube</a>' +
    '<div style="margin-top:0;color:' + BRAND.muted + ';font-size:10px;line-height:1.5;">Follow us for property tips, new listings, market updates, and community highlights.</div>' +
    '<div style="height:1px;background:' + BRAND.line + ';margin:24px auto 20px;max-width:420px;"></div>' +
    '<div style="padding:18px 14px 20px;background:#ffffff;border:1px solid ' + BRAND.line + ';border-radius:12px;text-align:center;">' +
      '<div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;margin-bottom:12px;">Join us on Facebook</div>' +
      '<a href="' + SOCIAL_LINKS.facebook + '" target="_blank" rel="noopener" style="display:block;text-decoration:none;"><img src="' + JOIN_US_BANNER_URL + '" alt="Join us on Facebook — Charlene Dellosa Properties" width="620" style="display:block;width:100%;max-width:620px;height:auto;border:0;border-radius:8px;" /></a>' +
      '<div style="margin-top:14px;"><a href="' + SOCIAL_LINKS.facebook + '" target="_blank" rel="noopener" style="display:inline-block;background:' + BRAND.deepGreen + ';border:1px solid ' + BRAND.deepGreen + ';border-radius:26px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;line-height:1.2;padding:13px 22px;">Join the Community on Facebook</a></div>' +
    '</div>' +
  '</div>';
}
const LEADS_SPREADSHEET_ID = '10wEesmw6YAh64kc2ypUHgxdkVuRFup0dXYCHUbHMiBQ';
const LEADS_SHEET_NAME = 'Leads'; // Blank means use the first tab in the existing spreadsheet.
const FOLLOW_UP_HOURS = [48, 96, 168];

function getLeadsSheet_() {
  const spreadsheet = SpreadsheetApp.openById(LEADS_SPREADSHEET_ID);
  const sheet = LEADS_SHEET_NAME ? spreadsheet.getSheetByName(LEADS_SHEET_NAME) : spreadsheet.getSheets()[0];
  if (!sheet) throw new Error('The configured Google Sheet tab could not be found.');
  ensureLeadHeaders_(sheet);
  return sheet;
}

function getLeadHeaderMap_(sheet) {
  const width = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, width).getValues()[0];
  const map = {};
  headers.forEach(function(header, index) {
    const key = String(header || '').trim();
    if (key) map[key] = index;
  });
  return map;
}

const NURTURE_CONSENT_VERSION = '2026-08-25-v2';
// Set true only while validating with controlled test leads and inboxes.
const FAST_TEST_MODE = false;
// Testing only: prevents the sender account from being detected as a client reply.
// This automatically disables when FAST_TEST_MODE is false.
const IGNORE_SENDER_ACCOUNT_DURING_TEST = false;

// One nurture email at approximately 24-hour intervals: Days 1 through 30.
const NORMAL_NURTURE_OFFSETS_HOURS = Array.from({ length: 30 }, function(_, index) {
  return (index + 1) * 24;
});
// Testing only: first email is immediately due, then one email per minute.
const FAST_TEST_NURTURE_OFFSETS_HOURS = Array.from({ length: 30 }, function(_, index) {
  return index / 60;
});

const NURTURE_OFFSETS_HOURS = FAST_TEST_MODE
  ? FAST_TEST_NURTURE_OFFSETS_HOURS
  : NORMAL_NURTURE_OFFSETS_HOURS;

function ensureLeadHeaders_(sheet) {
  const required = [
    'Lead ID', 'Name', 'Email', 'Mobile', 'Lead Type', 'Consultation Date', 'Submitted At',
    'Answers JSON', 'Privacy Consent', 'Privacy Consent At', 'Privacy Notice Version',
    'Nurture Consent', 'Nurture Consent At', 'Nurture Consent Version',
    'Nurture Step', 'Next Nurture At', 'Nurture Completed', 'Unsubscribed',
    'Unsubscribed At', 'Last Nurture Sent At', 'Last Nurture Error',
    'Replied', 'Completed'
  ];
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const current = sheet.getRange(1, 1, 1, lastColumn).getValues()[0]
    .map(function(value) { return String(value || '').trim(); });
  const hasAnyHeader = current.some(function(value) { return value !== ''; });

  if (!hasAnyHeader) {
    sheet.getRange(1, 1, 1, required.length).setValues([required]);
  } else {
    // Keep Mobile directly after Email, including on an existing sheet where
    // an earlier version may have appended the new column at the far right.
    const emailColumn = current.indexOf('Email') + 1;
    const mobileColumn = current.indexOf('Mobile') + 1;
    if (emailColumn > 0 && mobileColumn === 0) {
      sheet.insertColumnAfter(emailColumn);
      sheet.getRange(1, emailColumn + 1).setValue('Mobile');
    } else if (emailColumn > 0 && mobileColumn > 0 && mobileColumn !== emailColumn + 1) {
      const rowCount = Math.max(sheet.getMaxRows(), 1);
      const mobileValues = sheet.getRange(1, mobileColumn, rowCount, 1).getValues();
      sheet.insertColumnAfter(emailColumn);
      const oldMobileColumn = mobileColumn > emailColumn ? mobileColumn + 1 : mobileColumn;
      sheet.getRange(1, emailColumn + 1, rowCount, 1).setValues(mobileValues);
      sheet.deleteColumn(oldMobileColumn);
    }

    const refreshedWidth = Math.max(sheet.getLastColumn(), 1);
    const refreshed = sheet.getRange(1, 1, 1, refreshedWidth).getValues()[0]
      .map(function(value) { return String(value || '').trim(); });
    const additions = required.filter(function(header) { return refreshed.indexOf(header) === -1; });
    if (additions.length) {
      sheet.getRange(1, refreshed.length + 1, 1, additions.length).setValues([additions]);
    }
  }
  sheet.setFrozenRows(1);
}

function saveLead_(leadId, name, email, mobile, consultationDate, leadType, answers, consentAt,
                   privacyNoticeVersion, nurtureConsent, nurtureConsentAt,
                   nurtureConsentVersion) {
  const sheet = getLeadsSheet_();
  const map = getLeadHeaderMap_(sheet);
  const now = new Date();
  const enrolled = nurtureConsent === true;
  const nextNurtureAt = enrolled
    ? new Date(now.getTime() + NURTURE_OFFSETS_HOURS[0] * 60 * 60 * 1000)
    : '';
  const values = new Array(sheet.getLastColumn()).fill('');
  const lead = {
    'Lead ID': leadId || Utilities.getUuid(),
    'Name': name,
    'Email': email,
    'Mobile': mobile,
    'Lead Type': leadType,
    'Consultation Date': consultationDate,
    'Submitted At': now,
    'Answers JSON': JSON.stringify(answers),
    'Privacy Consent': true,
    'Privacy Consent At': consentAt || now,
    'Privacy Notice Version': privacyNoticeVersion || PRIVACY_NOTICE_VERSION,
    'Nurture Consent': enrolled,
    'Nurture Consent At': enrolled ? (nurtureConsentAt || now) : '',
    'Nurture Consent Version': enrolled ? (nurtureConsentVersion || NURTURE_CONSENT_VERSION) : '',
    'Nurture Step': 0,
    'Next Nurture At': nextNurtureAt,
    'Nurture Completed': !enrolled,
    'Unsubscribed': false,
    'Unsubscribed At': '',
    'Last Nurture Sent At': '',
    'Last Nurture Error': '',
    'Replied': false,
    'Completed': false
  };

  Object.keys(lead).forEach(function(header) {
    if (map[header] !== undefined) values[map[header]] = lead[header];
  });
  // Append the row first, then explicitly format identifier/contact/version
  // fields as text. This prevents Sheets from converting +639... into a
  // number/formula or 2026-08-24 into a date.
  sheet.appendRow(values);
  const textFields = {
    'Mobile': String(mobile || ''),
    'Privacy Notice Version': String(privacyNoticeVersion || PRIVACY_NOTICE_VERSION),
    'Nurture Consent Version': enrolled
      ? String(nurtureConsentVersion || NURTURE_CONSENT_VERSION)
      : ''
  };
  Object.keys(textFields).forEach(function(header) {
    if (map[header] !== undefined) {
      const textCell = sheet.getRange(sheet.getLastRow(), map[header] + 1);
      textCell.setNumberFormat('@');
      textCell.setValue(textFields[header]);
    }
  });

  // Do not inspect or create triggers during a public submission.
  // Install the follow-up trigger once by running installFollowUpAutomation()
  // manually from the Apps Script editor.
}

function ensureFollowUpTrigger_() {
  const exists = ScriptApp.getProjectTriggers().some(function(trigger) {
    return trigger.getHandlerFunction() === 'processLeadFollowUps';
  });
  if (!exists) {
    ScriptApp.newTrigger('processLeadFollowUps').timeBased().everyMinutes(1).create();
  }
}

function installFollowUpAutomation() {
  // One-time migration: remove any existing processLeadFollowUps timer
  // and recreate it with the current 1-minute interval.
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'processLeadFollowUps') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ensureFollowUpTrigger_();
  return 'Fast-test nurture automation is installed with a 1-minute trigger.';
}

function hasClientReplied_(email, submittedAt) {
  const since = submittedAt
    ? new Date(submittedAt)
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  if (isNaN(since.getTime())) return false;

  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail) return false;

  const normalizedAgentEmail = String(AGENT_EMAIL || '').trim().toLowerCase();
  if (
    FAST_TEST_MODE &&
    IGNORE_SENDER_ACCOUNT_DURING_TEST &&
    normalizedEmail === normalizedAgentEmail
  ) {
    console.log('Ignoring sender account as a reply during fast testing: ' + normalizedEmail);
    return false;
  }

  // Search by sender first, then enforce the submission timestamp per message.
  // This avoids Gmail's date-query/indexing edge cases while preventing older
  // unrelated correspondence from stopping a new lead's sequence.
  const threads = GmailApp.search('from:' + normalizedEmail, 0, 20);
  return threads.some(function(thread) {
    return thread.getMessages().some(function(message) {
      const from = String(message.getFrom() || '').toLowerCase();
      const date = message.getDate();
      return from.indexOf(normalizedEmail) !== -1 && date >= since;
    });
  });
}

function sendReplyStopAlert_(name, email, leadType, submittedAt, stoppedAt, step) {
  const safeName = String(name || 'A lead').trim() || 'A lead';
  const safeEmail = String(email || '').trim();
  const safeType = String(leadType || 'buyer').trim();
  const subject = 'Lead replied — nurture sequence stopped · ' + safeName;
  const body = [
    'A client replied to the property nurture sequence.',
    '',
    'Lead: ' + safeName,
    'Email: ' + safeEmail,
    'Lead type: ' + safeType,
    'Nurture emails already sent: ' + String(step || 0),
    'Original submission: ' + String(submittedAt || ''),
    'Reply detected: ' + String(stoppedAt || ''),
    '',
    'The lead was marked Replied = TRUE and Nurture Completed = TRUE.',
    'No further nurture emails will be sent.'
  ].join('\\n');

  const htmlBody = emailShell_(
    'Lead replied — nurture sequence stopped',
    '<div style="background:' + BRAND.deepGreen + ';padding:28px 30px;color:#ffffff;">' +
      '<div style="font-size:14px;letter-spacing:1.4px;text-transform:uppercase;color:' + BRAND.paleGold + ';font-weight:700;">Reply detected</div>' +
      '<h1 class="email-title" style="margin:8px 0 0;font-family:Georgia,serif;font-size:27px;line-height:1.25;color:#ffffff;">The nurture sequence has stopped</h1>' +
    '</div>' +
    '<div class="email-pad" style="padding:30px;">' +
      '<p style="font-size:17px;line-height:1.8;color:' + BRAND.ink + ';margin:0 0 18px;">' + escapeHtml_(safeName) + ' has replied to the property nurture sequence.</p>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:' + BRAND.cream + ';border:1px solid ' + BRAND.line + ';">' +
        detailRow_('Email address', '<a href="mailto:' + escapeHtml_(safeEmail) + '" style="color:' + BRAND.emerald + ';font-weight:700;">' + escapeHtml_(safeEmail) + '</a>') +
        detailRow_('Lead type', escapeHtml_(safeType)) +
        detailRow_('Nurture emails sent', escapeHtml_(String(step || 0))) +
        detailRow_('Reply detected', escapeHtml_(String(stoppedAt || ''))) +
      '</table>' +
      '<div style="margin-top:22px;padding:15px 16px;border-left:4px solid ' + BRAND.gold + ';background:#fffaf0;color:' + BRAND.ink + ';font-size:17px;line-height:1.85;">The lead is marked <strong>Replied</strong> and <strong>Nurture Completed</strong>. No further nurture emails will be sent.</div>' +
    '</div>' +
    footerHtml_('Internal reply-stop notification · Charlene Dellosa')
  );

  try {
    MailApp.sendEmail({
      to: AGENT_EMAIL,
      cc: SECONDARY_AGENT_EMAIL,
      subject: subject,
      body: body,
      htmlBody: htmlBody,
      replyTo: safeEmail || AGENT_EMAIL,
      inlineImages: getEmailBrandLogo_(),
      name: SENDER_NAME
    });
    console.log('Reply-stop alert sent for ' + safeEmail);
  } catch (alertError) {
    // Alert failure must never allow the nurture sequence to resume.
    console.error('Reply-stop alert failed: ' + String(alertError && alertError.message ? alertError.message : alertError));
  }
}

/*
 * Processes only the consent-gated 30-day nurture series. A detected client
 * reply is recorded, alerted to the owner, and permanently stops the sequence.
 */
function processLeadFollowUps() {
  const sheet = getLeadsSheet_();
  const map = getLeadHeaderMap_(sheet);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return;

  const now = new Date();
  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    const get = function(header) {
      return map[header] === undefined ? '' : row[map[header]];
    };
    const leadId = String(get('Lead ID') || '');
    const name = String(get('Name') || '');
    const email = String(get('Email') || '').toLowerCase();
    const leadType = String(get('Lead Type') || 'buyer').toLowerCase();
    const submittedAt = get('Submitted At');
    const nurtureConsent = asBoolean_(get('Nurture Consent'));
    const unsubscribed = asBoolean_(get('Unsubscribed'));
    const replied = asBoolean_(get('Replied'));
    const completed = asBoolean_(get('Nurture Completed'));
    const step = Number(get('Nurture Step') || 0);
    const nextAt = get('Next Nurture At') ? new Date(get('Next Nurture At')) : null;

    if (!leadId || !email || !nurtureConsent || unsubscribed || replied || completed) continue;
    
    if (!nextAt || isNaN(nextAt.getTime()) || now < nextAt) continue;
    if (step >= NURTURE_OFFSETS_HOURS.length) {
      sheet.getRange(r + 1, map['Nurture Completed'] + 1).setValue(true);
      continue;
    }

    if (hasClientReplied_(email, submittedAt)) {
      if (map['Replied'] !== undefined) sheet.getRange(r + 1, map['Replied'] + 1).setValue(true);
      if (map['Nurture Completed'] !== undefined) sheet.getRange(r + 1, map['Nurture Completed'] + 1).setValue(true);
      // The nurture sequence stops silently after a client reply.
      // No admin notification is sent here to conserve email quota.
      continue;
    }

    const answers = parseAnswers_(get('Answers JSON'));
    const nextStep = step + 1;
    const copy = getNurtureCopy_(nextStep, leadType, name, answers, leadId);

    try {
      GmailApp.sendEmail(
        email,
        copy.subject,
        copy.body,
        {
          htmlBody: copy.htmlBody,
          replyTo: AGENT_EMAIL,
          inlineImages: getEmailBrandLogo_(),
          name: SENDER_NAME
        }
      );
      sheet.getRange(r + 1, map['Nurture Step'] + 1).setValue(nextStep);
      sheet.getRange(r + 1, map['Last Nurture Sent At'] + 1).setValue(now);
      sheet.getRange(r + 1, map['Last Nurture Error'] + 1).setValue('');

      if (nextStep >= NURTURE_OFFSETS_HOURS.length) {
        sheet.getRange(r + 1, map['Nurture Completed'] + 1).setValue(true);
        sheet.getRange(r + 1, map['Next Nurture At'] + 1).setValue('');
      } else {
        const following = new Date(
          now.getTime() +
          (NURTURE_OFFSETS_HOURS[nextStep] - NURTURE_OFFSETS_HOURS[nextStep - 1]) * 60 * 60 * 1000
        );
        sheet.getRange(r + 1, map['Next Nurture At'] + 1).setValue(following);
      }
    } catch (error) {
      sheet.getRange(r + 1, map['Last Nurture Error'] + 1)
        .setValue(String(error && error.message ? error.message : error).slice(0, 500));
    }
  }
}

function asBoolean_(value) {
  return value === true || String(value).toLowerCase() === 'true' || String(value) === '1';
}

function parseAnswers_(json) {
  try {
    const parsed = JSON.parse(String(json || '[]'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function answerValue_(answers, index, fallback) {
  const item = answers[index];
  return item && item.answer ? String(item.answer) : (fallback || '');
}

function getNurtureCopy_(step, leadType, name, answers, leadId) {
  const safeStep = Math.max(1, Math.min(30, Number(step) || 1));
  // 30-day sequence strategy:
  // Days 1–6  | Awareness and affordability: surface uncertainty around budget, costs, and fit.
  // Days 7–12 | Readiness and process: reduce fear around documents, financing, and first steps.
  // Days 13–18| Risk reduction and validation: address hidden costs, promos, availability, and comparison.
  // Days 19–24| Decision support: clarify priorities, timing, family needs, and consultation readiness.
  // Days 25–30| Action and conversion: invite a low-pressure reply, review, viewing, or computation.
  const messages = [
    `Starting your home search can feel exciting—and confusing at the same time.

You may be asking yourself: “What can I really afford without making every month difficult?” Many buyers begin with the house price, then feel discouraged when they discover the down payment, fees, utilities, and other costs.

That uncertainty does not mean homeownership is impossible. It simply means your search should begin with a comfortable monthly budget, not with random listings. When the numbers are clear, you can look at options with less fear and more confidence.

Reply “BUDGET” and I’ll help you identify the first numbers to review.`,
    `One of the most common buyer worries is having enough cash at the beginning.

The down payment is important, but it is not always the only amount to prepare. Depending on the property and transaction, you may also need to consider reservation costs, processing fees, moving expenses, utility setup, and an emergency buffer.

Seeing the full picture early can feel uncomfortable—but it is far better than being surprised after you have already become emotionally attached to a property. A responsible plan protects both your dream and your finances.

Reply “COSTS” if you would like a simple list of expenses to ask about.`,
    `Many buyers stay stuck because they are afraid of choosing the wrong home.

What if the location is inconvenient? What if the space becomes too small? What if the monthly payment feels manageable today but stressful later? These are valid questions, especially when the purchase will affect your family for years.

You do not need to decide everything in one day. Start by separating your true non-negotiables from features that would simply be nice to have. That small exercise can turn an overwhelming search into a more focused one.

Send me your top three priorities—location, space, payment, or timing—and we can use them as your starting filter.`,
    `Renting can provide flexibility, but it can also make your homeownership goal feel like something you will start “next year.” Over time, that uncertainty can become frustrating—especially when rent increases while your long-term plan remains unchanged.

This is not a message telling you to rush into buying. The better question is whether your current rent, savings, and timeline are aligned with what you want. A simple comparison may show that you need to buy now, prepare longer, or adjust your target.

Either answer is useful because it replaces guessing with direction.

Reply “COMPARE” and I’ll help you organize a rent-versus-ownership review.`,
    `A property purchase is not only one decision. It is a sequence of decisions: choosing a suitable property, preparing documents, reviewing payment terms, arranging financing, completing requirements, and understanding the turnover timeline.

When buyers do not know what comes next, even a good opportunity can feel stressful. You may worry about missing a requirement, misunderstanding a payment, or committing before you are ready.

A clear process makes the journey calmer. You do not need to memorize everything; you only need to know the next step and the question to ask.

Reply “PROCESS” if you want the homebuying journey explained in plain language.`,
    `A home can fit your budget and still fail to fit your life.

Think beyond the photo and floor plan. How long will the commute be? Are schools, groceries, hospitals, and major roads accessible? Will the location still work if your family or work situation changes?

The best property decision considers an ordinary weekday—not only the excitement of a weekend viewing. When the location supports your routine, the home becomes easier to enjoy and easier to sustain.

Reply with your preferred area and the places you need to reach regularly. I’ll help you identify the location questions worth asking.`,
    `Some buyers wait until every document is complete before asking for guidance. That can make the process feel even more difficult because you do not know which document matters first or what may be missing.

You do not have to be perfectly prepared to begin a conversation. A preliminary review can help you understand what to gather, what to clarify, and what timeline may be realistic—without forcing you to reserve a property.

Small preparation steps create momentum. Instead of thinking, “I am not ready,” you can ask, “What is the next thing I can prepare?”

Reply “READY” and I’ll send a basic buyer-preparation checklist.`,
    `First-time buyers often worry that their questions will sound basic or that they will appear unprepared.

Please remember that a home is a significant financial decision. Asking about down payment, financing, requirements, fees, turnover, and total cost is not a weakness—it is part of protecting yourself.

The greater risk is staying quiet and making assumptions. Clear answers help you compare options properly and prevent surprises later. You should feel comfortable asking questions before making a commitment.

Reply to this email with your biggest question. It can be as simple as “How much do I need to start?”`,
    `The monthly payment shown in a conversation is only one part of affordability.

A more complete review considers your initial cash requirement, estimated monthly payment, applicable fees, maintenance, utilities, transportation, and the emergency savings you want to keep untouched. Looking only at the monthly figure can create a false sense of comfort.

The purpose of a computation is not to pressure you into buying. It is to help you decide whether the plan is comfortable, needs adjustment, or should wait until you are better prepared.

Reply “NUMBERS” and I’ll share the questions to bring to a property computation.`,
    `A home should support the people who will actually live in it—not only the person viewing the listing.

Think about bedrooms, storage, privacy, work-from-home needs, children, elderly family members, parking, and the possibility that your household may change. Choosing too little space can create stress later, while choosing too much may create an unnecessary payment burden.

There is no universal “best” house. There is only a home that fits your household, priorities, and realistic budget more closely.

Reply with your household size and ideal bedroom count so we can narrow your requirements.`,
    `Limited availability can make buyers feel that they must decide immediately.

Urgency can be real, but it should never replace due diligence. Before acting, confirm the exact unit, current price, payment terms, inclusions, fees, requirements, and expected timeline. A screenshot or old post may not show the latest information.

A careful buyer is not a slow buyer. A careful buyer knows what must be verified before saying yes.

Reply “CHECKLIST” and I’ll help you organize the questions to ask before reserving.`,
    `Some buyers believe they need a perfect budget before they can ask about properties. That belief can delay useful planning for months.

An approximate range is enough to begin. You can start by identifying the monthly payment that would feel responsible—not simply the maximum a lender or calculator might show. From there, we can work backward toward property price, initial cash, and preparation steps.

Your first conversation does not need to produce a final answer. It only needs to make the next answer easier.

Reply with your comfortable monthly range, even if it is only an estimate.`,
    `Financing is one of the areas that creates the most uncertainty for buyers.

You may be wondering whether your income qualifies, what documents will be requested, how much down payment is needed, or how long approval may take. It is easy to compare your situation with a friend’s and assume the same result—but every application is different.

The helpful approach is to understand the possible payment paths and prepare the right questions early. That gives you time to improve your readiness instead of discovering concerns at the last minute.

Reply “FINANCE” and I’ll send a preparation guide for your next conversation.`,
    `Photos can create excitement, but a viewing should give you information.

Look at the actual layout, ventilation, natural light, noise, road access, surrounding properties, drainage, parking, and the daily convenience of the location. Notice what is included and what may require additional work or cost.

A good viewing does not make you feel pressured to say yes. It helps you say either “this may fit” or “this is not right for us” with greater confidence.

Reply “TOUR” if you would like to discuss what to inspect during a property viewing.`,
    `Comparing properties only by selling price can lead to the wrong conclusion.

One home may cost less but require a longer commute. Another may have a higher price but a more practical location, better layout, or payment structure. Fees, usable space, maintenance, and time savings can change the real value of an option.

The goal is not to find the cheapest listing. The goal is to find the option that gives you the best overall fit without creating an unhealthy financial burden.

Reply “COMPARE” with two properties or locations, and I’ll share a comparison framework.`,
    `If the down payment is your biggest concern, it is better to say so early than to avoid the conversation.

Many buyers feel embarrassed that they are not ready with a large amount. But knowing the amount you need—and the amount you can responsibly prepare—allows you to build a realistic timeline. It may also help you identify which property options are worth considering.

The goal is not to stretch your finances until they become uncomfortable. The goal is to find a path that respects your current situation and future responsibilities.

Reply “DP” if you want to review the down-payment questions that matter most.`,
    `Promos can be helpful, but they can also create pressure that makes buyers overlook the full decision.

A discount is only valuable if the property fits your location needs, payment capacity, family requirements, and timeline. Before responding to a promo, confirm the total price, what is included, the validity period, payment terms, and any conditions.

You do not have to choose between ignoring every promo and rushing into one. You can ask better questions and decide from facts.

Reply “PROMO” and I’ll send the questions to ask before evaluating an offer.`,
    `After looking at many listings, the search can become exhausting. Every property begins to look like another decision, and it becomes difficult to remember what truly matters.

A simple filter can restore clarity. Separate your requirements into three groups: must-haves, preferences, and deal-breakers. This helps you stop spending time on properties that were never a good fit.

Your search should feel more focused over time—not more confusing.

Send me your must-haves and deal-breakers, and I’ll help turn them into a practical property brief.`,
    `There is no single correct timeline for buying a home.

Some buyers want to move this year. Others need twelve months to prepare savings, documents, or financing. Some are only gathering information for the future. The problem is not having a later target; the problem is having no plan for what to do before that target arrives.

A timeline gives your savings, requirements, property search, and decision-making a direction.

Reply with your target timeline—this year, next year, or later—and I’ll suggest an appropriate next step.`,
    `Your household may look different several years from now than it does today.

Work arrangements can change. Children may need more space. Parents may move in. A location that is convenient now may become difficult if your daily routine changes. These are not reasons to overbuy; they are reasons to think beyond the viewing day.

The right question is not “What can I afford at the limit?” It is “What home can support my life without creating unnecessary pressure?”

Reply with the people and priorities your future home needs to serve.`,
    `A consultation should give you clarity—not pressure to reserve.

To make the conversation useful, prepare four things: your approximate budget, preferred areas, must-have features, and biggest concern. You do not need to know the exact property yet. These details are enough to begin narrowing the possibilities.

A good discussion can help you understand what is realistic, what needs preparation, and what choices deserve more attention.

Reply “CONSULT” if you would like help preparing for your conversation.`,
    `If you are still browsing, that does not mean you have failed.

It may mean your search needs better filters, your numbers need clarification, or you have not found an option that feels right. Sometimes indecision is not a lack of interest—it is a sign that an important question remains unanswered.

Instead of forcing a decision, identify the one thing holding you back. Once that concern is named, it becomes easier to address.

Reply with what is keeping you from moving forward, and we can identify one manageable next step.`,
    `Unexpected costs are a common source of buyer stress because they appear after the buyer has already become emotionally committed.

Before making a decision, ask about applicable taxes, transfer or processing costs, association or maintenance fees, utility connection, repairs, moving expenses, and other charges relevant to the property. The exact costs may vary, but the questions should not be skipped.

A complete cost review gives you a more honest picture of affordability.

Reply “TOTAL” and I’ll help you create a cost-review checklist.`,
    `The lowest purchase price is not always the lowest total cost.

A cheaper property may create a longer commute, higher transportation expenses, more repairs, or a monthly payment that only looks affordable because other costs were excluded. A slightly different option may fit your daily life better and reduce stress over time.

This does not mean choosing the most expensive property. It means looking at the full lifestyle and financial picture before comparing prices.

Reply with your top priority—monthly payment, location, space, or convenience—and we can use it to evaluate options.`,
    `A serious home search does not have to begin with a reservation.

It can begin with one honest conversation about what you want, what you can manage, and what you are not willing to compromise. That conversation can save you time because it prevents you from chasing properties that do not fit your actual situation.

You are allowed to ask questions before making a commitment. In fact, informed questions are one of the strongest signs of a responsible buyer.

Reply “START” and tell me the one thing you want to understand first.`,
    `If you have a preferred unit or location, current information matters.

Availability, pricing, payment terms, and promotional conditions can change. Relying on an old post or forwarded screenshot may give you an outdated picture and create unnecessary disappointment.

A quick verification can tell you whether the option is still available, what has changed, and whether it remains aligned with your priorities. That is a much better starting point than assuming.

Reply “AVAILABILITY” with the property or location you want to check.`,
    `Taking time before deciding is completely reasonable. The important thing is to use that time to reduce uncertainty.

Collect the current price, estimated payment, initial cash requirement, requirements, timeline, included features, and alternative options. With that information, you can make a decision based on facts instead of excitement, fear, or pressure from a deadline.

You do not have to decide today. You can simply prepare better today.

Reply “DETAILS” and I’ll help you organize the information you still need.`,
    `There are only a few days left in this guided series, so let’s make your next step practical.

You may need a budget review, a property shortlist, a requirements check, a financing conversation, or a viewing. You do not need to complete the entire journey at once. Choosing one useful next step is enough to move from browsing toward clarity.

Which would help you most right now?

Reply with one word: “BUDGET,” “SHORTLIST,” “REQUIREMENTS,” or “VIEWING.”`,
    `Tomorrow is the final daily note, but your homeownership plan does not need to end with the series.

If you have a property in mind, now is a good time to gather the details that make a conversation productive: location, property type, budget range, preferred payment, household needs, and target purchase date.

If you do not have a property yet, that is also okay. We can start with your goals and work toward a realistic shortlist.

Reply with whatever information you already have, and we’ll identify what still needs clarification.`,
    `You made it to Day 30.

The purpose of these emails was never to pressure you into buying. It was to help you recognize the concerns that can make homeownership feel confusing: affordability, down payment, financing, hidden costs, location, timing, and the fear of making the wrong choice.

You do not need to have everything solved before taking the next step. You can ask for available properties, request a sample computation, review requirements, compare locations, or simply ask one question.

Reply “HOME” and tell me what would be most helpful. We can begin with clarity and move forward only when the plan feels right for you.`
  ];
  const message = messages[safeStep - 1];
  const lines = message.split(/\r?\n/);
  const subjectSeed = lines.find(function(line) { return String(line || '').trim() !== ''; }) || 'Homebuyer guidance';
  const subjects = [
    'Your first step toward a home of your own',
    'A smarter way to begin your home search',
    'Could your dream home fit your budget?',
    'The location question that matters most',
    'A clearer way to understand your home budget',
    'Before you choose a home, review these details',
    'You can explore your options without pressure',
    'Let’s make your home search more personal',
    'How to compare homes with greater confidence',
    'The price is only part of the picture',
    'Find a location that fits your everyday life',
    'A simple checklist for your next home conversation',
    'When could the right time be for you?',
    'Your homebuying questions deserve clear answers',
    'A calmer, more confident way to choose',
    'The details that can make a difference',
    'What would make your decision feel easier?',
    'A practical question about your timeline',
    'Compare your options with more clarity',
    'Your home goals can become clearer from here',
    'How is your home search progressing?',
    'What should you know before moving forward?',
    'Prepare for a more productive property conversation',
    'Interest is the beginning—clarity is the next step',
    'One important question before you decide',
    'Which next step would help you most?',
    'Let’s turn your home plans into a clear direction',
    'A thoughtful plan starts with one practical step',
    'You are closer to clarity than you think',
    'Your next chapter in homeownership starts here'
  ];
  const subject = subjects[safeStep - 1] + ' · Day ' + safeStep + ' of 30';
  const preview = subjectSeed.trim().slice(0, 120);
  const unsubscribeUrl = getUnsubscribeUrl_(leadId);
  const firstName = String(name || '').trim().split(/\s+/)[0] || '';

  const emojiEntities = {
    '🏡': '&#127968;', '🏠': '&#127968;', '🏫': '&#127979;', '🏢': '&#127970;',
    '🛒': '&#128722;', '🚗': '&#128663;', '🏥': '&#127973;', '📌': '&#128204;',
    '💵': '&#128181;', '💰': '&#128176;', '📅': '&#128197;', '📋': '&#128203;',
    '📩': '&#128233;', '⚠️': '&#9888;&#65039;', '✔️': '&#10004;&#65039;',
    '🎁': '&#127873;', '☐': '&#9744;', '1️⃣': '&#9312;', '2️⃣': '&#9313;',
    '3️⃣': '&#9314;', '😊': '&#128522;', '❤️': '&#10084;&#65039;', '🎉': '&#127881;'
  };
  function escapeEmailHtml_(value) {
    let escaped = escapeHtml_(value);
    Object.keys(emojiEntities).forEach(function(icon) {
      escaped = escaped.split(escapeHtml_(icon)).join(emojiEntities[icon]);
    });
    return escaped;
  }

  // Preserve the message text exactly while giving each line editorial spacing.
  const messageHtml = message.split(/\r?\n/).map(function(line) {
    const text = String(line || '').trim();
    if (!text) return '<div style="height:12px;line-height:12px;">&nbsp;</div>';
    return '<div style="margin:0 0 11px;">' + escapeEmailHtml_(text) + '</div>';
  }).join('');
  const progress = Math.round((safeStep / 30) * 100);
  const greetingHtml = firstName
    ? '<div style="margin:0 0 20px;color:' + BRAND.muted + ';font-size:14px;letter-spacing:.2px;">Prepared especially for <strong style="color:' + BRAND.deepGreen + ';">' + escapeHtml_(firstName) + '</strong></div>'
    : '';

  const body = [
    firstName ? 'Hi ' + firstName + ',' : '',
    '',
    message,
    '',
    'Warm regards,',
    AGENT_NAME,
    'Dynamic Property Specialist',
    '',
    'To stop property guidance emails, use the unsubscribe link in the HTML version of this message.'
  ].join('\n');

  const html = emailShell_(subject,
    '<div style="background:#fbf8f2 !important;padding:30px 32px 26px;color:#063c24 !important;position:relative;color-scheme:light only;" bgcolor="#fbf8f2">' +
      '<div style="height:3px;width:58px;background:#cc953e !important;margin-bottom:19px;"></div>' +
      '<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#063c24 !important;font-weight:700;">Charlene Dellosa Properties</div>' +
      '<h1 class="email-title" style="margin:9px 0 8px;font-family:Georgia,Times New Roman,serif;font-size:30px;line-height:1.2;color:#063c24 !important;letter-spacing:-.2px;">Homebuyer guidance</h1>' +
      '<div style="font-size:14px;line-height:1.6;color:#66736c !important;">A thoughtful step toward a home that fits your life.</div>' +
      '<div style="margin-top:25px;padding:13px 15px;background:#ffffff !important;border:1px solid #eadabd;border-radius:10px;color:#063c24 !important;" bgcolor="#ffffff">' +
        '<div style="font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:#063c24 !important;font-weight:700;">Day ' + safeStep + ' of 30</div>' +
        '<div style="height:6px;margin-top:10px;background:#e8dfd2 !important;border-radius:9px;overflow:hidden;"><div style="height:6px;width:' + progress + '%;background:#cc953e !important;border-radius:9px;"></div></div>' +
        '<div style="margin-top:7px;text-align:right;color:#66736c !important;font-size:11px;">' + progress + '% of your guided journey</div>' +
      '</div>' +
    '</div>' +
    '<div class="email-pad" style="padding:34px 34px 30px;background:' + BRAND.paper + ';">' +
      '<div style="display:inline-block;padding:7px 12px;border-radius:20px;background:#f8f0df;color:' + BRAND.emerald + ';font-size:11px;letter-spacing:1.2px;text-transform:uppercase;font-weight:700;">A private note for your property journey</div>' +
      '<div style="margin-top:22px;font-family:Arial,Helvetica,Segoe UI Emoji,Noto Color Emoji,sans-serif;font-size:17px;line-height:1.85;color:' + BRAND.ink + ';word-break:normal;">' +
        greetingHtml + messageHtml +
      '</div>' +
      '<div style="margin:28px 0 0;padding:20px 20px 22px;background:linear-gradient(180deg,#fffaf0 0%,#fbf8f2 100%);border:1px solid #eadabd;border-radius:14px;text-align:center;box-shadow:0 5px 16px rgba(18,55,42,.06);">' +
        '<div style="font-family:Georgia,Times New Roman,serif;color:' + BRAND.deepGreen + ';font-size:20px;font-weight:700;">Have a question?</div>' +
        '<div style="margin:6px auto 15px;max-width:390px;color:' + BRAND.muted + ';font-size:13px;line-height:1.6;">Reply directly to this email and Charlene will help you take the next step with clarity.</div>' +
        '<a href="mailto:' + AGENT_EMAIL + '" style="display:inline-block;background:' + BRAND.deepGreen + ';border:1px solid ' + BRAND.deepGreen + ';color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;line-height:1.2;padding:14px 25px;border-radius:28px;box-shadow:0 4px 10px rgba(6,60,36,.18);">Reply to Charlene</a>' +
      '</div>' +
      '<div style="margin-top:22px;text-align:center;color:' + BRAND.muted + ';font-size:11px;line-height:1.6;">Your information is treated with care and used only to support your property journey.</div>' +
    '</div>' +
    footerHtml_('A helpful daily note from Charlene Dellosa') +
    '<div style="padding:5px 30px 30px;background:' + BRAND.cream + ';text-align:center;color:' + BRAND.muted + ';font-size:11px;line-height:1.6;">' +
      '<div style="margin-bottom:12px;">You are receiving this because you requested property guidance.</div>' +
      '<a href="' + escapeHtml_(unsubscribeUrl) + '" style="display:inline-block;background:#ffffff;color:' + BRAND.emerald + ';border:1px solid ' + BRAND.emerald + ';border-radius:24px;padding:11px 20px;font-size:12px;font-weight:700;text-decoration:none;">Unsubscribe from property guidance</a>' +
      '<div style="margin-top:10px;font-size:10px;color:' + BRAND.muted + ';">You will be asked to confirm before any change is made.</div>' +
    '</div>'
  );

  return { subject: subject, body: body, htmlBody: html };
}


/**
 * Sends a single 30-day nurture email to the configured agent inbox for visual testing.
 * Run sendTestNurtureEmail() from the Apps Script editor, then check Gmail on desktop/mobile.
 * Optional examples: sendTestNurtureEmail(1); sendTestNurtureEmail(30, 'your@email.com');
 * This does not modify any lead record or advance the live nurture sequence.
 */
function sendTestNurtureEmail(day, recipient) {
  const testDay = Math.max(1, Math.min(30, Number(day) || 1));
  const testRecipient = String(recipient || AGENT_EMAIL).trim();
  if (!testRecipient || testRecipient.indexOf('@') < 1) {
    throw new Error('Provide a valid test recipient email address.');
  }

  const copy = getNurtureCopy_(testDay, 'buyer', 'Test Recipient', [], 'TEST-PREVIEW');
  GmailApp.sendEmail(
    testRecipient,
    copy.subject,
    copy.body,
    {
      htmlBody: copy.htmlBody,
      from: AGENT_EMAIL,
      replyTo: AGENT_EMAIL,
      inlineImages: getEmailBrandLogo_(),
      name: SENDER_NAME
    }
  );
  console.log('Test nurture email sent: Day ' + testDay + ' to ' + testRecipient);
  return 'Test nurture email sent: Day ' + testDay + ' to ' + testRecipient;
}

function getUnsubscribeUrl_(leadId) {
  const base = PUBLIC_WEB_APP_URL || ScriptApp.getService().getUrl();
  return base + '?unsubscribe=' + encodeURIComponent(leadId);
}

/*
 * Update doGet(e) by placing this branch before the existing template return:
 *
 * if (e && e.parameter && e.parameter.unsubscribe) {
 *   return handleUnsubscribe_(e.parameter.unsubscribe);
 * }
 */
function handleUnsubscribe_(leadId, confirmParam, cancelParam) {
  const baseUrl = getUnsubscribeUrl_(leadId);
  const confirmed = String(confirmParam || '').toLowerCase() === '1' || String(confirmParam || '').toLowerCase() === 'true';
  const canceled = String(cancelParam || '').toLowerCase() === '1' || String(cancelParam || '').toLowerCase() === 'true';

  if (!confirmed) {
    const keepingSubscription = canceled;
    const heading = keepingSubscription ? 'You are still subscribed' : 'Please confirm your unsubscribe request';
    const message = keepingSubscription
      ? 'No changes were made. You will continue receiving property guidance emails.'
      : 'Would you like to stop the remaining property guidance emails for this address? Your consultation request, if any, will not be deleted.';
    const actions = keepingSubscription
      ? '<a target="_top" href="' + escapeHtml_(baseUrl) + '" style="display:inline-block;background:#063c24;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 22px;border-radius:24px;">Return</a>'
      : '<a target="_top" href="' + escapeHtml_(baseUrl + '&confirm=1') + '" style="display:inline-block;background:#b54832;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 22px;border-radius:24px;margin:4px;">Yes, unsubscribe me</a>' +
        '<a target="_top" href="' + escapeHtml_(baseUrl + '&cancel=1') + '" style="display:inline-block;background:#ffffff;color:#063c24;border:1px solid #063c24;text-decoration:none;font-weight:700;font-size:15px;padding:12px 22px;border-radius:24px;margin:4px;">Keep receiving emails</a>';
    return renderPreferencePage_(heading, message, actions);
  }

  const sheet = getLeadsSheet_();
  const map = getLeadHeaderMap_(sheet);
  const values = sheet.getDataRange().getValues();
  let found = false;
  for (let r = 1; r < values.length; r++) {
    if (String(values[r][map['Lead ID']] || '') === String(leadId || '')) {
      sheet.getRange(r + 1, map['Unsubscribed'] + 1).setValue(true);
      sheet.getRange(r + 1, map['Unsubscribed At'] + 1).setValue(new Date());
      sheet.getRange(r + 1, map['Nurture Completed'] + 1).setValue(true);
      sheet.getRange(r + 1, map['Next Nurture At'] + 1).clearContent();
      found = true;
      break;
    }
  }

  const heading = found ? 'You are unsubscribed' : 'Unsubscribe request received';
  const message = found
    ? 'You will no longer receive property guidance emails from Charlene Dellosa. Your consultation request, if any, is not automatically deleted.'
    : 'We could not find an active nurture record for this link. If you still receive a message, reply with “unsubscribe” or contact dellosacharlene1317@gmail.com.';
  return renderPreferencePage_(heading, message, '');
}

function renderPreferencePage_(heading, message, actionsHtml) {
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:40px 20px;background:#fbf8f2;color:#173226;font-family:Arial,Helvetica,sans-serif;">' +
    '<main style="max-width:560px;margin:0 auto;padding:34px;background:#ffffff;border:1px solid #e8dfd2;border-radius:16px;text-align:center;">' +
    '<div style="font-family:Georgia,serif;color:#063c24;font-size:26px;font-weight:700;">Charlene Dellosa</div>' +
    '<div style="margin-top:24px;color:#cc953e;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Email preferences</div>' +
    '<h1 style="font-family:Georgia,serif;color:#063c24;font-size:30px;line-height:1.2;">' + escapeHtml_(heading) + '</h1>' +
    '<p style="color:#66736c;font-size:17px;line-height:1.8;">' + escapeHtml_(message) + '</p>' +
    (actionsHtml ? '<div style="margin-top:24px;">' + actionsHtml + '</div>' : '') +
    '</main></body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function buildAgentText_(name, email, mobile, consultationDate, submittedAt, answers, nurtureConsent, nurtureConsentVersion) {
  const answerText = answers.map(function(item, index) {
    return (index + 1) + '. ' + item.question + '\n   Answer: ' + (item.answer || 'No answer');
  }).join('\n\n');
  return [
    'NEW PROPERTY QUIZ SUBMISSION', '',
    'CLIENT SUMMARY',
    'Name: ' + name,
    'Email: ' + email,
    'Mobile: ' + mobile,
    'Preferred consultation: ' + consultationDate,
    'Submitted: ' + submittedAt,
    'Property guidance emails: ' + (nurtureConsent ? 'Confirmed · version ' + (nurtureConsentVersion || NURTURE_CONSENT_VERSION) : 'Not selected'), '',
    'QUIZ ANSWERS', answerText || 'No answers were recorded.', '',
    'Reply directly to this email to contact the client.'
  ].join('\n');
}

function buildClientText_(name, mobile, consultationDate, leadType, answers, leadId) {
  const profile = getLeadProfile_(leadType);
  const answerText = (answers || []).map(function(item, index) {
    return (index + 1) + '. ' + item.question + '\n   Answer: ' + (item.answer || 'No answer');
  }).join('\n\n');
  return [
    'Hi ' + name + ',', '',
    profile.clientIntro,
    'Mobile: ' + mobile,
    'Preferred consultation: ' + consultationDate, '',
    'YOUR SUBMITTED QUIZ ANSWERS', answerText || 'No answers were recorded.', '',
    'Your property guide is attached to this email as one PDF file.', '',
    'To stop property guidance emails, use this unsubscribe link: ' + getUnsubscribeUrl_(leadId), '',
    profile.clientPromise,
    'Recommended next step: ' + profile.nextStep,
    'If you need to update your preferred time, simply reply to this email.', '',
    'Warm regards,', AGENT_NAME, 'Dynamic Property Specialist'
  ].join('\n');
}

function escapeHtml_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function cleanText_(value, maxLength) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMobile_(mobile) {
  return /^[0-9+() .-]{7,25}$/.test(String(mobile || '').trim());
}


/**
 * Sends one clearly labeled dummy buyer submission through the real workflow.
 * Replace TEST_CLIENT_EMAIL with an inbox you control before running.
 */
function testDummyQuizSubmission() {
  const TEST_CLIENT_EMAIL = 'jabeguero.innersparc@gmail.com';

  if (TEST_CLIENT_EMAIL === 'your-test-email@example.com') {
    throw new Error('Replace TEST_CLIENT_EMAIL with an inbox you control before running this test.');
  }

  const payload = {
    name: 'TEST Buyer 001',
    email: TEST_CLIENT_EMAIL.toLowerCase(),
    mobile: '+639171234567',
    consultationDate: 'TEST — Tomorrow at 10:00 AM',
    privacyConsent: true,
    privacyNoticeVersion: PRIVACY_NOTICE_VERSION,
    nurtureConsent: true,
    nurtureConsentVersion: NURTURE_CONSENT_VERSION,
    answers: [
      { question: 'Which best describes your current situation as a property buyer?', answer: 'Corporate Employee' },
      { question: 'What is your main real estate goal?', answer: 'Buy My First Home' },
      { question: 'What is your budget range?', answer: '₱3M – ₱5M' },
      { question: 'Where would you like to buy or invest?', answer: 'Cavite' },
      { question: 'What type of property are you looking for?', answer: 'House and Lot' },
      { question: 'When are you planning to make your move?', answer: 'Within 3–6 Months' }
    ]
  };

  const sheetBefore = getLeadsSheet_().getLastRow();
  const result = sendQuizNotification(payload);
  SpreadsheetApp.flush();

  const sheet = getLeadsSheet_();
  const sheetAfter = sheet.getLastRow();
  const headerMap = getLeadHeaderMap_(sheet);
  const latestRow = sheet.getRange(sheetAfter, 1, 1, sheet.getLastColumn()).getValues()[0];
  const value = function(header) { return latestRow[headerMap[header]]; };

  if (sheetAfter !== sheetBefore + 1) throw new Error('No new lead row was added to the sheet.');
  if (value('Name') !== payload.name) throw new Error('The test name was not saved correctly.');
  if (String(value('Email')).toLowerCase() !== payload.email) throw new Error('The test email was not saved correctly.');
  if (String(value('Mobile')) !== payload.mobile) throw new Error('The test mobile number was not saved correctly.');
  if (String(value('Lead Type')).toLowerCase() !== 'buyer') throw new Error('The test lead was not classified as buyer.');
  if (Number(value('Nurture Step')) !== 0) throw new Error('The initial nurture step should be 0.');
  if (String(value('Privacy Consent')).toLowerCase() !== 'true') throw new Error('Privacy consent was not saved as true.');
  if (!value('Privacy Consent At')) throw new Error('Privacy consent timestamp was not saved.');
  if (String(value('Privacy Notice Version')) !== PRIVACY_NOTICE_VERSION) throw new Error('Privacy notice version was not saved correctly.');

  Logger.log(JSON.stringify({
    status: result.emailQueued
      ? 'PASS — emails submitted and sheet row verified'
      : 'PASS — sheet row verified; email delivery warning recorded',
    result: result,
    sheetRow: sheetAfter,
    leadType: value('Lead Type'),
    clientEmail: value('Email'),
    nurtureStep: value('Nurture Step'),
    nextNurtureAt: value('Next Nurture At'),
    privacyConsent: value('Privacy Consent'),
    privacyConsentAt: value('Privacy Consent At'),
    privacyNoticeVersion: value('Privacy Notice Version')
  }, null, 2));
}

/** Run only when the last row is the TEST row and you want to remove it. */
function buildSitemapXml_() {
  const urls = [PUBLIC_WEB_APP_URL];
  const lastmod = Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyy-MM-dd');
  const entries = urls.map(function(url) {
    return '  <url><loc>' + escapeXml_(url) + '</loc><lastmod>' + lastmod + '</lastmod></url>';
  }).join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries + '\n</urlset>';
}

function escapeXml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function deleteLatestTestLead() {
  const sheet = getLeadsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) throw new Error('There are no data rows to delete.');
  const headerMap = getLeadHeaderMap_(sheet);
  const name = sheet.getRange(lastRow, headerMap['Name'] + 1).getValue();
  if (String(name).indexOf('TEST ') !== 0) throw new Error('The last row is not labeled as a TEST row. No row was deleted.');
  sheet.deleteRow(lastRow);
  Logger.log('Deleted test row ' + lastRow + '.');
}

function authorizeAutomation_() {
  ScriptApp.getProjectTriggers();
  MailApp.getRemainingDailyQuota();
  SpreadsheetApp.openById(LEADS_SPREADSHEET_ID).getName();
}


