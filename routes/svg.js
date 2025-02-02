import initRDKitModule from "@rdkit/rdkit";
import express from 'express';
import fs  from 'fs';
var svgR = express.Router();
let rdkit = await initRDKitModule();
/* GET users listing. */
svgR.get('/', function(req, res, next) {
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
        res.removeHeader("Content-Type");
        res.appendHeader("Content-Type", "image/svg+xml");
        res.send(svg);
        error_found = false;
      }
    }
  }
  if( error_found)
  {
    res.sendStatus(401).send("Wrong data");
  }
});

svgR.post('/', async function(req, res, next) {
  let error_found = true;
  let data = req.body.smiles; //"CC(=O)Oc1ccccc1C(=O)O";
  if( data)
  {
    let buff = Buffer.from(data, 'base64');
    let mol = rdkit.get_mol(buff.toString('utf-8'));
    if( mol )
    { 
      let svg = mol.get_svg();
      if( svg)
      {
        res.removeHeader("Content-Type");
        res.appendHeader("Content-Type", "image/svg+xml");
        res.send(svg);
        error_found = false;
      }
    }
  }
  if( error_found)
  {
    res.sendStatus(401).send("Wrong data");
  }
});

export default svgR;