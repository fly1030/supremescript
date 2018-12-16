// Position of item, from top to bottom, left to right
const itemNum = 2
// Your size
const preferredSize = "Medium"; // "Small", "Medium", "Large", "XLarge"

const allArticles = $("article")
if (itemNum - 1 < allArticles.length) {
  $(allArticles[itemNum-1]).find("a")[0].click()
}

/*
automatically choose correct size, if applicable
*/
(function waitTillArticlePageIsOpen() {
  // check if article page has loaded by looking at main image
  if ($("#img-main")[0]) {
    // choose appropriate size, if applicable
    if ($("select")[0]) {
      for (let i = 0; i < $("select")[0].options.length; i++) {
        if ($("select")[0].options[i].text == preferredSize) {
          $("select")[0].selectedIndex = i;
          break;
        }
      }
    }
    console.log("done choosing size.")
    addToCart()
  } else 
    setTimeout(function(){ waitTillArticlePageIsOpen(); }, 10);
    console.log("waiting to load...");
  
  return;
})();

function addToCart() {
  /*
  Script to use on item screen
  */
  // add to cart
  document.getElementsByName('commit')[0].click();

  // Wait until cart updates, then go to checkout
  const itemsCountElm = $("#items-count");

  (function waitTillCartUpdates() {
    if (itemsCountElm.text() == '') {
      setTimeout(function(){ waitTillCartUpdates(); }, 10);
      return;
    } else {
      // Click checkout button
      $(".checkout")[0].click();
      return;
    }
  })();
}
