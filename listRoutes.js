const express = require('express');
const app = require('./app'); // لو ملف تشغيلك اسمه app.js

const listEndpoints = require('express-list-endpoints');

console.log(listEndpoints(app));
