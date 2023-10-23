// ==UserScript==
// @name         Facebook RM
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove Facebook suggestions & Ads
// @author       Mohamed Elkebir
// @match        https://www.facebook.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facebook.com
// @grant        none
// ==/UserScript==

(function () {
  ("use strict");

  function removeFBSggestions(element) {
    element.querySelectorAll("span").forEach((elm) => {
      const content = elm.textContent;

      if (
        content.trim() == "اقتراحات قد تعجبك" ||
        content.trim() == "ريلز ومقاطع الفيديو القصيرة"
      ) {
        elm.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
          "none";
      } else if (content.trim() == "مُموَّل") {
        elm.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    });
  }

  function observeMutations(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            removeFBSggestions(addedNode);
          }
        });
      }
    });
  }

  removeFBSggestions(document);

  const observer = new MutationObserver(observeMutations);
  observer.observe(document, { childList: true, subtree: true });
})();
