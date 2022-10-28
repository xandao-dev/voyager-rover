const types = {
  integer: (value) => parseInt(value, 10),
  string: (value) => String(value),
};

const plateauSizeTypes = [types.integer, types.integer];
const roverCommandsTypes = [types.string];
const roverPositionTypes = [types.integer, types.integer, types.string];

module.exports = { plateauSizeTypes, roverCommandsTypes, roverPositionTypes };
