const { cardinalDirections, cardinalDirectionsDegrees } = require('../utils/constants.js');
const { getKeyByValue } = require('../utils/helpers.js');

function createRover({ x, y, direction }) {
  const getPosition = () => ({ x, y, direction });

  const estimateForwardPosition = () => {
    switch (direction) {
      case cardinalDirections.NORTH:
        return { x, y: y + 1 };
      case cardinalDirections.EAST:
        return { x: x + 1, y };
      case cardinalDirections.SOUTH:
        return { x, y: y - 1 };
      case cardinalDirections.WEST:
        return { x: x - 1, y };
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
  };

  const moveForward = (map) => {
    const forwardPosition = estimateForwardPosition();
    if (!map.isWithinBounds(forwardPosition)) {
      throw new Error('Rover cannot move outside the plateau');
    }
    x = forwardPosition.x;
    y = forwardPosition.y;
  };

  const rotateTo = (directionCommand) => {
    let newDirectionDegree = cardinalDirectionsDegrees[direction];
    if (directionCommand === 'L') {
      newDirectionDegree -= 90;
    } else if (directionCommand === 'R') {
      newDirectionDegree += 90;
    }
    if (newDirectionDegree < 0) {
      newDirectionDegree += 360;
    } else if (newDirectionDegree >= 360) {
      newDirectionDegree -= 360;
    }
    direction = getKeyByValue(cardinalDirectionsDegrees, newDirectionDegree);
  };

  const move = (map, command) => {
    if (command === 'M') {
      moveForward(map);
    } else {
      rotateTo(command);
    }
  };

  return {
    position: getPosition,
    moveForward,
    rotateTo,
    move,
  };
}

module.exports = { createRover };
