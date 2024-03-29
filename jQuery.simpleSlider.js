/*!
 * jQuery SimpleSlide Plugin
 *
 * Copyright(c) 2012 Alex Sancho <alex@alexsancho.name>
 *
 * Dual licensed under the MIT and GPL licenses:
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	"use strict";

	$.fn.simpleSlider = function(options) {
		return this.each(function() {
			new $.simpleSlider(this, options);
		});
	};

	$.simpleSlider = function(element, options) {
		this.options = $.extend({}, $.simpleSlider.defaults, options || {});
		this.element = $(element);
		this.init();
	};

	$.simpleSlider.prototype = {
		init: function() {
			var $this = jQuery(this.element),
				navi = jQuery('<ul class="navigator" />'),
				figures = jQuery('figure', $this);

			$this.addClass('simpleSlider slider');

			figures.each(function(index, value) {
				var idx = index+1,
					trigger = jQuery('<li><a href="#">'+idx+'</a></li>');

				if (idx === 1) {
					trigger.addClass('selected');
				} else {
					jQuery(value).hide();
				}

				trigger.bind('click', function(event) {
					event.preventDefault();

					jQuery(this)
						.siblings()
						.removeClass('selected');

					jQuery(this)
						.addClass('selected');

					jQuery(value)
						.siblings('figure')
						.hide();

					jQuery(value).show();
				});

				navi.append(trigger);
			});

			if (jQuery('li', navi).length > 1) {
				var prev = jQuery('<li class="control"><a href="#"><</></li>'),
					next = jQuery('<li class="control"><a href="#">></></li>');

				prev.bind('click', function(event) {
					event.preventDefault();

					jQuery(this)
						.siblings('.selected')
						.prev()
						.not('.control')
						.click();
				});

				next.bind('click', function(event) {
					event.preventDefault();

					jQuery(this)
						.siblings('.selected')
						.next()
						.not('.control')
						.click();
				});

				navi
					.prepend(prev)
					.append(next);

				$this.append(navi);
			}
		}
	};

	$.simpleSlider.defaults = {
		
	};

}(jQuery));