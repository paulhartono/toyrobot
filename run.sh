#!/bin/bash -x
env_file=$1

docker build -t phartono:toyrobot .

docker run --rm -it --name phartono_toyrobot --env-file=${env_file} phartono:toyrobot