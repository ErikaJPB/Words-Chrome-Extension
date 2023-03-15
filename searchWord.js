const apiKey = "wmmujw3x9mlhqv7omqv6gc1wdjq01v7ig3io2erxix09hh1vf";

// Add click event listener to the search button
document.getElementById("search-button").addEventListener("click", function () {
  const word = document.getElementById("word-input").value.trim();

  // Check if the word is empty
  if (word === "") {
    return;
  }

  // Capitalize the first letter of the word
  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);

  // Make API request to Wordnik
  fetch(
    `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Display the definition in the container
      const definitionContainer = document.getElementById(
        "definition-container"
      );
      if (data.length > 0) {
        const definition = data[0].text;
        definitionContainer.innerHTML = `<p><strong>${capitalizedWord}</strong>: ${definition}</p>`;
      } else {
        definitionContainer.innerHTML = `<p>No definition found for "${capitalizedWord}"</p>`;
      }
    })
    .catch((error) => {
      console.error(error);
      const definitionContainer = document.getElementById(
        "definition-container"
      );
      definitionContainer.innerHTML = `<p>Error retrieving definition for "${capitalizedWord}"</p>`;
    });
});
