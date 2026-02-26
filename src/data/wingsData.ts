export interface WingData {
    id: string;
    index: number;
    label: string;
    title: string;
    description: string;
    color: string;
    image: string;
    depth: number; // Z-depth parallax offset in px
}

export const WINGS: WingData[] = [
    {
        id: 'energy',
        index: 1,
        label: 'ARCHIVE SECTOR 01',
        title: 'ENERGY & POWER SYSTEMS',
        description: 'The lineage of energy conversion. Documenting the multi-layered mechanical and industrial systems engineered to generate, convert, and distribute power.',
        color: '#FF8C00',
        image: '/images/4k/transparent/energy.png',
        depth: 0,
    },
    {
        id: 'transportation',
        index: 2,
        label: 'ARCHIVE SECTOR 02',
        title: 'TRANSPORTATION SYSTEMS',
        description: 'Tracing the evolution of global transit systems, documenting the mechanical lineage from early locomotion to modern aerospace networks.',
        color: '#0000FF',
        image: '/images/4k/transparent/transportation.png',
        depth: -40,
    },
    {
        id: 'computation',
        index: 3,
        label: 'ARCHIVE SECTOR 03',
        title: 'COMPUTATION MACHINES',
        description: 'The architecture of artificial processing. Tracing the engineering lineage of algorithmic computation and the silicon revolution.',
        color: '#00FF00',
        image: '/images/4k/transparent/computation.png',
        depth: 20,
    },
    {
        id: 'communication',
        index: 4,
        label: 'ARCHIVE SECTOR 04',
        title: 'COMMUNICATION SYSTEMS',
        description: 'The engineering of planetary connectivity. Documenting the hardware, signals, and systems that bind human communication.',
        color: '#00FFFF',
        image: '/images/4k/transparent/communication.png',
        depth: -30,
    },
    {
        id: 'warfare',
        index: 5,
        label: 'ARCHIVE SECTOR 05',
        title: 'WARFARE & DEFENSE TECHNOLOGIES',
        description: 'Tactical artifacts. Analyzing the systemic evolution of military technology and its overarching impact on civilian infrastructure.',
        color: '#FF0000',
        image: '/images/4k/transparent/defense.png',
        depth: 10,
    },
    {
        id: 'instruments',
        index: 6,
        label: 'ARCHIVE SECTOR 06',
        title: 'SCIENTIFIC INSTRUMENTS',
        description: 'The architecture of observation. Documenting the technological apparatus built to quantify, analyze, and understand the physical universe.',
        color: '#800080',
        image: '/images/4k/transparent/scientific.png',
        depth: -50,
    },
];
