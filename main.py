from agents.swarm import SomisSwarm, DUMMY_FEED
import time

def run_hackathon_demo():
    print("="*60)
    print(" S.O.M.I.S: ALPHA-GRAPH HACKATHON DEMO STARTING...")
    print("="*60)
    
    swarm = SomisSwarm()
    
    for news_item in DUMMY_FEED:
        print(f"\n[FEED INGESTED]: {news_item['news']}")
        print("-" * 20)
        
        try:
            # Note: This will attempt to connect to KoboldCpp at http://localhost:5001/v1
            # Ensure KoboldCpp is running before execution.
            result = swarm.process_news(news_item['news'])
            print(f"\n[SWARM OUTPUT]:\n{result}")
        except Exception as e:
            print(f"\n[ERROR]: Swarm execution failed. Ensure KoboldCpp is running.")
            print(f"Details: {e}")
        
        print("-" * 60)
        time.sleep(2)  # Pause for effect in demo

if __name__ == "__main__":
    run_hackathon_demo()
