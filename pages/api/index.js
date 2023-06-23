

export default async function handler(_req, res){
  try {
    const hello = "hello world"
    res.status(200).json(minifiedRecords);
  } catch (error) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};