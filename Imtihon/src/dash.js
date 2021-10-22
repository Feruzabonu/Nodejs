const fs = require("fs").promises;
const path = require("path");

const statistic = fs.readFile(path.join(__dirname, "../", "db.json"));

console.table(statistic);