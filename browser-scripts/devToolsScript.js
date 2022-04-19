/**
 * While viewing YouTube playlist, paste this file/function into your browser dev tools and it will search the page
 * for each item in the watch list, pull the content from the DOM and fire up a localhost:3001 request to save the
 * data. If successful, it will remove the item from the list and then loop (if applicable based on the `max` param).
 *
 * @param max - how many iterations to perform; if not specified, goes until the list is complete.
 */
const startSubmitWatchItem = (max = Infinity) => {
  const loopWatchItem = (count = 0) => {
    const classNamePredicate = (className) => (target) =>
      target.getElementsByClassName(className);
    const tagNamePredicate = (tagName) => (target) =>
      target.getElementsByTagName(tagName);
    const selectMultiple = (predicate, id, target = document) => {
      return Array.from(predicate(target)).filter((item) => item.id === id);
    };

    const getPlaylistItem = () =>
      selectMultiple(
        classNamePredicate("ytd-playlist-video-renderer"),
        "content"
      )[0];

    const getVideoTitleElm = (item) =>
      selectMultiple(tagNamePredicate("a"), "video-title", item)[0];
    const getVideoTitle = (item) =>
      getVideoTitleElm(item).getAttribute("title");
    const getVideoURL = (item) => getVideoTitleElm(item).getAttribute("href");

    const getVideoAuthorGroupElm = (item) =>
      selectMultiple(
        classNamePredicate("ytd-channel-name"),
        "text-container",
        item
      )[0];
    const getVideoAuthorElm = (item) =>
      selectMultiple(
        tagNamePredicate("a"),
        "",
        getVideoAuthorGroupElm(item)
      )[0];
    const getVideoAuthor = (item) => getVideoAuthorElm(item).innerText;

    const getDurationElm = (item) =>
      selectMultiple(tagNamePredicate("span"), "text", item)[0];
    const getDuration = (item) =>
      getDurationElm(item).getAttribute("aria-label");

    const getVideoImageElm = (item) =>
      selectMultiple(tagNamePredicate("img"), "img", item)[0];
    const getVideoImagePromise = (item) => {
      return new Promise((resolve) => {
        const src = getVideoImageElm(item).getAttribute("src");
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
          const canvas = document.createElement("CANVAS");
          const ctx = canvas.getContext("2d");
          canvas.height = this.naturalHeight;
          canvas.width = this.naturalWidth;
          ctx.drawImage(this, 0, 0);
          const dataURL = canvas.toDataURL("base64");
          resolve(dataURL);
        };
        img.onerror = function () {
          const canvas = document.createElement("CANVAS");
          const ctx = canvas.getContext("2d");
          const imgElm = getVideoImageElm(item);
          canvas.height = imgElm.height;
          canvas.width = imgElm.width;
          ctx.font = "bold 24px serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("404", canvas.width / 2, canvas.height / 2);
          const dataURL = canvas.toDataURL("base64");
          resolve(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
          img.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          img.src = src;
        }
      });
    };

    const playlistItem = getPlaylistItem();

    getVideoImagePromise(playlistItem).then((base64) => {
      const data = {
        title: getVideoTitle(playlistItem),
        url: getVideoURL(playlistItem),
        author: getVideoAuthor(playlistItem),
        img: base64,
        duration: getDuration(playlistItem),
      };

      // Verify we have enough to properly send a request to the backend
      const emptyKey = Object.keys(data).find((key) => !data[key]);
      if (emptyKey) {
        console.error(
          `Insufficient data on key '${emptyKey}'; '${data[emptyKey]}' typeof ${data[emptyKey]}`
        );
        return;
      }

      fetch("http://localhost:3000/submit-data", {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.text())
        .then((response) => {
          console.log("Server Response", response);

          const getMenuItem = () =>
            selectMultiple(
              classNamePredicate("ytd-playlist-video-renderer"),
              "menu"
            )[0];
          const getMenuButton = (item) =>
            selectMultiple(
              classNamePredicate("yt-icon-button"),
              "button",
              item
            )[0];

          const menuItem = getMenuItem();
          const button = getMenuButton(menuItem);
          button.click();

          // Delay for animation popup
          setTimeout(() => {
            const getDropdown = () =>
              selectMultiple(
                classNamePredicate("tp-yt-iron-dropdown"),
                "contentWrapper"
              ).find((i) => i.innerHTML.includes("Watch Later"));
            const getAllListItems = (item) =>
              selectMultiple(
                tagNamePredicate("ytd-menu-service-item-renderer"),
                "",
                item
              );
            const getRemoveFromWatchLaterButton = (item) =>
              getAllListItems(item).find((i) =>
                i.innerHTML.includes("Remove from")
              );

            const dropdown = getDropdown();

            const removeButton = getRemoveFromWatchLaterButton(dropdown);
            removeButton.click();

            if (count < max) {
              loopWatchItem(count + 1);
            }
          }, 250);
        })
        .catch(console.error);
    });
  };

  loopWatchItem();
};
