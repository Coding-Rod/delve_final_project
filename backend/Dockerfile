# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install fastapi-cli
RUN pip install fastapi-cli

# Copy the rest of the application code
COPY . .

# .env file
COPY .env .

# Expose port 8000
EXPOSE 8000

# Define the command to run the application with fastapi-cli
CMD ["fastapi", "run", "app/main.py", "--host", "0.0.0.0", "--port", "8000", "--reload"]
