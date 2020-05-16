const C = {
  h: `${50 / 16}vh`,
  H: `calc(${50 / 8}vh - calc(calc(${50 / 16}vh + 36px) / 8))`,
  blue: (index = 0) => {
    const light = '#3987B8';
    const med = '#1479B8';
    const dark = '#164B6B';
    return [light, med, dark][index];
  },
  cyan: (index = 0) => {
    const light = '#36E7FF';
    const med = '#16B0C4';
    const dark = '#076B78';
    return [light, med, dark][index];
  },
  gray: (index = 0) => {
    const light = 'rgba(255,255,255,.69)';
    const med = 'rgba(255,255,255,.42)';
    const dark = '#191e26';
    return [light, med, dark][index];
  },
  red: (index = 0) => {
    const light = '#FF191D';
    const med = '#CC0105';
    const dark = '#800002';
    return [light, med, dark][index];
  },
  green: (index = 0) => {
    const light = '#4FFFB3';
    const med = '#34F7A1';
    const dark = '#13AB69';
    return [light, med, dark][index];
  },
  pink: (index = 0) => {
    const light = '#FF1990';
    const med = '#C70066';
    const dark = '#7A003F';
    return [light, med, dark][index];
  },
  orange: (index = 0) => {
    const light = '#FF7621';
    const med = '#C74F06';
    const dark = '#7A2F00';
    return [light, med, dark][index];
  }
};

export default C;
