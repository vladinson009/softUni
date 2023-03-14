function getArticleGenerator(articles) {
    const content = document.getElementById('content');
    return closure;

    function closure() {
        if (articles.length > 0) {
            // const next = articles.shift();
            const article = document.createElement('article');
            article.textContent = articles.shift();
            content.appendChild(article);
        }
    }
}