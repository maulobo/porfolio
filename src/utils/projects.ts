export interface Project {
  id: string;
  title: string;
  category: string[];
  description: string;
  imageUrl: string;
  hoverImages?: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: "02",
    title: "Yucca Packaging",
    category: ["Brand Design", "UI Design", "UX Design"],
    description: "A Packaging Website with Purpose",
    imageUrl:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop",
    hoverImages: [
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605616138270-9757692b70f1?q=80&w=2070&auto=format&fit=crop",
    ],
    link: "/work/yucca",
  },
  {
    id: "03",
    title: "Helpguide",
    category: ["Brand Design", "UI Design", "UX Design", "Design Strategy"],
    description: "A Digital Revamp for Mental Wellbeing",
    imageUrl:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
    hoverImages: [
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
    ],
    link: "/work/helpguide",
  },
  {
    id: "04",
    title: "FinChoice",
    category: ["Brand Design", "UI Design", "UX Design", "Design Strategy"],
    description: "A Brand Built for Partnership",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    hoverImages: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2070&auto=format&fit=crop",
    ],
    link: "/work/finchoice",
  },
  {
    id: "05",
    title: "The Vineyard Hotel",
    category: ["UI Design", "UX Design", "Brand Design"],
    description: "A Digital Experience with Timeless Charm",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    hoverImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-6e5a513e610a?q=80&w=2070&auto=format&fit=crop",
    ],
    link: "/work/vineyard-hotel",
  },
];

export const categories = [
  "All",
  "Design Strategy",
  "Brand Design",
  "UI Design",
  "UX Design",
];
