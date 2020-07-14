yarn install &&
# yarn test:unit &&
yarn run build:test &&
# scp -r deploy/nginx/nginx.test.conf wyme@hongkong:/home/wyme/project/hunsha_ui &&
scp -r dist wynode@nanjing:/home/wynode/project/hunsha_ui
scp -r deploy/nginx/nginx.my.conf wynode@nanjing:/home/wynode/project/hunsha_ui
