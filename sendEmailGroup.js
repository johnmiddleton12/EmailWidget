// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;

const widget = new ListWidget();

// new comment

// const messageText = widget.addText("Send Email to da bluesmen");
// messageText.textColor = Color.white();
// messageText.font = new Font("Helvetica-Light ", 25);

const imgUrl = "https://wasilikme.github.io/images/midnightbluesmentemp.png";
const imgReq = new Request(imgUrl);
imgReq.method = "GET";
const imgRes = await imgReq.loadImage();
logo = widget.addImage(imgRes);
logo.centerAlignImage();
// logo.imageSize = new Size(130, 130);

if (config.runsInWidget) {
    Script.setWidget(widget);
    Script.complete();
} else if (config.runsInApp) {
    const baseUri =
        "https://textwidget-1acfa-default-rtdb.firebaseio.com/emails.json";
    const req = new Request(`${baseUri}`);
    req.method = "GET";

    const res = await req.loadJSON();

    emails = [];

    for (let i = 0; i < Object.keys(res).length; ++i) {
        let address = res[Object.keys(res)[i]]["email"];
        if (address != null && address != "unsubscribed") {
            emails.push(res[Object.keys(res)[i]]["email"]);
        }
    }

    console.log(emails);
    mail = new Mail();
    mail.bccRecipients = emails;
    mail.prefferedEmailSendingAddress = "midnightbluesmen@gmail.com";
    mail.subject = "Midnight Bluesmen Newsletter";
    mail.body = "Hello everyone,";
    try {
        await mail.send();
    }
    catch (error) {
        console.log("email not sent");
    }
    Script.setWidget(widget);
    Script.complete();
}
