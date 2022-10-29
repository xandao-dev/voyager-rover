const { createRoverModel } = require('../../src/models/rover-model.js');

const roverDummy = { id: 0, pos: { x: 5, y: 5, direction: 'N' } };
const mapMockWithinBounds = {
  rovers: jest.fn(() => []),
  isWithinBounds: jest.fn(() => true),
};
const mapMockOutsideBounds = {
  rovers: jest.fn(() => []),
  isWithinBounds: jest.fn(() => false),
};

const roverMockCollision = {
  id: 1,
  position: jest.fn(() => ({ x: 5, y: 6, direction: 'S' })),
};
const mapMockRoverCollision = {
  rovers: jest.fn(() => [roverMockCollision]),
  isWithinBounds: jest.fn(() => true),
};

describe('createRoverModel', () => {
  describe('happy path', () => {
    it('should return an object with position and sequentialMove methods, and id number', () => {
      const rover = createRoverModel(roverDummy);
      expect(rover).toHaveProperty('id');
      expect(rover).toHaveProperty('position');
      expect(rover).toHaveProperty('sequentialMove');
      expect(typeof rover.id).toBe('number');
      expect(rover.position).toBeInstanceOf(Function);
      expect(rover.sequentialMove).toBeInstanceOf(Function);
    });

    describe('id', () => {
      it('should return the id passed in', () => {
        const rover = createRoverModel(roverDummy);
        expect(rover.id).toBe(0);
      });
    });
    describe('position', () => {
      it('should return the same position object that was passed in', () => {
        const rover = createRoverModel(roverDummy);
        const result = rover.position();
        expect(result).toEqual(roverDummy.pos);
      });
    });
    describe('sequentialMove', () => {
      it('should change the position of the rover by 5 units in the direction it is facing', () => {
        const rover = createRoverModel(roverDummy);
        rover.sequentialMove(mapMockWithinBounds, ['M', 'M', 'M', 'M', 'M']);
        expect(rover.position()).toEqual({ x: 5, y: 10, direction: 'N' });
      });
      it('should change the direction of the rover to the left', () => {
        const rover = createRoverModel(roverDummy);
        rover.sequentialMove(mapMockWithinBounds, ['L']);
        expect(rover.position()).toEqual({ x: 5, y: 5, direction: 'W' });
      });
      it('should change the direction of the rover to the right', () => {
        const rover = createRoverModel(roverDummy);
        rover.sequentialMove(mapMockWithinBounds, ['R']);
        expect(rover.position()).toEqual({ x: 5, y: 5, direction: 'E' });
      });
      it('should not change the position of the rover if it is going to collide with another rover', () => {
        const rover = createRoverModel(roverDummy);
        rover.sequentialMove(mapMockRoverCollision, ['M', 'M']);
        expect(rover.position()).toEqual({ x: 5, y: 5, direction: 'N' });
      });
      it('should not change the position of the rover if it is going to go out of bounds', () => {
        const rover = createRoverModel(roverDummy);
        rover.sequentialMove(mapMockOutsideBounds, ['M', 'R', 'M', 'R', 'M', 'R', 'M', 'R', 'M']);
        expect(rover.position()).toEqual({ x: 5, y: 5, direction: 'N' });
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
    describe('sequentialMove', () => {
      it('should throw an error if no map object is passed in', () => {
        const rover = createRoverModel(roverDummy);
        expect(() => rover.sequentialMove(null, ['M', 'M'])).toThrow();
      });
      it('should throw an error if no array of commands is passed in', () => {
        const rover = createRoverModel(roverDummy);
        expect(() => rover.sequentialMove(mapMockWithinBounds)).toThrow();
      });
      it('should throw an error if the array of commands contains a non-command', () => {
        const rover = createRoverModel(roverDummy);
        expect(() => rover.sequentialMove(mapMockWithinBounds, ['M', 'M', 'M', 'M', 'M', 'X'])).toThrow();
      });
    });
  });
});
