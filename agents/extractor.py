import json
from S.O.M.I.S.models.llm import LocalLLM
from typing import List, Dict

class ExtractorAgent:
    def __init__(self, llm: LocalLLM):
        self.llm = llm

    def extract_entities(self, text: str) -> Dict[str, List[str]]:
        """Extracts entities from text using the LLM."""
        system_prompt = """
        You are an expert financial and supply chain analyst. 
        Your task is to extract entities from the provided text and return them in a JSON format.
        Entities to extract:
        - Companies (e.g., Apple, TSMC, NVIDIA)
        - Products (e.g., iPhone, H100 GPU, Neon Gas)
        - Resources/Commodities (e.g., Silicon, Lithium, Natural Gas)
        - Events (e.g., Earthquake, Strike, Port Congestion, New Factory)
        - Locations (e.g., Taiwan, Houston, Port of Los Angeles)

        Return only the JSON object with the keys: companies, products, resources, events, locations.
        """
        
        prompt = f"Extract entities from this text:\n\n{text}"
        response = self.llm.generate(prompt, system_prompt=system_prompt)
        
        try:
            # Attempt to parse JSON from the response
            # Sometimes LLMs add markdown formatting, so we might need to strip it
            if "```json" in response:
                response = response.split("```json")[1].split("```")[0].strip()
            elif "```" in response:
                response = response.split("```")[1].split("```")[0].strip()
            
            return json.loads(response)
        except Exception as e:
            print(f"Error parsing JSON from LLM: {e}")
            return {"companies": [], "products": [], "resources": [], "events": [], "locations": []}

if __name__ == "__main__":
    llm = LocalLLM()
    extractor = ExtractorAgent(llm)
    test_text = "NVIDIA's supply of H100 GPUs might be impacted due to a neon gas shortage in Taiwan caused by recent earthquakes."
    entities = extractor.extract_entities(test_text)
    print(json.dumps(entities, indent=2))
