const express = require('express');

const User = require('../models/user');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authentic = require('../config');

const router = express.Router();

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {

        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Usúario ja existe npo banco' });

        const user = await User.create(req.body);

        user.password = undefined;
        return res.send({ user });

    } catch (error) {
        return res.status(400).send({ error: 'Registration failide' });
    }

});

router.post('/authenticate', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'Não foi possivel localizar o usúario' });

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Senha invalida' });

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authentic.secr, { expiresId: 86400, });

    res.send({ user, token });

});

module.exports = app => app.use('/auth', router);