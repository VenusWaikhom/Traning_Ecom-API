const { default: axios } = require("axios");

const pushMessage = async (clientToken, title, body, data) => {
  let res = await axios({
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      "Content-Type": "application/json",
      Authorization: [
        "key",
        "AAAAzsEDZfs:APA91bHG2Pyfvsz11viY4ouqaoi5rOAutxL4Pi3S1wTbARo18PAOC61TFcbgTYZIZlhOVSwfen3iUmUcFtioyrnT_C6UuxXPrG4krWe2FGQfvT7ez2aUnWGZfMAJx5bKgN7jhrYUoweu",
      ].join("="),
    },
    data: {
      to: clientToken,
      notification: {
        title: title,
        body: body,
      },
    },
  });
  console.log(res.data, "HERE");
};

module.exports = pushMessage;
