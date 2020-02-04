#!/bin/sh

echo "Build and Deploy Backend"

echo "Build...."
npm run build
cp package.json dist/
cp package-lock.json dist/
cp -r node_modules dist/

echo "Archiving...."
tar zcfv backend_build.tgz dist/ package.json

echo "Move to Remote....."
scp -P 4422 -i ~/.ssh/id_rsa backend_build.tgz adm-14@46.149.86.128:~/

echo "Remove local arch....."
rm backend_build.tgz

echo "Extract and run on remote...."
ssh adm-14@46.149.86.128 -p 4422  'cd ~ && tar xvfz backend_build.tgz && pm2 restart dist/index'

echo "Finished"
