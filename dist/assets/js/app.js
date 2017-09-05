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
  sidebarToggleSelector: "[data-toggle='offcanvas']",
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

'use strict';

window.env = window.env || {};

window.env.APP_NAME = 'Blog';
window.env.APP_ENV = 'development';
window.env.APP_URL = 'http://localhost:8080/';
window.env.API_URL = 'http://localhost:8000/';

'use strict';

var log = function (args) {
    var argsLength = arguments.length;
    for (var i = 0; i < argsLength; i++) {
        console.log(arguments[i]);
    }
};

var view = function (viewName)
{
    return 'views/' + viewName;
};

var url = function (path)
{
    return env.APP_URL + path;
};

var api_url = function (path)
{
    return env.API_URL + path;
};

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

'use strict';

var appModule = angular.module('app', [
    'ngMessages', 'ui.router', 'ui.router.state.events',
    'validation', 'auth', 'root-dashboard', 'dashboard', 'users', 'tags', 'categories'
]);

'use strict';

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
        };

        // Register routeStates
        for (var state in routeStates) {
            $stateProvider.state(state, routeStates[state]);
        }
    }
]);

'use strict';

var validationModule = angular.module('validation', ['ngMessages']);

'use strict';

validationModule.directive('validateEmail', function ()
{
    var config = {
        restrict: 'A',
        require: '?ng-model',
        link: function (scope, elem, attrs, ctrl)
        {
            // Only apply the validator if ngModel is present and AngularJS has added the email validator
            if ( ctrl && ctrl.$validators.email ) {
                var emailREGEXP = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

                // This will overwrite the default AngularJS email validator
                ctrl.$validators.email = function (modelValue) {
                    return emailREGEXP.test(modelValue);
                };
            }
        }
    }

    return config;
});

'use strict';

validationModule.directive('validatePasswordConfirmation', function ()
{
    var config = {
        restrict: 'A',
        require: '?ng-model',
        scope: {
            passwordToCompare: "=validatePasswordConfirmation"
        },
        link: function(scope, elem, attrs, ctrl)
        {
            // Only apply the validator if ngModel is present
            if ( ctrl ) {
                ctrl.$validators.validatePasswordConfirmation = function (modelValue) {
                    return modelValue == scope.passwordToCompare;
                };

                scope.$watch("passwordToCompare", function () {
                    ctrl.$validate();
                });
            }
        }
    }

    return config;
});

'use strict';

var authModule = angular.module('auth', ['ngMessages', 'ui.router']);

'use strict';

authModule.config([
    '$httpProvider',
    function ($httpProvider)
    {
        $httpProvider.interceptors.push('RefreshAuthorizationHeaderService');
    }
]);

'use strict';

authModule.factory('RefreshAuthorizationHeaderService', [
    '$q', '$injector',
    function ($q, $injector)
    {
        var getRequestAccessToken = function () {
            var AuthService = $injector.get('AuthService')
            var accessToken = AuthService.getSessionData('access_token');

            return accessToken;
        };

        var setRequestAccessToken = function (request, accessToken) {
            request.headers.Authorization = accessToken;
        };

        var getResponseAccessToken = function (rejection) {
            /// Get the refreshed access_token on Authorization header
            var refreshedAccessToken = rejection.headers('Authorization');

            return refreshedAccessToken;
        };

        var setResponseAccessToken = function (refreshedAccessToken) {
            var AuthService = $injector.get('AuthService')

            // Only update the session access_token if the request
            // was sent to the api server and its returned an new access_token
            if ( refreshedAccessToken ) {
                AuthService.setSessionData('access_token', refreshedAccessToken)
            }
        };

        this.request = function (request)
        {
            setRequestAccessToken(request, getRequestAccessToken());

            return request;
        };

        this.response = function (response)
        {
            setResponseAccessToken(getResponseAccessToken(response));

            return response;
        };

        this.responseError = function (rejection)
        {
            setResponseAccessToken(getResponseAccessToken(rejection));

            return $q.reject(rejection);
        };

        return this;
    }
]);

'use strict';

authModule.service('AuthService', [
    '$http',
    function ($http)
    {
        var self = this;
        var apiRequestUrl = api_url('auth');
        var fillableSessionData = ['access_token', 'user', 'authenticated'];

        this.getUser = function ()
        {
            return angular.fromJson(self.getSessionData('user'));
        };

        this.isAuthenticated = function () {
            return self.getSessionData('authenticated') || false;
        };

        this.authenticate = function (credentials, callbacks)
        {
            var callbacks = callbacks || {};
            var promises = {
                success: function (response)
                {
                    self.succeededLogin(response, callbacks);
                },
                error: function (response)
                {
                    self.failedLogin(response, callbacks);
                },
            };

            $http.post(apiRequestUrl, credentials).then(promises.success, promises.error);
        }

        this.succeededLogin = function (response, callbacks)
        {
            angular.extend(response.data, {authenticated: true});

            self.setSessionData(response.data);

            if ( callbacks.success ) callbacks.success(response);
        }

        this.failedLogin = function (response, callbacks)
        {
            self.clearSessionData();

            if ( callbacks.error ) callbacks.error(response);
        }

        this.unAuthenticate = function (callbacks)
        {
            var callbacks = callbacks || {};
            var promises = {
                success: function (response)
                {
                    self.succeededLogout(response, callbacks);
                },
                error: function (response)
                {
                    self.failedLogout(response, callbacks);
                }
            };

            $http.delete(apiRequestUrl).then(promises.success, promises.error);
        }

        this.succeededLogout = function (response, callbacks)
        {
            self.clearSessionData();

            if ( callbacks.success ) callbacks.success(response);
        }

        this.failedLogout = function (response, callbacks)
        {
            self.clearSessionData();

            if ( callbacks.error ) callbacks.error(response);
        }


        this.getSessionData = function (name)
        {
            if ( typeof name == 'undefined' ) {
                var data = {};

                fillableSessionData.forEach(function (value, key) {
                    if ( localStorage.getItem(value) ) {
                        data[value] = localStorage.getItem(value);
                    }
                });

                return data;
            }

            if ( fillableSessionData.indexOf(name) > -1 ) {
                return localStorage.getItem(name);
            }

            return null;
        }

        this.setSessionData = function (name, value)
        {
            var key, value, data = {};

            if ( typeof name == 'object' ) {
                for (key in name) {
                    if ( fillableSessionData.indexOf(key) > -1 ) {
                        data[key] = name[key];
                        value = (typeof name[key] == 'object') ? angular.toJson(name[key]) :
                           (key == 'access_token') ? 'Bearer ' + name[key] : name[key];

                        localStorage.setItem(key, value);
                    }
                }

                return data;
            }

            if ( fillableSessionData.indexOf(name) > -1 ) {
                data[name] = value;

                localStorage.setItem(name, value);

                return data;
            }

            return null;
        }

        this.clearSessionData = function (name)
        {
            if ( fillableSessionData.indexOf(name) > -1 ) {
                localStorage.removeItem(name);
                return true;
            }

            fillableSessionData.forEach(function (value, key) {
                localStorage.removeItem(value);
            });
        }
    }
]);

'use strict';

authModule.service('ForgotPasswordService', [
    '$http',
    function ($http)
    {
        var self = this;
        var apiRequestUrl = api_url('auth/reset');

        this.sendResetLinkEmail = function (email, callbacks)
        {
            var callbacks = callbacks || {};
            var data = {email: email, route: url('#!/reset/{token}')};
            var promises = {
                success: function (response)
                {
                    //

                    if ( callbacks.success ) callbacks.success(response);
                },
                error: function (response)
                {
                    //

                    if ( callbacks.error ) callbacks.error(response);
                }
            };

            $http.post(apiRequestUrl, data).then(promises.success, promises.error);
        }
    }
]);

'use strict';

authModule.service('ResetPasswordService', [
    '$http', 'AuthService',
    function ($http, AuthService)
    {
        var self = this;
        var apiRequestUrl = api_url('auth/reset');

        this.resetPassword = function (credentials, callbacks)
        {
            var callbacks = callbacks || {};
            var promises = {
                success: function (response)
                {
                    AuthService.succeededLogin(response, {});

                    if ( callbacks.success ) callbacks.success(response);
                },
                error: function (response)
                {
                    //

                    if ( callbacks.error ) callbacks.error(response);
                }
            };

            $http.put(apiRequestUrl, credentials).then(promises.success, promises.error);
        }
    }
]);

'use strict';

authModule.controller('LoginController', [
    '$scope', '$state', 'AuthService',
    function ($scope, $state, AuthService)
    {
        $scope.credentials = {};

        $scope.authenticate = function ()
        {
            AuthService.authenticate($scope.credentials, {
                success: function (response)
                {
                    notify('Login efetuado com sucesso!', 'success');

                    $state.go('dashboard');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            });
        }
    },
]);

'use strict';

authModule.controller('ForgotPasswordController', [
    '$scope', 'ForgotPasswordService',
    function ($scope, ForgotPasswordService)
    {
        $scope.sendResetLinkEmail = function ()
        {
            ForgotPasswordService.sendResetLinkEmail($scope.email, {
                success: function (response)
                {
                    notify('Nós enviamos à você um link para a recuperação de senha. Cheque sua caixa de entrada!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            });
        }
    },
]);

'use strict';

authModule.controller('ResetPasswordController', [
    '$scope', '$state', '$stateParams', 'ResetPasswordService',
    function ($scope, $state, $stateParams, ResetPasswordService)
    {
        $scope.credentials = {};
        $scope.credentials.token = $stateParams.token;

        $scope.resetPassword = function ()
        {
            ResetPasswordService.resetPassword($scope.credentials, {
                success: function (response)
                {
                    notify('Sua senha foi recuperada com sucesso!', 'success');

                    $state.go('dashboard');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            });
        }
    },
]);

'use strict';

var rootDashboardModule = angular.module('root-dashboard', ['ui.router', 'auth']);

'use strict';

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
        $transitions.onStart({}, function(trans)
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

'use strict';

rootDashboardModule.controller('RootDashboardController', [
    '$scope', '$state', 'AuthService',
    function ($scope, $state, AuthService)
    {
        // Initializes the layout controls
        window.layoutInit();

        $scope.auth_user = AuthService.getUser();

        $scope.logout = function ()
        {
            AuthService.unAuthenticate({
                success: function (response)
                {
                    notify('Logout efetuado com sucesso!', 'success');

                    $state.go('login');
                }
            });
        };
    },
]);

'use strict';

rootDashboardModule.factory('AuthorizationHttpInterceptorService', [
    '$q', '$state',
    function ($q, $state)
    {
        this.responseError = function (rejection)
        {
            var status = rejection.status;

            if ( status == 401 ) {
                notify('Sua sessão foi finalizada. você precisa fazer login novamente.', 'info', 10000);
                $state.go('login');
            }

            return $q.reject(rejection);
        };

        return this;
    }
]);

'use strict';

var dashboardModule = angular.module('dashboard', []);

'use strict';

dashboardModule.controller('DashboardController', [
    '$scope',
    function ($scope)
    {
        //
    },
]);

'use strict';

var usersModule = angular.module('users', ['ngMessages', 'ui.router']);

'use strict';

usersModule.controller('UsersListController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.getUsers = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.users = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/users')).then(promises.success, promises.error);
        };

        $scope.getUsers();
    }
]);

'use strict';

usersModule.controller('UsersRegisterController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.user = {};

        $scope.store = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.user = {};

                    notify('Usuário registrado com sucesso!.', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.post(api_url('admin/users'), $scope.user).then(promises.success, promises.error);
        };
    }
]);

'use strict';

usersModule.controller('UsersProfileController', [
    '$scope', '$http', '$state', '$stateParams', 'AuthService',
    function ($scope, $http, $state, $stateParams, AuthService)
    {
        $scope.user = {};
        $scope.authUser = AuthService.getUser();

        $scope.getUser = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.user = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/users/' + $stateParams.id)).then(promises.success, promises.error);
        };

        $scope.update = function ()
        {
            $scope.user = clearEmptyData($scope.user);

            var promises = {
                success: function (response)
                {
                    notify('Perfil atualizado com sucesso!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.put(api_url('admin/users/' + $scope.user.id), $scope.user).then(promises.success, promises.error);
        };

        $scope.delete = function ()
        {
            var promises = {
                success: function (response)
                {
                    if ( $scope.authUser.id == $scope.user.id ) {
                        AuthService.unAuthenticate();

                        notify('Sua conta foi deletada com sucesso!', 'success');
                        $state.go('login');

                        return;
                    }

                    notify('Usuário deletado com sucesso!', 'success');
                    $state.go('users-list');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.delete(api_url('admin/users/' + $scope.user.id)).then(promises.success, promises.error);
        };

        var clearEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        }

        $scope.getUser();
    }
]);

'use strict';

var tagsModule = angular.module('tags', ['ngMessages', 'ui.router']);

'use strict';

tagsModule.controller('TagsListController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.getTags = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.tags = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/tags')).then(promises.success, promises.error);
        };

        $scope.getTags();
    }
]);

'use strict';

tagsModule.controller('TagsCreateController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.tag = {};

        $scope.store = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.tag = {};

                    notify('Tag cadastrada com sucesso!.', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.post(api_url('admin/tags'), $scope.tag).then(promises.success, promises.error);
        }
    }
]);

'use strict';

tagsModule.controller('TagsUpdateController', [
    '$scope', '$http', '$state', '$stateParams', 'AuthService',
    function ($scope, $http, $state, $stateParams, AuthService)
    {
        $scope.tag = {};

        $scope.getTag = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.tag = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/tags/' + $stateParams.id)).then(promises.success, promises.error);
        };

        $scope.update = function ()
        {
            $scope.tag = clearEmptyData($scope.tag);

            var promises = {
                success: function (response)
                {
                    notify('Tag atualizada com sucesso!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.put(api_url('admin/tags/' + $scope.tag.id), $scope.tag).then(promises.success, promises.error);
        };

        $scope.delete = function ()
        {
            var promises = {
                success: function (response)
                {
                    notify('Tag deletada com sucesso!', 'success');
                    $state.go('tags-list');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.delete(api_url('admin/tags/' + $scope.tag.id)).then(promises.success, promises.error);
        };

        var clearEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        }

        $scope.getTag();
    }
]);

'use strict';

var categoriesModule = angular.module('categories', ['ngMessages', 'ui.router']);

'use strict';

categoriesModule.controller('CategoriesListController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.getCategories = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.categories = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/categories')).then(promises.success, promises.error);
        };

        $scope.getCategories();
    }
]);

'use strict';

categoriesModule.controller('CategoriesCreateController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.category = {};

        $scope.store = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.category = {};

                    notify('Categoria cadastrada com sucesso!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.post(api_url('admin/categories'), $scope.category).then(promises.success, promises.error);
        }
    }
]);

'use strict';

categoriesModule.controller('CategoriesUpdateController', [
    '$scope', '$http', '$state', '$stateParams',
    function ($scope, $http, $state, $stateParams)
    {
        $scope.category = {};

        $scope.getCategory = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.category = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/categories/' + $stateParams.id)).then(promises.success, promises.error);
        };

        $scope.update = function ()
        {
            $scope.category = clearEmptyData($scope.category);

            var promises = {
                success: function (response)
                {
                    notify('Categoria atualizada com sucesso!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.put(api_url('admin/categories/' + $scope.category.id), $scope.category).then(promises.success, promises.error);
        };

        $scope.delete = function ()
        {
            var promises = {
                success: function (response)
                {
                    notify('Categoria deletada com sucesso!', 'success');
                    $state.go('categories-list');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.delete(api_url('admin/categories/' + $scope.category.id)).then(promises.success, promises.error);
        };

        var clearEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        }

        $scope.getCategory();
    }
]);
