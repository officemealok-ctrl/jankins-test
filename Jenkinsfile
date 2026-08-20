pipeline {
    agent any

    environment {
        APP_NAME = 'jenkins-test-app'
        IMAGE_NAME = "officemealok/${APP_NAME}"
        IMAGE_TAG = "${BUILD_NUMBER}"
        CONTAINER_TEST_PORT = "3001"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Executing Jest automated unit tests...'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG}..."
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Test Container Runtime') {
            steps {
                echo 'Running integration test on container runtime...'
                sh """
                    docker stop ${APP_NAME}-test || true
                    docker rm ${APP_NAME}-test || true
                    docker run -d --name ${APP_NAME}-test -p ${CONTAINER_TEST_PORT}:3000 ${IMAGE_NAME}:${IMAGE_TAG}
                    sleep 5
                    curl --fail http://localhost:${CONTAINER_TEST_PORT}/api/health || exit 1
                    docker stop ${APP_NAME}-test
                    docker rm ${APP_NAME}-test
                """
            }
        }

        /* 
        // Optional Stage: Push to Docker Hub / Registry
        // Requires Docker Hub credentials with ID 'docker-hub-credentials' configured in Jenkins
        stage('Push Image to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USER --password-stdin"
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }
        */
    }

    post {
        always {
            echo 'Cleaning up build artifacts...'
            sh 'docker container prune -f || true'
        }
        success {
            echo "Pipeline completed successfully! Build #${BUILD_NUMBER} is green."
        }
        failure {
            echo "Pipeline failed on Build #${BUILD_NUMBER}. Check logs above."
        }
    }
}
