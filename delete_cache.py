from transformers.utils.hub import cached_path
from pathlib import Path
import shutil

cache_dir = Path.home() / ".cache" / "huggingface"

shutil.rmtree(cache_dir, ignore_errors=True)

print("Hugging Face cache deleted successfully!")
