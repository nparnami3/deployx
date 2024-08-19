import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import "@fontsource/new-rocker"; // Decorative font for heading
import "@fontsource/overpass"; // Sans-serif font for other text

const BACKEND_UPLOAD_URL = "http://localhost:3000";

export function Landing() {
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deployed, setDeployed] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4" style={{ backgroundColor: "#D8125B" }}>
      <h1 className="text-white text-7xl mb-8" style={{ fontFamily: "'New Rocker', cursive", textAlign: 'center' }}>
        DEPLOYX
      </h1>

      <Card className="w-full max-w-md" style={{ backgroundColor: "#2C2E39", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <CardHeader>
          <CardTitle className="text-2xl" style={{ color: "#FFFFFF", fontFamily: "'Overpass', sans-serif" }}>Deploy your GitHub Repository</CardTitle>
          <CardDescription style={{ color: "#C0C0C0" }}>Enter the URL of your GitHub repository to deploy it</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-url" style={{ color: "#FFFFFF" }}>GitHub Repository URL</Label>
              <Input 
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                }} 
                placeholder="https://github.com/username/repo" 
                style={{ backgroundColor: "#3A3B45", color: "#FFFFFF", borderColor: "#555770" }}
              />
            </div>
            <Button 
              onClick={async () => {
                setUploading(true);
                const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
                  repoUrl: repoUrl
                });
                setUploadId(res.data.id);
                setUploading(false);
                const interval = setInterval(async () => {
                  const response = await axios.get(`${BACKEND_UPLOAD_URL}/status?id=${res.data.id}`);

                  if (response.data.status === "deployed") {
                    clearInterval(interval);
                    setDeployed(true);
                  }
                }, 3000)
              }} 
              disabled={uploadId !== "" || uploading} 
              className="w-full text-white" 
              type="submit"
              style={{ backgroundColor: "#D8125B", color: "#FFFFF" }}
            >
              {uploadId ? `Deploying (${uploadId})` : uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {deployed && <Card className="w-full max-w-md mt-8" style={{ backgroundColor: "#2C2E39", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <CardHeader>
          <CardTitle className="text-xl" style={{ color: "#FFFFFF", fontFamily: "'Overpass', sans-serif" }}>Deployment Status</CardTitle>
          <CardDescription style={{ color: "#C0C0C0" }}>Your website is successfully deployed!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="deployed-url" style={{ color: "#FFFFFF" }}>Deployed URL</Label>
            <Input 
              id="deployed-url" 
              readOnly 
              type="url" 
              value={`http://${uploadId}.dev.deployx.com:3001/index.html`} 
              style={{ backgroundColor: "#3A3B45", color: "#FFFFFF", borderColor: "#555770" }} 
            />
          </div>
          <br />
          <Button className="w-full" variant="outline" style={{ backgroundColor: "#FFFFF", color: "#D8125B" }}>
            <a href={`http://${uploadId}.deployx.com/index.html`} target="_blank">
              Visit Website
            </a>
          </Button>
        </CardContent>
      </Card>}
    </main>
  );
}