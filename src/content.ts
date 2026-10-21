import photoList from "./photos.json";

export const profile = {
  name: "Lexi Tinajero",

  roles: [
    "cs student @ unc",
    "robotics researcher",
    "control systems lead",
    "vp of r&d @ engineering at carolina",
  ],
  intro: "i’m a computer science junior at unc–chapel hill interested in robotics, embedded systems, and figuring out what to build next. lately, i’ve been working on voice navigation for Boston Dynamics Spot and helping student teams develop their own projects.",
  email: "tinajero@unc.edu",
  linkedin: "https://www.linkedin.com/in/alexatinajero",
  github: "https://github.com/lexitinajero",
  instagram: "https://www.instagram.com/lexitinajero",
  resume: "/lexi-tinajero-resume.pdf",
};

export const about = [
  "i’m a first-generation college student and computer science junior at unc-chapel hill, focusing on mobile and embedded systems with a minor in ai. originally from goldsboro, nc, i moved to durham for ncssm before eventually making my way to chapel hill.",
  "i like writing code that makes something happen. whether that’s getting a robot to follow voice commands, automating something repetitive, or turning an idea into something people can actually use. i’m especially drawn to robotics and embedded systems because i get to see my code interact with the world. i also really enjoy the product side of things, from figuring out what to build to thinking about how someone would actually use it.",
  "at unc’s Experimental Engineering Lab, i’ve been working on voice-controlled navigation for Boston Dynamics Spot, teaching a robot to understand spoken directions and navigate its surroundings. i’m also the VP of research & development for Engineering @ Carolina, where i help lead student teams, make design decisions, and bring projects from ideas to working prototypes. one of those projects involves turning discarded lab plastics into reusable 3D printing filament.",
  "outside of coding, i’m into pilates, boxing, surfing, and marvel rivals. i’ve also spent several summers teaching swimming, and i’m currently learning scuba. apparently, i like having options.",
  "i studied abroad at korea university in seoul and have also traveled to japan and the philippines. north carolina will always be home, but i love exploring new places and experiencing life somewhere different.",
  "next destination: undecided. accepting suggestions. ♡",
];

export const currently = [
  { label: "researching", value: "voice navigation for Boston Dynamics Spot" },
  { label: "building", value: "a machine that turns lab plastic into 3D printer filament" },
  { label: "studying", value: "mobile & embedded systems, minor in AI" },
  { label: "learning", value: "scuba" },
];

export const education = {
  school: "University of North Carolina at Chapel Hill",
  degree: "bachelor’s in computer science, concentration in mobile & embedded systems engineering, minor in AI",
  dates: "expected may 2028",
  involved: [
    "Engineering at Carolina, VP of R&D",
    "study abroad at Korea University",
    "LatinxEd Fellowship, STEM mentor",
    "NC Society of Hispanic Professionals, lead STEM ambassador",
    "Latinos in Tech / SHPE",
    "Omega Phi Alpha Service Sorority",
  ],
  awards: ["Carolina Covenant Scholar", "OUR Accelerated Research Award"],
};

export const certifications = [
  "business administration certificate (WCC, 2023)",
  "lifeguard, CPR/AED & first aid",
  "PADI open water scuba diver",
];

export const interests = [
  "ballet",
  "boxing",
  "pilates",
  "pixel art",
  "marvel rivals",
  "teaching swimming",
  "scuba",
  "surfing",
  "travel",
  "photography",
  "fashion",
  "pokémon go",
  "community service",
];

type Photo = { src: string; caption: string };

export type Feature = {
  id: string;
  title: string;
  dek: string;
  year: string;
  role: string;
  category: string;
  stack: string[];
  overview: string;
  story: string[];
  outcome?: string;
  cover?: string;
  gallery: Photo[];
  links: { label: string; href: string }[];
  related?: string[];
};

export const features: Feature[] = [
  {
    id: "paws",
    title: "PAWS",
    dek: "personal autonomous walking support: a robot guide built on Boston Dynamics Spot",
    year: "dec 2025 – now",
    role: "control systems lead, on a team of six",
    category: "robotics research",
    stack: ["Python", "Spot SDK", "GraphNav", "LiDAR", "speech-to-text"],
    overview:
      "PAWS is the big project. our team at UNC’s Experimental Engineering Lab is turning Spot into a guide for people with visual impairments: you hold a handle, tell him where you want to go, and he walks you there. everything else i’ve built for Spot is a piece of it.",
    story: [
      "you talk, Spot listens. speech recognition turns what you say into text, and a parser matches it to a saved location, even if you phrase it differently. if he can’t tell what you meant, he asks again.",
      "navigation runs on GraphNav. the building is pre-mapped, with locations saved as waypoints connected by walkable paths, so it works indoors without GPS. LiDAR handles obstacles in real time.",
      "a specialized handle keeps the person in control. holding it lets Spot accept commands and start a route. letting go stops him immediately, and he lies down. right now it’s a simple on/off circuit, with capacitive touch sensing planned.",
      "next up is Google Maps API integration, so people can ask for places more naturally and routes can go beyond the pre-mapped waypoints.",
      "we’ve presented PAWS at 10+ events, including UNC’s Celebration of Undergraduate Research.",
    ],
    cover: "/projects/paws-team.jpg",
    gallery: [{ src: "/projects/paws-poster.jpg", caption: "our PAWS poster. click to open it full size." }],
    links: [],
    related: ["spot-nav", "spot-tricks"],
  },
  {
    id: "spot-nav",
    title: "Spot, take me to Sitterson",
    dek: "the voice navigation system for PAWS: say a place, and Spot walks you there",
    year: "may 2026 – aug 2026",
    role: "undergraduate researcher, advised by Jim Mahaney",
    category: "summer research · part of PAWS",
    stack: ["Python", "Spot SDK", "GraphNav", "speech-to-text", "language model", "NVIDIA Jetson"],
    overview:
      "this was my summer research piece of PAWS, and the question was simple: how can controlling a robot be as easy as telling it where you want to go? Spot already knows how to get around on his own. the hard part is translating what a person says into locations and paths he understands.",
    story: [
      "Spot sees a building as waypoints (saved locations) connected by edges (paths he can walk). i mapped 50+ destinations across Sitterson Hall and wrote Python code that loads the map, finds saved locations, connects them through paths, and sends the route to GraphNav, Spot’s navigation system.",
      "then i added voice. speech-to-text turns what you say into text, and a language model translates that natural request into a command Spot can act on. alias matching means places can go by more than one name, so you can use the names you’d actually say out loud.",
      "i connected the whole system to an NVIDIA Jetson, working toward running it directly on the robot.",
      "next is Google Maps integration. Spot and mapping tools describe locations differently, so connecting them could turn coordinates and routes into instructions he can follow.",
    ],
    outcome: "the result is a working voice navigation system for Spot, and the project is now public in UNC’s Carolina Digital Repository.",
    cover: "/photos/img-9237.jpg",
    gallery: [],
    links: [
      { label: "read it in the Carolina Digital Repository", href: "https://cdr.lib.unc.edu/concern/scholarly_works/tb09jp41w?locale=en" },
      { label: "code on GitHub", href: "https://github.com/lexitinajero/spot-autonomous-navigation" },
      { label: "summer research slides (pdf)", href: "/projects/spot-summer-research.pdf" },
    ],
    related: ["paws"],
  },
  {
    id: "spot-tricks",
    title: "Spot learns some tricks",
    dek: "an offline voice-command demo, so Spot can dance, do pushups, and look pretty",
    year: "aug 2026 – now",
    role: "robotics software developer",
    category: "robotics · PAWS demo",
    stack: ["Python", "Spot SDK", "Vosk", "LiDAR", "AprilTags"],
    overview:
      "i wanted to give Spot a few things to do besides navigating, so now he can dance, do pushups, and look pretty. you just talk to him. speech recognition runs offline with Vosk and connects to the Spot SDK.",
    story: [
      "i wrote the command parsing and a set of modular motion routines that turn spoken requests into robot actions. this Spot doesn’t have an arm, so every trick is made out of body poses and walking.",
      "he knows 16 commands, from “spot, nod” to a pushup competition where he does 10 counted pushups, slows down toward the end, and then flexes.",
      "i integrated LiDAR person detection, obstacle checks, and pose tracking, with AprilTag navigation as a fallback. so he can find you, walk over, and walk back to where he started.",
    ],
    cover: "/photos/img-5719.jpg",
    gallery: [],
    links: [{ label: "code on GitHub", href: "https://github.com/lexitinajero/spot-demo-public" }],
    related: ["paws", "spot-nav"],
  },
  {
    id: "plastic",
    title: "trash into filament",
    dek: "a two-stage machine that turns discarded lab plastic into 3D printing filament",
    year: "aug 2026 – now",
    role: "R&D engineer & project manager",
    category: "hardware",
    stack: ["Precious Plastic", "temperature control", "sensors"],
    overview:
      "labs throw out a lot of plastic. i oversee a two-stage system for Engineering at Carolina that shreds it and then extrudes the pieces into reusable 3D printing filament.",
    story: [
      "we’re developing a compact shredder from Precious Plastic designs, which means picking the blades, shaft, motor, gearbox, and sieve size.",
      "we’re building a temperature-controlled, screw-fed extruder with diameter monitoring, so it makes printable 1.75 mm filament.",
    ],
    gallery: [],
    links: [],
  },
  {
    id: "gutease",
    title: "GutEase",
    dek: "helping a startup make its cramp-relief wearable smaller and lighter",
    year: "aug 2026 – now",
    role: "technical consultant",
    category: "wearables & startups",
    stack: ["sensors", "heating & cooling", "prototyping"],
    overview:
      "GutEase is a startup making a wearable for menstrual cramp relief, with sensors and heating/cooling built in. i advise them on the technical design.",
    story: [
      "i evaluate design changes that make the prototype smaller and lighter, so the next version is more portable and comfortable.",
      "i turn technical requirements into prototype specs and milestones for the founder’s investor pitch.",
    ],
    gallery: [],
    links: [],
  },
  {
    id: "portfolio",
    title: "this website",
    dek: "the website you’re on right now. you found it.",
    year: "2026",
    role: "developer & designer",
    category: "web",
    stack: ["React", "TypeScript", "CSS"],
    overview: "i designed and built this site from scratch.",
    story: [
      "it’s split into separate pages, with a typed intro and a rotating list of roles at the top.",
      "all the words live in one file, separate from the layout code, so updating it is easy.",
      "the terminal on the home page actually works. try typing help.",
    ],
    gallery: [],
    links: [],
  },
  {
    id: "dashboard",
    title: "everything in one place",
    dek: "a dashboard for all my classes and leadership responsibilities",
    year: "2026",
    role: "software engineer",
    category: "web app",
    stack: ["JavaScript", "CSS", "HTML"],
    overview: "between classes and leadership roles, i had a lot to keep track of, so i built a dashboard to keep it all in one place.",
    story: [
      "tasks are sorted into eight categories.",
      "you can add, complete, and remove tasks, and the remaining-task counts update live.",
      "i designed the CSS so i can see my priorities across school and extracurriculars at a glance.",
    ],
    gallery: [],
    links: [],
  },
  {
    id: "odds",
    title: "the house always wins",
    dek: "a calculator that shows exactly how much",
    year: "2022",
    role: "independent developer",
    category: "probability & cryptography",
    stack: ["probability", "SHA-256", "seeded RNG"],
    overview: "i built a tool that calculates per-move win probabilities and expected value in grid-based games of chance, based on the grid size and number of hazards.",
    story: [
      "i compared the payout multipliers to the true odds to measure the house edge across different strategies.",
      "i also studied how “provably fair” systems use SHA-256 and seeded RNG to generate and verify outcomes.",
    ],
    gallery: [],
    links: [],
  },
];

export const experience = [
  {
    role: "undergraduate researcher & control systems lead",
    org: "Experimental Engineering Laboratory & Interactive Robotics and Novel Technologies, UNC",
    dates: "dec 2025 – present",
    points: [
      "i’m engineering a six-stage voice-to-navigation pipeline for Boston Dynamics Spot to guide visually impaired users.",
      "the pipeline integrates speech-to-text, alias matching, and command validation with GraphNav autonomous navigation in Python.",
      "so far, i’ve mapped 50+ destinations across Sitterson Hall and automated map loading and localization for autonomous routing.",
      "our robotic seeing-eye assistant has been presented at 10+ events, including UNC’s Celebration of Undergraduate Research.",
    ],
  },
  {
    role: "freelance developer",
    org: "invoice automation tool for a local contractor",
    dates: "may 2026 – aug 2026",
    points: [
      "i built a Python tool that turns spreadsheet job data into itemized PDF invoices for a small business.",
      "subtotals, tax, totals, sequential invoice numbers, and payment due dates are all calculated automatically.",
      "daily invoicing went from about 6 hours of manual write-ups to a quick review-and-send, and the tool is still in daily use.",
    ],
  },
  {
    role: "undergraduate research assistant",
    org: "Visual Computing and Augmented Intelligence Lab, UNC",
    dates: "sept 2024 – feb 2025",
    points: [
      "i processed a 382 MB multi-camera imaging dataset, extracting frames from NetCDF (.nc) files with Python.",
      "those frames were used to test multi-camera image stitching in Hugin.",
      "i also reviewed computational imaging research and Python/Java code for neural-network-based feature detection.",
    ],
  },
  {
    role: "student research assistant",
    org: "Dittmer Lab, UNC Lineberger Comprehensive Cancer Center",
    dates: "aug 2023 – may 2024",
    points: [
      "over 10 months, i investigated drug response and resistance in Kaposi sarcoma and primary effusion lymphoma.",
      "i wrote R and Python scripts for bioinformatics analysis of sequencing data from CRISPR-based experiments.",
      "the findings went to the NCSSM Annual Research Symposium, where i presented them to an audience of 500+ people.",
    ],
  },
];

export const skills = {
  languages: ["Python", "Java", "C", "C++", "JavaScript", "MATLAB", "R"],
  "robotics & ai": ["Boston Dynamics Spot SDK", "GraphNav", "speech-to-text", "Vosk"],
  tools: ["Git", "GitHub", "Docker", "Linux/Unix", "Node.js", "VS Code", "IntelliJ", "Maven", "GDB", "RStudio", "Excel"],
};

export type FeedPhoto = { src: string; caption: string; place?: string; width?: number; height?: number };
export const photos: FeedPhoto[] = photoList;

export const photoPreview = [
  "dsc00334.jpg",
  "chocolate-hills.jpg",
  "img-4332.jpg",
  "tokyo-tower.jpg",
  "sushi.jpg",
  "img-6602.jpg",
  "snoopy-garden.jpg",
  "tortellini.jpg",
];

export const courses: { group: string; classes: { code: string; name: string }[] }[] = [];
