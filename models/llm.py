import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class LocalLLM:
    def __init__(self, api_key: str = "EMPTY", base_url: str = "http://localhost:5001/v1"):
        # Default base_url for KoboldCpp is usually http://localhost:5001/api/v1 or /v1
        self.client = OpenAI(api_key=api_key, base_url=base_url)

    def generate(self, prompt: str, system_prompt: str = "You are a helpful assistant.", model: str = "local-model") -> str:
        """Generates a response using the local LLM."""
        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error generating response: {e}"

if __name__ == "__main__":
    # Test connection
    llm = LocalLLM()
    print(llm.generate("Hello, who are you?"))
