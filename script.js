// script.js

// Wähle alle Dropdown-Menüs aus
const mainReactorSelector = document.getElementById('main-reactor-selector');
const auxASelector = document.getElementById('aux-a-selector');
const auxBSelector = document.getElementById('aux-b-selector');

// Ein Objekt, um die aktuell ausgewählten Generatoren zu verfolgen
const selectedGenerators = {
    'main': 'none',
    'aux-a': 'none',
    'aux-b': 'none'
};

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
    
    // Muster für Main Reactor
    'split-reactor-mk1': { green: [], blue: [] },
    'split-reactor-mk2': { green: [], blue: [] },
    'split-reactor-mk3': { 
        green: [
            'tile-1-1', 'tile-1-2', 'tile-1-7', 'tile-1-8', 
            'tile-2-1', 'tile-2-2', 'tile-2-3', 'tile-2-6', 'tile-2-7', 'tile-2-8', 
            'tile-3-2', 'tile-3-3', 'tile-3-6', 'tile-3-7', 
            'tile-4-2', 'tile-4-3', 'tile-4-6', 'tile-4-7'
        ],
        blue: [
            'tile-3-1', 'tile-3-8', 'tile-4-1', 'tile-4-8'
        ]
    },

    // Muster für AUX A
    'bio-fission-mk1': { green: [], blue: [] },
    'bio-fission-mk2': { green: [], blue: [] },
    'bio-fission-mk3': { 
        green: [
            'tile-5-2', 'tile-5-3', 'tile-5-4', 'tile-5-5', 'tile-5-6', 'tile-5-7'
        ],
        blue: [
            'tile-5-1', 'tile-5-8', 'tile-6-1', 'tile-6-8'
        ]
    },

    // Muster für AUX B
    'bio-fission-mk1-b': { green: [], blue: [] },
    'bio-fission-mk2-b': { green: [], blue: [] },
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
    
    // Iteriere durch alle ausgewählten Generatoren und sammle ihre Kacheln
    for (const type in selectedGenerators) {
        const selectedValue = selectedGenerators[type];
        const pattern = generatorPatterns[selectedValue];
        
        if (pattern) {
            pattern.green.forEach(tile => allGreenTiles.add(tile));
            pattern.blue.forEach(tile => allBlueTiles.add(tile));
        }
    }
    
    // Die finale Liste der Kacheln an die Update-Funktion übergeben
    updateGrid(Array.from(allGreenTiles), Array.from(allBlueTiles));
}

// Event-Listener für jedes Dropdown-Menü
mainReactorSelector.addEventListener('change', (event) => {
    selectedGenerators.main = event.target.value;
    renderCombinedGrid();
});

auxASelector.addEventListener('change', (event) => {
    selectedGenerators['aux-a'] = event.target.value;
    renderCombinedGrid();
});

auxBSelector.addEventListener('change', (event) => {
    selectedGenerators['aux-b'] = event.target.value;
    renderCombinedGrid();
});