pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('d98d2e12-3c0b-4a28-93c2-4930cc3515e3') // Docker Hub credentials ID
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/KasunThushara/SIM_project.git'
            }
        }
        stage('Build Application') {
            steps {
                echo 'Building the application...'
                bat 'mvn clean package -DskipTests'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t kasun594/student-info-system:latest .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                bat """
                    docker login -u %DOCKERHUB_CREDENTIALS_USR% -p %DOCKERHUB_CREDENTIALS_PSW%
                    docker push kasun594/student-info-system:latest
                """
            }
        }
    }
}
