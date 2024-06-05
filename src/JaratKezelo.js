class JaratKezelo {
  constructor() {
    this.jaratok = new Map();
  }

  ujJarat(jaratSzam, repterHonnan, repterHova, indulas) {
    if (this.jaratok.has(jaratSzam)) {
      throw new Error('A járatszám már létezik.');
    }
    this.jaratok.set(jaratSzam, {
      repterHonnan,
      repterHova,
      indulas,
      keses: 0
    });
  }

  keses(jaratSzam, keses) {
    if (!this.jaratok.has(jaratSzam)) {
      throw new Error('Nem létező járat.');
    }
    const jarat = this.jaratok.get(jaratSzam);
    jarat.keses += keses;
    if (jarat.keses < 0) {
      jarat.keses = 0;
      throw new Error('NegativKesesException');
    }
  }

  mikorIndul(jaratSzam) {
    if (!this.jaratok.has(jaratSzam)) {
      throw new Error('Nem létező járat.');
    }
    const jarat = this.jaratok.get(jaratSzam);
    const indulas = new Date(jarat.indulas);
    indulas.setMinutes(indulas.getMinutes() + jarat.keses);
    return indulas;
  }

  jaratokRepuloterrol(repter) {
    const jaratok = [];
    this.jaratok.forEach((jarat, jaratSzam) => {
      if (jarat.repterHonnan === repter) {
        jaratok.push(jaratSzam);
      }
    });
    return jaratok;
  }
}

export default JaratKezelo;