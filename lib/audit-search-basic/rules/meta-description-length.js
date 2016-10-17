module.exports.validate = function validate($) {
  return {
    rule: 'meta-description-length',
    title: 'Ensure the page title is less than 150 characters',
    check: $('head meta[name=description]').attr('content') ?
    $('head meta[name=description]').attr('content').length <= 150 :
      false,
    source: 'internal'
  };
};
