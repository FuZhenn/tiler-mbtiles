# tiler-mbtiles
[![Circle CI](https://circleci.com/gh/FuZhenn/tiler-mbtiles.svg?style=svg)](https://circleci.com/gh/FuZhenn/tiler-mbtiles)

A nodejs map tile reader for mapbox mbtiles format.

## Introduction

This is a map tile file reader for mapbox's mbtiles in XYZ schema.

[This link](https://github.com/mapbox/mbtiles-spec) introduces what is mbtiles.

Developed based on mapbox's [node-mbtiles](https://github.com/mapbox/node-mbtiles)

The test is based on the [test materials](https://github.com/mapbox/node-mbtiles/tree/master/test/fixtures) from node-mbtiles.

## See Also
[tiler-xyz](https://github.com/FuZhenn/tiler-xyz):
A nodejs map tile file reader coordinating by X,Y,Z

[tiler-arcgis-xyz](https://github.com/FuZhenn/tiler-arcgis-xyz):
A nodejs map tile reader for exploded tiles by ESRI ArcGIS

[tiler-arcgis-compact](https://github.com/FuZhenn/tiler-arcgis-compact):
A nodejs map tile reader for compact tiles by ESRI ArcGIS

## Install

```bash
npm install tiler-mbtiles
```

## Usage

```javascript
var Tiler = require('tiler-mbtiles');
//path of the mbtiles file
//because it needs time to load mbtiles, the callback will be called when the tiler is ready
var tiler = new Tiler(__dirname+'/test/plain_1.mbtiles', function(error) {
    if (error) {
        throw error;
    }
    tiler.getTile(0, 0, 1, function(error, tile) {
        if (error) {
            throw error;
        }
        assert.ok(tile);        
        assert.ok(!isNaN(Date.parse(tile.lastModified)));
        fs.writeFileSync('1_0_0.png', tile.data);            
    });
});

//An error will be thrown because the tiler is not ready.
//tiler.getTile(..)
```