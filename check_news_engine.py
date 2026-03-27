from agents.scraper import CNBCScraper, ReutersScraper

def test_aggregator():
    print("--- S.O.M.I.S News Engine Validation ---")
    cnbc = CNBCScraper()
    
    print("\n[Step 1] Fetching Live Headlines from CNBC...")
    headlines = cnbc.get_business_news()
    
    if not headlines:
        print("FAILED: No headlines found. Check selectors or connectivity.")
        return

    for i, item in enumerate(headlines[:3]):
        print(f"{i+1}. {item['title']}")
    
    # Test Content Extraction on the first link
    target_url = headlines[0]['link']
    print(f"\n[Step 2] Testing Deep Content Extraction for: {target_url}")
    content = cnbc.get_article_content(target_url)
    
    if content:
        print(f"SUCCESS: Extracted {len(content)} characters.")
        print("-" * 30)
        print(f"PREVIEW: {content[:300]}...")
        print("-" * 30)
    else:
        print("FAILED: Could not extract article body.")

if __name__ == "__main__":
    test_aggregator()
