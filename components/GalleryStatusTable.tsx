import { getDatabaseService } from "@/utils/db_handler";

export const GalleryStatusTable = async () => {
  const db = await getDatabaseService();
  const sampleData = await db.query(
    "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?",
    ["gallery_monitoring"]
  );
  console.log(sampleData);

  return (
    <>
      <h1>GalleryStatusTable</h1>
      <div></div>
    </>
  );
};

export default GalleryStatusTable;
