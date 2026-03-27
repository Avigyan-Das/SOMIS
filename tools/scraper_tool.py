from crewai.tools import tool
from agents.scraper import CNBCScraper

class ScraperTools:
    @tool("get_news_headlines")
    def get_news_headlines(source: str = "CNBC") -> str:
        """
        Fetches the latest business news headlines.
        :param source: 'CNBC' or 'Reuters' (default is CNBC).
        :return: A list of headlines and links as a string.
        """
        scraper = CNBCScraper()
        news = scraper.get_business_news()
        
        output = []
        for item in news:
            output.append(f"[{item['source']}] {item['title']} - {item['link']}")
        
        return "\n".join(output)

    @tool("fetch_article_content")
    def fetch_article_content(url: str) -> str:
        """
        Fetches the full text content of an article for deep analysis.
        :param url: The URL of the article.
        :return: The full text content (truncated to 2000 chars).
        """
        scraper = CNBCScraper()
        content = scraper.get_article_content(url)
        return content[:2000]
