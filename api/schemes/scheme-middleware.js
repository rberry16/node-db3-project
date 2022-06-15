const Scheme = require('./scheme-model');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const isExisting = await Scheme.findById(req.params.scheme_id);
  if(!isExisting) {
    res.status(404).json({message: `scheme with scheme_id ${req.params.scheme_id} not found`});
  } else {
    next();
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const sc = req.body.scheme_name;
  if(!sc || sc === undefined || typeof sc !== 'string') {
    res.status(400).json({message: 'invalid scheme_name'});
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const inst = req.body.instructions;
  const st = Number(req.body.step_number);
  if (!inst || inst === undefined || typeof inst !== 'string' || isNaN(st) || st < 1 || !st || st === undefined) {
    res.status(400).json({message: 'invalid step'});
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
