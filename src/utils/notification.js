const admin = require('firebase-admin');
const serviceAccount = require('../../pushnotification-c067b-firebase-adminsdk-vqd0z-443b6fe901.json');

/**
 * notification accident
 */
const notificationAccident = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "dB_URL"
    });
  }
  admin.messaging().send({
    token: token,
    data: {
      customData:"Denemee",
      id: "1",
      ad:"Accident",
      subTitle:"Got into an accident and need your help"
    },
    android: {
      notification: {
        body: "Got into an accident and need your help",
        title:"Accident",
        color:"#fff566",
        priority:"high",
        sound:"default",
        vibrateTimingsMillis:[200,500,800],
        imageUrl:"https://cdn-icons-png.flaticon.com/512/2125/2125190.png",
      }
    }
  }).then((msg) => {
    console.log(msg);
  })
}

/**
 * notification success accident
 */
const notificationAccidentSuccess = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  admin.messaging().send({
    token: token,
    data: {
      customData:"Helper",
      id: "2",
      ad:"Helper",
      subTitle:"Request for help has been resolved"
    },
    android: {
      notification: {
        body: "Request for help has been resolved",
        title:"Helper",
        color:"#fff566",
        priority:"high",
        sound:"default",
        vibrateTimingsMillis:[200,500,800],
        imageUrl:"https://cdn-icons-png.flaticon.com/512/2300/2300379.png",
      }
    }
  }).then((msg) => {
    console.log(msg);
  })
}

module.exports = {
  notificationAccident,
  notificationAccidentSuccess
};
