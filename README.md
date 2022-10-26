<br />
<p align="center">
  <h3 align="center">Voyager Rover</h3>

  <p align="center">
    A fictional calculator of final coordinates of a squadron of robotic rovers that landed by NASA on a plateau on Mars.
    <br />
    <a href="https://github.com/xandao-dev/voyager-rover"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/xandao-dev/voyager-rover/issues">Report Bug</a>
    ·
    <a href="https://github.com/xandao-dev/voyager-rover/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#business-rules">Business Rules</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#usage">Debug</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Mars Rover in JavaScript

&nbsp;&nbsp;&nbsp;&nbsp; A squad of robotic rovers are to be landed by NASA on a plateau on Mars. <br />

&nbsp;&nbsp;&nbsp;&nbsp; This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth. <br />

&nbsp;&nbsp;&nbsp;&nbsp; A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North. <br />

&nbsp;&nbsp;&nbsp;&nbsp; In order to control a rover , NASA sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading. <br />

&nbsp;&nbsp;&nbsp;&nbsp; Assume that the square directly North from (x, y) is (x, y 1).

### Input

&nbsp;&nbsp;&nbsp;&nbsp;The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0. <br />

&nbsp;&nbsp;&nbsp;&nbsp;The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover’s position, and the second line is a series of instructions telling the rover how to explore the plateau. <br />

&nbsp;&nbsp;&nbsp;&nbsp;The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover’s orientation. <br />

&nbsp;&nbsp;&nbsp;&nbsp;Each rover will be finished sequentially, which means that the second rover won’t start to move until the first one has finished moving.

### Output

&nbsp;&nbsp;&nbsp;&nbsp;The output for each rover should be its final co-ordinates and heading.

### Rover Data Example

Example 1

```
Landing Position: 1 2 N \
Instruction: LMLMLMLMM \
Final Position: 1 3 N
```

Example 2

```
Landing Position: 3 3 E \
Instruction: MRRMMRMRRM \
Final Position: 2 3 S
```

### Features

-

### Built With

- [Node.js](https://nodejs.org/) - a JavaScript runtime built on Chrome's V8 JavaScript engine
- [eslint](https://github.com/eslint/eslint) with [AirBnB config](https://github.com/iamturns/eslint-config-airbnb-typescript) - code quality linter with the opinionated AirBnB config
- [prettier](https://github.com/prettier/prettier) and [eslint config](https://github.com/prettier/eslint-config-prettier) - formatter linter with eslint integration
- [nodemon](https://nodemon.io/) - transpile TS and hot reload your app
- [docker](https://www.docker.com/) - OS-level virtualization to deliver software in containers
- [docker compose](https://docs.docker.com/compose/) - use a YAML file to configure your application’s services

### Business Rules

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/xandao-dev/voyager-rover.git
   ```
2. [Install Docker Engine](https://docs.docker.com/engine/install/)
3. [Install Docker Compose](https://docs.docker.com/compose/install/)

<!-- USAGE EXAMPLES -->

## Usage

- Run the app
  ```sh
  docker compose run --rm voyager-rover
  ```

## Debug

- Run the app in debug mode

  ```sh
  docker compose -f docker-compose.debug.yml run --rm voyager-rover
  ```

- Execute the debug config in VSCode

## Roadmap

See the [open issues](https://github.com/xandao-dev/voyager-rover/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Voyage Rover uses [Conventional Commits](www.conventionalcommits.org)!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](./LICENSE.md) for more information.

Free software =)

## Contact

Alexandre Calil - [Linkedin](https://www.linkedin.com/in/xandao-dev/) - [alexandre@xandao.dev](mailto:alexandre@xandao.dev)

Project Link: [https://github.com/xandao-dev/voyager-rover](https://github.com/xandao-dev/voyager-rover)
