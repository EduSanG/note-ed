cd frontend
echo "Building frontend application"
rm -r dist
npm install
npm run build

cd ..
echo "Moving output to backend server"
rm -r backend/src/main/resources/static
mkdir backend/src/main/resources/static
mv -v frontend/dist/* backend/src/main/resources/static

cd backend
echo "Building backend server"
./mvnw clean install
echo "Running application"
./mvnw spring-boot:run