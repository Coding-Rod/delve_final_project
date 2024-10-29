from dotenv import load_dotenv

from modules.chain import ask_question, create_chain
from modules.gui.main import GUI
import streamlit as st

load_dotenv()

if __name__ == "__main__":
    gui = GUI(
        ask_question=ask_question,
        create_chain=create_chain,
    )
    chain = gui.show_upload_documents()
    gui.show_message_history()
    gui.show_chat_input(chain)

