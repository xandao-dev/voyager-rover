const { ValidationError } = require('../errors/validation-error.js');

function createPlateauModel({ startX = 0, startY = 0, endX, endY } = {}) {
  const bounds = { startX, startY, endX, endY };
  const rovers = [];

  validatePlateauCoordinates(startX, startY, endX, endY);

  const isWithinBounds = ({ x, y }) => {
    const xWithinBounds = x >= bounds.startX && x <= bounds.endX;
    const yWithinBounds = y >= bounds.startY && y <= bounds.endY;
    return xWithinBounds && yWithinBounds;
  };

  const landRover = (rover) => {
    const { x, y } = rover.position();
    if (!isWithinBounds({ x, y })) {
      throw new RangeError('Rover cannot be landed outside plateau bounds');
    }
    rovers.push(rover);
  };

  const getRovers = () => rovers;

  return {
    isWithinBounds,
    landRover,
    rovers: getRovers,
  };
}

function validatePlateauCoordinates(startX, startY, endX, endY) {
  if ([startX, startY, endX, endY].some((coord) => !Number.isInteger(coord))) {
    throw new ValidationError('Plateau coordinates must be integers');
  }
  if ([startX, startY, endX, endY].some((coord) => coord < 0)) {
    throw new ValidationError('Plateau coordinates must be zero or greater');
  }
  if (startX > endX || startY > endY) {
    throw new ValidationError('Plateau start coordinates must be less than end coordinates');
  }
}

module.exports = { createPlateauModel };
