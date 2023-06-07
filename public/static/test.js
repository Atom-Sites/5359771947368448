const loadScriptsTimer = setTimeout(loadScripts, 5000);
const userInteractionEvents = ["mouseover","keydown","touchmove","touchstart"
];
userInteractionEvents.forEach(function (event) {
    window.addEventListener(event, triggerScriptLoader, {
        passive: true
    });
});
function triggerScriptLoader() {
    loadScripts();
    clearTimeout(loadScriptsTimer);
    userInteractionEvents.forEach(function (event) {
        window.removeEventListener(event, triggerScriptLoader, {
            passive: true
        });
    });
}

console.log('soidfhoish');

function loadScripts() {
    console.log('soidfhoish');
    
    document.querySelectorAll("script[data-type=‘lazy’]").forEach(function (elem) {
        elem.setAttribute("src", elem.getAttribute("data-src"));
    });
    document.querySelectorAll("iframe[data-type=‘lazy’]").forEach(function (elem) {
        elem.setAttribute("src", elem.getAttribute("data-src"));
    });

    // $(‘.w-nav-menu’).on(‘click’, ‘a’, function() {
    //     // When a nav item is clicked on a tablet or mobile device
    //       if (parseInt($(window).width()) < 990) {
    //       // Click the menu close button
    //           $(‘.w-nav-button’).triggerHandler(‘tap’);
    //       }
    //   });

    document.querySelectorAll('.w-nav-menu a').forEach(function(element) {
        element.addEventListener('click', function() {
          // When a nav item is clicked on a tablet or mobile device
          if (parseInt(window.innerWidth) < 990) {
            // Click the menu close button
            document.querySelector('.w-nav-button').dispatchEvent(new Event('tap'));
          }
        });
      });
}
