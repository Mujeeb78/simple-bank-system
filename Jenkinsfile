def imagename = "mujeeb98/simple-banking"
def dockerImage = ''

node {
    def sonarScanner = tool name: 'forSonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    stage('Cloning Git') {
        git(url: 'https://github.com/Mujeeb78/simple-bank-system.git', branch: 'master')
    }
    stage('Build Project') {
        sh "npm install"
    }
    stage("Test") {
        sh "npm run test"
    }
    stage('SonarQube Analysis'){
          withSonarQubeEnv(credentialsId: 'sonarCred') {
           sh "${sonarScanner}/bin/sonar-scanner -Dsonar.projectKey=simple-bank-system -Dsonar.sources=."
            } 
    }
 
    stage('Building image') {
        script {
          dockerImage = docker.build imagename
      }
    }
    stage('Deploy Image') {
          withCredentials([usernamePassword(credentialsId: 'DocCred', passwordVariable: 'DocCredPassword', usernameVariable: 'DocCredUser')]) {
            sh "docker login -u ${env.DocCredUser} -p ${env.DocCredPassword}"
            sh 'docker push mujeeb98/simple-banking:latest'
      }
    }
    node('Kubes') {
        stage('Run App') {
            sh """
                kubectl get pods
                docker pull mujeeb98/simple-banking
                docker images
            """
        }
    }
}
