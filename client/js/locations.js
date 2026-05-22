const locations = {

    town_square: {
        name: 'Főtér',
        image: 'assets/locations/town_square.jpg',
        description: 'A város központja.',
        exits: {
            north: 'blacksmith',
            east: 'temple',
            south: 'castle_gate',
            west: 'market'
        }
    },

    market: {
        name: 'Piac',
        image: 'assets/locations/market.jpg',
        description: 'Nyüzsgő piactér.',
        exits: {
            north: 'tavern',
            east: 'town_square',
            west: 'docks',
            south: 'living_quarter'
        }
    },

    blacksmith: {
        name: 'Kovács',
        image: 'assets/locations/blacksmith.jpg',
        description: 'Fegyverek és páncélok.',
        exits: {
            west: 'tavern',
            south: 'town_square'
        }
    },

    forest_road: {
        name: 'Erdei út',
        image: 'assets/locations/forest_road.jpg',
        description: 'Kivezet a városból.',
        exits: {
            north: 'castle_gate',
            south: 'dungeon_entrance',
            east: 'dark_forest'
        }
    },

    tavern: {
        name: 'Kocsma',
        image: 'assets/locations/tavern.jpg',
        description: 'Kalandorok gyűjtőhelye.',
        exits: {
            east: 'blacksmith',
            south: 'market'
        }
    },

    castle_gate: {
        name: 'Várkapu',
        image: 'assets/locations/castle_gate.jpg',
        description: 'Darnell városának a kapuja.',
        exits: {
            north: 'town_square',
            south: 'forest_road'
        }
    },

    temple: {
        name: 'Templom',
        image: 'assets/locations/temple.jpg',
        description: 'Ősi szentély.',
        exits: {
            west: 'town_square',
            east: 'graveyard'
        }
    },

    dungeon_entrance: {
        name: 'Dungeon bejárat',
        image: 'assets/locations/dungeon_entrance.jpg',
        description: 'Sötét és veszélyes.',
        exits: {
            north: 'forest_road'
        }
    },

    graveyard: {
        name: 'Temető',
        image: 'assets/locations/graveyard.png',
        description: 'A holtak nyughelye.',
        exits: {
            west: 'temple'
        }
    },

    swamp: {
        name: 'Mocsár',
        image: 'assets/locations/swamp.png',
        description: 'Bűzös mocsár',
        exits: {
            west: 'dark_forest',
            east: 'ancient_ruin'
        }
    },

    dark_forest: {
        name: 'Sötét Erdő',
        image: 'assets/locations/dark_forest.png',
        description: 'Egy sötét és baljós erdő. ',
        exits: {
            east: 'swamp',
            south: 'bandit_camp',
            west: 'forest_road'
        }
    },

    ancient_ruin: {
        name: 'Ősi Romok',
        image: 'assets/locations/ancient_ruin.png',
        description: 'Ősi és elhagyatott romok. Valaha templom lehetett?',
        exits: {
            west: 'swamp'
        }
    },

    bandit_camp: {
        name: 'Bandita tábor',
        image: 'assets/locations/bandit_camp.png',
        description: 'Pár rosszarcú lézeng, amikor megpillantod a jobb napokat is látott táborhelyet',
        exits: {
            north: 'dark_forest'
        }
    },

    docks: {
        name: 'Kikötő',
        image: 'assets/locations/docks.png',
        description: 'A sós tengeri levegő, és a rothadó halak szaga csapja meg az orrodat.',
        exits: {
            east: 'market'
        }
    },

    living_quarter: {
        name: 'Lakónegyed',
        image: 'assets/locations/living_quarter.png',
        description: 'Tiszta utcák, és rendes házak sorakoznak egymás mellett. ',
        exits: {
            north: 'market'
        }
    }
}