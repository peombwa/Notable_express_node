var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get("/notes/:id", (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectId(id) };
        db.collection("notes").findOne(details, (err, item) => {
            if (err){
                req.send({'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        });
    });

    app.delete("/notes/:id", (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectId(id) };
        db.collection("notes").remove(details, (err, item) => {
            if (err){
                req.send({'error': 'An error has occured'});
            } else {
                res.send('Note '+id+ ' deleted');
            }
        });
    });

    app.put("/notes/:id", (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectId(id) };
        const note = {text: req.body.body, title : req.body.title };
        db.collection("notes").update(details,note, (err, item) => {
            if (err){
                req.send({'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        });
    });

    app.post("/notes", (req, res) => {
        const note = {text: req.body.body, title : req.body.title };
        db.collection("notes").insert(note, (err, results) => {
            if (err) {
                res.send({"error": "An error has occured"});
            } else {
                res.send(results.ops[0]);
            }
        });
    });
}