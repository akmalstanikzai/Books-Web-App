document.addEventListener('DOMContentLoaded', function() {
    var fetchBookBtn = document.getElementById('fetchBookBtn');
    var searchInput = document.getElementById('searchInput');
    var bookInfo = document.getElementById('bookInfo');
  
    fetchBookBtn.addEventListener('click', function() {
      var bookId = searchInput.value.trim();
  
      if (bookId !== '') {
        var apiUrl = 'https://simple-books-api.glitch.me/books/' + bookId;
  
        var xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl, true);
  
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            var data = JSON.parse(xhr.responseText);
  
            // Clear previous book info
            bookInfo.innerHTML = '';
  
            // Display fetched book info
            var title = document.createElement('h2');
            title.textContent = data.title;
  
            var author = document.createElement('p');
            author.textContent = 'Author: ' + data.author;
  
            var year = document.createElement('p');
            year.textContent = 'Year: ' + data.year;
  
            bookInfo.appendChild(title);
            bookInfo.appendChild(author);
            bookInfo.appendChild(year);
          } else {
            console.error('Request failed with status:', xhr.status);
            bookInfo.innerHTML = '<p>Failed to fetch book data. Please try again.</p>';
          }
        };
  
        xhr.onerror = function() {
          console.error('Request failed');
          bookInfo.innerHTML = '<p>Failed to fetch book data. Please try again.</p>';
        };
  
        xhr.send();
      } else {
        alert('Please enter a book ID.');
      }
    });
  });
  