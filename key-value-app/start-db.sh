MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0.21-ubuntu2204"
CONTAINER_NAME="mongodb"

#Root credentials 
ROOT_USER="root-user"
ROOT_PASSWORD="root-password"



docker run --rm -d --name $CONTAINER_NAME \
  -e MONGODB_INITDB_ROOT_USERNAME=$ROOT_USER \
  -e MONGODB_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \

  $MONGODB_IMAGE:$MONGODB_TAG