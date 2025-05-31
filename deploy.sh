#!/bin/bash

# Name of the Docker container to stop, remove, and restart
CONTAINER_NAME="jerrybot_container"
# Name of the Docker image to remove
IMAGE_NAME="jerrybot_image"

# Check if deploy.zip exists before executing upgrade
if [ ! -f "deploy.zip" ]; then
    echo "deploy.zip not found!"
    exit 1
fi

# Stop the Docker container if it is running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping Docker container $CONTAINER_NAME..."
    docker stop $CONTAINER_NAME
    
    # Remove the Docker container
    echo "Removing Docker container $CONTAINER_NAME..."
    docker rm $CONTAINER_NAME
else
    echo "No running container with name $CONTAINER_NAME found. Attempting to remove any stopped container with the same name..."
    
    # Attempt to remove any stopped container with the same name
    if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
        docker rm $CONTAINER_NAME
    fi
fi

# Remove the Docker image
if [ "$(docker images -q $IMAGE_NAME)" ]; then
    echo "Removing Docker image $IMAGE_NAME..."
    docker rmi $IMAGE_NAME
else
    echo "No Docker image with name $IMAGE_NAME found."
fi

# Check if app directory exists
if [ -d "app" ]; then
    # Remove everything in the app directory
    echo "Cleaning out app directory"
    rm -rf app/*
else
    # Create the app directory if it doesn't exist
    mkdir app
fi

# Unzip deploy.zip into the app folder
unzip -o deploy.zip -d app

# Check if the unzip was successful
if [ $? -eq 0 ]; then
    echo "Deployment successful!"
    # Delete the deploy.zip file
    rm -f deploy.zip
    echo "deploy.zip deleted."
else
    echo "Deployment failed!"
    exit 1
fi

# Copy env.json to the app directory
if [ -f "env.json" ]; then
    cp env.json app/
    echo "env.json copied to app directory."
else
    echo "env.json not found!"
    exit 1
fi

# Enter app directory
cd app/

# Build the new docker image
docker build . -t $IMAGE_NAME

# Restart the Docker container with a new image
echo "Starting Docker container $CONTAINER_NAME..."
docker run -d --name $CONTAINER_NAME $IMAGE_NAME

# Check if the Docker container started successfully
if [ $? -eq 0 ]; then
    echo "Docker container $CONTAINER_NAME started successfully!"
else
    echo "Failed to start Docker container $CONTAINER_NAME!"
    exit 1
fi
