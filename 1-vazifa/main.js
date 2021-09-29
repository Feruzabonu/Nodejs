const EKUB = require('./ekub');
const EKUK = require('./ekuk');

const ekub = new EKUB(76,16);
const ekuk = new EKUK(76,16,ekub.ekub());

console.log(ekub.ekub(), ekuk.ekuk())
