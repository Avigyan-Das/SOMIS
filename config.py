import os
from crewai import LLM

# LLM Configuration for KoboldCpp
# pointing to the local OpenAI-compatible endpoint
def get_llm(model_name="phi-3.5-mini-instruct"):
    """
    Returns a crewai LLM object configured for KoboldCpp.
    Default port for KoboldCpp is 5001.
    """
    return LLM(
        model=f"openai/{model_name}",
        base_url="http://localhost:5001/v1",
        api_key="sk-dummy-key",
        temperature=0.1
    )

# System Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)
