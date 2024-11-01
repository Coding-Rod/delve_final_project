import asyncio
import streamlit as st

from modules.config.main import Config
from .controller import Controller

class GUI(Controller):
    def show_upload_documents(self):
        holder = st.empty()
        
        # Display the header and subheader
        with holder.container():
            st.header("SmartDoc")
            st.subheader("Upload your PDF documents to get started")
            uploaded_files = st.file_uploader(
                label="Upload PDF files", type=["pdf"], accept_multiple_files=True
            )

        # Check if the user has uploaded any files
        if not uploaded_files:
            st.info("Please upload PDF documents to continue!")
            st.stop()

        # Process the uploaded files
        with st.spinner("Processing documents..."):
            holder.empty()
            self.chain = self.build_qa_chain(uploaded_files)
        

    @staticmethod
    def show_message_history():
        for message in st.session_state.messages:
            role = message["role"]
            avatar_path = (
                Config.Path.IMAGES_DIR / "assistant-avatar.jpg"
                if role == "assistant"
                else Config.Path.IMAGES_DIR / "user-avatar.jpg"
            )
            with st.chat_message(role, avatar=str(avatar_path)):
                st.markdown(message["content"])


    def show_chat_input(self):
        if prompt := st.chat_input("Ask your question here"):
            st.session_state.messages.append({"role": "user", "content": prompt})
            with st.chat_message(
                "user",
                avatar=str(Config.Path.IMAGES_DIR / "user-avatar.jpg"),
            ):
                st.markdown(prompt)
            asyncio.run(self.ask_chain(prompt, self.chain))
