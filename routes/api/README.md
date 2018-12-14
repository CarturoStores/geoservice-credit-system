# MapAnything Geocoding Services

## Node.js Technical Assessment

What you need to know before run:
+ You need to authenticate your platform with a new  Bearer `token` passed as `Authentication` header from Postman and exe it.

Objectives
### 1. Create a REST API that has 2 services
#### a. Service 1
##### i. ~~Uses Google’s Geocoding Web Service~~
##### ii. Input Parameters
+ 1. ~~Address~~
+ 2. ~~Token~~ (for credits)
##### iii. Output(s)
+ 1. ~~Return Google’s response~~
##### iv. (Advanced) Uses 1 credit per call
#### b. Service 2
##### i. ~~Uses Google’s Timezone Web Service~~
##### ii. Input Parameters
+ 1. ~~Address~~ - this should geocode to get a valid latitude/longitude
+ 2. ~~Timestamp~~
+ 3. ~~Token~~ (for credits)
##### iii. Output(s)
+ 1. Return Google’s response
##### iv. (Advanced) Uses 2 credit per call

### 2. (Advanced) Build a credit system
#### a. Credit Plans
+ i. Plan 1 - 10 Credits / Month
+ ii. Plan 2 - 20 Credits / Month
+ iii. Plan 3 - 30 Credits / Month
#### b. Batch Services
+ i. Geocoding batch service that handles multiple addresses with a POST
body (i.e. 50 addresses get batched to Google 5 at a time).
