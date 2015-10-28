import {BlockGrid} from './grid.js';

// Move window usage from grid for better testing
window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());