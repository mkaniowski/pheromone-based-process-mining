### README

# Pheromone-based Process Mining

## Introduction
"Pheromone-based Process Mining" is an application designed to analyze business processes using an algorithm inspired by pheromone behavior. Implemented in TypeScript with React and Vite, this tool provides a fast and efficient way to visualize and explore process paths.

## Features
- **Data Import**: Import business process logs in various formats.
- **Process Visualization**: Graphical representation of process paths and their usage intensity.
- **Pheromone Analysis**: Identify frequently used paths using pheromone-based algorithms.
- **Interactive Elements**: Interactively explore, filter, and zoom in on specific process parts.

## Technologies
- **TypeScript**: Main programming language.
- **React**: For building the user interface.
- **Vite**: For fast build times and hot module replacement.

## Pheromone Algorithm
The pheromone algorithm simulates ant behavior by:
- **Ant Simulation**: Virtual "ants" travel through the process graph, leaving a pheromone trail indicating frequently traveled paths.
- **Path Reinforcement**: Paths frequently chosen by ants accumulate more pheromones, attracting more ants to these optimal routes.
- **Pheromone Evaporation**: Over time, pheromones evaporate, allowing the algorithm to adapt dynamically to process changes.

## Project Structure
- **public**: Contains public files like `index.html`.
- **src**: Main source directory with React components, configurations, and application logic.
- **config**: Configuration files for tools like ESLint and Prettier.

## Getting Started
### Prerequisites
- Node.js
- npm or yarn

### Installation
```bash
git clone https://github.com/mkaniowski/pheromone-based-process-mining.git
cd pheromone-based-process-mining
pnpm install
```

### Running the Application
```bash
pnpm start
```

### Building for Production
```bash
pnpm run build
```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, please open an issue on the GitHub repository.

---

Link to the repository: [Pheromone-based Process Mining](https://github.com/mkaniowski/pheromone-based-process-mining)
