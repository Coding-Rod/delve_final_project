# SmartDoc

> RAG base chatbot with LLM and Qdrant

## Installation

Clone the repo:

```sh
git clone https://github.com/Coding-Rod/delve_final_project.git
```

Install python dependencies:

```sh
pip install -r requirements.txt
```

Get a Groq API key from [here](https://groq.com/)

Create a `.env` file in the root of the project with the following content:

```sh
GROQ_API_KEY="YOUR API KEY"
```

Start project:

```sh
streamlit run src/app.py
```

## Architecture

<!-- TODO: Add architecture diagram -->

### Ingestor

Extracts text from PDF documents and creates chunks (using semantic and character splitter) that are stored in a vector databse

### Retriever

Given a query, searches for similar documents, reranks the result and applies LLM chain filter before returning the response.

### Chain

Combines the LLM with the retriever to answer a given user question

## More Info

- [Groq API](https://groq.com/) - fast inference for mutliple LLMs
- [LangChain](https://www.langchain.com/) - build LLM-powered apps
- [Qdrant](https://qdrant.tech/) - vector search/database
- [Streamlit](https://streamlit.io/) - build UI for data apps
- [PDFium](https://pdfium.googlesource.com/pdfium/) - PDF processing and text extraction
