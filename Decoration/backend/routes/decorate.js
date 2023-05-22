const router = require('express').Router();
let decorate_Schema = require('../models/decorate');

router.route('/adddecorate').post((req, res) => {
    const { code, store, address, phoneNo, email, descrip, picture, category } = req.body;
    const decorate = new decorate_Schema({ code, store, address, phoneNo, email, descrip, picture, category });
    decorate.save()
        .then(() => res.json('Decorate Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatedecorate/").put(async (req, res) => {
    const { code, store, address, phoneNo, email, descrip, picture, category } = req.body;

    const decorate = {
        code, store, address, phoneNo, email, descrip, picture, category
    }
    const update = await decorate_Schema.findOneAndUpdate({ code: code }, decorate).then(() => {
        res.status(200).send({ status: "Decorate Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deletedecorate/:code").delete(async (req, res) => {
    let code = req.params.code;
    decorate_Schema.findOneAndDelete({ code: code })
        .then(() => {
            res.status(200).send({ status: "Decorate Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/alldecorate").get(async (req, res) => {
    decorate_Schema.find()
        .then(decorate => res.json(decorate))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;