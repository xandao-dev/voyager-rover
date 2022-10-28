const roverCommands = {
  TURN_LEFT: 'L',
  TURN_RIGHT: 'R',
  FORWARD: 'M',
};
const cardinalDirections = {
  NORTH: 'N',
  EAST: 'E',
  SOUTH: 'S',
  WEST: 'W',
};

const cardinalDirectionsDegrees = {
  [cardinalDirections.NORTH]: 0,
  [cardinalDirections.EAST]: 90,
  [cardinalDirections.SOUTH]: 180,
  [cardinalDirections.WEST]: 270,
};

module.exports = { roverCommands, cardinalDirections, cardinalDirectionsDegrees };
