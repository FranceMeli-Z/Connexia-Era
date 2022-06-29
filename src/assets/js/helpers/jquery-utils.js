export class JQueryUtils {

  static copyElementsTo(attrName = 'data-copy-after', cb = false) {
    $('[' + attrName + ']').each((i, el) => {
      const $el = $(el);
      let $markerTarget = $($el.attr(attrName)).first();
      if ($markerTarget.length > 0) {
        $el.removeAttr(attrName);
        let elNew = $el.children().clone();
        if (cb) {
          cb(elNew[0]);
        }
        elNew.insertAfter($markerTarget);
        $markerTarget.remove();
      }
    });
  }

}

document.querySelectorAll
