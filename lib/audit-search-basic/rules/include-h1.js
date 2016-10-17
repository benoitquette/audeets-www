module.exports.validate = function validate($) {
  return {
    rule: 'include-h1',
    title: 'Include a H1 header in the markup',
    check: $('body h1').length > 0,
    source: 'internal'
  };
};
