import { table, getMinifiedRecords, minifyRecord } from "../../utils/airtable";

export default async function handler(_req, res) => {
  try {
    const records = await table.select({}).all();
    const minifiedRecords = await getMinifiedRecords(records);
    res.status(200).json(minifiedRecords);
  } catch (error) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};