buildAgentLabel = ""
makeAgentLabel = ""
deployAgentLabel = ""
baseAPIAddressPort = ""
envoyproxyAddressPort = ""

pipeline {
  agent none
//  triggers {
//    cron('5 21 * * *') 
//  }
  stages {
    stage('Prepare Branches') {
      parallel {
        stage('Prepare Release') {
          when { branch "release" }
          agent {
            label buildAgentLabel
          }
          steps {
              script {
                  buildAgentLabel = "angular-docker"
                  makeAgentLabel = "jenkins-docker-develop"
                  deployAgentLabel = "jenkins-docker-1-1-release"
                  baseAPIAddressPort = "192.168.50.126:9105"
                  envoyproxyAddressPort = "192.168.50.126:10000"
              }
              
          //   sh 'mkdir -p Module1'
          //  dir("Module1"){
          //    git url: "http://192.168.0.146/aiotv1.1/longchuang-front-vue/longchuang-front-base-vue.git",
          //      credentialsId: 'merge-operation-id'
          //    sh 'git config --global user.email 769359290@qq.com'
          //    sh 'git config --global user.name ruanfan'
          //    withCredentials([usernamePassword(credentialsId: 'merge-operation-id', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
          //      sh 'git remote set-url origin "http://ruanfan:$GIT_PASSWORD@192.168.0.146/aiotv1.1/longchuang-front-vue/longchuang-front-base-vue.git"'
          //    }
          //    sh 'git fetch'
          //    sh 'git checkout -b release origin/release'
          //    sh 'git branch -a'
          //    sh 'git merge origin/develop'
          //    sh 'git push origin release'
          //  }
          //  sh 'rm -fr Module1'
          }
        }
        stage('Prepare Develop') {
          when { branch "develop" }
          agent {
            label buildAgentLabel
          }
          steps {
              script {
                  buildAgentLabel = "angular-docker"
                  makeAgentLabel = "jenkins-docker-develop"
                  deployAgentLabel = "jenkins-docker-1-1"
                  baseAPIAddressPort = "218.202.234.78:19105"
                  envoyproxyAddressPort = "192.168.50.121:10000"
              }
          }
        }
      }
    }
    stage('All Build') {
      parallel {
        stage('Build & Test Develop') {
          when {
            not {branch 'release'}
          }
          agent {
            label buildAgentLabel
          }
          environment {
            BASE_API_ADDRESS_PORT = sh (returnStdout: true, script: 'echo ' + baseAPIAddressPort).trim()
            ENVOYPROXY_ADDRESS_PORT = sh (returnStdout: true, script: 'echo ' + envoyproxyAddressPort).trim()
          }

          steps {
            sh 'sed -i "s/218.202.234.78:19105/$BASE_API_ADDRESS_PORT/g" src/apis/ApiUtil.js'
            sh 'sed -i "s/192.168.8.57:10000/$ENVOYPROXY_ADDRESS_PORT/g" src/apis/grpc/grpc.js'
            sh '''npm install
    npm run build
    mv dist_backbone longchuang-front-base-vue
    tar -czf longchuang-front-base-vue.tar.gz longchuang-front-base-vue'''
            stash(name: 'build-test-artifacts', includes: 'longchuang-front-base-vue.tar.gz')
          }
        }

        stage('Build & Test Release') {
          when {
            branch 'release'
          }
          agent {
            label buildAgentLabel
          }
          environment {
            BASE_API_ADDRESS_PORT = sh (returnStdout: true, script: 'echo ' + baseAPIAddressPort).trim()
            ENVOYPROXY_ADDRESS_PORT = sh (returnStdout: true, script: 'echo ' + envoyproxyAddressPort).trim()
          }

          steps {
          //  sh 'git config --global user.email 769359290@qq.com'
          //  sh 'git config --global user.name ruanfan'
          //  withCredentials([usernamePassword(credentialsId: 'merge-operation-id', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
          //    sh 'git remote set-url origin "http://ruanfan:$GIT_PASSWORD@192.168.0.146/aiotv1.1/longchuang-front-vue/longchuang-front-base-vue.git"'
          //  }
          //  sh 'git pull --force origin release:release'
            sh 'sed -i "s/218.202.234.78:19105/$BASE_API_ADDRESS_PORT/g" src/apis/ApiUtil.js'
            sh 'sed -i "s/192.168.50.121:9105/$BASE_API_ADDRESS_PORT/g" src/apis/ApiUtil.js'
            sh 'sed -i "s/192.168.8.57:10000/$ENVOYPROXY_ADDRESS_PORT/g" src/apis/grpc/grpc.js'
            sh '''npm install
    npm run build
    mv dist_backbone longchuang-front-base-vue
    tar -czf longchuang-front-base-vue.tar.gz longchuang-front-base-vue'''
            stash(name: 'build-test-artifacts', includes: 'longchuang-front-base-vue.tar.gz')
          }
        }

        stage('Build & Test Prod') {
          agent {
            label buildAgentLabel
          }
          when {
            branch 'release'
          }
          steps {
            sh 'git config --global user.email 769359290@qq.com'
            sh 'git config --global user.name ruanfan'
            withCredentials([usernamePassword(credentialsId: 'merge-operation-id', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
              sh 'git remote set-url origin "http://ruanfan:$GIT_PASSWORD@192.168.0.146/aiotv1.1/longchuang-front-vue/longchuang-front-base-vue.git"'
            }
            sh 'git pull --force origin release:release'
            sh 'sed -i "s/218.202.234.78:19105/192.168.50.140:9105/g" src/apis/ApiUtil.js'
            sh 'sed -i "s/192.168.50.126:9105/192.168.50.140:9105/g" src/apis/ApiUtil.js'
            sh 'sed -i "s/192.168.8.57:10000/192.168.50.140:10000/g" src/apis/grpc/grpc.js'
            sh 'sed -i "s/192.168.50.126:10000/192.168.50.140:10000/g" src/apis/grpc/grpc.js'
            sh '''npm install
    npm run build
    mv dist_backbone longchuang-front-base-vue
    tar -czf longchuang-front-base-vue.tar.gz longchuang-front-base-vue'''
            stash(name: 'build-prod-artifacts', includes: 'longchuang-front-base-vue.tar.gz')
          }
        }
      }
    }
    stage('Report & Publish') {
      parallel {
        stage('Report & Publish') {
          agent {
            label buildAgentLabel
          }
          steps {
            unstash 'build-test-artifacts'
            archiveArtifacts(artifacts: 'longchuang-front-base-vue.tar.gz', onlyIfSuccessful: true)
          }
        }
        stage('Publish to Artifactory') {
          agent {
            label buildAgentLabel
          }
          steps {
            script {
              unstash 'build-test-artifacts'

              def server = Artifactory.server 'Artifactory'
              def uploadSpec = """{
                "files":
                [
                  { "pattern": "longchuang-front-base-vue.tar.gz",
                  "target": "example-repo-local/${BRANCH_NAME}/${BUILD_NUMBER}/"
                }
              ]
            }"""
            server.upload(uploadSpec)
          }

        }
      }
      stage('Build Docker Image') {
        agent {
          label makeAgentLabel
        }
        steps {
          unstash 'build-test-artifacts'
          script {
            script {
              sh "[ -z \"\$(docker ps -a | grep '${BRANCH_NAME}/longchuang-front-base-vue' 2>/dev/null)\" ] || docker rm -f \$(docker ps --no-trunc -a |  grep '${BRANCH_NAME}/longchuang-front-base-vue'  | awk '{print \$1}')"
              sh "[ -z \"\$(docker images | grep '${BRANCH_NAME}/longchuang-front-base-vue' 2>/dev/null)\" ] || docker rmi \$(docker images |  grep '${BRANCH_NAME}/longchuang-front-base-vue'  | awk '{print \$1\":\"\$2}')"
            }
          }

          sh '''tar -zxvf longchuang-front-base-vue.tar.gz
cat > nginx.conf << EOF
worker_processes 1;
events {
    worker_connections 1024;
}
http {
    include mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;
    server {
        listen 80;
        add_header Cache-Control "no-cache, no-store";
        location = /index.html {
            add_header Cache-Control "no-cache, no-store";
            root /usr/share/nginx/html;
            expires 0;
        }
        location / {
            add_header Cache-Control "no-cache, no-store";
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files \\$uri \\$uri/ @router;
        }
        location @router {
            rewrite ^.*$ /index.html last;
        }
    }
}
EOF
cat > Dockerfile << EOF
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY longchuang-front-base-vue /usr/share/nginx/html
EOF
docker build -f Dockerfile -t ${BRANCH_NAME}/longchuang-front-base-vue .
docker tag ${BRANCH_NAME}/longchuang-front-base-vue:latest reg.longchuang.com/${BRANCH_NAME}/longchuang-front-base-vue:1.1
docker login -u=admin -p=test reg.longchuang.com
docker push reg.longchuang.com/${BRANCH_NAME}/longchuang-front-base-vue:1.1
'''
          script {
            script {
              sh "[ -z \"\$(docker images | grep '${BRANCH_NAME}/longchuang-front-base-vue' 2>/dev/null)\" ] || docker rmi \$(docker images |  grep '${BRANCH_NAME}/longchuang-front-base-vue'  | awk '{print \$1\":\"\$2}')"
            }
          }

        }
      }
      stage('Build Docker Image Prod') {
        agent {
          label makeAgentLabel
        }
        when {
          branch 'release'
        }
        steps {
          unstash 'build-prod-artifacts'
          script {
            script {
              sh "[ -z \"\$(docker ps -a | grep 'product/longchuang-front-base-vue' 2>/dev/null)\" ] || docker rm -f \$(docker ps --no-trunc -a |  grep 'product/longchuang-front-base-vue'  | awk '{print \$1}')"
              sh "[ -z \"\$(docker images | grep 'product/longchuang-front-base-vue' 2>/dev/null)\" ] || docker rmi \$(docker images |  grep 'product/longchuang-front-base-vue'  | awk '{print \$1\":\"\$2}')"
            }
          }

          sh '''tar -zxvf longchuang-front-base-vue.tar.gz
cat > nginx.conf << EOF
worker_processes 1;
events {
    worker_connections 1024;
}
http {
    include mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;
    server {
        listen 80;
        location = /index.html {
            root /usr/share/nginx/html;
            add_header Cache-Control "no-cache, no-store";
            expires 0;
        }
        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files \\$uri \\$uri/ @router;
        }
        location @router {
            rewrite ^.*$ /index.html last;
        }
    }
}
EOF
cat > Dockerfile << EOF
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY longchuang-front-base-vue /usr/share/nginx/html
EOF
docker build -f Dockerfile -t product/longchuang-front-base-vue .
docker tag product/longchuang-front-base-vue:latest reg.longchuang.com/product/longchuang-front-base-vue:1.1
docker login -u=admin -p=test reg.longchuang.com
docker push reg.longchuang.com/product/longchuang-front-base-vue:1.1
'''
          script {
            script {
              sh "[ -z \"\$(docker images | grep 'product/longchuang-front-base-vue' 2>/dev/null)\" ] || docker rmi \$(docker images |  grep 'product/longchuang-front-base-vue'  | awk '{print \$1\":\"\$2}')"
            }
          }

        }
      }
    }
  }
  
  stage('Deploy') {
    parallel {
      stage('Deploy') {
        agent {
          label deployAgentLabel
        }
        steps {
          script {
            script {
              sh "[ -z \"\$(docker ps -a | grep 'longchuang-front-base-vue' 2>/dev/null)\" ] || docker rm -f \$(docker ps --no-trunc -a |  grep 'longchuang-front-base-vue'  | awk '{print \$1}')"
              sh "[ -z \"\$(docker images | grep 'longchuang-front-base-vue' 2>/dev/null)\" ] || docker rmi \$(docker images |  grep 'longchuang-front-base-vue'  | awk '{print \$1\":\"\$2}')"
            }
          }

          sh '''docker login -u=admin -p=test reg.longchuang.com
    docker pull reg.longchuang.com/${BRANCH_NAME}/longchuang-front-base-vue:1.1
    docker run --restart unless-stopped -d -p 9504:80 reg.longchuang.com/${BRANCH_NAME}/longchuang-front-base-vue:1.1'''
          sleep 15
          sh '''curl -v --silent  http://192.168.50.121:9504 2>&1 | grep \'static\'
    if [ $? -ne 0 ] ;then
        echo "longchuang-front-base-vue deploy failed."
        set -e
        exit 1
    fi'''
        }
      }
       stage('Deploy Prod') {
        agent {
          label "jenkins-docker-1-1-release-uat"
        }
        steps {
          script {
            script {
              sh "[ -z \"\$(docker ps -a | grep 'longchuang-front-base-vue' 2>/dev/null)\" ] || docker rm -f \$(docker ps --no-trunc -a |  grep 'longchuang-front-base-vue'  | awk '{print \$1}')"
              sh "[ -z \"\$(docker images | grep 'longchuang-front-base-vue' 2>/dev/null)\" ] || docker rmi \$(docker images |  grep 'longchuang-front-base-vue'  | awk '{print \$1\":\"\$2}')"
            }
          }

          sh '''docker login -u=admin -p=test reg.longchuang.com
    docker pull reg.longchuang.com/product/longchuang-front-base-vue:1.1
    docker run --restart unless-stopped -d -p 9504:80 reg.longchuang.com/product/longchuang-front-base-vue:1.1'''
          sleep 15
          sh '''curl -v --silent  http://192.168.50.140:9504 2>&1 | grep \'static\'
    if [ $? -ne 0 ] ;then
        echo "longchuang-front-base-vue deploy failed."
        set -e
        exit 1
    fi'''
        }
      }
    }
    }
}
}
