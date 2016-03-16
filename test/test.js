var Tiler = require('../index'),
    fs = require('fs'),
    assert = require('assert');

var tiler = new Tiler(__dirname+'/plain_1.mbtiles', function(error) {
    if (error) {
        throw error;
    }
    fs.readdirSync(__dirname + '/images/').forEach(function(file) {
        var coords = file.match(/^plain_1_(\d+)_(\d+)_(\d+).png$/);
        if (!coords) return;
        // Flip Y coordinate because file names are TMS, but .getTile() expects XYZ.
        coords = [ coords[3], coords[1], coords[2] ];
        coords[2] = Math.pow(2, coords[0]) - 1 - coords[2];
        
        tiler.getTile(coords[1], coords[2], coords[0], function(error, tile) {
            if (error) {
                throw error;
            }
            assert.ok(tile);
            assert.deepEqual(tile.data, fs.readFileSync(__dirname + '/images/' + file));
            assert.ok(!isNaN(Date.parse(tile.lastModified)));            
        });
    })
});

