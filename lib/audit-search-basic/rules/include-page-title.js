module.exports.validate = function validate($) {
  return {
    rule: 'include-page-title',
    title: 'Include a page title',
    check: $('head title').length > 0,
    source: 'internal'
  };
};
