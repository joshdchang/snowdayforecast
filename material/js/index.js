var nodes = document.querySelectorAll('.mdc-icon-toggle');
for (var i = 0, node; node = nodes[i]; i++) {
  	mdc.iconToggle.MDCIconToggle.attachTo(node);
}

var bars = document.querySelectorAll('.mdc-top-app-bar');
for (var i = 0, bar; bar = bars[i]; i++) {
		mdc.topAppBar.MDCTopAppBar.attachTo(bar);
}

var tabs = document.querySelectorAll('.mdc-tab-bar');
for (var i = 0, tab; tab = tabs[i]; i++) {
		mdc.tabBar.MDCTabBar.attachTo(tab);
}
