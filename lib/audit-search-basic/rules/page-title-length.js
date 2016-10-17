module.exports.validate = function validate($) {
  return {
    rule: 'page-title-length',
    title: 'Ensure the page title is less than 65 characters',
    check: $('head title').text().length <= 65,
    source: 'internal'
  };
};
