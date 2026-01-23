import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Received form data:', body);
    
    // Map country names to ISO codes for Pardot State/Country Picklist
    const countryToISOMap: { [key: string]: string } = {
      'Afghanistan': 'AF', 'Afrique du Sud': 'ZA', 'Albanie': 'AL', 'Algérie': 'DZ', 'Allemagne': 'DE', 'Andorre': 'AD', 'Angola': 'AO', 'Antigua-et-Barbuda': 'AG', 'Arabie Saoudite': 'SA', 'Argentine': 'AR', 'Arménie': 'AM', 'Australie': 'AU', 'Autriche': 'AT', 'Azerbaïdjan': 'AZ',
      'Bahamas': 'BS', 'Bahreïn': 'BH', 'Bangladesh': 'BD', 'Barbade': 'BB', 'Belgique': 'BE', 'Belize': 'BZ', 'Bénin': 'BJ', 'Bhoutan': 'BT', 'Biélorussie': 'BY', 'Birmanie': 'MM', 'Bolivie': 'BO', 'Bosnie-Herzégovine': 'BA', 'Botswana': 'BW', 'Brésil': 'BR', 'Brunei': 'BN', 'Bulgarie': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI',
      'Cambodge': 'KH', 'Cameroun': 'CM', 'Canada': 'CA', 'Cap-Vert': 'CV', 'Chili': 'CL', 'Chine': 'CN', 'Chypre': 'CY', 'Colombie': 'CO', 'Comores': 'KM', 'Congo': 'CG', 'Corée du Nord': 'KP', 'Corée du Sud': 'KR', 'Costa Rica': 'CR', "Côte d'Ivoire": 'CI', 'Croatie': 'HR', 'Cuba': 'CU',
      'Danemark': 'DK', 'Djibouti': 'DJ', 'Dominique': 'DM',
      'Égypte': 'EG', 'Émirats Arabes Unis': 'AE', 'Équateur': 'EC', 'Érythrée': 'ER', 'Espagne': 'ES', 'Estonie': 'EE', 'Eswatini': 'SZ', 'États-Unis': 'US', 'Éthiopie': 'ET',
      'Fidji': 'FJ', 'Finlande': 'FI', 'France': 'FR',
      'Gabon': 'GA', 'Gambie': 'GM', 'Géorgie': 'GE', 'Ghana': 'GH', 'Grèce': 'GR', 'Grenade': 'GD', 'Guatemala': 'GT', 'Guinée': 'GN', 'Guinée-Bissau': 'GW', 'Guinée Équatoriale': 'GQ', 'Guyana': 'GY',
      'Haïti': 'HT', 'Honduras': 'HN', 'Hongrie': 'HU',
      'Îles Marshall': 'MH', 'Îles Salomon': 'SB', 'Inde': 'IN', 'Indonésie': 'ID', 'Irak': 'IQ', 'Iran': 'IR', 'Irlande': 'IE', 'Islande': 'IS', 'Israël': 'IL', 'Italie': 'IT',
      'Jamaïque': 'JM', 'Japon': 'JP', 'Jordanie': 'JO',
      'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Kirghizistan': 'KG', 'Kiribati': 'KI', 'Koweït': 'KW',
      'Laos': 'LA', 'Lesotho': 'LS', 'Lettonie': 'LV', 'Liban': 'LB', 'Liberia': 'LR', 'Libye': 'LY', 'Liechtenstein': 'LI', 'Lituanie': 'LT', 'Luxembourg': 'LU',
      'Macédoine du Nord': 'MK', 'Madagascar': 'MG', 'Malaisie': 'MY', 'Malawi': 'MW', 'Maldives': 'MV', 'Mali': 'ML', 'Malte': 'MT', 'Maroc': 'MA', 'Maurice': 'MU', 'Mauritanie': 'MR', 'Mexique': 'MX', 'Micronésie': 'FM', 'Moldavie': 'MD', 'Monaco': 'MC', 'Mongolie': 'MN', 'Monténégro': 'ME', 'Mozambique': 'MZ',
      'Namibie': 'NA', 'Nauru': 'NR', 'Népal': 'NP', 'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'Norvège': 'NO', 'Nouvelle-Zélande': 'NZ',
      'Oman': 'OM', 'Ouganda': 'UG', 'Ouzbékistan': 'UZ',
      'Pakistan': 'PK', 'Palaos': 'PW', 'Palestine': 'PS', 'Panama': 'PA', 'Papouasie-Nouvelle-Guinée': 'PG', 'Paraguay': 'PY', 'Pays-Bas': 'NL', 'Pérou': 'PE', 'Philippines': 'PH', 'Pologne': 'PL', 'Portugal': 'PT',
      'Qatar': 'QA',
      'République Centrafricaine': 'CF', 'République Démocratique du Congo': 'CD', 'République Dominicaine': 'DO', 'République Tchèque': 'CZ', 'Roumanie': 'RO', 'Royaume-Uni': 'GB', 'Russie': 'RU', 'Rwanda': 'RW',
      'Saint-Christophe-et-Niévès': 'KN', 'Sainte-Lucie': 'LC', 'Saint-Marin': 'SM', 'Saint-Vincent-et-les-Grenadines': 'VC', 'Salvador': 'SV', 'Samoa': 'WS', 'São Tomé-et-Principe': 'ST', 'Sénégal': 'SN', 'Serbie': 'RS', 'Seychelles': 'SC', 'Sierra Leone': 'SL', 'Singapour': 'SG', 'Slovaquie': 'SK', 'Slovénie': 'SI', 'Somalie': 'SO', 'Soudan': 'SD', 'Soudan du Sud': 'SS', 'Sri Lanka': 'LK', 'Suède': 'SE', 'Suisse': 'CH', 'Suriname': 'SR', 'Syrie': 'SY',
      'Tadjikistan': 'TJ', 'Tanzanie': 'TZ', 'Tchad': 'TD', 'Thaïlande': 'TH', 'Timor Oriental': 'TL', 'Togo': 'TG', 'Tonga': 'TO', 'Trinité-et-Tobago': 'TT', 'Tunisie': 'TN', 'Turkménistan': 'TM', 'Turquie': 'TR', 'Tuvalu': 'TV',
      'Ukraine': 'UA', 'Uruguay': 'UY',
      'Vanuatu': 'VU', 'Vatican': 'VA', 'Venezuela': 'VE', 'Viêt Nam': 'VN',
      'Yémen': 'YE',
      'Zambie': 'ZM', 'Zimbabwe': 'ZW'
    };
    
    // Don't convert to ISO code - send full country name as entered by user
    // const countryCode = countryToISOMap[body.country] || body.country;
    
    // Convert to URLSearchParams for application/x-www-form-urlencoded
    // Using snake_case field names to match Pardot best practices
    const params = new URLSearchParams();
    params.append('email', body.email || '');
    params.append('first_name', body.firstName || '');
    params.append('last_name', body.lastName || '');
    params.append('job_title', body.jobTitle || '');
    params.append('company', body.company || '');
    params.append('country', body.country); // Send full country name, not ISO code
    // Clean phone number: remove spaces, +, and any non-digit characters except leading digits
    const cleanPhone = (body.phone || '').replace(/[\s+()-]/g, '');
    params.append('phone', cleanPhone);
    
    // Add UTM parameters for attribution tracking (matching Pardot field names exactly)
    if (body.gclid) params.append('GCLID', body.gclid);
    if (body.utm_source) params.append('utm_source', body.utm_source);
    if (body.utm_medium) params.append('utm_medium', body.utm_medium);
    if (body.utm_campaign) params.append('utm_campaign', body.utm_campaign);
    if (body.utm_content) params.append('utm_content', body.utm_content);
    if (body.utm_term) params.append('utm_term', body.utm_term);
    if (body.utm_matchtype) params.append('utm_matchtype', body.utm_matchtype);
    if (body.utm_network) params.append('utm_network', body.utm_network);
    if (body.utm_device) params.append('utm_device', body.utm_device);
    if (body.utm_creative) params.append('utm_creative', body.utm_creative);
    if (body.li_fat_id) params.append('li_fat_id', body.li_fat_id);
    if (body.content_group) params.append('content_group', body.content_group);
    if (body.landing_language) params.append('landing_language', body.landing_language);
    
    // Add appointment and booking details
    if (body.appointmentDate) params.append('Appointment_Date', body.appointmentDate);
    if (body.appointmentTime) params.append('Appointment_Time', body.appointmentTime);
    if (body.region) params.append('Sales_Region', body.region);
    if (body.ownerEmail) params.append('Sales_Owner', body.ownerEmail);
    if (body.bookingId) params.append('Booking_ID', body.bookingId);
    
    // Add success and error locations for Pardot
    params.append('success_location', 'https://vocalcom.vercel.app/thank-you');
    params.append('error_location', 'https://www.vocalcom.com');

    console.log('Sending to Pardot:', params.toString());
    console.log('Individual fields:');
    params.forEach((value, key) => {
      console.log(`  ${key}: "${value}"`);
    });

    // Forward to Pardot Form Handler - use HTTPS
    console.log('📤 Posting to Pardot Form Handler...');
    const response = await fetch('https://go.vocalcom.com/l/1029911/2026-01-04/363cd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log('✅ Pardot response status:', response.status);
    const responseText = await response.text();
    console.log('Pardot response body length:', responseText.length);
    console.log('Pardot response preview:', responseText.substring(0, 500));

    // Check if response contains error messages
    const hasError = responseText.includes('This field is required') || 
                     responseText.includes('error') || 
                     responseText.includes('Error');

    if (hasError) {
      console.error('Pardot returned an error:', responseText.substring(0, 1000));
      return NextResponse.json({ 
        ok: false, 
        error: 'Pardot validation failed',
        details: responseText.substring(0, 500)
      }, { status: 400 });
    }

    return NextResponse.json({ 
      ok: true, 
      status: response.status,
      message: 'Successfully submitted to Pardot'
    });
    
  } catch (error) {
    console.error('Pardot submission error:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Submission failed' 
    }, { status: 500 });
  }
}
