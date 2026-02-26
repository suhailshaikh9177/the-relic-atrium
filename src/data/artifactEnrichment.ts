/**
 * Enrichment data for all artifacts.
 * Each artifact now supports an `inventors` array for multiple portraits.
 * Portrait images are stored in /images/portraits/{wingId}/
 */

type InventorEntryLocal = {
    name: string;
    dates?: string;
    portrait: string;
    isCompany?: boolean;
};

type EnrichmentEntry = {
    inventorDates?: string;
    inventorPortrait?: string;
    inventorSignature?: string;
    inventors?: InventorEntryLocal[];
    origin?: string;
    description?: string;
};

export const ARTIFACT_ENRICHMENT: Record<string, EnrichmentEntry> = {
    // ========================
    // WING: ENERGY
    // ========================
    'energy-01': {
        inventors: [
            { name: 'Vitruvius', dates: 'c. 80 BC – c. 15 BC', portrait: '/images/portraits/energy/vitruvius.jpg' },
        ],
        origin: 'Roman Empire (Barbegal, modern-day France)',
        description: 'Engineered by Roman military forces using principles described by Vitruvius, the overshot water wheel was the first device to convert gravitational potential energy into sustained rotational work. Unlike earlier undershot designs which relied on the speed of the current, the overshot design captured the full weight of falling water in buckets, achieving far greater efficiency. This enabled industrial-scale grain milling and ore crushing operations across the empire, effectively creating the first factories.',
    },
    'energy-02': {
        inventors: [
            { name: 'Thomas Newcomen', dates: '1664 – 1729', portrait: '/images/portraits/energy/Thomas Newcomen.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'Thomas Newcomen\'s atmospheric engine was the first practical device to harness steam for mechanical work. It operated by filling a cylinder with steam and then injecting cold water to create a vacuum; atmospheric pressure then pushed the piston down. Though inefficient by modern standards, it was the foundational proof-of-concept that thermal energy could pump water from coal mines, replacing muscle power in industrial applications.',
    },
    'energy-03': {
        inventors: [
            { name: 'James Watt', dates: '1736 – 1819', portrait: '/images/portraits/energy/James-Watt.webp' },
        ],
        origin: 'United Kingdom',
        description: 'James Watt\'s rotative engine transformed reciprocating (up-and-down) motion into continuous rotation via the sun-and-planet gear system. His invention of the separate condenser dramatically improved thermal efficiency, while his centrifugal governor introduced one of the earliest feedback control systems. This engine directly powered the factories, mills, and locomotives that defined the Industrial Revolution.',
    },
    'energy-04': {
        inventors: [
            { name: 'Zénobe Gramme', dates: '1826 – 1901', portrait: '/images/portraits/energy/Zénobe Gramme.jpg' },
        ],
        origin: 'France (Developed in Paris)',
        description: 'Zénobe Gramme\'s ring dynamo was the first electric generator capable of producing smooth, continuous direct current suitable for commercial use. Its ring-wound armature design solved the problem of "pulsing" current, and the accidental discovery that it could also function as a motor in reverse marked the birth of practical electromechanical energy conversion.',
    },
    'energy-05': {
        inventors: [
            { name: 'Sir Charles Parsons', dates: '1854 – 1931', portrait: '/images/portraits/energy/Charles_Algernon_Parsons.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'Sir Charles Parsons invented the multi-stage reaction steam turbine, which replaced heavy reciprocating pistons with high-speed axial flow blades. This breakthrough enabled unprecedented power density in electricity generation. His design powered the revolutionary warship HMS Turbinia and became the standard architecture for almost all modern thermal and nuclear power plants worldwide.',
    },
    'energy-06': {
        inventors: [
            { name: 'William Stanley Jr.', dates: '1858 – 1916', portrait: '/images/portraits/energy/William Stanley Jr..jpg' },
        ],
        origin: 'United States',
        description: 'Building on earlier European designs, William Stanley Jr. built the first practical, reliable alternating current transformer system for George Westinghouse. His induction coil design enabled voltage to be stepped up for efficient long-distance transmission and stepped down for safe local distribution. This solved the fundamental "distance problem" of electricity and enabled the creation of city-wide power grids.',
    },
    'energy-07': {
        inventors: [
            { name: 'Admiral Hyman G. Rickover', dates: '1900 – 1986', portrait: '/images/portraits/energy/Admiral Hyman G. Rickover.jpg' },
        ],
        origin: 'United States',
        description: 'Driven by Admiral Hyman Rickover, the Pressurized Water Reactor was first adapted from naval propulsion to civilian use at Shippingport, Pennsylvania. This plant proved that controlled nuclear fission could generate electricity safely and commercially. The PWR design uses water under high pressure as both coolant and neutron moderator, becoming the dominant reactor architecture globally.',
    },
    'energy-08': {
        inventors: [
            { name: 'Gerald Pearson', dates: '1905 – 1987', portrait: '/images/portraits/energy/Gerald Pearson.jpg' },
            { name: 'Daryl Chapin', dates: '1906 – 1995', portrait: '/images/portraits/energy/Daryl Chapin.jpg' },
            { name: 'Calvin Fuller', dates: '1902 – 1994', portrait: '/images/portraits/energy/Calvin Fuller.jpeg' },
        ],
        origin: 'United States',
        description: 'Developed at Bell Labs, the silicon solar cell was the first photovoltaic device efficient enough for practical power generation (approx. 6% efficiency at launch). By exploiting the quantum photoelectric effect in doped silicon, it bypassed the entire thermodynamic steam cycle to convert sunlight directly into electricity. This invention laid the foundation for the modern solar energy industry.',
    },
    'energy-09': {
        inventors: [
            { name: 'GE Power Engineering', portrait: '/images/portraits/energy/GE Power Engineering.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'The combined cycle gas turbine pairs a Brayton-cycle gas turbine with a Rankine-cycle steam turbine. It captures the exhaust heat from the gas turbine—which would otherwise be wasted—and uses it to boil water for the steam turbine. This dual-cycle approach pushes thermal efficiency above 60%, approaching the theoretical thermodynamic ceiling for fossil fuel combustion.',
    },
    'energy-10': {
        inventors: [
            { name: 'Siemens Gamesa', portrait: '/images/portraits/energy/Siemens Gamesa.png', isCompany: true },
        ],
        origin: 'International',
        description: 'Modern offshore turbines, such as the Haliade-X, are among the world\'s most powerful machines, with single units generating over 12 to 15 megawatts. Standing taller than most skyscrapers, their blades use active pitch control and advanced aerospace composites to harvest kinetic energy from oceanic wind streams at an unprecedented scale.',
    },
    'energy-11': {
        inventors: [
            { name: 'ITER Consortium', portrait: '/images/portraits/energy/International Thermonuclear Experimental Reactor Consortium.png', isCompany: true },
        ],
        origin: 'International (Concept originally Soviet)',
        description: 'The Tokamak is a magnetic confinement device designed to produce controlled thermonuclear fusion power. The ITER project aims to demonstrate net energy gain by using superconducting magnets to confine plasma at temperatures exceeding 150 million degrees. It represents humanity\'s attempt to replicate the energy source of stars for virtually limitless, carbon-free power.',
    },

    // ========================
    // WING: TRANSPORTATION
    // ========================
    'transportation-01': {
        inventors: [
            { name: 'Ancient Egyptian Craftsmen', portrait: '/images/portraits/transportation/Ancient Egyptian Craftsmen.webp', isCompany: true },
        ],
        origin: 'Ancient Egypt',
        description: 'The Egyptian light chariot featured the revolutionary spoked wheel, a precision-engineered component that dramatically reduced rotational mass compared to solid wooden disks. This innovation in materials and geometry enabled high-speed battlefield maneuverability, and the chariot became the dominant military platform across the ancient Near East for centuries.',
    },
    'transportation-02': {
        inventors: [
            { name: 'Prince Henry the Navigator', dates: '1394 – 1460', portrait: '/images/portraits/transportation/Prince Henry the Navigator.jpg' },
        ],
        origin: 'Portugal',
        description: 'The caravel was a small, highly maneuverable sailing vessel. Its key innovation was lateen (triangular) rigging, which allowed it to sail much closer to the wind ("tack") than contemporary square-rigged ships. This capability enabled Portuguese explorers to navigate the difficult winds of the open Atlantic and map the coastlines of Africa, Asia, and the Americas.',
    },
    'transportation-03': {
        inventors: [
            { name: 'Robert Stephenson', dates: '1803 – 1859', portrait: '/images/portraits/transportation/Robert Stephenson.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'Stephenson\'s Rocket won the Rainhill Trials of 1829, proving that steam locomotives were viable for passenger and freight railways. Its multi-tube boiler and blast-pipe exhaust system established the core engineering principles used in all subsequent steam locomotives, effectively launching the railway age that transformed global commerce.',
    },
    'transportation-04': {
        inventors: [
            { name: 'Elisha Otis', dates: '1811 – 1861', portrait: '/images/portraits/transportation/Elisha Otis.jpg' },
        ],
        origin: 'United States',
        description: 'Elisha Otis invented the safety elevator by designing an automatic braking mechanism that locked the platform in place if the hoisting cable failed. His dramatic public demonstration at the 1853 Crystal Palace Exhibition proved the concept. This invention made tall buildings practical and directly enabled the construction of the modern skyscraper.',
    },
    'transportation-05': {
        inventors: [
            { name: 'John Kemp Starley', dates: '1854 – 1901', portrait: '/images/portraits/transportation/John Kemp Starley.jpeg' },
        ],
        origin: 'United Kingdom',
        description: 'John Kemp Starley\'s Rover Safety Bicycle replaced the dangerous penny-farthing with a "diamond-frame" design using equal-sized wheels, a rear-wheel roller chain drive, and pneumatic tires. Its ergonomic practicality made cycling accessible to the masses, and its component technologies (chain drive, tires, spoked tension wheels) directly influenced early automobile engineering.',
    },
    'transportation-06': {
        inventors: [
            { name: 'Karl Benz', dates: '1844 – 1929', portrait: '/images/portraits/transportation/Karl Benz.avif' },
        ],
        origin: 'Germany',
        description: 'Karl Benz\'s Patent-Motorwagen was the first automobile designed as an integrated system—purpose-built around an internal combustion engine rather than adapted from a horse carriage. Its single-cylinder four-stroke engine, electric ignition, and differential gear established the foundational architecture that all subsequent motor vehicles would follow.',
    },
    'transportation-07': {
        inventors: [
            { name: 'Orville & Wilbur Wright', dates: '1871–1948 / 1867–1912', portrait: '/images/portraits/transportation/Orville and Wilbur Wright.avif' },
        ],
        origin: 'United States',
        description: 'The Wright Flyer achieved the first sustained, controlled, heavier-than-air powered flight at Kitty Hawk on December 17, 1903. The Wright brothers\' key innovation was three-axis control—wing warping (roll), a movable rudder (yaw), and an elevator (pitch)—giving the pilot the ability to steer in all dimensions.',
    },
    'transportation-08': {
        inventors: [
            { name: 'Burmeister & Wain', portrait: '/images/portraits/transportation/Burmeister & Wain.jpeg', isCompany: true },
        ],
        origin: 'Denmark',
        description: 'The MS Selandia was the world\'s first ocean-going motor vessel powered by diesel engines. Built by Burmeister & Wain in Copenhagen, it demonstrated that diesel propulsion was more efficient, reliable, and cleaner than coal-fired steam for maritime operations. Its success catalyzed the global transition of commercial shipping to diesel power.',
    },
    'transportation-09': {
        inventors: [
            { name: 'Ronald Bishop', dates: '1903 – 1989', portrait: '/images/portraits/transportation/Ronald Bishop.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'The de Havilland Comet was the world\'s first commercial jet airliner. Its turbojet engines allowed cruising at speeds and altitudes impossible for propeller aircraft, halving transatlantic travel times. Though early models suffered catastrophic structural failures due to metal fatigue, the lessons learned shaped all subsequent jet airliner safety and design standards.',
    },
    'transportation-10': {
        inventors: [
            { name: 'North American Rockwell', portrait: '/images/portraits/transportation/North American Rockwell .png', isCompany: true },
            { name: 'NASA', portrait: '/images/portraits/transportation/nasa.avif', isCompany: true },
        ],
        origin: 'United States',
        description: 'The Apollo Command Module was the crew compartment that carried three astronauts to lunar orbit and safely returned them to Earth through atmospheric reentry at 25,000 mph. Its heat shield, life support, and guidance systems represented the most complex integrated engineering feat in human history up to that point.',
    },
    'transportation-11': {
        inventors: [

            { name: 'SpaceX', portrait: '/images/portraits/transportation/SpaceX.jpg', isCompany: true },
        ],
        origin: 'United States',
        description: 'SpaceX\'s Starship is designed to be the first fully reusable super heavy-lift launch vehicle, capable of carrying over 100 tons to orbit. Its stainless steel construction and Raptor methane engines represent a paradigm shift from expendable rocketry toward airline-style operations, with the ultimate goal of enabling human settlement on Mars.',
    },

    // ========================
    // WING: COMPUTATION
    // ========================
    'computation-01': {
        inventors: [
            { name: 'Hellenistic Greek Scientists', portrait: '/images/portraits/computation/Hellenistic Greek.jpg', isCompany: true },
        ],
        origin: 'Ancient Greece',
        description: 'The Antikythera Mechanism is a bronze analog computer dating to approximately 150 BC. Its intricate system of over 30 meshing gears could predict eclipses, track lunar phases, and model planetary motions. It represents the earliest known use of differential gearing and remains one of archaeology\'s most astonishing discoveries.',
    },
    'computation-02': {
        inventors: [
            { name: 'Joseph Marie Jacquard', dates: '1752 – 1834', portrait: '/images/portraits/computation/Joseph Marie Jacquard.jpg' },
        ],
        origin: 'France',
        description: 'Joseph Marie Jacquard\'s programmable loom used interchangeable punch cards to control the weaving of complex textile patterns automatically. Each card encoded a row of the design in binary form—hole or no hole—establishing the fundamental concept of stored programs. This mechanism explicitly inspired Charles Babbage and the concept of computer programming.',
    },
    'computation-03': {
        inventors: [
            { name: 'Charles Babbage', dates: '1791 – 1871', portrait: '/images/portraits/computation/Charles Babbage.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'Charles Babbage\'s Analytical Engine was the first design for a general-purpose computing machine. It featured a "Mill" (processor), "Store" (memory), input via punch cards, and a printer output—anticipating the modern von Neumann architecture by over a century. Ada Lovelace\'s notes on the engine contain what is recognized as the first algorithm intended for a machine.',
    },
    'computation-04': {
        inventors: [
            { name: 'J. Presper Eckert', dates: '1919 – 1995', portrait: '/images/portraits/computation/J. Presper Eckert.jpg' },
            { name: 'John Mauchly', dates: '1907 – 1980', portrait: '/images/portraits/computation/John Mauchly.jpg' },
        ],
        origin: 'United States',
        description: 'ENIAC was the first electronic general-purpose digital computer, built at the University of Pennsylvania. Using 17,468 vacuum tubes, it could perform 5,000 additions per second—a thousandfold improvement over electromechanical calculators. It proved that electronic switching was the native medium for high-speed computation.',
    },
    'computation-05': {
        inventors: [
            { name: 'MIT Instrumentation Lab', portrait: '/images/portraits/computation/MIT Instrumentation Lab .png', isCompany: true },
            { name: 'Raytheon', portrait: '/images/portraits/computation/Raytheon.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'The Apollo Guidance Computer was the first computer to essentially rely on integrated circuits, compressing room-sized computational power into a 70-pound flight unit. Its real-time operating system and magnetic core rope memory guided Apollo missions to the Moon with just 74 kilobytes of ROM—a triumph of software engineering under extreme hardware constraints.',
    },
    'computation-06': {
        inventors: [
            { name: 'Adam Osborne', dates: '1939 – 2003', portrait: '/images/portraits/computation/Adam Osborne.jpg' },
        ],
        origin: 'United States',
        description: 'The Osborne 1 was the first commercially successful portable microcomputer, weighing 24 pounds and featuring a 5-inch CRT display. Bundled with valuable software, it demonstrated enormous market demand for mobile computing. Its success and subsequent collapse became a cautionary tale, but it paved the way for the laptop.',
    },
    'computation-07': {
        inventors: [
            { name: 'Don Estridge', dates: '1937 – 1985', portrait: '/images/portraits/computation/Don Estridge.jpg' },
        ],
        origin: 'United States',
        description: 'The IBM PC Model 5150 standardized personal computing through its open architecture. By publishing its technical specifications and using off-the-shelf components, IBM inadvertently created a platform that any manufacturer could clone. This decision spawned the "IBM-compatible" ecosystem that still dominates desktop computing today.',
    },
    'computation-08': {
        inventors: [
            { name: 'NVIDIA', portrait: '/images/portraits/computation/NVIDIA.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'The GeForce 256 was marketed as the world\'s first GPU (Graphics Processing Unit). Its hardware "transform-and-lighting" engine offloaded intensive geometric calculations from the CPU. Its true legacy lies in its massively parallel architecture—thousands of simple cores working simultaneously—which later proved ideal for machine learning and launched the modern AI revolution.',
    },
    'computation-09': {
        inventors: [
            { name: 'Amazon Web Services', portrait: '/images/portraits/computation/Amazon Web Services.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'Amazon Web Services launched Elastic Compute Cloud (EC2) in 2006, offering on-demand virtual server instances backed by commodity blade hardware. This shifted computing from a capital expenditure (buying servers) to an operational one (renting capacity). AWS effectively industrialized computing infrastructure, creating "The Cloud" as a global utility.',
    },
    'computation-10': {
        inventors: [
            { name: 'Steve Jobs', dates: '1955 – 2011', portrait: '/images/portraits/computation/Steve Jobs.webp' },
            { name: 'Apple', portrait: '/images/portraits/computation/apple.jpg', isCompany: true },
        ],
        origin: 'United States',
        description: 'The original iPhone dissolved the boundaries between phone, computer, and internet device into a single multi-touch glass slab. Apple\'s insistence on a capacitive touchscreen and the elimination of physical keyboards created a new paradigm of direct manipulation computing. It transformed the smartphone from a business tool into a universal human interface.',
    },
    'computation-11': {
        inventors: [
            { name: 'IBM Research', portrait: '/images/portraits/computation/IBM Research.webp', isCompany: true },
        ],
        origin: 'United States',
        description: 'IBM\'s Quantum System Two is a modular quantum computing platform using superconducting transmon qubits. By exploiting quantum superposition and entanglement, it can explore computational spaces exponentially larger than classical machines. It represents the frontier of computation, with potential applications in cryptography, drug discovery, and materials science.',
    },

    // ========================
    // WING: COMMUNICATION
    // ========================
    'communication-01': {
        inventors: [
            { name: 'Johannes Gutenberg', dates: 'c. 1400 – 1468', portrait: '/images/portraits/communication/Johannes Gutenberg.avif' },
        ],
        origin: 'Germany',
        description: 'Johannes Gutenberg\'s movable type printing press mechanized the reproduction of text using individually cast metal letters that could be rearranged and reused. This innovation reduced the cost of books by over 80% within decades, enabling mass literacy, the Protestant Reformation, the Scientific Revolution, and the emergence of public opinion as a political force.',
    },
    'communication-02': {
        inventors: [
            { name: 'Samuel Morse', dates: '1791 – 1872', portrait: '/images/portraits/communication/Samuel Morse.webp' },
            { name: 'Alfred Vail', dates: '1807 – 1859', portrait: '/images/portraits/communication/Alfred Vail.jpg' },
        ],
        origin: 'United States',
        description: 'Samuel Morse\'s electric telegraph and its associated code system detached information from physical transport for the first time in history. The message "What hath God wrought" sent from Washington to Baltimore in 1844 demonstrated that electrical pulses through copper wire could transmit human thought at the speed of light across continental distances.',
    },
    'communication-03': {
        inventors: [
            { name: 'Alexander Graham Bell', dates: '1847 – 1922', portrait: '/images/portraits/communication/Alexander_Graham_Bell_.jpg' },
        ],
        origin: 'United States',
        description: 'Alexander Graham Bell\'s invention converted the mechanical vibrations of the human voice into proportional electrical current, enabling real-time vocal communication over wire. Demonstrated at the 1876 Centennial Exhibition, this device proved that analog waveforms could faithfully reproduce the nuances of human speech across vast distances.',
    },
    'communication-04': {
        inventors: [
            { name: 'Guglielmo Marconi', dates: '1874 – 1937', portrait: '/images/portraits/communication/Guglielmo Marconi.jpg' },
        ],
        origin: 'Italy',
        description: 'Guglielmo Marconi proved that electromagnetic waves could carry information through the atmosphere without physical wires. His spark-gap transmitter sent the first transatlantic wireless signal in 1901, demonstrating that radio waves followed the curvature of the Earth. This breakthrough freed communication from the constraint of laid cable infrastructure.',
    },
    'communication-05': {
        inventors: [
            { name: 'Philo Farnsworth', dates: '1906 – 1971', portrait: '/images/portraits/communication/Philo Farnsworth.webp' },
        ],
        origin: 'United States',
        description: 'At age 21, Philo Farnsworth demonstrated the first fully electronic television system using his Image Dissector camera tube. Unlike conflicting mechanical scanning systems, his approach used electron beams to dissect images line by line, proving that live visual information could be captured, transmitted, and reconstructed electronically in real time.',
    },
    'communication-06': {
        inventors: [
            { name: 'AT&T', portrait: '/images/portraits/communication/AT&T.png', isCompany: true },
            { name: 'Bell Labs', portrait: '/images/portraits/communication/Bell Labs.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'Telstar 1 was the first active communications satellite. It relayed the first live transatlantic television signal, telephone calls, and data transmissions by receiving microwave signals from ground stations, amplifying them, and retransmitting them back to Earth. It demonstrated that orbital infrastructure could bypass the planet\'s curvature to link continents.',
    },
    'communication-07': {
        inventors: [
            { name: 'BBN Technologies', portrait: '/images/portraits/communication/BBN Technologies.avif', isCompany: true },
        ],
        origin: 'United States',
        description: 'The Interface Message Processor was a ruggedized minicomputer that served as the first ARPANET node. It introduced packet switching—breaking data into discrete packets routed independently across the network—which proved far more resilient and efficient than circuit switching. This architecture became the foundation of the modern internet.',
    },
    'communication-08': {
        inventors: [
            { name: 'Martin Cooper', dates: '1928 – Present', portrait: '/images/portraits/communication/Martin Cooper.jpg' },
            { name: 'Motorola', portrait: '/images/portraits/communication/Motorola.jpg', isCompany: true },
        ],
        origin: 'United States',
        description: 'Martin Cooper made the first handheld cellular phone call on April 3, 1973, from a Manhattan sidewalk using the Motorola DynaTAC prototype. This device assigned a network identity to a person rather than a physical location, fundamentally changing the relationship between humans and telecommunications.',
    },
    'communication-09': {
        inventors: [
            { name: 'AT&T', portrait: '/images/portraits/communication/AT&T.png', isCompany: true },
            { name: 'British Telecom', portrait: '/images/portraits/communication/British Telecom.png', isCompany: true },
            { name: 'France Télécom', portrait: '/images/portraits/communication/France Télécom.png', isCompany: true },
        ],
        origin: 'International',
        description: 'TAT-8 was the first transatlantic fiber optic cable, using laser-pulsed light through glass fibers to carry 40,000 simultaneous telephone circuits. Its undersea optical repeaters amplified photon signals across 3,600 miles of ocean floor. This cable proved that fiber optics could replace copper for intercontinental communications.',
    },
    'communication-10': {
        inventors: [
            { name: 'Neuralink', portrait: '/images/portraits/communication/Neuralink.svg', isCompany: true },
        ],
        origin: 'United States',
        description: 'The Neuralink N1 implant is a brain-computer interface that uses an array of ultra-thin electrode threads to read and stimulate neural activity. Implanted by a precision surgical robot, it aims to bypass all physical input and output to connect the human brain directly to digital systems—potentially restoring motor function and ultimately enabling direct thought-to-machine communication.',
    },

    // ========================
    // WING: WARFARE
    // ========================
    'warfare-01': {
        inventors: [
            { name: 'Master James of St. George', dates: 'c. 1230 – 1309', portrait: '/images/portraits/warfare/Master James of St. George.png' },
            { name: 'King Edward I', portrait: '/images/portraits/warfare/King Edward I.jpg' },
        ],
        origin: 'England',
        description: 'The Warwolf was the largest trebuchet ever constructed, built for King Edward I during the Siege of Stirling Castle. Using a massive counterweight, it could hurl 300-pound stones over 200 yards with devastating accuracy. Its psychological impact was so great that the Scottish garrison attempted to surrender before it was even operational.',
    },
    'warfare-02': {
        inventors: [
            { name: 'Munir Ali', dates: 'Active c. 1464', portrait: '/images/portraits/warfare/Munir Ali.jpg' },
        ],
        origin: 'Ottoman Empire',
        description: 'The Dardanelles Gun was a massive bronze bombard cast by the Ottoman engineer Munir Ali. Modeled on weapons used during the Siege of Constantinople in 1453, these super-guns demonstrated that no stone fortification could withstand concentrated gunpowder artillery, ending the military relevance of the medieval castle.',
    },
    'warfare-03': {
        inventors: [
            { name: 'John Ericsson', dates: '1803 – 1889', portrait: '/images/portraits/warfare/John Ericsson.jpg' },
        ],
        origin: 'United States',
        description: 'Designed by John Ericsson, the USS Monitor introduced the revolving armored turret to naval warfare. Its engagement with the CSS Virginia in 1862 marked the first battle between ironclad warships, rendering all wooden navies obsolete and establishing the architectural template for every subsequent battleship.',
    },
    'warfare-04': {
        inventors: [
            { name: 'Hiram Maxim', dates: '1840 – 1916', portrait: '/images/portraits/warfare/Hiram Maxim.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'Hiram Maxim\'s invention was the first fully automatic machine gun, using the recoil energy of each fired cartridge to eject, reload, and fire the next. A single operator could sustain 600 rounds per minute, creating an impassable "zone of denial." Its use in colonial wars and WWI fundamentally transformed infantry warfare.',
    },
    'warfare-05': {
        inventors: [
            { name: 'Sir Philip Watts', dates: '1846 – 1926', portrait: '/images/portraits/warfare/Sir Philip Watts.jpg' },
            { name: 'Royal Navy', portrait: '/images/portraits/warfare/Royal Navy.png', isCompany: true },
        ],
        origin: 'United Kingdom',
        description: 'HMS Dreadnought was a revolutionary battleship that rendered all previous capital ships obsolete. Her uniform battery of ten 12-inch guns, steam turbine propulsion, and centralized fire control created such a massive leap in capability that all subsequent battleships were classified as either "dreadnoughts" or "pre-dreadnoughts."',
    },
    'warfare-06': {
        inventors: [
            { name: 'William Tritton', dates: '1875 – 1946', portrait: '/images/portraits/warfare/William Tritton.jpg' },
            { name: 'Walter Wilson', dates: '1874 – 1957', portrait: '/images/portraits/warfare/Walter Wilson.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'The Mark IV was the first tank deployed in significant numbers during World War I. Designed by Tritton and Wilson, it solved the fundamental problem of trench warfare by encasing a crew in a mobile armored box capable of crossing trenches, crushing barbed wire, and providing direct fire support to advancing infantry.',
    },
    'warfare-07': {
        inventors: [
            { name: 'R.J. Mitchell', dates: '1895 – 1937', portrait: '/images/portraits/warfare/R.J. Mitchell.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'R.J. Mitchell\'s Supermarine Spitfire was a masterpiece of aerodynamic engineering whose elliptical wing provided exceptional maneuverability at high speeds. During the Battle of Britain, Spitfires proved that a nation could be defended through the technological superiority of its air interceptors alone, changing the strategic calculus of warfare.',
    },
    'warfare-08': {
        inventors: [
            { name: 'Boeing', portrait: '/images/portraits/warfare/Boeing Engineering Team.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'The B-29 Superfortress was the most technologically advanced bomber of World War II, featuring pressurized crew cabins, remote-controlled gun turrets, and an analog fire-control computer. It was the aircraft that delivered both atomic bombs over Japan, and its development cost exceeded that of the Manhattan Project itself.',
    },
    'warfare-09': {
        inventors: [
            { name: 'Manhattan Project', portrait: '/images/portraits/warfare/Manhattan Project Scientists.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'The Fat Man implosion bomb used precisely shaped high-explosive lenses to symmetrically compress a plutonium core to supercriticality. Detonated over Nagasaki on August 9, 1945, it released the energy equivalent of 21,000 tons of TNT from a core weighing just 6.2 kilograms, ushering in the age of nuclear deterrence.',
    },
    'warfare-10': {
        inventors: [
            { name: 'Admiral Hyman Rickover', dates: '1900 – 1986', portrait: '/images/portraits/warfare/Admiral Hyman Rickover.jpg' },
            { name: 'Westinghouse', portrait: '/images/portraits/warfare/Westinghouse.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'USS Nautilus was the world\'s first nuclear-powered submarine. Its pressurized water reactor allowed it to remain submerged indefinitely, limited only by crew endurance and food supplies. In 1958, it completed the first submerged transit of the North Pole, demonstrating that nuclear propulsion had transformed the submarine into a true submersible.',
    },
    'warfare-11': {
        inventors: [
            { name: 'Sergei Korolev', dates: '1907 – 1966', portrait: '/images/portraits/warfare/Sergei Korolev.jpg' },
            { name: 'Convair', portrait: '/images/portraits/warfare/Convair.png', isCompany: true },
        ],
        origin: 'USSR / United States',
        description: 'The intercontinental ballistic missile emerged simultaneously from Soviet designer Sergei Korolev\'s R-7 and the American Atlas program. These rockets could deliver nuclear warheads to any point on Earth within 30 minutes, creating the paradigm of Mutually Assured Destruction (MAD) that defined the Cold War.',
    },
    'warfare-12': {
        inventors: [
            { name: 'Lockheed Skunk Works', portrait: '/images/portraits/warfare/Lockheed Skunk Works.jpg', isCompany: true },
        ],
        origin: 'United States',
        description: 'The F-117 Nighthawk was the first operational aircraft designed entirely around radar stealth technology. Developed by Lockheed\'s Skunk Works using mathematician Pyotr Ufimtsev\'s equations, its faceted surfaces deflected radar signals away from receivers. It shifted the fundamental equation of air power from speed and armor to low observability.',
    },
    'warfare-13': {
        inventors: [
            { name: 'Abraham Karem', dates: '1937 – Present', portrait: '/images/portraits/warfare/Abraham Karem.jpg' },
            { name: 'General Atomics', portrait: '/images/portraits/warfare/General Atomics.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'Abraham Karem\'s Predator drone decoupled lethal force from physical risk by placing the operator thousands of miles from the battlefield. Equipped with cameras and later Hellfire missiles, it enabled persistent surveillance and precision strikes without risking a human pilot, making remote, unmanned combat a permanent capability.',
    },

    // ========================
    // WING: INSTRUMENTS
    // ========================
    'instruments-01': {
        inventors: [
            { name: 'Galileo Galilei', dates: '1564 – 1642', portrait: '/images/portraits/instruments/Galileo Galilei.jpg' },
            { name: 'Hans Lippershey', dates: 'c. 1570 – 1619', portrait: '/images/portraits/instruments/Hans Lippershey.jpg' },
        ],
        origin: 'Italy',
        description: 'While lenses existed previously, Galileo\'s refracting telescope was the first turned toward the heavens with scientific rigor. Through it, he observed the moons of Jupiter and the phases of Venus—direct evidence against the geocentric model. This instrument catalyzed the Copernican Revolution.',
    },
    'instruments-02': {
        inventors: [
            { name: 'Robert Hooke', dates: '1635 – 1703', portrait: '/images/portraits/instruments/Robert Hooke.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'Robert Hooke\'s compound microscope enabled him to examine thin slices of cork, where he observed tiny compartments he named "cells." His masterwork Micrographia contained stunning illustrations of insects and plants at magnifications never before seen, revealing an invisible world beneath human perception.',
    },
    'instruments-03': {
        inventors: [
            { name: 'John Harrison', dates: '1693 – 1776', portrait: '/images/portraits/instruments/John Harrison.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'John Harrison\'s H4 marine chronometer solved the "Longitude Problem" that had plagued navigation for centuries. This pocket-watch-sized device kept time accurate to within seconds over months at sea, enabling navigators to determine their east-west position by comparing local solar time to a fixed reference.',
    },
    'instruments-04': {
        inventors: [
            { name: 'Léon Foucault', dates: '1819 – 1868', portrait: '/images/portraits/instruments/Léon Foucault.webp' },
        ],
        origin: 'France',
        description: 'Léon Foucault\'s pendulum provided the first direct physical proof that the Earth rotates on its axis. Suspended from the dome of the Panthéon in Paris, the pendulum\'s plane of swing remained fixed due to inertia while the floor beneath it visibly rotated, turning an abstract astronomical concept into a visible reality.',
    },
    'instruments-05': {
        inventors: [
            { name: 'C.T.R. Wilson', dates: '1869 – 1959', portrait: '/images/portraits/instruments/C.T.R. Wilson.webp' },
        ],
        origin: 'United Kingdom',
        description: 'C.T.R. Wilson\'s cloud chamber used supersaturated water vapor to make the paths of subatomic particles visible as condensation trails. For the first time, physicists could photograph the trajectories of alpha particles and electrons, providing the experimental evidence that bridged theoretical quantum mechanics with observable physical reality.',
    },
    'instruments-06': {
        inventors: [
            { name: 'Ernest O. Lawrence', dates: '1901 – 1958', portrait: '/images/portraits/instruments/Ernest O. Lawrence.jpg' },
        ],
        origin: 'United States',
        description: 'Ernest Lawrence\'s cyclotron was the first circular particle accelerator, using oscillating electric fields and a magnetic field to spiral charged particles outward at increasing speeds. This transformed physics from passive observation to active experimentation, enabling scientists to probe nuclear structure and create synthetic elements.',
    },
    'instruments-07': {
        inventors: [
            { name: 'Ernst Ruska', dates: '1906 – 1988', portrait: '/images/portraits/instruments/Ernst Ruska.jpg' },
        ],
        origin: 'Germany',
        description: 'Ernst Ruska built the first transmission electron microscope, which used focused beams of electrons instead of light to image specimens. Because electron wavelengths are far shorter than visible light, the TEM achieved resolutions thousands of times greater than optical microscopes—revealing the structures of viruses and crystal lattices for the first time.',
    },
    'instruments-08': {
        inventors: [
            { name: 'Grote Reber', dates: '1911 – 2002', portrait: '/images/portraits/instruments/Grote Reber.jpg' },
        ],
        origin: 'United States',
        description: 'Grote Reber built the first dedicated radio telescope in his backyard in Wheaton, Illinois. Using a 31-foot parabolic dish, he mapped radio emissions from the Milky Way, confirming Karl Jansky\'s earlier detection and establishing radio astronomy as a scientific discipline.',
    },
    'instruments-09': {
        inventors: [
            { name: 'Lloyd Smith', dates: '1954 – Present', portrait: '/images/portraits/instruments/Lloyd Smith.jpg' },
            { name: 'Applied Biosystems', portrait: '/images/portraits/instruments/Applied Biosystems.svg', isCompany: true },
        ],
        origin: 'United States',
        description: 'The ABI Prism 3700 was a capillary electrophoresis DNA sequencer that used laser-excited fluorescent dye terminators to read genetic code at industrial speeds. This instrument was the workhorse of the Human Genome Project, enabling the complete sequencing of 3 billion base pairs of human DNA and transforming biology into a data-driven discipline.',
    },
    'instruments-10': {
        inventors: [
            { name: 'NASA / ESA / CSA', portrait: '/images/portraits/instruments/ESA.png', isCompany: true },
        ],
        origin: 'International',
        description: 'The James Webb Space Telescope is the most powerful space observatory ever built, featuring a 6.5-meter gold-plated beryllium mirror that unfolds after launch. Operating at the L2 Lagrange point and observing in infrared, JWST can detect light from the first galaxies that formed after the Big Bang, peering back over 13.5 billion years into cosmic history.',
    },
};
