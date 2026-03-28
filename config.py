import os
from crewai import LLM

# LLM Configuration for KoboldCpp
# pointing to the local OpenAI-compatible endpoint
def get_llm(model_name="phi-3.5-mini-instruct"):
    """
    Returns a crewai LLM object. Prioritizes local KoboldCpp,
    but falls back to Groq if a GROQ_API_KEY is found in environment.
    """
    import os
    groq_key = os.getenv("GROQ_API_KEY")
    
    # Priority 1: Use Groq if key is present (Verified CrewAI format)
    if groq_key:
        return LLM(
            model="groq/llama-3.3-70b-versatile",
            api_key=groq_key
        )
    
    # Priority 2: Standard Local Setup
    return LLM(
        model=f"openai/{model_name}",
        base_url="http://localhost:5001/v1",
        api_key="sk-dummy-key"
    )

# System Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)
