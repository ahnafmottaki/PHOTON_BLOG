import fs from "fs";
const writeToFile = <T, Y extends (...x: any[]) => any>(
  path: string,
  data: T,
  cb: Y
) => {
  fs.writeFile(path, JSON.stringify(data), (error) => {
    if (error) {
      throw new Error("Error Writing File");
    }
    cb();
  });
};

export default writeToFile;
