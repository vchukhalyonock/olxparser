#/bin/sh

echo "Build and Deploy Frontend"

echo "Build...."
npm run build

echo "Archiving...."
tar zcfv frontend_build.tgz build/

echo "Move to Remote....."
scp -P 4422 -i ~/.ssh/id_rsa frontend_build.tgz adm-14@46.149.86.128:~/

echo "Remove local arch....."
rm frontend_build.tgz

echo "Extract and copy on remote...."
ssh adm-14@46.149.86.128 -p 4422  'cd ~ && tar xvfz frontend_build.tgz && cp -r build/* /var/www/html && rm -rf build'

 echo "Finished"
