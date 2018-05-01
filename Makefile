init: create-network

create-network:
	docker network create -d bridge users-network
