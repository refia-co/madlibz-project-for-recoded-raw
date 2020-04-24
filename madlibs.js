let editMadLibs = document.getElementsByClassName("madLibsEdit")[0]; 
let previewMadLibs = document.getElementsByClassName("madLibsPreview")[0];





function parseStory(rawStory) {
  let wordMatches = rawStory.matchAll(/([\w\<\>\']+|\.|,)(\[\w+\])?/g); 
  //two groups here. 1st group includes objects with one or more letters or objects with brackets or apostrophes.
  //second group contains objects with brackets at the end. this is how we define the blank objects in the text.

  let output = []; //an array to push the objects in.

  // for (let i = 0; i < wordMatches.length; i++) {

  for (const match of wordMatches) {  //why did we use - of -?
    let word = match[1]; //here we matched 'word' variable with the first group of objects
    let posRaw = match[2]; //matched 'posRaw' with second group.
    let wordObject = { //formed the list of objects
      "word": word,
    };

    if (posRaw === "[n]") {     //matched the objects with thir names
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
  
  return output;  //now we can see the array of objects in console.
}

function displayEditText(output) {
  let editText = "";
  for (const outputWord of output) {
    if (outputWord.hasOwnProperty("pos")) {
      let inputWord = document.createElement("input");
      inputWord.type = "text"; 
      inputWord.placeholder = outputWord["pos"];
      inputWord.maxLength = "20";
      editText += inputWord.outerHTML;
    } else if (outputWord["word"] === "," || outputWord["word"] === ".") {
      editText += `${outputWord["word"]}`;
    } else {
      editText += ` ${outputWord["word"]}`;
    };
  }
  editMadLibs.innerHTML = editText;
};


/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */


getRawStory().then(parseStory).then((output) => {
  console.log(output);
  displayEditText(output);
 

});












