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
        description: 'Instead of just letting a river casually push the bottom of a wheel, Roman engineers figured out how to pipe water so it fell directly onto the *top* of the wheel. This used gravity to do the heavy lifting, making the wheel spin with significantly more force and turning it into a highly efficient machine for grinding grain.',
    },
    'energy-02': {
        inventors: [
            { name: 'Thomas Newcomen', dates: '1664 – 1729', portrait: '/images/portraits/energy/Thomas Newcomen.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'This was the world\'s first practical steam engine, mostly used to pump water out of flooded coal mines. It filled a large cylinder with steam, then sprayed cold water inside to quickly cool it. The steam shrank back into water, creating a vacuum that let the weight of the outside air pull a piston down. It was a massive fuel hog, but it got the job done.',
    },
    'energy-03': {
        inventors: [
            { name: 'James Watt', dates: '1736 – 1819', portrait: '/images/portraits/energy/James-Watt.webp' },
        ],
        origin: 'United Kingdom',
        description: 'James Watt realized Newcomen\'s engine wasted a ton of fuel by constantly heating and cooling the same cylinder. He added a separate cooling chamber so the main cylinder could stay hot all the time. More importantly, he figured out how to turn the engine\'s up-and-down pumping motion into a smooth spinning motion, which meant steam power could finally be used to run factory machinery.',
    },
    'energy-04': {
        inventors: [
            { name: 'Zénobe Gramme', dates: '1826 – 1901', portrait: '/images/portraits/energy/Zénobe Gramme.jpg' },
        ],
        origin: 'France (Developed in Paris)',
        description: 'Before this, electricity was mostly just a parlor trick or trapped in weak batteries. The Gramme Dynamo was the first machine capable of generating smooth, continuous electricity on a scale large enough for industry. By spinning a tightly wound ring of copper wire inside a magnetic field, it proved that generating commercial power was actually possible.',
    },
    'energy-05': {
        inventors: [
            { name: 'Sir Charles Parsons', dates: '1854 – 1931', portrait: '/images/portraits/energy/Charles_Algernon_Parsons.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'Instead of using steam to push a heavy, clunky piston back and forth, Parsons decided to blast high-pressure steam directly through a series of angled fan blades attached to a shaft. This made the shaft spin incredibly fast and with huge efficiency. We still use this exact fundamental concept today in power plants to generate the vast majority of our electricity.',
    },
    'energy-06': {
        inventors: [
            { name: 'William Stanley Jr.', dates: '1858 – 1916', portrait: '/images/portraits/energy/William Stanley Jr..jpg' },
        ],
        origin: 'United States',
        description: 'This is a brilliantly simple device that takes electricity and steps its voltage either up or down. Because of the transformer, power plants can crank the voltage way up to shoot electricity over miles of power lines without losing it all as heat, and then safely step it back down before it enters the wall outlets in your house.',
    },
    'energy-07': {
        inventors: [
            { name: 'Admiral Hyman G. Rickover', dates: '1900 – 1986', portrait: '/images/portraits/energy/Admiral Hyman G. Rickover.jpg' },
        ],
        origin: 'United States',
        description: 'This is the engine behind most modern nuclear submarines and power plants. It uses a controlled nuclear reaction to heat water to extreme temperatures. Because the water is kept under massive pressure, it is physically unable to boil. This superheated water is then pumped through a loop to safely boil a *second*, separate batch of water, creating the steam needed to spin a turbine.',
    },
    'energy-08': {
        inventors: [
            { name: 'Gerald Pearson', dates: '1905 – 1987', portrait: '/images/portraits/energy/Gerald Pearson.jpg' },
            { name: 'Daryl Chapin', dates: '1906 – 1995', portrait: '/images/portraits/energy/Daryl Chapin.jpg' },
            { name: 'Calvin Fuller', dates: '1902 – 1994', portrait: '/images/portraits/energy/Calvin Fuller.jpeg' },
        ],
        origin: 'United States',
        description: 'This was the turning point that made solar power practical. Instead of relying on heat, it uses thin layers of silicon to literally catch incoming light particles (photons). When a photon hits the silicon, it violently knocks an electron loose, creating an immediate and direct electric current. It is the grandfather of every solar panel on roofs today.',
    },
    'energy-09': {
        inventors: [
            { name: 'GE Power Engineering', portrait: '/images/portraits/energy/GE Power Engineering.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'This is a massive efficiency hack for modern power plants. First, it burns natural gas to spin a turbine and generate electricity. But instead of letting the incredibly hot exhaust gas escape up a smokestack, it captures that waste heat to boil water and spin a *second* steam turbine. You essentially get two streams of electricity for the fuel price of one.',
    },
    'energy-10': {
        inventors: [
            { name: 'Siemens Gamesa', portrait: '/images/portraits/energy/Siemens Gamesa.png', isCompany: true },
        ],
        origin: 'International',
        description: 'These are absolute monsters of modern engineering, with some standing taller than skyscrapers. By anchoring them far out in the ocean, they catch much stronger and more consistent winds than turbines on land. They turn massive blades to generate immense amounts of clean power—sometimes enough to power a small town with just a single turbine.',
    },
    'energy-11': {
        inventors: [
            { name: 'ITER Consortium', portrait: '/images/portraits/energy/International Thermonuclear Experimental Reactor Consortium.png', isCompany: true },
        ],
        origin: 'International (Concept originally Soviet)',
        description: 'Still in the experimental phase, this machine is essentially an attempt to build a star inside a bottle. It uses incredibly powerful electromagnets to trap a cloud of superheated gas (plasma) in the shape of a donut. It squeezes the atoms together so tightly that they fuse, with the goal of releasing practically limitless, entirely clean energy.',
    },

    // ========================
    // WING: TRANSPORTATION
    // ========================
    'transportation-01': {
        inventors: [
            { name: 'Ancient Egyptian Craftsmen', portrait: '/images/portraits/transportation/Ancient Egyptian Craftsmen.webp', isCompany: true },
        ],
        origin: 'Ancient Egypt',
        description: 'Ancient Egyptians didn\'t invent the wheel, but they perfected it for warfare. By making the wheels spoked instead of solid wood, and moving the axle to the very back, they created a super lightweight, incredibly fast, and highly maneuverable mobile firing platform.',
    },
    'transportation-02': {
        inventors: [
            { name: 'Prince Henry the Navigator', dates: '1394 – 1460', portrait: '/images/portraits/transportation/Prince Henry the Navigator.jpg' },
        ],
        origin: 'Portugal',
        description: 'Before this, ships mostly sailed wherever the wind happened to push them. The Caravel used special triangular sails that allowed sailors to actually catch the wind at an angle and zig-zag *against* it. This simple change is what made the great global ages of exploration possible.',
    },
    'transportation-03': {
        inventors: [
            { name: 'Robert Stephenson', dates: '1803 – 1859', portrait: '/images/portraits/transportation/Robert Stephenson.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'This wasn\'t the very first train, but it was the one that figured out the winning formula. By running a bunch of hot exhaust pipes through the boiler water instead of just one, it created steam much faster, proving trains could be fast and reliable enough to connect cities.',
    },
    'transportation-04': {
        inventors: [
            { name: 'Elisha Otis', dates: '1811 – 1861', portrait: '/images/portraits/transportation/Elisha Otis.jpg' },
        ],
        origin: 'United States',
        description: 'Elevators existed before this, but people were terrified the rope would snap. Elisha Otis invented a simple spring-loaded catch system. If the cable broke, metal teeth would instantly bite into the guide rails and stop the cart from falling. This single invention is the reason skyscrapers exist today.',
    },
    'transportation-05': {
        inventors: [
            { name: 'John Kemp Starley', dates: '1854 – 1901', portrait: '/images/portraits/transportation/John Kemp Starley.jpeg' },
        ],
        origin: 'United Kingdom',
        description: 'Early bikes had massive front wheels that were incredibly dangerous and hard to ride. The "Rover" changed everything by using two wheels of the same size and a metal chain to drive the back wheel. It’s the exact same basic design as almost every bicycle you see today.',
    },
    'transportation-06': {
        inventors: [
            { name: 'Karl Benz', dates: '1844 – 1929', portrait: '/images/portraits/transportation/Karl Benz.avif' },
        ],
        origin: 'Germany',
        description: 'This is widely considered the first true automobile. Karl Benz didn\'t just strap an engine to a horse carriage; he custom-built a three-wheeled steel frame specifically around a small gas engine. It was the first time a vehicle was designed from scratch to be driven by internal combustion.',
    },
    'transportation-07': {
        inventors: [
            { name: 'Orville & Wilbur Wright', dates: '1871–1948 / 1867–1912', portrait: '/images/portraits/transportation/Orville and Wilbur Wright.avif' },
        ],
        origin: 'United States',
        description: 'The Wright brothers solved the hardest part of flying: steering. Instead of just trying to power a glider into the air, they invented a way to slightly twist the wings to control the plane\'s roll, giving the pilot actual balance in the air. This made powered, controlled flight a reality.',
    },
    'transportation-08': {
        inventors: [
            { name: 'Burmeister & Wain', portrait: '/images/portraits/transportation/Burmeister & Wain.jpeg', isCompany: true },
        ],
        origin: 'Denmark',
        description: 'Before the Selandia, large ships relied on men shoveling mountains of coal into massive steam boilers. This was the first ocean-going ship powered by diesel engines. It proved that ships could be cleaner, require way fewer crew members, and travel much further without needing to refuel.',
    },
    'transportation-09': {
        inventors: [
            { name: 'Ronald Bishop', dates: '1903 – 1989', portrait: '/images/portraits/transportation/Ronald Bishop.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'This was the world’s first commercial jet airliner. It completely revolutionized travel by flying higher, faster, and smoother than propeller planes. While it tragically suffered from engineering issues early on, it laid the direct groundwork for the modern jet travel we use today.',
    },
    'transportation-10': {
        inventors: [
            { name: 'North American Rockwell', portrait: '/images/portraits/transportation/North American Rockwell .png', isCompany: true },
            { name: 'NASA', portrait: '/images/portraits/transportation/nasa.avif', isCompany: true },
        ],
        origin: 'United States',
        description: 'This was the ultimate survival capsule. It was designed to keep three astronauts alive on a trip to the moon and back, packing life support, navigation, and thrusters into a tiny cone. Most importantly, it had a heavy-duty heat shield that kept them from burning up when slamming back into Earth\'s atmosphere.',
    },
    'transportation-11': {
        inventors: [

            { name: 'SpaceX', portrait: '/images/portraits/transportation/SpaceX.jpg', isCompany: true },
        ],
        origin: 'United States',
        description: 'For decades, rockets were basically single-use, multi-million-dollar trash. This system is designed to be fully and rapidly reusable, just like an airplane. It\'s the biggest, most powerful flying object ever built, with the ultimate goal of making it cheap enough to actually colonize other planets.',
    },

    // ========================
    // WING: COMPUTATION
    // ========================
    'computation-01': {
        inventors: [
            { name: 'Hellenistic Greek Scientists', portrait: '/images/portraits/computation/Hellenistic Greek.jpg', isCompany: true },
        ],
        origin: 'Ancient Greece',
        description: 'An ancient Greek hand-powered mechanical computer. They used an incredibly complex system of bronze gears to predict eclipses and track the planets decades in advance. It was basically a clockwork solar system that proved ancient people were doing advanced math with metal long before we realized.',
    },
    'computation-02': {
        inventors: [
            { name: 'Joseph Marie Jacquard', dates: '1752 – 1834', portrait: '/images/portraits/computation/Joseph Marie Jacquard.jpg' },
        ],
        origin: 'France',
        description: 'This wasn\'t a traditional computer, but it used stiff pasteboard cards with holes punched in them to dictate how a mechanical loom weaved patterns into fabric. This was the very first time someone successfully "programmed" a machine using punch cards, a concept that early computers would rely on for the next 150 years.',
    },
    'computation-03': {
        inventors: [
            { name: 'Charles Babbage', dates: '1791 – 1871', portrait: '/images/portraits/computation/Charles Babbage.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'Charles Babbage designed this massive, steam-powered mechanical calculator in the 1800s. It had a "mill" to do the math and a "store" to hold the numbers, and it could theoretically run loops and conditional logic. While it was never fully built in his lifetime, it was the true conceptual blueprint for the modern computer.',
    },
    'computation-04': {
        inventors: [
            { name: 'J. Presper Eckert', dates: '1919 – 1995', portrait: '/images/portraits/computation/J. Presper Eckert.jpg' },
            { name: 'John Mauchly', dates: '1907 – 1980', portrait: '/images/portraits/computation/John Mauchly.jpg' },
        ],
        origin: 'United States',
        description: 'This was the first programmable, electronic, general-purpose digital computer. It was the size of a large room, weighed 30 tons, and used thousands of glowing, hot vacuum tubes instead of mechanical gears to do math at lightning speed. It was originally built to calculate artillery firing tables for the military.',
    },
    'computation-05': {
        inventors: [
            { name: 'MIT Instrumentation Lab', portrait: '/images/portraits/computation/MIT Instrumentation Lab .png', isCompany: true },
            { name: 'Raytheon', portrait: '/images/portraits/computation/Raytheon.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'The computer that flew astronauts to the moon. Instead of filling a room, it was shrunk down to the size of a briefcase using newly invented microchips. It was incredibly reliable and totally revolutionary because it was one of the first computers forced to process data and make decisions in real-time while flying a spacecraft.',
    },
    'computation-06': {
        inventors: [
            { name: 'Adam Osborne', dates: '1939 – 2003', portrait: '/images/portraits/computation/Adam Osborne.jpg' },
        ],
        origin: 'United States',
        description: 'Consider this the granddaddy of laptops. It weighed 24 pounds, had a tiny 5-inch screen, and looked like a piece of heavy-duty testing equipment you lugged around by a handle. But it was the first time you could actually pack up a full, working computer, shove it under an airplane seat, and take it with you.',
    },
    'computation-07': {
        inventors: [
            { name: 'Don Estridge', dates: '1937 – 1985', portrait: '/images/portraits/computation/Don Estridge.jpg' },
        ],
        origin: 'United States',
        description: 'Before this, personal computers were a chaotic mess of different brands that didn\'t play nice together. IBM stepped in and created a standardized machine using off-the-shelf parts and Microsoft\'s operating system. It set the basic hardware standard that almost all modern Windows PCs still follow today.',
    },
    'computation-08': {
        inventors: [
            { name: 'NVIDIA', portrait: '/images/portraits/computation/NVIDIA.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'Billed as the world\'s first GPU (Graphics Processing Unit). Instead of forcing the computer\'s main brain to slowly draw 3D graphics on the screen, this dedicated chip took over all the complex lighting and geometry math. It completely revolutionized video games and accidentally laid the hardware groundwork for modern AI.',
    },
    'computation-09': {
        inventors: [
            { name: 'Amazon Web Services', portrait: '/images/portraits/computation/Amazon Web Services.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'Instead of buying giant, incredibly expensive supercomputers, tech companies figured out how to slide hundreds of cheap, standardized, ultra-thin computers (called blades) into massive racks. By networking thousands of them together in giant warehouses, they created the physical backbone of what we now call the "Cloud."',
    },
    'computation-10': {
        inventors: [
            { name: 'Steve Jobs', dates: '1955 – 2011', portrait: '/images/portraits/computation/Steve Jobs.webp' },
            { name: 'Apple', portrait: '/images/portraits/computation/apple.jpg', isCompany: true },
        ],
        origin: 'United States',
        description: 'It wasn\'t the very first smartphone, but it ditched the standard plastic keyboard for a giant piece of glass that you touched with your fingers. By packing a highly capable computer, a real web browser, and an iPod into a pocket-sized shell, it completely changed how humans interact with the internet.',
    },
    'computation-11': {
        inventors: [
            { name: 'IBM Research', portrait: '/images/portraits/computation/IBM Research.webp', isCompany: true },
        ],
        origin: 'United States',
        description: 'Regular computers think in strict 1s and 0s. This machine uses extremely weird quantum physics to let its basic processing units (qubits) be a 1, a 0, or a mix of both at the exact same time. It has to be kept colder than deep space to work, and it\'s being built to solve hyper-complex problems—like inventing new materials—that would take a normal computer thousands of years to crack.',
    },

    // ========================
    // WING: COMMUNICATION
    // ========================
    'communication-01': {
        inventors: [
            { name: 'Johannes Gutenberg', dates: 'c. 1400 – 1468', portrait: '/images/portraits/communication/Johannes Gutenberg.avif' },
        ],
        origin: 'Germany',
        description: 'Before Gutenberg, books were copied by hand, making them super expensive and rare. He figured out how to cast individual metal letters, arrange them into pages, ink them, and stamp them onto paper. It suddenly made mass-producing information incredibly cheap and sparked a massive explosion in global literacy.',
    },
    'communication-02': {
        inventors: [
            { name: 'Samuel Morse', dates: '1791 – 1872', portrait: '/images/portraits/communication/Samuel Morse.webp' },
            { name: 'Alfred Vail', dates: '1807 – 1859', portrait: '/images/portraits/communication/Alfred Vail.jpg' },
        ],
        origin: 'United States',
        description: 'For most of human history, a message could only travel as fast as a horse or a ship. The telegraph changed the game by sending short and long bursts of electricity (Morse code) over a wire. Almost overnight, it shrank the world, allowing people to instantly communicate across continents for the very first time.',
    },
    'communication-03': {
        inventors: [
            { name: 'Alexander Graham Bell', dates: '1847 – 1922', portrait: '/images/portraits/communication/Alexander_Graham_Bell_.jpg' },
        ],
        origin: 'United States',
        description: 'This was the very first functional telephone. Instead of just sending clicks and beeps over a wire, Bell used a needle vibrating in a small cup of acidic water to translate the actual sound waves of a human voice into a fluctuating electrical current. It proved that real-time voice conversations across distances were actually possible.',
    },
    'communication-04': {
        inventors: [
            { name: 'Guglielmo Marconi', dates: '1874 – 1937', portrait: '/images/portraits/communication/Guglielmo Marconi.jpg' },
        ],
        origin: 'Italy',
        description: 'Wires were great, but they couldn\'t reach ships at sea or cross rough terrain easily. Marconi figured out how to blast invisible electromagnetic waves through the air to carry Morse code over huge distances. It was the birth of wireless communication, eventually evolving into the radio and Wi-Fi we use today.',
    },
    'communication-05': {
        inventors: [
            { name: 'Philo Farnsworth', dates: '1906 – 1971', portrait: '/images/portraits/communication/Philo Farnsworth.webp' },
        ],
        origin: 'United States',
        description: 'Early attempts at TV relied on clunky, spinning mechanical disks to scan images. Farnsworth, while still a teenager, had the genius idea to do it completely electronically. He used magnets to scan a beam of electrons back and forth incredibly fast, painting a moving picture onto a screen. It laid the foundation for every modern television.',
    },
    'communication-06': {
        inventors: [
            { name: 'AT&T', portrait: '/images/portraits/communication/AT&T.png', isCompany: true },
            { name: 'Bell Labs', portrait: '/images/portraits/communication/Bell Labs.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'This was the first active communications satellite. It basically acted like a giant relay station in the sky, catching signals from one side of the world, amplifying them, and shooting them back down. For the first time ever, live television broadcasts and phone calls could be beamed instantly across the Atlantic Ocean.',
    },
    'communication-07': {
        inventors: [
            { name: 'BBN Technologies', portrait: '/images/portraits/communication/BBN Technologies.avif', isCompany: true },
        ],
        origin: 'United States',
        description: 'This was essentially the world\'s very first network router. Built for researchers and the military, it took large chunks of computer data, chopped them up into tiny packets, sent them over phone lines, and reassembled them at the destination. It was the crucial piece of hardware that made the early internet actually work.',
    },
    'communication-08': {
        inventors: [
            { name: 'Martin Cooper', dates: '1928 – Present', portrait: '/images/portraits/communication/Martin Cooper.jpg' },
            { name: 'Motorola', portrait: '/images/portraits/communication/Motorola.jpg', isCompany: true },
        ],
        origin: 'United States',
        description: 'Nicknamed "the brick," this was the first truly portable, hand-held mobile phone. It weighed two pounds, cost a fortune, and the battery only lasted about 30 minutes. But it completely broke the cord, proving that you could call a specific person no matter where they were, rather than just calling a physical building.',
    },
    'communication-09': {
        inventors: [
            { name: 'AT&T', portrait: '/images/portraits/communication/AT&T.png', isCompany: true },
            { name: 'British Telecom', portrait: '/images/portraits/communication/British Telecom.png', isCompany: true },
            { name: 'France Télécom', portrait: '/images/portraits/communication/France Télécom.png', isCompany: true },
        ],
        origin: 'International',
        description: 'Running a massive fiber-optic cable across the bottom of the ocean is useless if the light signal fades out halfway across. This device was spliced into the cable every few dozen miles to catch the fading laser light, boost it, and fire it back down the line. It\'s the unsung hero that physically makes the modern global internet possible.',
    },
    'communication-10': {
        inventors: [
            { name: 'Neuralink', portrait: '/images/portraits/communication/Neuralink.svg', isCompany: true },
        ],
        origin: 'United States',
        description: 'Still in its early stages, this tiny chip is designed to be surgically embedded directly into the human brain. By reading the electrical spikes of individual neurons, it translates human thoughts straight into computer commands. The ultimate goal is to let people control computers, phones, or even robotic limbs using nothing but their minds.',
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
        description: 'Instead of relying on twisted ropes or human muscle to fling projectiles, this giant siege engine used simple gravity. By dropping a massive wooden box filled with rocks or dirt on one end of a pivot, it whipped the longer end around to smash castle walls with heavy boulders from a safe distance.',
    },
    'warfare-02': {
        inventors: [
            { name: 'Munir Ali', dates: 'Active c. 1464', portrait: '/images/portraits/warfare/Munir Ali.jpg' },
        ],
        origin: 'Ottoman Empire',
        description: 'This was a monstrous, 16-ton bronze cannon cast in the 1400s. It was so impossibly huge that it had to be screwed together from two separate pieces just to move it. It fired giant marble balls the size of a person and was basically designed to shatter the thickest stone fortifications on earth.',
    },
    'warfare-03': {
        inventors: [
            { name: 'John Ericsson', dates: '1803 – 1889', portrait: '/images/portraits/warfare/John Ericsson.jpg' },
        ],
        origin: 'United States',
        description: 'Before this, warships were tall wooden targets filled with sails. The Monitor sat incredibly low in the water, wrapped completely in thick iron armor, and featured a single, rotating gun turret on top. Enemy cannonballs practically bounced right off it, instantly changing naval warfare forever.',
    },
    'warfare-04': {
        inventors: [
            { name: 'Hiram Maxim', dates: '1840 – 1916', portrait: '/images/portraits/warfare/Hiram Maxim.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'This was the first true, fully automatic machine gun. Instead of needing a soldier to manually crank a handle to fire, it ingeniously used the kickback energy from each fired bullet to eject the empty shell and load the next one. As long as you held the trigger and fed it ammo, it kept firing.',
    },
    'warfare-05': {
        inventors: [
            { name: 'Sir Philip Watts', dates: '1846 – 1926', portrait: '/images/portraits/warfare/Sir Philip Watts.jpg' },
            { name: 'Royal Navy', portrait: '/images/portraits/warfare/Royal Navy.png', isCompany: true },
        ],
        origin: 'United Kingdom',
        description: 'This British battleship was so advanced that it instantly made every other navy on earth obsolete the day it launched. It was faster because it used new steam turbines, and instead of carrying a messy mix of different-sized cannons, it was packed exclusively with massive, long-range heavy guns.',
    },
    'warfare-06': {
        inventors: [
            { name: 'William Tritton', dates: '1875 – 1946', portrait: '/images/portraits/warfare/William Tritton.jpg' },
            { name: 'Walter Wilson', dates: '1874 – 1957', portrait: '/images/portraits/warfare/Walter Wilson.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'During World War I, soldiers were stuck in muddy, deadly trenches. This was essentially a massive, armor-plated metal box wrapped in caterpillar tracks. It was built specifically to crawl right over deep craters, crush barbed wire fences, and shield infantry as they slowly walked across the battlefield.',
    },
    'warfare-07': {
        inventors: [
            { name: 'R.J. Mitchell', dates: '1895 – 1937', portrait: '/images/portraits/warfare/R.J. Mitchell.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'A legendary British fighter plane that was crucial in winning the Battle of Britain. It was designed with extremely thin, highly aerodynamic elliptical wings that made it incredibly fast and maneuverable. It could out-turn and out-fly the clunkier enemy bombers and fighters it was sent up against.',
    },
    'warfare-08': {
        inventors: [
            { name: 'Boeing', portrait: '/images/portraits/warfare/Boeing Engineering Team.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'This was a giant, long-range WWII bomber built to fly higher and further than anything else. Most importantly, it featured a fully pressurized cabin. This meant the crew didn\'t have to freeze or wear bulky oxygen masks at high altitudes, keeping them safely above the reach of most enemy anti-aircraft guns.',
    },
    'warfare-09': {
        inventors: [
            { name: 'Manhattan Project', portrait: '/images/portraits/warfare/Manhattan Project Scientists.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'This atomic weapon was completely different from a regular explosive. It used a sphere of conventional explosives designed to detonate inward all at exactly the same microsecond. This crushed a core of plutonium so tightly that the atoms split apart, triggering a nuclear chain reaction and an unimaginable release of energy.',
    },
    'warfare-10': {
        inventors: [
            { name: 'Admiral Hyman Rickover', dates: '1900 – 1986', portrait: '/images/portraits/warfare/Admiral Hyman Rickover.jpg' },
            { name: 'Westinghouse', portrait: '/images/portraits/warfare/Westinghouse.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'The world\'s very first nuclear-powered submarine. Older subs ran on electric batteries underwater and had to constantly come up to the surface to run noisy diesel engines to recharge them. The Nautilus used a small nuclear reactor to generate power, meaning it could stay hidden deep underwater for months at a time.',
    },
    'warfare-11': {
        inventors: [
            { name: 'Sergei Korolev', dates: '1907 – 1966', portrait: '/images/portraits/warfare/Sergei Korolev.jpg' },
            { name: 'Convair', portrait: '/images/portraits/warfare/Convair.png', isCompany: true },
        ],
        origin: 'USSR / United States',
        description: 'An Intercontinental Ballistic Missile is essentially a massive space rocket built for war. Instead of flying an airplane to drop a bomb, an ICBM shoots a nuclear warhead straight up into space. It arcs across the globe and then falls back down onto a target thousands of miles away at hypersonic speeds.',
    },
    'warfare-12': {
        inventors: [
            { name: 'Lockheed Skunk Works', portrait: '/images/portraits/warfare/Lockheed Skunk Works.jpg', isCompany: true },
        ],
        origin: 'United States',
        description: 'The world\'s first operational stealth aircraft. Its bizarre, jagged, diamond-like shape looks completely un-aerodynamic because it wasn\'t built to fly perfectly; it was specifically built to scatter incoming enemy radar waves away from the source. To radar screens, this heavily armed jet basically looked like a small bird.',
    },
    'warfare-13': {
        inventors: [
            { name: 'Abraham Karem', dates: '1937 – Present', portrait: '/images/portraits/warfare/Abraham Karem.jpg' },
            { name: 'General Atomics', portrait: '/images/portraits/warfare/General Atomics.png', isCompany: true },
        ],
        origin: 'United States',
        description: 'Originally, this was just a slow, remote-controlled spy drone used to circle high above a battlefield and send live video back to base. Eventually, engineers decided to strap two anti-tank missiles to it. It kicked off the modern era of drone warfare, allowing a pilot sitting in a trailer in Nevada to safely strike a target across the globe.',
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
        description: 'Instead of just looking at the stars with the naked eye, Galileo used two curved glass lenses stuck inside a long tube to bend and magnify incoming light. He didn\'t invent the telescope, but he perfected it enough to clearly see the craters on the moon and discover the moons of Jupiter, proving Earth wasn\'t the center of everything.',
    },
    'instruments-02': {
        inventors: [
            { name: 'Robert Hooke', dates: '1635 – 1703', portrait: '/images/portraits/instruments/Robert Hooke.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'Robert Hooke essentially took the same idea as the telescope but flipped it to look at incredibly tiny things up close. By using multiple lenses stacked on top of each other, he was able to magnify a thin slice of cork and discover that it was made up of tiny little empty boxes, which he famously named "cells."',
    },
    'instruments-03': {
        inventors: [
            { name: 'John Harrison', dates: '1693 – 1776', portrait: '/images/portraits/instruments/John Harrison.jpg' },
        ],
        origin: 'United Kingdom',
        description: 'For centuries, sailors got hopelessly lost at sea because they couldn\'t accurately tell their east-west position (longitude). Harrison solved this by spending his entire life inventing a spring-loaded clock that was incredibly precise, small enough to carry, and completely immune to the violent rocking of a ship or extreme temperature changes.',
    },
    'instruments-04': {
        inventors: [
            { name: 'Léon Foucault', dates: '1819 – 1868', portrait: '/images/portraits/instruments/Léon Foucault.webp' },
        ],
        origin: 'France',
        description: 'This is a brilliantly simple device built to prove that the Earth is actually spinning. Foucault hung a massive metal weight from a super long wire so it could swing freely back and forth. Because the pendulum stays swinging in the exact same direction while the building around it slowly rotates with the Earth, it looks like the pendulum is magically changing direction throughout the day.',
    },
    'instruments-05': {
        inventors: [
            { name: 'C.T.R. Wilson', dates: '1869 – 1959', portrait: '/images/portraits/instruments/C.T.R. Wilson.webp' },
        ],
        origin: 'United Kingdom',
        description: 'This was the very first way scientists could actually "see" subatomic particles. It’s basically a sealed glass box filled with cold, supersaturated alcohol vapor. When a tiny, invisible particle shoots through it, it knocks electrons off the gas atoms, leaving behind a faint, misty little trail just like a jet flying high in the sky.',
    },
    'instruments-06': {
        inventors: [
            { name: 'Ernest O. Lawrence', dates: '1901 – 1958', portrait: '/images/portraits/instruments/Ernest O. Lawrence.jpg' },
        ],
        origin: 'United States',
        description: 'Before this, smashing atoms meant shooting radioactive particles at a target in a straight line, which required impossibly long, expensive machines. Lawrence figured out how to use two D-shaped magnets to spin the particles in a tight circle, hitting them with a pulse of electricity on every lap to slowly speed them up until they were going fast enough to split an atom.',
    },
    'instruments-07': {
        inventors: [
            { name: 'Ernst Ruska', dates: '1906 – 1988', portrait: '/images/portraits/instruments/Ernst Ruska.jpg' },
        ],
        origin: 'Germany',
        description: 'Light microscopes eventually hit a physical limit because light waves are just too big to see really tiny things like viruses. Instead of light, this machine shoots a concentrated beam of electrons right through a ridiculously thin sample. Since electrons are unimaginably small, scientists could suddenly zoom in millions of times closer than ever before.',
    },
    'instruments-08': {
        inventors: [
            { name: 'Grote Reber', dates: '1911 – 2002', portrait: '/images/portraits/instruments/Grote Reber.jpg' },
        ],
        origin: 'United States',
        description: 'Grote Reber built a giant, 31-foot dish out of sheet metal in his actual backyard. Instead of looking at visible starlight, he used it to capture invisible radio waves bouncing around the universe. He single-handedly mapped the entire radio sky, proving that space is filled with crazy, invisible energy that our eyes can\'t even see.',
    },
    'instruments-09': {
        inventors: [
            { name: 'Lloyd Smith', dates: '1954 – Present', portrait: '/images/portraits/instruments/Lloyd Smith.jpg' },
            { name: 'Applied Biosystems', portrait: '/images/portraits/instruments/Applied Biosystems.svg', isCompany: true },
        ],
        origin: 'United States',
        description: 'This is the machine that successfully mapped the human genome. Instead of scientists slowly deciphering DNA by hand, this automated beast used lasers and fluorescent dyes to read millions of genetic letters a day. It basically turned the slow, painful process of reading biology into a high-speed, automated assembly line.',
    },
    'instruments-10': {
        inventors: [
            { name: 'NASA / ESA / CSA', portrait: '/images/portraits/instruments/ESA.png', isCompany: true },
        ],
        origin: 'International',
        description: 'This is the most complex eye ever built. Instead of looking at normal light, its giant, gold-plated honeycomb mirror is specifically designed to catch infrared heat signatures from the very first galaxies ever formed. Because it sits a million miles away in freezing, deep space, it can see right through massive clouds of cosmic dust that block other telescopes.',
    },
};
