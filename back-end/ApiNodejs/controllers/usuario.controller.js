var personalModule = require('../models/personal.models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');
const { promisify } = require('util');