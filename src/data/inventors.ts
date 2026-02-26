import type { InventorData } from '../components/HoverInfo';

export const INVENTORS: InventorData[] = [
    // Back Row (order: Faraday, Gutenberg, Johnson, Hopper)
    {
        id: 'faraday',
        name: 'MICHAEL FARADAY',
        domain: 'Electromagnetic Field Theory',
        era: '1791 — 1867',
        description: 'Pioneered electromagnetism and electrochemistry, laying the foundations for electric motor technology.',
        image: '/images/faraday.png',
        color: '#6b8cff',
    },
    {
        id: 'gutenberg',
        name: 'JOHANNES GUTENBERG',
        domain: 'Mechanical Publishing',
        era: '1400 — 1468',
        description: 'Invented the movable-type printing press, sparking the Printing Revolution and mass communication.',
        image: '/images/gutenberg.png',
        color: '#d4a853',
    },
    {
        id: 'johnson',
        name: 'KATHERINE JOHNSON',
        domain: 'Orbital Mechanics & Computation',
        era: '1918 — 2020',
        description: 'Mathematician whose calculations of orbital mechanics were critical to the success of the first US crewed spaceflights.',
        image: '/images/johnson.png',
        color: '#a78bfa',
    },
    {
        id: 'hopper',
        name: 'GRACE HOPPER',
        domain: 'Software Engineering',
        era: '1906 — 1992',
        description: 'Pioneer of computer programming who invented one of the first compiler related tools and popularized machine-independent programming languages.',
        image: '/images/hopper.png',
        color: '#38bdf8',
    },

    // Front Row (order: Watt, Tesla, Lovelace, Berners-Lee)
    {
        id: 'watt',
        name: 'JAMES WATT',
        domain: 'Thermodynamics & Engineering',
        era: '1736 — 1819',
        description: 'Improved the steam engine, a critical development for the Industrial Revolution across the world.',
        image: '/images/watt.png',
        color: '#fbbf24',
    },
    {
        id: 'tesla',
        name: 'NIKOLA TESLA',
        domain: 'Core Industrial Power',
        era: '1856 — 1943',
        description: 'Architect of the modern alternating current (AC) electricity supply system.',
        image: '/images/tesla.png',
        color: '#22d3ee',
    },
    {
        id: 'lovelace',
        name: 'ADA LOVELACE',
        domain: 'Algorithmic Computation',
        era: '1815 — 1852',
        description: 'Recognized as the first computer programmer for her work on Charles Babbage\'s proposed mechanical general-purpose computer.',
        image: '/images/lovelace.png',
        color: '#f472b6',
    },
    {
        id: 'bernerslee',
        name: 'TIM BERNERS-LEE',
        domain: 'Digital Networks',
        era: '1955 — Present',
        description: 'Inventor of the World Wide Web, the first web browser, and the fundamental protocols (HTTP/HTML).',
        image: '/images/bernerslee.png',
        color: '#34d399',
    },
];
