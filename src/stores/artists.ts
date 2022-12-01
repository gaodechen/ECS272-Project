export const trimName = (name: string) => {
  return name.toLowerCase().replace(" ", "_");
}

export interface Artist {
  name: string;
  description: string;
  banner: string;
  avatar: string;
  songs: string[];
}

export const ArtistNames = [
  "Britney Spears",
  "Calvin Harris",
  "Chris Brown",
  "David Guetta",
  "Drake",
  "Eminem",
  "Kanye West",
  "Katy Perry",
  "Rihanna",
  "Taylor Swift",
];

export const Artists: Artist[] = [
  {
    name: "Britney Spears",
    description: "N/A",
    avatar: "/public/avatars/britney_spears.png",
    banner: "/public/banners/britney_spears.jpg",
    songs: [],
  },
  {
    name: "Calvin Harris",
    description: "N/A",
    avatar: "/public/avatars/calvin_harris.jpg",
    banner: "/public/banners/calvin_harris.jpg",
    songs: [],
  },
  {
    name: "Chris Brown",
    description: "N/A",
    avatar: "/public/avatars/chris_brown.jpg",
    banner: "/public/banners/chris_brown.png",
    songs: [],
  },
  {
    name: "David Guetta",
    description: "N/A",
    avatar: "/public/avatars/david_guetta.jpg",
    banner: "/public/banners/david_guetta.png",
    songs: [],
  },
  {
    name: "Drake",
    description: "N/A",
    avatar: "/public/avatars/drake.jpg",
    banner: "/public/banners/drake.png",
    songs: [],
  },
  {
    name: "Eminem",
    description: "N/A",
    avatar: "/public/avatars/eminem.png",
    banner: "/public/banners/eminem.jpg",
    songs: [],
  },
  {
    name: "Kanye West",
    description: "N/A",
    avatar: "/public/avatars/kanye_west.png",
    banner: "/public/banners/kanye_west.png",
    songs: [],
  },
  {
    name: "Katy Perry",
    description: "N/A",
    avatar: "/public/avatars/katy_perry.jpg",
    banner: "/public/banners/katy_perry.png",
    songs: [],
  },
  {
    name: "Rihanna",
    description: "N/A",
    avatar: "/public/avatars/rihanna.png",
    banner: "/public/banners/rihanna.jpg",
    songs: [],
  },
  {
    name: "Taylor Swift",
    description: "N/A",
    avatar: "/public/avatars/taylor_swift.png",
    banner: "/public/banners/taylor_swift.jpg",
    songs: [],
  },
];
