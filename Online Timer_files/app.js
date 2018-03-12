define("apps/adminbadge/app",["require","angular","when","utils/logger","utils/utils","utils/dom","text!./templates/container.html","utils/settings","utils/globalObject","data/DataStore"],function(a){function b(a,b){var d=b.getPageInfo(j);if(!a.enabled||f.isBot()||f.isMobile()||void 0!==d.drupal)return void e.log("We should not load badge...");if(f.isSafari()&&"undefined"===j.CSS.supports)return void e.log("We should not load badge on older versions of Safari...");if(d.wordpress&&d.wordpress.version){var l=d.wordpress.version;if(1!==f.compareVersions(l,"8.0.1"))return void e.log("Unsuported version of WordPress, not loading badge...")}var m=d.pageUri,n=m.protocol()+"://"+m.authority(),o=new k(i,b.getPageInfo(j)),p='<div id="shr-admin-badge" class="shareaholic-canvas-badge" data-app="admin-badge"></div>',q=g.uiDOM(p);g.appendToUiDom(q);var r="admin_badge";c.module(r,[]).controller("AppBadgeCtrl",["$scope","$sce",function(b,c){b.assetbase=a.assetbase,b.disableBadge=!0,b.menuHidden=!0,b.menuVisibility="",b.loginHidden=!0,b.loginVisibility="",b.iframeHidden=!0,b.iframeVisibility="",b.iframeSrc="",b.siteId=a.apiKey,b.position=a.position,b.offset=a.offset,b.badgeInlineCSS="",b.loadedOn=n,b.helpLink=i.endpoints.user_navigation.help,b.origin=i.endpoints.user_navigation.base,b.baseUrl=b.origin+"/sites/"+b.siteId,b.signUpLink=i.endpoints.user_navigation.signup,b.offset&&(b.position.indexOf("upper")>-1?b.badgeInlineCSS="top: "+b.offset+"; bottom: initial;":b.position.indexOf("lower")>-1&&(b.badgeInlineCSS="bottom: "+b.offset+"; top: initial;")),b.rightUserLogged=!1,b.wrongAccount=!1,b.anonymousSite=!1,b.currentUser=null,setTimeout(function(){b.$apply(function(){b.disableBadge=!1})},1e3),b.checkUserAndSite=function(){o.get({type:"userSiteInfo"}).then(function(c){b.$apply(function(){if(c.user&&c.user.logged_in&&c.site.has_rights)b.iframeLoaded||b.preloadIframe(),b.rightUserLogged=!0,b.menuHidden=!1,b.menuVisibility="shr-badge--active";else if(c.user&&c.user.logged_in&&!c.site.has_rights)b.wrongAccount=!0,b.currentUser=c.user.username,b.showLogin();else if(c.site&&!1===c.site.claimed){if(void 0===d.wordpress)return void(b.disableBadge=!0);b.anonymousSite=!0,b.wpAdminLink=i.endpoints.local_recs_url.split("admin-ajax.php?")[0]+"admin.php?shareaholic_redirect_url="+encodeURIComponent(i.endpoints.user_navigation.signup.split("//")[1]+"?site_origin="+m.fragment("shareaholic-badge").toString().split("//")[1]+"&ssl="+("https"===m.protocol?"1":"0")+"&site_id="+a.apiKey),b.signUpLink=b.wpAdminLink,b.showLogin()}else b.showLogin()})})},b.isLoginError=!1,b.loginButtonText="Log in",b.usernameOrEmail=null,b.password=null,b.formErrorClass="",b.tryToLogin=function(){b.loginButtonText="Logging in...";var a={type:"loginUser",username:b.usernameOrEmail,password:b.password};o.get(a).then(function(a){e.log(a),b.$apply(function(){b.anonymousSite=!1,b.wrongAccount=!1,a.user_token?(b.hideLogin(),b.checkUserAndSite()):(b.isLoginError=!0,b.loginButtonText="Log in",b.formErrorClass="shr-form-control--error")})})},b.toggleMenu=function(){b.menuHidden?b.rightUserLogged?(b.menuHidden=!1,b.menuVisibility="shr-badge--active"):b.checkUserAndSite():(b.menuHidden=!0,b.menuVisibility="")},b.showLogin=function(){b.loginHidden=!1,b.loginVisibility="shr-fadeIn"},b.hideLogin=function(){b.loginButtonText="Log in",b.loginHidden=!0,b.loginVisibility="shr-fadeOut",b.formErrorClass="",b.isLoginError=!1},b.processReactMessage=function(a){e.log(a.data)},b.hideIframe=function(){b.iframeHidden=!0,b.iframeVisibility="shr-fadeOut"},b.preloadIframe=function(){b.iframeSrc=c.trustAsResourceUrl(b.baseUrl+"/apps?domain="+b.loadedOn),b.iframeLoaded=!0,j.addEventListener("message",b.processReactMessage,!1)},b.showIframe=function(a){b.iframeHidden=!1,b.iframeVisibility="shr-fadeIn",b.iframeLoaded?j.document.querySelector("#shr-admin-badge-iframe").contentWindow.postMessage({siteId:b.siteId,path:a},"*"):(b.iframeSrc=c.trustAsResourceUrl(b.baseUrl+a+"?domain="+b.loadedOn),b.iframeLoaded=!0,j.addEventListener("message",b.processReactMessage,!1)),b.toggleMenu()},"shareaholic-badge"===m.fragment()&&b.toggleMenu(),b.toggleMenu()}]),q.html(h),c.bootstrap(q[0],[r])}var c=a("angular"),d=a("when"),e=a("utils/logger"),f=a("utils/utils"),g=a("utils/dom"),h=a("text!./templates/container.html"),i=a("utils/settings"),j=a("utils/globalObject"),k=a("data/DataStore");return e=e.child({name:"Admin Badge",color:"#00BB00"}),{load:function(a,c){var f=d.defer();e.log("Loading admin badge",a);try{b(a,c),f.resolve()}catch(b){e.error("Could not render adminbadge: ",b),b.data=a,f.reject(b)}return f.promise}}});