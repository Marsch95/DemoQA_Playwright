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
        stage('Install Playwright Dependencies') {
            steps {
                // Install required system dependencies for Playwright browsers
                sh 'npx playwright install-deps'
            }
        }

        stage('Lint Code') {
            steps {
                // Run ESLint on the project and store results in HTML file
                sh 'npx eslint . -f html -o eslint-report.html || true'
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
                // Archive Playwright HTML report and ESLint report
                archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'eslint-report.html', allowEmptyArchive: true
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
