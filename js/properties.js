// Property listings — SAMPLE DATA for the design draft.
// Each property: id, price (EUR), type, location (lat/lng for the map),
// beds/baths/area/plot (m²), bilingual title + description, and photos.
// Later this file can be managed from a simple admin panel.

(function () {
  const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=70`;
  const EXT = ['1600596542815-ffad4c1539a9', '1600585154340-be6161a56a0c', '1564013799919-ab600027ffc6', '1512917774080-9991f1c4c750', '1568605114967-8130f3a36994', '1570129477492-45c003edd2be', '1580587771525-78b9dba3b914', '1600047509807-ba8f99d2cdde', '1605276374104-dee2a0ed3cd6', '1613490493576-7fde63acd811'];
  const INT = ['1600607687939-ce8a6c25118c', '1600566753190-17f0baa2a6c3', '1502672260266-1c1ef2d93688', '1522708323590-d24dbb6b0267', '1493809842364-78817add7ffb', '1484154218962-a197022b5858', '1560448204-e02f11c3d0e2', '1600210492486-724fe5c67fb0', '1586023492125-27b2c045efd7', '1560185007-cde436f6a4d0', '1505693416388-ac5ce068fe85'];
  const pics = (i) => [EXT[i % EXT.length], INT[i % INT.length], INT[(i + 3) % INT.length], INT[(i + 6) % INT.length], EXT[(i + 4) % EXT.length]].map(U);

  const R = {
    silver: { he: 'החוף הכסוף', en: 'Silver Coast' },
    centro: { he: 'מרכז פורטוגל', en: 'Central Portugal' },
    lisbon: { he: 'אזור ליסבון', en: 'Lisbon area' },
    alentejo: { he: 'אלנטז׳ו', en: 'Alentejo' },
    north: { he: 'צפון פורטוגל', en: 'Northern Portugal' },
    algarve: { he: 'אלגרבה', en: 'Algarve' }
  };

  window.PROPERTIES = [
    {
      id: 'CL-101', price: 45000, type: 'land', region: R.silver, city: { he: 'אובידוש', en: 'Óbidos' },
      lat: 39.3606, lng: -9.1571, beds: 0, baths: 0, area: 0, plot: 2500,
      title: { he: 'מגרש לבנייה ליד אובידוש', en: 'Building plot near Óbidos' },
      description: { he: 'מגרש של 2,500 מ״ר עם נוף פתוח לגבעות, 15 דקות מהחוף. מתאים לבניית וילה או בית נופש.', en: '2,500 m² plot with open views over the hills, 15 minutes from the beach. Suitable for a villa or holiday home.' }
    },
    {
      id: 'CL-102', price: 79000, type: 'apartment', region: R.centro, city: { he: 'קוביליה', en: 'Covilhã' },
      lat: 40.2806, lng: -7.5041, beds: 1, baths: 1, area: 48,
      title: { he: 'דירת חדר שינה בקוביליה', en: 'One-bedroom apartment in Covilhã' },
      description: { he: 'דירה משופצת במרכז העיר, למרגלות הרי סרה דה אשטרלה. מושכרת היום לסטודנטים.', en: 'Renovated apartment in the town centre at the foot of the Serra da Estrela mountains. Currently rented to students.' }
    },
    {
      id: 'CL-103', price: 95000, type: 'house', region: R.centro, city: { he: 'פנלה', en: 'Penela' },
      lat: 40.0297, lng: -8.3897, beds: 2, baths: 1, area: 90, plot: 300,
      title: { he: 'בית אבן כפרי לשיפוץ', en: 'Stone village house to renovate' },
      description: { he: 'בית אבן מסורתי בכפר שקט ליד קוימברה, עם חצר פרטית. פרויקט מושלם למי שאוהב לשפץ.', en: 'Traditional stone house in a quiet village near Coimbra, with a private yard. A great project for someone who enjoys renovating.' }
    },
    {
      id: 'CL-104', price: 129000, type: 'apartment', region: R.silver, city: { he: 'קלדאש דה ריינה', en: 'Caldas da Rainha' },
      lat: 39.4036, lng: -9.1366, beds: 2, baths: 1, area: 85,
      title: { he: 'דירת 2 חדרי שינה בקלדאש דה ריינה', en: 'Two-bedroom apartment in Caldas da Rainha' },
      description: { he: 'דירה מוארת עם מרפסת, קרוב לפארק העירוני ולשוק. 20 דקות מחופי האוקיינוס.', en: 'Bright apartment with a balcony, close to the city park and market. 20 minutes from the ocean beaches.' }
    },
    {
      id: 'CL-105', price: 142000, type: 'townhouse', region: R.centro, city: { he: 'טומאר', en: 'Tomar' },
      lat: 39.6012, lng: -8.4094, beds: 3, baths: 2, area: 120,
      title: { he: 'בית עירוני בטומאר', en: 'Townhouse in Tomar' },
      description: { he: 'בית בן שלוש קומות בעיר העתיקה של טומאר, ליד הנהר. שלושה חדרי שינה ומרפסת גג.', en: "Three-storey house in Tomar's old town near the river. Three bedrooms and a roof terrace." }
    },
    {
      id: 'CL-106', price: 115000, type: 'apartment', region: R.centro, city: { he: 'ויזאו', en: 'Viseu' },
      lat: 40.6566, lng: -7.9125, beds: 2, baths: 1, area: 78,
      title: { he: 'דירה בויזאו', en: 'Apartment in Viseu' },
      description: { he: 'דירה מטופחת בבניין עם מעלית וחניה, בעיר שקטה ונעימה עם איכות חיים גבוהה.', en: 'Well-kept apartment in a building with lift and parking, in a calm city with a high quality of life.' }
    },
    {
      id: 'CL-107', price: 179000, type: 'apartment', region: R.lisbon, city: { he: 'סטובאל', en: 'Setúbal' },
      lat: 38.5244, lng: -8.8882, beds: 2, baths: 1, area: 80,
      title: { he: 'דירה בסטובאל ליד הנמל', en: 'Apartment near the harbour in Setúbal' },
      description: { he: 'דירה משופצת במרחק הליכה מהנמל ומהמעבורת לטרויה. 40 דקות מליסבון.', en: 'Renovated apartment within walking distance of the harbour and the Tróia ferry. 40 minutes from Lisbon.' }
    },
    {
      id: 'CL-108', price: 195000, type: 'farm', region: R.alentejo, city: { he: 'אבורה', en: 'Évora' },
      lat: 38.6, lng: -7.95, beds: 2, baths: 1, area: 110, plot: 10000,
      title: { he: 'קינטה עם מטע זיתים באלנטז׳ו', en: 'Quinta with olive grove in Alentejo' },
      description: { he: 'בית חווה על 10 דונם עם מטע זיתים, 15 דקות מאבורה. שקט, שמש ומרחבים.', en: 'Farmhouse on 1 hectare with an olive grove, 15 minutes from Évora. Peace, sunshine and space.' }
    },
    {
      id: 'CL-109', price: 165000, type: 'apartment', region: R.north, city: { he: 'בראגה', en: 'Braga' },
      lat: 41.5454, lng: -8.4265, beds: 3, baths: 2, area: 105,
      title: { he: 'דירת 3 חדרי שינה בבראגה', en: 'Three-bedroom apartment in Braga' },
      description: { he: 'דירה מרווחת לזוג או משפחה, קרוב לאוניברסיטה ולמרכז ההיסטורי.', en: 'Spacious apartment for a couple or family, close to the university and the historic centre.' }
    },
    {
      id: 'CL-110', price: 235000, type: 'apartment', region: R.algarve, city: { he: 'פורטימאו', en: 'Portimão' },
      lat: 37.1197, lng: -8.5368, beds: 2, baths: 2, area: 90,
      title: { he: 'דירה עם נוף לים בפורטימאו', en: 'Sea-view apartment in Portimão' },
      description: { he: 'דירה עם מרפסת הפונה לים, בריכה משותפת ו-5 דקות הליכה לחוף פראיה דה רושה.', en: "Apartment with a sea-facing balcony, shared pool, 5 minutes' walk to Praia da Rocha." }
    },
    {
      id: 'CL-111', price: 219000, type: 'townhouse', region: R.centro, city: { he: 'אביירו', en: 'Aveiro' },
      lat: 40.6405, lng: -8.6538, beds: 3, baths: 2, area: 140, plot: 180,
      title: { he: 'בית עירוני באביירו', en: 'Townhouse in Aveiro' },
      description: { he: 'בית משפחתי עם גינה קטנה, קרוב לתעלות ולחופי קושטה נובה.', en: 'Family home with a small garden, close to the canals and the beaches of Costa Nova.' }
    },
    {
      id: 'CL-112', price: 248000, type: 'villa', region: R.silver, city: { he: 'נאזרה', en: 'Nazaré' },
      lat: 39.585, lng: -9.04, beds: 3, baths: 2, area: 150, plot: 900,
      title: { he: 'וילה ליד נאזרה', en: 'Villa near Nazaré' },
      description: { he: 'וילה חד-קומתית עם גינה ומקום לבריכה, 10 דקות מחופי נאזרה.', en: "Single-storey villa with a garden and room for a pool, 10 minutes from Nazaré's beaches." }
    },
    {
      id: 'CL-113', price: 279000, type: 'apartment', region: R.north, city: { he: 'פורטו', en: 'Porto' },
      lat: 41.1478, lng: -8.5966, beds: 2, baths: 2, area: 82,
      title: { he: 'דירה בפורטו, שכונת בונפים', en: 'Apartment in Bonfim, Porto' },
      description: { he: 'דירה חדשה בשכונה מבוקשת, הליכה למרכז העיר. ביקוש גבוה להשכרה.', en: 'New-build apartment in a sought-after neighbourhood, walking distance to the centre. Strong rental demand.' }
    },
    {
      id: 'CL-114', price: 295000, type: 'apartment', region: R.lisbon, city: { he: 'ליסבון', en: 'Lisbon' },
      lat: 38.7268, lng: -9.1303, beds: 1, baths: 1, area: 60,
      title: { he: 'דירה בליסבון, פניה דה פרנסה', en: 'Apartment in Penha de França, Lisbon' },
      description: { he: 'דירה משופצת בבניין היסטורי עם תקרות גבוהות, קרוב למטרו.', en: 'Renovated apartment in a historic building with high ceilings, close to the metro.' }
    },
    {
      id: 'CL-115', price: 289000, type: 'house', region: R.algarve, city: { he: 'טבירה', en: 'Tavira' },
      lat: 37.1273, lng: -7.6506, beds: 3, baths: 2, area: 160, plot: 400,
      title: { he: 'בית עם גינה בטבירה', en: 'House with garden in Tavira' },
      description: { he: 'בית אלגרבי מסורתי עם מרפסת גג וגינה, 10 דקות נסיעה לחוף.', en: 'Traditional Algarve house with a roof terrace and garden, a 10-minute drive to the beach.' }
    },
    {
      id: 'CL-116', price: 520000, type: 'apartment', region: R.lisbon, city: { he: 'ליסבון', en: 'Lisbon' },
      lat: 38.7395, lng: -9.1455, beds: 3, baths: 2, area: 130,
      title: { he: 'דירת פרימיום באבנידאש נובאש', en: 'Premium apartment in Avenidas Novas' },
      description: { he: 'דירת 3 חדרי שינה עם חניה ומחסן, באחת השכונות המרכזיות של ליסבון.', en: "Three-bedroom apartment with parking and storage in one of Lisbon's most central neighbourhoods." }
    },
    {
      id: 'CL-117', price: 690000, type: 'villa', region: R.algarve, city: { he: 'לאגוש', en: 'Lagos' },
      lat: 37.1028, lng: -8.6730, beds: 4, baths: 3, area: 240, plot: 1200,
      title: { he: 'וילה עם בריכה בלאגוש', en: 'Villa with pool in Lagos' },
      description: { he: 'וילה בת 4 חדרי שינה עם בריכה פרטית ונוף לים, 5 דקות מהעיר העתיקה.', en: 'Four-bedroom villa with a private pool and sea views, 5 minutes from the old town.' }
    },
    {
      id: 'CL-118', price: 850000, type: 'penthouse', region: R.lisbon, city: { he: 'קשקאיש', en: 'Cascais' },
      lat: 38.6979, lng: -9.4215, beds: 3, baths: 3, area: 160,
      title: { he: 'פנטהאוז בקשקאיש', en: 'Penthouse in Cascais' },
      description: { he: 'פנטהאוז עם מרפסת גדולה ונוף לאוקיינוס, הליכה למרינה ולחופים.', en: 'Penthouse with a large terrace and ocean views, walking distance to the marina and beaches.' }
    }
  ].map((p, i) => ({ ...p, images: p.images || pics(i) }));
})();
