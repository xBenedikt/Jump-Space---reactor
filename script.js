// script.js

// Wähle alle Dropdown-Menüs für die Generatorbereiche aus
const mainReactorDropdowns = [
    document.getElementById('split-reactor-selector'),
    document.getElementById('solid-state-reactor-selector'),
    document.getElementById('null-wave-reactor-selector'),
    document.getElementById('materia-scatter-reactor-selector')
];
const auxADropdowns = [
    document.getElementById('aux-a-selector'),
    document.getElementById('null-tension-a-selector'),
    document.getElementById('unknown-a-selector')
];
const auxBDropdowns = [
    document.getElementById('aux-b-selector'),
    document.getElementById('null-tension-b-selector'),
    document.getElementById('unknown-b-selector')
];


// Funktion, die für einen Bereich den aktiven Wert (außer 'none') zurückgibt
function getActiveDropdownValue(dropdowns) {
    for (const dd of dropdowns) {
        if (dd.value && dd.value !== 'none') {
            return dd.value;
        }
    }
    return 'none';
}



// Setzt alle anderen Dropdowns im Bereich auf 'none', ohne Events auszulösen
function setOtherDropdownsNoneNoEvent(dropdowns, activeDropdown) {
    dropdowns.forEach(dd => {
        if (dd !== activeDropdown && dd.value !== 'none') {
            dd.value = 'none';
        }
    });
}

/**
 * Aktualisiert das Power Grid basierend auf den aktivierten Kacheln.
 * @param {string[]} greenTiles Ein Array von IDs für Kacheln, die grün leuchten sollen.
 * @param {string[]} blueTiles Ein Array von IDs für Kacheln, die blau leuchten sollen.
 */
function updateGrid(greenTiles, blueTiles) {
    // Schritt 1: Das gesamte Gitter leeren
    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.remove('green-tile', 'blue-tile');
        tile.classList.add('gray-tile');
        tile.style.boxShadow = 'none';
    });

    // Schritt 2: Die neuen grünen Kacheln färben
    greenTiles.forEach(tileId => {
        const tile = document.getElementById(tileId);
        if (tile) {
            tile.classList.remove('gray-tile');
            tile.classList.add('green-tile');
            tile.style.boxShadow = '0 0 10px #00ff00';
        }
    });

    // Schritt 3: Die neuen blauen Kacheln färben
    blueTiles.forEach(tileId => {
        const tile = document.getElementById(tileId);
        if (tile) {
            tile.classList.remove('gray-tile');
            tile.classList.add('blue-tile');
            tile.style.boxShadow = '0 0 10px #0000ff';
        }
    });
}

// Zentrale Speicherung aller Generatormuster
const generatorPatterns = {
    'none': { green: [], blue: [] }, // Basis-Muster für "nicht ausgewählt"
    
    //// Muster für Main Reactor

    //Split Reactor
    'split-reactor-mk1': { 
        green: [
            'tile-1-1', 'tile-1-2', 'tile-1-7', 'tile-1-8', 
            'tile-2-1', 'tile-2-2', 'tile-2-3', 'tile-2-6', 'tile-2-7', 'tile-2-8', 
            'tile-3-1', 'tile-3-2', 'tile-3-3', 'tile-3-6', 'tile-3-7', 'tile-3-8',
            'tile-4-1', 'tile-4-2', 'tile-4-3', 'tile-4-6', 'tile-4-7', 'tile-4-8'
        ],
        blue: []
    },
    'split-reactor-mk2': { 
        green: [
            'tile-1-1', 'tile-1-2', 'tile-1-7', 'tile-1-8', 
            'tile-2-1', 'tile-2-2', 'tile-2-3', 'tile-2-6', 'tile-2-7', 'tile-2-8', 
            'tile-3-2', 'tile-3-3', 'tile-3-6', 'tile-3-7', 
            'tile-4-2', 'tile-4-3', 'tile-4-6', 'tile-4-7'
        ],
        blue: [
            'tile-3-1', 'tile-3-8', 
            'tile-4-1', 'tile-4-8'
        ]
    },
    'split-reactor-mk3': { 
        green: [
            'tile-1-1', 'tile-1-2', 'tile-1-7', 'tile-1-8', 
            'tile-2-1', 'tile-2-2', 'tile-2-3', 'tile-2-6', 'tile-2-7', 'tile-2-8', 
            'tile-3-3', 'tile-3-6',  
            'tile-4-3', 'tile-4-6', 
        ],
        blue: [
            'tile-3-1', 'tile-3-2', 'tile-3-8', 'tile-3-7', 
            'tile-4-1', 'tile-4-2', 'tile-4-7', 'tile-4-8'
        ]
    },

    //Solid State Reactor
    'solid-state-reactor-mk1': { 
        green: [
            'tile-1-3', 'tile-1-4', 'tile-1-5', 'tile-1-6',
            'tile-2-3', 'tile-2-4', 'tile-2-5', 'tile-2-6',
        ], 
        blue: [
            'tile-3-3', 'tile-3-4', 'tile-3-5', 'tile-3-6',
            'tile-4-3', 'tile-4-4', 'tile-4-5', 'tile-4-6'
        ] 
    },
    'solid-state-reactor-mk2': {  green: [
            'tile-1-3', 'tile-1-4', 'tile-1-5', 'tile-1-6',
        ], 
        blue: [
            'tile-2-3', 'tile-2-4', 'tile-2-5', 'tile-2-6',
            'tile-3-3', 'tile-3-4', 'tile-3-5', 'tile-3-6',
            'tile-4-3', 'tile-4-4', 'tile-4-5', 'tile-4-6'
        ] 
    },
    'solid-state-reactor-mk3': {
        green: [],
        blue: [
            'tile-1-3', 'tile-1-4', 'tile-1-5', 'tile-1-6',
            'tile-2-3', 'tile-2-4', 'tile-2-5', 'tile-2-6',
            'tile-3-3', 'tile-3-4', 'tile-3-5', 'tile-3-6',
            'tile-4-3', 'tile-4-4', 'tile-4-5', 'tile-4-6'
        ]
    },

    // Null Wave Reactor
    'null-wave-reactor-mk1': {
         green: [
            'tile-1-1', 'tile-1-2', 'tile-1-7', 'tile-1-8',
            'tile-2-1', 'tile-2-2', 'tile-2-3', 'tile-2-6', 'tile-2-7','tile-2-8',
            'tile-3-4', 'tile-3-5',
            'tile-4-4', 'tile-4-5',
        ],
        blue: [
            'tile-3-2', 'tile-3-3', 'tile-3-6', 'tile-3-7',
            'tile-4-3', 'tile-4-6'
        ]
    },
    'null-wave-reactor-mk2': {
        green: [
            'tile-1-2', 'tile-1-7',
            'tile-2-2', 'tile-2-3', 'tile-2-6', 'tile-2-7',
            'tile-3-4', 'tile-3-5',
            'tile-4-4', 'tile-4-5',
        ],
        blue: [
            'tile-1-1', 'tile-1-8',
            'tile-2-1', 'tile-2-8',
            'tile-3-2', 'tile-3-3', 'tile-3-6', 'tile-3-7',
            'tile-4-3', 'tile-4-6'
        ]
    },
    'null-wave-reactor-mk3': { green: [
            'tile-2-3', 'tile-2-6',
            'tile-3-4', 'tile-3-5',
            'tile-4-4', 'tile-4-5',
        ],
        blue: [
            'tile-1-1', 'tile-1-2', 'tile-1-7', 'tile-1-8',
            'tile-2-1', 'tile-2-2', 'tile-2-7', 'tile-2-8',
            'tile-3-2', 'tile-3-3', 'tile-3-6', 'tile-3-7',
            'tile-4-3', 'tile-4-6'
        ]
     },

    // Materia Scatter Reactor
    'materia-scatter-reactor-mk1': {
        green: [
            'tile-1-1', 'tile-1-2', 'tile-1-3', 'tile-1-4', 'tile-1-5', 'tile-1-6', 'tile-1-7', 'tile-1-8',
            'tile-2-2', 'tile-2-4', 'tile-2-5', 'tile-2-7', 
            'tile-3-1', 'tile-3-2', 'tile-3-3', 'tile-3-4', 'tile-3-5', 'tile-3-6', 'tile-3-7', 'tile-3-8',
        ], 
        blue: [
             'tile-4-1', 'tile-4-3', 'tile-4-6','tile-4-8'
        ]
    },
    'materia-scatter-reactor-mk2': {
        green: [
            'tile-1-1', 'tile-1-2', 'tile-1-3', 'tile-1-4', 'tile-1-5', 'tile-1-6', 'tile-1-7', 'tile-1-8',
            'tile-2-2', 'tile-2-4', 'tile-2-5', 'tile-2-7', 
            'tile-3-1', 'tile-3-4', 'tile-3-5', 'tile-3-8',
        ], 
        blue: [
            
             'tile-3-2', 'tile-3-3', 'tile-3-6', 'tile-3-7',
             'tile-4-1', 'tile-4-3', 'tile-4-6','tile-4-8'
        ]
    },
    'materia-scatter-reactor-mk3': { green: [
            'tile-1-1', 'tile-1-2', 'tile-1-3', 'tile-1-4', 'tile-1-5', 'tile-1-6', 'tile-1-7', 'tile-1-8',
            'tile-2-4', 'tile-2-5'
        ], 
        blue: [
            'tile-2-2', 'tile-2-7',
            'tile-3-1', 'tile-3-2', 'tile-3-3', 'tile-3-4', 'tile-3-5', 'tile-3-6', 'tile-3-7', 'tile-3-8',
            'tile-4-1', 'tile-4-3', 'tile-4-6','tile-4-8'
        ] 
},

    //// Muster für AUX A
    'bio-fission-mk1': {  
        green: [
            'tile-5-3', 'tile-5-4', 'tile-5-5', 'tile-5-6',
            'tile-6-3', 'tile-6-6'
        ],
        blue: []
    },
    'bio-fission-mk2': {
        green: [
            'tile-5-2', 'tile-5-3', 'tile-5-4', 'tile-5-5', 'tile-5-6', 'tile-5-7',
        ],
        blue: [
            'tile-6-2', 'tile-6-7'
        ]
    },
    'bio-fission-mk3': { 
        green: [
            'tile-5-2', 'tile-5-3', 'tile-5-4', 'tile-5-5', 'tile-5-6', 'tile-5-7'
        ],
        blue: [
            'tile-5-1', 'tile-5-8', 'tile-6-1', 'tile-6-8'
        ]
    },

    // Muster für AUX B
    'bio-fission-mk1-b': {  
        green: [
            'tile-7-3', 'tile-7-4', 'tile-7-5', 'tile-7-6',
            'tile-8-3', 'tile-8-6'
        ],
        blue: []
    },
    'bio-fission-mk2-b': {
        green: [
            'tile-7-2', 'tile-7-3', 'tile-7-4', 'tile-7-5', 'tile-7-6', 'tile-7-7',
        ],
        blue: [
            'tile-8-2', 'tile-8-7'
        ]
    },
    'bio-fission-mk3-b': {
        green: [
            'tile-7-2', 'tile-7-3', 'tile-7-4', 'tile-7-5', 'tile-7-6', 'tile-7-7'
        ],
        blue: [
            'tile-7-1', 'tile-7-8', 'tile-8-1', 'tile-8-8'
        ]
    }
};

/**
 * Kombiniert die Muster aller ausgewählten Generatoren und zeichnet das Gitter neu.
 */
function renderCombinedGrid() {
    const allGreenTiles = new Set();
    const allBlueTiles = new Set();

    // Ermittle den aktiven Wert für jeden Bereich
    const mainValue = getActiveDropdownValue(mainReactorDropdowns);
    const auxAValue = getActiveDropdownValue(auxADropdowns);
    const auxBValue = getActiveDropdownValue(auxBDropdowns);

    [mainValue, auxAValue, auxBValue].forEach(selectedValue => {
        const pattern = generatorPatterns[selectedValue];
        if (pattern) {
            pattern.green.forEach(tile => allGreenTiles.add(tile));
            pattern.blue.forEach(tile => allBlueTiles.add(tile));
        }
    });

    updateGrid(Array.from(allGreenTiles), Array.from(allBlueTiles));
}

// Event-Listener für alle Dropdowns im jeweiligen Bereich


mainReactorDropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', (event) => {
        setOtherDropdownsNoneNoEvent(mainReactorDropdowns, dropdown);
        renderCombinedGrid();
    });
});
auxADropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', (event) => {
        setOtherDropdownsNoneNoEvent(auxADropdowns, dropdown);
        renderCombinedGrid();
    });
});
auxBDropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', (event) => {
        setOtherDropdownsNoneNoEvent(auxBDropdowns, dropdown);
        renderCombinedGrid();
    });
});