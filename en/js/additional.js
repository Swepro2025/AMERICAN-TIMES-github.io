$(function()
{

		var targetImgs = $('img');

		targetImgs.each(function()
		{
			if(this.src.match('-off'))
			{

				this.rollOverImg = new Image();
				this.rollOverImg.src = this.getAttribute("src").replace("-off", "-on");
				$(this.rollOverImg).css({position: 'absolute', opacity: 0});
				$(this).before(this.rollOverImg);

				$(this.rollOverImg).hover(function(){
					$(this).animate({opacity: 1}, {duration: 400, queue: false});
				},
				function(){
					$(this).animate({opacity: 0}, {duration: 400, queue: false});
				});

			}
		});

    $(window).scroll(function() {
            var dy = $(this).scrollTop();
            $('nav').css('top', dy < 60 ? 60-dy : 0);
    });

    "use strict";
    function centerModal() {
        $(this).css('display', 'block');
        var $dialog  = $(this).find(".modal-dialog"),
        offset       = ($(window).height() - $dialog.height()) / 2,
        bottomMargin = parseInt($dialog.css('marginBottom'), 10);

        // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
        if(offset < bottomMargin) offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });

    $(".main-single .mainpic").hover(
        function() {
            $(".main h1 a").addClass("hover");
        },
        function() {
            $(".main h1 a").removeClass("hover");
        }
    );

  if(targetImgs.data('src') !== null) {
    targetImgs.lazy({
      effect: "fadeIn",
      effectTime: 800,
      threshold: 200,
      afterLoad: function(element) {
        objectFitImages(element);
      }
    });
  }
  var targetDivs = $('div')
  if (targetDivs.data('src') !== null) {
    targetDivs.lazy({
      effect: "fadeIn",
      effectTime: 800,
      threshold: 200,
      afterLoad: function(element) {
        objectFitImages(element);
      }
    });
  }
  $(document).ajaxStop(function(){
    var targetAjaxImgs = $('img');
    var targetAjaxDivs = $('div')
    if(targetAjaxImgs.data('src') !== null) {
      targetAjaxImgs.lazy({
        effect: "fadeIn",
        effectTime: 800,
        threshold: 200,
        afterLoad: function(element) {
          objectFitImages(element);
        }
      });
    }
    if (targetAjaxDivs.data('src') !== null) {
      targetAjaxDivs.lazy({
        effect: "fadeIn",
        effectTime: 800,
        threshold: 200,
        afterLoad: function(element) {
          objectFitImages(element);
        }
      });
    }
  });
});

//    $(document).ready(function(){
//        $("#subscribeModal").modal({
//            show: true
//        });
//    });
//


$("#searchModal,#subscribeModal,#thanksModal").on('show.bs.modal', function (e) {
    var that=$(this);
    var id=that.attr('id');
    setTimeout(function(){
        $('.modal-backdrop').attr('data-id',id);
    });
});


$(document.body).on('hide.bs.modal', function () {
    $('body').css('padding-right','0');
});
$(document.body).on('hidden.bs.modal', function () {
    $('body').css('padding-right','0');
});

jQuery('iframe').iframeAutoHeight();

$(window).on("load resize", function(){
  var footer_height = parseInt($("footer").outerHeight());
  var marginBottom = (footer_height) + 'px';
  $("body").css("margin-bottom", marginBottom);
});


$(function() {
  $('.wrapper > .container').last().css('padding-bottom', '60px');
});

$(function() {
  var href = location.href;
  var findLi = $('nav.nav').children('div.container').children('ul.clearfix').children('li');
  findLi.each(function(i, li) {
    var anchor = $(li).children('a');
    if (href === anchor[0].href && !anchor.hasClass('current')) {
      anchor.addClass('current');
    }
  })
});

$(function() {
  objectFitImages('.pic img');
});

$(function() {
  $(".main-five").scroll(function() {
    var targetImgs = $('img');
    if(targetImgs.data('src') !== null) {
      targetImgs.lazy({
        effect: "fadeIn",
        effectTime: 800,
        threshold: 200,
        afterLoad: function(element) {
          objectFitImages(element);
        }
      });
    }
    var targetDivs = $('div')
    if (targetDivs.data('src') !== null) {
      targetDivs.lazy({
        effect: "fadeIn",
        effectTime: 800,
        threshold: 200,
        afterLoad: function(element) {
          objectFitImages(element);
        }
      });
    }
  });
});