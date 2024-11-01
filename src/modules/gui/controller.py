import streamlit as st

from modules.config.main import Config
from modules.model.main import create_llm

from ..utils.uploader import upload_files
from ..logic.ingestor import Ingestor
from ..logic.retriever import create_retriever

class Controller:
    chain = None
    def __init__(self, ask_question, create_chain):
        self.ask_question = ask_question
        self.create_chain = create_chain

        st.set_page_config(page_title="SmartDoc", page_icon="📚")

        if "messages" not in st.session_state:
            st.session_state.messages = [
                {
                    "role": "assistant",
                    "content": "I'll read your documents and answer your questions.",
                }
            ]

        if (Config.CONVERSATION_MESSAGES_LIMIT>0 and 
            Config.CONVERSATION_MESSAGES_LIMIT<=len(st.session_state.messages)):
            st.warning(
                "Conversation limit reached. "
                "Please refresh the page to begin a new conversation."
            )
            st.stop()

    @st.cache_resource(show_spinner=False)
    def build_qa_chain(_self, files):
        file_paths = upload_files(files)
        vector_store = Ingestor().ingest(file_paths)
        llm = create_llm()
        retriever = create_retriever(llm, vector_store=vector_store)
        return _self.create_chain(llm, retriever)

    async def ask_chain(self, question: str, chain):
        full_response = ""
        assistant = st.chat_message(
            "assistant", avatar=str(Config.Path.IMAGES_DIR / "assistant-avatar.jpg")
        )
        with assistant:
            message_placeholder = st.empty()
            message_placeholder.status("Processing...", state="running")
            documents = []
            async for event in self.ask_question(chain, question, session_id="session-id-42"):
                if type(event) is str:
                    full_response += event
                    message_placeholder.markdown(full_response)
                if type(event) is list:
                    documents.extend(event)

        st.session_state.messages.append({"role": "assistant", "content": full_response})
