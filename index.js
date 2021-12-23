const fs = require("fs");
const path = require("path");
// const args = require("minimist")(process.argv.slice(2));
// var dist_dir = path.resolve(process.cwd(), args["path"]);
var dist_dir = path.resolve(__dirname, "./photos");
console.log(dist_dir);
// const webPath = args["deploy_url"] || `/conlcps/v2`;
var getCssAndJsArr = async function (dist_dir, callback) {
  const arr = [];
  try {
    const files = await fs.readdirSync(dist_dir);
    const promise = new Promise(function (resolve, reject) {
      let i = 0;
      let version = new Date().getTime();
      files.forEach(async function (file) {
        console.log(file);
        i++;
        const info = file.split(".");
        const name = info[1];
        arr.push({
          id: i,
          photo: `../photos/${file}?v=${version}`,
          // thum: `../photos/${file}?v=${version}`,
          name: name,
        });
      });
      resolve();
      //   setTimeout(resolve,500)
    });
    promise.then(
      function () {
        callback(null, arr);
      },
      function (err) {
        callback(err, null);
      }
    );
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
};
getCssAndJsArr(dist_dir, async function (err, res) {
  if (err !== null) {
    console.error(err);
    return;
  }
  console.log(res);
  try {
    let jsStr = `var member = ${JSON.stringify(res, null, "\t")}`;
    await fs.writeFileSync(path.resolve(__dirname, "./") + "/member.js", jsStr);
  } catch (err) {
    console.error(err);
  }

  //   console.log(err, res)
});
