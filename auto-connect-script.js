// ==UserScript==
// @name New Script
// @namespace OrangeMonkey Scripts
// @grant none
// ==/UserScript==

(function () {
  "use strict";

  const { host, pathname } = window.location;
  if (
    host === "www.linkedin.com" &&
    pathname.includes("search/results/people")
  ) {
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
            .filter(
              (button) => button.textContent.trim() === "Send without a note"
            )
            .forEach((i) => i.click());
          currentIndex++;
        } else {
          clearInterval(intervalId); // Stop the interval when all buttons have been clicked
        }
      }

      const intervalId = setInterval(clickNextButton, clickInterval);
    }
  }

  if (
    host === "www.linkedin.com" &&
    pathname.includes("invitation-manager/sent")
  ) {
    console.log("invitation-manager/sent");

    const skillsListContainer = document.querySelector(".pvs-list");

    const button = document.createElement("button");
    button.innerText = "Withdraw All";
    button.style.backgroundColor = "#ffcccb";
    button.style.color = "#ffffff";
    button.style.padding = "20px";
    button.style.borderRadius = "4px";
    button.style.position = "fixed";
    button.style.zIndex = "99";
    button.style.bottom = "160px";
    button.style.left = "40px";

    button.addEventListener("click", withdrawAll);

    document.body.append(button);

    function withdrawAll() {
      console.log("withDrawAll");
      const buttonsWithIdAndText = Array.from(
        document.querySelectorAll('button[id^="ember"]')
      ).filter((e) => e.textContent.trim() === "Withdraw");

      let currentIndex = 0;
      const clickInterval = 1000;

      function clickNextButton() {
        if (currentIndex < buttonsWithIdAndText.length) {
          const monthAgo = "Sent 1 month ago";
          if (
            buttonsWithIdAndText[currentIndex].parentNode.previousElementSibling
              .querySelector('span[class^="time-badge"]')
              .textContent.trim() === monthAgo
          ) {
            buttonsWithIdAndText[currentIndex].click();

            const buttonWithdraw = Array.from(
              document.querySelectorAll('button[id^="ember"]')
            )
              .filter((button) => button.textContent.trim() === "Withdraw")
              .find(
                (el) =>
                  el.previousElementSibling?.textContent?.trim() === "Cancel"
              );
            buttonWithdraw.click();
          }

          currentIndex++;
        } else {
          clearInterval(intervalId); // Stop the interval when all buttons have been clicked
        }
      }

      const intervalId = setInterval(clickNextButton, clickInterval);
    }
  }
})();
