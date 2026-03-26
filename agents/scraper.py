import os
from scrapling import Fetcher
from typing import List, Dict

class BaseScraper:
    def __init__(self):
        # Initialize the fetcher with default settings
        # Scrapling handles JA3 and HTTP/2 naturally
        self.fetcher = Fetcher()

    def scrape(self, url: str) -> str:
        """Fetches the content of a URL."""
        print(f"Scraping {url}...")
        page = self.fetcher.get(url, follow_redirects=True)
        return page.text

class CNBCScraper(BaseScraper):
    def get_business_news(self) -> List[Dict[str, str]]:
        """Extracts business news headlines from CNBC."""
        url = "https://www.cnbc.com/business/"
        try:
            page = self.fetcher.get(url)
            # Scrapling Response uses 'status' not 'status_code'
            if page.status != 200:
                print(f"Warning: CNBC returned status {page.status}")
                return []

            articles = []
            # CNBC headlines are often in 'Card-title' class or similar
            links = page.css('a.Card-title')
            
            for link in links:
                title = link.get_all_text().strip()
                href = link.attrib.get('href')
                if title and href:
                    if not href.startswith('http'):
                        href = f"https://www.cnbc.com{href}"
                    articles.append({
                        "title": title,
                        "link": href,
                        "source": "CNBC"
                    })
                    if len(articles) >= 10:
                        break
            return articles
        except Exception as e:
            print(f"Error scraping CNBC: {e}")
            return []

class ReutersScraper(BaseScraper):
    def get_business_news(self) -> List[Dict[str, str]]:
        """Extracts business news headlines from Reuters."""
        url = "https://www.reuters.com/business/"
        try:
            # We add a common User-Agent and referer to help with some blocks
            # though Scrapling's Fetcher usually does its own thing.
            page = self.fetcher.get(url)
            
            if page.status != 200:
                print(f"Warning: Reuters returned status {page.status}")
                return []

            articles = []
            links = page.css('a[data-testid="Heading"], a[class*="Heading"]')
            
            for link in links:
                title = link.get_all_text().strip()
                href = link.attrib.get('href')
                if title and href and len(title) > 10:
                    if not href.startswith('http'):
                        href = f"https://www.reuters.com{href}"
                    articles.append({
                        "title": title,
                        "link": href,
                        "source": "Reuters"
                    })
                    if len(articles) >= 10:
                        break
            return articles
        except Exception as e:
            print(f"Error scraping Reuters: {e}")
            return []

if __name__ == "__main__":
    # Test CNBC
    print("Testing CNBC Scraper...")
    cnbc = CNBCScraper()
    news = cnbc.get_business_news()
    for item in news:
        print(f"[{item['source']}] {item['title']} - {item['link']}")
    
    # Test Reuters
    print("\nTesting Reuters Scraper...")
    reuters = ReutersScraper()
    news = reuters.get_business_news()
    for item in news:
        print(f"[{item['source']}] {item['title']} - {item['link']}")
