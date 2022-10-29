const { ValidationError } = require('../errors/validation-error.js');

function createPlateauModel({ startX = 0, startY = 0, endX, endY } = {}) {
  const bounds = { startX, startY, endX, endY };
  const rovers = [];

  if ([startX, startY, endX, endY].some((coord) => !Number.isInteger(coord))) {
    throw new ValidationError('Plateau coordinates must be integers');
  }
  if ([startX, startY, endX, endY].some((coord) => coord < 0)) {
    throw new ValidationError('Plateau coordinates must be zero or greater');
  }
  if (startX > endX || startY > endY) {
    throw new ValidationError('Plateau start coordinates must be less than end coordinates');
  }

  const isWithinBounds = ({ x, y }) => {
    const xWithinBounds = x >= bounds.startX && x <= bounds.endX;
    const yWithinBounds = y >= bounds.startY && y <= bounds.endY;
    return xWithinBounds && yWithinBounds;
  };

  const landRover = (rover) => rovers.push(rover);

  return {
    isWithinBounds,
    landRover,
    rovers,
  };
}

module.exports = { createPlateauModel };
