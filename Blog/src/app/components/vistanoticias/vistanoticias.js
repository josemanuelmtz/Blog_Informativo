function addNewsItem(title, date, imageUrl, content, author, link) {
    const newsContainer = document.getElementById('newsContainer');

    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    const newsTitle = document.createElement('h2');
    newsTitle.textContent = title;

    const newsDate = document.createElement('div');
    newsDate.classList.add('date');
    newsDate.textContent = date;

    const newsImage = document.createElement('img');
    newsImage.src = imageUrl;

    const newsContent = document.createElement('p');
    newsContent.textContent = content;

    const newsAuthor = document.createElement('div');
    newsAuthor.classList.add('author');
    newsAuthor.textContent = `Escrito por ${author}`;

    const readMoreLink = document.createElement('a');
    readMoreLink.classList.add('read-more');
    readMoreLink.href = link;
    readMoreLink.textContent = 'Seguir leyendo';

    newsItem.appendChild(newsTitle);
    newsItem.appendChild(newsDate);
    newsItem.appendChild(newsImage);
    newsItem.appendChild(newsContent);
    newsItem.appendChild(newsAuthor);
    newsItem.appendChild(readMoreLink);

    newsContainer.appendChild(newsItem);
}
