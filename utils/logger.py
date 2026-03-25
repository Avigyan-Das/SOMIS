import datetime

def log(agent_name: str, message: str):
    """Logs a message with a timestamp and agent name."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] [{agent_name}] {message}")
