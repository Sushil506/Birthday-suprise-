export interface GiftItem {
  id: number;
  title: string;
  emoji: string;
  color: string;
  wish: string;
  effect: string;
}

export interface ButterflyItem {
  id: number;
  color: string;
  wingColor: string;
  compliment: string;
  secret: string;
}

export interface StarItem {
  id: number;
  name: string;
  meaning: string;
  blessing: string;
}

export interface TreasureWish {
  id: number;
  icon: string;
  category: string;
  title: string;
  wish: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export const BIRTHDAY_INFO = {
  name: "Chota Don 🫀",
  displayName: "Chota Don",
  heartIcon: "🫀",
  age: 22,
  gender: "Girl",
  createdBy: "British",
  theme: {
    primary: "from-rose-500 via-purple-600 to-indigo-700",
    glow: "#f43f5e",
    accent: "#fbbf24",
  },
};

// 10 Unique Gift Boxes for Level 3 (No duplicates!)
export const GIFTS: GiftItem[] = [
  {
    id: 1,
    title: "The Box of Eternal Radiance",
    emoji: "💖",
    color: "from-rose-500 to-pink-600",
    wish: "At 22, may your inner brilliance outshine every star in the universe! Keep ruling hearts with your smile, Chota Don 🫀.",
    effect: "Rose Petal Burst",
  },
  {
    id: 2,
    title: "The Treasure of Bold Ambition",
    emoji: "👑",
    color: "from-amber-400 to-yellow-600",
    wish: "You are destined for greatness. Walk into your 22nd chapter with the fierce swagger and majesty of a true Queen!",
    effect: "Golden Sparkle Storm",
  },
  {
    id: 3,
    title: "The Crystal of Unstoppable Joy",
    emoji: "✨",
    color: "from-fuchsia-500 to-purple-600",
    wish: "May your days be packed with uncontrollable laughter, spontaneous happy dances, and sweet memories that never fade.",
    effect: "Fairy Dust Spiral",
  },
  {
    id: 4,
    title: "The Chalice of Health & Vitality",
    emoji: "🌿",
    color: "from-emerald-400 to-teal-600",
    wish: "Wishing you radiant good health, boundless energy, peace of mind, and sweet restful sleep every single night.",
    effect: "Emerald Glow",
  },
  {
    id: 5,
    title: "The Compass of Grand Adventures",
    emoji: "🧭",
    color: "from-cyan-500 to-blue-600",
    wish: "May 22 open golden doors to breathtaking travels, new horizons, and thrilling adventures waiting just for you!",
    effect: "Cosmic Nebula",
  },
  {
    id: 6,
    title: "The Sanctuary of Peace & Calm",
    emoji: "🕊️",
    color: "from-violet-400 to-purple-500",
    wish: "Whenever life gets busy, may you always find serene peace in your heart and feel deeply cherished and valued.",
    effect: "Soft Lavender Mists",
  },
  {
    id: 7,
    title: "The Heart of Unbreakable Loyalty",
    emoji: "🫀",
    color: "from-red-500 to-rose-700",
    wish: "Created with endless love by British—know that you have a steadfast companion cheering for you in every corner of life!",
    effect: "Pulsing Heart Wave",
  },
  {
    id: 8,
    title: "The Vault of Golden Prosperity",
    emoji: "💎",
    color: "from-sky-400 to-indigo-600",
    wish: "May every goal you chase turn into glittering success. Abundance and good fortune belong in your hands!",
    effect: "Diamond Flare",
  },
  {
    id: 9,
    title: "The Prism of Pure Wonder",
    emoji: "🌈",
    color: "from-orange-400 to-pink-500",
    wish: "Never lose the youthful spark and wonder that makes you so captivatingly unique and unforgettable.",
    effect: "Rainbow Shimmer",
  },
  {
    id: 10,
    title: "The Crown of Age 22",
    emoji: "🎂",
    color: "from-pink-500 to-rose-600",
    wish: "Welcome to 22! Beautiful, bold, witty, and beloved. This year belongs entirely to Chota Don 🫀!",
    effect: "Grand Confetti Fanfare",
  },
];

// Butterflies for Level 4
export const BUTTERFLIES: ButterflyItem[] = [
  { id: 1, color: "text-pink-400", wingColor: "#f472b6", compliment: "You have an aura that lights up every room!", secret: "British thinks your laugh is the soundtrack of happiness." },
  { id: 2, color: "text-amber-300", wingColor: "#fcd34d", compliment: "Your confidence at 22 is simply breathtaking!", secret: "A great unexpected blessing is heading your way this year." },
  { id: 3, color: "text-purple-400", wingColor: "#c084fc", compliment: "You are the coolest 'Don' anyone could ever meet!", secret: "The world is nicer simply because you are in it." },
  { id: 4, color: "text-cyan-300", wingColor: "#67e8f9", compliment: "Your intuition is sharp and your heart is pure gold.", secret: "22 will be your most defining and glamorous year yet!" },
  { id: 5, color: "text-emerald-300", wingColor: "#6ee7b7", compliment: "You turn ordinary moments into magical memories.", secret: "British planned this adventure with endless affection for you!" },
  { id: 6, color: "text-rose-400", wingColor: "#fb7185", compliment: "Smart, gorgeous, and wonderfully fierce!", secret: "Keep dreaming big; you possess everything needed to win." },
  { id: 7, color: "text-yellow-300", wingColor: "#fde047", compliment: "Your sweetness melts hearts, but your grit inspires.", secret: "Never settle for less than magical." },
  { id: 8, color: "text-indigo-300", wingColor: "#a5b4fc", compliment: "You carry grace effortlessly like royalty.", secret: "Your potential has no ceiling at 22." },
];

// Floating balloons for Level 5
export const BALLOON_COMPLIMENTS = [
  "You're amazing 🌟",
  "Keep smiling 🌟",
  "Stay happy 🌟",
  "Keep shining 🌟",
  "Never stop dreaming 🌟",
  "Believe in yourself 🌟",
  "Your future is bright 🌟",
  "Keep growing 🌟",
  "You're one of a kind 🌟",
  "Enjoy every moment 🌟",
  "Rule your world, Chota Don! 🫀",
  "British is cheering for you always ✨",
  "22 looks breathtaking on you 👑",
  "Endless blessings in this new chapter 🌸",
];

// 5 Glowing Stars for Level 6
export const CELESTIAL_STARS: StarItem[] = [
  {
    id: 1,
    name: "Star of Courage",
    meaning: "The Fearless Heart",
    blessing: "At 22, let no doubt hold you back. Step boldly into the spotlight that was always reserved for you.",
  },
  {
    id: 2,
    name: "Star of Serenity",
    meaning: "The Peaceful Mind",
    blessing: "May you always walk with graceful composure, knowing deep calmness shields your heart from all storms.",
  },
  {
    id: 3,
    name: "Star of Radiance",
    meaning: "The Magnetic Charm",
    blessing: "Your warmth draws kindness wherever you travel. Keep blessing others with your sweet presence.",
  },
  {
    id: 4,
    name: "Star of Triumph",
    meaning: "The Victorious Will",
    blessing: "Every test you've faced turned into wisdom. In your 22nd year, harvest the sweet fruits of victory!",
  },
  {
    id: 5,
    name: "Star of True Bond",
    meaning: "The Eternal Affection",
    blessing: "Celebrated by British—this star seals a promise that you will always be supported, admired, and loved.",
  },
];

// 30 Treasure Chest Wishes for Level 7
export const TREASURE_WISHES: TreasureWish[] = [
  { id: 1, icon: "✨", category: "Magic", title: "Endless Wonder", wish: "May your 22nd year feel like living inside a fairy tale where all good wishes come true." },
  { id: 2, icon: "👑", category: "Royalty", title: "Queen of Hearts", wish: "May you walk with dignity, pride, and the self-respect of a true royal queen." },
  { id: 3, icon: "🌸", category: "Blossoming", title: "Youthful Bloom", wish: "May this year bring you glowing beauty, refreshing peace, and sweet fragrant days." },
  { id: 4, icon: "💎", category: "Wealth", title: "Abundant Fortune", wish: "May opportunities overflow in your career and passions beyond what you ever dreamed." },
  { id: 5, icon: "🫀", category: "Affection", title: "Heart of Gold", wish: "May your heart stay tender, loyal, and full of deep, honest love." },
  { id: 6, icon: "🚀", category: "Success", title: "Skyward Trajectory", wish: "May your projects, goals, and dreams shoot straight for the highest stars!" },
  { id: 7, icon: "🕊️", category: "Peace", title: "Tranquil Soul", wish: "May anxiety dissolve and be replaced by crystal-clear mental serenity." },
  { id: 8, icon: "🌈", category: "Joy", title: "Rainbow Moments", wish: "May even quiet rainy days reveal vibrant rainbows and heartwarming comfort." },
  { id: 9, icon: "🥂", category: "Celebration", title: "Toast to 22", wish: "Here's to late night laughs, celebratory feasts, and memories you'll treasure forever." },
  { id: 10, icon: "🕯️", category: "Light", title: "Inner Flame", wish: "May your inner motivation never dim, even on challenging days." },
  { id: 11, icon: "🌿", category: "Health", title: "Vital Strength", wish: "Wishing you a healthy body, agile mind, and endless energetic stamina." },
  { id: 12, icon: "🎨", category: "Creativity", title: "Vibrant Imagination", wish: "May your creative spirit create magic in everything your hands touch." },
  { id: 13, icon: "🧭", category: "Guidance", title: "True Compass", wish: "May you always make the right choices and trust the quiet voice of your intuition." },
  { id: 14, icon: "🌙", category: "Peace", title: "Sweet Dreams", wish: "May every night bring soft restful sleep and mornings filled with excitement." },
  { id: 15, icon: "⭐", category: "Destiny", title: "Written in Stars", wish: "May the cosmos align in favor of all your secret wishes and prayers." },
  { id: 16, icon: "🎁", category: "Surprises", title: "Unexpected Delights", wish: "May life surprise you with pleasant twists, kind strangers, and happy coincidences." },
  { id: 17, icon: "🎶", category: "Harmony", title: "Rhythm of Joy", wish: "May music always have the power to lift your spirit into pure ecstasy." },
  { id: 18, icon: "🔮", category: "Future", title: "Bright Tomorrow", wish: "May tomorrow be even more thrilling and rewarding than today." },
  { id: 19, icon: "🦋", category: "Transformation", title: "Graceful Evolution", wish: "May 22 be the year you step effortlessly into your fullest, most empowered self." },
  { id: 20, icon: "☀️", category: "Sunshine", title: "Golden Radiance", wish: "May your presence bring sunshine wherever you go, just as it does for British." },
  { id: 21, icon: "🛡️", category: "Protection", title: "Shield of Grace", wish: "May you always be protected from negativity, jealousy, and bad energy." },
  { id: 22, icon: "🎂", category: "Milestone", title: "Sweet 22", wish: "Happy 22nd birthday Chota Don! This number will bring unmatched luck." },
  { id: 23, icon: "🌊", category: "Depth", title: "Profound Wisdom", wish: "May you gain maturity without losing your playfulness and sweet cheekiness." },
  { id: 24, icon: "🌺", category: "Charm", title: "Unmatched Charm", wish: "May your personality continue to captivate, delight, and inspire everyone around you." },
  { id: 25, icon: "🏰", category: "Empire", title: "Kingdom of Dreams", wish: "Build your empire step by step, boss! The throne belongs to you." },
  { id: 26, icon: "🤝", category: "Friendship", title: "Loyal Companions", wish: "May you be surrounded by people who uplift, celebrate, and truly appreciate you." },
  { id: 27, icon: "🏹", category: "Focus", title: "Target Struck", wish: "May every goal you set this year be hit with precision and triumph." },
  { id: 28, icon: "☕", category: "Comfort", title: "Cozy Happiness", wish: "May you enjoy cozy moments, favorite foods, and endless warmth." },
  { id: 29, icon: "🌟", category: "Starlight", title: "Constant Spark", wish: "May the sparkle in your eyes never fade, no matter how many years pass." },
  { id: 30, icon: "💌", category: "Love", title: "Forever Cherished", wish: "Never forget: to British and all who love you, you are irreplaceable and treasured." },
];

// Heartfelt Letter from British for Level 9
export const SECRET_LETTER_TEXT = `Dearest Chota Don 🫀,

Happy 22nd Birthday! 🎂✨

Today is not just another day—it marks 22 incredible years of your existence, your laughter, your fierce spirit, and the one-of-a-kind magic only you bring into this world.

You might be lovingly nicknamed "Chota Don", but the truth is, the only thing you truly conquer is the hearts of everyone around you. Watching you grow into this radiant, smart, hilarious, and inspiring young woman has been an absolute honor.

As you step into 22:
- Never doubt how capable and extraordinary you are.
- When things feel overwhelming, remember your strength and take things one breath at a time.
- Keep laughing that bright laugh, keep chasing the big dreams, and never let anyone dim that golden glow you carry.

This entire magical adventure was created just for you—because you deserve to be celebrated in a way as unforgettable and special as you are to me.

May this 22nd year shower you with boundless health, wild adventures, triumphant success, and deep happiness in every corner of your days.

Always in your corner, cheering you on with all my heart,

With infinite love and respect,
British 🫀✨`;
