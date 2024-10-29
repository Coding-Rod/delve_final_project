import asyncio
import random

import streamlit as st

from modules.config import Config
from modules.ingestor import Ingestor
from modules.model import create_llm
from modules.retriever import create_retriever
from modules.uploader import upload_files

class GUI:
    def __init__(self, ask_question, create_chain):
        self.ask_question = ask_question
        self.create_chain = create_chain

        st.set_page_config(page_title="Document reader", page_icon="📚")

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
            "assistant", avatar=str(Config.Path.IMAGES_DIR / "assistant-avatar.png")
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


    def show_upload_documents(self):
        holder = st.empty()
        with holder.container():
            st.header("RagBase")
            st.subheader("Get answers from your documents")
            uploaded_files = st.file_uploader(
                label="Upload PDF files", type=["pdf"], accept_multiple_files=True
            )
        if not uploaded_files:
            st.warning("Please upload PDF documents to continue!")
            st.stop()

        with st.spinner("Analyzing your document(s)..."):
            holder.empty()
            return self.build_qa_chain(uploaded_files)

    @staticmethod
    def show_message_history():
        for message in st.session_state.messages:
            role = message["role"]
            avatar_path = (
                Config.Path.IMAGES_DIR / "assistant-avatar.png"
                if role == "assistant"
                else Config.Path.IMAGES_DIR / "user-avatar.png"
            )
            with st.chat_message(role, avatar=str(avatar_path)):
                st.markdown(message["content"])


    def show_chat_input(self, chain):
        if prompt := st.chat_input("Ask your question here"):
            st.session_state.messages.append({"role": "user", "content": prompt})
            with st.chat_message(
                "user",
                avatar=str(Config.Path.IMAGES_DIR / "user-avatar.png"),
            ):
                st.markdown(prompt)
            asyncio.run(self.ask_chain(prompt, chain))
