# 🌍 Terrasight

A comprehensive geospatial analysis platform for monitoring land cover changes and vegetation dynamics using satellite imagery. Terrasight leverages Google Earth Engine to analyze NDVI (Normalized Difference Vegetation Index) trends and detect environmental changes over time.

## 🎯 Features

- **Satellite Analysis**: Real-time NDVI analysis using Google Earth Engine API
- **Change Detection**: Identify and quantify land cover changes across custom areas of interest
- **Interactive Maps**: Draw custom regions and visualize analysis results with Leaflet
- **Analytics Dashboard**: View trends, statistics, and historical data
- **Report Generation**: Export detailed PDF reports with findings and visualizations
- **Admin Panel**: Manage and review all analysis results
- **Data Persistence**: MongoDB integration for storing analysis history

## 🛠 Tech Stack

### Backend
- **Framework**: Flask 3.0.2
- **Database**: MongoDB
- **Geospatial**: Google Earth Engine API
- **Reports**: ReportLab
- **Server**: Gunicorn
- **Language**: Python

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Mapping**: Leaflet & React-Leaflet
- **Drawing Tools**: React-Leaflet-Draw
- **Routing**: React Router 7
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Language**: JavaScript (JSX)

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- MongoDB (local or Atlas)
- Google Cloud Project with Earth Engine API enabled
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd terrasight
```

### 2. Backend Setup

```bash
cd terrasight-backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd ../terrasight-frontend

# Install dependencies
npm install
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `terrasight-backend` directory:

```env
MONGO_URI=mongodb://localhost:27017
FLASK_ENV=development
FLASK_DEBUG=True
```

**Environment Variables:**
- `MONGO_URI`: MongoDB connection string (use MongoDB Atlas for production)
- `FLASK_ENV`: Set to `production` for deployment
- `FLASK_DEBUG`: Enable debug mode during development

### Google Earth Engine Setup

1. Create a Google Cloud project
2. Enable the Earth Engine API
3. Authenticate locally:

```bash
earthengine authenticate
```

## 🏃 Running the Project

### Backend

```bash
cd terrasight-backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python app.py
```

The backend runs on `http://localhost:5000`

### Frontend

```bash
cd terrasight-frontend
npm run dev
```

The frontend runs on `http://localhost:5173`

### For Production

**Backend:**
```bash
gunicorn --bind 0.0.0.0:5000 app:app
```

**Frontend:**
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
terrasight/
├── terrasight-backend/
│   ├── app.py                 # Flask application & API routes
│   ├── gee_service.py         # Google Earth Engine utilities
│   ├── analytics.py           # Change detection algorithms
│   ├── report_service.py      # PDF report generation
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables (not in git)
│
├── terrasight-frontend/
│   ├── src/
│   │   ├── App.jsx            # Main application component
│   │   ├── main.jsx           # Application entry point
│   │   ├── components/        # Reusable React components
│   │   │   ├── MapComponent.jsx      # Interactive map
│   │   │   ├── AnalyticsPanel.jsx    # Analytics display
│   │   │   └── Navbar.jsx            # Navigation
│   │   ├── pages/             # Page components
│   │   │   ├── Dashboard.jsx         # Main dashboard
│   │   │   └── Admin.jsx             # Admin interface
│   │   ├── services/
│   │   │   └── api.js         # API client
│   │   └── assets/            # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── README.md
```

## 🔌 API Endpoints

### Analysis
- **POST** `/analyze` - Run NDVI analysis on a region
  - Request: `{ aoi: [[lng, lat], ...], start_year: number, end_year: number }`
  - Response: `{ yearly: [...], changes: {...} }`

### Reports
- **POST** `/report` - Generate PDF report
  - Request: Analysis result data
  - Response: PDF file

### Admin
- **GET** `/admin` - Retrieve all analysis records
  - Response: Array of stored analyses

## 📊 Analysis Workflow

1. **Draw Region**: User draws area of interest on the map
2. **Select Time Period**: Choose start and end years for analysis
3. **Process**: Backend queries Earth Engine NDVI data
4. **Detect Changes**: Analyze trends and identify significant changes
5. **Visualize**: Display results in interactive dashboard
6. **Export**: Generate and download detailed PDF report

## 🧪 Testing

### Linting
```bash
cd terrasight-frontend
npm run lint
```

### Build
```bash
cd terrasight-frontend
npm run build
```

## 🌐 Deployment

### Backend (Heroku, AWS, GCP, etc.)
1. Set environment variables in hosting platform
2. Deploy with Gunicorn
3. Ensure MongoDB is accessible from deployment region

### Frontend (Vercel, Netlify, GitHub Pages, etc.)
1. Build the project: `npm run build`
2. Deploy the `dist/` folder
3. Update API endpoint in `src/services/api.js` if needed

## 📝 License

[Add your license here - e.g., MIT, Apache 2.0, etc.]

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

## 🙏 Acknowledgments

- [Google Earth Engine](https://developers.google.com/earth-engine) for satellite data
- [Leaflet](https://leafletjs.com/) for mapping
- [React](https://react.dev/) for UI framework
- [MongoDB](https://www.mongodb.com/) for data storage
