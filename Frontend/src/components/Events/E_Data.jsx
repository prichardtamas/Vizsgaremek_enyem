// components/Events/E_Data.jsx
export const eventsData = [
    {
        id: 1,
        title: "Őszi Diákkoncert",
        start: "2024-11-15T18:00:00",
        end: "2024-11-15T21:00:00",
        type: "concert",
        location: "main-hall",
        description: "Diákjaink bemutatkoznak egy változatos zenei estén. Rocktól a klasszikusig minden stílus jelen lesz. Nyitva áll a nagyközönség előtt is!",
        instructor: "Kovács János",
        price: "Ingyenes",
        capacity: 80,
        registered: 45,
        rating: 4.8,
        color: "#1DD3C6"
    },
    {
        id: 2,
        title: "Blues Gitár Mesterkurzus",
        start: "2024-11-22T14:00:00",
        end: "2024-11-22T17:00:00",
        type: "workshop",
        location: "studio-a",
        description: "Kovács János, blues gitáros vezetésével. A workshop során megismerjük a blues gitár alapjait, skálákat, bend-eket és improvizációt.",
        instructor: "Kovács János",
        price: "12.000 Ft",
        capacity: 35,
        registered: 28,
        rating: 4.9,
        color: "#FFD166"
    },
    {
        id: 3,
        title: "Téli Nyílt Nap",
        start: "2024-12-05T10:00:00",
        end: "2024-12-05T18:00:00",
        type: "open-day",
        location: "main-hall",
        description: "Ingyenes próbaórák minden hangszeren, ismerkedés oktatóinkkal és 15% kedvezmény a jelentkezőknek. Ideális alkalom a zeneiskolánk megismerésére.",
        instructor: "Összes oktató",
        price: "Ingyenes",
        capacity: 120,
        registered: 62,
        rating: 4.7,
        color: "#2A3B5C"
    },
    {
        id: 4,
        title: "Zenei Produkciós Workshop",
        start: "2024-11-15T14:00:00",
        end: "2024-11-15T17:00:00",
        type: "workshop",
        location: "studio-b",
        description: "Tanuld meg a digitális zeneszerkesztés alapjait professzionális producerektől. FL Studio és Ableton Live bemutató.",
        instructor: "Tóth Béla",
        price: "15.000 Ft",
        capacity: 20,
        registered: 18,
        rating: 4.8,
        color: "#FFD166"
    },
    {
        id: 5,
        title: "Karácsonyi Koncert",
        start: "2024-12-20T19:00:00",
        end: "2024-12-20T22:00:00",
        type: "concert",
        location: "main-hall",
        description: "Hagyományos karácsonyi dalok modern feldolgozásban. Diákjaink és oktatóink közös előadása.",
        instructor: "Nagy Anna",
        price: "3.000 Ft",
        capacity: 100,
        registered: 42,
        rating: 4.6,
        color: "#1DD3C6"
    },
    {
        id: 6,
        title: "Dobtechnikai Workshop",
        start: "2024-11-29T16:00:00",
        end: "2024-11-29T19:00:00",
        type: "workshop",
        location: "studio-a",
        description: "Modern dobtechnikák, rudimentek és ritmusminták tanulása. Kezdőknek és haladóknak egyaránt.",
        instructor: "Tóth Béla",
        price: "10.000 Ft",
        capacity: 25,
        registered: 22,
        rating: 4.9,
        color: "#FFD166"
    },
    {
        id: 7,
        title: "Énektanfolyam bemutató",
        start: "2024-11-10T17:00:00",
        end: "2024-11-10T19:00:00",
        type: "course",
        location: "studio-b",
        description: "Bemutató óra az énektanfolyamunkról. Technikai alapok és gyakorlati tanácsok kezdőknek.",
        instructor: "Nagy Anna",
        price: "Ingyenes",
        capacity: 30,
        registered: 25,
        rating: 4.7,
        color: "#1DD3C6"
    },
    {
        id: 8,
        title: "Tavaszi Koncert",
        start: "2024-05-20T18:00:00",
        end: "2024-05-20T21:00:00",
        type: "concert",
        location: "main-hall",
        description: "Tavaszi hangulatú koncert diákjaink részvételével. Sikeres esemény volt 85 résztvevővel.",
        instructor: "Kovács János",
        price: "Elmúlt",
        capacity: 100,
        registered: 85,
        rating: 4.9,
        color: "#1DD3C6"
    },
    {
        id: 9,
        title: "Nyári Zenei Tábor",
        start: "2024-08-10T09:00:00",
        end: "2024-08-15T17:00:00",
        type: "workshop",
        location: "outdoor",
        description: "5 napos zenei tábor a természetben. Együttes gyakorlás, stúdiófelvételek és szabadidős programok.",
        instructor: "Összes oktató",
        price: "Elmúlt",
        capacity: 40,
        registered: 38,
        rating: 4.8,
        color: "#2A3B5C"
    }
];

// Segédfüggvények
export const getLocationText = (location) => {
    const locations = {
        'main-hall': 'Fő terem',
        'studio-a': 'Stúdió A',
        'studio-b': 'Stúdió B',
        'outdoor': 'Kültéri'
    };
    return locations[location] || 'Ismeretlen helyszín';
};

export const getTypeText = (type) => {
    const types = {
        'concert': 'Koncert',
        'workshop': 'Workshop',
        'course': 'Kurzus',
        'open-day': 'Nyílt nap'
    };
    return types[type] || type;
};

export const getTypeColor = (type) => {
    const colors = {
        'concert': '#1DD3C6',
        'workshop': '#FFD166',
        'course': '#2A3B5C',
        'open-day': '#17a2b8'
    };
    return colors[type] || '#6C757D';
};

export const getTypeBgColor = (type) => {
    const colors = {
        'concert': 'rgba(29, 211, 198, 0.2)',
        'workshop': 'rgba(255, 209, 102, 0.2)',
        'course': 'rgba(42, 59, 92, 0.2)',
        'open-day': 'rgba(23, 162, 184, 0.2)'
    };
    return colors[type] || 'rgba(108, 117, 125, 0.2)';
};