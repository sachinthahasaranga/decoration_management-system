const router = require('express').Router();
let decoAppoiment_Schema = require('../models/decoAppoiment');

router.route('/adddecoAppoiment').post((req, res) => {
    const { code, store, phoneNo, name, date, message, category, selection } = req.body;
    const decoAppoiment = new decoAppoiment_Schema({ code, store, phoneNo, name, date, message, category, selection });
    decoAppoiment.save()
        .then(() => res.json('Decorate Appoiment  Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/alldecoAppoiment").get(async (req, res) => {
    decoAppoiment_Schema.find()
        .then(decoAppoiment => res.json(decoAppoiment))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;