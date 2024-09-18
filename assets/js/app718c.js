$(function() {

  $(document).on('click', '.js-submit-search-button', function() {
    // 検索ワードが空の時はsaveを動かしてエラー出させる
    if ($('#advancedSearchField input[name="phrase"]').val() === '') {
      $('.js-save-search-filter').click();
      return false;
    }
    $(this).closest('form').submit();
  });

  $(document).on('click', '.js-submit-button', function() {
    $(this).closest('form').submit();
  });

  $(document).on('click', '.js-update-parent-by-form', function() {
    var params = $(this).closest('form').serialize();
    window.parent.location.href = '/search?' + params;
  });

  $(document).on('click', '.js-cancel-button', function() {
    var back = $("<input>").attr("type", "hidden").attr("name", "action").val("back");
    $(this).closest('form').append($(back));
    $(this).closest('form').submit();
  });

  $(document).on('click', '.js-send-button', function() {
    var back = $("<input>").attr("type", "hidden").attr("name", "action").val("send");
    $(this).closest('form').append($(back));
    $(this).closest('form').submit();
  });

  $(document).on('click', '.js-pasttime1w, .js-pasttime1m, .js-pasttime3m, .js-pasttime6m, .js-pasttime1y', function() {
    var _substractDate = substractDate($(this));

    // $('.js-timerange-from').val(formatDate(addDate(new Date(), _substractDate), 'MM/DD/YYYY'));
    $('.js-timerange-from').val(formatDate(addDate(new Date(), _substractDate), 'YYYY-MM-DD'));
    // $('.js-timerange-to').val(formatDate(new Date(), 'MM/DD/YYYY'));
    $('.js-timerange-to').val(formatDate(new Date(), 'YYYY-MM-DD'));
  });

  $(document).on('focus', '.js-timerange-from, .js-timerange-to', function () {
    $(this).data('current-date', $(this).val());
  });

  $(document).on('blur', '.js-timerange-from, .js-timerange-to', function () {
    if ($(this).data('current-date') !== $(this).val()) {
      $('.js-past-times').find('input[type="radio"]').prop('checked', false);
    }
  });

  $(document).on('click', '.js-save-search-filter', function() {
    var form = $(this).closest('form');

    if (form.find('input.search-condition-word').length > 0 && form.find('input.search-condition-word').val() == '') {
      if (form.find('.search-condition-word-warning').length > 0) {
        form.find('.search-condition-word-warning').show();
      }
      return false;
    }

    form.prop('action', $(this).prop('href'));
    form.prop('method', 'post');
    $(form).submit();
    return false;
  });

  /**
   * data-submit-delete-to属性の値のパスにDELETEメソッドでリクエストを行う
   *
   * ## 利用例
   *
   * ```
   * <form>
   *  <nav><a class="js-submit-delete" data-submit-delete-to="/search/filter" href="javascript:void(0);">Del</a></nav>
   * </form>
   * ```
   */
  $(document).on('click', '.js-submit-delete', function() {
    var form = $(this).closest('form');
    form.prop('action', $(this).data('submit-delete-to') + '/' + form.find('[name="id"]').val());
    form.prop('method', 'post');
    form.append('<input name="_method" type="hidden" value="DELETE">');
    form.submit();
    return false;
  });

  if ($('input[name="past_time"]:checked')[0]) {
    var checkedElem = $('input[name="past_time"]:checked');
    var parent = checkedElem.closest('li');
    $(parent).find('label').click();
    checkedElem.prop('checked', true);
  }

  if ($('input[name="search_filter_saved"]').val() === 'true') {
    $('#btnSaveMyFilters')[0].click();
    return false;
  }

  $(document).on('contextmenu', 'img, .js-disable-contextmenu', function() {
    if ($('meta[name="block_download_image"]').prop('content')) {
      return false;
    }
  });

  // $(document).on('click', '.bx-caption', function() {
  //   var photo = $(this).closest('li').find('[rel="imgmodal"]');
  //   if (photo) {
  //     photo.click();
  //   }
  //
  //   return false;
  // });

  $(document).on('click', '#js-print', function() {
    window.print();
    return false;
  });
});

/**
 * 日付種別を元に減算する日数を返す
 * @param $dateType
 */
function substractDate($dateType) {
  if ($dateType.hasClass('js-pasttime1w')) {
    return -7;
  }

  if ($dateType.hasClass('js-pasttime1m')) {
    return -30;
  }

  if ($dateType.hasClass('js-pasttime3m')) {
    return -90;
  }

  if ($dateType.hasClass('js-pasttime6m')) {
    return -180;
  }

  if ($dateType.hasClass('js-pasttime1y')) {
    return -365;
  }

  return 0;
}

/**
 * 日付をフォーマットする
 * @param date
 * @param format
 * @returns {*}
 */
function formatDate(date, format) {
  if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }
  return format;
}

/**
 * 日付を加算する
 * @param date
 * @param num
 * @param interval
 * @returns {*}
 */
function addDate(date, num, interval) {
  switch (interval) {
    case 'YYYY':
      date.setYear(date.getYear() + num);
      break;
    case 'MM':
      date.setMonth(date.getMonth() + num);
      break;
    case 'hh':
      date.setHours(date.getHours() + num);
      break;
    case 'mm':
      date.setMinutes(date.getMinutes() + num);
      break;
    case 'ss':
      date.setSeconds(date.getSeconds() + num);
      break;
    default:
      date.setDate(date.getDate() + num);
  }
  return date;
}

/**
 * Beaconリクエストを送信する
 * @param opts
 */
beacon = function(opts){
  // Make sure we have a base object for opts
  opts = opts || {};
  // Setup defaults for options
  opts.url = opts.url || null;
  opts.vars = opts.vars || {};
  opts.error = opts.error || function(){};
  opts.success = opts.success || function(){};

  // Split up vars object into an array
  var varsArray = [];
  for(var key in opts.vars){ varsArray.push(key+'='+opts.vars[key]); }
  // Build query string
  var qString = varsArray.join('&');

  // Create a beacon if a url is provided
  if( opts.url )
  {
    // Create a brand NEW image object
    var beacon = new Image();
    // Attach the event handlers to the image object
    if( beacon.onerror )
    { beacon.onerror = opts.error; }
    if( beacon.onload )
    { beacon.onload  = opts.success; }

    // Attach the src for the script call
    beacon.src = opts.url + '?' + qString;
  }
}
beacon({url: '/api/v1/beacon', vars: { 'path': location.pathname }})

/**
 * facebookシェア処理
 * @param url
 * @param title
 * @param descr
 * @param image
 * @param winWidth
 * @param winHeight
 */
window.fbShare = function(url) {
  FB.ui({ method: 'share', display: 'popup', href: url, }, function(response){});
}
