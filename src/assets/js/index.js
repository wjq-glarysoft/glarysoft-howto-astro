// JavaScript Document
var jq = jQuery.noConflict();   
jq(function () {
  if (!window.localStorage) {
    if (checkCookie("ckTip")) {
      jq(".cookiesTip").hide();
    } else {
      jq(".cookiesTip").show();
    }
  } else {
    if (window.localStorage.ckTip) {
      jq(".cookiesTip").hide();
    } else {
      jq(".cookiesTip").show();
    }
  }
  storeIcon();

  //reset copyright year
  var mydate = new Date();
  var mydateyear = mydate.getFullYear();
  jq("#copyyear").text(mydateyear);
  jq("#experience").text(mydateyear-2005);
  //AFFILIATE || linkid
  set_aff();

  jq(".navshortcut").on("click", function () {
    if (jq(".header_r").css("display") == "none") {
      jq(".header_r").show();
    } else {
      jq(".header_r").hide();
    }
  });

  // Newsletter / subscribe
  var subscribe_tip;
  jq("#subscribe").on("click", function () {
    clearTimeout(subscribe_tip);
    jq("#subscribe_tip").hide();
    var sub_email = jq("#subscribe_email").val();
    var check_sub_email = jq.trim(sub_email);
    if (check_sub_email.length == 0) {
      jq("#subscribe_tip")
        .removeClass()
        .addClass("fail")
        .text("Enter valid e-mail");
      jq("#subscribe_tip").show();
      subscribe_tip = setTimeout(function () {
        jq("#subscribe_tip").hide();
      }, 30000);
      return false;
    }
    if (
      null ==
      check_sub_email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    ) {
      jq("#subscribe_tip")
        .removeClass()
        .addClass("fail")
        .text("Enter valid e-mail");
      jq("#subscribe_tip").show();
      subscribe_tip = setTimeout(function () {
        jq("#subscribe_tip").hide();
      }, 30000);
      return false;
    }
    jq.ajax({
      type: "POST",
      url: "/subscribe/verify.php",
      data: "useremail=" + check_sub_email,
      success: function (msg) {
        if (msg == 1) {
          jq("#subscribe_tip")
            .removeClass()
            .text(
              "Thank you! Please check your email and confirm your subscription!"
            );
          jq("#subscribe_tip").show();
        } else if (msg == 2 || msg == 4) {
          jq("#subscribe_tip")
            .removeClass()
            .addClass("fail")
            .text("Failed, please try again");
          jq("#subscribe_tip").show();
        } else {
          jq("#subscribe_tip")
            .removeClass()
            .addClass("info")
            .text("Frequent operation, you can try again after half an hour");
          jq("#subscribe_tip").show();
        }
        subscribe_tip = setTimeout(function () {
          jq("#subscribe_tip").hide();
        }, 30000);
      },
    });
  });

  var isAndroid =
    navigator.userAgent.toLowerCase().match(/android/i) == "android";

  jq(".faq_q").click(function () {
    if (jq(this).next(".faq_a").css("display") == "none") {
      jq(this).next(".faq_a").show();
      if (window.location.pathname === "/support/faq/") {
        var anchor = jq(this).attr("id");
        if ("history" in window && "pushState" in history) {
          var url = window.location.href;
          url = url.replace(window.location.hash, "");
          if (window.location.hash) {
            window.history.replaceState({ url: url }, "", "#" + anchor);
          } else {
            window.history.pushState({ url: url }, "", "#" + anchor);
          }
        } else {
          window.location.hash = anchor;
        }
      }
    } else {
      jq(this).next(".faq_a").hide();
    }
  });

  jq(".frp_q").click(function () {
    if (jq(this).next(".frp_a").css("display") == "none") {
      jq(this).parent(".frp_faq_wrap").css("paddingBottom", "30px");
      jq(this)
        .css({ fontWeight: 600, fontSize: "16px" })
        .children("img")
        .attr("src", "/images/file-recovery/fold.png");
      jq(this).next(".frp_a").show();
    } else {
      jq(this).parent(".frp_faq_wrap").css("paddingBottom", 0);
      jq(this)
        .css({ fontWeight: "normal", fontSize: "14px" })
        .children("img")
        .attr("src", "/images/file-recovery/open.png");
      jq(this).next(".frp_a").hide();
    }
  });

  /*jq("#subscribe_email").focus(function(){
		jq(this).css("color","#3E3E3E");
		jq(this).val("");
	})
	jq("#subscribe_email").blur(function(){
		if(jq(this).val() == ""){
			jq(this).css("color","#898989");
			jq(this).val("Your email");
		}
	})*/
  /*jq(".mailaddress").focus(function(){
		jq(this).val("");
	})
	jq(".mailaddress").blur(function(){
		if(jq(this).val() == ""){
			jq(this).val("Your email");
		}
	})*/

  jq(".supro_feature_con").hover(
    function () {
      jq(this).find(".supro_f_de_in").show();
      jq(this).find("img").css("opacity", 0.3);
    },
    function () {
      jq(this).find(".supro_f_de_in").hide();
      jq(this).find("img").css("opacity", 1);
    }
  );

  jq("a.download")
    .mouseover(function () {
      jq(this).css("background", "url(/images/button.png) 0 -50px no-repeat");
    })
    .mousedown(function () {
      jq(this).css("background", "url(/images/button.png) 0 -100px no-repeat");
    })
    .mouseup(function () {
      jq(this).css("background", "url(/images/button.png) 0 0 no-repeat");
    })
    .mouseout(function () {
      jq(this).css("background", "url(/images/button.png) 0 0 no-repeat");
    });
  jq("a.downloadspeedup")
    .mouseover(function () {
      jq(this).css("background", "url(/images/button.png) 0 -50px no-repeat");
    })
    .mousedown(function () {
      jq(this).css("background", "url(/images/button.png) 0 -100px no-repeat");
    })
    .mouseup(function () {
      jq(this).css("background", "url(/images/button.png) 0 0 no-repeat");
    })
    .mouseout(function () {
      jq(this).css("background", "url(/images/button.png) 0 0 no-repeat");
    });
  jq("a.downloadfr")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) 0 -58px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) 0 -116px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) 0 0 no-repeat"
      );
    });
  jq("a.purchasefrp")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) -226px -58px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) -226px -116px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) -226px 0 no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) -226px 0 no-repeat"
      );
    });

  jq("a.purchasefrp_s")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -178px -46px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -178px -92px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -178px 0 no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -178px 0 no-repeat"
      );
    });

  jq(".downtothanks").on("click", function () {
    var oldsw = jq(this).attr("oldsw");
    var sw = jq(this).attr("sw");
    if (sw == "mh") {
      setTimeout('location.href="/downloadthanks/mh/' + oldsw + '/";', 3000);
    } else if (sw == "gu") {
      setTimeout('location.href="/downloadthanks/gu/' + oldsw + '/";', 3000);
    } else if (sw == "su") {
      setTimeout('location.href="/downloadthanks/su/' + oldsw + '/";', 3000);
    }
  });

  jq("a.downloadmh")
    .mouseover(function () {
      jq(this).css("background", "url(/images/button.png) 0 -721px no-repeat");
    })
    .mousedown(function () {
      jq(this).css("background", "url(/images/button.png) 0 -770px no-repeat");
    })
    .mouseup(function () {
      jq(this).css("background", "url(/images/button.png) 0 -672px no-repeat");
    })
    .mouseout(function () {
      jq(this).css("background", "url(/images/button.png) 0 -672px no-repeat");
    });

  jq("a.buynowmh")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/button.png) -168px -721px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/button.png) -168px -770px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/button.png) -168px -672px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/button.png) -168px -672px no-repeat"
      );
    });

  jq("a.downloadreleasePage")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -36px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -72px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 0 no-repeat"
      );
    });

  jq("a.buynowreleasePage")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -144px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -180px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -108px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -108px no-repeat"
      );
    });

  jq("a.android_download")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/android_btn.png) 0 -45px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/android_btn.png) 0 -92px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css("background", "url(/images/android_btn.png) 0 0 no-repeat");
    })
    .mouseout(function () {
      jq(this).css("background", "url(/images/android_btn.png) 0 0 no-repeat");
    });
  jq("a.update_btn_y")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -50px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -100px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 0 no-repeat"
      );
    });
  jq("a.update_btn_n")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -200px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -250px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -150px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -150px no-repeat"
      );
    });

  jq("a.pro_compare_btn")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) 0 -58px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) 0 -116px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) 0 0 no-repeat"
      );
    });
  jq(".downloadfr_s")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -356px -46px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -356px -92px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -356px 0 no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -356px 0 no-repeat"
      );
    });

  jq(".pro_compare.supro tr td a.pro_compare_btn")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -47px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -94px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 0 no-repeat"
      );
    });

  jq("a.pro_compare_btn.paid")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) -215px -58px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) -215px -116px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) -215px 0 no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) -215px 0 no-repeat"
      );
    });

  jq(".next_item")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) 0 -156px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) 0 -174px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/file-recovery/btn.png) 0 -138px no-repeat"
      );
    });

  jq(".next_item").click(function () {
    var obj = jq(this);
    var len = obj.prev(".comments_wrap").children().length;
    var i =
      obj.prev(".comments_wrap").find(".comments_item.active").index() + 1;
    if (i >= len) {
      i = 0;
    }
    obj
      .prev(".comments_wrap")
      .children()
      .eq(i)
      .siblings()
      .hide()
      .removeClass("active")
      .end()
      .fadeIn(600, function () {
        jq(this).addClass("active");
      });
  });

  jq(".pro_compare.supro tr td a.pro_compare_btn.paid")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -188px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -235px no-repeat"
      );
    })
    .mouseup(function () {
      jq(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -141px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -141px no-repeat"
      );
    });

  jq(".nav > li#shop > a").on("mouseover", function (e) {
    if (e.target == e.currentTarget) {
      jq("#store-wrap").css("background", "none");
      jq("#store").css("visibility", "visible");
      lottie.stop("store");
      lottie.play("store");
    }
  });

  jq(".submenu p").hover(
    function () {
      jq(this).addClass("submenu_location_hover");
    },
    function () {
      jq(this).removeClass("submenu_location_hover");
    }
  );

  jq("#single_use_more").hover(
    function () {
      jq("#single_use_more_con").css({ right: "-338px", bottom: "-54px" });
      jq("#single_use_more_con").fadeIn();
    },
    function () {
      jq("#single_use_more_con").fadeOut();
    }
  );

  jq(
    ".content_003_box_left.frp_box_left, .content_003_box_right.frp_box_right"
  ).hover(
    function () {
      jq(this).addClass("frp_box_hover");
    },
    function () {
      jq(this).removeClass("frp_box_hover");
    }
  );

  var li_length = jq(".screen_show").children("li").length;
  if (li_length > 3) {
    jq(".screen_left").click(function () {
      jq(".screen_show").css("margin-left", "-250px");
      jq(".screen_show").append(jq(".screen_show").children("li:first"));
      jq(".screen_show").css("margin-left", "0px");
    });
    jq(".screen_right").click(function () {
      jq(".screen_show").append(jq(".screen_show").children("li:first"));
      jq(".screen_show").css("margin-left", "-250px");
    });
  } else {
    jq(".screen_left").add(jq(".screen_right")).hide();
  }
  jq(".screen_show")
    .children("li")
    .click(function () {
      var screen_big_img_src = jq(this).children("img").attr("src");
      screen_big_img_src =
        screen_big_img_src.substring(
          0,
          screen_big_img_src.lastIndexOf("_s.png")
        ) + ".png";
      jq(".screen_big_img").append(
        "<img src='" + screen_big_img_src + "' alt='' />"
      );
      var screen_big_top = (jq(window).height() - jq(".screen_big").height()) / 2;
      var screen_big_left = (jq(window).width() - jq(".screen_big").width()) / 2;
      var screen_big_scrollTop = jq(document).scrollTop();
      var screen_big_scrollLeft = jq(document).scrollLeft();
      jq(".screen_big").css({
        top: screen_big_top + screen_big_scrollTop,
        left: screen_big_left + screen_big_scrollLeft,
      });
      jq(".screen_big").show();
    });
  jq("#screen_big_hide").click(function () {
    jq(".screen_big_img").empty();
    jq(".screen_big").hide();
    //jq(this).children().remove();
    //jq(".screen_big").hide();
  });
  jq("#Glary_Utilities").click(function () {
    Download_Layer_Show(jq("#download_layer"));
  });
  jq("#Glary_Utilities_1").click(function () {
    Download_Layer_Show(jq("#download_layer_1"));
  });
  jq("#download_layer_close").click(function () {
    Download_Layer_Close(jq("#download_layer"));
  });
  jq("#download_layer_1_close").click(function () {
    Download_Layer_Close(jq("#download_layer_1"));
  });
  jq(".products_right a")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -37px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px 0px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -74px no-repeat"
      );
    });
  jq(".products_right_ver a")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -37px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px 0px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -74px no-repeat"
      );
    });
  jq(".products_right a#products_buynow")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -148px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -111px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -185px no-repeat"
      );
    });
  jq(".products_right_ver a#products_buynow")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -148px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -111px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(../images/button.png) -231px -185px no-repeat"
      );
    });
  jq(".Glary_Utilitiespro_buynow")
    .mouseover(function () {
      jq(this).css("background", "url(/images/button.png) 0px -200px no-repeat");
    })
    .mouseout(function () {
      jq(this).css("background", "url(/images/button.png) 0px -150px no-repeat");
    })
    .mousedown(function () {
      jq(this).css("background", "url(/images/button.png) 0px -250px no-repeat");
    });
  jq(".Glary_Utilities_upgrade")
    .mouseover(function () {
      jq(this).css(
        "background",
        "url(/images/button.png) -191px -272px no-repeat"
      );
    })
    .mouseout(function () {
      jq(this).css(
        "background",
        "url(/images/button.png) -191px -222px no-repeat"
      );
    })
    .mousedown(function () {
      jq(this).css(
        "background",
        "url(/images/button.png) -191px -323px no-repeat"
      );
    });
  jq(".probuynow")
    .mouseover(function () {
      jq(this).css("background", "url(/images/button.png) 0px -421px no-repeat");
    })
    .mouseout(function () {
      jq(this).css("background", "url(/images/button.png) 0px -371px no-repeat");
    })
    .mousedown(function () {
      jq(this).css("background", "url(/images/button.png) 0px -471px no-repeat");
    });

  jq(".affiliate_step_title_wrap td").click(function () {
    jq(".affiliate_step_con").children("li").stop(true, true);
    var obj = jq(this);
    var i = obj
      .parentsUntil(".affiliate_step_title_wrap")
      .find(obj.parent())
      .index();
    obj
      .addClass("cur")
      .find(".affiliate_step_arrow")
      .attr("src", "/images/partners/arrow-select.png");
    obj
      .parent()
      .siblings()
      .children("td[class='cur']")
      .removeClass("cur")
      .find(".affiliate_step_arrow")
      .attr("src", "/images/partners/arrow-default.png");
    jq(".affiliate_step_con")
      .children("li")
      .eq(i)
      .height(0)
      .addClass("cur")
      .animate({ height: "326px" }, 800)
      .siblings()
      .removeClass("cur");
  });

  jq(".version_lang_inforchange.old")
    .find("td.version_mark")
    .parent("tr")
    .siblings()
    .hide();
  jq(".version_lang_inforchange.old")
    .find("td.version_mark")
    .css("background", "url(/images/plus.jpg) left center no-repeat");
  jq(".version_lang_inforchange.old")
    .find("td.version_mark")
    .parent("tr")
    .toggle(
      function () {
        jq(this).siblings().show();
        jq(this)
          .find("td.version_mark")
          .css("background", "url(/images/minus.jpg) left center no-repeat");
      },
      function () {
        jq(this).siblings().hide();
        jq(this)
          .find("td.version_mark")
          .css("background", "url(/images/plus.jpg) left center no-repeat");
      }
    );
  jq(".version_lang_inforchange.latest")
    .find("td.version_mark")
    .parent("tr")
    .toggle(
      function () {
        jq(this).siblings().hide();
        jq(this)
          .find("td.version_mark")
          .css("background", "url(/images/plus.jpg) left center no-repeat");
      },
      function () {
        jq(this).siblings().show();
        jq(this)
          .find("td.version_mark")
          .css("background", "url(/images/minus.jpg) left center no-repeat");
      }
    );
  if (isAndroid) {
    jq(".nav>li>a,.nav>li>button").bind("click", function () {
      if (jq(this).parent().find(".subnavpart").length) {
        jq(this).toggleClass("active");
        if (jq(this).hasClass("active")) {
          jq(this).parent().find(".subnavpart").show();
        } else {
          jq(this).parent().find(".subnavpart").hide();
        }
      }
      return false;
    });
  } else {
    jq(".nav>li").hover(
      function () {
        if (jq(this).children(".subnavpart").length) {
          jq(this).children(".arrow").addClass("active");
          jq(this).children(".subnavpart").show();
          return false;
        }
      },
      function () {
        jq(this).children(".arrow").removeClass("active");
        jq(this).children(".subnavpart").hide();
        return false;
      }
    );
  }
  jq(".software-item").on("click", function () {
    showDownloadsCon();
  });
  const windowWidth = jq(window).width();
});
var myVar;
function Download_Layer_Show(ShowObj) {
  if (jq(window).width() > 553) {
    var Obj_top = (jq(window).height() - ShowObj.height()) / 2;
    var Obj_left = (jq(window).width() - ShowObj.width()) / 2;
    var Obj_scrollTop = jq(document).scrollTop();
    var Obj_scrollLeft = jq(document).scrollLeft();
    if (Obj_top + Obj_scrollTop <= 100) {
      ShowObj.css({ top: 100, left: Obj_left + Obj_scrollLeft });
    } else {
      ShowObj.css({
        top: Obj_top + Obj_scrollTop,
        left: Obj_left + Obj_scrollLeft,
      });
    }
    ShowObj.show();
  } else {
    return;
  }
}
function Download_Layer_Close(CloseObj) {
  CloseObj.hide();
}

function removeCkLayer() {
  if (!window.localStorage) {
    setCookie("ckTip", true);
  } else {
    window.localStorage.setItem("ckTip", true);
  }
  jq(".cookiesTip").hide();
  jq(".footer").css("margin-bottom", "0px");
  jq(".christmas_footer").css("margin-bottom", "0px");
}
function setCookie(cname, cvalue) {
  var expires = "expires=" + new Date(2147483647 * 1000).toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function checkCookie(cname) {
  var c = getCookie(cname);
  if (c != "") {
    return true;
  } else {
    return false;
  }
}
function judge_ie() {
  var win = window;
  var doc = win.document;
  var input = doc.createElement("input");
  var ie = (function () {
    if (win.ActiveXObject === undefined) return null;
    if (!win.XMLHttpRequest) return 6;
    if (!doc.querySelector) return 7;
    if (!doc.addEventListener) return 8;
    if (!win.atob) return 9;
    if (!input.dataset) return 10;
    return 11;
  })();
  return ie;
}
function get_Avangate_link() {
  var url = "https://www.glarysoft.com/";
  var id = jq("#avangate-affiliate-ID").val();
  if (id !== "" && judgeIsNum(id)) {
    url = url + "?linkid=" + id;
    jq("#avangate-affiliate-link").css("color", "#4764fa");
    jq("#avangate-affiliate-link").html(
      "<a href='" + url + "' target='_blank'>" + url + "</a>"
    );
  } else {
    jq("#avangate-affiliate-link").css("color", "#D70000");
    jq("#avangate-affiliate-link").html("Enter valid affiliate ID");
  }
}
function judgeIsNum(str) {
  var pattern = /^\d+jq/g;
  var result = str.match(pattern);
  if (result == null) {
    return false;
  } else {
    return true;
  }
}

function storeIcon() {
  var params = {
    container: document.getElementById("store"),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "/js/buy.json",
    name: "store",
  };
  try {
    const ANIM = lottie.loadAnimation(params);
    ANIM.addEventListener("enterFrame", function (e) {
      if (e.currentTime == 15) {
        /* jq("#store-wrap").css("visibility", "visible"); */
        ANIM.removeEventListener("enterFrame");
      }
    });
  } catch (e) {
  }
}
function viewportWidth() {
  var e = window,
    a = "inner";
  if (!("innerWidth" in window)) {
    a = "client";
    e = document.documentElement || document.body;
  }
  //return { width: e[a + "Width"], height: e[a + "Height"] };
  return e[a + "Width"];
}

function myTimer() {
  if (jq(".goog-te-gadget-simple").length) {
    var language = jq(".goog-te-gadget-simple span a span:first").html();
    if (language == "Select Language") {
      jq(".goog-te-gadget-simple span a span:first").html("English");
    }
    jq("#google_translate_element").css("visibility", "visible");
    clearInterval(myVar);
  }
}

function set_aff() {
  var url = document.location.toString();
  var arrUrl = url.split("?");
  var para = arrUrl[1];
  if (para) {
    var para_arr = para.split("&");
    var reg = /^[1-9][0-9]*jq/;
    jq.each(para_arr, function (index, value) {
      var v_tmp = value.split("=");
      if (
        (v_tmp[0] == "AFFILIATE" && reg.test(v_tmp[1])) ||
        (v_tmp[0] == "linkid" && reg.test(v_tmp[1]))
      ) {
        setCookie("AFFILIATE", v_tmp[1]);
        return false;
      }
    });
  }
}

function showDownloadsCon() {
  if (location.search) {
    var target = GetRequest();
  } else {
    return false;
  }
  jq.each(jq("#software-list").children(".software-item"), function (i) {
    if (jq(this).attr("page") === target) {
      if (!jq(this).hasClass("active")) {
        jq(this).addClass("active").siblings().removeClass("active");
      } else {
        jq(this).removeClass("active").addClass("active");
      }
      if (target === "free-tools") {
        jq("#decoration-6,#decoration-7").show();
        jq("#decoration-4,#decoration-").addClass("free");
      } else {
        jq("#decoration-6,#decoration-7").hide();
      }
      jq("#software-now")
        .children()
        .eq(i)
        .addClass("active")
        .siblings()
        .removeClass("active");
      return false;
    }
  });
}

function GetRequest() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest.p;
}
jq(window).on("load", function () {
  var myVar = setInterval(function () {
    myTimer();
  }, 50);
});

/* jq(window).on("resize", function () {
  var window_width = viewportWidth();
  if (jq(".header_r").length > 0) {
    if (window_width > 768) {
      if (jq(".header_r").css("display") == "none") {
        jq(".header_r").show();
      }
    } else {
      if (jq(".header_r").css("display") != "none") {
        jq(".header_r").hide();
      }
    }
  }
}); */

/* Resize Event */
jq(window).resize(function () {
  if (jq(window).width() != windowWidth) {
    windowWidth = jq(window).width();
    if (jq(".header_r").length > 0) {
      if (windowWidth > 768) {
        if (jq(".header_r").css("display") == "none") {
          jq(".header_r").show();
        }
      } else {
        if (jq(".header_r").css("display") != "none") {
          jq(".header_r").hide();
        }
      }
    }
  }
});

function isMobile(){
  return !!navigator.userAgent.match(
    /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
  );
};
