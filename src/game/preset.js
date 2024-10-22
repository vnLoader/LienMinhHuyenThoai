import * as AllSpells from './gameObject/spells/index.js';

export const getChampionPresetRandom = () => {
  return {
    name: 'Random',
    avatar: random([
      'champ_yasuo',
      'champ_lux',
      'champ_blitzcrank',
      'champ_ashe',
      'champ_teemo',
      'champ_leblanc',
      'champ_leesin',
      'champ_chogath',
      'champ_ahri',
      'champ_shaco',
      'champ_olaf',
      'champ_graves',
    ]),
    spells: [
      AllSpells.Heal,
      ...Array.from({ length: 4 })
        .fill(0)
        .map(() => {
          return random(Object.values(AllSpells));
        }),
      AllSpells.Flash,
      AllSpells.Ghost,
    ],
  };
};

export const SpellGroups = [
  {
    name: 'Yasuo',
    image: 'champ_yasuo',
    background: './assets/images/champions/background/yasuo.png',
    spells: [AllSpells.Yasuo_Q, AllSpells.Yasuo_W, AllSpells.Yasuo_E, AllSpells.Yasuo_R],
  },
  {
    name: 'Shaco',
    image: 'champ_shaco',
    background: './assets/images/champions/background/shaco.png',
    spells: [AllSpells.Shaco_Q, AllSpells.Shaco_W, AllSpells.Shaco_E, AllSpells.Shaco_R],
  },
  {
    name: 'Ahri',
    image: 'champ_ahri',
    background: './assets/images/champions/background/ahri.png',
    spells: [AllSpells.Ahri_Q, AllSpells.Ahri_W, AllSpells.Ahri_E, AllSpells.Ahri_R],
  },
  {
    name: 'Lee Sin',
    image: 'champ_leesin',
    background: './assets/images/champions/background/leesin.png',
    spells: [AllSpells.LeeSin_Q, AllSpells.LeeSin_E, AllSpells.LeeSin_R],
  },
  {
    name: 'Blitzcrank',
    image: 'champ_blitzcrank',
    background: './assets/images/champions/background/blitzcrank.png',
    spells: [AllSpells.Blitzcrank_Q, AllSpells.Blitzcrank_W, AllSpells.Blitzcrank_R],
  },
  {
    name: 'Lux',
    image: 'champ_lux',
    background: './assets/images/champions/background/lux.png',
    spells: [AllSpells.Lux_Q, AllSpells.Lux_E, AllSpells.Lux_R],
  },
  {
    name: 'Ashe',
    image: 'champ_ashe',
    background: './assets/images/champions/background/ashe.png',
    spells: [AllSpells.Ashe_W, AllSpells.Ashe_R],
  },
  {
    name: "Cho'Gath",
    image: 'champ_chogath',
    background: './assets/images/champions/background/chogath.png',
    spells: [AllSpells.ChoGath_Q, AllSpells.ChoGath_W],
  },
  {
    name: 'Leblanc',
    image: 'champ_leblanc',
    background: './assets/images/champions/background/leblanc.png',
    spells: [AllSpells.Leblanc_W, AllSpells.Leblanc_E],
  },
  {
    name: 'Malphite',
    image: 'champ_malphite',
    background: './assets/images/champions/background/malphite.png',
    spells: [AllSpells.Malphite_R],
  },
  {
    name: 'Olaf',
    image: 'champ_olaf',
    background: './assets/images/champions/background/olaf.png',
    spells: [AllSpells.Olaf_Q],
  },

  {
    name: 'Teemo',
    image: 'champ_teemo',
    background: './assets/images/champions/background/teemo.png',
    spells: [AllSpells.Teemo_R],
  },
  {
    name: 'Veigar',
    image: 'champ_veigar',
    background: './assets/images/champions/background/veigar.png',
    spells: [AllSpells.Veigar_E],
  },

  {
    name: 'Zed',
    image: 'champ_zed',
    background: './assets/images/champions/background/zed.png',
    spells: [
      AllSpells.Zed_Q,
      AllSpells.Zed_W,
      // AllSpells.Zed_E
    ],
  },
  {
    name: 'Graves',
    image: 'champ_graves',
    background: './assets/images/champions/background/graves.png',
    spells: [AllSpells.Graves_W],
  },
  {
    name: 'Phép Bổ Trợ',
    image: '',
    spells: [AllSpells.Flash, AllSpells.Ghost, AllSpells.Heal, AllSpells.StealthWard],
  },
];

export const MonsterPreset = {
  baron: {
    name: 'Baron',
    avatar: 'monster_Baron_Nashor',
    camp: {
      x: 2147,
      y: 1876,
      r: 100,
    },
    speed: 0,
    size: 100,
    attackRange: 400,
    reviveTime: 3000,
    health: 1000,
  },
  blue1: {
    name: 'Blue',
    avatar: 'monster_Blue_Sentinel',
    camp: {
      x: 1631,
      y: 2958,
      r: 300,
    },
    speed: 2,
    size: 80,
    attackRange: 50,
    reviveTime: 3000,
    health: 300,
  },
  blue2: {
    name: 'Blue',
    avatar: 'monster_Blue_Sentinel',
    camp: {
      x: 4794,
      y: 3419,
      r: 300,
    },
    speed: 2,
    size: 80,
    attackRange: 50,
    reviveTime: 3000,
    health: 300,
  },
  red1: {
    name: 'Red',
    avatar: 'monster_Red_Brambleback',
    camp: {
      x: 3368,
      y: 4698,
      r: 300,
    },
    speed: 2,
    size: 80,
    attackRange: 50,
    reviveTime: 3000,
    health: 300,
  },
  red2: {
    name: 'Red',
    avatar: 'monster_Red_Brambleback',
    camp: {
      x: 3085,
      y: 1672,
      r: 300,
    },
    speed: 2,
    size: 80,
    attackRange: 50,
    reviveTime: 3000,
    health: 300,
  },
  wolf1: {
    name: 'Greater Wolf',
    avatar: 'monster_Greater_Murk_Wolf',
    camp: {
      x: 1685,
      y: 3562,
      r: 300,
    },
    speed: 2,
    size: 70,
    attackRange: 50,
    reviveTime: 3000,
    health: 300,
  },
  wolf1_a: {
    name: 'Wolf',
    avatar: 'monster_Murk_Wolf',
    camp: {
      x: 1602,
      y: 3511,
      r: 300,
    },
    speed: 2.5,
    size: 40,
    attackRange: 50,
    reviveTime: 3000,
    health: 100,
  },
  wolf1_b: {
    name: 'Wolf',
    avatar: 'monster_Murk_Wolf',
    camp: {
      x: 1725,
      y: 3659,
      r: 300,
    },
    speed: 2.5,
    size: 40,
    attackRange: 50,
    reviveTime: 3000,
    health: 100,
  },
  wolf2: {
    name: 'Greater Wolf',
    avatar: 'monster_Greater_Murk_Wolf',
    camp: {
      x: 4728,
      y: 2835,
      r: 300,
    },
    speed: 2,
    size: 70,
    attackRange: 50,
    reviveTime: 3000,
    health: 300,
  },
  wolf2_a: {
    name: 'Wolf',
    avatar: 'monster_Murk_Wolf',
    camp: {
      x: 4709,
      y: 2743,
      r: 300,
    },
    speed: 2.5,
    size: 40,
    attackRange: 50,
    reviveTime: 3000,
    health: 100,
  },
  wolf2_b: {
    name: 'Wolf',
    avatar: 'monster_Murk_Wolf',
    camp: {
      x: 4816,
      y: 2888,
      r: 300,
    },
    speed: 2.5,
    size: 40,
    attackRange: 50,
    reviveTime: 3000,
    health: 100,
  },
  gomp1: {
    name: 'Gromp',
    avatar: 'monster_Gromp',
    camp: {
      x: 914,
      y: 2784,
      r: 300,
    },
    speed: 2,
    size: 70,
    attackRange: 150,
    reviveTime: 3000,
    health: 300,
  },
  gomp2: {
    name: 'Gromp',
    avatar: 'monster_Gromp',
    camp: {
      x: 5540,
      y: 3599,
      r: 300,
    },
    speed: 2,
    size: 70,
    attackRange: 150,
    reviveTime: 3000,
    health: 300,
  },
  raptor1: {
    name: 'Crimson_Raptor',
    avatar: 'monster_Crimson_Raptor',
    camp: {
      x: 2954,
      y: 4110,
      r: 300,
    },
    speed: 2,
    size: 70,
    attackRange: 150,
    reviveTime: 3000,
    health: 300,
  },
  raptor1_a: {
    name: 'Raptor',
    avatar: 'monster_Raptor',
    camp: {
      x: 3045,
      y: 4026,
      r: 300,
    },
    speed: 2,
    size: 40,
    attackRange: 150,
    reviveTime: 3000,
    health: 50,
  },
  raptor1_b: {
    name: 'Raptor',
    avatar: 'monster_Raptor',
    camp: {
      x: 3149,
      y: 4095,
      r: 300,
    },
    speed: 2,
    size: 40,
    attackRange: 150,
    reviveTime: 3000,
    health: 50,
  },
  raptor1_c: {
    name: 'Raptor',
    avatar: 'monster_Raptor',
    camp: {
      x: 3060,
      y: 4169,
      r: 300,
    },
    speed: 2,
    size: 40,
    attackRange: 150,
    reviveTime: 3000,
    health: 50,
  },
  raptor2: {
    name: 'Crimson_Raptor',
    avatar: 'monster_Crimson_Raptor',
    camp: {
      x: 3498,
      y: 2258,
      r: 300,
    },
    speed: 2,
    size: 70,
    attackRange: 150,
    reviveTime: 3000,
    health: 300,
  },
  raptor2_a: {
    name: 'Raptor',
    avatar: 'monster_Raptor',
    camp: {
      x: 3432,
      y: 2356,
      r: 300,
    },
    speed: 2,
    size: 40,
    attackRange: 150,
    reviveTime: 3000,
    health: 50,
  },
  raptor2_b: {
    name: 'Raptor',
    avatar: 'monster_Raptor',
    camp: {
      x: 3307,
      y: 2295,
      r: 300,
    },
    speed: 2,
    size: 40,
    attackRange: 150,
    reviveTime: 3000,
    health: 50,
  },
  raptor2_c: {
    name: 'Raptor',
    avatar: 'monster_Raptor',
    camp: {
      x: 3378,
      y: 2183,
      r: 300,
    },
    speed: 2,
    size: 40,
    attackRange: 150,
    reviveTime: 3000,
    health: 50,
  },
};
