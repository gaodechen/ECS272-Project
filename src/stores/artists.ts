export const trimName = (name: string) => {
  return name.toLowerCase().replace(" ", "_");
}

export interface Artist {
  name: string;
  description: string;
  banner: string;
  avatar: string;
  songs: string[];
  covers: string[];
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
    songs: ['Oops!...I Did It Again', 'Born to Make You Happy', 'Lucky', "I'm a Slave 4 U", 'Overprotected - Radio Edit', "I'm Not a Girl, Not Yet a Woman", 'Me Against the Music (feat. Madonna) - LP Version / Video Mix', 'Toxic', 'My Prerogative', 'Everytime', 'Gimme More', 'Break the Ice', 'Womanizer', 'Piece of Me', 'Circus', 'If U Seek Amy', 'I Wanna Go', 'Till the World Ends', 'Work B**ch'].slice(0,9).sort(),
    covers: ["/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png", "/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png","/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png","/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png", "/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png","/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png","/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png", "/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png","/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png", "/public/covers/Britney_Spears_-_Oops!..._I_Did_It_Again.png"]
  },
  {
    name: "Calvin Harris",
    description: "N/A",
    avatar: "/public/avatars/calvin_harris.jpg",
    banner: "/public/banners/calvin_harris.jpg",
    songs: ["Acceptable in the 80's", "I'm Not Alone - Radio Edit", 'Bounce (feat. Kelis) - Radio Edit', 'Feel So Close - Radio Edit', "Let's Go (feat. Ne-Yo)", "We'll Be Coming Back (feat. Example)", 'Drinking from the Bottle (feat. Tinie Tempah)', 'I Need Your Love (feat. Ellie Goulding)', 'Sweet Nothing (feat. Florence Welch)', 'Thinking About You (feat. Ayah Marar)', 'Under Control (feat. Hurts)', 'Blame (feat. John Newman)', 'Summer', 'Outside (feat. Ellie Goulding)', 'How Deep Is Your Love', 'This Is What You Came For (feat. Rihanna)', 'My Way', 'Feels (feat. Pharrell Williams, Katy Perry & Big Sean)', 'One Kiss (with Dua Lipa)', "Giant (with Rag'n'Bone Man)"].slice(0,9).sort(),
    covers: ["/public/covers/Calvin_Harris_-_I_Created_Disco.png", "/public/covers/Calvin_Harris_-_I_Created_Disco.png", "/public/covers/Calvin_Harris_-_I_Created_Disco.png", "/public/covers/Calvin_Harris_-_I_Created_Disco.png", "/public/covers/Calvin_Harris_-_I_Created_Disco.png", "/public/covers/Calvin_Harris_-_I_Created_Disco.png", "/public/covers/Calvin_Harris_-_I_Created_Disco.png", "/public/covers/Calvin_Harris_-_I_Created_Disco.png", ]
  },
  {
    name: "Chris Brown",
    description: "N/A",
    avatar: "/public/avatars/chris_brown.jpg",
    banner: "/public/banners/chris_brown.png",
    songs: ['Run It! (feat. Juelz Santana)', 'Gimme That', 'Yo (Excuse Me Miss)', 'Kiss Kiss (feat. T-Pain)', 'With You', 'Kiss Kiss (feat. T-Pain)', 'Forever', 'Deuces (feat. Tyga & Kevin McCall)', "Look At Me Now (feat. Lil' Wayne & Busta Rhymes)", 'Yeah 3x', 'Beautiful People', 'Turn Up the Music', "Don't Wake Me Up", 'Fine China', 'Loyal (feat. Lil Wayne & Tyga)', 'New Flame (feat. Usher & Rick Ross)', 'Ayo'].slice(0,9).sort(),
    covers: ["/public/covers/Cbgimme.jpeg", "/public/covers/Cbgimme.jpeg","/public/covers/Cbgimme.jpeg","/public/covers/Cbgimme.jpeg","/public/covers/Cbgimme.jpeg","/public/covers/Cbgimme.jpeg","/public/covers/Cbgimme.jpeg","/public/covers/Cbgimme.jpeg",]
  },
  {
    name: "David Guetta",
    description: "N/A",
    avatar: "/public/avatars/david_guetta.jpg",
    banner: "/public/banners/david_guetta.png",
    songs: ['Sexy Bitch (feat. Akon)', 'When Love Takes Over (feat. Kelly Rowland)', 'Memories (feat. Kid Cudi)', "Gettin' Over You (feat. Fergie & LMFAO)", "Who's That Chick? (feat. Rihanna)", 'Where Them Girls At (feat. Nicki Minaj & Flo Rida)', 'Without You (feat. Usher)', 'Turn Me On (feat. Nicki Minaj)', 'She Wolf (Falling to Pieces) [feat. Sia]', 'Titanium (feat. Sia)', 'Play Hard (feat. Ne-Yo & Akon)', 'Lovers on the Sun (feat. Sam Martin)', 'Bad (feat. Vassy) - Radio Edit', 'Hey Mama (feat. Nicki Minaj, Bebe Rexha & Afrojack)', 'Bang My Head (feat. Sia & Fetty Wap)', "This One's for You (feat. Zara Larsson) (Official Song UEFA EURO 2016)", '2U (feat. Justin Bieber)', 'Flames'].slice(0,9).sort(),
    covers: ["/public/covers/When_Love_Takes_Over.jpeg", "/public/covers/When_Love_Takes_Over.jpeg","/public/covers/When_Love_Takes_Over.jpeg","/public/covers/When_Love_Takes_Over.jpeg","/public/covers/When_Love_Takes_Over.jpeg","/public/covers/When_Love_Takes_Over.jpeg","/public/covers/When_Love_Takes_Over.jpeg","/public/covers/When_Love_Takes_Over.jpeg",]
  },
  {
    name: "Drake",
    description: "N/A",
    avatar: "/public/avatars/drake.jpg",
    banner: "/public/banners/drake.png",
    songs: ['Forever', 'Best I Ever Had', 'Over', 'Find Your Love', 'Headlines', 'The Motto', 'Take Care', 'Started From the Bottom', "Hold On, We're Going Home", 'Hotline Bling', 'Jumpman', 'One Dance', 'Hotline Bling', 'Pop Style', 'Jumpman', 'Too Good', 'Passionfruit', "God's Plan", 'Nonstop', 'In My Feelings', "I'm Upset", 'Nice For What', 'Money In The Grave (Drake ft. Rick Ross)'].slice(0,9).sort(),
    covers: ["/public/covers/Drake-Forever.jpeg", "/public/covers/Drake-Forever.jpeg", "/public/covers/Drake-Forever.jpeg", "/public/covers/Drake-Forever.jpeg", "/public/covers/Drake-Forever.jpeg", "/public/covers/Drake-Forever.jpeg", "/public/covers/Drake-Forever.jpeg", "/public/covers/Drake-Forever.jpeg", ]
  },
  {
    name: "Eminem",
    description: "N/A",
    avatar: "/public/avatars/eminem.png",
    banner: "/public/banners/eminem.jpg",
    songs: ['The Real Slim Shady', 'Stan', 'Without Me', "'Till I Collapse", "Cleanin' Out My Closet", 'Lose Yourself - From "8 Mile" Soundtrack', 'Sing For The Moment', 'Just Lose It', 'Like Toy Soldiers', 'Ass Like That', 'Mockingbird', 'Like Toy Soldiers', 'Shake That', "When I'm Gone", 'We Made You', 'Crack A Bottle', 'Love The Way You Lie', 'Not Afraid', 'The Monster', 'Berzerk', 'River (feat. Ed Sheeran)'].slice(0,9).sort(),
    covers: ["/public/covers/Eminem_-_The_Real_Slim_Shady_CD_cover.jpeg", "/public/covers/Eminem_-_The_Real_Slim_Shady_CD_cover.jpeg", "/public/covers/Eminem_-_The_Real_Slim_Shady_CD_cover.jpeg", "/public/covers/Eminem_-_The_Real_Slim_Shady_CD_cover.jpeg", "/public/covers/Eminem_-_The_Real_Slim_Shady_CD_cover.jpeg", "/public/covers/Eminem_-_The_Real_Slim_Shady_CD_cover.jpeg", "/public/covers/Eminem_-_The_Real_Slim_Shady_CD_cover.jpeg", "/public/covers/Eminem_-_The_Real_Slim_Shady_CD_cover.jpeg", ]
  },
  {
    name: "Kanye West",
    description: "N/A",
    avatar: "/public/avatars/kanye_west.png",
    banner: "/public/banners/kanye_west.png",
    songs: ['Jesus Walks', 'Through The Wire', 'All Falls Down', 'Gold Digger', 'Diamonds From Sierra Leone - Remix', 'Touch The Sky', 'Stronger', "Can't Tell Me Nothing", 'Flashing Lights', 'Homecoming', 'Love Lockdown', 'Good Life', 'Heartless', 'Love Lockdown', 'All Of The Lights', 'Mercy', 'Black Skinhead'].slice(0,9).sort(),
    covers: ["/public/covers/Kanye_West_-_Jesus_Walks_-_CD_single_cover.jpeg", "/public/covers/Kanye_West_-_Jesus_Walks_-_CD_single_cover.jpeg", "/public/covers/Kanye_West_-_Jesus_Walks_-_CD_single_cover.jpeg", "/public/covers/Kanye_West_-_Jesus_Walks_-_CD_single_cover.jpeg", "/public/covers/Kanye_West_-_Jesus_Walks_-_CD_single_cover.jpeg", "/public/covers/Kanye_West_-_Jesus_Walks_-_CD_single_cover.jpeg", "/public/covers/Kanye_West_-_Jesus_Walks_-_CD_single_cover.jpeg", "/public/covers/Kanye_West_-_Jesus_Walks_-_CD_single_cover.jpeg", ]
  },
  {
    name: "Katy Perry",
    description: "N/A",
    avatar: "/public/avatars/katy_perry.jpg",
    banner: "/public/banners/katy_perry.png",
    songs: ['I Kissed A Girl', 'Hot N Cold', 'Waking Up In Vegas', 'California Gurls', 'Teenage Dream', 'Firework', 'E.T.', 'Last Friday Night (T.G.I.F.)', 'Part Of Me', 'The One That Got Away', 'Wide Awake', 'This Is How We Do', 'Unconditionally', 'Roar', 'Dark Horse', 'Chained To The Rhythm'].slice(0,9).sort(),
    covers: ["/public/covers/I_Kissed_a_Girl.png", "/public/covers/I_Kissed_a_Girl.png", "/public/covers/I_Kissed_a_Girl.png", "/public/covers/I_Kissed_a_Girl.png", "/public/covers/I_Kissed_a_Girl.png", "/public/covers/I_Kissed_a_Girl.png", "/public/covers/I_Kissed_a_Girl.png", "/public/covers/I_Kissed_a_Girl.png", ]
  },
  {
    name: "Rihanna",
    description: "N/A",
    avatar: "/public/avatars/rihanna.png",
    banner: "/public/banners/rihanna.jpg",
    songs: ['Pon de Replay', 'SOS', 'Unfaithful', 'Umbrella', 'Shut Up And Drive', 'Take A Bow', 'Disturbia', "Don't Stop The Music", 'Russian Roulette', 'Only Girl (In The World)', 'Te Amo', 'Rude Boy', 'Hard', 'Man Down', "What's My Name?", 'S&M', 'We Found Love', "What's My Name?", 'We Found Love', 'Where Have You Been', 'Diamonds', 'Stay', 'Bitch Better Have My Money', 'Work', 'Needed Me'].slice(0,9).sort(),
    covers: ["/public/covers/Pon_de_Replay_cover.png", "/public/covers/Pon_de_Replay_cover.png", "/public/covers/Pon_de_Replay_cover.png", "/public/covers/Pon_de_Replay_cover.png", "/public/covers/Pon_de_Replay_cover.png", "/public/covers/Pon_de_Replay_cover.png", "/public/covers/Pon_de_Replay_cover.png", "/public/covers/Pon_de_Replay_cover.png"]
  },
  {
    name: "Taylor Swift",
    description: "N/A",
    avatar: "/public/avatars/taylor_swift.png",
    banner: "/public/banners/taylor_swift.jpg",
    songs: ['Love Story', 'You Belong With Me', 'Back To December', 'I Knew You Were Trouble.', 'I Knew You Were Trouble.', '22', 'Bad Blood', 'Style', 'Shake It Off', 'Blank Space', 'Bad Blood', 'Wildest Dreams', 'Style', 'Look What You Made Me Do', '...Ready For It?', 'Cruel Summer'].slice(0,9).sort(),
    covers: ["/public/covers/Taylor_Swift_-_Lover.png", "/public/covers/Taylor_Swift_-_Lover.png", "/public/covers/Taylor_Swift_-_Lover.png", "/public/covers/Taylor_Swift_-_Lover.png", "/public/covers/Taylor_Swift_-_Lover.png", "/public/covers/Taylor_Swift_-_Lover.png", "/public/covers/Taylor_Swift_-_Lover.png", "/public/covers/Taylor_Swift_-_Lover.png", ]
  },
];
