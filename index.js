var MBTiles = require('mbtiles');

/**
 * Constructor for the tiler-mbtiles
 * 
 * @param {String} path - the path of the mbtiles file
 * @class
 */
function tiler(path) {
    this.ready = false;
    var me = this;
    this._mbtiles = new MBTiles(path, function(error) {
        if (error) {
            throw error;
        }
        me.ready = true;          
    });
}

/**
 * Get a tile, Schema is XYZ.
 * Structure of the result tile is :
 * {
 *  lastModified : {Date} Time when tile file last modified
 *  data         : {Buffer}
 * }
 * @param {Number} x - tile x coordinate.
 * @param {Number} x - tile x coordinate.
 * @param {Number} x - tile x coordinate.
 * @param {Function(error, tile)} callback - tile x coordinate.
 * @return  {Object} tile data.
 */
tiler.prototype.getTile=function(x,y,z, callback) {
    if (!this.ready) {
        callback(new Error('The tiler is not ready yet.'));
        return;
    }    
    var tile = this._mbtiles.getTile(z, x, y, function(error, tile, headers) {
        if (error) {
            callback(error);
            return;            
        } 
        callback(null, {
          'lastModified' :  header['Last-Modified'],
          'data'         :  tile
        });
    });
}

exports = module.exports = tiler;