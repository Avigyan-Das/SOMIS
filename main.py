import json
from S.O.M.I.S.agents.scraper import NewsScraper
from S.O.M.I.S.agents.extractor import ExtractorAgent
from S.O.M.I.S.database.graph import GraphDatabase
from S.O.M.I.S.models.llm import LocalLLM
from S.O.M.I.S.utils.logger import log

def main():
    log("Orchestrator", "Initializing S.O.M.I.S Autonomous Swarm...")
    
    # Initialize components
    db = GraphDatabase()
    llm = LocalLLM()
    scraper = NewsScraper()
    extractor = ExtractorAgent(llm)
    
    # Step 1: Scrape news
    url = "https://www.reuters.com/business/" # Example URL
    log("Scraper", f"Fetching news from {url}...")
    try:
        content = scraper.scrape(url)
        log("Scraper", f"Successfully fetched {len(content)} characters of content.")
    except Exception as e:
        log("Scraper", f"Error fetching news: {e}")
        return

    # Step 2: Extract entities (Using a portion of the content to avoid context limits)
    log("Extractor", "Extracting entities from fetched content...")
    sample_text = content[:2000] # Just a sample for now
    entities = extractor.extract_entities(sample_text)
    log("Extractor", f"Extracted entities: {json.dumps(entities, indent=2)}")

    # Step 3: Store in Graph Database
    log("Database", "Storing entities and mapping relationships...")
    
    # Simple logic to add extracted companies to the graph
    for company_name in entities.get("companies", []):
        try:
            db.query(f"CREATE (:Company {{name: '{company_name}', industry: 'Unknown'}})")
            log("Database", f"Added Company: {company_name}")
        except Exception as e:
            if "already exists" not in str(e).lower():
                log("Database", f"Error adding company {company_name}: {e}")

    log("Orchestrator", "Swarm cycle completed.")

if __name__ == "__main__":
    main()
