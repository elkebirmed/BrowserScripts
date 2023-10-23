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

  function removeOrEditBadElements(element) {
    /** @type {HTMLElement[]} */
    const elements = element.querySelectorAll("span");

    elements.forEach((elm) => {
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

      /** @type {HTMLVideoElement[]} */
      const videoElements = element.querySelectorAll("video");

      videoElements.forEach((elm) => {
        elm.style.filter = "blur(99px)";

        elm.addEventListener("play", () => {
          elm.style.filter = "blur(0px)";
        });

        elm.addEventListener("pause", () => {
          elm.style.filter = "blur(99px)";
        });
      });

      /** @type {HTMLImageElement[]} */
      const imageElements = element.querySelectorAll("img");

      imageElements.forEach((elm) => {
        if (elm.parentElement.tagName === "DIV") {
          elm.style.filter = "blur(99px)";

          elm.addEventListener("mouseover", () => {
            elm.style.filter = "blur(0px)";
          });

          elm.addEventListener("mouseout", () => {
            elm.style.filter = "blur(99px)";
          });
        }
      });
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
