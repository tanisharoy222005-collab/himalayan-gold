import { useState } from "react";
import { supabase } from "./supabaseClient";

function PaymentUpload() {

  const [orderId, setOrderId] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!orderId || !file) {
      setMessage("Please enter Order ID and upload file");
      return;
    }

    setUploading(true);
    setMessage("");

    try {

      // 1. Create file path in storage
      const filePath = `${orderId}/${Date.now()}-${file.name}`;

      // 2. Upload file to Supabase Storage
      const { error: uploadError } = await supabase
        .storage
        .from("payment-proofs")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Get public URL
      const { data } = supabase
        .storage
        .from("payment-proofs")
        .getPublicUrl(filePath);

      const imageUrl = data.publicUrl;

      // 4. Update order in database
      const { error: dbError } = await supabase
        .from("orders")
        .update({
          payment_screenshot: imageUrl,
          payment_status: "Pending Verification"
        })
        .eq("order_id", orderId);

      if (dbError) {
        throw dbError;
      }

      setMessage("Payment proof uploaded successfully!");
      setOrderId("");
      setFile(null);

    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Try again.");
    }

    setUploading(false);
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Upload Payment Proof</h1>

      <form onSubmit={handleUpload}>

        <input
          type="text"
          placeholder="Enter Order ID (e.g. HG123456789)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
          style={{ display: "block", marginBottom: "10px" }}
        />

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Payment Proof"}
        </button>

      </form>

      {message && (
        <p style={{ marginTop: "15px" }}>
          {message}
        </p>
      )}

    </div>
  );
}

export default PaymentUpload;