from dotenv import load_dotenv

from modules.logic.chain import ask_question, create_chain
from modules.gui.main import GUI

load_dotenv()

if __name__ == "__main__":
    gui = GUI(
        ask_question=ask_question,
        create_chain=create_chain,
    )
    
    gui.show_upload_documents()
    gui.show_message_history()
    gui.show_chat_input()

