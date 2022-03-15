const redirectToSubs = () => {
  if (window.location.pathname == "/") {
    window.location.replace("https://youtube.com/feed/subscriptions");
  }
}

const main = async () => {
  redirectToSubs();
}

window.onload = main;

window.addEventListener("yt-navigate-finish", main, true);
