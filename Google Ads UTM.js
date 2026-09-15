{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}


<script>
(function () {
  var PARAMS = ['gclid','gbraid','wbraid','msclkid','fbclid',
                'utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  var DAYS = 90, PREFIX = 'attr_';

  function setCookie(n, v, d) {
    var e = new Date();
    e.setTime(e.getTime() + d * 864e5);
    document.cookie = n + '=' + encodeURIComponent(v) +
      ';expires=' + e.toUTCString() + ';path=/;SameSite=Lax';
  }
  function getCookie(n) {
    var m = document.cookie.match('(?:^|; )' + n + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }

  var qs = new URLSearchParams(location.search);
  var isNewClick = PARAMS.some(function (p) { return qs.get(p); });

  if (isNewClick) {
    // Fresh ad click: clear old values so attribution doesn't get mixed
    PARAMS.forEach(function (p) { setCookie(PREFIX + p, '', -1); });
    PARAMS.forEach(function (p) {
      if (qs.get(p)) setCookie(PREFIX + p, qs.get(p), DAYS);
    });
  }
  if (isNewClick || !getCookie(PREFIX + 'landing_page')) {
    setCookie(PREFIX + 'landing_page', location.href, DAYS);
    setCookie(PREFIX + 'referrer', document.referrer || 'direct', DAYS);
  }

  // Map each Gravity Forms hidden input ID to its cookie key
  var FIELDS = {
    'input_2_9': 'gclid',
    'input_2_10': 'utm_source',
    'input_2_11': 'utm_medium',
    'input_2_12': 'utm_campaign',
    'input_2_14': 'utm_term',
    'input_2_15': 'utm_content',
    'input_2_16': 'landing_page',
    'input_2_17': 'referrer'
  };

  function fill() {
    Object.keys(FIELDS).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = getCookie(PREFIX + FIELDS[id]);
    });
  }

  document.addEventListener('DOMContentLoaded', fill);
  document.addEventListener('gform_post_render', fill);
  if (window.jQuery) jQuery(document).on('gform_post_render', fill);
})();
</script>