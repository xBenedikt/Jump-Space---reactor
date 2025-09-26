// script.js

// Select all dropdown menus for the generator sections
const mainReactorDropdowns = [
    document.getElementById('split-reactor-selector'),
    document.getElementById('solid-state-reactor-selector'),
    document.getElementById('null-wave-reactor-selector'),
    document.getElementById('materia-scatter-reactor-selector')
];
const auxADropdowns = [
    document.getElementById('aux-a-selector'),
    document.getElementById('null-tension-a-selector'),
    document.getElementById('materia-shift-a-selector')
];
const auxBDropdowns = [
    document.getElementById('aux-b-selector'),
    document.getElementById('null-tension-b-selector'),
    document.getElementById('materia-shift-b-selector')
];

// Returns the active value (except 'none') for a section
function getActiveDropdownValue(dropdowns) {
    for (const dd of dropdowns) {
        if (dd.value && dd.value !== 'none') {
            return dd.value;
        }
    }
    return 'none';
}

// Sets all other dropdowns in the section to 'none' without triggering events
function setOtherDropdownsNoneNoEvent(dropdowns, activeDropdown) {
    dropdowns.forEach(dd => {
        if (dd !== activeDropdown && dd.value !== 'none') {
            dd.value = 'none';
        }
    });
}

/**
 * Updates the power grid based on the activated tiles.
 * @param {string[]} greenTiles Array of IDs for tiles that should be green.
 * @param {string[]} blueTiles Array of IDs for tiles that should be blue.
 */
function updateGrid(greenTiles, blueTiles) {
    // Only update tiles in the main grid
    document.querySelectorAll('#power-grid-container .tile').forEach(tile => {
        tile.classList.remove('green-tile', 'blue-tile', 'module-powered', 'module-unpowered');
        tile.classList.add('gray-tile');
        tile.style.boxShadow = 'none';
        tile.style.border = '';
    });

    // Step 2: Color the new green tiles
    greenTiles.forEach(tileId => {
        const tile = document.querySelector(`#power-grid-container #${tileId}`);
        if (tile) {
            tile.classList.remove('gray-tile');
            tile.classList.add('green-tile');
            tile.style.boxShadow = '0 0 10px #00ff00';
        }
    });

    // Step 3: Color the new blue tiles
    blueTiles.forEach(tileId => {
        const tile = document.querySelector(`#power-grid-container #${tileId}`);
        if (tile) {
            tile.classList.remove('gray-tile');
            tile.classList.add('blue-tile');
            tile.style.boxShadow = '0 0 10px #0000ff';
        }
    });
}

// Central storage for all generator patterns
const generatorPatterns = {
    'none': { green: [], blue: [] }, // Base pattern for "not selected"
    
    //// Patterns for Main Reactor

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

    //// Patterns for AUX A

    // Bio Fission
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
    // Null Tension 
    'null-tension-mk1' : {
        green: [
            'tile-5-3', 'tile-5-4', 'tile-5-5', 'tile-5-6',
            'tile-6-3', 'tile-6-4', 'tile-6-5', 'tile-6-6'
        ],
        blue: []
    },
    'null-tension-mk2' : {
        green: [
            'tile-5-3', 'tile-5-4', 'tile-5-5', 'tile-5-6',
            'tile-6-4', 'tile-6-5'
        ],
        blue: [
            'tile-6-3', 'tile-6-6'
        ]
    },
    'null-tension-mk3' : {
        green: [
            'tile-5-3', 'tile-5-4', 'tile-5-5', 'tile-5-6',
        ],
        blue: [
            'tile-6-3', 'tile-6-4', 'tile-6-5', 'tile-6-6'
        ]
    },

    'materia-shift-mk1': {
        green: [
            'tile-5-2', 'tile-5-3', 'tile-5-6', 'tile-5-7',
            'tile-6-2', 'tile-6-3', 'tile-6-6', 'tile-6-7'
        ],
        blue: []
    },
    'materia-shift-mk2': {
        green: [
            'tile-5-2', 'tile-5-3', 'tile-5-6', 'tile-5-7',
            'tile-6-3', 'tile-6-6'
        ],
        blue: [
            'tile-5-3', 'tile-5-6', 
            'tile-6-2', 'tile-6-7'
        ]
    },
    'materia-shift-mk3': {
        green: [
            'tile-5-2', 'tile-5-7',
        ],
        blue: [
            'tile-5-3', 'tile-5-6',
            'tile-6-2', 'tile-6-3', 'tile-6-6', 'tile-6-7'
        ]
    },

    //// Patterns for AUX B

    //Bio Fission
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
    },
    // Null Tension AUX B
    'null-tension-mk1-b': {
        green: [
            'tile-7-3', 'tile-7-4', 'tile-7-5', 'tile-7-6',
            'tile-8-3', 'tile-8-4', 'tile-8-5', 'tile-8-6'
        ],
        blue: []
    },
    'null-tension-mk2-b': {
        green: [
            'tile-7-3', 'tile-7-4', 'tile-7-5', 'tile-7-6',
            'tile-8-4', 'tile-8-5'
        ],
        blue: [
            'tile-8-3', 'tile-8-6'
        ]
    },
    'null-tension-mk3-b': {
        green: [
            'tile-7-3', 'tile-7-4', 'tile-7-5', 'tile-7-6'
        ],
        blue: [
            'tile-8-3', 'tile-8-4', 'tile-8-5', 'tile-8-6'
        ]
    },

    // Materia Shift AUX B
    'materia-shift-mk1-b': {
        green: [
            'tile-7-2', 'tile-7-3', 'tile-7-6', 'tile-7-7',
            'tile-8-2', 'tile-8-3', 'tile-8-6', 'tile-8-7'
        ],
        blue: []
    },
    'materia-shift-mk2-b': {
        green: [
            'tile-7-2', 'tile-7-3', 'tile-7-6', 'tile-7-7',
            'tile-8-3', 'tile-8-6'
        ],
        blue: [
            'tile-7-3', 'tile-7-6',
            'tile-8-2', 'tile-8-7'
        ]
    },
    'materia-shift-mk3-b': {
        green: [
            'tile-7-2', 'tile-7-7'
        ],
        blue: [
            'tile-7-3', 'tile-7-6',
            'tile-8-2', 'tile-8-3', 'tile-8-6', 'tile-8-7'
        ]
    }
};


// Initialize the power grid (8x8)
function renderPowerGrid() {
    const container = document.getElementById('power-grid-container');
    container.innerHTML = '';
    for (let row = 1; row <= 8; row++) {
        for (let col = 1; col <= 8; col++) {
            const tile = document.createElement('div');
            tile.id = `tile-${row}-${col}`;
            tile.className = 'tile power-plug-tile'; // Only use CSS for visual
            // Remove plug icon, use empty innerHTML
            tile.innerHTML = '';
            container.appendChild(tile);
        }
    }
}

// Initialization on page load
window.addEventListener('DOMContentLoaded', () => {
    renderPowerGrid();
    renderCombinedGrid(); // Generator logic remains
});


 // Combines the patterns of all selected generators and redraws the grid
function renderCombinedGrid() {
    const allGreenTiles = new Set();
    const allBlueTiles = new Set();
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

// Event listeners for all dropdowns in each section
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