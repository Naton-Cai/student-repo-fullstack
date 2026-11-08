# HW3

This project includes a countries app and a local library web app built with Express.

## Getting Started

Install the dependencies:

```bash
cd .\express-locallibrary-tutorial\ 
npm install
```

```bash
cd .\countries-app\
npm install
```
To start each app.
```bash
npm run start
```

## Apps
- **Countries app:** browse country information.
- **Express local library:** browse the library catalog.

## Notes
- Express local library makes uses of a local mongodb database that will require setup.
- To change goes to \express-locallibrary-tutorial\www and change `const mongoDB = "mongodb://localhost:27017/local_library";` to your mongodb url