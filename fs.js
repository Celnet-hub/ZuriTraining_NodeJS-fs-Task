const http = require("http");
const path = require("path");
const fs = require("fs");

let url = "http://jsonplaceholder.typicode.com/posts";

http.get(url, (res) => {
		let posts = "";
		res.on("data", (HugeChunks) => {
			posts += HugeChunks;
		});
		res.on("end", () => {
			try {
				let json = JSON.stringify(posts, null , 4);
				let pathToResult = path.join(__dirname, './result', "posts.json");
				fs.writeFile(pathToResult, json, (err) => {
					if (err) {
						console.log(err);
					} else {
						console.log(`Post has been written to ${pathToResult}`);
					}
				});
			} catch (err) {
				console.log(err);
			}
		});
	}).on("error", (err) => {
		console.log(err);
	});
