function parseStory(rawStory) {
  let wordMatches = rawStory.matchAll(/([\w\<\>\']+|\.|,)(\[\w+\])?/g);
  let output = [];
  // for (let i = 0; i < wordMatches.length; i++) {
  for (match of wordMatches) {
    let word = match[1];
    let posRaw = match[2];
    let wordObject = {
      "word": word,
    };
    if (posRaw === "[n]") {
      wordObject["pos"] = "noun";
    } else if (posRaw === "[v]") {
      wordObject["pos"] = "verb";
    } else if (posRaw === "[adj]") {
      wordObject["pos"] = "adjective";
    } else if (posRaw === "[exc]") {
      wordObject["pos"] = "exclamation";
    }
    output.push(wordObject);
  }
  
  return output; 
}


/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
  console.log(processedStory);
});
