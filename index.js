'use strict';


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the array
  for (let i = 0; i < responseJson.length; i++){
    // for each object in the array; add the name of the
    //repository and make it a link to the repository
    $('#results-list').append(
       `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepoList(userName) {

  const url = "https://api.github.com/users/" + userName + "/repos";

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#js-username').val();
    console.log(userName);
    getRepoList(userName);
  });
}

$(watchForm);