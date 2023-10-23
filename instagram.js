// ==UserScript==
// @name         Instagram RM
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove Instagram suggestions & Ads
// @author       Mohamed Elkebir
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function removeOrEditBadElements(element) {
    /** @type {HTMLElement[]} */
    const elements = element.querySelectorAll("span");

    elements.forEach((elm) => {
      const content = elm.textContent;

      if (
        content.trim() == "Suggested for you" ||
        content.trim() == "Sponsored" ||
        content.trim() == "Follow"
      ) {
        if (elm.parentElement.closest("article") != null) {
          elm.parentElement.closest("article").childNodes.forEach((elm) => {
            elm.style.opacity = 0;
          });
          elm.parentElement.closest("article").style.border = "1px solid red";
        }
      }
    });

    /** @type {HTMLImageElement[]} */
    const imageElements = element.querySelectorAll("img");

    imageElements.forEach((elm) => {
      if (
        elm.parentElement.tagName === "DIV" &&
        (location.pathname.startsWith("/explore") ||
          location.pathname.startsWith("/p/"))
      ) {
        elm.style.filter = "blur(99px)";
      }
    });

    /** @type {HTMLVideoElement[]} */
    const videoElements = element.querySelectorAll("video");

    videoElements.forEach((elm) => {
      if (
        elm.parentElement.tagName === "DIV" &&
        (location.pathname.startsWith("/explore") ||
          location.pathname.startsWith("/p/"))
      ) {
        elm.style.filter = "blur(99px)";
      }
    });
  }

  function observeMutations(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            removeOrEditBadElements(addedNode);
          }
        });
      }
    });
  }

  removeOrEditBadElements(document);

  const observer = new MutationObserver(observeMutations);
  observer.observe(document, { childList: true, subtree: true });
})();
