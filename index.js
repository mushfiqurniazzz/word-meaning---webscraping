const puppeteer = require("puppeteer");

const checkWordMeaning = async (word) => {
  //launch the browser and open a new page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  //navigate to the URL on the page
  await page.goto(`https://www.wordnik.com/words/${word}`);

  //set the screen size
  await page.setViewport({ width: 1080, height: 1024 });

  //take a screenshot of the screen
  await page.screenshot({
    path: "screenshot.png",
  });

  //extract the meanings from the list of meanings
  const wordMeaningObject = await page.evaluate(() => {
    //select all li elements that contain word meanings
    const meaningElements = document.querySelectorAll(
      "#define > div > ul:nth-child(4) > li"
    );

    //extract the meanings if available
    const firstMeaning =
      meaningElements[0]?.innerText.replace(/noun/g, " ").replace(/;/g, ",") ||
      "Not found";

    return firstMeaning;
  });
  //print the extracted meanings
  console.log(wordMeaningObject);

  //close the browser
  await browser.close();
};

//declare a variable to search for and pass it
const wordtosearch = "software";
checkWordMeaning(wordtosearch);
