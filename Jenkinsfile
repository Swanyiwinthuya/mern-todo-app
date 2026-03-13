pipeline {
    agent any

    environment {
        IMAGE_REPO = 'swanyi/finead-todo-app'
        IMAGE_TAG  = 'latest'
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('TODO/todo_backend') {
                    sh 'npm install'
                }

                dir('TODO/todo_frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }

                sh '''
                    rm -rf TODO/todo_backend/static
                    mkdir -p TODO/todo_backend/static
                    cp -r TODO/todo_frontend/build TODO/todo_backend/static/
                '''
            }
        }

        stage('Containerise') {
            steps {
                sh 'docker build -t ${IMAGE_REPO}:${IMAGE_TAG} .'
            }
        }

        stage('Push') {
            steps {
                sh '''
                    echo "$DOCKERHUB_CREDS_PSW" | docker login -u "$DOCKERHUB_CREDS_USR" --password-stdin
                    docker push ${IMAGE_REPO}:${IMAGE_TAG}
                    docker logout
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}