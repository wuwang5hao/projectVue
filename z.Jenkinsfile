#!/groovy

def project = "uat"
def projectName = "elc-front-software-maintenance-vue"

pipeline {
    agent any
    options{
        timestamps()
        timeout(time:20,unit:'MINUTES')
        gitLabConnection('gitlab-to-jenkins')
        buildDiscarder(logRotator(numToKeepStr: '1'))
    }
    triggers{
        gitlab(
            triggerOnPush: true,
            branchFilterType: "NameBasedFilter",
            includeBranchesSpec: "develop",
            excludeBranchesSpec: "master,release",
            secretToken: "kqrpzmsB3cC7LZZC2j8Wg2Vy",
        )
    }
    stages{
        stage("准备配置文件"){
            steps{
                sh ''' sed -i "/^let baseUrl/clet baseUrl = 'http://uat.elc.cn:8843'; " src/apis/ApiUtil.js'''
            }
        }
        stage("项目构建"){
            steps{script{
              nodeHome = tool "nodejs"
              sh "export NODE_HOME=${nodeHome} && export PATH=\$PATH:\${NODE_HOME}/bin/ && ${nodeHome}/bin/npm install grpc --unsafe-perm  && ${nodeHome}/bin/npm install && ${nodeHome}/bin/npm run build"
            }}
        }
        stage("项目发布"){
            parallel{
                stage("发布到develop"){
                    when {branch 'develop'}
                    steps{
                        sshPublisher(publishers: [sshPublisherDesc(configName: "${project}-server1", transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "rm -f /www/sass/${projectName}/index.html;rm -fr /www/sass/${projectName}/static",  flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                        sshPublisher(publishers: [sshPublisherDesc(configName: "${project}-server1", transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "chown -R www.devops /www/sass/${projectName}",  flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: "/www/sass/${projectName}", remoteDirectorySDF: false, removePrefix: "dist_backbone/", sourceFiles: "dist_backbone/**")], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                    }
                }
                stage("可发布到release"){
                    when {branch 'release'}
                    steps{script{println("发布到release")}}
                }
                stage("也可发布master"){
                    when {branch 'master'}
                    steps{script{println("发布到develop")}}
                }
            }
        }
    }
}
