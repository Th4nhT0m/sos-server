const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const numberPhone = (value, helpers) => {
  if(value.length !== 10){
      return helpers.message('Number Phone must be at 10 number');
  }
  if(value.toLowerCase() !== value.toUpperCase()){
    return helpers.message('Enter only numbers, no characters');
  }
  return value;
}

const identityCard = (value, helpers) => {
  if(value.length !== 12) {
    return helpers.message('Identity cart must be at 12 number');
  }
  if(value.toLowerCase() !== value.toUpperCase()){
    return helpers.message('Enter only numbers, no characters');
  }
  return value;
}

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  numberPhone,
  identityCard,
};
