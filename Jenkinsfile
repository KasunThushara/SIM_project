pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('d98d2e12-3c0b-4a28-93c2-4930cc3515e3') // Docker Hub credentials ID
        DOCKER_IMAGE_NAME = 'kasun594/student-info-system'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/KasunThushara/SIM_project.git'
            }
        }
        stage('Build Application') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE_NAME}:latest .'
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                        sh 'docker push ${DOCKER_IMAGE_NAME}:latest'
                    }
                }
            }
        }
        stage('Deploy Services') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs.'
        }
    }
}
