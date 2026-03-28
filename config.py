import os
from crewai import LLM

# LLM Configuration for KoboldCpp
# pointing to the local OpenAI-compatible endpoint
def get_llm(model_name="phi-3.5-mini-instruct"):
    """
    Returns a crewai LLM object and the name of the engine used.
    """
    import os
    import httpx
    
    # MANUAL OVERRIDE FOR TESTING (Set to True to kill Groq entirely)
    FORCE_LOCAL_ONLY = False 

    if FORCE_LOCAL_ONLY:
        return LLM(
            model=f"openai/{model_name}",
            base_url="http://localhost:5001/v1",
            api_key="sk-dummy-key"
        ), "PHI-3.5 (LOCAL_DNA)"

    # Priority 1: Local Brain Check
    try:
        with httpx.Client() as client:
            res = client.get("http://localhost:5001/v1/models", timeout=1.0)
            if res.status_code == 200:
                return LLM(
                    model=f"openai/{model_name}",
                    base_url="http://localhost:5001/v1",
                    api_key="sk-dummy-key"
                ), "PHI-3.5 (AUTO_DETECT)"
    except Exception:
        pass

    # Priority 2: Groq Fallback
    groq_key = os.getenv("GROQ_API_KEY")
    if groq_key:
        return LLM(
            model="groq/llama-3.3-70b-versatile",
            api_key=groq_key
        ), "GROQ"
    
    # Default
    return LLM(
        model=f"openai/{model_name}",
        base_url="http://localhost:5001/v1",
        api_key="sk-dummy-key"
    ), "PHI-3.5"

# System Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)
