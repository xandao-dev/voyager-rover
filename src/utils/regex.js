const plateauSizeRegex = /^\d+\s\d+$/;
const roverCommandsRegex = /^[LRM]+$/;
const roverPositionRegex = /^\d+\s\d+\s[NSEW]+$/;

module.exports = { plateauSizeRegex, roverCommandsRegex, roverPositionRegex };
