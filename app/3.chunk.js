webpackJsonp([3],{497:function(s,t,l){"use strict";function o(s){i||l(678)}Object.defineProperty(t,"__esModule",{value:!0});var a=l(680),i=!1,c=l(42),v=o,e=c(null,a.a,!1,v,null,null);e.options.__file="webapp/app/pages/layout/Grid.vue",t.default=e.exports},678:function(s,t,l){var o=l(679);"string"==typeof o&&(o=[[s.i,o,""]]),o.locals&&(s.exports=o.locals);l(80)("0e03573e",o,!1,{})},679:function(s,t,l){t=s.exports=l(49)(!1),t.push([s.i,'\n.grid-examples h3 {\n  margin-top: 2rem;\n}\n.grid-examples .row {\n  margin-bottom: 1rem;\n}\n.grid-examples .row .row {\n  margin-top: 1rem;\n  margin-bottom: 0;\n}\n.grid-examples [class*="col-"] {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  background-color: rgba(86, 61, 124, .15);\n  border: 1px solid rgba(86, 61, 124, .2);\n}\n.grid-examples hr {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n}\n',""])},680:function(s,t,l){"use strict";var o=function(){var s=this,t=s.$createElement;s._self._c;return s._m(0)},a=[function(){var s=this,t=s.$createElement,l=s._self._c||t;return l("div",{staticClass:"container grid-examples"},[l("h1",[s._v("Bootstrap grid examples")]),s._v(" "),l("p",{staticClass:"lead"},[s._v("Basic grid layouts to get you familiar with building within the Bootstrap grid system.")]),s._v(" "),l("h3",[s._v("Five grid tiers")]),s._v(" "),l("p",[s._v("There are five tiers to the Bootstrap grid system, one for each range of devices we support. Each tier starts at a minimum viewport size and automatically applies to the larger devices unless overridden.")]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-4"},[s._v(".col-4")]),s._v(" "),l("div",{staticClass:"col-4"},[s._v(".col-4")]),s._v(" "),l("div",{staticClass:"col-4"},[s._v(".col-4")])]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-sm-4"},[s._v(".col-sm-4")]),s._v(" "),l("div",{staticClass:"col-sm-4"},[s._v(".col-sm-4")]),s._v(" "),l("div",{staticClass:"col-sm-4"},[s._v(".col-sm-4")])]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-4"},[s._v(".col-md-4")]),s._v(" "),l("div",{staticClass:"col-md-4"},[s._v(".col-md-4")]),s._v(" "),l("div",{staticClass:"col-md-4"},[s._v(".col-md-4")])]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-lg-4"},[s._v(".col-lg-4")]),s._v(" "),l("div",{staticClass:"col-lg-4"},[s._v(".col-lg-4")]),s._v(" "),l("div",{staticClass:"col-lg-4"},[s._v(".col-lg-4")])]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-xl-4"},[s._v(".col-xl-4")]),s._v(" "),l("div",{staticClass:"col-xl-4"},[s._v(".col-xl-4")]),s._v(" "),l("div",{staticClass:"col-xl-4"},[s._v(".col-xl-4")])]),s._v(" "),l("h3",[s._v("Three equal columns")]),s._v(" "),l("p",[s._v("Get three equal-width columns "),l("strong",[s._v("starting at desktops and scaling to large desktops")]),s._v(". On mobile devices, tablets and below, the columns will automatically stack.")]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-4"},[s._v(".col-md-4")]),s._v(" "),l("div",{staticClass:"col-md-4"},[s._v(".col-md-4")]),s._v(" "),l("div",{staticClass:"col-md-4"},[s._v(".col-md-4")])]),s._v(" "),l("h3",[s._v("Three unequal columns")]),s._v(" "),l("p",[s._v("Get three columns "),l("strong",[s._v("starting at desktops and scaling to large desktops")]),s._v(" of various widths. Remember, grid columns should add up to twelve for a single horizontal block. More than that, and columns start stacking no matter the viewport.")]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-3"},[s._v(".col-md-3")]),s._v(" "),l("div",{staticClass:"col-md-6"},[s._v(".col-md-6")]),s._v(" "),l("div",{staticClass:"col-md-3"},[s._v(".col-md-3")])]),s._v(" "),l("h3",[s._v("Two columns")]),s._v(" "),l("p",[s._v("Get two columns "),l("strong",[s._v("starting at desktops and scaling to large desktops")]),s._v(".")]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-8"},[s._v(".col-md-8")]),s._v(" "),l("div",{staticClass:"col-md-4"},[s._v(".col-md-4")])]),s._v(" "),l("h3",[s._v("Full width, single column")]),s._v(" "),l("p",{staticClass:"text-warning"},[s._v("No grid classes are necessary for full-width elements.")]),s._v(" "),l("hr"),s._v(" "),l("h3",[s._v("Two columns with two nested columns")]),s._v(" "),l("p",[s._v("Per the documentation, nesting is easy—just put a row of columns within an existing column. This gives you two columns "),l("strong",[s._v("starting at desktops and scaling to large desktops")]),s._v(", with another two (equal widths) within the larger column.")]),s._v(" "),l("p",[s._v("At mobile device sizes, tablets and down, these columns and their nested columns will stack.")]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-8"},[s._v("\n      .col-md-8\n      "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-6"},[s._v(".col-md-6")]),s._v(" "),l("div",{staticClass:"col-md-6"},[s._v(".col-md-6")])])]),s._v(" "),l("div",{staticClass:"col-md-4"},[s._v(".col-md-4")])]),s._v(" "),l("hr"),s._v(" "),l("h3",[s._v("Mixed: mobile and desktop")]),s._v(" "),l("p",[s._v("The Bootstrap v4 grid system has five tiers of classes: xs (extra small), sm (small), md (medium), lg (large), and xl (extra large). You can use nearly any combination of these classes to create more dynamic and flexible layouts.")]),s._v(" "),l("p",[s._v("Each tier of classes scales up, meaning if you plan on setting the same widths for xs and sm, you only need to specify xs.")]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-12 col-md-8"},[s._v(".col-12 .col-md-8")]),s._v(" "),l("div",{staticClass:"col-6 col-md-4"},[s._v(".col-6 .col-md-4")])]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-6 col-md-4"},[s._v(".col-6 .col-md-4")]),s._v(" "),l("div",{staticClass:"col-6 col-md-4"},[s._v(".col-6 .col-md-4")]),s._v(" "),l("div",{staticClass:"col-6 col-md-4"},[s._v(".col-6 .col-md-4")])]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-6"},[s._v(".col-6")]),s._v(" "),l("div",{staticClass:"col-6"},[s._v(".col-6")])]),s._v(" "),l("hr"),s._v(" "),l("h3",[s._v("Mixed: mobile, tablet, and desktop")]),s._v(" "),l("p"),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-12 col-sm-6 col-lg-8"},[s._v(".col-12 .col-sm-6 .col-lg-8")]),s._v(" "),l("div",{staticClass:"col-6 col-lg-4"},[s._v(".col-6 .col-lg-4")])]),s._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-6 col-sm-4"},[s._v(".col-6 .col-sm-4")]),s._v(" "),l("div",{staticClass:"col-6 col-sm-4"},[s._v(".col-6 .col-sm-4")]),s._v(" "),l("div",{staticClass:"col-6 col-sm-4"},[s._v(".col-6 .col-sm-4")])])])}];o._withStripped=!0;var i={render:o,staticRenderFns:a};t.a=i}});