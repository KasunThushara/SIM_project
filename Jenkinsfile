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
                sh 'mvn clean package -DskipTests'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t your-dockerhub-username/student-info-system:latest .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                sh '''
                    docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW
                    docker push your-dockerhub-username/student-info-system:latest
                '''
            }
        }
    }
}
