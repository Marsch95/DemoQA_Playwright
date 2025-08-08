pipeline {
    agent any
    environment {
        // Set up Node.js version if needed
        NODE_VERSION = '20'
    }
    stages {
        stage('Checkout') {
            steps {
                // Clone the GitHub repo
                git branch: 'main', url: 'https://github.com/Marsch95/DemoQA_Playwright.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install Node.js if not present (requires Jenkins NodeJS plugin)
                // nodejs(NODE_VERSION)
                // Install npm dependencies
                sh 'npm ci'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                // Download Playwright browser binaries
                sh 'npx playwright install'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                // Run Playwright tests
                sh 'npx playwright test'
            }
        }
        stage('Archive Test Report') {
            steps {
                // Archive Playwright HTML report
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }
    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
    }
}
