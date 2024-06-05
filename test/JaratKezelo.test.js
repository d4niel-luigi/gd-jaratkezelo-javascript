// test/JaratKezelo.test.js
import { describe, it, expect } from 'vitest';
import JaratKezelo from '../src/JaratKezelo.js';

describe('JaratKezelo', () => {
  it('should create a new flight', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('123', 'BUD', 'JFK', new Date('2024-06-05T10:00:00'));
    expect(jk.jaratok.has('123')).toBe(true);
  });

  it('should not allow duplicate flight numbers', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('123', 'BUD', 'JFK', new Date('2024-06-05T10:00:00'));
    expect(() => jk.ujJarat('123', 'BUD', 'LAX', new Date('2024-06-05T12:00:00'))).toThrow('A járatszám már létezik.');
  });

  it('should add delay to a flight', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('123', 'BUD', 'JFK', new Date('2024-06-05T10:00:00'));
    jk.keses('123', 30);
    expect(jk.jaratok.get('123').keses).toBe(30);
  });

  it('should calculate the correct departure time with delay', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('123', 'BUD', 'JFK', new Date('2024-06-05T10:00:00'));
    jk.keses('123', 30);
    const actualDeparture = jk.mikorIndul('123');
    expect(actualDeparture).toEqual(new Date('2024-06-05T10:30:00'));
  });

  it('should return flights from a specific airport', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('123', 'BUD', 'JFK', new Date('2024-06-05T10:00:00'));
    jk.ujJarat('124', 'BUD', 'LAX', new Date('2024-06-05T12:00:00'));
    jk.ujJarat('125', 'JFK', 'LAX', new Date('2024-06-05T14:00:00'));
    const flightsFromBud = jk.jaratokRepuloterrol('BUD');
    expect(flightsFromBud).toEqual(['123', '124']);
  });

  it('should throw an error if flight does not exist', () => {
    const jk = new JaratKezelo();
    expect(() => jk.keses('999', 30)).toThrow('Nem létező járat.');
  });

  it('should throw an error if negative delay results in negative total delay', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('123', 'BUD', 'JFK', new Date('2024-06-05T10:00:00'));
    jk.keses('123', 30);
    expect(() => jk.keses('123', -40)).toThrow('NegativKesesException');
  });
});
