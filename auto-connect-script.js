// ==UserScript==
// @name New Script
// @namespace OrangeMonkey Scripts
// @grant none
// ==/UserScript==

(function () {
  "use strict";

  const { host } = window.location;
  if (host !== "www.linkedin.com") {
    return;
  }

  const skillsListContainer = document.querySelector(".pvs-list");

  const button = document.createElement("button");
  button.innerText = "Add all";
  button.style.backgroundColor = "#51f5a3";
  button.style.color = "#ffffff";
  button.style.padding = "20px";
  button.style.borderRadius = "4px";
  button.style.position = "fixed";
  button.style.zIndex = "99";
  button.style.bottom = "110px";
  button.style.left = "40px";

  button.addEventListener("click", addAll);

  document.body.append(button);

  function addAll() {
    const buttonsWithIdAndText = Array.from(
      document.querySelectorAll('button[id^="ember"]')
    ).filter((button) => button.textContent.trim() === "Connect");

    let currentIndex = 0;
    const clickInterval = 1000; // Adjust this interval as needed (in milliseconds)

    function clickNextButton() {
      if (currentIndex < buttonsWithIdAndText.length) {
        buttonsWithIdAndText[currentIndex].click();
        Array.from(document.querySelectorAll('button[id^="ember"]'))
          .filter((button) => button.textContent.trim() === "Send")
          .forEach((i) => i.click());
        currentIndex++;
      } else {
        clearInterval(intervalId); // Stop the interval when all buttons have been clicked
      }
    }

    const intervalId = setInterval(clickNextButton, clickInterval);
  }
})();
