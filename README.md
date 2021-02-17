# CSV Discrepancy Tool
Aim of this application is find the discrepancies in two or more csv files.
This application consists of frontend and backend. Users upload csv files from the frontend and those csv files are processed on backend and result sent back to frontend.

Frontend was implemented in Angular 11.
Backend was implemented in Node 12.
## To setup and run
### Technical requirements
To run this application the following setup is basically required:

1. Node v12.16.3
2. npm 6.14.11
3. Angular CLI 12.16.3

### Frontend
1. To run the frontend goto compare-files-ui

```json
cd compare-files-ui
```
2. Now fetch all the dependencies using
```json
npm install
```
3. Once dependencies are downloaded, to run the application
```json
ng serve --open
```
this will open the browser at http://localhost:4200. You can also click on this to open the browser window.

### Backend

1. To run the frontend goto compare-files-backend

```json
cd compare-files-backend
```
2. Now fetch all the dependencies using
```json
npm install
```
3. Once dependencies are downloaded, to run the application
```json
npm run start
```

### Running
- Frontend and backend communicate via REST endpoint.
- Currently backend has only one REST endpoint `/upload`.
- This application works for more than two csv files comparison.
- Frontend has the option to drag and drop files or browse for files.
- To reset the file selection window and also result section click on reset button.
- Once files are dropped onto the dropzone it will list all the selected files, but more files can be added by drag and drop and existing list can be removed from list of uploads.
- In both drag and drop and browse options frontend ignores non-csv files.
- A concern parameter can be selected to list the discrepancies related to that field.
- Once the upload list is ready those files can be uploaded to backend by clicking on `upload` button.
- Backend also does perform file filter to ignore non-csv files.
- Backend doesn't persists csv files anywhere, at runtime it finds the discrepancies and report.
- Backend also have some checks to validate at least two files are provided.

### Images
![Before running](https://github.com/sureshappana/CSV-Discrepancy-Tool/blob/master/images/image1.png)
![After running](https://github.com/sureshappana/CSV-Discrepancy-Tool/blob/master/images/image2.png)
## Checks and Testing
1. Linting in place to follow the consistent pattern across the repository.
2. Unit testing in place to verify the implementation.

### Frontend
Unit testcases in fronend can be run as:
```json
ng test
```
Karma will open a new browser window and run the test cases

### Backed
Unit testcases in backend can be run as:
```json
npm run test
```
Mocha is used in backend for unit testing

## Assumptions
1. CSV Files contains 3 columns in the same order.
2. Columns are email address, YouTube Channel and Subscriber Count
3. Email addresses are reliable among the csv files and they exists in the same order.

## What else can be done?
1. More test cases can be added to frontend other than existing
2. Integration test cases also can be added to verify backend service is available or not.
3. It can be further extended by generating test coverage reports and generating code coverage.
4. REST layer in backend can be more strengthened by authentication layer and strict config checks using convict or related.
5. More generalization can be added to the application to work for non matching email count, columns not in same order and also to work for more than 2 columns. 
5. Docker files can be created to containarize the application.
