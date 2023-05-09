#!/bin/bash

docker build -t data-mining .
docker run -p 3000:3000 data-mining

