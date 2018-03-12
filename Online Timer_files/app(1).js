define("text!apps/cookieconsent/templates/container.html",[],function(){return'<div ng-controller="AppCtrl" ng-hide="hideBanner" class="shareaholic-cookie-consent {{alignment}}">\n  <p class="shareaholic-consent-message">{{message}}</p>\n  <div class="shareaholic-button-set">\n    <span type="button" ng-click="acceptCookie()" class="shareaholic-accept-button consent-button">{{accept_button_text}}</span>\n    <a class="shareaholic-info-button consent-button" href="{{policy_url}}" target="_blank">{{info_button_text}}</a>\n  </div>\n</div>\n\n'}),define("text!apps/cookieconsent/css/app.css",[],function(){return".shareaholic-ui.shareaholic-cookie-consent div{width:100%;background-color:transparent !important;background-color:rgba(0,0,0,0.9) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr = ie-hex-str(rgba(color, alpha)), endColorstr = ie-hex-str(rgba(color, alpha)));zoom:1}.shareaholic-cookie-consent{position:fixed;top:0;left:0;width:100% !important;background-color:transparent !important;background-color:rgba(0,0,0,0.9) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr = ie-hex-str(rgba(color, alpha)), endColorstr = ie-hex-str(rgba(color, alpha)));zoom:1;z-index:2147483641;font-family:'open sans','helvetica neue',helvetica,arial,sans-serif;}.shareaholic-cookie-consent.bottom-align{top:auto;bottom:0}.shareaholic-cookie-consent .shareaholic-consent-message{font-weight:300;font-size:14px;line-height:1.4;color:#fff;margin:0;float:left;width:60%;padding:15px;}.shareaholic-cookie-consent .shareaholic-consent-message a{color:#43aacc;text-decoration:underline;}.shareaholic-cookie-consent .shareaholic-consent-message a:hover{color:#fff}.shareaholic-cookie-consent .shareaholic-button-set{position:absolute;top:50%;margin-top:-15px;right:15px;text-align:right;}.shareaholic-cookie-consent .shareaholic-button-set .consent-button{font-size:13px;font-family:'montserrat','helvetica neue',helvetica,arial,sans-serif;display:inline-block;padding:6px 12px;cursor:pointer;text-align:center;margin-left:10px;text-transform:uppercase;text-decoration:none}.shareaholic-cookie-consent .shareaholic-button-set .shareaholic-accept-button{background:#89c84f;color:#fff;}.shareaholic-cookie-consent .shareaholic-button-set .shareaholic-accept-button:hover{background:#9ac86e}.shareaholic-cookie-consent .shareaholic-button-set a.shareaholic-info-button{font-weight:300;background:transparent;color:#a8afba;}.shareaholic-cookie-consent .shareaholic-button-set a.shareaholic-info-button:hover{color:#fff}@media only screen and (max-width:400px){.shareaholic-cookie-consent .shareaholic-consent-message{width:auto;float:none}.shareaholic-cookie-consent .shareaholic-button-set{position:relative;display:block;top:0;right:0;text-align:left;background-color:transparent !important;background-color:rgba(0,0,0,0.5) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr = ie-hex-str(rgba(color, alpha)), endColorstr = ie-hex-str(rgba(color, alpha)));zoom:1;margin:0;}.shareaholic-cookie-consent .shareaholic-button-set .consent_button{width:49%;padding:12px 0;margin:0}.shareaholic-cookie-consent .shareaholic-button-set .shareaholic-accept-button{background-color:transparent !important;background-color:rgba(137,200,79,0.8) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr = ie-hex-str(rgba(color, alpha)), endColorstr = ie-hex-str(rgba(color, alpha)));zoom:1}}@media only screen and (min-width:1024px){.shareaholic-cookie-consent .shareaholic-consent-message{width:70%}}"}),define("apps/cookieconsent/utils/cookies",[],function(){var a=function(){};return a.prototype.set=function(a,b,c){var d,e,f,g,h;return null==c&&(c={}),!(!a||/^(?:expires|max\-age|path|domain|secure)$/i.test(a))&&(e="",c.expires&&(e=function(){switch(c.expires.constructor){case Number:return c.expires===1/0?"; expires=Tue, 19 Jan 2038 03:14:07 GMT":"; max-age="+c.expires;case String:return"; expires="+c.expires;case Date:return"; expires="+c.expires.toUTCString()}}()),f=encodeURIComponent(a)+"="+encodeURIComponent(b),d=c.domain?"; domain="+c.domain:"",g=c.path?"; path="+c.path:"",h=c.secure?"; secure":"",document.cookie=[f,e,d,g,h].join(""),!0)},a.prototype.get=function(a){return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null},a.prototype.delete=function(a,b){var c,d;return null==b&&(b={}),!(!a||!this.hasItem(a))&&(c=b.domain?"; domain="+b.domain:"",d=b.path?"; path="+b.path:"",document.cookie=encodeURIComponent(a)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+c+d,!0)},a.prototype.hasItem=function(a){return new RegExp("(?:^|;\\s*)"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},a.prototype.keys=function(){var a,b,c,d,e;for(c=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),a=[],d=0,e=c.length;d<e;d++)b=c[d],a.push(decodeURIComponent(b));return a},new a}),define("apps/common/utils/updateScope",["require","lodash"],function(a){var b=a("lodash");return function(a,c,d,e){d instanceof Array&&(d=d.join(".")),b.set(a,d,e),a.$apply(c||function(){})}}),define("apps/cookieconsent/app",["require","angular","when","lodash","utils/logger","utils/dom","text!./templates/container.html","text!./css/app.css","./utils/cookies","../common/utils/updateScope"],function(a){function b(a,b){return 0===a.show_to||1===a.show_to&&c(a,b)}function c(a,b){var c=a.country_code||b.location.country_code2;return!c||o.indexOf(c.toLowerCase())>-1}var d=a("angular"),e=a("when"),f=a("lodash"),g=a("utils/logger"),h=a("utils/dom"),i=a("text!./templates/container.html"),j=a("text!./css/app.css"),k=a("./utils/cookies"),l=a("../common/utils/updateScope"),m="shr-cookie-styles",n="cookie_consent";g=g.child({name:"Cookie Consent UI",color:"#53E5ED"});var o=["at","be","bg","cy","cz","de","dk","ee","es","fi","fr","gb","gr","hr","hu","ie","it","lt","lu","lv","mt","nl","pl","pt","ro","se","si","sk"];return{render:function(a,c,o){var p,q,r=e.defer();return g.log("Loading cookie consent",a,c),g.log("Checking if user should see banner"),o.get({type:"userInfo"}).then(function(e){if(!b(c,e)||"accepted"===k.get(n))return g.log("User should not see banner"),r.resolve(),r.promise;k.set(n,"seen",{path:"/"}),g.log("User should see banner rendering"),q=f.uniqueId("cookie_consent"),p=d.module(q,[]),p.controller("AppCtrl",["$scope",function(a){a=f.extend(a,c),a.hideBanner=!1,a.acceptCookie=function(){c.overrideCookie||k.set(n,"accepted",{path:"/",expires:1/0}),a.hideBanner=!0,g.log("User accepted cookies, hiding banner")},r.resolve({updateConfigItem:l.bind(null,a,null)})}]),a.$root.html(i),h.ensureStyles(m,j,c.assetbase,a.$root),d.bootstrap(a.$root[0],[q])}),r.promise}}});