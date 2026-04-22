export type Client = {
  id: number;
  name: string;
  image: string;
  category: string;
  url?: string;
  location?: string;
};

// Processed data - minimized without duplicates
export const allClients: Client[] = [
  {
    id: 1,
    name: "247 DLV",
    location: "Qatar",
    image: "/clients/247-dlv.png",
    category: "website",
    url:"https://ui.247dlv.com",
  },
  {
    id: 2,
    name: "Mustaqbal Zamzam",
    location: "Dubai",
    image: "/clients/mustaqbalzamzam.png",
    category: "website",
    url:"https://www.mustaqbalzamzam.com"

  },
  {
    id: 3,
    name: "Feni Express",
    location: "Bangladesh",
    image: "/clients/feniexpress.png",
    category: "website, ecommerce",
    url:"https://.feniexpress.com"
  },
  {
    id: 4,
    name: "BP Touch",
    location: "Bangladesh",
    image: "/clients/bptouch.png",
    category: "website",
    url:"https://bptouch.com",
  },
  {
    id: 5,
    name: "Holy Crescent School",
    location: "Feni",
    image: "/clients/holycrescentschool.png",
    category: "website",
    url:"https://www.holycrescentschool.edu.bd",
  },
  {
    id: 6,
    name: "NS Enterprise",
    location: "Bangladesh",
    image: "/clients/ns-enterprise.png",
    category: "website, cms",
  },
  {
    id: 7,
    name: "Eshraqat Al Safallc",
    location: "Oman",
    image: "/clients/eshraqatalsafallc.png",
    category: "website",
    url:"https://eshraqatalsafallc.com",
  },
  {
    id: 8,
    name: "ATL Group BD",
    location: "Bangladesh",
    image: "/clients/atlgroupbd.png",
    category: "website, cms",
    url:"https://atlgroupbd.com",
  },
  {
    id: 9,
    name: "Bhor Bazar Poultry Center",
    location: "Bangladesh",
    image: "/clients/bhor-bazar-poultry.jpg",
    category: "website",
  },
  {
    id: 10,
    name: "Arif Enterprise",
    location: "Bangladesh",
    image: "/clients/arifenter.png",
    category: "website, inventory",
  },
  {
    id: 11,
    name: "Dubai2BD",
    location: "UAE/Bangladesh",
    image: "/clients/dubai2bd.jpg",
    category: "website, ecommerce",
  },
  {
    id: 12,
    name: "Dollai Nowabpur Govt. College",
    location: "Bangladesh",
    image: "/clients/dngc.jpg",
    category: "website",
  },
  {
    id: 13,
    name: "Buynfeel",
    location: "Bangladesh",
    image: "/clients/buynfeel.png",
    category: "website, ecommerce",
  },
  {
    id: 14,
    name: "Am Cables",
    location: "Bangladesh",
    image: "/clients/amcables.png",
    category: "website, ecommerce",
  },
  {
    id: 15,
    name: "Feni Govt. College",
    location: "Feni",
    image: "/clients/fgc.png",
    category: "website, education",
  },
  {
    id: 16,
    name: "Feni Govt. Zia Mohila College",
    location: "Feni",
    image: "/clients/zmc.png",
    category: "website, education",
  },
  {
    id: 17,
    name: "Ibrahim Kha Govt. College",
    location: "Bangladesh",
    image: "/clients/ibrahimkhagc.png",
    category: "website, education",
  },
  {
    id: 18,
    name: "Chauddagram Govt. College",
    location: "Bangladesh",
    image: "/clients/cgc.png",
    category: "website, education",
  },
  {
    id: 20,
    name: "Chhagalnaiya Govt. Pilot High School",
    location: "Bangladesh",
    image: "/clients/cphs.png",
    category: "website, education",
  },
  {
    id: 21,
    name: "Chhagalnaiya Govt. Girls Pilot High School",
    location: "Bangladesh",
    image: "/clients/cpghs.png",
    category: "website, education",
  },
  {
    id: 22,
    name: "Metropolitan School and College",
    location: "Bangladesh",
    image: "/clients/metro.jpg",
    category: "website, education",
  },
  {
    id: 23,
    name: "Purana Mogholtuli High School",
    location: "Bangladesh",
    image: "/clients/pmths.jpg",
    category: "website, education",
  },
  // {
  //   id: 24,
  //   name: "Dubai Gallery",
  //   location: "UAE",
  //   image: "/clients/dubaigallery.jpeg",
  //   category: "website, ecommerce",
  // },
  // {
  //   id: 26,
  //   name: "Free Bazar BD",
  //   location: "Bangladesh",
  //   image: "/clients/freebazarbd.jpg",
  //   category: "website, ecommerce",
  // },
  {
    id: 27,
    name: "Feni Supernet",
    location: "Bangladesh",
    image: "/clients/fenisupernet.png",
    category: "website, ecommerce",
  },
  {
    id: 29,
    name: "Motomotion BD",
    location: "Bangladesh",
    image: "/clients/motomotion.png",
    category: "website, ecommerce",
  },
  {
    id: 30,
    name: "Feni Polytechnic Institute",
    location: "Feni",
    image: "/clients/fpi.png",
    category: "education",
  },
  {
    id: 31,
    name: "Feni Computer Institute",
    location: "Feni",
    image: "/clients/fci.jpg",
    category: "education",
  },
  {
    id: 32,
    name: "Sylhet Polytechnic Institute",
    location: "Sylhet",
    image: "/clients/spi.png",
    category: "education",
  },
  {
    id: 33,
    name: "Feni Iqbal Memorial Govt. College",
    location: "Feni",
    image: "/clients/imc.jpg",
    category: "education",
  },
  {
    id: 34,
    name: "Habiganj Shahjalal Govt. College",
    location: "Habiganj",
    image: "/clients/hsgc.jpg",
    category: "education",
  },
  {
    id: 38,
    name: "Feni News",
    location: "Feni",
    image: "/clients/feninews.png",
    category: "news",
  },
  {
    id: 42,
    name: "Chhagalnaiya.com",
    location: "Chhagalnaiya",
    image: "/clients/chhagalnaiya.png",
    category: "news",
  },
];


