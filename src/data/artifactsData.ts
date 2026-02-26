export interface InventorEntry {
    name: string;
    dates?: string;
    portrait: string;
    isCompany?: boolean;
}

export interface ArtifactRecord {
    id: string;
    wingId: string;
    name: string;
    date: string;
    inventor: string;
    inventorDates?: string;
    inventorPortrait?: string;
    inventorSignature?: string;
    inventors?: InventorEntry[];
    country: string;
    origin?: string;
    impact: string;
    description?: string;
    image: string;
}

const _ARTIFACTS_RAW: ArtifactRecord[] = [
    // --- WING 1: ENERGY & POWER SYSTEMS ---
    {
        id: 'energy-01', wingId: 'energy',
        name: 'The Roman Overshot Water Wheel',
        date: 'c. 1st Century BC',
        inventor: 'Roman Military Engineers (Vitruvian Principles)',
        country: 'Roman Empire',
        impact: 'The first time humanity bypassed biological muscle to automate labor using gravitational potential energy.',
        image: '/images/artifacts/energy/The Roman Overshot Water Wheel.png'
    },
    {
        id: 'energy-02', wingId: 'energy',
        name: 'The Newcomen Atmospheric Engine',
        date: '1712',
        inventor: 'Thomas Newcomen',
        country: 'United Kingdom',
        impact: 'The "Zero to One" machine that proved thermal expansion could be harnessed to perform physical work.',
        image: '/images/artifacts/energy/The Dudley Castle Engine.png'
    },
    {
        id: 'energy-03', wingId: 'energy',
        name: 'The Watt Rotative Steam Engine',
        date: '1788',
        inventor: 'James Watt',
        country: 'United Kingdom',
        impact: 'Introduced the sun-and-planet gear, turning steam power into the rotational motion that fueled the Industrial Revolution.',
        image: '/images/artifacts/energy/The Industrial Prime Mover (Watt Engine Model).png'
    },
    {
        id: 'energy-04', wingId: 'energy',
        name: 'The Gramme Dynamo',
        date: '1871',
        inventor: 'Zénobe Gramme',
        country: 'Belgium',
        impact: 'The essential bridge that converted mechanical kinetic energy into a continuous, usable electric current.',
        image: '/images/artifacts/energy/Zénobe Gramme’s Ring Dynam.png'
    },
    {
        id: 'energy-05', wingId: 'energy',
        name: 'The Parsons Steam Turbine',
        date: '1884',
        inventor: 'Sir Charles Algernon Parsons',
        country: 'United Kingdom',
        impact: 'Swapped heavy pistons for high-speed aerodynamics, enabling the power density required for modern city-wide grids.',
        image: '/images/artifacts/energy/Turbine Model.png'
    },
    {
        id: 'energy-06', wingId: 'energy',
        name: 'The AC Transformer',
        date: '1885',
        inventor: 'William Stanley Jr. (for Westinghouse)',
        country: 'USA',
        impact: 'Solved the "distance problem" of electricity by stepping voltage up for long-range transmission.',
        image: '/images/artifacts/energy/Early Westinghouse Stanley Transformer.png'
    },
    {
        id: 'energy-07', wingId: 'energy',
        name: 'The Pressurized Water Reactor (PWR)',
        date: '1957',
        inventor: 'Admiral Hyman G. Rickover / Westinghouse',
        country: 'USA',
        impact: 'Moved from burning carbon to splitting atoms, representing the ultimate human achievement in energy density.',
        image: '/images/artifacts/energy/Shippingport Atomic Power Station Vessel.png'
    },
    {
        id: 'energy-08', wingId: 'energy',
        name: 'The Silicon Solar Cell',
        date: '1954',
        inventor: 'Gerald Pearson, Daryl Chapin, Calvin Fuller (Bell Labs)',
        country: 'USA',
        impact: 'Bypassed the thermodynamic steam cycle entirely to harvest power directly from quantum light excitation.',
        image: '/images/artifacts/energy/Bell Labs 1954 Prototype.png'
    },
    {
        id: 'energy-09', wingId: 'energy',
        name: 'H-Class Combined Cycle Gas Turbine',
        date: '1990s',
        inventor: 'GE Power Engineering',
        country: 'USA / International',
        impact: 'Captures waste heat to drive a second turbine, pushing fossil fuel efficiency to its theoretical mechanical limits.',
        image: '/images/artifacts/energy/GE 9HA Harriet.png'
    },
    {
        id: 'energy-10', wingId: 'energy',
        name: 'Gigawatt-Scale Offshore Wind Turbine',
        date: '2010s',
        inventor: 'GE Renewable Energy / Siemens Gamesa',
        country: 'France / USA / Denmark',
        impact: 'Uses active aerospace robotics at a skyscraper scale to harvest energy from the planetary atmosphere.',
        image: '/images/artifacts/energy/GE_Haliade_X_12MW.png'
    },
    {
        id: 'energy-11', wingId: 'energy',
        name: 'The Tokamak Fusion Reactor',
        date: 'Speculative Future (ITER Project)',
        inventor: 'International Thermonuclear Experimental Reactor Consortium',
        country: 'International (Facility in France)',
        impact: 'Replicating the sun inside a magnetic cage to unlock infinite, clean energy from seawater.',
        image: '/images/artifacts/energy/Tokamak Reactor.png'
    },

    // --- WING 2: TRANSPORTATION SYSTEMS ---
    {
        id: 'transportation-01', wingId: 'transportation',
        name: 'The Egyptian Chariot',
        date: 'c. 1500 BC',
        inventor: 'Ancient Egyptian Craftsmen (New Kingdom)',
        country: 'Ancient Egypt',
        impact: 'Introduced the spoked wheel, the first precision component designed to minimize friction for high-speed travel.',
        image: '/images/artifacts/transportation/New Kingdom Light Chariot .png'
    },
    {
        id: 'transportation-02', wingId: 'transportation',
        name: 'The Portuguese Caravel',
        date: '1450s',
        inventor: 'Patrons/Engineers under Prince Henry the Navigator',
        country: 'Portugal',
        impact: 'Enabled blue-water navigation and "tacking" against the wind, allowing humanity to map the entire globe.',
        image: '/images/artifacts/transportation/The Portuguese Caravel.png'
    },
    {
        id: 'transportation-03', wingId: 'transportation',
        name: 'Stephenson\'s "Rocket"',
        date: '1829',
        inventor: 'Robert Stephenson',
        country: 'United Kingdom',
        impact: 'Proved mechanical machines could outlast animal muscle, shrinking continents into accessible networks.',
        image: '/images/artifacts/transportation/Stephensons_Rocket.png'
    },
    {
        id: 'transportation-04', wingId: 'transportation',
        name: 'The Safety Elevator',
        date: '1853',
        inventor: 'Elisha Otis',
        country: 'USA',
        impact: 'Solved vertical transportation fatigue, allowing the creation of the skyscraper and the modern metropolis.',
        image: '/images/artifacts/transportation/Otis Safety Brake Elevator.png'
    },
    {
        id: 'transportation-05', wingId: 'transportation',
        name: 'The Rover Safety Bicycle',
        date: '1885',
        inventor: 'John Kemp Starley',
        country: 'United Kingdom',
        impact: 'Introduced the chain drive and pneumatic tires, the direct mechanical ancestors of the modern automobile.',
        image: '/images/artifacts/transportation/Rover Safety Bicycle.png'
    },
    {
        id: 'transportation-06', wingId: 'transportation',
        name: 'Benz Patent-Motorwagen No. 1',
        date: '1886',
        inventor: 'Karl Benz',
        country: 'Germany',
        impact: 'The birth of personal autonomy through internal combustion, freeing the individual from rigid rail schedules.',
        image: '/images/artifacts/transportation/Benz Patent-Motorwagen No. 1.png'
    },
    {
        id: 'transportation-07', wingId: 'transportation',
        name: 'The Wright Flyer I',
        date: '1903',
        inventor: 'Orville and Wilbur Wright',
        country: 'USA',
        impact: 'The moment humanity mastered steering within the atmosphere, enabling 3D travel for the first time.',
        image: '/images/artifacts/transportation/The Aeroplane .png'
    },
    {
        id: 'transportation-08', wingId: 'transportation',
        name: 'The MS Selandia Diesel Ship',
        date: '1912',
        inventor: 'Burmeister & Wain',
        country: 'Denmark',
        impact: 'Replaced erratic sails and labor-intensive coal with the reliability required for modern global trade.',
        image: '/images/artifacts/transportation/MS Selandia.png'
    },
    {
        id: 'transportation-09', wingId: 'transportation',
        name: 'The De Havilland Comet 1',
        date: '1949',
        inventor: 'De Havilland (Ronald Bishop)',
        country: 'United Kingdom',
        impact: 'Introduced the jet turbine to commercial flight, effectively creating the "Global Village."',
        image: '/images/artifacts/transportation/De Havilland Comet 1.png'
    },
    {
        id: 'transportation-10', wingId: 'transportation',
        name: 'The Apollo Command Module',
        date: '1969',
        inventor: 'North American Rockwell / NASA',
        country: 'USA',
        impact: 'The pinnacle of life-support engineering, allowing humans to travel and return from another celestial body.',
        image: '/images/artifacts/transportation/Apollo Command Module.png'
    },
    {
        id: 'transportation-11', wingId: 'transportation',
        name: 'SpaceX Starship & Super Heavy',
        date: '2020s',
        inventor: 'SpaceX',
        country: 'USA',
        impact: 'Moves from "exploration" to "civilization" by making space flight reusable and airline-style.',
        image: '/images/artifacts/transportation/SpaceX Starship & Super Heavy.png'
    },

    // --- WING 3: COMPUTATION & INFORMATION MACHINES ---
    {
        id: 'computation-01', wingId: 'computation',
        name: 'The Antikythera Mechanism',
        date: 'c. 150 BC',
        inventor: 'Hellenistic Greek Scientists',
        country: 'Ancient Greece',
        impact: 'The origin point of computation; a bronze analog computer proving that astronomical logic could be simulated through gears.',
        image: '/images/artifacts/computation/The Antikythera Mechanism .png'
    },
    {
        id: 'computation-02', wingId: 'computation',
        name: 'The Jacquard Loom',
        date: '1804',
        inventor: 'Joseph Marie Jacquard',
        country: 'France',
        impact: 'The birth of software; used punch cards to automate patterns, introducing binary logic (Hole vs. No-Hole) to industry.',
        image: '/images/artifacts/computation/The Jacquard Loom.png'
    },
    {
        id: 'computation-03', wingId: 'computation',
        name: 'Analytical Engine (Trial Piece)',
        date: '1837',
        inventor: 'Charles Babbage',
        country: 'United Kingdom',
        impact: 'The architectural blueprint for every modern computer, featuring the first design for a CPU (Mill) and Memory (Store).',
        image: '/images/artifacts/computation/Analytical_Engine.png'
    },
    {
        id: 'computation-04', wingId: 'computation',
        name: 'Electronic Numerical Integrator and Computer (ENIAC)',
        date: '1945',
        inventor: 'J. Presper Eckert and John Mauchly',
        country: 'USA',
        impact: 'Proved electricity was the native medium of thought by using vacuum tubes to perform calculations at electronic speeds.',
        image: '/images/artifacts/computation/ENIAC (Electronic Numerical Integrator and Computer) .png'
    },
    {
        id: 'computation-05', wingId: 'computation',
        name: 'The Apollo Guidance Computer (AGC)',
        date: '1966',
        inventor: 'MIT Instrumentation Lab / Raytheon',
        country: 'USA',
        impact: 'The first major application of integrated circuits, compressing room-sized computers into a flight-ready silicon chip.',
        image: '/images/artifacts/computation/The Apollo Guidance Computer .png'
    },
    {
        id: 'computation-06', wingId: 'computation',
        name: 'The Osborne 1',
        date: '1981',
        inventor: 'Adam Osborne',
        country: 'USA',
        impact: 'The first commercially successful portable microcomputer, establishing the paradigm of mobile personal computing.',
        image: '/images/artifacts/computation/The Osborne 1.png'
    },
    {
        id: 'computation-07', wingId: 'computation',
        name: 'IBM PC (Model 5150)',
        date: '1981',
        inventor: 'Don Estridge / IBM',
        country: 'USA',
        impact: 'Standardized computing architecture, ending the era of proprietary silos and putting a computer on every desk.',
        image: '/images/artifacts/computation/The IBM Personal Computer (Model 5150).png'
    },
    {
        id: 'computation-08', wingId: 'computation',
        name: 'NVIDIA GeForce 256',
        date: '1999',
        inventor: 'NVIDIA',
        country: 'USA',
        impact: 'The first true GPU; its parallel processing architecture became the mechanical foundation for modern AI.',
        image: '/images/artifacts/computation/The GPU (GeForce 256).png'
    },
    {
        id: 'computation-09', wingId: 'computation',
        name: 'Commodity Blade Server (EC2)',
        date: '2006',
        inventor: 'Amazon Web Services (AWS)',
        country: 'USA',
        impact: 'Shifted computing from a box you own to a utility you rent, forming the physical infrastructure of "The Cloud."',
        image: '/images/artifacts/computation/nvidia.png'
    },
    {
        id: 'computation-10', wingId: 'computation',
        name: 'The Original iPhone',
        date: '2007',
        inventor: 'Steve Jobs / Apple',
        country: 'USA',
        impact: 'Dissolved the computer into a biological extension of the hand, turning internet connectivity into a ubiquitous human trait.',
        image: '/images/artifacts/computation/The iPhone (Original).png'
    },
    {
        id: 'computation-11', wingId: 'computation',
        name: 'IBM Quantum System Two',
        date: 'Current/Speculative (2020s)',
        inventor: 'IBM Research',
        country: 'USA',
        impact: 'Uses superposition (Qubits) to solve problems that would take traditional supercomputers the age of the universe to crack.',
        image: '/images/artifacts/computation/The Quantum Computer (IBM Quantum System Two).png'
    },

    // --- WING 4: COMMUNICATION SYSTEMS ---
    {
        id: 'communication-01', wingId: 'communication',
        name: 'The Movable Type Printing Press',
        date: '1450',
        inventor: 'Johannes Gutenberg',
        country: 'Germany',
        impact: 'Standardized the mechanical replication of ideas, ending the era of restricted literacy and creating "The Public."',
        image: '/images/artifacts/communication/Gutenberg Press Replica.png'
    },
    {
        id: 'communication-02', wingId: 'communication',
        name: 'The Electric Telegraph',
        date: '1844',
        inventor: 'Samuel Morse and Alfred Vail',
        country: 'USA',
        impact: 'Detached information from physical matter, allowing thoughts to travel instantly across continents via copper wire.',
        image: '/images/artifacts/communication/Vail-Morse Telegraph Key.png'
    },
    {
        id: 'communication-03', wingId: 'communication',
        name: 'The "Centennial" Liquid Transmitter',
        date: '1876',
        inventor: 'Alexander Graham Bell',
        country: 'USA',
        impact: 'Captured the vibration of the human throat, allowing for real-time vocal presence across vast distances.',
        image: '/images/artifacts/communication/Bells_Centennial_Liquid_Transmitter.png'
    },
    {
        id: 'communication-04', wingId: 'communication',
        name: 'The Marconi Radio Transmitter',
        date: '1895',
        inventor: 'Guglielmo Marconi',
        country: 'Italy / United Kingdom',
        impact: 'Proved that electromagnetic waves could carry data through the "Ether" without the need for physical tethers.',
        image: '/images/artifacts/communication/Marconi Spark-Gap Transmitter.png'
    },
    {
        id: 'communication-05', wingId: 'communication',
        name: 'Farnsworth Image Dissector',
        date: '1927',
        inventor: 'Philo Farnsworth',
        country: 'USA',
        impact: 'Proved that live images could be sliced into electron lines, creating the "Global Village" of shared visual experience.',
        image: '/images/artifacts/communication/Farnsworth Image Dissector.png'
    },
    {
        id: 'communication-06', wingId: 'communication',
        name: 'Telstar 1',
        date: '1962',
        inventor: 'AT&T / Bell Labs',
        country: 'USA',
        impact: 'The first orbital relay that bypassed the Earth\'s curvature.',
        image: '/images/artifacts/communication/Telstar 1.png'
    },
    {
        id: 'communication-07', wingId: 'communication',
        name: 'The Interface Message Processor (IMP)',
        date: '1969',
        inventor: 'BBN Technologies (for ARPANET)',
        country: 'USA',
        impact: 'Introduced packet switching, the fundamental architecture that allows the modern internet to handle diverse traffic simultaneously.',
        image: '/images/artifacts/communication/Honeywell DDP-516 (ARPANET Node 1).png'
    },
    {
        id: 'communication-08', wingId: 'communication',
        name: 'Motorola DynaTAC 8000x',
        date: '1973',
        inventor: 'Martin Cooper / Motorola',
        country: 'USA',
        impact: 'The first device to assign a network identity to a person rather than a place, ushering in the age of mobility.',
        image: '/images/artifacts/communication/Motorola DynaTAC 8000x.png'
    },
    {
        id: 'communication-09', wingId: 'communication',
        name: 'TAT-8 Undersea Repeater',
        date: '1988',
        inventor: 'AT&T / British Telecom / France Télécom',
        country: 'International',
        impact: 'Amplified photon pulses under the ocean, enabling the fiber-optic infrastructure that carries 99% of global internet traffic.',
        image: '/images/artifacts/communication/TAT-8 Regenerator.png'
    },
    {
        id: 'communication-10', wingId: 'communication',
        name: 'Neuralink N1 Implant',
        date: 'Current/Speculative (2020s)',
        inventor: 'Neuralink',
        country: 'USA',
        impact: 'The final barrier; bypasses physical input/output to connect the human brain directly to the digital network.',
        image: '/images/artifacts/communication/Neuralink N1 Implant.png'
    },

    // --- WING 5: WARFARE & DEFENSE TECHNOLOGIES ---
    {
        id: 'warfare-01', wingId: 'warfare',
        name: 'The Counterweight Trebuchet (Warwolf)',
        date: '1304',
        inventor: 'Master James of St. George / Engineers of King Edward I',
        country: 'England / Scotland',
        impact: 'The ultimate "Kinetic Machine" of the medieval era, utilizing falling mass to generate the destructive force needed to end static sieges.',
        image: '/images/artifacts/defense/warwolf.png'
    },
    {
        id: 'warfare-02', wingId: 'warfare',
        name: 'The Dardanelles Gun (Basilic)',
        date: '1464',
        inventor: 'Munir Ali',
        country: 'Ottoman Empire',
        impact: 'Proved that chemical energy (gunpowder) could defeat any stone fortification, effectively ending the military utility of the castle.',
        image: '/images/artifacts/defense/The Dardanelles Gun (The Basilic).png'
    },
    {
        id: 'warfare-03', wingId: 'warfare',
        name: 'The Iron-Hulled USS Monitor',
        date: '1862',
        inventor: 'John Ericsson',
        country: 'USA',
        impact: 'Introduced the revolving turret, a revolutionary concept that decoupled a ship\'s firepower from its course, defining modern naval architecture.',
        image: '/images/artifacts/defense/USS Monitor.png'
    },
    {
        id: 'warfare-04', wingId: 'warfare',
        name: 'The Maxim Gun',
        date: '1884',
        inventor: 'Hiram Maxim',
        country: 'USA / United Kingdom',
        impact: 'The first recoil-operated machine gun, enabling a single operator to create a "Zone of Denial" that fundamentally altered infantry tactics.',
        image: '/images/artifacts/defense/The Maxim Gun.png'
    },
    {
        id: 'warfare-05', wingId: 'warfare',
        name: 'HMS Dreadnought',
        date: '1906',
        inventor: 'Sir Philip Watts / Royal Navy',
        country: 'United Kingdom',
        impact: 'A "Quantum Leap" in naval power that rendered all previous battleships obsolete through steam turbines and unified heavy fire control.',
        image: '/images/artifacts/defense/HMS Dreadnought.png'
    },
    {
        id: 'warfare-06', wingId: 'warfare',
        name: 'The Mark IV Heavy Tank',
        date: '1917',
        inventor: 'William Tritton and Walter Wilson',
        country: 'United Kingdom',
        impact: 'Reintroduced mobility to a static battlefield by encasing a crew in a mobile steel box capable of crushing trenches and wire.',
        image: '/images/artifacts/defense/Mark IV Tank 1917.png'
    },
    {
        id: 'warfare-07', wingId: 'warfare',
        name: 'The Supermarine Spitfire Mk I',
        date: '1940 (Service Peak)',
        inventor: 'R.J. Mitchell',
        country: 'United Kingdom',
        impact: 'A masterpiece of aerodynamics that proved a nation could be defended purely through the technological superiority of its air interceptors.',
        image: '/images/artifacts/defense/Supermarine Spitfire Mk I.png'
    },
    {
        id: 'warfare-08', wingId: 'warfare',
        name: 'The Boeing B-29 Superfortress',
        date: '1944',
        inventor: 'Boeing Engineering Team',
        country: 'USA',
        impact: 'Introduced pressurized cabins and remote-controlled robotics to warfare, enabling industrial-scale strategic erasure from high altitude.',
        image: '/images/artifacts/defense/Boeing B-29 Superfortress.png'
    },
    {
        id: 'warfare-09', wingId: 'warfare',
        name: '"Fat Man" (Mark 3 Implosion Bomb)',
        date: '1945',
        inventor: 'Manhattan Project Scientists',
        country: 'USA',
        impact: 'Decoupled destruction from effort by using explosive lenses to crush plutonium, ushering in the age of nuclear deterrence.',
        image: '/images/artifacts/defense/Fat Man (Mark 3).png'
    },
    {
        id: 'warfare-10', wingId: 'warfare',
        name: 'USS Nautilus (SSN-571)',
        date: '1954',
        inventor: 'Admiral Hyman Rickover / Westinghouse',
        country: 'USA',
        impact: 'The world\'s first true submersible that could remain underwater indefinitely.',
        image: '/images/artifacts/defense/USS Nautilus (SSN-571).png'
    },
    {
        id: 'warfare-11', wingId: 'warfare',
        name: 'The ICBM (R-7 Semyorka / Atlas)',
        date: '1957 (R-7) / 1959 (Atlas)',
        inventor: 'Sergei Korolev (USSR) / Convair (USA)',
        country: 'USSR / USA',
        impact: 'Created the paradigm of "Mutually Assured Destruction" (MAD) by enabling sub-orbital delivery of nuclear warheads within 30 minutes.',
        image: '/images/artifacts/defense/SM-65 Atlas.png'
    },
    {
        id: 'warfare-12', wingId: 'warfare',
        name: 'The F-117 Nighthawk',
        date: '1981',
        inventor: 'Lockheed Skunk Works',
        country: 'USA',
        impact: 'Shifted the focus of air power from speed and armor to "Low Observability," making aircraft virtually invisible to radar.',
        image: '/images/artifacts/defense/F-117 Nighthawk.png'
    },
    {
        id: 'warfare-13', wingId: 'warfare',
        name: 'The MQ-1 Predator',
        date: '1995',
        inventor: 'Abraham Karem / General Atomics',
        country: 'USA',
        impact: 'Decoupled lethal force from physical risk, allowing for persistent, remote surveillance and precision strikes without political cost.',
        image: '/images/artifacts/defense/Reaper Drone.png'
    },

    // --- WING 6: SCIENTIFIC INSTRUMENTS ---
    {
        id: 'instruments-01', wingId: 'instruments',
        name: 'The Refracting Telescope',
        date: '1609',
        inventor: 'Galileo Galilei',
        country: 'Italy',
        impact: 'The machine that broke the universe by proving that not everything orbited the Earth, destroying the geocentric model forever.',
        image: '/images/artifacts/scientific/Galileos_Leather_and_Wood_Tube_20x.png'
    },
    {
        id: 'instruments-02', wingId: 'instruments',
        name: 'The Compound Microscope',
        date: '1665',
        inventor: 'Robert Hooke',
        country: 'United Kingdom',
        impact: 'Revealed the "hidden kingdom" of biology, leading to the discovery of the cell as the fundamental unit of all life.',
        image: '/images/artifacts/scientific/Robert_Hookes_Micrographia_Microscope.png'
    },
    {
        id: 'instruments-03', wingId: 'instruments',
        name: 'John Harrison\u2019s H4 Marine Chronometer',
        date: '1759',
        inventor: 'John Harrison',
        country: 'United Kingdom',
        impact: 'Solved the "Longitude Problem" through mechanical certainty, acting as the first global positioning system for maritime navigation.',
        image: '/images/artifacts/scientific/John_Harrisons_H4.png'
    },
    {
        id: 'instruments-04', wingId: 'instruments',
        name: 'The Foucault Pendulum',
        date: '1851',
        inventor: 'Léon Foucault',
        country: 'France',
        impact: 'Provided the first direct physical proof of the Earth\u2019s rotation by allowing observers to see the floor move beneath a kinetic weight.',
        image: '/images/artifacts/scientific/The Foucault Pendulum.png'
    },
    {
        id: 'instruments-05', wingId: 'instruments',
        name: 'The Wilson Cloud Chamber',
        date: '1911',
        inventor: 'C.T.R. Wilson',
        country: 'United Kingdom',
        impact: 'Turned invisible radiation into visible vapor trails, providing the experimental proof that the subatomic quantum world was real.',
        image: '/images/artifacts/scientific/The Wilson Cloud Chamber 1911.png'
    },
    {
        id: 'instruments-06', wingId: 'instruments',
        name: 'The 27-inch Cyclotron',
        date: '1931',
        inventor: 'Ernest O. Lawrence',
        country: 'USA',
        impact: 'Moved science from observation to high-energy manipulation, allowing humans to "smash" atoms to create new elements.',
        image: '/images/artifacts/scientific/Lawrence’s 27-inch Cyclotron.png'
    },
    {
        id: 'instruments-07', wingId: 'instruments',
        name: 'The Transmission Electron Microscope (TEM)',
        date: '1933',
        inventor: 'Ernst Ruska',
        country: 'Germany',
        impact: 'Bypassed the "fat" waves of light to use electron beams, enabling us to see viruses and the atomic structure of matter.',
        image: '/images/artifacts/scientific/Ruska’s First Prototype.png'
    },
    {
        id: 'instruments-08', wingId: 'instruments',
        name: 'Reber\'s Backyard Radio Telescope',
        date: '1937',
        inventor: 'Grote Reber',
        country: 'USA',
        impact: 'Shifted astronomy from "Looking" to "Listening," revealing that the Milky Way emits radio frequencies and allowing us to hear the early universe.',
        image: '/images/artifacts/scientific/Grote Reber’s Backyard Dish.png'
    },
    {
        id: 'instruments-09', wingId: 'instruments',
        name: 'The ABI Prism 3700 DNA Sequencer',
        date: '1986 (Prototype) / 1990s (Scale)',
        inventor: 'Lloyd Smith / Applied Biosystems',
        country: 'USA',
        impact: 'Digitized biology by using lasers to read DNA strands at industrial speeds, completing the Human Genome Project.',
        image: '/images/artifacts/scientific/abi prism.png'
    },
    {
        id: 'instruments-10', wingId: 'instruments',
        name: 'The James Webb Space Telescope (JWST)',
        date: '2021',
        inventor: 'NASA / ESA / CSA',
        country: 'International',
        impact: 'An origami-style golden eye that observes deep time in infrared, witness to the birth of the very first stars in the cosmos.',
        image: '/images/artifacts/scientific/james-webb-space.png'
    }
];

// Merge enrichment data (portraits, signatures, dates, descriptions, origins)
import { ARTIFACT_ENRICHMENT } from './artifactEnrichment';

export const ARTIFACTS_DATA: ArtifactRecord[] = _ARTIFACTS_RAW.map((a) => {
    const enrichment = ARTIFACT_ENRICHMENT[a.id];
    if (!enrichment) return a;
    return { ...a, ...enrichment };
});
