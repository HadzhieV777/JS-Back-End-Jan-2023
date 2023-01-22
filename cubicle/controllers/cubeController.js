exports.getCreateCube = (req, res) => {
  res.render('create');
};

exports.postCreateCube = (req, res) => {

  res.send('Form submitted')
}