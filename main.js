/* https://github.com/arlohb/YouTubeSimplifier */

const config = {
  // if you're on the home page, redirect to the subs page
  redirectToSubs: true,

  // delay between page loading and buttons removed,
  // on slower systems this may need to be increased
  // (in milliseconds)
  removeButtonsDelay: 1000,

  // for each of these:
  // remove will remove the entire button
  // removeText will leave the icon remaining
  buttons: {
    download: {
      remove: false,
      removeText: true,
    },
    share: {
      remove: false,
      removeText: true,
    },
    clip: {
      remove: false,
      removeText: true,
    },
    thanks: {
      remove: false,
      removeText: true,
    },
    save: {
      remove: false,
      removeText: true,
    }
  }
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

  const button = document.getElementsByTagName("ytd-download-button-renderer")[0]

  if (config.buttons.download.remove) {
    button.remove();
    return;
  }

  if (config.buttons.download.removeText) {
    button.getElementsByTagName("a")[0].getElementsByTagName("yt-formatted-string")[0].remove();
  }
}

// remove a certain button or icon
const removeButton = (element, config) => {
  if (config.remove) {
    element.parentElement.parentElement.remove();
    return;
  }
  
  if (config.removeText) {
    element.remove();
  }
}

// remove some buttons, depending on the config
const removeButtons = () => {
  // get all the formatted strings, this includes the button labels
  const strings = document.getElementsByTagName("yt-formatted-string");

  for (const string of strings) {
    if (string.innerHTML === "Share") removeButton(string, config.buttons.share);
    if (string.innerHTML === "Clip") removeButton(string, config.buttons.clip);
    if (string.innerHTML === "Thanks") removeButton(string, config.buttons.thanks);
    if (string.innerHTML === "Save") removeButton(string, config.buttons.save);
  }
}

const main = async () => {
  if (config.redirectToSubs) redirectToSubs();

  await sleep(config.removeButtonsDelay);

  removeButtons();
  removeDownloadButton();
}

window.onload = main;

window.addEventListener("yt-navigate-finish", main, true);
