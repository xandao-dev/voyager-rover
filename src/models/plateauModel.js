function createPlateau({ startX, startY, endX, endY }) {
  return {
    startX,
    startY,
    endX,
    endY,
    isWithinBounds: ({ x, y }) => x >= startX && x <= endX && y >= startY && y <= endY,
    rovers: [],
  };
}

module.exports = { createPlateau };
