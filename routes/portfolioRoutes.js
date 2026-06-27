const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "L'API fonctionne !" });
});

module.exports = router;