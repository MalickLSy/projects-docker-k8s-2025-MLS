source .env.db
source .env.volume
source .env.network

# Container
if [ -z "$(docker ps -aq -f name=^${DB_CONTAINER_NAME}$)" ]; then
    echo "A container with the name $DB_CONTAINER_NAME does not exist."
else
    #2>/dev/null	Cache les messages d'erreur Docker (optionnel)
    if docker kill "$DB_CONTAINER_NAME"; then
        echo "A container with the name $DB_CONTAINER_NAME has been killed."
    else
        echo "Failed to kill container $DB_CONTAINER_NAME."
    fi
fi      

# Volume
if [ -z "$(docker volume ls -q -f name=^${VOLUME_NAME}$)" ]; then
    echo "A volume with the name $VOLUME_NAME does not exist."
else
    if docker volume rm "$VOLUME_NAME"; then
        echo "A volume with the name $VOLUME_NAME has been removed."
    else
        echo "Failed to remove volume $VOLUME_NAME."
    fi
fi

# Network
if [ -z "$(docker network ls -q -f name=^${NETWORK_NAME}$)" ]; then
    echo "A network with the name $NETWORK_NAME does not exist."
else
    if docker network rm "$NETWORK_NAME" 2>/dev/null; then
        echo "A network with the name $NETWORK_NAME has been removed."
    else
        echo "Failed to remove network $NETWORK_NAME."
    fi
fi