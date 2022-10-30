const { createRoverModel } = require('../../src/models/rover-model.js');

const roverDummy = { id: 0, pos: { x: 5, y: 5, direction: 'N' } };
const roverMockCollision = {
  getId: jest.fn(() => 1),
  getPosition: jest.fn(() => ({ x: 5, y: 6, direction: 'S' })),
  sequentialMove: jest.fn(),
};

const plateauMockWithinBounds = {
  getRovers: jest.fn(() => []),
  isWithinBounds: jest.fn(() => true),
};
const plateauMockOutsideBounds = {
  getRovers: jest.fn(() => []),
  isWithinBounds: jest.fn(({ x, y }) => x === 5 && y === 5),
};
const plateauMockRoverCollision = {
  getRovers: jest.fn(() => [roverMockCollision]),
  isWithinBounds: jest.fn(() => true),
};

describe('createRoverModel', () => {
  describe('happy path', () => {
    it('should return an object with getId, getPosition and sequentialMove methods', () => {
      const rover = createRoverModel(roverDummy, plateauMockWithinBounds);
      expect(rover).toHaveProperty('getId');
      expect(rover).toHaveProperty('getPosition');
      expect(rover).toHaveProperty('sequentialMove');
      expect(rover.getId).toBeInstanceOf(Function);
      expect(rover.getPosition).toBeInstanceOf(Function);
      expect(rover.sequentialMove).toBeInstanceOf(Function);
    });
    describe('getId', () => {
      it('should return the id passed in', () => {
        const rover = createRoverModel(roverDummy, plateauMockWithinBounds);
        expect(rover.getId()).toBe(0);
      });
    });
    describe('getPosition', () => {
      it('should return the same position object that was passed in', () => {
        const rover = createRoverModel(roverDummy, plateauMockWithinBounds);
        const result = rover.getPosition();
        expect(result).toEqual(roverDummy.pos);
      });
    });
    describe('sequentialMove', () => {
      it('should change the position of the rover by 5 units in the direction it is facing', () => {
        const rover = createRoverModel(roverDummy, plateauMockWithinBounds);
        rover.sequentialMove(['M', 'M', 'M', 'M', 'M']);
        expect(rover.getPosition()).toEqual({ x: 5, y: 10, direction: 'N' });
      });
      it('should change the direction of the rover to the left', () => {
        const rover = createRoverModel(roverDummy, plateauMockWithinBounds);
        rover.sequentialMove(['L']);
        expect(rover.getPosition()).toEqual({ x: 5, y: 5, direction: 'W' });
      });
      it('should change the direction of the rover to the right', () => {
        const rover = createRoverModel(roverDummy, plateauMockWithinBounds);
        rover.sequentialMove(['R']);
        expect(rover.getPosition()).toEqual({ x: 5, y: 5, direction: 'E' });
      });
      it('should not change the position of the rover if it is going to collide with another rover', () => {
        const rover = createRoverModel(roverDummy, plateauMockRoverCollision);
        rover.sequentialMove(['M', 'M']);
        expect(rover.getPosition()).toEqual({ x: 5, y: 5, direction: 'N' });
      });
      it('should not change the position of the rover if it is going to go out of bounds', () => {
        const rover = createRoverModel(roverDummy, plateauMockOutsideBounds);
        rover.sequentialMove(['M', 'R', 'M', 'R', 'M', 'R', 'M', 'R', 'M']);
        expect(rover.getPosition()).toEqual({ x: 5, y: 5, direction: 'N' });
      });
    });
  });
  describe('unhappy path', () => {
    it('should throw an error if no rover object is passed in', () => {
      expect(() => createRoverModel()).toThrow();
    });
    it('should throw an error when passing non-integer or negative id', () => {
      expect(() => createRoverModel({ id: '0', pos: { x: 5, y: 5, direction: 'N' } })).toThrow();
      expect(() => createRoverModel({ id: -1, pos: { x: 5, y: 5, direction: 'N' } })).toThrow();
    });
    it('should throw an error when passing non-object position', () => {
      expect(() => createRoverModel({ id: 0, pos: '5 5 N' })).toThrow();
    });
    it('should throw an error when passing non-integer or negative x position', () => {
      expect(() => createRoverModel({ id: 0, pos: { x: '5', y: 5, direction: 'N' } })).toThrow();
      expect(() => createRoverModel({ id: 0, pos: { x: 5, y: '5', direction: 'N' } })).toThrow();
      expect(() => createRoverModel({ id: 0, pos: { x: '5', y: '5', direction: 'N' } })).toThrow();
      expect(() => createRoverModel({ id: 0, pos: { x: -5, y: 5, direction: 'N' } })).toThrow();
      expect(() => createRoverModel({ id: 0, pos: { x: 5, y: -5, direction: 'N' } })).toThrow();
      expect(() => createRoverModel({ id: 0, pos: { x: -5, y: -5, direction: 'N' } })).toThrow();
    });
    it('should throw an error when passing a non-cardinal direction', () => {
      expect(() => createRoverModel({ id: 0, pos: { x: 5, y: 5, direction: 0 } })).toThrow();
      expect(() => createRoverModel({ id: 0, pos: { x: 5, y: 5, direction: '0' } })).toThrow();
      expect(() => createRoverModel({ id: 0, pos: { x: 5, y: 5, direction: 'X' } })).toThrow();
    });
    it('should throw an error if no plateau object is passed in', () => {
      expect(() => createRoverModel(roverDummy)).toThrow();
    });
    it('should throw an error if landing position is out of bounds', () => {
      const roverDummyOutsideBounds = { id: 0, pos: { x: 6, y: 6, direction: 'N' } };
      expect(() => createRoverModel(roverDummyOutsideBounds, plateauMockOutsideBounds)).toThrow();
    });
    it('should throw an error if landing position is on top of another rover', () => {
      const rover = { id: 0, pos: { x: 5, y: 6, direction: 'N' } };
      expect(() => createRoverModel(rover, plateauMockRoverCollision)).toThrow();
    });
    describe('sequentialMove', () => {
      it('should throw an error if no array of commands is passed in', () => {
        const rover = createRoverModel(roverDummy, plateauMockWithinBounds);
        expect(() => rover.sequentialMove()).toThrow();
      });
      it('should throw an error if the array of commands contains a non-command', () => {
        const rover = createRoverModel(roverDummy, plateauMockWithinBounds);
        expect(() => rover.sequentialMove(['M', 'M', 'M', 'M', 'M', 'X'])).toThrow();
      });
    });
  });
});
