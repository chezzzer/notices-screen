import KamarNotices from "kamar-notices";

export default async function handler(req, res) {
  const notices = new KamarNotices("https://kamar.camhigh.school.nz");
  res.status(200).json(await notices.getNotices());
}
