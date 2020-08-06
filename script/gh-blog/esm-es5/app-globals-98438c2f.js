var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function pad(num) {
    return "0".concat(num).slice(-2);
}
function strftime(time, formatString) {
    var day = time.getDay();
    var date = time.getDate();
    var month = time.getMonth();
    var year = time.getFullYear();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    return formatString.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, function (_arg) {
        var match;
        var modifier = _arg[1];
        switch (modifier) {
            case '%':
                return '%';
            case 'a':
                return weekdays[day].slice(0, 3);
            case 'A':
                return weekdays[day];
            case 'b':
                return months[month].slice(0, 3);
            case 'B':
                return months[month];
            case 'c':
                return time.toString();
            case 'd':
                return pad(date);
            case 'e':
                return String(date);
            case 'H':
                return pad(hour);
            case 'I':
                return pad(strftime(time, '%l'));
            case 'l':
                if (hour === 0 || hour === 12) {
                    return String(12);
                }
                else {
                    return String((hour + 12) % 12);
                }
            case 'm':
                return pad(month + 1);
            case 'M':
                return pad(minute);
            case 'p':
                if (hour > 11) {
                    return 'PM';
                }
                else {
                    return 'AM';
                }
            case 'P':
                if (hour > 11) {
                    return 'pm';
                }
                else {
                    return 'am';
                }
            case 'S':
                return pad(second);
            case 'w':
                return String(day);
            case 'y':
                return pad(year % 100);
            case 'Y':
                return String(year);
            case 'Z':
                match = time.toString().match(/\((\w+)\)$/);
                return match ? match[1] : '';
            case 'z':
                match = time.toString().match(/\w([+-]\d\d\d\d) /);
                return match ? match[1] : '';
        }
        return '';
    });
}
function makeFormatter(options) {
    var format;
    return function () {
        if (format)
            return format;
        if ('Intl' in window) {
            try {
                format = new Intl.DateTimeFormat(undefined, options);
                return format;
            }
            catch (e) {
                if (!(e instanceof RangeError)) {
                    throw e;
                }
            }
        }
    };
}
var dayFirst = null;
var dayFirstFormatter = makeFormatter({
    day: 'numeric',
    month: 'short'
}); // Private: Determine if the day should be formatted before the month name in
// the user's current locale. For example, `9 Jun` for en-GB and `Jun 9`
// for en-US.
//
// Returns true if the day appears before the month.
function isDayFirst() {
    if (dayFirst !== null) {
        return dayFirst;
    }
    var formatter = dayFirstFormatter();
    if (formatter) {
        var output = formatter.format(new Date(0));
        dayFirst = !!output.match(/^\d/);
        return dayFirst;
    }
    else {
        return false;
    }
}
var yearSeparator = null;
var yearFormatter = makeFormatter({
    day: 'numeric',
    month: 'short',
    year: 'numeric'
}); // Private: Determine if the year should be separated from the month and day
// with a comma. For example, `9 Jun 2014` in en-GB and `Jun 9, 2014` in en-US.
//
// Returns true if the date needs a separator.
function isYearSeparator() {
    if (yearSeparator !== null) {
        return yearSeparator;
    }
    var formatter = yearFormatter();
    if (formatter) {
        var output = formatter.format(new Date(0));
        yearSeparator = !!output.match(/\d,/);
        return yearSeparator;
    }
    else {
        return true;
    }
} // Private: Determine if the date occurs in the same year as today's date.
//
// date - The Date to test.
//
// Returns true if it's this year.
function isThisYear(date) {
    var now = new Date();
    return now.getUTCFullYear() === date.getUTCFullYear();
}
function makeRelativeFormat(locale, options) {
    if ('Intl' in window && 'RelativeTimeFormat' in window.Intl) {
        try {
            // eslint-disable-next-line flowtype/no-flow-fix-me-comments
            // $FlowFixMe: missing RelativeTimeFormat type
            return new Intl.RelativeTimeFormat(locale, options);
        }
        catch (e) {
            if (!(e instanceof RangeError)) {
                throw e;
            }
        }
    }
} // Private: Get preferred Intl locale for a target element.
//
// Traverses parents until it finds an explicit `lang` other returns "default".
function localeFromElement(el) {
    var container = el.closest('[lang]');
    if (container instanceof HTMLElement && container.lang) {
        return container.lang;
    }
    return 'default';
}
var datetimes = new WeakMap();
var ExtendedTimeElement = /** @class */ (function (_super) {
    __extends(ExtendedTimeElement, _super);
    function ExtendedTimeElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ExtendedTimeElement, "observedAttributes", {
        get: function () {
            return ['datetime', 'day', 'format', 'lang', 'hour', 'minute', 'month', 'second', 'title', 'weekday', 'year'];
        },
        enumerable: true,
        configurable: true
    });
    ExtendedTimeElement.prototype.connectedCallback = function () {
        var title = this.getFormattedTitle();
        if (title && !this.hasAttribute('title')) {
            this.setAttribute('title', title);
        }
        var text = this.getFormattedDate();
        if (text) {
            this.textContent = text;
        }
    }; // Internal: Refresh the time element's formatted date when an attribute changes.
    ExtendedTimeElement.prototype.attributeChangedCallback = function (attrName, oldValue, newValue) {
        if (attrName === 'datetime') {
            var millis = Date.parse(newValue);
            if (isNaN(millis)) {
                datetimes.delete(this);
            }
            else {
                datetimes.set(this, new Date(millis));
            }
        }
        var title = this.getFormattedTitle();
        if (title && !this.hasAttribute('title')) {
            this.setAttribute('title', title);
        }
        var text = this.getFormattedDate();
        if (text) {
            this.textContent = text;
        }
    };
    Object.defineProperty(ExtendedTimeElement.prototype, "date", {
        get: function () {
            return datetimes.get(this);
        } // Internal: Format the ISO 8601 timestamp according to the user agent's
        ,
        enumerable: true,
        configurable: true
    });
    // locale-aware formatting rules. The element's existing `title` attribute
    // value takes precedence over this custom format.
    //
    // Returns a formatted time String.
    ExtendedTimeElement.prototype.getFormattedTitle = function () {
        var date = this.date;
        if (!date)
            return;
        var formatter = titleFormatter();
        if (formatter) {
            return formatter.format(date);
        }
        else {
            try {
                return date.toLocaleString();
            }
            catch (e) {
                if (e instanceof RangeError) {
                    return date.toString();
                }
                else {
                    throw e;
                }
            }
        }
    };
    ExtendedTimeElement.prototype.getFormattedDate = function () { };
    return ExtendedTimeElement;
}(HTMLElement));
var titleFormatter = makeFormatter({
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
});
var formatters = new WeakMap();
var LocalTimeElement = /** @class */ (function (_super) {
    __extends(LocalTimeElement, _super);
    function LocalTimeElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalTimeElement.prototype.attributeChangedCallback = function (attrName, oldValue, newValue) {
        if (attrName === 'hour' || attrName === 'minute' || attrName === 'second' || attrName === 'time-zone-name') {
            formatters.delete(this);
        }
        _super.prototype.attributeChangedCallback.call(this, attrName, oldValue, newValue);
    }; // Formats the element's date, in the user's current locale, according to
    // the formatting attribute values. Values are not passed straight through to
    // an Intl.DateTimeFormat instance so that weekday and month names are always
    // displayed in English, for now.
    //
    // Supported attributes are:
    //
    //   weekday - "short", "long"
    //   year    - "numeric", "2-digit"
    //   month   - "short", "long"
    //   day     - "numeric", "2-digit"
    //   hour    - "numeric", "2-digit"
    //   minute  - "numeric", "2-digit"
    //   second  - "numeric", "2-digit"
    //
    // Returns a formatted time String.
    LocalTimeElement.prototype.getFormattedDate = function () {
        var d = this.date;
        if (!d)
            return;
        var date = formatDate(this, d) || '';
        var time = formatTime(this, d) || '';
        return "".concat(date, " ").concat(time).trim();
    };
    return LocalTimeElement;
}(ExtendedTimeElement)); // Private: Format a date according to the `weekday`, `day`, `month`,
// and `year` attribute values.
//
// This doesn't use Intl.DateTimeFormat to avoid creating text in the user's
// language when the majority of the surrounding text is in English. There's
// currently no way to separate the language from the format in Intl.
//
// el - The local-time element to format.
//
// Returns a date String or null if no date formats are provided.
function formatDate(el, date) {
    // map attribute values to strftime
    var props = {
        weekday: {
            short: '%a',
            long: '%A'
        },
        day: {
            numeric: '%e',
            '2-digit': '%d'
        },
        month: {
            short: '%b',
            long: '%B'
        },
        year: {
            numeric: '%Y',
            '2-digit': '%y'
        } // build a strftime format string
    };
    var format = isDayFirst() ? 'weekday day month year' : 'weekday month day, year';
    for (var prop in props) {
        var value = props[prop][el.getAttribute(prop)];
        format = format.replace(prop, value || '');
    } // clean up year separator comma
    format = format.replace(/(\s,)|(,\s$)/, ''); // squeeze spaces from final string
    return strftime(date, format).replace(/\s+/, ' ').trim();
} // Private: Format a time according to the `hour`, `minute`, and `second`
// attribute values.
//
// el - The local-time element to format.
//
// Returns a time String or null if no time formats are provided.
function formatTime(el, date) {
    var options = {}; // retrieve format settings from attributes
    var hour = el.getAttribute('hour');
    if (hour === 'numeric' || hour === '2-digit')
        options.hour = hour;
    var minute = el.getAttribute('minute');
    if (minute === 'numeric' || minute === '2-digit')
        options.minute = minute;
    var second = el.getAttribute('second');
    if (second === 'numeric' || second === '2-digit')
        options.second = second;
    var tz = el.getAttribute('time-zone-name');
    if (tz === 'short' || tz === 'long')
        options.timeZoneName = tz; // No time format attributes provided.
    if (Object.keys(options).length === 0) {
        return;
    }
    var factory = formatters.get(el);
    if (!factory) {
        factory = makeFormatter(options);
        formatters.set(el, factory);
    }
    var formatter = factory();
    if (formatter) {
        // locale-aware formatting of 24 or 12 hour times
        return formatter.format(date);
    }
    else {
        // fall back to strftime for non-Intl browsers
        var timef = options.second ? '%H:%M:%S' : '%H:%M';
        return strftime(date, timef);
    }
} // Public: LocalTimeElement constructor.
//
//   var time = new LocalTimeElement()
//   # => <local-time></local-time>
//
if (!window.customElements.get('local-time')) {
    window.LocalTimeElement = LocalTimeElement;
    window.customElements.define('local-time', LocalTimeElement);
}
var RelativeTime = /** @class */ (function () {
    function RelativeTime(date, locale) {
        this.date = date;
        this.locale = locale;
    }
    RelativeTime.prototype.toString = function () {
        var ago = this.timeElapsed();
        if (ago) {
            return ago;
        }
        else {
            var ahead = this.timeAhead();
            if (ahead) {
                return ahead;
            }
            else {
                return "on ".concat(this.formatDate());
            }
        }
    };
    RelativeTime.prototype.timeElapsed = function () {
        var ms = new Date().getTime() - this.date.getTime();
        var sec = Math.round(ms / 1000);
        var min = Math.round(sec / 60);
        var hr = Math.round(min / 60);
        var day = Math.round(hr / 24);
        if (ms >= 0 && day < 30) {
            return this.timeAgoFromMs(ms);
        }
        else {
            return null;
        }
    };
    RelativeTime.prototype.timeAhead = function () {
        var ms = this.date.getTime() - new Date().getTime();
        var sec = Math.round(ms / 1000);
        var min = Math.round(sec / 60);
        var hr = Math.round(min / 60);
        var day = Math.round(hr / 24);
        if (ms >= 0 && day < 30) {
            return this.timeUntil();
        }
        else {
            return null;
        }
    };
    RelativeTime.prototype.timeAgo = function () {
        var ms = new Date().getTime() - this.date.getTime();
        return this.timeAgoFromMs(ms);
    };
    RelativeTime.prototype.timeAgoFromMs = function (ms) {
        var sec = Math.round(ms / 1000);
        var min = Math.round(sec / 60);
        var hr = Math.round(min / 60);
        var day = Math.round(hr / 24);
        var month = Math.round(day / 30);
        var year = Math.round(month / 12);
        if (ms < 0) {
            return formatRelativeTime(this.locale, 0, 'second');
        }
        else if (sec < 10) {
            return formatRelativeTime(this.locale, 0, 'second');
        }
        else if (sec < 45) {
            return formatRelativeTime(this.locale, -sec, 'second');
        }
        else if (sec < 90) {
            return formatRelativeTime(this.locale, -min, 'minute');
        }
        else if (min < 45) {
            return formatRelativeTime(this.locale, -min, 'minute');
        }
        else if (min < 90) {
            return formatRelativeTime(this.locale, -hr, 'hour');
        }
        else if (hr < 24) {
            return formatRelativeTime(this.locale, -hr, 'hour');
        }
        else if (hr < 36) {
            return formatRelativeTime(this.locale, -day, 'day');
        }
        else if (day < 30) {
            return formatRelativeTime(this.locale, -day, 'day');
        }
        else if (month < 12) {
            return formatRelativeTime(this.locale, -month, 'month');
        }
        else if (month < 18) {
            return formatRelativeTime(this.locale, -year, 'year');
        }
        else {
            return formatRelativeTime(this.locale, -year, 'year');
        }
    };
    RelativeTime.prototype.microTimeAgo = function () {
        var ms = new Date().getTime() - this.date.getTime();
        var sec = Math.round(ms / 1000);
        var min = Math.round(sec / 60);
        var hr = Math.round(min / 60);
        var day = Math.round(hr / 24);
        var month = Math.round(day / 30);
        var year = Math.round(month / 12);
        if (min < 1) {
            return '1m';
        }
        else if (min < 60) {
            return "".concat(min, "m");
        }
        else if (hr < 24) {
            return "".concat(hr, "h");
        }
        else if (day < 365) {
            return "".concat(day, "d");
        }
        else {
            return "".concat(year, "y");
        }
    };
    RelativeTime.prototype.timeUntil = function () {
        var ms = this.date.getTime() - new Date().getTime();
        return this.timeUntilFromMs(ms);
    };
    RelativeTime.prototype.timeUntilFromMs = function (ms) {
        var sec = Math.round(ms / 1000);
        var min = Math.round(sec / 60);
        var hr = Math.round(min / 60);
        var day = Math.round(hr / 24);
        var month = Math.round(day / 30);
        var year = Math.round(month / 12);
        if (month >= 18) {
            return formatRelativeTime(this.locale, year, 'year');
        }
        else if (month >= 12) {
            return formatRelativeTime(this.locale, year, 'year');
        }
        else if (day >= 45) {
            return formatRelativeTime(this.locale, month, 'month');
        }
        else if (day >= 30) {
            return formatRelativeTime(this.locale, month, 'month');
        }
        else if (hr >= 36) {
            return formatRelativeTime(this.locale, day, 'day');
        }
        else if (hr >= 24) {
            return formatRelativeTime(this.locale, day, 'day');
        }
        else if (min >= 90) {
            return formatRelativeTime(this.locale, hr, 'hour');
        }
        else if (min >= 45) {
            return formatRelativeTime(this.locale, hr, 'hour');
        }
        else if (sec >= 90) {
            return formatRelativeTime(this.locale, min, 'minute');
        }
        else if (sec >= 45) {
            return formatRelativeTime(this.locale, min, 'minute');
        }
        else if (sec >= 10) {
            return formatRelativeTime(this.locale, sec, 'second');
        }
        else {
            return formatRelativeTime(this.locale, 0, 'second');
        }
    };
    RelativeTime.prototype.microTimeUntil = function () {
        var ms = this.date.getTime() - new Date().getTime();
        var sec = Math.round(ms / 1000);
        var min = Math.round(sec / 60);
        var hr = Math.round(min / 60);
        var day = Math.round(hr / 24);
        var month = Math.round(day / 30);
        var year = Math.round(month / 12);
        if (day >= 365) {
            return "".concat(year, "y");
        }
        else if (hr >= 24) {
            return "".concat(day, "d");
        }
        else if (min >= 60) {
            return "".concat(hr, "h");
        }
        else if (min > 1) {
            return "".concat(min, "m");
        }
        else {
            return '1m';
        }
    };
    RelativeTime.prototype.formatDate = function () {
        var format = isDayFirst() ? '%e %b' : '%b %e';
        if (!isThisYear(this.date)) {
            format += isYearSeparator() ? ', %Y' : ' %Y';
        }
        return strftime(this.date, format);
    };
    RelativeTime.prototype.formatTime = function () {
        var formatter = timeFormatter();
        if (formatter) {
            return formatter.format(this.date);
        }
        else {
            return strftime(this.date, '%l:%M%P');
        }
    };
    return RelativeTime;
}());
function formatRelativeTime(locale, value, unit) {
    var formatter = makeRelativeFormat(locale, {
        numeric: 'auto'
    });
    if (formatter) {
        return formatter.format(value, unit);
    }
    else {
        return formatEnRelativeTime(value, unit);
    }
} // Simplified "en" RelativeTimeFormat.format function
//
// Values should roughly match
//   new Intl.RelativeTimeFormat('en', {numeric: 'auto'}).format(value, unit)
//
function formatEnRelativeTime(value, unit) {
    if (value === 0) {
        switch (unit) {
            case 'year':
            case 'quarter':
            case 'month':
            case 'week':
                return "this ".concat(unit);
            case 'day':
                return 'today';
            case 'hour':
            case 'minute':
                return "in 0 ".concat(unit, "s");
            case 'second':
                return 'now';
        }
    }
    else if (value === 1) {
        switch (unit) {
            case 'year':
            case 'quarter':
            case 'month':
            case 'week':
                return "next ".concat(unit);
            case 'day':
                return 'tomorrow';
            case 'hour':
            case 'minute':
            case 'second':
                return "in 1 ".concat(unit);
        }
    }
    else if (value === -1) {
        switch (unit) {
            case 'year':
            case 'quarter':
            case 'month':
            case 'week':
                return "last ".concat(unit);
            case 'day':
                return 'yesterday';
            case 'hour':
            case 'minute':
            case 'second':
                return "1 ".concat(unit, " ago");
        }
    }
    else if (value > 1) {
        switch (unit) {
            case 'year':
            case 'quarter':
            case 'month':
            case 'week':
            case 'day':
            case 'hour':
            case 'minute':
            case 'second':
                return "in ".concat(value, " ").concat(unit, "s");
        }
    }
    else if (value < -1) {
        switch (unit) {
            case 'year':
            case 'quarter':
            case 'month':
            case 'week':
            case 'day':
            case 'hour':
            case 'minute':
            case 'second':
                return "".concat(-value, " ").concat(unit, "s ago");
        }
    }
    throw new RangeError("Invalid unit argument for format() '".concat(unit, "'"));
}
var timeFormatter = makeFormatter({
    hour: 'numeric',
    minute: '2-digit'
});
var RelativeTimeElement = /** @class */ (function (_super) {
    __extends(RelativeTimeElement, _super);
    function RelativeTimeElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelativeTimeElement.prototype.getFormattedDate = function () {
        var date = this.date;
        if (date) {
            return new RelativeTime(date, localeFromElement(this)).toString();
        }
    };
    RelativeTimeElement.prototype.connectedCallback = function () {
        nowElements.push(this);
        if (!updateNowElementsId) {
            updateNowElements();
            updateNowElementsId = setInterval(updateNowElements, 60 * 1000);
        }
        _super.prototype.connectedCallback.call(this);
    };
    RelativeTimeElement.prototype.disconnectedCallback = function () {
        var ix = nowElements.indexOf(this);
        if (ix !== -1) {
            nowElements.splice(ix, 1);
        }
        if (!nowElements.length) {
            if (updateNowElementsId) {
                clearInterval(updateNowElementsId);
                updateNowElementsId = null;
            }
        }
    };
    return RelativeTimeElement;
}(ExtendedTimeElement)); // Internal: Array tracking all elements attached to the document that need
// to be updated every minute.
var nowElements = []; // Internal: Timer ID for `updateNowElements` interval.
var updateNowElementsId; // Internal: Install a timer to refresh all attached relative-time elements every
// minute.
function updateNowElements() {
    var time, i, len;
    for (i = 0, len = nowElements.length; i < len; i++) {
        time = nowElements[i];
        time.textContent = time.getFormattedDate() || '';
    }
} // Public: RelativeTimeElement constructor.
//
//   var time = new RelativeTimeElement()
//   # => <relative-time></relative-time>
//
if (!window.customElements.get('relative-time')) {
    window.RelativeTimeElement = RelativeTimeElement;
    window.customElements.define('relative-time', RelativeTimeElement);
}
var TimeAgoElement = /** @class */ (function (_super) {
    __extends(TimeAgoElement, _super);
    function TimeAgoElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeAgoElement.prototype.getFormattedDate = function () {
        var format = this.getAttribute('format');
        var date = this.date;
        if (!date)
            return;
        if (format === 'micro') {
            return new RelativeTime(date, localeFromElement(this)).microTimeAgo();
        }
        else {
            return new RelativeTime(date, localeFromElement(this)).timeAgo();
        }
    };
    return TimeAgoElement;
}(RelativeTimeElement));
if (!window.customElements.get('time-ago')) {
    window.TimeAgoElement = TimeAgoElement;
    window.customElements.define('time-ago', TimeAgoElement);
}
var TimeUntilElement = /** @class */ (function (_super) {
    __extends(TimeUntilElement, _super);
    function TimeUntilElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeUntilElement.prototype.getFormattedDate = function () {
        var format = this.getAttribute('format');
        var date = this.date;
        if (!date)
            return;
        if (format === 'micro') {
            return new RelativeTime(date, localeFromElement(this)).microTimeUntil();
        }
        else {
            return new RelativeTime(date, localeFromElement(this)).timeUntil();
        }
    };
    return TimeUntilElement;
}(RelativeTimeElement));
if (!window.customElements.get('time-until')) {
    window.TimeUntilElement = TimeUntilElement;
    window.customElements.define('time-until', TimeUntilElement);
}
