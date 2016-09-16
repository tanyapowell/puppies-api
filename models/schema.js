var promise = require('bluebird');

var options = {
    // Init options
    promiseLib: promise
};

var pgPromise = require('pg-promise')(options);
pgPromise.pg.defaults.ssl = true;

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/puppies';
var db = pgPromise(connectionString);

console.log(connectionString);

function getAllPuppies(req, res, next) {
    db.any('select * from pups')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all puppies'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getSinglePuppy(req, res, next) {
    var pupID = parseInt(req.params.id);

    db.one('select * from pups where id = $1', pupID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one puppy'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function createPuppy(req, res, next) {
    req.body.age = parseInt(req.body.age);

    db.none('insert into pups(name, breed, age, sex)' +
            'values(${name}, ${breed}, ${age}, ${sex})',
            req.body)
        .then(function() {
            res.status(201)
                .json({
                    status: 'success',
                    message: 'inserted one puppy'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function updatePuppy(req, res, next) {
    db.result('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5', [req.body.name, req.body.breed, parseInt(req.body.age), req.body.sex,
            parseInt(req.body.id)
        ])
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: `updated ${result.rowCount} puppy`
                })
        })
}

function removePuppy(req, res, next) {
    var pupID = parseInt(req.params.id);

    db.result('delete from pups where id = $1', pupID)
        .then(function(result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} puppy`
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

module.exports = {
    getAllPuppies: getAllPuppies,
    getSinglePuppy: getSinglePuppy,
    createPuppy: createPuppy,
    updatePuppy: updatePuppy,
    removePuppy: removePuppy
};
