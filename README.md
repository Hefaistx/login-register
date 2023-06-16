# Calowry - Cloud Computing Team
___

**Team Members :**

- Nabil Ilyasa - c200dkx4573@bangkit.academy
- Mila Sari Rusadi -  c279dky4669@bangkit.academy

computing team working together to take advantage of cloud technology. We include a cloud architect explaining about cloud infrastructure.
Cloud Computing team is responsible for:
- Backend Developer for designing and implementing the server-side logic and APIs required for the apps :
1.Made login login API to do the user registration.
2.Made user login API.
3.Madee API time for charts. 
- Provide ongoing monitoring, maintenance, and support for the app in the cloud environment. 
We use Express framework, Typescript, and Sequelize for ORM.

# API USE GUIDE

ENDPOINT:
https://calowry.et.r.appspot.com/

//USER
REGISTER
•	URL		: /user/signup
•	Method		: Post
•	Req Body	: 
-	name: as string
-	email: as string, must be unique 
-	password: as string, min 8 chars
-	confirmPassword: must be same as password
xxx
LOGIN
•	URL		: /user/login 
•	Method		: POST
•	Req Body	: 
-	name: as string
-	password: as string
xxx
LOGOUT
•	URL		: /user/logout
•	Method		: GET 
•	Headers	: Authorization Bearer <token>
xxx
CURRENT USER DETAIL
•	URL		: /user/current-user
•	Method		: GET
•	Headers	: Authorization Bearer <token>
xxx
REFRESH TOKEN
•	URL		: /user/refresh-token
•	Method		: GET
•	Headers	: Authorization Bearer <token>
xxx
UPDATE USER
•	URL		: /user/:id
•	Method		: POST
•	Req Body	: 
-	name: as string
-	password: as string, min 8 chars
•	Headers	: Authorization Bearer <token>
xxx
UPDATE ADDITIONAL INFO (AGE. HEIGHT, WEIGHT)
•	URL		: /user/:id/additional-info
•	Method		: POST
•	Req Body	:
-	age: as integer
-	height: as integer
-	weight: as integer
NB: Value age, height, weight otomatis 0 saat user berhasil register. Tiga data ini masuk ke table Users.


//USER INTAKE

CREATE
•	URL		: /user-intake
•	Method	: POST
•	Req Body	: 
-	userId: as integer, User’s ID
-	carbohydrates: as integer
-	sugar: as integer
-	proteins: as integer
-	fat: as integer
xxx
UPDATE
•	URL		: /user-intake/:id
•	Method	: PUT
•	Req Body	: 
-	userId: as integer, User’s ID
-	carbohydrates: as integer
-	sugar: as integer
-	proteins: as integer
-	fat: as integer
xxx
GET BY ID
•	URL		: /user-intake/:id
•	Method	: GET

GET BY USER ID
•	URL		: /user-intake/user/:userId
•	Method	: GET

# CC DEVELOPMENT STEPS

After testing on the local server, we upload the source code to the server. We use Cloud SQL and Cloud Storage.
Here are our steps in working on this application:
1. Create a project in GCP
2. Configure IAM and Admin to give permission to other member, whole of cc team got the owner role.
3. Setting up an account for billing, up to now we're still using the 50$ credit and save the 150$ on other account.
4. Create an API for login register
5. Deploy cloud functions for OCR and some relevant buckets and pubsubs.
6. Using postman for the API testing. 

# CP
Kindly check it using the API GUIDE above, thanks.
Do contact here if there's something wrong with the API or anything:
nabililyasa2002@gmail.com