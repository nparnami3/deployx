import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { FaGithub } from "react-icons/fa"; // GitHub icon
import logo from '@/assets/logo.png'; // Path to your logo image
import heroImage from '@/assets/hero-image.png'; // Path to your hero image

const BACKEND_UPLOAD_URL = "http://localhost:3000";

export function Landing() {
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deployed, setDeployed] = useState(false);

  return (
    <main 
      className="flex flex-col items-center  min-h-screen py-3 px-4"
      style={{ 
        background: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(67,67,67,0.8)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: "#FFFFFF",
        textAlign: 'center'
      }}
    >
      <div className="w-full max-w py-4 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img 
            src={logo} 
            alt="DeployX Logo" 
            className="w-16 h-10 rounded-full" // Logo with round shape
          />
          <h1 
            className="text-white text-4xl font-bold"
            style={{ fontFamily: "'Overpass', sans-serif" }}
          >
            DEPLOYX
          </h1>
        </div>
        <a 
          href="https://github.com/your-repo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded hover:bg-gray-700 transition-colors"
        >
          <FaGithub size={32} color="#FFFFFF" />
        </a>
      </div>

      <div className="w-full max-w-4xl py-16 px-4">
        <Card 
          className="w-full max-w-md mx-auto"
          style={{ 
            backgroundColor: "#2C2E39", // Dark grey background
            borderRadius: "10px", 
            padding: "20px", 
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginBottom: '20px'
          }}
        >
          <CardHeader>
            <CardTitle 
              className="text-2xl font-semibold" 
              style={{ color: "#FFFFFF", fontFamily: "'Overpass', sans-serif" }} // White text
            >
              Deploy your GitHub Repository
            </CardTitle>
            <CardDescription style={{ color: "#C0C0C0" }}> 
              Enter the URL of your GitHub repository to deploy it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="github-url" className="text-xl" style={{ color: "#FFFFFF" }}> 
                  GitHub Repository URL
                </Label>
                <Input 
                  onChange={(e) => setRepoUrl(e.target.value)} 
                  placeholder="https://github.com/username/repo" 
                  style={{ 
                    backgroundColor: "#555770", // Grey input background
                    color: "#FFFFFF", // White text in input
                    borderColor: "#AAAAAA" // Light grey border
                  }}
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
                className="w-full" 
                type="submit"
                style={{ 
                  backgroundColor: "#FFA500", // Orange button
                  color: "#000000", // Black button text
                  fontWeight: 'bold'
                }}
              >
                {uploadId ? `Deploying (${uploadId})` : uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {deployed && 
          <Card 
            className="w-full max-w-md mx-auto"
            style={{ 
              backgroundColor: "#2C2E39", // Dark grey background
              borderRadius: "10px", 
              padding: "20px", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
            }}
          >
            <CardHeader>
              <CardTitle 
                className="text-xl font-semibold" 
                style={{ color: "#FFFFFF", fontFamily: "'Overpass', sans-serif" }} // White text
              >
                Deployment Status
              </CardTitle>
              <CardDescription style={{ color: "#C0C0C0" }}> 
                Your website is successfully deployed!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="deployed-url" style={{ color: "#FFFFFF" }}> 
                  Deployed URL
                </Label>
                <Input 
                  id="deployed-url" 
                  readOnly 
                  type="url" 
                  value={`http://${uploadId}.dev.deployx.com:3001/index.html`} 
                  style={{ 
                    backgroundColor: "#555770", // Grey input background
                    color: "#FFFFFF", // White text in input
                    borderColor: "#AAAAAA" // Light grey border
                  }} 
                />
              </div>
              <br />
              <Button 
                className="w-full" 
                variant="outline" 
                style={{ 
                  backgroundColor: "#FFA500", // Orange button
                  color: "#000000" // Black button text
                }}
              >
                <a href={`http://${uploadId}.deployx.com/index.html`} target="_blank" style={{ color: "#000000" }}>
                  Visit Website
                </a>
              </Button>
            </CardContent>
          </Card>
        }
      </div>
    </main>
  );
}