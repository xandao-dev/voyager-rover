const { createPlateauModel } = require('../../src/models/plateau-model.js');

const roverMock = {
  getId: jest.fn(() => 0),
  getPosition: jest.fn(() => ({ x: 5, y: 5, direction: 'N' })),
};

describe('createPlateauModel', () => {
  describe('happy path', () => {
    it('should return an object with isWithinBounds, landRover and getRovers methods', () => {
      const plateau = createPlateauModel({ endX: 10, endY: 10 });
      expect(plateau).toHaveProperty('isWithinBounds');
      expect(plateau).toHaveProperty('getRovers');
      expect(plateau).toHaveProperty('landRover');
      expect(plateau.isWithinBounds).toBeInstanceOf(Function);
      expect(plateau.getRovers).toBeInstanceOf(Function);
      expect(plateau.landRover).toBeInstanceOf(Function);
    });

    describe('isWithinBounds', () => {
      it('should return true when passing x and y arguments within bounds', () => {
        const plateau = createPlateauModel({ endX: 10, endY: 10 });
        const result = plateau.isWithinBounds({ x: 5, y: 5 });
        expect(result).toBe(true);
      });

      it('should return true when passing x and y arguments within bounds, with start coordinates', () => {
        const plateau = createPlateauModel({ startX: 5, startY: 5, endX: 10, endY: 10 });
        const result = plateau.isWithinBounds({ x: 7, y: 7 });
        expect(result).toBe(true);
      });
      it('should return false when passing x and y arguments outside bounds', () => {
        const plateau = createPlateauModel({ startX: 5, startY: 5, endX: 10, endY: 10 });
        const upperResult = plateau.isWithinBounds({ x: 11, y: 11 });
        const lowerResult = plateau.isWithinBounds({ x: 4, y: 4 });
        expect(upperResult).toBe(false);
        expect(lowerResult).toBe(false);
      });
    });
    describe('getRovers', () => {
      it('should start without rovers', () => {
        const plateau = createPlateauModel({ endX: 10, endY: 10 });
        expect(plateau.getRovers()).toHaveLength(0);
      });
    });
    describe('landRover', () => {
      it('should land a rover on the plateau', () => {
        const plateau = createPlateauModel({ endX: 10, endY: 10 });
        plateau.landRover(roverMock);
        expect(plateau.getRovers()).toHaveLength(1);
      });
    });
  });

  describe('unhappy path', () => {
    it('should throw an error when passing non-integer coordinates', () => {
      expect(() => createPlateauModel({ endX: 10.5, endY: 10 })).toThrow();
      expect(() => createPlateauModel({ endX: 10, endY: 10.5 })).toThrow();
      expect(() => createPlateauModel({ endX: 10.5, endY: 10.5 })).toThrow();
      expect(() => createPlateauModel({ endX: 'hello', endY: 'hello' })).toThrow();
      expect(() => createPlateauModel()).toThrow();
    });
    it('should throw an error when passing negative coordinates', () => {
      expect(() => createPlateauModel({ endX: -1, endY: 10 })).toThrow();
      expect(() => createPlateauModel({ endX: 10, endY: -1 })).toThrow();
      expect(() => createPlateauModel({ endX: -1, endY: -1 })).toThrow();
    });
    it('should throw an error when passing start coordinates greater than end coordinates', () => {
      expect(() => createPlateauModel({ startX: 10, startY: 10, endX: 5, endY: 5 })).toThrow();
      expect(() => createPlateauModel({ startX: 10, startY: 5, endX: 5, endY: 10 })).toThrow();
    });
  });
});
