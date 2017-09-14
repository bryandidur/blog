/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.2
 * @license MIT <http://opensource.org/licenses/MIT>
 */


//  if (module.hot) {
//     $(window).on("message onmessage", function(event) {
//         if (typeof event.originalEvent.data === "string" && event.originalEvent.data.indexOf("webpackHotUpdate") === 0) {
//             console.log("Reloading style sheets...");
//             [].forEach.call(document.styleSheets, function (sheet) {
//                 if ((sheet.href || "").indexOf('localhost') !== -1) {
//                     sheet.ownerNode.href = sheet.href;
//                 }
//             });
//         }
//     });
// }

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

/* AdminLTE
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminLTE.options = {
  //Add slimscroll to navbar menus
  //This requires you to load the slimscroll plugin
  //in every page before app.js
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
  navbarMenuHeight: "200px", //The height of the inner menu
  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed: 500,
  //Sidebar push menu toggle button selector
  sidebarToggleSelector: "[data-toggle='push-menu']",
  //Activate sidebar push menu
  sidebarPushMenu: true,
  //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
  sidebarSlimScroll: true,
  //Enable sidebar expand on hover effect for sidebar mini
  //This option is forced to true if both the fixed layout and sidebar mini
  //are used together
  sidebarExpandOnHover: false,
  //BoxRefresh Plugin
  enableBoxRefresh: true,
  //Bootstrap.js tooltip
  enableBSToppltip: true,
  BSTooltipSelector: "[data-toggle='tooltip']",
  //Enable Fast Click. Fastclick.js creates a more
  //native touch experience with touch devices. If you
  //choose to enable the plugin, make sure you load the script
  //before AdminLTE's app.js
  enableFastclick: true,
  //Control Sidebar Options
  enableControlSidebar: true,
  controlSidebarOptions: {
    //Which button should trigger the open/close event
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    //The sidebar selector
    selector: ".control-sidebar",
    //Enable slide over content
    slide: true
  },
  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  //Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      //Collapse icon
      collapse: 'fa-minus',
      //Open icon
      open: 'fa-plus',
      //Remove icon
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      //Remove button selector
      remove: '[data-widget="remove"]',
      //Collapse button selector
      collapse: '[data-widget="collapse"]'
    }
  },
  //Direct Chat plugin options
  directChat: {
    //Enable direct chat by default
    enable: true,
    //The button to open and close the chat contacts pane
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  //Define the set of colors to use globally around the website
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  },
  //The standard screen sizes that bootstrap uses.
  //If you change these in the variables.less file, change
  //them here too.
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
  "use strict";

  //Fix for IE page transitions
  $("body").removeClass("hold-transition");

  //Extend options if external options exist
  if (typeof AdminLTEOptions !== "undefined") {
    $.extend(true,
        $.AdminLTE.options,
        AdminLTEOptions);
  }

  //Easy access to options
  var o = $.AdminLTE.options;

  //Set up the object
  _init();

  //Activate the layout maker
  $.AdminLTE.layout.activate();

  //Enable sidebar tree view controls
  $.AdminLTE.tree('.sidebar');

  //Enable control sidebar
  if (o.enableControlSidebar) {
    $.AdminLTE.controlSidebar.activate();
  }

  //Add slimscroll to navbar dropdown
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $(".navbar .menu").slimscroll({
      height: o.navbarMenuHeight,
      alwaysVisible: false,
      size: o.navbarMenuSlimscrollWidth
    }).css("width", "100%");
  }

  //Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
  }

  //Activate Bootstrap tooltip
  if (o.enableBSToppltip) {
    $('body').tooltip({
      selector: o.BSTooltipSelector
    });
  }

  //Activate box widget
  if (o.enableBoxWidget) {
    $.AdminLTE.boxWidget.activate();
  }

  //Activate fast click
  if (o.enableFastclick && typeof FastClick != 'undefined') {
    FastClick.attach(document.body);
  }

  //Activate direct chat widget
  if (o.directChat.enable) {
    $(document).on('click', o.directChat.contactToggleSelector, function () {
      var box = $(this).parents('.direct-chat').first();
      box.toggleClass('direct-chat-contacts-open');
    });
  }

  /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */
  $('.btn-group[data-toggle="btn-toggle"]').each(function () {
    var group = $(this);
    $(this).find(".btn").on('click', function (e) {
      group.find(".btn.active").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });

  });
});

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
function _init() {
  'use strict';
  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usage $.AdminLTE.layout.activate()
   *        $.AdminLTE.layout.fix()
   *        $.AdminLTE.layout.fixSidebar()
   */
  $.AdminLTE.layout = {
    activate: function () {
      var _this = this;
      _this.fix();
      _this.fixSidebar();
      $(window, ".wrapper").resize(function () {
        _this.fix();
        _this.fixSidebar();
      });
    },
    fix: function () {
      //Get window height and the wrapper height
      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      var window_height = $(window).height();
      var sidebar_height = $(".sidebar").height();
      //Set the min-height of the content and sidebar based on the
      //the height of the document.
      if ($("body").hasClass("fixed")) {
        $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
      } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
          $(".content-wrapper, .right-side").css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $(".content-wrapper, .right-side").css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
        if (typeof controlSidebar !== "undefined") {
          if (controlSidebar.height() > postSetWidth)
            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
        }

      }
    },
    fixSidebar: function () {
      //Make sure the body tag has the .fixed class
      if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
          $(".sidebar").slimScroll({destroy: true}).height("auto");
        }
        return;
      } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
      }
      //Enable slimscroll for fixed layout
      if ($.AdminLTE.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
          //Destroy if it exists
          $(".sidebar").slimScroll({destroy: true}).height("auto");
          //Add slimscroll
          $(".sidebar").slimscroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "rgba(0,0,0,0.2)",
            size: "3px"
          });
        }
      }
    }
  };

  /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
   */
  $.AdminLTE.pushMenu = {
    activate: function (toggleBtn) {
      //Get the screen sizes
      var screenSizes = $.AdminLTE.options.screenSizes;

      //Enable sidebar toggle
      $(document).on('click', toggleBtn, function (e) {
        e.preventDefault();

        //Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
          } else {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
          }
        }
        //Handle sidebar push menu for small screens
        else {
          if ($("body").hasClass('sidebar-open')) {
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
          } else {
            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
          }
        }
      });

      $(".content-wrapper").click(function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });

      //Enable expand on hover for sidebar mini
      if ($.AdminLTE.options.sidebarExpandOnHover
          || ($('body').hasClass('fixed')
          && $('body').hasClass('sidebar-mini'))) {
        this.expandOnHover();
      }
    },
    expandOnHover: function () {
      var _this = this;
      var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
      //Expand sidebar on hover
      $('.main-sidebar').hover(function () {
        if ($('body').hasClass('sidebar-mini')
            && $("body").hasClass('sidebar-collapse')
            && $(window).width() > screenWidth) {
          _this.expand();
        }
      }, function () {
        if ($('body').hasClass('sidebar-mini')
            && $('body').hasClass('sidebar-expanded-on-hover')
            && $(window).width() > screenWidth) {
          _this.collapse();
        }
      });
    },
    expand: function () {
      $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },
    collapse: function () {
      if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
      }
    }
  };

  /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @type Function
   * @Usage: $.AdminLTE.tree('.sidebar')
   */
  $.AdminLTE.tree = function (menu) {
    var _this = this;
    var animationSpeed = $.AdminLTE.options.animationSpeed;
    $(menu).on('click', 'li a', function (e) {
      //Get the clicked link and the next element
      var $this = $(this);
      var checkElement = $this.next();

      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
          //Fix the layout in case the sidebar stretches over the height of the window
          //_this.layout.fix();
        });
        checkElement.parent("li").removeClass("active");
      }
      //If the menu is not visible
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        //Get the parent menu
        var parent = $this.parents('ul').first();
        //Close all open menus within the parent
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        //Remove the menu-open class from the parent
        ul.removeClass('menu-open');
        //Get the parent li
        var parent_li = $this.parent("li");

        //Open the target menu and add the menu-open class
        checkElement.slideDown(animationSpeed, function () {
          //Add the class active to the parent li
          checkElement.addClass('menu-open');
          parent.find('li.active').removeClass('active');
          parent_li.addClass('active');
          //Fix the layout in case the sidebar stretches over the height of the window
          _this.layout.fix();
        });
      }
      //if this isn't a link, prevent the page from being redirected
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }
    });
  };

  /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.AdminLTE.controlSidebar.activate(options)
   */
  $.AdminLTE.controlSidebar = {
    //instantiate the object
    activate: function () {
      //Get the object
      var _this = this;
      //Update options
      var o = $.AdminLTE.options.controlSidebarOptions;
      //Get the sidebar
      var sidebar = $(o.selector);
      //The toggle button
      var btn = $(o.toggleBtnSelector);

      //Listen to the click event
      btn.on('click', function (e) {
        e.preventDefault();
        //If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
            && !$('body').hasClass('control-sidebar-open')) {
          //Open the sidebar
          _this.open(sidebar, o.slide);
        } else {
          _this.close(sidebar, o.slide);
        }
      });

      //If the body has a boxed layout, fix the sidebar bg position
      var bg = $(".control-sidebar-bg");
      _this._fix(bg);

      //If the body has a fixed layout, make the control sidebar fixed
      if ($('body').hasClass('fixed')) {
        _this._fixForFixed(sidebar);
      } else {
        //If the content height is less than the sidebar's height, force max height
        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
          _this._fixForContent(sidebar);
        }
      }
    },
    //Open the control sidebar
    open: function (sidebar, slide) {
      //Slide over content
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        $('body').addClass('control-sidebar-open');
      }
    },
    //Close the control sidebar
    close: function (sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    _fix: function (sidebar) {
      var _this = this;
      if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        $(window).resize(function () {
          _this._fix(sidebar);
        });
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto'
        });
      }
    },
    _fixForFixed: function (sidebar) {
      sidebar.css({
        'position': 'fixed',
        'max-height': '100%',
        'overflow': 'auto',
        'padding-bottom': '50px'
      });
    },
    _fixForContent: function (sidebar) {
      $(".content-wrapper, .right-side").css('min-height', sidebar.height());
    }
  };

  /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @type Object
   * @usage $.AdminLTE.boxWidget.activate()
   *        Set all your options in the main $.AdminLTE.options object
   */
  $.AdminLTE.boxWidget = {
    selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminLTE.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }
      //Listen for collapse event triggers
      $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      //Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function (element) {
      var _this = this;
      //Find the box parent
      var box = element.parents(".box").first();
      //Find the body and the footer
      var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      if (!box.hasClass("collapsed-box")) {
        //Convert minus into plus
        element.children(":first")
            .removeClass(_this.icons.collapse)
            .addClass(_this.icons.open);
        //Hide the content
        box_content.slideUp(_this.animationSpeed, function () {
          box.addClass("collapsed-box");
        });
      } else {
        //Convert plus into minus
        element.children(":first")
            .removeClass(_this.icons.open)
            .addClass(_this.icons.collapse);
        //Show the content
        box_content.slideDown(_this.animationSpeed, function () {
          box.removeClass("collapsed-box");
        });
      }
    },
    remove: function (element) {
      //Find the box parent
      var box = element.parents(".box").first();
      box.slideUp(this.animationSpeed);
    }
  };
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
(function ($) {

  "use strict";

  $.fn.boxRefresh = function (options) {

    // Render options
    var settings = $.extend({
      //Refresh button selector
      trigger: ".refresh-btn",
      //File source to be loaded (e.g: ajax/src.php)
      source: "",
      //Callbacks
      onLoadStart: function (box) {
        return box;
      }, //Right after the button has been clicked
      onLoadDone: function (box) {
        return box;
      } //When the source has been loaded

    }, options);

    //The overlay
    var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

    return this.each(function () {
      //if a source is specified
      if (settings.source === "") {
        if (window.console) {
          window.console.log("Please specify a source first - boxRefresh()");
        }
        return;
      }
      //the box
      var box = $(this);
      //the button
      var rBtn = box.find(settings.trigger).first();

      //On trigger click
      rBtn.on('click', function (e) {
        e.preventDefault();
        //Add loading overlay
        start(box);

        //Perform ajax call
        box.find(".box-body").load(settings.source, function () {
          done(box);
        });
      });
    });

    function start(box) {
      //Add overlay and loading img
      box.append(overlay);

      settings.onLoadStart.call(box);
    }

    function done(box) {
      //Remove overlay and loading img
      box.find(overlay).remove();

      settings.onLoadDone.call(box);
    }

  };

})(jQuery);

 /*
 * EXPLICIT BOX CONTROLS
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded, toggle and remove box.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 * @usage $("#box-widget").toggleBox();
 * @usage $("#box-widget").removeBox();
 */
(function ($) {

  'use strict';

  $.fn.activateBox = function () {
    $.AdminLTE.boxWidget.activate(this);
  };

  $.fn.toggleBox = function(){
    var button = $($.AdminLTE.boxWidget.selectors.collapse, this);
    $.AdminLTE.boxWidget.collapse(button);
  };

  $.fn.removeBox = function(){
    var button = $($.AdminLTE.boxWidget.selectors.remove, this);
    $.AdminLTE.boxWidget.remove(button);
  };

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */
(function ($) {

  'use strict';

  $.fn.todolist = function (options) {
    // Render options
    var settings = $.extend({
      //When the user checks the input
      onCheck: function (ele) {
        return ele;
      },
      //When the user unchecks the input
      onUncheck: function (ele) {
        return ele;
      }
    }, options);

    return this.each(function () {

      if (typeof $.fn.iCheck != 'undefined') {
        $('input', this).on('ifChecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onCheck.call(ele);
        });

        $('input', this).on('ifUnchecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onUncheck.call(ele);
        });
      } else {
        $('input', this).on('change', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          if ($('input', ele).is(":checked")) {
            settings.onCheck.call(ele);
          } else {
            settings.onUncheck.call(ele);
          }
        });
      }
    });
  };
}(jQuery));

/**
 * Initializes the layout
 *
 * @return void
 */
window.layoutInit = function () {
    //Easy access to options
    var o = $.AdminLTE.options;

    //Activate the layout maker
    $.AdminLTE.layout.activate();

    //Enable sidebar tree view controls
    $.AdminLTE.tree('.sidebar');

    //Enable control sidebar
    if (o.enableControlSidebar) {
        $.AdminLTE.controlSidebar.activate();
    }

    //Add slimscroll to navbar dropdown
    if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
        $(".navbar .menu").slimscroll({
        height: o.navbarMenuHeight,
        alwaysVisible: false,
        size: o.navbarMenuSlimscrollWidth
        }).css("width", "100%");
    }

    //Activate Bootstrap tooltip
    if (o.enableBSToppltip) {
        $('body').tooltip({
        selector: o.BSTooltipSelector
        });
    }

    //Activate box widget
    if (o.enableBoxWidget) {
        $.AdminLTE.boxWidget.activate();
    }

    //Activate fast click
    if (o.enableFastclick && typeof FastClick != 'undefined') {
        FastClick.attach(document.body);
    }

    //Activate direct chat widget
    if (o.directChat.enable) {
        $(document).on('click', o.directChat.contactToggleSelector, function () {
        var box = $(this).parents('.direct-chat').first();
        box.toggleClass('direct-chat-contacts-open');
        });
    }
};

/*
|--------------------------------------------------------------------------
| Application Environment Setup
|--------------------------------------------------------------------------
|
| Define the enviroment setup variables and set the application mode.
|
*/

'use strict';

window.env = window.env || {};

window.env.APP_NAME = 'Blog';
window.env.APP_ENV = 'development';
window.env.APP_URL = 'http://localhost:8080/';
window.env.API_URL = 'http://localhost:8000/';

/**
 * Generate an Application URL for the path.
 *
 * @param  string path
 * @return string
 */
var url = function (path)
{
    return env.APP_URL + path;
};

/**
 * Generate an API URL for the path.
 *
 * @param  string path
 * @return string
 */
var api_url = function (path)
{
    return env.API_URL + path;
};

/**
 * Generate the full view path for the view name.
 *
 * @param  string viewName
 * @return string
 */
var view = function (viewName)
{
    return 'views/' + viewName;
};

/**
 * Shows an toast to notify an message the user.
 *
 * @param  string message
 * @param  string state
 * @param  number timeout
 * @return void
 */
var notify = function (message, state, timeout)
{
    var title, states, timeout;
    states = ['success', 'error', 'info', 'warning'];
    state = (state && states.indexOf(state) > -1) ? state : 'success';
    timeout = timeout ? parseInt(timeout) : 5000;

    switch (state) {
        case 'success': title = 'OK!'; break;
        case 'error': title = 'Falha!'; break;
        case 'info': title = 'Atenção!'; break;
        case 'warning': title = 'Aviso!'; break;
    }

    toastr[state](message, title, {
        escapeHtml: true,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        showDuration: "300",
        hideDuration: "1000",
        timeOut: timeout,
    });
};

/**
 * Display server (API) messages to the user,
 * with the help of the "notify()" helper.
 *
 * @param  object data
 * @param  string state
 * @param  number timeout
 * @return void
 */
var show_messages = function (data, state, timeout) {
    if ( data instanceof Object ) {
        var i, key, msgs = '';

        for (key in data) {
            if ( data[key] instanceof Array ) {
                for (i = 0; i < data[key].length; i++) {
                    msgs += data[key][i] + '<br>';
                }
            } else {
                msgs = data[key];
            }
        }

        notify(msgs, state, timeout);
    }
};

/**
 * Alias for "console.log()".
 *
 * @param  mixed args
 * @return void
 */
var log = function (args) {
    var argsLength = arguments.length;
    for (var i = 0; i < argsLength; i++) {
        console.log(arguments[i]);
    }
};

/**
 * Define the main application module.
 *
 * @type object
 */
var appModule = angular.module('app', [
    'ngMessages', 'ui.router', 'ui.router.state.events',
    'validation', 'auth', 'root-dashboard', 'dashboard',
    'users', 'tags', 'categories', 'articles', 'files'
]);

/*
|--------------------------------------------------------------------------
| Main Application Configuration Setup
|--------------------------------------------------------------------------
|
| Set up the app routes and other main configurations.
|
*/

appModule.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise('/login');

        var routeStates = {
            // Auth
            'login': {
                url: '/login',
                templateUrl: view('login.html'),
                controller: 'LoginController',
            },
            'forgot-password': {
                url: '/reset',
                templateUrl: view('forgot-password.html'),
                controller: 'ForgotPasswordController',
            },
            'reset-password': {
                url: '/reset/:token',
                templateUrl: view('reset-password.html'),
                controller: 'ResetPasswordController',
            },

            // Root Dashboard | Dashboard
            'root-dashboard': {
                abstract: true,
                templateUrl: view('root-dashboard.html'),
                controller: 'RootDashboardController',
            },
            'dashboard': {
                parent: 'root-dashboard',
                url: '/dashboard',
                templateUrl: view('dashboard.html'),
                controller: 'DashboardController',
            },

            // Users
            'users-list': {
                parent: 'root-dashboard',
                url: '/users',
                templateUrl: view('users-list.html'),
                controller: 'UsersListController',
            },
            'users-register': {
                parent: 'root-dashboard',
                url: '/users/register',
                templateUrl: view('users-register.html'),
                controller: 'UsersRegisterController',
            },
            'users-profile': {
                parent: 'root-dashboard',
                url: '/users/:id',
                templateUrl: view('users-profile.html'),
                controller: 'UsersProfileController',
            },

            // Tags
            'tags-list': {
                parent: 'root-dashboard',
                url: '/tags',
                templateUrl: view('tags-list.html'),
                controller: 'TagsListController',
            },
            'tags-create': {
                parent: 'root-dashboard',
                url: '/tags/create',
                templateUrl: view('tags-create.html'),
                controller: 'TagsCreateController',
            },
            'tags-update': {
                parent: 'root-dashboard',
                url: '/tags/:id',
                templateUrl: view('tags-update.html'),
                controller: 'TagsUpdateController',
            },

            // Categories
            'categories-list': {
                parent: 'root-dashboard',
                url: '/categories',
                templateUrl: view('categories-list.html'),
                controller: 'CategoriesListController',
            },
            'categories-create': {
                parent: 'root-dashboard',
                url: '/categories/create',
                templateUrl: view('categories-create.html'),
                controller: 'CategoriesCreateController',
            },
            'categories-update': {
                parent: 'root-dashboard',
                url: '/categories/:id',
                templateUrl: view('categories-update.html'),
                controller: 'CategoriesUpdateController',
            },

            // Articles
            'articles-list': {
                parent: 'root-dashboard',
                url: '/articles',
                templateUrl: view('articles-list.html'),
                controller: 'ArticlesListController',
            },
            'articles-create': {
                parent: 'root-dashboard',
                url: '/articles/create',
                templateUrl: view('articles-create.html'),
                controller: 'ArticlesCreateController',
            },
            'articles-update': {
                parent: 'root-dashboard',
                url: '/articles/:id',
                templateUrl: view('articles-update.html'),
                controller: 'ArticlesUpdateController',
            },

            // Files
            'files-list': {
                parent: 'root-dashboard',
                url: '/files',
                templateUrl: view('files-list.html'),
                controller: 'FilesListController',
            },
            'files-upload': {
                parent: 'root-dashboard',
                url: '/files/upload',
                templateUrl: view('files-upload.html'),
                controller: 'FilesUploadController',
            },
        };

        // Register routeStates
        for (var state in routeStates) {
            $stateProvider.state(state, routeStates[state]);
        }
    }
]);

/**
 * Define the validation module.
 *
 * @type object
 */
var validationModule = angular.module('validation', ['ngMessages']);

/*
|--------------------------------------------------------------------------
| Directive For Validate E-mails
|--------------------------------------------------------------------------
|
*/

validationModule.directive('validateEmail',
    function ()
    {
        return {
            restrict: 'A',
            require: '?ng-model',
            link: function (scope, element, attributes, controller)
            {
                // Only apply the validator if ngModel is present and AngularJS has added the email validator
                if ( controller && controller.$validators.email ) {
                    var emailREGEXP = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

                    // This will overwrite the default AngularJS email validator
                    controller.$validators.email = function (modelValue) {
                        return emailREGEXP.test(modelValue);
                    };
                }
            }
        };
    }
);

/*
|--------------------------------------------------------------------------
| Directive For Validate Password Confirmation
|--------------------------------------------------------------------------
|
*/

validationModule.directive('validatePasswordConfirmation',
    function ()
    {
        return {
            restrict: 'A',
            require: '?ng-model',
            scope: {
                passwordToCompare: "=validatePasswordConfirmation"
            },
            link: function(scope, element, attributes, controller)
            {
                // Only apply the validator if ngModel is present
                if ( controller ) {
                    controller.$validators.validatePasswordConfirmation = function (modelValue) {
                        return modelValue == scope.passwordToCompare;
                    };

                    scope.$watch("passwordToCompare", function () {
                        controller.$validate();
                    });
                }
            }
        };
    }
);

/**
 * Define the authentication module.
 *
 * @type object
 */

var authModule = angular.module('auth', ['ngMessages', 'ui.router']);

/*
|--------------------------------------------------------------------------
| Auth Configuration Setup
|--------------------------------------------------------------------------
|
| Set up the HTTP interceptors and other main configurations.
|
*/

authModule.config([
    '$httpProvider',
    function ($httpProvider)
    {
        $httpProvider.interceptors.push('RefreshAuthorizationHeaderService');
    }
]);

/*
|--------------------------------------------------------------------------
| Authentication Service
|--------------------------------------------------------------------------
|
*/

authModule.service('AuthService', [
    '$q', '$http',
    function ($q, $http)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('auth');

        /**
         * Fillable authentication session data.
         *
         * @type array
         */
        self.fillableSessionData = ['access_token', 'user', 'authenticated'];

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * AngularJS HTTP service.
         *
         * @type object
         */
        self.httpService = $http;

        /**
         * Makes the request for the user authentication.
         *
         * @param  object credentials
         * @return Angular promise
         */
        self.authenticate = function (credentials)
        {
            var deferredPromise = self.qService.defer();

            self.httpService.post(self.requestUrl, credentials).then(
                function (response)
                {
                    self.setSessionData(angular.extend(response.data, {authenticated: true}));

                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    self.clearSessionData();

                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for the user unauthentication.
         *
         * @return Angular promise
         */
        self.unAuthenticate = function ()
        {
            var deferredPromise = self.qService.defer();

            self.httpService.delete(self.requestUrl).then(
                function (response)
                {
                    self.clearSessionData();

                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    self.clearSessionData();

                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Check if user is authenticated by getting the
         * authenticated key on the local storage.
         *
         * @return bool
         */
        self.isAuthenticated = function () {
            return self.getSessionData('authenticated') || false;
        };

        /**
         * Get user data from local storage.
         *
         * @return object
         */
        self.getUser = function ()
        {
            return angular.fromJson(self.getSessionData('user'));
        };

        /**
         * Get authentication session data from local storage by its name.
         *
         * @param  string name
         * @return string|null
         */
        self.getSessionData = function (name)
        {
            if ( typeof name == 'undefined' ) {
                var data = {};

                self.fillableSessionData.forEach(function (value, key) {
                    if ( localStorage.getItem(value) ) {
                        data[value] = localStorage.getItem(value);
                    }
                });

                return data;
            }

            if ( self.fillableSessionData.indexOf(name) > -1 ) {
                return localStorage.getItem(name);
            }

            return null;
        };

        /**
         * Set authentication session data on local storage.
         *
         * @param  string name
         * @param  mixed  value
         * @return string|null
         */
        self.setSessionData = function (name, value)
        {
            var key, value, data = {};

            if ( typeof name == 'object' ) {
                for (key in name) {
                    if ( self.fillableSessionData.indexOf(key) > -1 ) {
                        data[key] = name[key];
                        value = (typeof name[key] == 'object') ? angular.toJson(name[key]) :
                           (key == 'access_token') ? 'Bearer ' + name[key] : name[key];

                        localStorage.setItem(key, value);
                    }
                }

                return data;
            }

            if ( self.fillableSessionData.indexOf(name) > -1 ) {
                data[name] = value;

                localStorage.setItem(name, value);

                return data;
            }

            return null;
        };

        /**
         * Remove the authentication session data from local storage by its name.
         *
         * @param  string name
         * @return bool|void
         */
        self.clearSessionData = function (name)
        {
            if ( self.fillableSessionData.indexOf(name) > -1 ) {
                localStorage.removeItem(name);
                return true;
            }

            self.fillableSessionData.forEach(function (value, key) {
                localStorage.removeItem(value);
            });
        };
    }
]);

/*
|--------------------------------------------------------------------------
| Forgot Password Service
|--------------------------------------------------------------------------
|
*/

authModule.service('ForgotPasswordService', [
    '$q', '$http',
    function ($q, $http)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('auth/reset');

        /**
         * URL to reset password.
         * @type string
         */
        self.resetPasswordURL = url('#!/reset/{token}');

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * AngularJS HTTP service.
         *
         * @type object
         */
        self.httpService = $http;

        /**
         * Makes the request for send reset link e-mail.
         *
         * @param  string email
         * @return Angular promise
         */
        self.sendResetLinkEmail = function (email)
        {
            var deferredPromise = self.qService.defer();
            var data = {email: email, route: self.resetPasswordURL};

            self.httpService.post(self.requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };
    }
]);

/*
|--------------------------------------------------------------------------
| (HTTP Interceptor) Refresh Authorization Header Service
|--------------------------------------------------------------------------
|
*/

authModule.factory('RefreshAuthorizationHeaderService', [
    '$q', '$injector',
    function ($q, $injector)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * Get the user access token.
         *
         * @return string
         */
        self.getRequestAccessToken = function ()
        {
            var AuthService = $injector.get('AuthService')
            var accessToken = AuthService.getSessionData('access_token');

            return accessToken;
        };

        /**
         * Set the user access token to the request.
         *
         * @param object request
         * @param string accessToken
         */
        self.setRequestAccessToken = function (request, accessToken)
        {
            request.headers.Authorization = accessToken;
        };

        /**
         * Get the newly refreshed access token from the API response.
         *
         * @param  object responseORrejection
         * @return string
         */
        self.getResponseAccessToken = function (responseORrejection)
        {
            // Get the refreshed access_token on Authorization header
            var refreshedAccessToken = responseORrejection.headers('Authorization');

            return refreshedAccessToken;
        };

        /**
         * Set the newly refreshed access token to the user session.
         *
         * @param string refreshedAccessToken
         */
        self.setResponseAccessToken = function (refreshedAccessToken)
        {
            var AuthService = $injector.get('AuthService')

            // Only update the session access_token if the request
            // was sent to the api server and its returned an new access_token
            if ( refreshedAccessToken ) {
                AuthService.setSessionData('access_token', refreshedAccessToken)
            }
        };

        /**
         * Succeeded requests interceptor.
         *
         * @param  object request
         * @return object
         */
        self.request = function (request)
        {
            self.setRequestAccessToken(request, self.getRequestAccessToken());

            return request;
        };

        /**
         * Succeeded responses interceptor.
         *
         * @param  object response
         * @return object
         */
        self.response = function (response)
        {
            self.setResponseAccessToken(self.getResponseAccessToken(response));

            return response;
        };

        /**
         * Failed responses interceptor.
         *
         * @param  object rejection
         * @return Rejected Angular promise
         */
        self.responseError = function (rejection)
        {
            self.setResponseAccessToken(self.getResponseAccessToken(rejection));

            return self.qService.reject(rejection);
        };

        return self;
    }
]);

/*
|--------------------------------------------------------------------------
| Reset Password Service
|--------------------------------------------------------------------------
|
*/

authModule.service('ResetPasswordService', [
    '$q', '$http', 'AuthService',
    function ($q, $http, AuthService)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('auth/reset');

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * AngularJS HTTP service.
         *
         * @type object
         */
        self.httpService = $http;

        /**
         * Makes the request for reset password.
         *
         * @param  object credentials
         * @return Angular promise
         */
        self.resetPassword = function (credentials)
        {
            var deferredPromise = self.qService.defer();

            self.httpService.put(self.requestUrl, credentials).then(
                function (response)
                {
                    AuthService.setSessionData(angular.extend(response.data, {authenticated: true}));

                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };
    }
]);

/*
|--------------------------------------------------------------------------
| Define Controller For The "Forgot Password"
|--------------------------------------------------------------------------
|
*/

authModule.controller('ForgotPasswordController', [
    '$scope', 'ForgotPasswordService',
    function ($scope, ForgotPasswordService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * User email.
         *
         * @type string
         */
        self.email = '';

        /**
         * Send the request for send reset link e-mail.
         *
         * @return void
         */
        self.sendResetLinkEmail = function ()
        {
            ForgotPasswordService.sendResetLinkEmail(self.email).then(
                function (response)
                {
                    notify('Nós enviamos à você um link para a recuperação de senha. Cheque sua caixa de entrada!', 'success');
                },
                function (response)
                {
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);

/*
|--------------------------------------------------------------------------
| Define Controller For Login
|--------------------------------------------------------------------------
|
*/

authModule.controller('LoginController', [
    '$scope', '$state', 'AuthService',
    function ($scope, $state, AuthService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * User credentials.
         *
         * @type object
         */
        self.credentials = {};

        /**
         * Send the request for the user authentication.
         *
         * @return void
         */
        self.authenticate = function ()
        {
            AuthService.authenticate(self.credentials).then(
                function (response)
                {
                    notify('Login efetuado com sucesso!', 'success');

                    $state.go('dashboard');
                },
                function (response)
                {
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);

/*
|--------------------------------------------------------------------------
| Define Controller For Reset Password
|--------------------------------------------------------------------------
|
*/

authModule.controller('ResetPasswordController', [
    '$scope', '$state', '$stateParams', 'ResetPasswordService',
    function ($scope, $state, $stateParams, ResetPasswordService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * User credentials.
         *
         * @type object
         */
        self.credentials = {};

        /**
         * Route token.
         *
         * @type string
         */
        self.credentials.token = $stateParams.token;

        /**
         * Send the request for reset password.
         *
         * @return void
         */
        self.resetPassword = function ()
        {
            ResetPasswordService.resetPassword(self.credentials).then(
                function (response)
                {
                    notify('Sua senha foi recuperada com sucesso!', 'success');

                    $state.go('dashboard');
                },
                function (response)
                {
                    show_messages(response.data, 'error');
                }
            );
        };
    },
]);

/**
 * Define the root dashboard module.
 *
 * @type object
 */
var rootDashboardModule = angular.module('root-dashboard', ['ui.router', 'auth']);

/*
|--------------------------------------------------------------------------
| Main Root Dashboard Configuration Setup
|--------------------------------------------------------------------------
|
| Set up the HTTP interceptors and other main configurations.
|
*/

rootDashboardModule.config([
    '$httpProvider',
    function ($httpProvider)
    {
        $httpProvider.interceptors.push('AuthorizationHttpInterceptorService');
    }
]);

rootDashboardModule.run([
    '$transitions', '$injector',
    function ($transitions, $injector)
    {
        /*
        | Policie for checking if user is authenticated
        | to access the root dashboard and its child states.
         */
        $transitions.onStart({}, function (trans)
        {
            var toState = trans.to();
            var toStateBelongsToRootDashboardState = toState.parent == 'root-dashboard';
            var AuthService = $injector.get('AuthService');

            if ( ! AuthService.isAuthenticated() && toStateBelongsToRootDashboardState ) {
                // User isn't authenticated. Redirect to a new Target State
                return trans.router.stateService.target('login');
            }
        });
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For The Root Dashboard
|--------------------------------------------------------------------------
|
*/

rootDashboardModule.controller('RootDashboardController', [
    '$scope', '$state', 'AuthService',
    function ($scope, $state, AuthService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Authenticated user.
         *
         * @type object
         */
        self.authUser = AuthService.getUser();

        /**
         * Log user out of the application.
         *
         * @return void
         */
        self.logout = function ()
        {
            AuthService.unAuthenticate().then(
                function (response)
                {
                    notify('Logout efetuado com sucesso!', 'success');

                    $state.go('login');
                }
            );
        };

        // Initializes the layout scripts
        window.layoutInit();
    }
]);

/*
|--------------------------------------------------------------------------
| (HTTP Interceptor) Authorization Http Interceptor Service
|--------------------------------------------------------------------------
|
*/

rootDashboardModule.factory('AuthorizationHttpInterceptorService', [
    '$q', '$state',
    function ($q, $state)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * State service.
         *
         * @type object
         */
        self.stateService = $state;

        /**
         * Failed responses interceptor.
         *
         * @param  object rejection
         * @return Rejected Angular promise
         */
        self.responseError = function (rejection)
        {
            var status = rejection.status;

            // Check if the response was sent with Unauthorized status
            if ( status == 401 ) {
                notify('Sua sessão foi finalizada. você precisa fazer login novamente.', 'info', 10000);
                self.stateService.go('login');
            }

            return self.qService.reject(rejection);
        };

        return self;
    }
]);

/**
 * Define the dashboard module.
 *
 * @type object
 */
var dashboardModule = angular.module('dashboard', []);

/*
|--------------------------------------------------------------------------
| Controller For The Dashboard
|--------------------------------------------------------------------------
|
*/

dashboardModule.controller('DashboardController', [
    '$scope',
    function ($scope)
    {
        /**
         * This controller scope.
         */
        var self = $scope;

        //
    }
]);

/**
 * Define the users module.
 *
 * @type object
 */
var usersModule = angular.module('users', ['ngMessages', 'ui.router', 'auth']);

/*
|--------------------------------------------------------------------------
| Main Users Service
|--------------------------------------------------------------------------
|
*/

usersModule.service('UsersService', [
    '$q', '$http',
    function ($q, $http)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('admin/users');

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * AngularJS HTTP service.
         *
         * @type object
         */
        self.httpService = $http;

        /**
         * Makes the request for get all users on the API.
         *
         * @return Angular promise
         */
        self.all = function ()
        {
            var deferredPromise = self.qService.defer();

            self.httpService.get(self.requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for get an specific user on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.find = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.get(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }

        /**
         * Makes the request for store a newly registered users on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.store = function (data)
        {
            var deferredPromise = self.qService.defer();

            self.httpService.post(self.requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for update user on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.update = function (data)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + data.id;

            self.httpService.put(requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for delete user on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.destroy = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.delete(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Users List
|--------------------------------------------------------------------------
|
*/

usersModule.controller('UsersListController', [
    '$scope', 'UsersService',
    function ($scope, UsersService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * All users.
         *
         * @type array
         */
        self.users = [];

        /**
         * Send the request to get all users.
         *
         * @return void
         */
        self.getAll = function ()
        {
            UsersService.all().then(
                function (response)
                {
                    self.users = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter os usuários!', 'error');
                }
            );
        };

        self.getAll();
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Users Profile
|--------------------------------------------------------------------------
|
*/

usersModule.controller('UsersProfileController', [
    '$scope', '$q', '$state', '$stateParams', 'UsersService', 'AuthService',
    function ($scope, $q, $state, $stateParams, UsersService, AuthService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Request user id.
         *
         * @type number
         */
        self.id = $stateParams.id;

        /**
         * Requested user.
         *
         * @type object
         */
        self.user = {};

        /**
         * Authenticated user.
         *
         * @type object
         */
        self.authUser = AuthService.getUser();

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * Send the request to the user update.
         *
         * @return void
         */
        self.update = function ()
        {
            self.user = self.removeEmptyData(self.user);

            UsersService.update(self.user).then(
                function (response)
                {
                    notify('Perfil atualizado com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações do usuário!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the user delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            UsersService.destroy(self.id).then(
                function (response)
                {
                    if ( self.authUser.id == self.user.id ) {
                        AuthService.unAuthenticate();

                        notify('Sua conta foi deletada com sucesso!', 'success');

                        return $state.go('login');
                    }

                    notify('Usuário deletado com sucesso!', 'success');

                    $state.go('users-list');
                },
                function (response)
                {
                    notify('Não foi possível deletar o perfil do usuário!', 'error');
                }
            );
        };

        /**
         * Send the requests to get data needed by the view.
         *
         * @return void
         */
        self.getViewData = function ()
        {
            var usersPromise = UsersService.find(self.id);

            var callbacks = {
                success: function (response)
                {
                    self.user = response[0].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para a edição!', 'error');
                }
            };

            self.qService.all([usersPromise]).then(callbacks.success).catch(callbacks.error);
        };

        /**
         * Removes empty keys from data object.
         *
         * @param  object data
         * @return object
         */
        self.removeEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        };

        self.getViewData();
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Users Register
|--------------------------------------------------------------------------
|
*/

usersModule.controller('UsersRegisterController', [
    '$scope', 'UsersService',
    function ($scope, UsersService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * User to be filled.
         *
         * @type object
         */
        self.user = {};

        /**
         * Send a request for store a newly registered user.
         *
         * @return void
         */
        self.store = function ()
        {
            UsersService.store(self.user).then(
                function (response)
                {
                    self.user = {};

                    notify('Usuário registrado com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível registrar o usuário!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);

/**
 * Define the tags module.
 *
 * @type object
 */
var tagsModule = angular.module('tags', ['ngMessages', 'ui.router']);

/*
|--------------------------------------------------------------------------
| Main Tags Service
|--------------------------------------------------------------------------
|
*/

tagsModule.service('TagsService', [
    '$q', '$http',
    function ($q, $http)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('admin/tags');

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * AngularJS HTTP service.
         *
         * @type object
         */
        self.httpService = $http;

        /**
         * Makes the request for get all tags on the API.
         *
         * @return Angular promise
         */
        self.all = function ()
        {
            var deferredPromise = self.qService.defer();

            self.httpService.get(self.requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for get an specific tag on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.find = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.get(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }

        /**
         * Makes the request for store a newly created tag on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.store = function (data)
        {
            var deferredPromise = self.qService.defer();

            self.httpService.post(self.requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for update tag on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.update = function (data)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + data.id;

            self.httpService.put(requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for delete tag on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.destroy = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.delete(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Tags Create
|--------------------------------------------------------------------------
|
*/

tagsModule.controller('TagsCreateController', [
    '$scope', 'TagsService',
    function ($scope, TagsService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Tag to be filled.
         *
         * @type object
         */
        self.tag = {};

        /**
         * Send a request for store a newly created tag.
         *
         * @return void
         */
        self.store = function ()
        {
            TagsService.store(self.tag).then(
                function (response)
                {
                    self.tag = {};

                    notify('Tag cadastrada com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível cadastrar a tag!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        }
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Tags List
|--------------------------------------------------------------------------
|
*/

tagsModule.controller('TagsListController', [
    '$scope', 'TagsService',
    function ($scope, TagsService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * All tags.
         *
         * @type array
         */
        self.tags = [];

        /**
         * Send the request to get all tags.
         *
         * @return void
         */
        self.getAll = function ()
        {
            TagsService.all().then(
                function (response)
                {
                    self.tags = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter as tags!', 'error');
                }
            );
        };

        self.getAll();
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Tags Update
|--------------------------------------------------------------------------
|
*/

tagsModule.controller('TagsUpdateController', [
    '$scope', '$q', '$state', '$stateParams', 'TagsService',
    function ($scope, $q, $state, $stateParams, TagsService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Request tag id.
         *
         * @type number
         */
        self.id = $stateParams.id;

        /**
         * Requested tag.
         *
         * @type object
         */
        self.tag = {};

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * Send the request to the tag update.
         *
         * @return void
         */
        self.update = function ()
        {
            self.tag = self.removeEmptyData(self.tag);

            TagsService.update(self.tag).then(
                function (response)
                {
                    notify('Tag editada com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações da tag!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the tag delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            TagsService.destroy(self.id).then(
                function (response)
                {
                    notify('Tag deletada com sucesso!', 'success');

                    $state.go('categories-list');
                },
                function (response)
                {
                    notify('Não foi possível deletar a tag!', 'error');
                }
            );
        };

        /**
         * Send the requests to get data needed by the view.
         *
         * @return void
         */
        self.getViewData = function ()
        {
            var tagPromise = TagsService.find(self.id);

            var callbacks = {
                success: function (response)
                {
                    self.tag = response[0].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para a edição!', 'error');
                }
            };

            self.qService.all([tagPromise]).then(callbacks.success).catch(callbacks.error);
        };

        /**
         * Removes empty keys from data object.
         *
         * @param  object data
         * @return object
         */
        self.removeEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        };

        self.getViewData();
    }
]);

/**
 * Define the categories module.
 *
 * @type object
 */
var categoriesModule = angular.module('categories', ['ngMessages', 'ui.router']);

/*
|--------------------------------------------------------------------------
| Main Categories Service
|--------------------------------------------------------------------------
|
*/

categoriesModule.service('CategoriesService', [
    '$q', '$http',
    function ($q, $http)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('admin/categories');

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * AngularJS HTTP service.
         *
         * @type object
         */
        self.httpService = $http;

        /**
         * Makes the request for get all categories on the API.
         *
         * @return Angular promise
         */
        self.all = function ()
        {
            var deferredPromise = self.qService.defer();

            self.httpService.get(self.requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for get an specific category on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.find = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.get(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }

        /**
         * Makes the request for store a newly created category on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.store = function (data)
        {
            var deferredPromise = self.qService.defer();

            self.httpService.post(self.requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for update category on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.update = function (data)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + data.id;

            self.httpService.put(requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for delete category on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.destroy = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.delete(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Categories Create
|--------------------------------------------------------------------------
|
*/

categoriesModule.controller('CategoriesCreateController', [
    '$scope', 'CategoriesService',
    function ($scope, CategoriesService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Category to be filled.
         *
         * @type object
         */
        self.category = {};

        /**
         * Send a request for store a newly created category.
         *
         * @return void
         */
        self.store = function ()
        {
            CategoriesService.store(self.category).then(
                function (response)
                {
                    self.category = {};

                    notify('Categoria cadastrada com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível cadastrar a categoria!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Categories List
|--------------------------------------------------------------------------
|
*/

categoriesModule.controller('CategoriesListController', [
    '$scope', 'CategoriesService',
    function ($scope, CategoriesService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * All categories.
         *
         * @type array
         */
        self.categories = [];

        /**
         * Send the request to get all categories.
         *
         * @return void
         */
        self.getAll = function ()
        {
            CategoriesService.all().then(
                function (response)
                {
                    self.categories = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter as categorias!', 'error');
                }
            );
        };

        self.getAll();
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Categories Update
|--------------------------------------------------------------------------
|
*/

categoriesModule.controller('CategoriesUpdateController', [
    '$scope', '$q', '$state', '$stateParams', 'CategoriesService',
    function ($scope, $q, $state, $stateParams, CategoriesService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Request category id.
         *
         * @type number
         */
        self.id = $stateParams.id;

        /**
         * Requested category.
         *
         * @type object
         */
        self.category = {};

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * Send the request to the category update.
         *
         * @return void
         */
        self.update = function ()
        {
            self.category = self.removeEmptyData(self.category);

            CategoriesService.update(self.category).then(
                function (response)
                {
                    notify('Categoria editada com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações da categoria!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the category delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            CategoriesService.destroy(self.id).then(
                function (response)
                {
                    notify('Categoria deletada com sucesso!', 'success');

                    $state.go('categories-list');
                },
                function (response)
                {
                    notify('Não foi possível deletar a categoria!', 'error');
                }
            );
        };

        /**
         * Send the requests to get data needed by the view.
         *
         * @return void
         */
        self.getViewData = function ()
        {
            var categoryPromise = CategoriesService.find(self.id);

            var callbacks = {
                success: function (response)
                {
                    self.category = response[0].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para a edição!', 'error');
                }
            };

            self.qService.all([categoryPromise]).then(callbacks.success).catch(callbacks.error);
        };

        /**
         * Removes empty keys from data object.
         *
         * @param  object data
         * @return object
         */
        self.removeEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        };

        self.getViewData();
    }
]);

/**
 * Define the articles module.
 *
 * @type object
 */
var articlesModule = angular.module('articles', ['ngMessages', 'ui.router', 'categories', 'tags']);

/*
|--------------------------------------------------------------------------
| Define The Main Articles Service
|--------------------------------------------------------------------------
|
*/

articlesModule.service('ArticlesService', [
    '$q', '$http',
    function ($q, $http)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('admin/articles');

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * AngularJS HTTP service.
         *
         * @type object
         */
        self.httpService = $http;

        /**
         * Makes the request for get all articles.
         *
         * @return Angular promise
         */
        self.all = function ()
        {
            var deferredPromise = self.qService.defer();

            self.httpService.get(self.requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }

        /**
         * Makes the request for get an specific article.
         *
         * @param  number id
         * @return Angular promise
         */
        self.find = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.get(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }

        /**
         * Makes the request for store a newly created article on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.store = function (data)
        {
            var deferredPromise = self.qService.defer();

            self.httpService.post(self.requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }

        /**
         * Makes the request for update article on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.update = function (data)
        {
            var article = angular.copy(data);
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + data.id;

            article.tags = self.getIds(article.tags);
            article.categories = self.getIds(article.categories);

            self.httpService.put(requestUrl, article).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }

        /**
         * Makes the request for delete article on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.destroy = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.delete(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        }

        /**
         * Return only ids from an array of objects.
         *
         * @param  array data
         * @return array
         */
        self.getIds = function (data)
        {
            var ids = [];

            angular.forEach(data, function (item, key) {
                ids.push(item.id);
            });

            return ids;
        }
    }
]);

/*
|--------------------------------------------------------------------------
| Define The Controller For Articles Create.
|--------------------------------------------------------------------------
|
*/

articlesModule.controller('ArticlesCreateController', [
    '$scope', '$q', 'ArticlesService', 'CategoriesService', 'TagsService',
    function ($scope, $q, ArticlesService, CategoriesService, TagsService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Article to be filled.
         *
         * @type object
         */
        self.article = {status: 1};

        /**
         * Tags to be filled for the view.
         *
         * @type array
         */
        self.tags = [];

        /**
         * Categories to be filled for the view.
         *
         * @type array
         */
        self.categories = [];

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
        * Send a request for store a newly created article.
        *
        * @return void
        */
        self.store = function ()
        {
            ArticlesService.store(self.article).then(
                function (response)
                {
                    self.article = {status: 1};

                    notify('Artigo cadastrado com sucesso!', 'success');
                },
                function (response) {
                    notify('Não foi possível cadastrar o artigo!', 'error');
                }
            );
        };

        /**
         * Get data needed by the view.
         *
         * @return void
         */
        self.getViewData = function ()
        {
            var categoriesPromise = CategoriesService.all();

            var tagsPromise = categoriesPromise.then(function (response) {
                return TagsService.all();
            });

            var callbacks = {
                success: function (response)
                {
                    self.categories = response[0].data;
                    self.tags = response[1].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para o cadastro!', 'error');
                }
            };

            self.qService.all([categoriesPromise, tagsPromise]).then(callbacks.success).catch(callbacks.error);
        };

        self.getViewData();
    }
]);

/*
|--------------------------------------------------------------------------
| Define The Controller For Articles List.
|--------------------------------------------------------------------------
|
*/

articlesModule.controller('ArticlesListController', [
    '$scope', 'ArticlesService',
    function ($scope, ArticlesService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * All articles.
         *
         * @type array
         */
        self.articles = [];

        /**
         * Send the request to get all articles.
         *
         * @return void
         */
        self.getAll = function ()
        {
            ArticlesService.all().then(
                function (response)
                {
                    self.articles = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter os artigos!', 'error');
                }
            );
        };

        self.getAll();
    }
]);

/*
|--------------------------------------------------------------------------
| Define The Controller For Articles Update.
|--------------------------------------------------------------------------
|
*/

articlesModule.controller('ArticlesUpdateController', [
    '$scope', '$q', '$state', '$stateParams', 'ArticlesService', 'CategoriesService', 'TagsService',
    function ($scope, $q, $state, $stateParams, ArticlesService, CategoriesService, TagsService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Request article id.
         *
         * @type number
         */
        self.id = $stateParams.id;

        /**
         * Requested article.
         *
         * @type object
         */
        self.article = {};

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * Tags to be filled for the view.
         *
         * @type array
         */
        self.tags = [];

        /**
         * Categories to be filled for the view.
         *
         * @type array
         */
        self.categories = [];

        /**
         * Send the request to the article update.
         *
         * @return void
         */
        self.update = function ()
        {
            ArticlesService.update(self.article).then(
                function (response)
                {
                    notify('Artigo editado com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações do artigo!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the article delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            ArticlesService.destroy(self.id).then(
                function (response)
                {
                    notify('Artigo deletado com sucesso!', 'success');

                    $state.go('articles-list');
                },
                function (response)
                {
                    notify('Não foi possível deletar o artigo!', 'error');
                }
            );
        };

        /**
         * Send the requests to get data needed by the view.
         *
         * @return void
         */
        self.getViewData = function ()
        {
            var articlePromise = ArticlesService.find(self.id);

            var categoriesPromise = articlePromise.then(function (response) {
                return CategoriesService.all();
            });

            var tagsPromise = categoriesPromise.then(function (response) {
                return TagsService.all();
            });

            var callbacks = {
                success: function (response)
                {
                    self.article = response[0].data;
                    self.categories = response[1].data;
                    self.tags = response[2].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para a edição!', 'error');
                }
            };

            self.qService.all([articlePromise, categoriesPromise, tagsPromise]).then(callbacks.success).catch(callbacks.error);
        };

        self.getViewData();
    }
]);

/**
 * Define the files module.
 *
 * @type object
 */
var filesModule = angular.module('files', ['ngMessages', 'angularModalService', 'validation']);

/*
|--------------------------------------------------------------------------
| Main Files Service For HTTP Requests
|--------------------------------------------------------------------------
|
*/

filesModule.service('FilesService', [
    '$q', '$http',
    function ($q, $http)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('admin/files');

        /**
         * Makes the request for get all files on the API.
         *
         * @return Angular promise
         */
        self.all = function ()
        {
            var deferredPromise = $q.defer();

            $http.get(self.requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for get an specific file on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.find = function (id)
        {
            var deferredPromise = $q.defer();
            var requestUrl = self.requestUrl + '/' + id;

            $http.get(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for store a newly created file on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.store = function (data)
        {
            var deferredPromise = $q.defer();
            var requestConfig = {
                headers: {'Content-Type': undefined}
            };

            $http.post(self.requestUrl, self.makeRequestableData(data), requestConfig).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for update file on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.update = function (data)
        {
            var deferredPromise = $q.defer();
            var requestUrl = self.requestUrl + '/' + data.id;

            $http.put(requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for delete file on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.destroy = function (id)
        {
            var deferredPromise = $q.defer();
            var requestUrl = self.requestUrl + '/' + id;

            $http.delete(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes an form data requestable to the server.
         *
         * @param  object data
         * @return FormData
         */
        self.makeRequestableData = function (data)
        {
            var formData = new FormData();

            formData.append('disk', data.disk);
            angular.forEach(data.files, function (file, key) {
                formData.append('files[]', file);
            });

            return formData;
        };
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Files List
|--------------------------------------------------------------------------
|
*/

filesModule.controller('FilesListController', [
    '$scope', 'FilesService', 'ModalService',
    function ($scope, FilesService, ModalService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * All files.
         *
         * @type array
         */
        self.files = [];

        /**
         * Files details view.
         *
         * @type string
         */
        self.detailsView = view('files-update.html');

        /**
         * File details controller
         *
         * @type string
         */
        self.detailsController = 'FilesUpdateController';

        /**
         * Send the request to get all files.
         *
         * @return void
         */
        self.getAll = function ()
        {
            FilesService.all().then(
                function (response)
                {
                    self.files = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter os arquivos!', 'error');
                }
            );
        };

        /**
         * Show the file modal details.
         *
         * @param  object file
         * @return void
         */
        self.showDetails = function (file)
        {
            var modalConfig = {
                controller: self.detailsController,
                templateUrl: self.detailsView,
                inputs: {file: file}
            };

            ModalService.showModal(modalConfig).then(function (modal)
            {
                modal.element.modal('show');

                modal.close.then(function (reason)
                {
                    // Reload files if the file was deleted
                    if ( reason == 'deleted' ) {
                        self.getAll();
                    }
                });
            });
        }

        /**
         * Checks if the file is an image.
         *
         * @param  object  file
         * @return bool
         */
        self.isImage = function (file)
        {
            var imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

            return (imageExtensions.indexOf(file.extension) > -1);
        }

        self.getAll();
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Files Update
|--------------------------------------------------------------------------
|
*/

filesModule.controller('FilesUpdateController', [
    '$scope', 'FilesService', 'file', 'close',
    function ($scope, FilesService, file, close)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Requested file.
         *
         * @type object
         */
        self.file = file;

        /**
         * Send the request to the file update.
         *
         * @return void
         */
        self.update = function ()
        {
            self.file = self.removeEmptyData(self.file);

            FilesService.update(self.file).then(
                function (response)
                {
                    notify('Arquivo editado com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações do arquivo!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the file delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            FilesService.destroy(self.file.id).then(
                function (response)
                {
                    notify('Arquivo deletado com sucesso!', 'success');

                    self.modalCloseReason('deleted');
                },
                function (response)
                {
                    notify('Não foi possível deletar o arquivo!', 'error');
                }
            );
        };

        /**
         * Pass the reason to the modal close promise.
         *
         * @param  string reason
         * @return void
         */
        self.modalCloseReason = function (reason)
        {
            close(reason);
        }

        /**
         * Checks if the file is an image.
         *
         * @param  object  file
         * @return bool
         */
        self.isImage = function (file)
        {
            var imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

            return (imageExtensions.indexOf(file.extension) > -1);
        }

        /**
         * Removes empty keys from data object.
         *
         * @param  object data
         * @return object
         */
        self.removeEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        };
    }
]);

/*
|--------------------------------------------------------------------------
| Controller For Files Upload
|--------------------------------------------------------------------------
|
*/

filesModule.controller('FilesUploadController', [
    '$scope', 'FilesService',
    function ($scope, FilesService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Files data.
         *
         * @type object
         */
        self.data = {};

        /**
         * Files disk.
         *
         * @type object
         */
        self.data.disk = 's3';

        /**
         * Files to be uploaded.
         *
         * @type object
         */
        self.data.files = [];

        /**
         * Send a request for store a newly created file.
         *
         * @return void
         */
        self.store = function ()
        {
            FilesService.store(self.data).then(
                function (response)
                {
                    self.data.disk = 's3';

                    notify('Os arquivos foram enviados para o upload!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível enviar os arquivos para o upload!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);

/*
|--------------------------------------------------------------------------
| Directive For Multiple Files Upload
|--------------------------------------------------------------------------
|
| This directive parses/apply the input files selected
| to the parent scope model.
|
*/

filesModule.directive('filesInput', [
    '$parse',
    function ($parse)
    {
        var self = this;

        self.restrict = 'A';

        self.link = function (scope, element, attributes, controller)
        {
            var model = $parse(attributes.filesInput);
            var assign = model.assign;

            // Binds the event listener
            element.bind('change', function () {
                var files = [];
                var elementFiles = element[0].files;

                angular.forEach(elementFiles, function (file, key) {
                    files.push(file);
                });

                // Apply the files to the scope
                scope.$apply(function () {
                    assign(scope, files);
                });
            });
        }

        return self;
    }
]);
