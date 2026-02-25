// instrumentsData.js
export const categories = [
    {
        id: 1,
        name: "Húros hangszerek",
        icon: "fas fa-guitar",
        image: "/img/gitar.png",
        description: "A húros hangszereknél a hang rezgő húrokból keletkezik. A húrokat pengetéssel, vonóval vagy ütéssel hozzák rezgésbe.",
        types: ["Gitárok (akusztikus, elektromos)", "Hegedű, brácsa, gordonka", "Hárfa, citera", "Mandolin, banjo"],
        soundSource: "Húrok rezgése",
        popularFor: "Klasszikus, rock, jazz, népzene"
    },
    {
        id: 2,
        name: "Fúvós hangszerek",
        icon: "fas fa-wind",
        image: "/img/furulya.png",
        description: "A fúvós hangszereknél a hang levegőoszlop rezgéséből keletkezik. A hangmagasság a levegőoszlop hosszától függ.",
        types: ["Fafúvósok (fuvola, klarinét)", "Rézfúvósok (trombita, harsona)", "Szaxofon", "Oboa, fagott"],
        soundSource: "Levegőoszlop rezgése",
        popularFor: "Fúvószenekar, jazz, klasszikus"
    },
    {
        id: 3,
        name: "Ütőhangszerek",
        icon: "fas fa-drum",
        image: "/img/dob.png",
        description: "Az ütőhangszereknél a hangot ütéssel, veréssel állítják elő. Lehetnek meghatározott vagy meghatározatlan hangmagasságúak.",
        types: ["Dobok (ütődob, nagydob)", "Cintányérok", "Xilofon, vibrafon", "Timbales, kongák"],
        soundSource: "Ütés/rezgés",
        popularFor: "Ritmuskíséret, ütem hangsúlyozása"
    },
    {
        id: 4,
        name: "Billentyűs hangszerek",
        icon: "fas fa-keyboard",
        image: "/img/zongora.png",
        description: "A billentyűs hangszereknél a hangot billentyűk lenyomásával állítják elő. Lehetnek húros, fúvós vagy elektronikus működésűek.",
        types: ["Zongora, orgona", "Szintetizátor", "Akkordeon", "Digitális zongora"],
        soundSource: "Billentyű mechanika",
        popularFor: "Szólista, kíséret, összes zenei stílus"
    },
    {
        id: 5,
        name: "Vonós hangszerek",
        icon: "fas fa-violin",
        image: "/img/hegedű.jpg",
        description: "A vonós hangszerek a húros hangszerek alcsoportja, ahol a húrokat vonóval dörzsölve hozzák rezgésbe. Folyamatos hangot lehet előállítani velük.",
        types: ["Hegedű", "Brácsa", "Gordonka", "Nagybőgő"],
        soundSource: "Vonó + húrok rezgése",
        popularFor: "Klasszikus zene, vonósnégyesek, szimfonikus zenekar"
    },
    {
        id: 6,
        name: "Elektronikus hangszerek",
        icon: "fas fa-bolt",
        image: "/img/szintetizátor.jpg",
        description: "Az elektronikus hangszereknél a hang elektronikusan jön létre. Gyakran szintetizált hangokat használnak vagy akusztikus hangokat erősítenek.",
        types: ["Szintetizátor", "Elektromos gitár", "MIDI kontrollerek", "Drum machine"],
        soundSource: "Elektronikus áramkörök",
        popularFor: "Pop, elektronikus zene, filmzene"
    }
];