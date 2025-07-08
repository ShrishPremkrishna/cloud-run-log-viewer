# Cloud Run Log Viewer

A real-time log viewer for Google Cloud Run services with WebSocket support for reliable streaming.

## Features

- 🔄 Real-time log streaming via WebSocket
- 🎨 Modern UI with Tailwind CSS
- 🔍 Log filtering by severity and search text
- 📱 Responsive design
- ☁️ Cloud Run optimized deployment

## Quick Deploy

The deployment script now includes automatic authentication checks:

```bash
./deploy.sh
```

The script will:
- ✅ Verify Google Cloud authentication
- ✅ Configure Docker for Container Registry
- ✅ Verify project access
- ✅ Build and deploy to Cloud Run

## Manual Setup

If you need to set up authentication manually:

```bash
# Login to Google Cloud
gcloud auth login

# Configure Docker for Container Registry
gcloud auth configure-docker

# Set your project ID
export GCP_PROJECT_ID="your-project-id"
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Architecture

- **Backend**: Node.js with Express and WebSocket server
- **Frontend**: React with Tailwind CSS
- **Real-time**: WebSocket for reliable Cloud Run connections
- **Deployment**: Docker container on Cloud Run

## Environment Variables

- `GCP_PROJECT_ID`: Your Google Cloud project ID
- `GCP_CLOUD_RUN_SERVICE_NAME`: Target service name for logs
- `GCP_KEY_PATH`: Path to service account key file

## Troubleshooting

### Authentication Issues
The deploy script now automatically checks and configures authentication. If you encounter issues:

1. Run `gcloud auth login`
2. Run `gcloud auth configure-docker`
3. Verify project access with `gcloud projects describe YOUR_PROJECT_ID`

### Connection Issues
- Ensure Cloud Run service has `--min-instances 1` to keep connections alive
- WebSocket connections are more reliable than SSE on Cloud Run
- Check that your service account has proper logging permissions
