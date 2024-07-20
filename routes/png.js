import initRDKitModule from "@rdkit/rdkit";
import express from 'express';
import {Resvg} from '@resvg/resvg-js';
import fs  from 'fs';

var pngR = express.Router();
let rdkit = await initRDKitModule();
/* GET users listing. */
pngR.get('/', function(req, res, next) {
  let error_found = true;
  console.log( req.query);
  let data = req.query.smiles; //"CC(=O)Oc1ccccc1C(=O)O";
  if( data)
  {
    let buff = Buffer.from(data, 'base64');
    let mol = rdkit.get_mol(buff.toString('utf-8'));
    if( mol )
    { 
      let svg = mol.get_svg();
      if( svg)
      {
        const opts = { 
          fitTo: {
            background: 'rgba(238, 235, 230, .9)',
            mode: 'width',
            value: '600'
          }
        };
        let _resvg = new Resvg(svg, opts)
        let pngdata  = _resvg.render().asPng();
        res.removeHeader("Content-Type");
        res.appendHeader("Content-Type", "image/png");
        res.send(pngdata);
        error_found = false;
      }
    }
  }
  if( error_found)
  {
    res.sendStatus(401).send("Wrong data");
  }
});

pngR.post('/', async function(req, res, next) {
  let error_found = true;
  let data = req.body.smiles; //"CC(=O)Oc1ccccc1C(=O)O";
  if( data)
  {
    let buff = Buffer.from(data, 'base64');
    let mol = rdkit.get_mol(buff.toString('utf-8'));
    if( mol )
    { 
      let svg= mol.get_svg();
      if( svg)
      {
        const opts = { 
          fitTo: {
            background: 'rgba(238, 235, 230, .9)',
            mode: 'width',
            value: '600'
          }
        };
        let _resvg = new Resvg(svg, opts)
        let pngdata  = _resvg.render().asPng();
        res.removeHeader("Content-Type");
        res.appendHeader("Content-Type", "image/png");
        res.send(pngdata);
        error_found = false;
      }
    }
  }
  if( error_found)
  {
    res.sendStatus(401).send("Wrong data");
  }
});

export default pngR;