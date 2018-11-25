$(function() {
  const people = ["Aristotle",
          "Emily Brontë",
          "Charles Darwin",
          "Charles Dickens",
          "Albert Einstein",
          "Richard Feynman",
          "Mahatma Gandhi",
          "Jesus",
          "John Keats",
          "Helen Keller",
          "Martin Luther King, Jr.",
          "Laozi",
          "Timothy Leary",
          "Muhammad",
          "Thomas Paine",
          "Eleanor Roosevelt",
          "Bertrand Russell",
          "William Saroyan",
          "William Shakespeare",
          "George Bernard Shaw",
          "Percy Bysshe Shelley",
          "Leo Tolstoy",
          "Anonymous"];
  const main = $('main');
  const quote = $('#quote');
  const author = $('.blockquote-footer');
  const quoteBlock = $('.blockquote');
  const tweet = $('#tweet');
  const authorNavButton = $('#author-nav-button');
  const authorNavMenu = $('.side-nav');
  const authorNavClose = $('.close-author-nav-menu');
  const authorButtons = $('#author-buttons');
  const max = people.length;
  let quoteText;
  let authorName;

  // Load quote
  authorName = people[getRandomIndex(max)];
  getQuote(authorName);

  // Add author buttons
  const buttonFragment = document.createDocumentFragment();
  for(const person of people){
    const newItem = document.createElement(`button`);
    newItem.setAttribute('type', 'button');
    newItem.setAttribute('class', 'btn btn-sm btn-secondary m-1');
    newItem.innerText = person;
    buttonFragment.appendChild(newItem);
  }
  authorButtons.append(buttonFragment);

  // Load mobile nav menu entries
  const navFragment = document.createDocumentFragment();
  for(const person of people){
    const newItem = document.createElement(`a`);
    newItem.setAttribute('href', '#');
    newItem.innerText = person;
    navFragment.appendChild(newItem);
  }
  authorNavMenu.append(navFragment);

// on button click update quote
  main.on( "click", "button", function() {
    let buttonText = $(this).text();
    authorName = (buttonText === "New Quote") ? people[getRandomIndex(max)] : buttonText;
    getQuote(authorName);
  });

  authorNavMenu.on( "click", "a", function() {

    authorNavMenu.removeClass("nav-open");

    if(!$(this).hasClass('close-author-nav-menu')) {
      authorName = $(this).text();
      getQuote(authorName);
    }
  });

  tweet.click(function(){
    let uri = "https://twitter.com/intent/tweet?text=" + "\"" + quoteText + "\"" + authorName;
    tweet.attr("href", encodeURI(uri));
  });

  authorNavButton.click(function(){
    authorNavMenu.addClass("nav-open");
  });

  authorNavClose.click(function(){
    authorNavMenu.removeClass("nav-open");
  });

  function getQuote(name){
    WikiquoteApi.openSearch(name,
      function(results) {
        // console.log(results)
        // Get quote
        WikiquoteApi.getRandomQuote(name,
          function(newQuote) {
            // console.log(Object.keys(newQuote));
            if(newQuote.quote.length > 2){
              quoteBlock.hide();
              quote.html(newQuote.quote);
              // console.log(quote.text());
              quoteText = quote.text();
              quote.text(quoteText);
              author.text(newQuote.titles);
              quoteBlock.fadeIn(1800);
            }
            else {
              getQuote(name);
            }
          },
          function(msg){
            alert(msg);
          }
        );
      },
      function(msg) {
        alert(msg);
      }
    );
  }

});
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}