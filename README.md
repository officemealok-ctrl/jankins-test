# Jenkins Docker Pipeline Test Application

A complete, production-ready Node.js web application designed to demonstrate and test a continuous integration and continuous deployment (CI/CD) pipeline using **Jenkins**, **Docker**, and **GitHub**.

---

## 📁 Repository Structure

```
.
├── package.json          # Node.js manifest and dependencies
├── src/
│   ├── app.js            # Express routes and dynamic dashboard
│   └── server.js         # HTTP server entry point
├── tests/
│   └── app.test.js       # Automated Jest unit & endpoint integration tests
├── Dockerfile            # Multi-stage production container build definition
├── Jenkinsfile           # Declarative Jenkins CI/CD pipeline definition
├── .gitignore            # Git exclusion rules
└── .dockerignore         # Docker context exclusion rules
```

---

## 🚀 Step 1: Push Code to GitHub Repository

Your target GitHub Repository: **`https://github.com/officemealok-ctrl/jankins-test`**

Run the following commands in your terminal to initialize git and push the files to GitHub:

```bash
# 1. Initialize git repository
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "feat: setup node.js app, jest tests, dockerfile and jenkinsfile"

# 4. Set main branch
git branch -M main

# 5. Link remote repository
git remote add origin https://github.com/officemealok-ctrl/jankins-test.git

# 6. Push to GitHub
git push -u origin main --force
```

---

## ⚙️ Step 2: Configure Jenkins Pipeline

Your Jenkins Server URL: **`http://35.154.117.52:8080/`**

### Prerequisites on Jenkins Server:
1. Ensure the following **Plugins** are installed (Go to `Manage Jenkins` -> `Plugins` -> `Available plugins`):
   - **Pipeline**
   - **Git**
   - **Docker Pipeline** / **Docker**
2. Ensure Docker engine is installed on your Jenkins host and the `jenkins` user has Docker execution privileges:
   ```bash
   sudo usermod -aG docker jenkins
   sudo systemctl restart jenkins
   ```

### Creating the Jenkins Pipeline Job:
1. Open Jenkins dashboard at `http://35.154.117.52:8080/`
2. Click **New Item** on the left menu.
3. Enter item name (e.g., `jenkins-docker-test-app`).
4. Select **Pipeline** and click **OK**.
5. Under **Build Triggers**, check **GitHub hook trigger for GITScm polling** (enables automatic builds on `git push`).
6. Scroll down to **Pipeline**:
   - **Definition**: Select `Pipeline script from SCM`
   - **SCM**: Select `Git`
   - **Repository URL**: `https://github.com/officemealok-ctrl/jankins-test.git`
   - **Branch Specifier**: `*/main`
   - **Script Path**: `Jenkinsfile`
7. Click **Save**.
8. Click **Build Now** to perform your first manual pipeline execution!

---

## 🔗 Step 3: Setup GitHub Webhook (Automatic Builds on Git Push)

To make Jenkins automatically trigger a build whenever you push code changes to GitHub:

1. Open your repository on GitHub: `https://github.com/officemealok-ctrl/jankins-test`
2. Go to **Settings** -> **Webhooks** -> **Add webhook**.
3. Set **Payload URL**: `http://35.154.117.52:8080/github-webhook/` *(Note trailing slash)*.
4. Set **Content type**: `application/json`.
5. Leave Secret blank (unless configured in Jenkins).
6. Under "Which events would you like to trigger this webhook?", select **Just the push event**.
7. Click **Add webhook**.

---

## 🐳 Step 4: Testing & Building Container Locally (Optional)

### Using Docker:
```bash
# Build Docker image
docker build -t jenkins-test-app .

# Run container on port 3000
docker run -p 3000:3000 jenkins-test-app

# Test Health Endpoint
curl http://localhost:3000/api/health
```

---

## 🔄 Optional: Enable Docker Hub Registry Push Stage

If you want Jenkins to push the built container image to Docker Hub:

1. In Jenkins (`http://35.154.117.52:8080/`), navigate to `Manage Jenkins` -> `Credentials` -> `System` -> `Global credentials`.
2. Add `Username with password` credential:
   - **ID**: `docker-hub-credentials`
   - **Username**: Your Docker Hub username
   - **Password**: Your Docker Hub Personal Access Token / password
3. Uncomment the `Push Image to Registry` stage in [`Jenkinsfile`](file:///d:/OneDrive%20-%20SAPPHIRE%20TECHNOCRATS%20PRIVATE%20LIMITED/Desktop/Test-Application/Jenkinsfile).
