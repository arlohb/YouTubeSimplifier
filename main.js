const config = {
  // if you're on the home page, redirect to the subs page
  redirectToSubs: true,
  // remove the download button
  removeDownloadButton: true,
  // remove the share button
  removeShareButton: true,
  // remove the clip button
  removeClipButton: true,
  // remove the thanks button
  removeThanksButton: true,
  // delay between page loading and buttons removed,
  // on slower systems this may need to be increased
  // (in milliseconds)
  removeButtonsDelay: 1000,
}

// useful utility function
const sleep = ms => new Promise(r => setTimeout(r, ms));

// if you're on the home page, redirect to the subs page
const redirectToSubs = () => {
  if (window.location.pathname == "/") {
    window.location.replace("https://youtube.com/feed/subscriptions");
  }
}

// remove the download button
const removeDownloadButton = () => {
  // No clue why, but this tag is different to every other button
  document.getElementsByTagName("ytd-download-button-renderer")[0].remove();
}

// remove some buttons, depending on the config
const removeButtons = () => {
  // get all the formatted strings, this includes the button labels
  const strings = document.getElementsByTagName("yt-formatted-string");

  for (const string of strings) {
    if (config.removeShareButton && string.innerHTML === "Share") {
      string.parentElement.parentElement.remove();
    }
    if (config.removeClipButton && string.innerHTML === "Clip") {
      string.parentElement.parentElement.remove();
    }
    if (config.removeThanksButton && string.innerHTML === "Thanks") {
      string.parentElement.parentElement.remove();
    }
  }
}

const main = async () => {
  if (config.redirectToSubs) redirectToSubs();

  await sleep(config.removeButtonsDelay);

  if (config.removeShareButton || config.removeClipButton || config.removeThanksButton) removeButtons();
  if (config.removeDownloadButton) removeDownloadButton();
}

window.onload = main;

window.addEventListener("yt-navigate-finish", main, true);
