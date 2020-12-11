import users from "../data/users.js";


const delay = (ms) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });

  return promise;
};

const logger = (time) => console.log(`Resolved after ${time} ms`);


delay(1500).then(logger); 


const toggleUserState = (allUsers, userName) => {
  const promise = new Promise((resolve) => {
    const updatedUsers = allUsers.map((user) =>
      user.name === userName ? { ...user, active: !user.active } : user
    );
    resolve(updatedUsers);
  });

  return promise;
};

const secondLogger = (updatedUsers) => console.table(updatedUsers);


toggleUserState(users, "Lux").then(secondLogger);


const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
  const id = transaction.id;
  const time = randomIntegerFromInterval(200, 500);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const canProcess = Math.random() > 0.3;
      canProcess ? resolve({ id, time }) : reject(id);
    }, time);
  });

  return promise;
};

const logSuccess = ({ id, time }) => {
  console.log(`Transaction ${id} processed in ${time} ms`);
};

const logError = (id) => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);
makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);
makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);
makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);
