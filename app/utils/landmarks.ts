// Base interface for common cultural elements
export interface BaseCulturalElements {
  culturalBehavior: string[];
  localCustoms: string[];
  foodHabits: string[];
  festivals: string[];
  languages: string[];
  businessEtiquette: string[];
}

// Interface for landmark information
export interface LandmarkInfo extends BaseCulturalElements {
  famousPlaces: string[];
  culturalSignificance: string;
  historicalFacts: string[];
  population: string;
  architecture: string[];
  museums: string[];
  naturalAttractions: string[];
  modernLandmarks: string[];
  religiousPlaces: string[];
  seasonalEvents: string[];
}

// Common cultural patterns that can be mixed into specific locations
const commonCulturalPatterns: Partial<BaseCulturalElements> = {
  culturalBehavior: [
    'Respect for traditions',
    'Community values',
    'Social etiquette',
    'Cultural preservation',
    'Environmental consciousness',
    'Generational respect'
  ],
  businessEtiquette: [
    'Professional dress code',
    'Meeting punctuality',
    'Business card exchange',
    'Hierarchy awareness'
  ],
  languages: [
    'Official language(s)',
    'Common business languages',
    'Local dialects'
  ]
};

// Mapping of timezones to their landmark information
export const getLandmarkInfo = (timezone: string): LandmarkInfo | null => {
  const landmarkMapping: Record<string, LandmarkInfo> = {
    'Europe/London': {
      famousPlaces: ['Big Ben', 'Tower Bridge', 'Buckingham Palace', 'Westminster Abbey', 'St. Paul\'s Cathedral', 'London Eye', 'Hyde Park', 'Trafalgar Square'],
      culturalSignificance: 'Historic center of the British Empire and modern global finance, arts, and innovation',
      historicalFacts: [
        'Big Ben was completed in 1859',
        'Tower Bridge opened in 1894',
        'Westminster Abbey has hosted royal coronations since 1066',
        'The Great Fire of London in 1666 reshaped the city',
        'London Underground opened in 1863 as world\'s first underground railway',
        'The Tower of London has served as palace, prison, and fortress since 1066'
      ],
      population: '9 million (Greater London)',
      foodHabits: [
        'Traditional fish and chips',
        'Full English breakfast',
        'Sunday roast tradition',
        'Afternoon tea culture',
        'Multicultural food scene',
        'Street food markets',
        'Curry houses in Brick Lane',
        'Traditional pie and mash'
      ],
      localCustoms: [
        'Queuing etiquette',
        'Pub culture',
        'Bank holidays celebrations',
        'Boxing Day shopping',
        'Football match traditions',
        'Royal celebrations',
        'Guy Fawkes Night',
        'Sunday markets'
      ],
      culturalBehavior: [
        'Reserved and polite demeanor',
        'Indirect communication style',
        'Strong sense of privacy',
        'Punctuality valued',
        'Multicultural tolerance',
        'Weather small talk',
        'Self-deprecating humor'
      ],
      architecture: [
        'Gothic Revival (Houses of Parliament)',
        'Baroque (St Paul\'s Cathedral)',
        'Modern (The Shard)',
        'Victorian terraced houses',
        'Georgian squares'
      ],
      museums: [
        'British Museum',
        'Natural History Museum',
        'Tate Modern',
        'Victoria and Albert Museum',
        'Science Museum'
      ],
      naturalAttractions: [
        'Richmond Park',
        'Hampstead Heath',
        'River Thames',
        'Royal Botanic Gardens, Kew',
        'London Wetland Centre'
      ],
      modernLandmarks: [
        'The Shard',
        'Canary Wharf',
        'The Gherkin',
        'London Eye',
        'O2 Arena'
      ],
      religiousPlaces: [
        'St Paul\'s Cathedral',
        'Westminster Abbey',
        'Westminster Cathedral',
        'East London Mosque',
        'Bevis Marks Synagogue'
      ],
      seasonalEvents: [
        'Notting Hill Carnival (August)',
        'Wimbledon Tennis (June-July)',
        'Chelsea Flower Show (May)',
        'London Marathon (April)',
        'Winter Wonderland (December)'
      ],
      festivals: [
        'Notting Hill Carnival',
        'London Fashion Week',
        'BBC Proms',
        'London Film Festival',
        'London Pride'
      ],
      languages: [
        'English (official)',
        'Over 300 languages spoken',
        'Major communities: Polish, Bengali, Gujarati'
      ],
      businessEtiquette: [
        'Formal business attire',
        'Punctuality is crucial',
        'Email communication preferred',
        'Professional titles until invited to use first names'
      ]
    },
    'America/New_York': {
      famousPlaces: ['Statue of Liberty', 'Empire State Building', 'Times Square', 'Central Park', 'Brooklyn Bridge', 'Metropolitan Museum of Art', 'Broadway Theater District', 'Wall Street'],
      culturalSignificance: 'Global hub for finance, arts, entertainment, and cultural diversity',
      historicalFacts: [
        'Statue of Liberty was dedicated in 1886',
        'Empire State Building completed in 1931',
        'Times Square became the city\'s entertainment hub in the 1900s',
        'Brooklyn Bridge opened in 1883',
        'Wall Street crash of 1929',
        'The city served as first US capital (1789-1790)'
      ],
      population: '8.8 million (NYC), 20.1 million (metropolitan area)',
      foodHabits: [
        'New York-style pizza',
        'Hot dog stands',
        'Bagels and lox',
        'Food truck diversity',
        'Diverse ethnic cuisines',
        'Delis and diners',
        'Fine dining scene',
        'Food markets and halls'
      ],
      localCustoms: [
        'Fast-paced lifestyle',
        'Broadway shows',
        'Yankees baseball culture',
        'Holiday shopping traditions',
        'Rooftop culture',
        'Brunch culture',
        'Street art appreciation',
        'Park activities'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Direct communication style',
        'Work-driven culture',
        'Cultural diversity celebration',
        'Fast walking pace',
        'Time efficiency',
        'Art appreciation'
      ],
      architecture: [
        'Art Deco (Chrysler Building)',
        'Gothic Revival (St. Patrick\'s Cathedral)',
        'Modern (One World Trade Center)',
        'Beaux-Arts (Grand Central Terminal)',
        'Brownstone townhouses'
      ],
      museums: [
        'Metropolitan Museum of Art',
        'MoMA',
        'American Museum of Natural History',
        'Whitney Museum',
        'Guggenheim Museum'
      ],
      naturalAttractions: [
        'Central Park',
        'High Line',
        'Hudson River',
        'Prospect Park',
        'Jamaica Bay Wildlife Refuge'
      ],
      modernLandmarks: [
        'One World Trade Center',
        'Hudson Yards',
        'Oculus Transportation Hub',
        'High Line',
        'New York Edge'
      ],
      religiousPlaces: [
        'St. Patrick\'s Cathedral',
        'Trinity Church',
        'Temple Emanu-El',
        'Abyssinian Baptist Church',
        'Islamic Cultural Center'
      ],
      seasonalEvents: [
        'New Year\'s Eve in Times Square',
        'US Open Tennis (August-September)',
        'NYC Marathon (November)',
        'Shakespeare in the Park (Summer)',
        'Holiday markets (December)'
      ],
      festivals: [
        'New York Fashion Week',
        'Tribeca Film Festival',
        'NYC Pride',
        'NYC Food & Wine Festival',
        'Comic Con'
      ],
      languages: [
        'English (official)',
        'Spanish widely spoken',
        'Chinese, Russian, Korean communities',
        'Over 800 languages spoken'
      ],
      businessEtiquette: [
        'Direct communication valued',
        'Fast-paced meetings',
        'Networking importance',
        'Business casual to formal attire'
      ]
    },
    'Asia/Tokyo': {
      famousPlaces: ['Tokyo Tower', 'Senso-ji Temple', 'Shibuya Crossing', 'Imperial Palace', 'Tokyo Skytree', 'Meiji Shrine', 'Akihabara', 'Tsukiji Outer Market'],
      culturalSignificance: 'Unique fusion of ancient traditions with cutting-edge technology and pop culture',
      historicalFacts: [
        'Senso-ji is Tokyo\'s oldest temple, founded in 628 CE',
        'Tokyo Tower was completed in 1958',
        'Shibuya Crossing became world\'s busiest pedestrian crossing',
        'Edo (old Tokyo) became Japan\'s de facto capital in 1603',
        'Great Kanto Earthquake of 1923 reshaped the city',
        'Hosted Olympics in 1964 and 2020(2021)'
      ],
      population: '37 million (Greater Tokyo), 14 million (Tokyo proper)',
      foodHabits: [
        'Sushi and sashimi culture',
        'Ramen shops',
        'Izakaya dining',
        'Bento box lunches',
        'Seasonal kaiseki cuisine',
        'Street food (Yatai)',
        'Tea ceremony traditions',
        'Conveyor belt sushi'
      ],
      localCustoms: [
        'Bowing etiquette',
        'Removing shoes indoors',
        'Gift-giving culture',
        'Cherry blossom viewing',
        'Summer festivals (Matsuri)',
        'New Year traditions',
        'Karaoke culture',
        'Public bath (Onsen) etiquette'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Group harmony (wa)',
        'Punctuality importance',
        'Respect for elders',
        'Omotenashi (hospitality)',
        'Work ethic',
        'Attention to detail'
      ],
      architecture: [
        'Traditional temples and shrines',
        'Modern skyscrapers',
        'Capsule hotels',
        'Traditional machiya houses',
        'Contemporary design buildings'
      ],
      museums: [
        'Tokyo National Museum',
        'Ghibli Museum',
        'Mori Art Museum',
        'TeamLab Borderless',
        'Edo-Tokyo Museum'
      ],
      naturalAttractions: [
        'Mount Fuji view spots',
        'Shinjuku Gyoen',
        'Ueno Park',
        'Imperial Palace Gardens',
        'Sumida River'
      ],
      modernLandmarks: [
        'Tokyo Skytree',
        'Rainbow Bridge',
        'Roppongi Hills',
        'Tokyo Midtown',
        'DiverCity Tokyo Plaza'
      ],
      religiousPlaces: [
        'Meiji Shrine',
        'Senso-ji Temple',
        'Zojo-ji Temple',
        'Yasukuni Shrine',
        'Gotoku-ji Temple'
      ],
      seasonalEvents: [
        'Cherry Blossom Season (March-April)',
        'Sumida River Fireworks (July)',
        'Tokyo Game Show (September)',
        'Autumn Leaves Viewing (November)',
        'New Year at Meiji Shrine'
      ],
      festivals: [
        'Sanja Matsuri',
        'Kanda Matsuri',
        'Tokyo International Film Festival',
        'Design Week',
        'Anime Japan'
      ],
      languages: [
        'Japanese (official)',
        'English in business and tourism',
        'Regional Tokyo dialect'
      ],
      businessEtiquette: [
        'Formal business attire',
        'Exchange of business cards (meishi)',
        'After-work socializing (nomikai)',
        'Hierarchical relationships'
      ]
    },
    'Europe/Paris': {
      famousPlaces: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Arc de Triomphe'],
      culturalSignificance: 'Global center of art, fashion, gastronomy, and culture',
      historicalFacts: [
        'Eiffel Tower was completed in 1889',
        'The Louvre became a museum in 1793',
        'Notre-Dame construction began in 1163'
      ],
      population: '2.2 million (Paris proper), 12 million (metropolitan)',
      foodHabits: [
        'Café culture',
        'Wine appreciation',
        'Long lunch breaks',
        'Haute cuisine'
      ],
      localCustoms: [
        'Greeting with kisses',
        'Fashion consciousness',
        'Late dinner times',
        'August vacation exodus'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Appreciation for arts',
        'Work-life balance',
        'Social dining'
      ]
    },
    'Australia/Sydney': {
      famousPlaces: ['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'The Rocks'],
      culturalSignificance: 'Iconic Pacific metropolis blending urban life with beach culture',
      historicalFacts: [
        'Sydney Opera House opened in 1973',
        'Harbour Bridge completed in 1932',
        'The Rocks is Sydney\'s oldest neighborhood'
      ],
      population: '5.3 million (Greater Sydney)',
      foodHabits: [
        'Barbecue culture',
        'Fresh seafood',
        'Brunch culture',
        'Coffee appreciation'
      ],
      localCustoms: [
        'Beach lifestyle',
        'Outdoor activities',
        'Sports enthusiasm',
        'Casual dress code'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Laid-back attitude',
        'Egalitarian values',
        'Love for outdoors'
      ]
    },
    'Asia/Dubai': {
      famousPlaces: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Burj Al Arab'],
      culturalSignificance: 'Modern Arabian metropolis and global business hub',
      historicalFacts: [
        'Burj Khalifa completed in 2010',
        'Palm Jumeirah completed in 2006',
        'Dubai\'s transformation from fishing village to global city'
      ],
      population: '3.4 million (Dubai)',
      foodHabits: [
        'Arabic coffee tradition',
        'International cuisine',
        'Ramadan feasts',
        'Friday brunch culture'
      ],
      localCustoms: [
        'Islamic traditions',
        'Shopping festivals',
        'Desert activities',
        'Conservative dress code'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Hospitality importance',
        'Business etiquette',
        'Multicultural respect'
      ]
    },
    'Asia/Singapore': {
      famousPlaces: ['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Orchard Road'],
      culturalSignificance: 'Modern Asian tiger economy with multicultural heritage',
      historicalFacts: [
        'Independence in 1965',
        'Marina Bay Sands opened in 2010',
        'Transformation into garden city'
      ],
      population: '5.7 million',
      foodHabits: [
        'Hawker center culture',
        'Diverse ethnic cuisines',
        'Kopi culture',
        'Chili crab tradition'
      ],
      localCustoms: [
        'Strict cleanliness rules',
        'Multicultural festivals',
        'Shopping culture',
        'Public housing system'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Efficiency focus',
        'Multilingual society',
        'Rule-following'
      ]
    },
    'Europe/Moscow': {
      famousPlaces: ['Red Square', 'Kremlin', 'St. Basil\'s Cathedral', 'Bolshoi Theatre'],
      culturalSignificance: 'Historic center of Russian power and cultural heritage',
      historicalFacts: [
        'Moscow Kremlin construction began in 1147',
        'St. Basil\'s Cathedral completed in 1561',
        'Bolshoi Theatre opened in 1825'
      ],
      population: '12.5 million (Moscow)',
      foodHabits: [
        'Traditional Russian cuisine',
        'Borscht and soups',
        'Tea drinking culture',
        'Caviar appreciation'
      ],
      localCustoms: [
        'Orthodox Christian traditions',
        'Victory Day celebrations',
        'Banya (bathhouse) culture',
        'Winter festivals'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Strong family values',
        'Formal social etiquette',
        'Arts appreciation'
      ]
    },
    'Asia/Hong_Kong': {
      famousPlaces: ['Victoria Peak', 'Tsim Sha Tsui', 'Tian Tan Buddha', 'Lan Kwai Fong'],
      culturalSignificance: 'Global financial hub with unique blend of East and West',
      historicalFacts: [
        'British colony from 1841 to 1997',
        'Return to Chinese sovereignty in 1997',
        'Development of modern skyline since 1970s'
      ],
      population: '7.4 million',
      foodHabits: [
        'Dim sum tradition',
        'Street food culture',
        'Tea houses',
        'Seafood cuisine'
      ],
      localCustoms: [
        'Feng shui practices',
        'Festival celebrations',
        'Shopping culture',
        'Night markets'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Work efficiency',
        'Family-oriented',
        'Business acumen'
      ]
    },
    'Asia/Bangkok': {
      famousPlaces: ['Grand Palace', 'Wat Phra Kaew', 'Wat Arun', 'Chatuchak Market'],
      culturalSignificance: 'Cultural heart of Southeast Asia with rich Buddhist heritage',
      historicalFacts: [
        'Bangkok became capital in 1782',
        'Grand Palace construction in 1782',
        'Modern development since 1960s'
      ],
      population: '8.3 million (Bangkok Metropolitan)',
      foodHabits: [
        'Street food culture',
        'Spicy Thai cuisine',
        'Fresh markets',
        'Rice-based dishes'
      ],
      localCustoms: [
        'Wai greeting',
        'Buddhist traditions',
        'Royal respect',
        'Songkran festival'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Thai hospitality',
        'Respect for elders',
        'Social harmony'
      ]
    },
    'Asia/Shanghai': {
      famousPlaces: ['The Bund', 'Yu Garden', 'Nanjing Road', 'Oriental Pearl Tower'],
      culturalSignificance: 'China\'s economic powerhouse with rich cultural heritage',
      historicalFacts: [
        'International settlement history',
        'Economic reforms since 1990s',
        'World Expo 2010 host'
      ],
      population: '24.9 million',
      foodHabits: [
        'Xiaolongbao dumplings',
        'Haipai cuisine',
        'Tea culture',
        'Street food'
      ],
      localCustoms: [
        'Morning exercises',
        'Family gatherings',
        'Festival celebrations',
        'Modern lifestyle'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Business mindset',
        'Fashion conscious',
        'Technology adoption'
      ]
    },
    'Europe/Berlin': {
      famousPlaces: ['Brandenburg Gate', 'East Side Gallery', 'Museum Island', 'Reichstag Building'],
      culturalSignificance: 'Center of European history and modern innovation',
      historicalFacts: [
        'Berlin Wall fell in 1989',
        'Reichstag building completed in 1894',
        'City reunification in 1990'
      ],
      population: '3.7 million',
      foodHabits: [
        'Beer culture',
        'Currywurst tradition',
        'Street food scene',
        'International cuisine'
      ],
      localCustoms: [
        'Beer garden culture',
        'Sunday rest day',
        'Christmas markets',
        'Alternative art scene'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Direct communication',
        'Punctuality',
        'Environmental consciousness'
      ]
    },
    'America/Los_Angeles': {
      famousPlaces: ['Golden Gate Bridge', 'Hollywood Sign', 'Venice Beach', 'Disneyland'],
      culturalSignificance: 'Entertainment capital and tech innovation hub',
      historicalFacts: [
        'Gold Rush era 1848-1855',
        'Hollywood established 1911',
        'Silicon Valley tech boom 1970s'
      ],
      population: '4 million (LA), 900k (SF)',
      foodHabits: [
        'Health food trends',
        'Food truck culture',
        'Farm-to-table dining',
        'International fusion'
      ],
      localCustoms: [
        'Beach lifestyle',
        'Startup culture',
        'Entertainment industry',
        'Outdoor activities'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Innovation mindset',
        'Casual attitude',
        'Environmental awareness'
      ]
    },
    'America/Chicago': {
      famousPlaces: ['Millennium Park', 'Navy Pier', 'Willis Tower', 'Art Institute'],
      culturalSignificance: 'Heartland of America with rich architectural heritage',
      historicalFacts: [
        'Great Chicago Fire 1871',
        'Worlds Columbian Exposition 1893',
        'Birth of modern architecture'
      ],
      population: '2.7 million',
      foodHabits: [
        'Deep dish pizza',
        'Chicago-style hot dogs',
        'Steakhouse tradition',
        'Food festivals'
      ],
      localCustoms: [
        'Sports culture',
        'Blues music scene',
        'Lake activities',
        'Winter resilience'
      ],
      culturalBehavior: [
        ...commonCulturalPatterns.culturalBehavior || [],
        'Midwestern friendliness',
        'Work ethic',
        'Community pride'
      ]
    }
  };

  // Extract city name from timezone
  const city = timezone.split('/').pop();
  if (!city) return null;

  // Find closest matching city
  const closestMatch = Object.keys(landmarkMapping).find(key => 
    key.toLowerCase().includes(city.toLowerCase())
  );

  return closestMatch ? landmarkMapping[closestMatch] : null;
};