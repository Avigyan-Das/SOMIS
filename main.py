from agents.swarm import SomisSwarm, DUMMY_FEED
from agents.scraper import CNBCScraper
import time
import sys

def run_hackathon_demo(live=False):
    print("="*60)
    print(f" S.O.M.I.S: ALPHA-GRAPH {'LIVE' if live else 'DEMO'} STARTING...")
    print("="*60)
    
    swarm = SomisSwarm()
    
    if live:
        print("[INIT] Fetching live news from CNBC...")
        scraper = CNBCScraper()
        news_items = scraper.get_business_news()
        feed = [{"news": item['title'], "url": item['link']} for item in news_items]
    else:
        feed = DUMMY_FEED

    for item in feed:
        news_text = item['news']
        print(f"\n[FEED INGESTED]: {news_text}")
        if 'url' in item:
            print(f"[URL]: {item['url']}")
        print("-" * 20)
        
        try:
            # Note: This will attempt to connect to KoboldCpp at http://localhost:5001/v1
            # Ensure KoboldCpp is running before execution.
            result = swarm.process_news(news_text)
            print(f"\n[SWARM OUTPUT]:\n{result}")
        except Exception as e:
            print(f"\n[ERROR]: Swarm execution failed. Ensure KoboldCpp is running.")
            print(f"Details: {e}")
            # print(f"Traceback: ", sys.exc_info())
        
        print("-" * 60)
        time.sleep(2)  # Pause for effect in demo

if __name__ == "__main__":
    # Use --live flag to run with real CNBC data
    is_live = "--live" in sys.argv
    run_hackathon_demo(live=is_live)
