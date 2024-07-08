const xml2js = require("xml2js");

export default async function handler(req, res) {
  try {
    const postData = {
      aadhaarNumber: req.body.aadhaarNumber.replace(/ /g, ""),
      appId: 'HP_SDPRH_PROD',
      name: "Test",
      otp: req.body.otp,
      transactionId: req.body.tnxID,
    };

    const response = await fetch(
      "http://himparivarservices.hp.gov.in/ekyc_cdac/authenticate/authenticationKyc",
      {
        method: "POST",
        body: JSON.stringify(postData),
      }
    );

    const jsonData = await response.json();

    if (jsonData.STATUS === "OK") {
      const xmlData = jsonData.RESPONSE;

      const parser = new xml2js.Parser({ explicitArray: false });

      parser.parseString(xmlData, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Error parsing XML data" });
        } else {
          if (result.KycRes.$.err) {
            res.status(500).json({ error: "An error occurred" });
          } else {
            res
              .status(200)
              .json({ uidData: result.KycRes.UidData, vault: result.KycRes });
          }
        }
      });
    } else {
      res.status(500).json({ error: "An error occurred" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
