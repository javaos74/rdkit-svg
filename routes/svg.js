import initRDKitModule from "@rdkit/rdkit";
import express from 'express';
import fs  from 'fs';
var svg = express.Router();
/* GET users listing. */
svg.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
let error_found = true;
svg.post('/', async function(req, res, next) {
  let rdkit = await initRDKitModule();
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

export default svg;