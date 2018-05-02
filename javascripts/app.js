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
	const max = people.length;
	let quoteText;
	let authorName;


$( window ).load(function() {
	let peopleIndex = getRandomIndex(max);
	authorName = people[peopleIndex];
	WikiquoteApi.openSearch(authorName,
      function(results) {
      	console.log(results)

        // Get quote
        WikiquoteApi.getRandomQuote(authorName,
          function(newQuote) {
          	quoteBlock.hide();  //use hide() and fadeIn() for text animation
          	quote.html(newQuote.quote);
          	console.log(quote.text());
          	quoteText = quote.text();
          	quote.text(quoteText);
          	author.text(newQuote.titles);
            quoteBlock.fadeIn(1800);
          },
          function(msg){
          	console.log(msg);
            alert(msg);
          }
        );
      },
      function(msg) {
        alert(msg);
      }
    );
  // Run code
});
// on button click update quote
main.on( "click", "button", function() {
	let buttonText = $(this).text();

	if(buttonText == "New Quote"){
		let peopleIndex = getRandomIndex(max);
		authorName = people[peopleIndex];
	}
	else {
		authorName = buttonText;
	}
	WikiquoteApi.openSearch(authorName,
      function(results) {
      	console.log(results)

        // Get quote
        WikiquoteApi.getRandomQuote(authorName,
          function(newQuote) {
          	quoteBlock.hide();
          	quote.html(newQuote.quote);
          	console.log(quote.text());
          	quoteText = quote.text();
          	quote.text(quoteText);
          	author.text(newQuote.titles);
            quoteBlock.fadeIn(1800);
          },
          function(msg){
          	console.log(msg);
            alert(msg);
          }
        );
      },
      function(msg) {
        alert(msg);
      }
    );
  });

authorNavMenu.on( "click", "a", function() {

  authorNavMenu.removeClass("nav-open");

  if(!$(this).hasClass('close-author-nav-menu')) { //fix the issue, it is not working
    authorName = $(this).text();

  WikiquoteApi.openSearch(authorName,
      function(results) {
        console.log(results)

        // Get quote
        WikiquoteApi.getRandomQuote(authorName,
          function(newQuote) {
            quoteBlock.hide();
            quote.html(newQuote.quote);
            console.log(quote.text());
            quoteText = quote.text();
            quote.text(quoteText);
            author.text(newQuote.titles);
            quoteBlock.fadeIn(1800);
          },
          function(msg){
            console.log(msg);
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

});
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}