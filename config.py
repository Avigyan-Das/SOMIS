import os
from langchain_openai import ChatOpenAI

# LLM Configuration for KoboldCpp
# pointing to the local OpenAI-compatible endpoint
def get_llm(model_name="local-model"):
    """
    Returns a LangChain ChatOpenAI object configured for KoboldCpp.
    Default port for KoboldCpp is often 5001 or 8000.
    """
    return ChatOpenAI(
        base_url="http://localhost:5001/v1",
        api_key="sk-dummy-key-for-framework-validation",
        model=model_name,
        temperature=0.2
    )

# System Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)
